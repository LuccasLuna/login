import { resolve } from 'path';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import bcrypt from 'bcryptjs';

import { connection } from '../config/database.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));


class CadastroController {
  index(req, res) {
    try {
      return res.sendFile(path.resolve(__dirname, '../../public/cadastro.html'));
    } catch (e) {
      console.log(e);
      return res.status(400).json('Ocorreu um erro.');
    }
 } 
 
 async store(req, res) {
  try {
    const { name, lastname, email, password, birthdate} = await req.body;
    
    
    connection.query('USE cadastro_login', (useDbErr) => {
      if (useDbErr) {
        console.log(useDbErr);
        return res.status(500).json('falha ao selecionar database.');
      }
    });
    
    connection.query('SELECT email FROM usuarios WHERE email = ?', [email], (error, results) => {
      
      if(error) {
        console.log(error);
      }
      if(results.length > 0) {
        return res.status(400).json('email ja existe.');
      }
       
    });

    const hashSenha = await bcrypt.hash(password, 6);

    connection.query('INSERT INTO usuarios SET ?', 
    { 
      nome: name, 
      sobrenome: lastname, 
      email: email, 
      senha: hashSenha, 
      datanascimento: birthdate 
    }, 
    (err) => {
      if (err) {
        console.log(err);
        // process.exit(-1);
        return res.status(400).json('Ocorreu um erro.');
      }
      return res.send('Cadastro enviado.');
      connection.end();
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json('Ocorreu um erro.');
  }
  
 }

};

export default new CadastroController();
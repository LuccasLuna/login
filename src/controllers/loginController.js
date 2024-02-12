import { resolve } from 'path';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import { connection, pool } from '../config/database.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

pool.query('USE cadastro_login', (useDbErr) => {
  if (useDbErr) {
    console.log(useDbErr);
    return res.status(500).json('falha ao selecionar database.');
  }
});


class LoginController {
  index(req, res) {
    try {
      return res.sendFile(path.resolve(__dirname, '../../public/login.html'));
    } catch (e) {
      console.log(e);
      return res.status(400).json('Deu ruim meu patrão.');
    }
  }

  async store(req, res) {
    try {

    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: ['Credenciais inválidas.'],
      });
    }
      const results = await new Promise((resolve, reject) => {
        pool.query('SELECT nome, email, senha, id FROM usuarios WHERE email = ?', [email], (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });

      if (results.length === 0) {
        return res.status(400).json('Dados inválido');
      }

      const { email: emailDB, senha: senhaDB, id } = results[0];

      const result = await bcrypt.compare(password, senhaDB);

      if (!result) {
        return res.status(400).json('Dados inválida');
      }

      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: '7d'
      });

      res.cookie('jwt', token, {
        httpOnly: true,
        //secure: true, // só será enviado em conexões HTTPS
        sameSite: 'strict'
      })

      //return res.send('login realizado com sucesso!');
      return res.redirect('/perfil');
      
    } catch (e) {
      console.log(e);
      return res.status(500).json('Deu merda federal aq primo');
    }
  }

}

export default new LoginController();

/*
    function getEmployeeNames()  {
      return new Promise(function(resolve, reject){
        pool.query(
          'SELECT email, senha, id FROM usuarios WHERE email= ?', [email], 
          function(err, results){                                                
            if(results === undefined){
              reject(new Error("Error rows is undefined"));
            }else{
              resolve(results);
            }
          }
      )}
    )}

    getEmployeeNames()
    .then(function(results){
      res.send(results)
    })
    .catch(function(err){
      console.log("Promise rejection error: "+err);
    })      

    

    /*
    const resultadoDb = pool.query('SELECT email, senha, id FROM usuarios WHERE email= ?', [email], (error, results) => {
      if(error) throw error; 
      return results[0];
     });
    

    console.log(resultadoDb);




      

      try {
        pool.query('SELECT email, senha, id FROM usuarios WHERE email= ?', [email, password], (error, results) => {

          if(error) return console.log(error);
        
          const user = results[0];
          
          if(!user) return res.status(400).json('Credenciais inválidas.');

          function passwordIsValid(password){
            bcrypt.compare(password, senhaDB);
          }
          if(!(user.passwordIsValid(senha))) return res.status(400).json('senha invalida.');
          
          if(!emailDB) return console.log(emailDB,'email errado.');

          function passwordIsValid(password){
            bcrypt.compare(password, senhaDB);
          }
          
          
          
        });
        
      } catch(e) {
        console.log(e)
        return res.status(500).json('deu merda federal aq primo');
      } */
  
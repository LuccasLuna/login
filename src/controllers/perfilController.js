import { resolve } from 'path';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

class PerfilController {
  index(req, res) {
    try {
      return res.sendFile(path.resolve(__dirname, '../../public/perfil.html'));
    } catch (e) {
      console.log(e);
      return res.status(400).json('Ocorreu um erro.');
    }
 } 
 
};

export default new PerfilController();
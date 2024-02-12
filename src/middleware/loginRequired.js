
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default async (req, res, next) => {

  const token = req.cookies.jwt || req.headers.authorization;

  if(!token) {
    return res.redirect('/login');
  }

  try {

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    next();
  } catch (e) {
    return res.status(401).json({ mensagem: 'Token inválido' });
  }

  
}
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const connection = mysql.createConnection({
  user: 'root',
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  password: 'mysql',
  port: process.env.DATABASE_PORT
});

connection.connect(error => {
  if(error) throw error;
  console.log("Connected!");
});


export const pool  =  mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DATABASE_HOST,
  user            : 'root',
  password        : 'mysql',
  database        : process.env.DATABASE
});
 

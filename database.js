import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise() 

export async function checkPoolConnection() {
    let connection;
  
    try {
      
      connection = await pool.getConnection();
      await connection.ping();
  
      console.log('Conexão com a pool de conexões bem-sucedida');
    } catch (error) {
      console.error('Erro na conexão com a pool de conexões:', error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  

export async function getNotes(){
    const [rows] = await pool.query("SELECT * FROM notes")
    return rows
}

export async function getNote(id){
    const [rows] = await pool.query(`SELECT * FROM notes WHERE id = ?`,[id])
    return rows[0]
}

export async function createNote(title,contents){
    const [result] = await pool.query(`INSERT INTO notes (title,contents)
    VALUES (?, ?)`,[title,contents])
    return getNote(result.insertId)


}


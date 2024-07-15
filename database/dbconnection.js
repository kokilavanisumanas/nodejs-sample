// /var/www/html/nodejs-sample/database/dbconnection.js
const mysql = require('mysql2/promise');

const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'nodecrud'
    });
    console.log('MySQL connected...');
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

module.exports = connectToDatabase;

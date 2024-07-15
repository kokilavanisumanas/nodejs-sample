const mysql = require('mysql2');

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'root',
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');

    // Create database
    db.query('CREATE DATABASE IF NOT EXISTS nodecrud', (err, result) => {
        if (err) throw err;
        console.log('Database created or already exists.');

        // Switch to the database
        db.changeUser({ database: 'nodecrud' }, (err) => {
            if (err) throw err;

            // Create table
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100),
                    email VARCHAR(100),
                    age INT
                )
            `;
            db.query(createTableQuery, (err, result) => {
                if (err) throw err;
                console.log('Table created or already exists.');
                db.end();
            });
        });
    });
});

const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Shalom1994@',
        database: 'organizer'
    },
    console.log('Connected to the election database.')
);

module.exports = db;
/**
 * Responsible for connecting to the MySQL database
 */

var mysql = require('mysql');

// Create a MySQL connection pool
var pool = mysql.createPool({
    connectionLimit: 3300,
    host: 'localhost',
    user: 'web',
    password: 'pass',
    multipleStatements: true
});

// Determine whether the database was connected with the web server successfully
pool.getConnection(function (err, connection) {
    if (!err) {
        console.log("Database is connected ...");
        connection.release();
    } else {
        console.log("Error connecting database ... ");
        throw err;
    }
});

module.exports = pool;
var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 3300,
    host            : 'localhost',
    user            : 'web',
    password        : 'pass',
    multipleStatements: true
});

pool.getConnection(function (err, connection) {
    if(!err) {
        console.log("Database is connected ...");
        connection.release();
    } else {
        console.log("Error connecting database ... ");
        throw err;
    }
});

module.exports = pool;
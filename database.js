var mysql = require("mysql2");

var connection = mysql.createConnection({
    host: "localhost",
    database: "game_db",
    user: "root",
    password: "password"
});
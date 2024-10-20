var express = require("express");
var app = express();
var connection = require("./database");

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database connected");
});

app.listen(3050, function () {
  console.log("App listening on port 3050");
});

app.get("/", function (req, res) {
  let sql = "SELECT * FROM player";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

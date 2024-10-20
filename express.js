var express = require("express");
var app = express();
var connection = require("./database");

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database connected");
});

app.post("/submit", function (req, res) {
  const { nickname, playsSince, favAgent, elo, favSkin } = req.body;

  if (nickname && playsSince && favAgent && elo && favSkin) {
    const sql =
      "INSERT INTO player (Nickname, PlaysSince, FavAgent, Elo, FavSkin) VALUES (?,?,?,?,?)";

    connection.query(
      sql,
      [nickname, playsSince, favAgent, elo, favSkin],
      function (err, results) {
        if (err) {
          console.error("error inserting into database: ", err);
          return res.send(
            "Err: Could not insert information into the database"
          );
        }
        res.redirect("/home.html");
      }
    );
  } else {
    return res.send("please make sure to fill out all information in the form");
  }
});

app.listen(3050, function () {
  console.log("App listening on port 3050");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/home.html");
});

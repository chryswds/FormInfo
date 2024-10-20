var express = require("express");
var app = express();
var connection = require("./database");

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database connected");
});

app.post("/", function (req, res) {
  const { Nickname, PlaysSince, FavAgent, Elo, FavSkin } = req.body;

  if ((Nickname, PlaysSince, FavAgent, Elo, FavSkin)) {
    const sql =
      "INSTERT INTO player (Nickname, PlaysSince, FavAgent, Elo, FavSkin) VALUES (?,?,?,?,?)";

    connection.query(
      sql,
      [Nickname, PlaysSince, FavAgent, Elo, FavSkin],
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

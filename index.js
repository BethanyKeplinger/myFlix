//express framework
const express = require("express");
const morgan = require("morgan");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Models = require(".models/js");

//requiring mongoose models
const Movies = Models.Movie;
const Users = Models.User;

//allows mongoose to connect to database
mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

//reads tbe data out of the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//function to invoke middleware function -commcon format logs time requests etc
app.use(morgan("common"));

//function routes requests for static files to public folder
app.use(express.static("public"));

//CREATE new user
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })

    .then(user => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(user => {
            res.status(201).json(user);
          })
          .catch(error => {
            console.error(error);
            res.status(500).send("Error:" + error);
          });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error" + error);
    });
});

//UPDATE
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find(user => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user");
  }
});

//CREATE
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`$(movieTitle) has been added to user $(id)'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

//DELETE
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      title => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

//DELETE
app.delete("/users/:id/", (req, res) => {
  const { id } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    users = users.filter(user => user.id != id);
    res.status(200).send(`user {$id} has been deleted`);
  } else {
    res.status(400).send("no such user");
  }
});

//READ requests- app.METHOD(PATH, HANDLER)
app.get("/", (req, res) => {
  res.send("Here are my top ten favorite movies");
});

//READ list of movies
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

//READ find movie by title
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find(movie => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
});

//READ find movie by genre
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no such genre");
  }
});

//READ find movie by director
app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(movie => movie.Director.Name === directorName)
    .Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("no such director");
  }
});

//Error handling middleware function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Oh no! Something broke!");
});

//listens for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});

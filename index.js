//express framework
const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");

//requiring mongoose models
const Movies = Models.Movie;
const Users = Models.User;

//allows mongoose to connect to database
mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//reads tbe data out of the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//function to invoke middleware function -commcon format logs time requests etc
app.use(morgan("common"));

//function routes requests for static files to public folder
app.use(express.static("public"));

//CREATE new user- NEW
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
      res.status(500).send("Error:" + error);
    });
});

//Read data about users- NEW
app.get("/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
});

//Get user by username -NEW
app.get("/users/:Username", (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
});

//UPDATE user information- NEW
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, //this line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error:" + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//CREATE add movie to users favorite movies list - NEW
app.post("/users/:Username/movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $addToSet: { FavoriteMovies: req.params.MovieID }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error:" + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//DELETE movie from users favorite movie list - NEW
app.delete("/users/:Username/movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error:" + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//DELETE user by user id- NEW
app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(user => {
      if (!user) {
        res.status(400).send(req.params.Username + "was not found.");
      } else {
        res.status(200).send(req.params.Username + "was deleted.");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
});

//READ requests- app.METHOD(PATH, HANDLER)- GOOD
app.get("/", (req, res) => {
  res.send("Welcome to MyFlix");
});

//READ list of movies - NEW
app.get("/movies", (req, res) => {
  Movies.find()
    .then(movies => {
      res.status(201).json(movies);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
});

//READ find movie by title
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then(movie => {
      res.json(movie);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
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

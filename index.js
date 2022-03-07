//express framework
const express = require("express"),
  morgan = require("morgan");
(uuid = require("uuid")), (bodyParser = require("body-parser"));

const app = express();

//function to invoke middleware function -commcon format logs time requests etc
app.use(morgan("common"));

//function routes requests for static files to public folder
app.use(express.static("public"));

//reads tbe data out of the request body
app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: "Joanna",
    favoriteMovies: []
  },
  {
    id: 2,
    name: "Julie",
    favoriteMovies: "The Goofy Movie"
  }
];

let movies = [
  {
    Title: "The Lord of the Rings",
    Description:
      "Set in the fictional world of Middle-earth, the films follow the hobbit Frodo Baggins as he and the Fellowship embark on a quest to destroy the One Ring, to ensure the destruction of its maker, the Dark Lord Sauron.",
    Genre: {
      Name: "Fantasy",
      Description:
        " The genre is considered a form of speculative fiction alongside science fiction films and horror films, although the genres do overlap.[1] Fantasy films often have an element of magic, myth, wonder, escapism, and the extraordinary"
    },
    Director: {
      Name: "Peter Jackson",
      Bio:
        "Jackson and his partner Fran Walsh, a New Zealand screenwriter, film producer, and lyricist, have two children, Billy (born 1995) and Katie (born 1996). Walsh has contributed to all of Jackson's films since 1989, as co-writer since Meet the Feebles, and as producer since The Lord of the Rings: The Fellowship of the Ring. She won three Academy Awards in 2003, for Best Picture, Best Adapted Screenplay and Best Original Song, all for The Lord of the Rings: The Return of the King. She has received seven Oscar nominations",
      Birth: "October 31 1961"
    },
    ImageURL: ""
  }
];

//CREATE new user
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("users need names");
  }
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
app.get("/"),
  (req, res) => {
    res.send("Here are my top ten favorite movies");
  };

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

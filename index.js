//express framework
const express = require('express'),
  morgan = require('morgan');

const app = express();

//function to invoke middleware function -commcon format logs time requests etc
app.use(morgan('common'));

//function routes requests for static files to public folder
app.use(express.static('public'));

let topTenMovies = [
  {
    title: "I'm not sure"
  },
  {
    title: "I don't know!"
  }
];

//get requests- app.METHOD(PATH, HANDLER)
app.get('/'), (req, res) => {
  res.send('Here are my top ten favorite movies');
}

app.get('/movies', (req, res) => {
  res.json(topTenMovies);
});

//Error handling middleware function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oh no! Something broke!');
});

//listens for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

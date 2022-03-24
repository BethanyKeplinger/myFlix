<h1>MyFlix API </h1>

<h2>Features</h2>

This is the server side component of the web application, MyFlix. It consists of a REST API that was built using JavaScipt, Node.js, Express and MongoDB. This web application holds a list of users and a list of movies. Users are given access to information about a variety of different movies, directors and genres. Users are able to add differnet movies to their list of favorites as well as update their personal user information. 
Other packages that were used are bcrypt, body-parser, cors, express-validator, jsonwebtoken, morgan, passport, passport-jwt, passport-local and uuid.

<h2>API Reference</h2>
Click here for full reference page https://github.com/BethanyKeplinger/myFlix/blob/main/public/documentation.html

<h3>Login</h3>
Login with user information and return token
<strong>URL: </strong> /login <br>
<strong>Method: </strong> POST <br>
<strong>Body: </strong> <br>
User login information <br>
Example:{Username: "testusername", <br>
Password: "testpassword", <br><br>


<h3>Users</h3>
Allows new users to register<br> 
<strong>URL: </strong> /users <br>
<strong>Method: </strong> POST <br>
<strong>Body: </strong> A JSON object is requested<br>
Example:<br>
{Username: "testusername",<br> 
Password: "testpassword", <br>
Email: "testemail", <br>
Birthday: "01/01/11"}<br>
<strong>Success Response: </strong> <br>
"Username": "testusername",<br>
    "Password": "$2b$10$6hdGXQ.Eh6E.WleLUusovewYh7j7qc1p0N3WRZu20FvSzPpJk57Nq",<br>
    "Email": "testemail@gmail.com",<br>
    "Birthday": "2011-01-11T00:00:00.000Z",<br>
    "FavoriteMovies": [],<br>
    "_id": "623c9122386f5bf775732281", <br>
    "__v": 0<br><br>
    
   

<h3>Users</h3>
<strong>URL: /user/:Username </strong>  <br>
<strong>Method: </strong> GET<br>
<strong>Body: </strong> none <br>
<strong>Success Response: </strong> A JSON object holding data about a user<br>
Example: ID: id number, Username: "testusername", Password: "testpassword", Email: "testemail", Birthday: "01/01/11"} <br> <br>


<h3>Users</h3>
Allows users to update their user info <br>
<strong>URL: </strong> /users/:Username<br>
<strong>Method: </strong> PUT <br>
<strong>Body: </strong> <br>
A JSON object holding data about a user to change data <br>
<strong>Success Response: </strong> <br>
A JSON object holding data about the updated user information
Example: "Username": "testusername", "Password": "testpassword","Email" : "testemail@gmail.com" <br> <br>


<h3>Users</h3>
Allows users to add a movie to their list of favorites<br>
<strong>URL: </strong> /users/:Username/movies/:MovieID <br>
<strong>Method: </strong> POST<br>
<strong>Body: </strong> none <br>
<strong>Success Response: </strong> <br>
A JSON object holding data about the updated list of favorite movies<br><br>


<h3>Users</h3>
Allows users to remove a movie from their list of favorites
<strong>URL: </strong> /users/:Username//movies/:MovieID<br>
<strong>Method: </strong> DELETE<br>
<strong>Body: </strong> none <br>
<strong>Success Response: </strong> <br>
A JSON object holding data about the updatd list of favorite movies<br><br>



<h3>Users</h3>
Allows existing users to deregister
<strong>URL: </strong> /users/:username<br>
<strong>Method: </strong> DELETE <br>
<strong>Body: </strong> none<br>
<strong>Success Response: </strong> <br>
A text message indicating that the user has been deleted<br><br>



<h3>Movies</h3>
Returns a list of all movies to the user
<strong>URL: </strong> /movies<br>
<strong>Method: </strong> GET <br>
<strong>Body: </strong> none <br>
<strong>Success Response: </strong> <br>
A JSON object holding data about all the movies
Example: {Title: "The Lord of the Rings", Description: "", Genre: { Name: "Fantasy", Description:""} Director: { Name: "Peter Jackson", Bio: "", Birth Year-Death Year } ImagePath: "", Featured: "" } <br><br>



<h3>Movies</h3>
Returns data about a single movie by title to the user
<strong>URL: </strong> /movies/:Title<br>
<strong>Method: </strong> GET <br>
<strong>Body: </strong> none <br>
<strong>Success Response: </strong> <br>
A JSON object holding data about a single movie
Example: {Title: "The Lord of the Rings", Description: "", Director: {Name: "", Bio: "", Birthyear: "", ImagePath: "", Featured: ""} <br><br>


<h3>Movies</h3>
Returns data about a genre by name
<strong>URL: </strong> /movies/genre/:Name<br>
<strong>Method: </strong> GET <br>
<strong>Body: </strong> none <br>
<strong>Success Response: </strong> <br>
A JSON object holding data about a genre
Example: Genre: { Name: "Fantasy", Description: ""}<br><br>


<h3>Movies</h3>
Returns data about a director(bio, birth year, death year) by name
<strong>URL: </strong> /movies/director/:Name<br>
<strong>Method: </strong> GET <br>
<strong>Body: </strong> none <br>
<strong>Success Response: </strong> <br>
A JSON object holding data about a director
Example: Director: { Name: "Peter Jackson", Bio: "", Birth Year: "", Death Year: "" }<br><br>



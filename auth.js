//Registered Users to login
const jwtSecret = "your_jwt_secret"; //this has to be the same key used in JWTStrategy

const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport"); // your local passport file

/**
 * 
 * Creates a JWT that expires in 7 days
 * @param {*} user 
 * @returns user object, jwt, and info about the token
 */

let generateJWTToken = user => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, //username that you're encoding your JWT
    expiresIn: "7d",
    algorithm: "HS256" //this is the algorithm used to "sign" or encode the values of the JWT
  });
};

/*Post login. */
/**
 * 
 * @function generateJWTToken
 * @param {*} router 
 * @returns user object with jwt
 * @requires passport
 */
module.exports = router => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user
        });
      }
      req.login(user, { session: false }, error => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON()); //create a JWT based on username and password
        return res.json({ user, token });
      });
    })(req, res);
  });
};

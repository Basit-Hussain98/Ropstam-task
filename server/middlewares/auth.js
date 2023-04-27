const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  let token;
  // checking if token exists in bearer if so then assigning bearer token to token variable
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //  checking if token not exists
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  // decoding token and verifying
  try {
    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;

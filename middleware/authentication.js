// const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  //check for header and if it starts with "bearer" - if not, throw new error
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Auth invalid");
  }
  //turn into an array, look for second item in array
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    //attach the user to the job routes...remember, we get this (payload) info from our user...goes through the controller,
    //which uses the User schema
    //the usreSchema creates the userId and name props
    //getting user from auth
    req.user = { userId: payload.userId, name: payload.name };
    //so it passes on to job route
    next();
  } catch(error) {
    throw new UnauthenticatedError("Auth error");
  }
};

module.exports = auth;

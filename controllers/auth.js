//model import
const User = require("../models/User");

//status codes library
const { StatusCodes } = require("http-status-codes");

//errors
const { BadRequestError } = require("../errors/index");

//libraries



const register = async (req, res) => {
  //check if there are values, if not, throw an error. mongoose does this automatically - code works without this if block, but err mess is larger
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("please provide name, email, and password");
  }
  //there is a pre function that hashes the password for the db - but console logs here all show the "secret" password
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  //send back what you want, depending on what frontend needs. for ex, can access name from response instead of grabbing from db,
  // token allows users to access stuff later on. 
  res.status(StatusCodes.CREATED).json({ user: {name: user.name}, token });
  //console.log user and password here - user you get the hashed one, password you still get the "secret" string
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = { register, login };

const mongoose = require("mongoose");
//import libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide valid email",
    ],
    //creates a unique index. if th eemail is already in use, i'll get a duplicate error msg
    unique: true,
  },
  password: {
    type: String,
    require: [true, "please provide valid password"],
    minlength: 6,
  },
});

//we are using regular function keyword so that this is bound to this document
//before the user is "save"d, do this function...w/6.0 you don't need the "nexts" anymore...just plain async. thisis mongoose middleware
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  //this refers to this document model
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//schemas have methods attached to them, built in and able to create our own (below)
//this generates the token for us
UserSchema.methods.createJWT = function () {
  //once we create user, we want token. what we want to send back goes in .sign({}). must include the secret, last is options.
  return jwt.sign({ userId: this._id, name: this.name }, "jwtSecret", {
    expiresIn: "30d",
  });
};

module.exports = mongoose.model("User", UserSchema);

//this was all in the auth controller - token was in place of the createJWT, we returned token to frontend.
//this one was the pre func
// const { name, password, email} = req.body
//   //start hashing process for password...random bytes. number is # of rounds
//   const salt = await bcrypt.genSalt(10);
//   //pass in passwords and salt
//   const hashPassword = await bcrypt.hash(password, salt);
//   //bcryptjs - create a new, temporary user object, pass that in as the user to be created
//   const tempUser = { name, email, password: hashPassword };

// const token = jwt.sign({userId: user._id, name: user.name}, 'jwtsecret', {expiresIn: '30d'})

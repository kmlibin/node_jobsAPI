const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please provide company name"],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [true, "Please provide position"],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ["interview", "declined", "pending"],
    default: 'pending'
  },
  createdBy: {
    //ties jobs to the User model, will assign it to one of the users
    type: mongoose.Types.ObjectId,
    //which model are we referencing?
    ref: 'User',
    required: [true, 'Please provide a user']
  }
}, {timestamps: true});

module.exports = mongoose.model('Job', JobSchema)



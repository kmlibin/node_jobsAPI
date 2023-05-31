const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');

const getAllJobs = async (req, res) => {
  res.send("get all jobs");
};

const getSingleJob = async (req, res) => {
  res.send("get single job");
};

const createJob = async (req, res) => {
  //creating a new prop on req.body called createdBy, b/c we have access to userid and user on the req.body
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({job})
};

const updateJob = async (req, res) => {
  res.send("update job");
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

module.exports = { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };

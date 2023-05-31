const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  //user on every reqest becuase we placed our auth middleware in front of all of our jobs routes
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getSingleJob = async (req, res) => {
  //looking for job id param, comes from user object we create in the auth middleware
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  //find job id and make sure it matches the user id
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`no job with id of ${jobID}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  //creating a new prop on req.body called createdBy, b/c we have access to userid and user on the req.body
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  //also grab the body (input), company and position
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  //check for values
  if (company === "" || position === "") {
    throw new BadRequestError("fields cannot be empty");
  }
  const job = await Job.findOneAndUpdate({_id: jobId, createdBy: userId}, req.body, { new: true, runValidators: true})

  if(!job) {
    throw new NotFoundError('no job with that id')
  }
  res.status(StatusCodes.OK).json({job})
};

const deleteJob = async (req, res) => {
  const {user: {userId}, params: {id: jobId}} = req;

  const job = await Job.findOneAndRemove({
    _id: jobId, createdBy: userId
  })

  if(!job) {
    throw new NotFoundError('no job with that id')
  }
  res.status(StatusCodes.OK).send();
};

module.exports = { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };

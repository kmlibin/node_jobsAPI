const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    //set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "something went wrong",
  };
  if (err instanceof CustomAPIError) {
    return res.status(customError.statusCode).json({ msg: customError.msg });
  }
  //duplicate error
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field`;
    customError.statusCode = 400;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
};

module.exports = errorHandlerMiddleware;

require('dotenv').config();
require('express-async-errors');

//set up server
const express = require('express');
const app = express();

//connectDB

//router
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/auth');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//invoke for post routes, get req.body
app.use(express.json());
// extra packages

// routes
app.use('/api/vi/auth', authRouter);
app.use('/api/vi/jobs', jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
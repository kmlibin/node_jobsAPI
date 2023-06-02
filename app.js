require("dotenv").config();
require("express-async-errors");

//extra security pckges
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

//swagger ui
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml')

//set up server
const express = require("express");
const app = express();

//connectDB
const connectDB = require("./db/connect");

//middleware
const authenticateUser = require('./middleware/authentication');

//router
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//set up rateLimit
app.set('trust proxy', 1);
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, //15 min
  max: 100 //each IP has 100 requests per 15 min
}));

//invoke for post routes, get req.body
app.use(express.json());

//security
app.use(helmet());
app.use(cors());
app.use(xss());

//initial get request and swagger
app.get('/', (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

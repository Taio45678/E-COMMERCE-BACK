const express = require('express');
const cors = require('cors');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { auth } = require('express-openid-connect');
const routes = require('./routes/index.js');
const { SECRET_KEY, CLIENT_ID,AUTH_URL } = process.env
const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(cors());
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: SECRET_KEY,
  baseURL: 'https://e-commerce-front-alpha.vercel.app/',
  clientID: CLIENT_ID,
  issuerBaseURL: AUTH_URL
};

server.use(auth(config));
server.use('/', routes);

// server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
//   const status = err.status || 500;
//   const message = err.message || err;
//   console.error(err);
//   res.status(status).send(message);
// });

module.exports = server;
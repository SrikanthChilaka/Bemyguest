import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import routes from './routes/index.js';
import models from './models/index.js';
// make app an express object
const app = express();

// establish connection to bemyguestdb
mongoose.connect('mongodb://localhost:27017/bemyguestdb');

//----------- load middleware functions to app -----------//
app.use(express.json()) // parse request body as json and store in req.body
app.use(cors()) // enable cross origin resource sharing
app.use(express.urlencoded()) // only parse url encodied req bodies

// mount all routers to app (only todo-items-router exists for this project)
routes(app);

export default app; // export app with connection to db, other request-response configurations, and mounted routes
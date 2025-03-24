import express from 'express';

import colors from 'colors';
import dotenv from 'dotenv';

import connect from './config/db.js';
import errorHandler from './middleware/error.js';
import goals from './routes/goalRoutes.js';
import logger from './middleware/logger.js';
import notFound from './middleware/notFound.js';
import users from './routes/userRoutes.js'; 


dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
connect();

// Middleware for logging
app.use(logger);

// Middleware to parse body
app.use(express.json());
// form data
app.use(express.urlencoded({extended: false})); 


app.use("/api/goals", goals);
app.use('/api/users', users);

app.use(notFound);
app.use(errorHandler); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
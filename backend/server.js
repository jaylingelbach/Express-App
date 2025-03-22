import express from 'express';
import goals from './routes/goalRoutes.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';

const PORT = process.env.PORT || 8080;

const app = express();

// Middleware for logging
app.use(logger);

// Middleware to parse body
app.use(express.json());
// form data
app.use(express.urlencoded({extended: false})); 


app.use("/api/goals", goals);

app.use(notFound);
app.use(errorHandler); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
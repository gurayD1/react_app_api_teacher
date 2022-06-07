const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const connectDB = require('./config/connectDB');
const todoRoute = require('./routes/todoRoutesDB');
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.static('public'));
//file upload

//connect to db
connectDB();

//middleware work with incoming request
//set the middleware to parse the data
app.use(express.json());

//router to organize our routes
app.use('/api/todos', todoRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, 'localhost', () => {
  console.log('Server is running');
});

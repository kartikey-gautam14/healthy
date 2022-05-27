const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
var bodyParser = require('body-parser');
const login = require('./routes/login');
const register = require('./routes/register');
const dlogin = require('./routes/logindoctor');
const dregister = require('./routes/registerdoctor');
const auth = require('./middleware/auth');
const profile = require('./routes/profile');
const dprofile = require('./routes/profiledoctor');


const app = express();

const PORT = process.env.PORT || 5000;

//Init middleware
app.use(express.json());
app.use(cors());

// DB Config
const db = require('./config/keys').mongoURI;

// import mongoose from 'mongoose';
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('API running'));
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
;


// Define routes
app.use('/login', login);
app.use('/register', register);
app.use('/doctor/login', dlogin);
app.use('/doctor/register', dregister);
app.use('/profile', profile);
app.use('/doctor/profile', dprofile);
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const testRoutes = require('./routes/test');
const authRoutes = require('./routes/auth');

const app = express();

const PORT = process.env.PORT || 8080;


app.use(bodyParser.json()); // application/json

// app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/test', testRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.MONGODB_URI ||
    'mongodb+srv://Lessonify:dipesh123@lessonify.mag7w.mongodb.net/sih',{ useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(result => {
    app.listen(PORT);
  })
  .catch(err => console.log(err));

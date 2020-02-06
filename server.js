const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const config = require('config');

app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/api/users.api'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

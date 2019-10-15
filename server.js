// DEPENDENCIES 
const express = require('express');
require('dotenv').config()

// Tell node that we are creating an "express" server
const app = express();

// Set public folder as root
app.use(express.static('public'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
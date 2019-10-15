// DEPENDENCIES 
const express = require('express');
require('dotenv').config()

// Tell node that we are creating an "express" server
const app = express();

// Set public folder as root
app.use(express.static('public'));

// Route to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
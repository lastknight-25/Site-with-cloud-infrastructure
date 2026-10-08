// Import the Cors library
const cors = require('cors')


// Import the Express library
const express = require('express');

// Create an Express application instance
const app = express();

//Routing 
const productsRouter = require('./products')

const path = require('path');

// Whitelisitng
app.use(cors({
  origin : ['http://127.0.0.1:5500', 'http://localhost:5500']
}))

app.use(express.json())
app.use('/products', productsRouter)
app.use(express.static(path.join(__dirname, '..')));


// // Define a route for HTTP GET requests to the root URL ('/')
// // This route sends a simple text response to the client
//app.get('/', (req, res) => {
//  res.sendFile(path.join(__dirname, '../index.html'));
//});


app.get('/about', (req, res) => {
  res.send('about Page');  
});


app.get('/contact', (req, res) => {
  res.send('contact Page');  
});

// app.get('/message', (req, res) => {
//   res.json({ message: 'this a message from the backend'})
// });

// app.post('/message', (req, res) => {
//   const {name, message} = req.body

//   console.log('New message :', name, message)
//   res.json({ message: 'Thanks for the message bozo'})
// });

// Start the server on port 3000 and log a message to the console
app.listen(3000, () => console.log('API running on port 3000'));
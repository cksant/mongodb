const express = require("express");
const mongoose = require('mongoose');
const app = express();

app.get("/", function(req, res){
    res.send("Main page");
});


mongoose.connect('mongodb://localhost:27017/Marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

app.listen("3000", function(){
  console.log("Application is now running.")
});


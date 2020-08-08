const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
// const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

//Enable Middleware
app.use(cors());
app.use(bodyParser());

//Configure body parsing without enabling Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// Connect to the Mongo DB
//insert the URI of MongoDB
mongoose.connect('mongodb://127.0.0.1.27017/googlebooks', {
  useNewUrlParser: true
});
// connection reference
const connection = mongoose.connection;

//   process.env.MONGODB_URI || "mongodb://user1:password1@ds125871.mlab.com:25871/heroku_0xn0jnk7",
//   {
//     useCreateIndex: true,
//     useNewUrlParser: true
//   }
// );

connection.once('open', function(){
  console.log("MongoDB database connection established successfully");

})
//Start up server on PORt 3000
// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);

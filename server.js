const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Book = require("./models/book"); //changes to routes //will change to below const when controllers and router folder added
// const routes = require("./routes"); //route/book.js has routes... bookcontroller has CRUD
const app = express();
const PORT = process.env.PORT || 3001;

//Enable Middleware
app.use(cors());
app.use(bodyParser());

//will be located in book.js in router folder
const router = require("express").Router();

//Configure body parsing without enabling Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// Connect to the Mongo DB
//insert the URI of MongoDB
mongoose.connect("mongodb://127.0.0.1.27017/googlebooks", {
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

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

// Add routes, both API and view
// app.use(routes);

//^^^routes is requires from routes folder, which exports router.
//In each api js. This will be populated when the above variable const routes path
//is changed to folder routes

//Below routes created via vid: The router will be added as a middleware and will take control of request starting with path /googlebooks
app.use("/api", router);

//end point
router.route("/").get(function(req, res) {
  Book.find(function(err, googlebooks) {
    if (err) {
      console.log(err);
    } else {
      res.json(googlebooks);
    }
  });
});

router.route("/:id").get(function(req, res) {
  let id = res.params.id;
  Book.findById(id, function(err, googlebooks) {
    res.json(googlebooks);
  });
});

router.route("/add").post(function(req, res) {
  let book = new Book(req.body);
  book
    .save()
    .then(googlebooks => {
      res.status(200).json({ book: "book added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new book failed");
    });
});

router.route("/update/:id").post(function(req, res) {
  Book.findById(req.params.id, function(err, googlebooks) {
    if (!googlebooks) res.status(404).send("data is not found");
    else Book.title = req.body.title;
    Book.subtitle = req.body.subtitle;
    Book.authors = req.body.authors;
    Book.link = req.body.link;
    Book.description = req.body.description;
    Book.image = req.body.image;
    Book.googleId = rew.body.googleId;

    Book.save()
      .then(googlebooks => {
        res.json("Books updated!");
      });
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

//Start up server on PORt 3000
// Start the API server
// app.listen(PORT, () =>
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
// )
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});

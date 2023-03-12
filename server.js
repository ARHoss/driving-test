// Getting Express module
const express = require("express");
// Express app varibale
const app = express();
// Interacts with database & create models
const mongoose = require("mongoose");
// Handles authorization - contains strategies for authentication - local strategy
const passport = require("passport");
// Handles cookies and sessions
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
//Use forms for put / delete
const methodOverride = require("method-override");
// Helps in creating flash notification for login
const flash = require("express-flash");
// Logger for the application - tells what requests are being made
const logger = require("morgan");
// Used to connect to Database
const connectDB = require("./config/database");
// Linking to routes
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const questionRoutes = require("./routes/questions");

// Environment variables
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

// Tells Express that EJS Template Engine is used
app.set("view engine", "ejs");

// Tells Express to make public folder accessible to public
app.use(express.static("public"));

// Parses data for express to read request object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logging only used during development - Creates log for views
if(process.env.NODE_ENV === 'development'){
  app.use(logger("dev"));
}

//Use forms for put / delete
app.use(methodOverride("_method"));

// Saves session into database
app.use(
  session({
    // Makes it harder to for cookies to reverse-engineer
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // Storing session info in database
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport handling authentication
app.use(passport.initialize());
// Passport handling sessions
app.use(passport.session());

// Helps in creating flash messages in front-end
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/question", questionRoutes);
app.use((req, res, next) => {
  res.render('errors/page-not-found.ejs')
})

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
});

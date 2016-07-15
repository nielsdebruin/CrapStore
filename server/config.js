var express          = require("express");
var bodyParser       = require("body-parser");
var cookieParser     = require("cookie-parser");
var morgan           = require("morgan");
var session          = require("./session");

module.exports = function(app) {
  // Use EJS and set views directory
  app.set("views", __dirname + "/views");
  app.set("view engine", "ejs");

  // Set static folder
  app.use(express.static(__dirname + "/../client"));

  // Parsers
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Map user to session
  app.use(session.setUser);
  app.use(function(req, res, next) {
    app.locals.user = req.user;
    next();
  });

  // Morgan (logger) Config
  morgan.token("user", function(req,res) { return (req.user) ? req.user.idUser+":"+req.user.name : 'anonymous'  })
  app.use(morgan(":method :url :status user: :user :response-time ms - :res[content-length]"))
};
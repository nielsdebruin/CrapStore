/**
 * Configures the web server, pointing it to modules and views it should use.
 */

var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var session = require("./session");

module.exports = function (app) {
    // Use EJS as templating engine and set the views directory
    app.set("views", __dirname + "/views");
    app.set("view engine", "ejs");

    // Set the static folder
    app.use(express.static(__dirname + "/../client"));

    // Setup body parsers (used for communicating through JSON and setting cookies)
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    // Map user to session
    app.use(session.setUser);
    app.use(function (req, res, next) {
        app.locals.user = req.user;
        next();
    });

    // Morgan (logger) configuration - logs every HTTP request to the console
    morgan.token("user", function (req, res) {
        return (req.user) ? req.user.idUser + ":" + req.user.name : 'anonymous'
    });
    app.use(morgan(":method :url :status user: :user :response-time ms - :res[content-length]"))
};
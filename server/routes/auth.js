/**
 * Responsible for handling account authentication related views
 */

var queries = require("./../queries");
var session = require("./../session");

// Renders the login page
module.exports.login = function (req, res) {
    res.render("account/login", {"user": session.getSessionUser(req)});
};

// Renders the register page
module.exports.register = function (req, res) {
    res.render("account/register", {"user": session.getSessionUser(req)});
};

// Renders the 'forgot password' page
module.exports.forgot = function (req, res) {
    res.render("account/forgot", {"user": session.getSessionUser(req)});
};

// Attempts to authorize / log in the user with his provided credentials
module.exports.authorize = function (req, res) {
    queries.account.login(req.body.email, req.body.password, function (err, rows) {
        if (rows.length != 1) {
            res.json({"fail": true});
        } else {
            res.cookie("sessionID", session.sessionCounter++);
            session.sessionMapping[session.sessionCounter - 1] = rows[0];
            res.json({"fail": false});
        }
    });
};

// Attempts to register a new user with the provided info
module.exports.register_user = function (req, res) {
    queries.account.register({
        name: req.body.name, email: req.body.email, password: req.body.password, hint: req.body.hint
    }, function () {
        res.json({"success": true});
    });
};

// Changes the password of a given user
module.exports.change_password = function (req, res) {
    queries.account.change_password(req.body.email, req.body.password, req.body.hint, function (err, success) {
        res.json({
            "fail": !success
        });
    });
};
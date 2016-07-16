/**
 * Keeps track of user sessions
 */

// Counter for the amount of sessions currently active
module.exports.sessionCounter = 0;
// Mapping of user cookies (sessionIDs) to the users
module.exports.sessionMapping = {};

// Gets the user currently active in this session.
module.exports.getSessionUser = function (req) {
    return req.cookies.sessionID != undefined ? module.exports.sessionMapping[req.cookies.sessionID] : undefined;
};

// Sets the current user property of the request object to be the session user (if specified)
module.exports.setUser = function (req, res, next) {
    req.user = (req.cookies.sessionID != undefined) ? module.exports.sessionMapping[req.cookies.sessionID] : {};
    next();
};

// Middleware checking whether the user is authenticated
module.exports.isAuthenticated = function (req, res, next) {
    if (req.user != null && req.user.idUser != null) {
        next();
    } else {
        res.redirect("/login");
    }
};

// Middleware checking whether the user is a supplier
module.exports.isSupplier = function (req, res, next) {
    if (req.user != null && req.user.isSupplier)
        next();
    else
        res.send("You are not a supplier.");
};
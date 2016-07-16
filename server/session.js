module.exports.sessionCounter = 0;

module.exports.sessionMapping = {};

module.exports.getSessionUser = function (req) {
    return req.cookies.sessionID != undefined ? module.exports.sessionMapping[req.cookies.sessionID] : undefined;
};

module.exports.setUser = function (req, res, next) {
    req.user = (req.cookies.sessionID != undefined) ? module.exports.sessionMapping[req.cookies.sessionID] : {};
    next();
};

module.exports.isAuthenticated = function (req, res, next) {
    if (req.user != null && req.user.idUser != null) {
        console.log("user is authenticated");
        next();
    } else {
        res.redirect("/login");
    }
};

module.exports.isSupplier = function (req, res, next) {
    if (req.user != null && req.user.isSupplier)
        next();
    else
        res.send("You are not a supplier.");
};
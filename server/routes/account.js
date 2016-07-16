/**
 * Responsible for rendering the account route
 */

var queries = require("./../queries");
var session = require("./../session");

// Renders the account view and provides it with the relevant user information
module.exports.panel = function (req, res, next) {
    var id = session.getSessionUser(req) == undefined ? 1 : session.getSessionUser(req).idUser;
    queries.account.info(id, function (err, user, orders) {
        if (err) return next(err);
        res.render("account/myaccount", {user: session.getSessionUser(req), orders: orders});
    });
};
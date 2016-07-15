var queries = require("./../queries");
var session = require("./../session");

module.exports.panel = function (req, res, next) {
    var id = session.getSessionUser(req) == undefined ? 1 : session.getSessionUser(req).idUser;
    queries.account.info(id, function (err, user, orders) {
        if (err) return next(err);
        console.log(user, orders);
        res.render("account/myaccount", {user: session.getSessionUser(req), orders: orders});
    });
};
var queries = require("./../queries");
var session = require("./../session");
var isAuthenticated = session.isAuthenticated;
var isSupplier = session.isSupplier;

module.exports.index = function (req, res) {
    res.render("index", {"user": session.getSessionUser(req)});
};

module.exports.products = function (req, res) {
    if (req.query.search) {
        queries.products.search(req.query.search, function (err, rows, query) {
            if (rows == undefined) {
                rows = [];
            }
            res.render("products", {
                "products": rows, "query": query, "term": req.query.search,
                "user": session.getSessionUser(req)
            });
        });
    } else {
        queries.products.getAll(function (err, rows) {
            res.render("products", {
                "products": rows, "query": undefined, "term": undefined,
                "user": session.getSessionUser(req)
            });
        });
    }
};

module.exports.guestbook = function (req, res) {
    queries.guestBookEntries.getAll(function (err, rows) {
        res.render("guestbook", {"entries": rows, "user": session.getSessionUser(req)});
    });
};

module.exports.contact = function (req, res) {
    res.render("contact", {"user": session.getSessionUser(req)});
};

module.exports.about = function (req, res) {
    res.render("about", {"user": session.getSessionUser(req)});
};

module.exports.procedures = function (req, res) {
    res.render("procedures", {"user": session.getSessionUser(req)});
};

module.exports.admin = function (req, res) {
    queries.account.getAll(function (err, rows) {
        res.render("account/admin", {"user": session.getSessionUser(req), "users": rows});
    });
};

module.exports.supplier = function (req, res) {
    isSupplier(req, res, function () {
        queries.products.getBySupplier(session.getSessionUser(req).idUser, function (err, rows) {
            res.render("account/supplier", {"user": session.getSessionUser(req), "products": rows});
        });
    });
};

module.exports.submit_entry = function (req, res, next) {
    queries.guestBookEntries.add({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    }, function (err, result) {
        if (err)
            return next(err);

        module.exports.guestbook(req, res);
    });
};

module.exports.save_user_info = function (req, res) {
    var user = {
        name: req.body.name, email: req.body.email, password: req.body.password, hint: req.body.hint,
        isAdmin: req.body.isAdmin, isSupplier: req.body.isSupplier, idUser: req.body.idUser
    };
    queries.account.save_info(user, function (err, result) {
        session.sessionMapping[req.cookies.sessionID] = user;
        res.json({"success": true});
    });
};

module.exports.save_product_info = function (req, res) {
    var product = {
        name: req.body.name, qty: req.body.qty, description: req.body.description, price: req.body.price,
        hidden: req.body.hidden, idProduct: req.body.idProduct
    };
    queries.products.save_info(product, function (err, result) {
        res.json({"success": true});
    });
};

module.exports.add_product = function (req, res, next) {
    var product = {
        name: req.body.name, qty: req.body.qty, description: req.body.description, price: req.body.price,
        hidden: req.body.hidden, idSupplier: req.body.idSupplier
    };
    queries.products.add(product, function (err, result) {
        res.json({"success": true});
    });
};

module.exports.remove_product = function (req, res, next) {
    queries.products.remove(req.body.id, function (err, result) {
        res.json({"success": true});
    });
};

module.exports.become_supplier = function (req, res) {
    queries.account.become_supplier(req.body.idUser, function (err, result) {
        res.clearCookie("sessionID", {});
        res.json({"success": true});
    });
};
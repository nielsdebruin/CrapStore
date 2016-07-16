var queries = require("./../queries");
var session = require("./../session");

module.exports.cart = function (req, res, next) {
    var productIds = (req.cookies.cartItems) ? req.cookies.cartItems.split(",") : [];

    queries.products.getAll(productIds, function (err, rows) {
        if (err) return next(err);

        res.render("cart/cart", {"products": rows, "user": session.getSessionUser(req)})
    });
};

module.exports.payment = function (req, res) {
    var total = {};
    total.items = parseFloat(req.cookies.cartTotal);
    total.shipping = total.items * 2;
    total.subtotal = total.items + total.shipping;

    res.render("cart/payment", {"total": total, "user": session.getSessionUser(req)});
};

module.exports.create = function (req, res, next) {
    // Retrieving cart data from cookies, since we trust our users
    var productIDs = req.cookies.cartItems.split(",");
    var orderTotal = req.cookies.cartTotal;

    var order = {
        userId: req.user.idUser,
        products: productIDs
    };

    queries.orders.order(order, function (err) {
        if (err) return next(err);

        res.render("order/complete")
    });
};
/**
 * Connects all route functionality to the appropriate HTTP methods and route names
 */

var multer = require("multer");
var base = require("./base");
var account = require('./account');
var auth = require("./auth");
var order = require("./order");
var session = require("./../session");

module.exports = function (app) {
    // General routes
    app.get("/", base.index);
    app.get("/guestbook", base.guestbook);
    app.get("/products", base.products);
    app.get("/contact", base.contact);
    app.get("/account", account.panel);
    app.get("/about", base.about);
    app.get("/procedures", base.procedures);

    // Authentication
    app.get("/login", auth.login);
    app.get("/register", auth.register);
    app.get("/forgot", auth.forgot);
    app.post("/authorize", auth.authorize);
    app.post("/register_user", auth.register_user);
    app.post("/change_password", auth.change_password);

    // Admin activities
    app.get("/admin", base.admin);
    app.post("/submit_entry", base.submit_entry);
    app.post("/save_user_info", base.save_user_info);
    app.post("/become_supplier", base.become_supplier);

    // Supplier portal
    app.get("/supplier", session.isAuthenticated, base.supplier);
    app.post("/save_product_info", session.isAuthenticated, base.save_product_info);
    app.post("/add_product", session.isAuthenticated, base.add_product);
    app.post("/remove_product", session.isAuthenticated, base.remove_product);

    // Orders
    app.get("/cart", order.cart);
    app.get("/payment", session.isAuthenticated, order.payment);
    app.post("/order/place", order.create);

    // Configure image upload
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './client/images/products/')
        },
        filename: function (req, file, cb) {
            cb(null, req.body.idProduct + ".jpg")
        }
    });
    var upload = multer({storage: storage});
    app.post("/save_product_image", upload.single("productImage"), base.supplier);
};
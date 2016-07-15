var user            = require("./user");

module.exports = function(app) {
    app.get("/user/:id")
    app.put("/user/:id")
    app.get("/user/order/:id")
    app.get("/user/orders", user.orders)
}
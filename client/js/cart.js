/**
 * Cart object, responsible for putting items in the cart, removing them and updating the cart's information.
 */

var cart = {
    "EXPIRES": 7,
    // Adds a new item to the cart
    "add": function (id, updateAmount) {
        var items = (Cookies.get("cartItems")) ? Cookies.get("cartItems").split(",") : [];

        if (items.indexOf(id) == -1) {
            items.push(id);
            cart.updateTotal(updateAmount)
        }
        Cookies.set("cartItems", items.join(","), {"expires": 7})
    },
    // Removes an item from the cart
    "remove": function (id, updateAmount) {
        var items = (Cookies.get("cartItems")) ? Cookies.get("cartItems").split(",") : [];

        if (items.indexOf(id) > -1) {
            items.splice(items.indexOf(id), 1);
            cart.updateTotal(-1 * parseFloat(updateAmount));
        }
        Cookies.set("cartItems", items.join(","), {"expires": 7})
    },
    // Update the cart total
    "updateTotal": function (updateAmount) {
        updateAmount = parseFloat(updateAmount);

        var cartTotal = parseFloat(Cookies.get("cartTotal"));

        updateAmount = parseFloat(updateAmount);

        if (!cartTotal)
            cartTotal = 0.0;
        else {
            cartTotal = parseFloat(cartTotal)
        }

        cartTotal = Math.round((cartTotal + updateAmount) * 100) / 100;
        Cookies.set("cartTotal", cartTotal);

        $("#cart-subtotal").html(cartTotal);
    },
    // Checks whether an item is already present in the cart
    "inCart": function (id) {
        var items = (Cookies.get("cartItems")) ? Cookies.get("cartItems").split(",") : [];
        return (items.indexOf(id) > -1);
    }
};

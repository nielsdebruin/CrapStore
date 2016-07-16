var cart = {
    "EXPIRES": 7,
    "add": function (id, updateAmount) {
        var items = (Cookies.get("cartItems")) ? Cookies.get("cartItems").split(",") : [];

        if (items.indexOf(id) == -1) {
            items.push(id);
            cart.updateTotal(updateAmount)
        }
        console.log(items);
        Cookies.set("cartItems", items.join(","), {"expires": 7})
    },
    "remove": function (id, updateAmount) {
        var items = (Cookies.get("cartItems")) ? Cookies.get("cartItems").split(",") : [];

        if (items.indexOf(id) > -1) {
            items.splice(items.indexOf(id), 1);
            cart.updateTotal(-1 * parseFloat(updateAmount));
        }
        console.log(items);
        Cookies.set("cartItems", items.join(","), {"expires": 7})
    },
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
    "inCart": function (id) {
        var items = (Cookies.get("cartItems")) ? Cookies.get("cartItems").split(",") : [];
        return (items.indexOf(id) > -1);
    }
};

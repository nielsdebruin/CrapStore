/**
 * Event handlers for the products page
 */

$(document).ready(function () {
    var addToCartBtn = $(".addToCartBtn");

    // Handles the back button during search results mode
    $("#search-back").on("click", function () {
        location.href = "products";
    });

    // Sets all 'Add to cart' buttons to their initial state
    addToCartBtn.each(function () {
        if (cart.inCart($(this).data("id").toString())) {
            $(this).removeClass("btn-primary");
            $(this).html("IN CART");
            $(this).addClass("product-in-cart btn-success");
        }
    });

    // Handles 'Add to cart' button clicks, either adding the item, or removing it, if already added
    addToCartBtn.click(function () {
        var el = $(this);
        if (el.hasClass("product-in-cart")) {
            // Product already in cart
            $(this).removeClass("btn-success product-in-cart");
            $(this).html("ADD TO CART");
            $(this).addClass("btn-primary");
            cart.remove(el.data("id").toString(), el.data("price"))
        } else {
            // Add Product to cart
            $(this).removeClass("btn-primary");
            $(this).html("IN CART");
            $(this).addClass("product-in-cart btn-success");
            cart.add(el.data("id").toString(), el.data("price"));
        }
    })
});
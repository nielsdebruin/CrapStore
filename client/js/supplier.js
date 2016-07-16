/**
 * Event handlers for the supplier page
 */

$(document).ready(function () {
    // Handles supplier form submissions (used for changing the information of a given product)
    $(".supplier-form").on("submit", function (e) {
        e.preventDefault();
        var jsonData = $(this).serialize();

        $.post("save_product_info", jsonData,
            function (data) {
                $("h2").after($("<div class='alert alert-success'>").html("<strong>Product info changed!</strong>"));
                setTimeout(function () {
                    $(".alert-success").remove();
                    location.reload(true);
                }, 2000);
            }
        );
    });

    // Handles add product form submissions (used for adding a new product)
    $(".add-product-form").on("submit", function (e) {
        e.preventDefault();
        var jsonData = $(this).serialize();

        $.post("add_product", jsonData,
            function (data) {
                $("h2").after($("<div class='alert alert-success'>").html("<strong>Product added!</strong>"));
                setTimeout(function () {
                    $(".alert-success").remove();
                    location.reload(true);
                }, 2000);
            }
        );
    });

    // Handles remove product button clicks
    $(".remove-btn").on("click", function (e) {
        var that = this;
        var id = $(that).attr("data-id");

        $.post("remove_product", {id: id},
            function (data) {
                $(that).parent().parent().before($("<div class='alert alert-warning'>").html("<strong>This product will be removed within 2 seconds.</strong>"));
                setTimeout(function () {
                    $(".alert-warning").remove();
                    location.reload(true);
                }, 2000);
            }
        );
    });
});
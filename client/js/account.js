/**
 * Event handlers for the user account page
 */

(function () {
    // Connects the left bar with changes of sections upon click
    var $selection = $(".account section");
    $selection.hide();
    $selection.first().show();
    $(".account-sidebar a").click(function (e) {
        e.preventDefault();
        $(".account section").hide();
        $(".account section:nth-child(" + ($(".account-sidebar a").index($(this)) + 1) + ")").show()
    });

    // Handles account form submissions (used to change user info)
    $("#account-form").on("submit", function (e) {
        e.preventDefault();
        var jsonData = $(this).serialize();

        $.post("save_user_info", jsonData,
            function (data) {
                $("h3").after($("<div class='alert alert-success'>").html("<strong>User info changed!</strong>"));
                setTimeout(function () {
                    $(".alert-success").remove();
                    location.reload(true);
                }, 1500);
            }
        );
    });

    // Handles supplier form submissions (used to become a supplier)
    $("#become-supplier-form").on("submit", function (e) {
        e.preventDefault();
        var jsonData = $(this).serialize();

        $.post("become_supplier", jsonData,
            function (data) {
                $("h3").after($("<div class='alert alert-success'>").html("<strong>You have become a supplier! You will now be logged out, please log in again. Reloading in 3 seconds...</strong>"));
                setTimeout(function () {
                    $(".alert-success").remove();
                    location.reload(true);
                }, 3000);
            }
        );
    });
})();
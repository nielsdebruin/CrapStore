/**
 * Event handler for the user registering page
 */

$(document).ready(function () {
    // Handles registration form submissions (used for creating a new user account)
    $("#register-form").on("submit", function (e) {
        e.preventDefault();
        var jsonData = $(this).serialize();

        $.post("register_user", jsonData, function (data) {
                $(".register-btn").after($("<div class='alert alert-success'>").html("<strong>Register successful!</strong> Redirecting " +
                    "you to the login page."));
            setTimeout(function () {
                    location.href = "login";
                }, 3000);
            }
        );
    });
});
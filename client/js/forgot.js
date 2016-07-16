/**
 * Event handler for the 'Forgot Password' page
 */

$(document).ready(function () {
    // Handles 'Forgot Password' form submissions (used for resetting the password)
    $("#forgot-form").on("submit", function (e) {
        e.preventDefault();
        var jsonData = $(this).serialize();

        $.post("change_password", jsonData, function (data) {
            if (data.fail === true) {
                $(".alert-warning").remove();
                $(".register-btn").after($("<div class='alert alert-warning'>").text("Email and hint don't match."));
            } else {
                $(".alert-warning").remove();
                $(".register-btn").after($("<div class='alert alert-success'>").html("<strong>Password changed!</strong> Redirecting " +
                    "you to the login page."));
                setTimeout(function () {
                    location.href = "login";
                }, 3000);
            }
        });
    });
});
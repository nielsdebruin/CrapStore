/**
 * Event handler for the admin page
 */

$(document).ready(function () {
    // Handles admin form submission (used to change the data of users)
    $(".admin-form").on("submit", function (e) {
        e.preventDefault();
        var jsonData = $(this).serialize();

        $.post("save_user_info", jsonData,
            function (data) {
                $("h2").after($("<div class='alert alert-success'>").html("<strong>User info changed!</strong>"));
                setTimeout(function () {
                    $(".alert-success").remove();
                    location.reload(true);
                }, 2000);
            }
        );
    });
});
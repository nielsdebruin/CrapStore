$(document).ready(function () {
    $("#login-form").on("submit", function (e) {
        e.preventDefault();
        var jsonData = $(this).serialize();

        $.post("authorize", jsonData, function (data) {
                if (data.fail === true) {
                    $(".alert-warning").remove();
                    $(".login-btn").after($("<div class='alert alert-warning'>").text("Email and password don't match."));
                } else {
                    location.href = "/";
                }
            }
        );
    });
});
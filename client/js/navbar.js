$(document).ready(function () {
    $("#login-out").on("click", function () {
        if ($(this).attr("data-inout") === "out") {
            Cookies.remove("sessionID");
        }
    });
});
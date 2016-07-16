/**
 * Event handler for the navigation bar
 */

$(document).ready(function () {
    // Handles the Logout button
    $("#login-out").on("click", function () {
        if ($(this).attr("data-inout") === "out") {
            Cookies.remove("sessionID");
        }
    });
});
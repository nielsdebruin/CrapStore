/**
 * Event handler for the guestbook page
 */

$(document).ready(function () {
    // Handles guestbook form submissions (used for adding a new guestbook entry)
    $("#guestbook-form").on("submit", function (e) {
        e.preventDefault();
        var jsonData = $(this).serialize();
        console.log(jsonData);
        $.post("submit_entry", jsonData, function (data) {
                location.reload(true);
            }
        );
    });
});
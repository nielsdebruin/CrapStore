$(document).ready(function () {
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
(function () {
    var $selection = $(".account section");
    $selection.hide();
    $selection.first().show();
    $(".account-sidebar a").click(function (e) {
        e.preventDefault();
        $(".account section").hide();
        $(".account section:nth-child(" + ($(".account-sidebar a").index($(this)) + 1) + ")").show()
    });

    $("#account-form").on("submit", function (e) {
        e.preventDefault();
        var jsonData = $(this).serialize();

        $.post("save_user_info", jsonData,
            function (data) {
                $("h3").after($("<div class='alert alert-success'>").html("<strong>User info changed!</strong>"));
                setTimeout(function () {
                    $(".alert-success").remove();
                    location.reload(true);
                    console.log(jsonData);
                }, 1500);
            }
        );
    });

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
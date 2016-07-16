/**
 * Main entry point for the server application
 */
var serverPort = 1337;
var app = require("express")();

require("./config")(app);
require("./routes/routes")(app);

// Start the server on the given port and listen for requests
app.listen(serverPort, function () {
    console.log("Started server, listening on port " + serverPort);
});
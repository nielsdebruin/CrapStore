var app = require("express")();

require("./config")(app);

require("./routes/routes")(app);

app.listen(1337, function() {
  console.log("start server");
});
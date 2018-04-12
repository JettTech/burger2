// Dependencies
// ===========================================================
var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var exphbs = require("express-handlebars");

////////////// ***** NEW DEPENDENCIES TO ENSURE: ****** //////////////////
var exphbs = require("express-handlebars");


app.use(express.static(__dirname + "/public")); //this offers the public folder as
// local folder accessible to all files (the public folder becomes the new starting point for any files outside the folder to access any files within that folder.)

app.use(bodyParser.urlencoded({ extended: false }));
//app.use(methodOverride("method"));//this method will allow the POST to override with "?_method=DELETE"


// DEFINITION OF THE PORT and ENGINE
// ===========================================================
var PORT = process.env.PORT || 4000;  //This will allow the port to work off of the local port envorionemnt, defaulting to the localhost port 4000.
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars"); //THIS IS (and the app.engine above) the EXPHBS NPM functionality/syntax

// Routes
// =========================================================== 
var routes = require("./controllers/burgers_controller.js");
app.use("/", routes); //this will refer to the var "routes" above, which requires in thh Controller JS file.


// Listener
// ===========================================================
app.listen(PORT, function(request, result) {
	console.log("Hey there Developer!  You are listening on Port: " + PORT);
});
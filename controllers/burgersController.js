//ROLE OF THE Controller.JS FILE
// ===========================================================
//This CONNECTS the front-end/Client-end TO THE back END.
//...and "ROUTES" the request to the correct "extention," which leads to a chain
//  of sequential functions (between burger.js, and orm.js), which alter
//    the database && WEB-client display through "CRUD" stage/state changes.


// Dependencies
// ===========================================================
var express = require("express");
var router = express.Router(); //LOOK INTO THE EXPRESS NPM "ROUTER() Method"

// LOCAL REQUIREs (local files to require on over...)
// =========================================================== 
var burger = require("../models/burger.js");


// Routes
// =========================================================== 
router.get("/", function(request,response){
  response.redirect("/burgers");
})

router.get("/burgers", function(request, response){
  burger.all(function (burgerData) {
    response.render("index", {burger_data: burgerData});
  });
});

router.post("/burgers/create", function(request, response){
  burger.create(request.body.burger_name, function(response){
    console.log(response); //for NODE display (?!)
    response.redirect("/burgers"); //reloads (re-renders) the ROOT PAGE 
  });
});

router.put("/burgers/:id", function(request, response) {
  burger.update(request.params.id, function(response) {
    console.log(response);
    response.sendStatus(200); //once a "200/good" status is provided back to the router, then the script.js can finish it's promois AJAX call, whiech does result in reload the page.
  });
});

router.delete("/burgers/delete", function(request, response) {
  burger.delete(request.body.burger_id, function(response) {
    console.log(response);
    response.redirect("/burgers"); //reloads (re-renders) the ROOT PAGE 
  });
});

module.exports = router; //exporting the router, and all its routes (for ue on the server.js)
$(document).ready(function() {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    var string1 = "Welcome to your local burger shop!";

    var str1 = string1.split("");
    var element1 = document.getElementById('str1');
    (function animate() {
        var running = setTimeout(animate, 90);
        str1.length > 0 ? element1.innerHTML += str1.shift() : clearTimeout(running);  //ternary operator function
    })();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // AJAX CALLS > UPDATE PAGE CONTENT:
    $(".eatBurgerForm").on("submit", function(event) { //on the "devour-form" btn submit
        event.preventDefault();
        
        var burger_id = $(this).children(".burger_id").val();
        console.log(burger_id)
        $.ajax({
            method: "PUT",
            url: "/burgers/" + burger_id
        }).done(function(data) {
            // reload page to display devoured burger in proper column
            location.reload();
        })
    });

});
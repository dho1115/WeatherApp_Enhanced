
let temp = document.querySelector(".temp");
let circle = document.querySelector(".circle");
let tempNumber = parseInt(temp.textContent);
let input = document.querySelector("input");

var defaultLocation = "Chicago,IL";

//Create a FUNCTION that:
//(1) Can accept one of two arguments and (use the "||") and will use whichever returns TRUE. One will be the variable that the user enters (put this on the left side of the "||") and the other will act as the "default" value if the user enters a "falsy value" or doesn't enter one at all.
//(2) Encapsulates the "var" that defines the URL.
//(3) RETURNS the ENTIRE $.getJSON() value.

function FindWeatherConditions(enterlocation = document.querySelector("#enterlocation").value || "Chicago,IL") {

    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + enterlocation + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";   

    return $.getJSON
    (url,(jsonData) => 
    {$("#place").text(jsonData.query.results.channel.item.title);
    
    console.log("CONDITION(S): ",jsonData.query.results.channel.item.condition);
    $("#weather").text(jsonData.query.results.channel.item.condition.text);
    $("#date").text(jsonData.query.results.channel.item.condition.date);
    $(".temp").text(jsonData.query.results.channel.item.condition.temp);
    
    if(jsonData.query.results.channel.item.condition.temp > 101) {
        $(".circle").css("background-image","url('HotDesert.jpg')");
        $("body").css("background-color","rgb(255, 0, 0)");
    } 

    else if(jsonData.query.results.channel.item.condition.temp > 90) {
        //$(".circle").css("background-color","rgb(255, 0, 128)");
        $(".circle").css("background-image","url('summerII.jpg')");
        $("body").css("background-color","rgb(255, 0, 255)");
    } 

    else if(jsonData.query.results.channel.item.condition.temp > 60) {
        //$(".circle").css("background-color","rgb(255, 0, 255)");
        $(".circle").css("background-image", "url('spring.jpg')");
        //$("body").css("background-color","rgb(255, 102, 255)");
        $("body").css("background-image","url('stars1.jpg')");
    } 

    else if(jsonData.query.results.channel.item.condition.temp > 50) {
        //$(".circle").css("background-color","rgb(64, 255, 0)");
        $(".circle").css("background-image", "url('spring.jpg')");
    } 

    else if(jsonData.query.results.channel.item.condition.temp > 30) {
        $(".circle").css("background-image","url('cold.jpg')");
        $("body").css("background-color","rgb(0, 255, 255)");
    } 

    else if(jsonData.query.results.channel.item.condition.temp >= 0) {
        //$(".circle").css("background-color","rgb(0, 191, 255)");
        $(".circle").css("background-image","url('freezing.jpg')");
    }

    else {
        //$(".circle").css("background-color","rgb(0, 255, 255)");
        $(".circle").css("background-image","url('freezing.jpg')");
        $("body").css("background-color","rgb(0, 255, 255)");
    }
    
    console.log("WIND CHILL:  ",jsonData.query.results.channel.wind.chill);
    $("#windchill").text(jsonData.query.results.channel.wind.chill);
    
    console.log("WINDSPEED: ",jsonData.query.results.channel.wind.speed);
    $("#windspeed").text(jsonData.query.results.channel.wind.speed);
    
    console.log("WIND DIRECTION: ",jsonData.query.results.channel.wind.direction);    
    });     
    
} 

function storage() {   
    if (typeof(Storage) !== "undefined") {
        // Store
        localStorage.setItem("area", document.querySelector("#enterlocation").value);
        localStorage.setItem("DateEntered",Date());
        // Retrieve
        document.getElementById("lastlocation").textContent = localStorage.getItem("area");
        document.getElementById("lastviewed").textContent = localStorage.getItem("DateEntered");
    } else {
        document.getElementById("lastlocation").innerHTML = "Local storage not supported. Please check your browser.";
    } 
}

document.getElementById("lastlocation").textContent = localStorage.getItem("area");
document.getElementById("lastviewed").textContent = localStorage.getItem("DateEntered");

//CALL the function (that was defined above) below this comment. This will automatically set the default to Chicago.
FindWeatherConditions();
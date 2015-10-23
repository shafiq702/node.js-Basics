//Problem: We need a simple way to look up a zipcode to forecast the current weather for that zipcode
//Solution: Use Node.js to connect to OpenWeatherMap.org API to get weather information to print out
var http = require("http");

//Print out current weather
function printWeather(zipcode, weather ) {
    var message = "The current weather for " + zipcode + " is: " + weather + " degrees Kelvin.";  
    console.log(message);
}

//Print out error messages
function printError(error){
    console.error(error.message);
}
function get(zipcode){
    //Connect to API URL
    var request = http.get("http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us", function(response){
        var body = "";
        //Read the data
        response.on('data', function(chunk){
            body+= chunk;
        });
        response.on('end', function(){
            
            if(response.statusCode === 200){
                try{
                    //Parse the data
                    var weatherStats = JSON.parse(body);
                    //Print the data
                    printWeather(zipcode, weatherStats.main.temp);
                }catch(error){
                    //Parse Error
                    printError(error);
                }    
            }
            else{
                //Status Code Error
                printError({message: "There was a problem getting the weather for " + zipcode + ".(" + http.STATUS_CODES[response.statusCode]+ ")" });
            }
        });
    });
    //Connection Error
    request.on("error", printError);
}
module.exports.get = get;
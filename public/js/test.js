'use strict';

// Setting the default coordianates to FreightWise in Brentwood
let lat = 36.028880;
let long = -86.787250;
let searchURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long +
    "&APPID=25e989bd41e3e24ce13173d8126e0fd6";

class Test {
    constructor() {
        this.testResults = document.getElementsByClassName('test-results')[0];
        // When the page loads, request the location of the user
        this.location = this.getLocation();
    }

    async run() {
        console.log(new Date().toISOString(), '[Test]', 'Running the test');
        // // TODO: Make the API call and handle the results

        // Clear the div with the "test-results" class on the page
        this.testResults.innerHTML = ('').toString();

        // Use Axios to get data from the API
        try {
            // fetch data from the API and set the results
            const data = await axios.get(searchURL);
            this.setResults(data)
        } catch (error) {
            // appropriately handle the error
            this.setError(error);
        }
        
    }

    // Using the HTML geolocation API to get the users location
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setCoords);
        } else {
            // if the users location is unavailable, search for the weather at FreightWise in Brentwood
            console.error(error);
            searchURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long +
                "&APPID=25e989bd41e3e24ce13173d8126e0fd6";
        }
    };

    // Setting the users coordinates
    setCoords(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log("Lat: " + lat + " Long: " + long)
        searchURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long +
            "&APPID=25e989bd41e3e24ce13173d8126e0fd6"
    };

    setError(message) {
        // TODO: Format the error  
     
        // Add an error class to the body 
        document.body.classList.add("error");

        // Create a container in memory to hold the error data
        let errorContainer = document.createElement("div")
        errorContainer.className = "weatherContainer"

        // A basic header to accompany all errors
        let errorHeader = document.createElement("h2")
        errorHeader.innerText = "Oh NO!! We've encountered an error."

        // Display the current error message
        let error = message;
        let currentError = document.createElement("p");
        currentError.innerText = error;

        // Append the errorHeader and currentError to the weatherContainer
        // Append the weatherContainer to DOM 
        errorContainer.appendChild(errorHeader)
        errorContainer.appendChild(currentError)
        this.testResults.appendChild(errorContainer);
    }

    setResults(results) {
        // TODO: Format the results

        // Function for converting temperatures from kelvin to farenheight
        function convertTemp(temp) {
            return Math.round((temp - 273.15) * (9 / 5) + 32);
        }

        // Create a variable to reference for CSS 
        // Depending on the current weather.id given by the api, attach a corosponding class to the body
        let currentWeather = results.data.list[0].weather[0].id;
        console.log(currentWeather)
        if (currentWeather > 199 && currentWeather < 300) {
            console.log("thunderstorm")
            document.body.classList.add("thunderstorm");
        } else if (currentWeather > 299 && currentWeather < 400) {
            console.log("drizzle")
            document.body.classList.add("drizzle");
        } else if (currentWeather > 499 && currentWeather < 600) {
            console.log("rain")
            document.body.classList.add("rain");
        } else if (currentWeather > 599 && currentWeather < 700) {
            console.log("the world is ending")
            document.body.classList.add("snow");
        } else if (currentWeather > 699 && currentWeather < 800) {
            console.log("atmosphere")
            document.body.classList.add("atmosphere");
        } else if (currentWeather === 800) {
            console.log("clear")
            document.body.classList.add("clear");
        } else if (currentWeather > 800 && currentWeather < 805) {
            console.log("clouds")
            document.body.classList.add("clouds");
        }

        // Create a container to store all of the weather data
        let weatherContainer = document.createElement("div")
        weatherContainer.className = "weatherContainer"

        // A header for the current city and brief weather description
        let city = document.createElement("h2");
        city.innerText = "The current weather in " + results.data.city.name + " is " + results.data.list[
            0].weather[0].description;
        city.className = "city";

        // The current temperature, converted to farenheight
        let currentTemp = document.createElement("p")
        currentTemp.innerText = "The current temperature is " + convertTemp(results.data.list[0].main
            .temp);

        // The high temperature for the day
        let todayClouds = document.createElement("p")
        todayClouds.innerText = "The current cloud coverage is " + results.data.list[0].clouds.all + "%"

        // The current humidity level
        let currentHumidity = document.createElement("p")
        currentHumidity.innerText = "The current humidity level is " + results.data.list[0].main.humidity + "%"; 

        // Todays Sunset in unix time, then converted to MM/DD/HH/MM
        let unixSunset = results.data.city.sunset;
        let date = new Date(unixSunset*1000);
        
        // A paragraph tag to hold todays sunset data
        let todaysSunset = document.createElement("p")
        todaysSunset.innerText = "The sun will set at " + date.toLocaleTimeString(); 

        // Append the individual pieces of data into the weatherContainer
        weatherContainer.appendChild(city)
        weatherContainer.appendChild(currentTemp)
        weatherContainer.appendChild(todayClouds)
        weatherContainer.appendChild(currentHumidity)
        weatherContainer.appendChild(todaysSunset)

        // Append the weatherContainer to the DOM
        this.testResults.appendChild(weatherContainer);
        console.log(results)
    }
}
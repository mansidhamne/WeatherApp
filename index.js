let weather={
    apiKey: "3d2713c4dc5f3d989fc9074d2fa0074f",
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city+ "&units=metric&appid=" +this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    }, 
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = Math.round(temp)+"°C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+".png";
        document.querySelector(".desc").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".windspeed").innerText = "Windspeed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "&license=free')";
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
        document.querySelector(".search-bar").value="";
    }
};

document.querySelector("button").addEventListener("click", function() {
    weather.search();
});
document.querySelector(".search-bar").addEventListener("keyup", function(e){
    if(e.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Mumbai");
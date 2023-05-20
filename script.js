let weather={
    apiKey:"905c527377343f41495ecb45419381a9",
    fetchWeather:function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid="
            +this.apiKey
            ).then((response)=>response.json())
            .then((data)=>this.displayWeather(data));
    },
    displayWeather:function(data){
        const {name} = data;
        const {icon, description}=data.weather[0];
        const {temp, humidity}=data.main;
        const {speed}=data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerHTML="Weather in "+name;
        // document.querySelector("icon").src="https://openweathermap.org/img/wn/"+ icon + "@2x.png"
        document.querySelector(".description").innerHTML=description;
        document.querySelector(".temp").innerHTML=Math.round(temp*10)/10 + " °C";
        document.querySelector(".humidity").innerHTML="Humidity: "+ humidity+" %";
        document.querySelector(".wind").innerHTML="Wind speed: "+ speed+" m/s";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?"+ name +"')"
    },
    search:function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key=="Enter"){
        weather.search();
    }
});

weather.fetchWeather("London")

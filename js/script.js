// Declarações de Variaveis 

const keyAPI = "bc5d712089533d060ef3426826e81cfc";
const flagAPIUrl = "https://countryflagsapi.com/png/";
const unsplashAPIUrl = "https://source.unsplash.com/1600x900/?"

const searchInput = document.querySelector('.cityInput');
const btnSearch = document.querySelector('.search button');
const cityName = document.querySelector('.cityName span');
const cityFlag = document.querySelector('.cityFlag');
const temperature = document.querySelector('.temperature span');
const condition = document.querySelector('.condition span');
const conditionIcon = document.querySelector('.condition img');
const humidity = document.querySelector('.humidity span');
const wind = document.querySelector('.wind span');

const contentInfo = document.querySelector('.infos')

const contentError = document.querySelector('.error')

//Funções 




const hideInfos = () => {

    contentInfo.classList.remove('hide');
    
}

const getWeather = async (city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${keyAPI}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const weather = await res.json();

    if (weather.cod == "404") {
        contentError.classList.remove('hide');
        return;
    }

    cityName.innerHTML = weather.name;
    cityFlag.setAttribute('src', flagAPIUrl + weather.sys.country);
    temperature.innerHTML = parseInt(weather.main.temp);
    condition.innerHTML = weather.weather[0].description;
    conditionIcon.setAttribute('src' , `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`);
    humidity.innerHTML = `${weather.main.humidity}%`;
    wind.innerHTML = `${weather.wind.speed}km/h`;

    document.body.style.backgroundImage = `url("${unsplashAPIUrl + weather.name}")`

    hideInfos();

    

}



// eventos

btnSearch.addEventListener('click', async (e) => {
    
    e.preventDefault();

    
});

searchInput.addEventListener('keyup', (e) => {

    if(e.code == "Enter") {
        const city = e.target.value;

        getWeather(city)
    }
});

searchInput.addEventListener('change', async (e) => {

    if (searchInput.value == "") {
        contentInfo.classList.add('hide')
        contentError.classList.add('hide')
    }

    else {
        const city = searchInput.value;

        getWeather(city)
    }

})
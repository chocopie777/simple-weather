const inpSearch = document.getElementById('inp-search');
const btnSearch = document.getElementById('btn-search');
const weatherContent = document.querySelector('.weather-content');
const weatherCard = document.querySelector('.weather-card');
const btnLeft = document.querySelector('.weather-card__btn-left');
const btnLocation = document.querySelector('.btn-location');
const background = document.querySelector('.background');

let URL = "https://api.weatherapi.com/v1/current.json?key=c30ea8f295484f37b6d85901232308&q=";

btnSearch.addEventListener('click', () => {
    btnSearch.disabled = true;

    const city = inpSearch.value;
    inpSearch.value = '';

    document.querySelector('.notification span').innerText = 'Loading...';
    document.querySelector('.notification').setAttribute('class', 'notification loading');

    currentWeather(city);
    setTimeout(() => {
        btnSearch.disabled = false;
    }, 1500);
});

btnLeft.addEventListener('click', () => {
    weatherContent.classList.toggle('weather-content--off');
    weatherCard.classList.toggle('weather-card--off');
    background.src = 'images/background.webp';
});

btnLocation.addEventListener('click', () => {
    document.querySelector('.notification span').innerText = 'Loading...';
    document.querySelector('.notification').setAttribute('class', 'notification loading');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            currentWeather(position.coords.latitude, position.coords.longitude)
        }, (positionError) => {
            document.querySelector('.notification span').innerText = 'User denied geolocation';
            document.querySelector('.notification').setAttribute('class', 'notification error');
        })
    } else {
        document.querySelector('.notification span').innerText = 'Geolocation is not supported by your browser';
        document.querySelector('.notification').setAttribute('class', 'notification error');
    }
});

function currentWeather() {
    let newURL;

    if (arguments.length === 2) {
        newURL = URL + arguments[0] + ',' + arguments[1];
    } else {
        newURL = URL.concat(arguments[0]);
    }

    fetch(newURL).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('error fetching data');
        }
    }).then((data) => {

        document.querySelector('.notification').setAttribute('class', 'notification');

        document.querySelector('.weather-card__location-text').innerText = data.location.name;
        document.querySelector('.weather-card__weather-img').src = data.current.condition.icon;
        document.querySelector('.weather-card__weather-text').innerText = data.current.condition.text;
        document.querySelector('.weather-card__degrees-text').innerText = data.current.temp_c + ' C';
        document.querySelector('.weather-card__feels-degrees').innerText = data.current.feelslike_c + ' C';
        document.querySelector('.weather-card__humidity-percent').innerText = data.current.humidity + '%';

        background.src = 'images/background-card.webp';

        weatherContent.classList.toggle('weather-content--off');
        weatherCard.classList.toggle('weather-card--off');
    }).catch(error => {
        document.querySelector('.notification span').innerText = error;
        document.querySelector('.notification').setAttribute('class', 'notification error');
    });
}
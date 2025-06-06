document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const weatherDescription = document.getElementById('weather-description');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherInfo = document.querySelector('.weather-info');
    const errorMessage = document.getElementById('error-message');

    searchBtn.addEventListener('click', getWeather);
    cityInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            getWeather();
        }
    });

    function getWeather() {
        const city = cityInput.value.trim();
        
        if (city === '') {
            showError('Пожалуйста, введите название города');
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Город не найден');
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                showError(error.message);
            });
    }

    function displayWeather(data) {
        errorMessage.classList.add('hidden');
        
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        humidity.textContent = data.main.humidity;
        windSpeed.textContent = data.wind.speed;
        weatherDescription.textContent = data.weather[0].description;
        
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = data.weather[0].description;
        
        weatherInfo.classList.remove('hidden');
    }

    function showError(message) {
        weatherInfo.classList.add('hidden');
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }
});

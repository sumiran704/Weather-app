document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('cityInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherResult = document.getElementById('weatherResult');

    // Replace with your OpenWeatherMap API key
    const apiKey = 'YOUR_API_KEY_HERE';

    getWeatherBtn.addEventListener('click', function() {
        const cityName = cityInput.value.trim();
        if (cityName !== "") {
            getWeather(cityName);
        }
    });

    function getWeather(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.log('Error fetching weather data:', error));
    }

    function displayWeather(data) {
        if (data.cod === 200) {
            weatherResult.style.display = 'block';
            weatherResult.innerHTML = `
                <h4>${data.name}, ${data.sys.country}</h4>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        } else {
            weatherResult.style.display = 'block';
            weatherResult.innerHTML = `
                <p class="text-danger">City not found. Please try again.</p>
            `;
        }
    }
});
function displayWeather(data) {
    if (data.cod === "404") {
        weatherResult.style.display = 'block';
        weatherResult.innerHTML = `
            <p class="text-danger">City not found. Please try again.</p>
        `;
    } else if (data.cod === 200) {
        weatherResult.style.display = 'block';
        weatherResult.innerHTML = `
            <h4>${data.name}, ${data.sys.country}</h4>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherResult.style.display = 'block';
        weatherResult.innerHTML = `
            <p class="text-danger">Error fetching data. Please try again later.</p>
        `;
    }
}
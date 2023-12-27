
const apiKey = '340b5b76a019c6196184c3a409b1ee64';

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <table>
            <tr>
            <td><p class="weather-description">${data.weather[0].description}</p></td>
            <td><i class="wi wi-owm-${data.weather[0].id}"></i></td>
            </tr>
            </table>
            <div class="weather-details">
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Pressure: ${data.main.pressure} hPa</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
                <p>Humidity: ${data.main.humidity}%</p>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    getWeather('Purnia');
});

document.getElementById('searchButton').addEventListener('click', function () {
    const city = document.getElementById('cityInput').value;
    getWeather(city);
});

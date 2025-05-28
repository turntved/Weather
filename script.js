const icons = {
  Clear: '☀️',
  Rain: '🌧️',
  Snow: '❄️',
  Clouds: '☁️',
  Thunderstorm: '⛈️',
};

const bgColors = {
  Clear: '#FFD93D',
  Rain: '#5DADE2',
  Snow: '#85C1E9',
  Clouds: '#D6DBDF',
  Thunderstorm: '#F1C40F',
};

async function fetchWeather(city) {
  const apiKey = '340b5b76a019c6196184c3a409b1ee64';
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await res.json();

  if (data.cod !== 200) {
    document.getElementById('weather-info').innerHTML = `<p>City not found!</p>`;
    return;
  }

  const weather = data.weather[0].main;
  const temp = data.main.temp;
  const name = data.name;

  document.getElementById('weather-info').innerHTML = `
    <div class="weather-icon">${icons[weather] || '🌍'}</div>
    <h2>${name}</h2>
    <p>${temp}°C</p>
    <p>${weather}</p>
  `;

  gsap.to('body', {
    backgroundColor: bgColors[weather] || '#777',
    duration: 1.2,
    ease: 'power2.inOut'
  });
}

document.getElementById('city-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    fetchWeather(e.target.value);
  }
});

// Default city
fetchWeather('Tokyo');

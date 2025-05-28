const weatherIcons = {
  Clear: '☀️',
  Rain: '🌧️',
  Snow: '❄️',
  Clouds: '☁️',
  Thunderstorm: '⛈️',
  Drizzle: '🌦️',
  Mist: '🌫️',
};

const bgColors = {
  Clear: '#FFD93D',
  Rain: '#5DADE2',
  Snow: '#85C1E9',
  Clouds: '#7f8c8d',
  Thunderstorm: '#F1C40F',
  Drizzle: '#76D7C4',
  Mist: '#B2BABB',
};

async function fetchWeather(city) {
  const apiKey = '340b5b76a019c6196184c3a409b1ee64';
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  const data = await res.json();
  if (data.cod !== 200) {
    gsap.to("#weather-display", { opacity: 0, duration: 0.5 });
    document.getElementById("weather-display").innerHTML = `<p>City not found 😢</p>`;
    gsap.to("#weather-display", { opacity: 1, duration: 0.5 });
    return;
  }

  const weather = data.weather[0].main;
  const temp = data.main.temp.toFixed(1);
  const name = data.name;

  document.getElementById("weather-display").innerHTML = `
    <div class="weather-icon">${weatherIcons[weather] || '🌍'}</div>
    <h2>${name}</h2>
    <p>${temp}°C</p>
    <p>${weather}</p>
  `;

  gsap.to("body", {
    backgroundColor: bgColors[weather] || '#333',
    duration: 1.5,
    ease: "power2.inOut",
  });

  gsap.fromTo(
    "#weather-display",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
  );
}

document.getElementById("city-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchWeather(e.target.value.trim());
  }
});

// Default load
fetchWeather("Tokyo");

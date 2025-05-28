document.addEventListener("DOMContentLoaded", () => {
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

  const input = document.getElementById("city-input");
  const display = document.getElementById("weather-display");

  async function fetchWeather(city) {
    const apiKey = '340b5b76a019c6196184c3a409b1ee64';
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();

      if (!res.ok || !data.weather) {
        display.innerHTML = `<p>City not found 😢</p>`;
        return;
      }

      const weather = data.weather[0].main;
      const temp = data.main.temp.toFixed(1);
      const name = data.name;

      display.innerHTML = `
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
        display,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    } catch (error) {
      display.innerHTML = `<p>Error loading weather 🌪️</p>`;
    }
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const city = input.value.trim();
      if (city) {
        fetchWeather(city);
      }
    }
  });

  // Load default city
  fetchWeather("Tokyo");
});

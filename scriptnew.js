const API_KEY = "233d8fd87066536d45ae8068c8eab7a1";

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const message = document.getElementById("message");
const weather = document.getElementById("weather");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityName = cityInput.value.trim();
  if (!cityName) return;

  if (API_KEY === "233d8fd87066536d45ae8068c8eab7a1") {
    showMessage("Please add your OpenWeatherMap API key in script.js");
    weather.classList.add("hidden");
    return;
  }

  showMessage("Loading weather...");
  weather.classList.add("hidden");

  try {
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "City not found");
    }

    document.getElementById("city").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("wind").textContent = `${data.wind.speed} m/s`;
    document.getElementById("feels").textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById("icon").textContent = getWeatherEmoji(data.weather[0].main);

    message.textContent = "";
    weather.classList.remove("hidden");
  } catch (error) {
    showMessage(`Error: ${error.message}`);
  }
});

function showMessage(text) {
  message.textContent = text;
}

function getWeatherEmoji(condition) {
  const icons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Smoke: "🌫️",
    Haze: "🌫️",
    Dust: "🌪️",
    Fog: "🌫️",
    Sand: "🌪️",
    Ash: "🌋",
    Squall: "💨",
    Tornado: "🌪️"
  };

  return icons[condition] || "🌤️";
}

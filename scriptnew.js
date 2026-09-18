const API_KEY = "caf42afed6ba4d100d278d0a34c28148";

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const message = document.getElementById("message");
const weather = document.getElementById("weather");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cityName = cityInput.value.trim();

    if (!cityName) {
        return;
    }

    message.textContent = "Loading...";
    weather.classList.add("hidden");

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Weather data not found");
        }

        document.getElementById("city").textContent =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("description").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;

        document.getElementById("wind").textContent =
            `${data.wind.speed} m/s`;

        document.getElementById("feels").textContent =
            `${Math.round(data.main.feels_like)}°C`;

        document.getElementById("icon").textContent =
            getWeatherEmoji(data.weather[0].main);

        message.textContent = "";

        weather.classList.remove("hidden");

    } catch (error) {

        console.error(error);

        message.textContent = `Error: ${error.message}`;
    }
});


function getWeatherEmoji(condition) {

    const icons = {
        Clear: "☀️",
        Clouds: "☁️",
        Rain: "🌧️",
        Drizzle: "🌦️",
        Thunderstorm: "⛈️",
        Snow: "❄️",
        Mist: "🌫️",
        Haze: "🌫️",
        Fog: "🌫️"
    };

    return icons[condition] || "🌤️";
}

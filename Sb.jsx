import React, { useState } from "react";
import Card from "./Card";
function Sb() {
  const [time, setTime] = useState("");
  const [date, setdate] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    const apiKeyWeather = "d18d02c7643be78b2812c7037bcca88b"; // OpenWeatherMap API Key
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}`;

    try {
      const res = await fetch(urlWeather);
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);

        // Get the time from TimeZoneDB API using latitude and longitude
        const apiKeyTimeZoneDB = "LYWO0T623V1J"; // TimeZoneDB API Key
        const urlTimeZone = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKeyTimeZoneDB}&format=json&by=position&lat=${data.coord.lat}&lng=${data.coord.lon}`;

        try {
          const timeRes = await fetch(urlTimeZone);
          const timeData = await timeRes.json();
          if (timeData.status === "OK") {
            const time = timeData.formatted.split(" ");

            setTime(time[1]); // Setting the formatted time
            setdate(time[0]);
          }
        } catch (err) {
          console.error("Error fetching time data:", err);
          setError("");
        }
      } else {
        setWeather(null);
        setError(data.message || "Failed to fetch weather data.");
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setWeather(null);
      setError("An error occurred while fetching weather data.");
    }
  };

  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="city"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {weather && (
        <Card
          Weather={weather.name}
          Description={weather.weather[0].description}
          Temperature={(weather.main.temp - 273.15).toFixed(2)}
          Humidity={weather.main.humidity}
          Time={time}
          date={date}
        />
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Sb;

import React from "react";

function Card(props) {
  var custom = {
    backgroundColor: "blue",
  };
  var icon = "☀️";
  if (
    props.Description.toLowerCase().includes("haze") ||
    props.Description.toLowerCase().includes("clouds")
  ) {
    custom.backgroundcolor = "gray";
    icon = "🌩️";
  }

  return (
    <div style={custom}>
      <h3>
        Weather in {props.Weather}
        {icon}
      </h3>
      <div className="card">
        <div className="weather">
          <p>Description: {props.Description}</p>
          <p>Temperature: {(props.Temperature - 273.15).toFixed(2)}°C</p>
          <p>Humidity: {props.Humidity}%</p>
        </div>
        <div className="time">
          <p>Time{props.Time}</p>
          <p>Date: {props.date}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;

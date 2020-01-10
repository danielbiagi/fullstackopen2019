import React from "react";

const Weather = props => {
  console.log("weather props", props);
  if (props.weather !== undefined) {
    const { temperature, wind_speed, wind_dir, weather_icons } = props.weather;
    let icon = weather_icons ? weather_icons : null;
    return (
      <div>
        <h3>{props.capital}</h3>
        <b>temperature: </b> {temperature} º C<br />
        <img src={icon} alt="" /> <br />
        <b>wind: </b> {wind_speed} kph direction {wind_dir} <br />
      </div>
    );
  } else
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
};

export default Weather;

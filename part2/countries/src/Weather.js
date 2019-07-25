import React from 'react'

const Weather = (props) => {
    if (props.weather.condition !== undefined) {
        const { temp_c, condition, wind_kph, wind_dir } = props.weather
        const { icon } = condition
        return (
            <div>
                <h3>{props.capital}</h3>
                <b>temperature: </b> {temp_c} º C<br />
                <img src={icon} alt="" /> <br />
                <b>wind: </b> {wind_kph} kph direction {wind_dir} <br />
            </div>
        )
    } else
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
}


export default Weather
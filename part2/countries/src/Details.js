import React, { useState } from 'react'
import Weather from './Weather'
import axios from 'axios'

const Details = (props) => {
    const [oneTime, setOneTime] = useState(false)
    const [weather, setWeather] = useState([])
    const [country, setCountry] = useState('')
    const getWeather = () => {
        const city = props.country.capital
        const url = "http://api.apixu.com/v1/current.json?key=d4f7b4f8ecbc4f7aa39223619192307&q=" + city
        axios
            .get(url)
            .then(response => {
                setWeather(response.data.current)
                setOneTime(false)
                setCountry(props.country.name)
                return weather
            })
    }

    if (props.country.name) {
        if (props.country.name !== country) {
            if (!oneTime) {
                getWeather()
                setOneTime(true)
            }
        }

        return (
            <div>
                <h1>{props.country.name}</h1>
                capital {props.country.capital}<br />
                population {props.country.population}<br />
                <h2>languages</h2>
                {props.country.languages && props.country.languages.map(el => {
                    return <React.Fragment key={el.name}><li>{el.name}</li></React.Fragment>
                })}
                <img src={props.country.flag} alt="" width="200px" />
                <Weather weather={weather} capital={props.country.capital} />
            </div>
        )
    } else return (<> </>)
}


export default Details
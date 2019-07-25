import React, { useState, useEffect } from 'react'
import Details from './Details'
import './App.css';
import axios from 'axios'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setCountry([])
  }

  const handleButtonClick = (c) => {
    setFilter(c.name)
    setCountry(c)
  }

  const rowsFilter = () => {
    if (filter === "") return countries
    else {
      const filtered = countries.filter(
        country => {
          const cName = country['name'].toUpperCase()
          return cName.includes(filter.toUpperCase())
        }
      )
      return filtered
    }
  }

  const rows = () => {
    const rowsF = rowsFilter()
    if (rowsF.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
    return rowsF.map(c =>
      <React.Fragment key={c.name}><li> {c.name} <button type="button" onClick={() => handleButtonClick(c)} >show</button></li > </React.Fragment>
    )
  }

  return (
    <>
      <div>
        find countries: <input value={filter} onChange={handleFilterChange} />
        {rows()}
      </div>
      <div>
        <Details country={country} />
      </div>
    </>
  );
}

export default App;

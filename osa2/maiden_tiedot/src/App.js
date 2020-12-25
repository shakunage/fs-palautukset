import React, { useState, useEffect} from 'react'
import axios from 'axios'

const ShowButton = (props) => {

  return (
    <button type="show" onClick={event => props.nameSearch(event, props.countryName)}>show</button>
  )
}

const Filter = (props) => {
  
  return (
    <p>
      find countries: <input
          value={props.inputValue}
          onChange={props.function}
        />
    </p>
  )
}

const Country = (props) => {

  const country = props.country
  const getWeather = props.getWeather

  useEffect(() => {
    if (!(country.name === "Too many matchers, speficy another filter") && props.countryCount.length === 1) {
      console.log('sää usari')
      getWeather(country.capital)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country.capital])


  if (country.name === "Too many matchers, speficy another filter") {
    return (
      <p>
        {country.name}
      </p> 
    )
  }   

  if (props.countryCount.length === 1) {

      return (
        <div> 
          <h1>{country.name}</h1>
          capital {country.capital}
          <br></br>
          population {country.population}
          <h2>languages</h2>
          <ul> 
          {country.languages.map((language, i) => 
              <li key={i}>
                {language.name}
              </li>
          )}
          </ul>
          <br></br>
          <img src={props.country.flag} style={{ height: 100, width: 75 }} alt="flag"></img>
          <h1> Current weather in {country.capital}</h1>
          <b>temperature:</b> {props.weather.temperature} celsius
          <br></br>
          <img src={props.weather.weather_icons} style={{ height: 100, width: 75 }} alt={props.weather.weather_descriptions} ></img>
          <br></br>
          <b>wind:</b> {props.weather.wind_speed} mph <b>direction</b> {props.weather.wind_dir}
        </div>
      )
  }
  
  return (
    <p>
      {props.country.name} <ShowButton countryName={props.country.name} nameSearch={props.nameSearch} />
    </p>    
  )
}

const App = () => {
  
  const [nameSearch, setNameSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  let countriesToShow = countries.filter(country => country.name.toLowerCase().indexOf(nameSearch) > -1)

  if (countriesToShow.length > 10) {
    countriesToShow = [{name: "Too many matchers, speficy another filter"}]
    console.log(countriesToShow.length)
  }
  
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNameSearch(event.target.value.toLowerCase())
  }

  const getWeather = (city) => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`)
    .then(response => {
      console.log('promise fulfilled')
      console.log("LÄMPÖTILA ON " + response.data.current.temperature)
      setWeather(response.data.current)
        })
  }

  const handleLeftClick = (event, name) => {
    setNameSearch(name.toLowerCase())
  }

  return (
    <div>
      <Filter value={nameSearch} function={handleFilterChange} />
      <ul> 
        {countriesToShow.map((country, i) => 
            <Country nameSearch={handleLeftClick} weather={weather} getWeather={getWeather} countryCount={countriesToShow} key={i} country={country}/>
        )}
      </ul>
    </div>

  )
}

export default App;

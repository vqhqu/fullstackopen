import { useState, useEffect } from 'react'
import countriesService from './countriesService'

const Flag = ({flagUrl}) => {
  return <img src={flagUrl}/>
}

const Weather = ({weather, city}) => {
  if ( weather === null ) return null
  console.log('weather in comp is', weather)
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>temperature {weather.main.temp-273.15} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
      <p>wind {weather.wind.speed} m/s</p>
      </div>
  )
}

const Country = ({country}) => {
  return (
  <div>
    <h2>{country.name.common}</h2>
    capital {country.capital}<br/>
    area {country.area}
    <h3>languages</h3>
    <ul>
      {Object.values(country.languages).map(s => <li key={s}>{s}</li>)}
    </ul>
    <Flag flagUrl={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

const Countries = ({countries,  handleClick, country}) => {

  if (countries.length >= 10) return <div>too many countries</div>
  return (<div>{countries.map((c) => <li key={c.name.common}>{c.name.common} <button onClick={() => handleClick(c)}>show</button></li> )}</div>)
}

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [showCountry, setShowCountry] = useState([])
  const [showOneCountry, setShowOneCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const clickHandler = (country) => {
    setShowOneCountry(country)
    countriesService.getWeather(country).then( (response) => {
      setWeather(response)
    })
  }

  const countryChangeHandler = (event) => {
    const search = event.target.value
    setSearchCountry(event.target.value)
    
    const countries = (allCountries.filter( (c) => c.name.common.toLowerCase().includes(search.toLowerCase())
    || c.name.official.toLowerCase().includes(search.toLowerCase())))
    if ( countries.length === 1) {
      console.log('country0 is', countries[0])
      setShowOneCountry(countries[0])
      countriesService.getWeather(countries[0]).then( (response) => {
        console.log('here', response)
        setWeather(response)})
    }
    else {
      setShowOneCountry(null)
      setWeather(null)
      setShowCountry(countries)
    }
    //console.log(event)
  }

  useEffect( () => {
    countriesService.getAll()
    .then( (response) => {
      setAllCountries(response)
      setShowCountry(response)
    })
  }, [] )

  if ( showOneCountry !== null ) {
    console.log('weather is now', weather)
    return (
    <div>
      <input value={searchCountry} onChange={countryChangeHandler}></input>
      <Country country={showOneCountry} />
      <Weather weather={weather} city={showOneCountry.capital} />
    </div>
    )
  }

  return (
    <div>
      <input value={searchCountry} onChange={countryChangeHandler}></input>
      <Countries countries={showCountry} handleClick={clickHandler} country={showOneCountry} />
    </div>
  )
}

export default App

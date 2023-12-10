import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const api_key = import.meta.env.VITE_OPENWEATHER_KEY
console.log(api_key)

const getAll = () => {
    return axios.get(`${baseUrl}/all`)
    .then( (response) => response.data )
}

const getCountry = ({country}) => {
    return axios.get(`${baseUrl}/all/${country}`)
    .then( (response) => response.data)
}

const getWeather = (country) => {
    const lat = country.latlng[0]
    const lon = country.latlng[1]
    const weather_request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    return weather_request.then(response => response.data)
}
export default {
    getAll,
    getCountry,
    getWeather
}
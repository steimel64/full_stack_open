import React from 'react'
import GetWeather from './GetWeather'

const ShowResults = ({ countriesFiltered, setCountries, setCountry, country }) => {
    console.log(countriesFiltered.length)
    if (countriesFiltered.length > 10 || countriesFiltered.length === 0)
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    if (countriesFiltered.length > 1 && countriesFiltered.length <= 10) {
        const listItems = countriesFiltered.map(country => <li key={country.id}>{country.name.common} <button onClick={() => setCountries([country])}>show</button></li>)
        return (<div>
            {listItems}
        </div>
        )
    }
    if (countriesFiltered.length === 1) {
        const country = countriesFiltered[0]

        return (
            <div>
                <h1>{country.name.common}</h1>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>
                <h3>languages</h3>
                <ul>
                    {Object.keys(country.languages).map(language => <li> {country.languages[language]}</li>)}
                </ul>
                <img src={country.flags.png} alt={country.name} width='10%' />
                <GetWeather capital={country.capital} />
            </div>
        )
    }
}


export default ShowResults

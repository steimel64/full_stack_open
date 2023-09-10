import { useState, useEffect } from 'react'
import axios from 'axios'
import ShowResults from './components/ShowResults'

const App = () => {
  const [searchvalue, setSearchValue] = useState('')
  const [countriesList, retrieveCountries] = useState([])
  const [countriesFiltered, setCountries] = useState([])

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then(response => retrieveCountries(response.data))
  }, [])


  const handleChange = (event) => {
    setSearchValue(event.target.value)
    setCountries(countriesList.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }


  //}

  return (
    <div>
      find countries: <input value={searchvalue} onChange={handleChange} />
      <ShowResults countriesFiltered={countriesFiltered} setCountries={setCountries} />
    </div>
  )
}

export default App


// Exercise 2.18 Complete 9/8
// Exercise 2.19 Complete 9/10
// Exercise 2.20 Complete 9/10

import { useState } from 'react'
import { Today } from '../components/Today.jsx'
import { WeatherWeek } from '../components/WeatherWeek.jsx'
import { AddLocation } from './AddLocation.jsx'
import '../styles/app.css'

function App () {
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('London')

  return (
    <>
      <section className='app'>
        {isSearching ? (
          <AddLocation sendCountry={setSelectedCountry} sendSearch={setIsSearching} />
        ) : (
          <>
            <Today sendCountry={selectedCountry} sendSearch={setIsSearching} />
            {(!isSearching || window.innerWidth >= 768) && <WeatherWeek sendCountry={selectedCountry} />}
          </>
        )}
      </section>
    </>
  )
}

export default App
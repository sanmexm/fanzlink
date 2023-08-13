import React from 'react'
import {AboutUs, Category, Features, Hero, Service} from '../../components'

import './home.css'

const Home = () => {
  return (
    <>
      <div className='home-wrapper'>
        <Hero />

        <AboutUs />

        <Features />

        <Category />

        <Service />
      </div>
    </>
  )
}

export default Home
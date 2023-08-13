import React from 'react'

import { FacebookRoundedIcon, InstagramIcon, SearchRoundedIcon, TwitterIcon } from '../../../utils/constants'
import './hero.css'

const Hero = () => {
  return (
    <>
      <div className='hero'>
        <div className="hero-content">
          <h1>Welcome to Fanzlink</h1>
          <p>Find a new product</p>
          <form className='hero-form-wrapper'>
            <div className='hero-form-input-wrapper'>
              <input type="text" placeholder='Search' autoComplete='off' />
              <button className='hero-search-btn'><SearchRoundedIcon /></button>
            </div>
            <div className='hero-form-result' style={{'display': 'none'}}>
              <ul>
                <li>hfdjhdfhdf</li>
                <li>jfdljfdfdkl</li>
                <li>jfdskjfd</li>
                <li>jfdskjfd</li>
                <li>jfdskjfd</li>
              </ul>
            </div>
          </form>
          <div className='hero-social'>
            <span className='hero-social-title'>follow us</span>
            <div className='hero-social-icons'>
              <FacebookRoundedIcon />
              <TwitterIcon />
              <InstagramIcon />
            </div>
          </div>
        </div>
        <div className='hero-image'>
          {/* <img src={img1} alt="img hero" /> */}
        </div>
      </div>
    </>
  )
}

export default Hero
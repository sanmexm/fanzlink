import React from 'react'

import { SearchRoundedIcon } from '../../utils/constants'
import './searchProfileHeader.css'

const SearchProfileHeader = () => {
  return (
    <>
      <div className="search-form-container">
        <form className='search-form-wrapper'>
          <div className='search-form-input-wrapper'>
            <input type="text" placeholder='Search' autoComplete='off' />
            <button className='search-form-btn'><SearchRoundedIcon /></button>
          </div>
          <div className='search-form-result' style={{'display': 'none'}}>
            <ul>
              <li>hfdjhdfhdf</li>
              <li>jfdljfdfdkl</li>
              <li>jfdskjfd</li>
              <li>jfdskjfd</li>
            </ul>
          </div>
        </form>
      </div>
    </>
  )
}

export default SearchProfileHeader
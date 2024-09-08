import React, { useState } from 'react'
import { ArrowDownwardRoundedIcon, ArrowUpwardRoundedIcon } from '../../utils/constants'
import { about, email, facebook, twitter, verification } from '../../assets'
import './userProfile.css'

const UserProfile = () => {
    // const authData                                      = JSON.parse(localStorage.getItem('authData'))
    // const UserUniqueId          = authData?.result?._id +''+ authData?.result?.firstName +' '+ authData?.result?.lastName
    // const userUniqueId                                  = authData?.result?._id
    const [toggleBtn, setToggleBtn] = useState(false)

    const toggleButton = () => {
        setToggleBtn((prev) => !prev)
    }

  return (
    <>
        <div className='profile-card-container'>
            <div className={toggleBtn ? 'profile-card-wrapper active' : 'profile-card-wrapper'}>
                <div className='profile-card-user' style={{ backgroundImage: `url(${about})`,}}>
                <div class="overlayStyle"></div>
                    <div className='profile-card-imgBx'>
                        <img src={about} alt='profile img' />
                    </div>
                    <div className='profile-card-content'>
                        <h2>Mr. Man <img src={verification} alt='verification'/></h2>
                        <span>Musician</span>
                    </div>
                    <span className='profile-card-toggle' onClick={toggleButton}>{toggleBtn ? <ArrowUpwardRoundedIcon /> : <ArrowDownwardRoundedIcon />}</span>
                </div>

                <ul className='profile-card-contact'>
                    <li>
                        <a href='/'>
                            <div className='profile-card-icon'><img src={email} alt='email' /></div>
                            <p>example@email.com</p>
                        </a>
                    </li>
                    <li>
                        <a href='/'>
                            <div className='profile-card-icon'><img src={twitter} alt='whatsapp' /></div>
                            <p>twitter/username</p>
                        </a>
                    </li>
                    <li>
                        <a href='/'>
                            <div className='profile-card-icon'><img src={facebook} alt='facebook' /></div>
                            <p>facebook/username</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default UserProfile
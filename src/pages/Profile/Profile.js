import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ProfileMainContent, ProfileSideContent } from '../../components'

import './profile.css'

const Profile = () => {

  return (
    <>
        <Helmet><title>Profile</title></Helmet>
        <div className='container'>
            <div className='profile-main-content'>
              <ProfileMainContent />
            </div>
            <div className='profile-side-content'>
              <ProfileSideContent />
            </div>
        </div>
    </>
  )
}

export default Profile
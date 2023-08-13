import React from 'react'

import { Helmet } from 'react-helmet-async'
import { EditProfileImageMainContent, EditProfileImageSideContent } from '../../components'
import './editProfileImage.css'

const EditProfileImage = () => {
  return (
    <>
        <Helmet><title>Edit Profile Image</title></Helmet>
        <div className='container'>
          <div className='edit-profile-image-main-content'>
              <EditProfileImageMainContent />
          </div>
          <div className='edit-profile-image-side-content'>
              <EditProfileImageSideContent />
          </div>
        </div>
    </>
  )
}

export default EditProfileImage
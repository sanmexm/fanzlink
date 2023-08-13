import React from 'react'

import { Helmet } from 'react-helmet-async'
import { EditProfileMainContent, EditProfileSideContent } from '../../components'
import './editProfile.css'

const EditProfile = () => {
  return (
    <>
        <Helmet><title>Edit Profile Information</title></Helmet>
        <div className='container'>
          <div className='edit-profile-image-main-content'>
              <EditProfileMainContent />
          </div>
          <div className='edit-profile-image-side-content'>
              <EditProfileSideContent />
          </div>
        </div>
    </>
  )
}

export default EditProfile
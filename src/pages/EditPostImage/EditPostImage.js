import React from 'react'

import { Helmet } from 'react-helmet-async'
import { EditPostImageMainContent, EditPostImageSideContent } from '../../components'
import './editPostImage.css'

const EditPostImage = () => {
  return (
    <>
        <Helmet><title>Edit Image post</title></Helmet>
        <div className='container'>
          <div className='edit-post-image-main-content'>
              <EditPostImageMainContent />
          </div>
          <div className='edit-post-image-side-content'>
              <EditPostImageSideContent />
          </div>
        </div>
    </>
  )
}

export default EditPostImage
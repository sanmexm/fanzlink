import React from 'react'
import { Helmet } from 'react-helmet-async'
import { EditPostMainContent, EditPostSideContent } from '../../components'
import './editPost.css'

const EditPost = () => {
  return (
    <>
      <Helmet><title>Edit post</title></Helmet>
      <div className='container'>
        <div className='edit-post-main-content'>
            <EditPostMainContent />
        </div>
        <div className='edit-post-side-content'>
            <EditPostSideContent />
        </div>
      </div>
    </>
  )
}

export default EditPost
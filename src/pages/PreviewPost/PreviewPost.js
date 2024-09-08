import React from 'react'

import { Helmet } from 'react-helmet-async'
import { PreviewPostMainContent, PreviewPostSideContent } from '../../components'
import './previewPost.css'

const PreviewPost = () => {
  return (
    <>
        <Helmet><title>preview</title></Helmet>
        <div className='container'>
            <div className='preview-post-main-content'>
              <PreviewPostMainContent />
            </div>
            <div className='preview-post-side-content'>
              <PreviewPostSideContent />
            </div>
        </div>
    </>
  )
}

export default PreviewPost
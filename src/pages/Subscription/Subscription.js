import React from 'react'

import { Helmet } from 'react-helmet-async'
import { SubscriptionMainContent, SubscriptionSideContent } from '../../components'
import './subscription.css'

const Subscription = () => {

  return (
    <>
        <Helmet><title>Subscription</title></Helmet>
        <div className='container'>
            <div className='subscription-main-content'>
                <SubscriptionMainContent />
            </div>
            <div className='subscription-side-content'>
                <SubscriptionSideContent />
            </div>
        </div>
    </>
  )
}

export default Subscription
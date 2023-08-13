import React from 'react'
import { freeSubscriptionPlan, painSubscriptionPlan } from '../../../utils/constants'
import { Button } from '../../'
import './subscriptionMainContent.css'

const SubscriptionMainContent = () => {
  
  return (
    <>
      <div className='subscription-main-wrapper'>
        <div className='subscription-card-wrapper'>
          <h1>Choose a Plan</h1>
          <div className='subscription-card-container'>
            <div className='subscription-card'>
              <h2>Free</h2>
              <span>&#8358;3000<small>/MO</small></span>
              <ul>
                {freeSubscriptionPlan.map((sub, index) => (
                  <li key={index}>
                    <span>{sub.image}</span>
                    <p>{sub.text}</p>
                  </li>
                ))}
              </ul>
              <Button buttonWrapper="button-wrapper" linkButton linkTo="/about" linkClass="link-wrapper" linkName="Choose Plan" />
            </div>

            <div className='subscription-card'>
              <h2>Paid</h2>
              <span>&#8358;5500<small>/MO</small></span>
              <ul>
                {painSubscriptionPlan.map((sub, index) => (
                  <li key={index}>
                    <span>{sub.image}</span>
                    <p>{sub.text}</p>
                  </li>
                ))}
              </ul>
              <Button buttonWrapper="button-wrapper" linkButton linkTo="/about" linkClass="link-wrapper" linkName="Choose Plan" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubscriptionMainContent
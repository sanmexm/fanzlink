import React from 'react'
import { userImage, verification } from '../../assets'
import { Button } from '../'
import './userHeader.css'

const UserHeader = ({ viewProfileBtn, spanTitle }) => {
  const authData              = JSON.parse(localStorage.getItem('authData'))
  // const UserUniqueId          = authData?.result?._id
  const userFirstName         = authData?.result?.firstName
  const userLastName         = authData?.result?.lastName
  
  return (
    <>
      <div className='personal-profile-info-container'>
        <div className='personal-info-container-inner-main'>
            <div className='personal-info-container-inner-img-wrapper'> 
              <img src={userImage} alt="profile img" className='personal-info-picture' />
            </div>
            <div className='personal-info-container-inner-detail'>
                <h2>Hi {userFirstName} .{userLastName.charAt(0)} <img src={verification} alt='verification' title='verified account'/></h2>
                <span>welcome to your {spanTitle}</span>
                {viewProfileBtn && <Button buttonWrapper="button-wrapper" linkButton linkTo="/profile/user" linkClass="link-wrapper" linkName="View Profile" />}
            </div>
        </div>
      </div>
    </>
  )
}

export default UserHeader
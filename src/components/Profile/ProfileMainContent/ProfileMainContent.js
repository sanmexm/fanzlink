import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchUser } from '../../../actions/users'
import { EditRoundedIcon, PhotoRoundedIcon } from '../../../utils/constants'
import { UserHeader, Button, Loader } from '../../'
import './profileMainContent.css'
// PersonRoundedIcon

const ProfileMainContent = () => {
  const authData                    = JSON.parse(localStorage.getItem('authData'))
  const userId                      = authData?.result?._id
  const dispatch                    = useDispatch()
  const { user, isLoading }         = useSelector((state) => state.usersLists)

  useEffect(() => {
    dispatch(fetchUser(userId))
  }, [userId, dispatch])

  return (
    <>
      {isLoading ? (
          <Loader />
        ) : (
        user ? (
        <div className='profile-post-wrapper'>

          <div className='profile-post-header'>
            <div className='profile-post-header-left'>
              <UserHeader spanTitle="profile" />
            </div>

            <div className='profile-post-header-right'>
              <Button buttonWrapper="button-wrapper" linkButton linkTo="/profile/edit-profile-image" linkClass="transparent-link-wrapper" linkName="Edit Image" title="Change Image" linkIcon={<PhotoRoundedIcon />} />
            </div>
          </div>

          <div className='profile-post-body-wrapper'>
            <div className='profile-post-body-head'>
              <h3>profile information</h3>
              <Button buttonWrapper="button-wrapper" linkButton linkTo="/profile/edit-profile" linkClass="transparent-link-wrapper" linkName="Edit profile information" title="Edit personal information" linkIcon={<EditRoundedIcon />} />
            </div>
            
            <div className='profile-post-body-details-wrapper'>
              <div className='profile-post-details-title'>
                first name:
              </div>
              <div className='profile-post-details-main'>
                {user.firstName}
              </div>
            </div>
            
            <div className='profile-post-body-details-wrapper'>
              <div className='profile-post-details-title'>
                last name:
              </div>
              <div className='profile-post-details-main'>
              {user.lastName}
              </div>
            </div>

            <div className='profile-post-body-details-wrapper'>
              <div className='profile-post-details-title'>
                Email Address:
              </div>
              <div className='profile-post-details-main'>
              {user.emailAddress}
              </div>
            </div>

            <div className='profile-post-body-details-wrapper'>
              <div className='profile-post-details-title'>
                Primary Phone:
              </div>
              <div className='profile-post-details-main'>
              {user.primaryPhone}
              </div>
            </div>

            <div className='profile-post-body-details-wrapper'>
              <div className='profile-post-details-title'>
                username:
              </div>
              <div className='profile-post-details-main'>
              {user.username}
              </div>
            </div>
          </div>

          <div className='profile-post-body-wrapper'>
            <div className='profile-post-body-head'>
              <h3>social links</h3>
              {/* address 
              social links */}
              <Button buttonWrapper="button-wrapper" linkButton linkTo="/edit-social-information" linkClass="transparent-link-wrapper" linkName="Edit social information" title="Edit social information" linkIcon={<EditRoundedIcon />} />
            </div>
            
            <div className='profile-post-body-details-wrapper'>
              <div className='profile-post-details-title'>
                Facebook:
              </div>
              <div className='profile-post-details-main'>
                https://www.facebook.com/
              </div>
            </div>
            
            <div className='profile-post-body-details-wrapper'>
              <div className='profile-post-details-title'>
                twitter:
              </div>
              <div className='profile-post-details-main'>
                https://twitter.com/
              </div>
            </div>
          </div>

          <div className='profile-post-body-wrapper'>
            <div className='profile-post-body-head'>
              <h3>Subscription</h3>
              <Button buttonWrapper="button-wrapper" linkButton linkTo="/edit-subscription-information" linkClass="transparent-link-wrapper" linkName="Edit subscription information" title="Edit subscription information" linkIcon={<EditRoundedIcon />} />
            </div>
            
            <div className='profile-post-body-details-wrapper'>
              <div className='profile-post-details-title'>
                Type:
              </div>
              <div className='profile-post-details-main'>
                Free
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className='empty-profile-card-wrapper'>
          <div className='empty-profile-card-header'>
            <h1>No User Found</h1>
          </div>
        </div>
      )
    )}

    </>
  )
}

export default ProfileMainContent
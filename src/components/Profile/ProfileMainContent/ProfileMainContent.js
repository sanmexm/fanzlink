import React from 'react'

import { UserHeader, Button } from '../../'
import { EditRoundedIcon, PhotoRoundedIcon } from '../../../utils/constants'
import './profileMainContent.css'
// PersonRoundedIcon

const ProfileMainContent = () => {

  return (
    <>
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
              John
            </div>
          </div>
          
          <div className='profile-post-body-details-wrapper'>
            <div className='profile-post-details-title'>
              last name:
            </div>
            <div className='profile-post-details-main'>
              Okoh
            </div>
          </div>

          <div className='profile-post-body-details-wrapper'>
            <div className='profile-post-details-title'>
              Email Address:
            </div>
            <div className='profile-post-details-main'>
              johnmikeokon@gmail.com
            </div>
          </div>

          <div className='profile-post-body-details-wrapper'>
            <div className='profile-post-details-title'>
              Primary Phone:
            </div>
            <div className='profile-post-details-main'>
              111-111-1111
            </div>
          </div>

          <div className='profile-post-body-details-wrapper'>
            <div className='profile-post-details-title'>
              username:
            </div>
            <div className='profile-post-details-main'>
              johnmike990
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
    </>
  )
}

export default ProfileMainContent
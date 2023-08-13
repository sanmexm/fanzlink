import React, { useState } from 'react'
import { Button, UserHeader, SearchProfileHeader, TruncatedText, Pagination } from '../../'
import { AddBoxRoundedIcon, DeleteRoundedIcon, EditRoundedIcon, PageviewRoundedIcon } from '../../../utils/constants'
import { about } from '../../../assets'
import { Link } from 'react-router-dom'
import './dashboardMainContent.css'

const DashboardMainContent = () => {
  const authData              = JSON.parse(localStorage.getItem('authData'))
  // const UserUniqueId          = authData?.result?._id +''+ authData?.result?.firstName +' '+ authData?.result?.lastName
  const UserUniqueId          = authData?.result?._id
  const [isEdit, setIsEdit]   = useState(false)

  const handleEditClick = () => {
    setIsEdit((prev) => !prev)
  }

  return (
    <>
      <div className='dashboard-post-wrapper'>

        <div className='dashboard-post-header'>
          <div className='dashboard-post-header-left'>
            {/* {UserUniqueId} */}
            <UserHeader viewProfileBtn spanTitle="dashboard" />
          </div>

          <div className='dashboard-post-header-right'>
            <SearchProfileHeader />
            <Button buttonWrapper="button-wrapper" linkButton linkTo="/posts/create-post" linkClass="link-wrapper" linkName="Create a post" linkIcon={<AddBoxRoundedIcon />} />
          </div>
        </div>

        <div className='dashboard-post-body'>
            <div className='dashboard-post-body-head'>
              <h2>Your Postings</h2>
              <span>13 results found</span>
            </div>

            <div className='dashboard-post-body-posts'>
              <div className='dashboard-post-body-title'>
                <h2><TruncatedText text="Specialist in video coverage Reprehenderit labore voluptate et laborum laboris velit consectetur ea eiusmod mollit elit fugiat. Lorem sint in minim aute reprehenderit culpa. Dolore ipsum proident eiusmod nisi ex ad minim dolor." maxLength={70} /></h2>
                <div className='dashboard-post-body-title-icons-wrapper'>
                  <div className='dashboard-post-body-title-icons'>
                    <Button linkButton linkTo="/posts/preview-post" title="view post" linkIcon={<PageviewRoundedIcon />} />
                    <Button onClickButton title="Edit post" buttonIcon={<EditRoundedIcon />} onClickNavigate={handleEditClick} />
                    <Button onClickButton title="Delete post" buttonIcon={<DeleteRoundedIcon />} onClickNavigate={() => {window.confirm(`Are you sure you want to delete this post?`)}} />
                  </div>

                  <div className='edit-dashboard-menu-wrapper'>
                    <div className={isEdit ? 'edit-dashboard-menu-option active' : 'edit-dashboard-menu-option'}>
                      <Link to="/posts/edit-post" className='edit-dashboard-menu-detail edit-dashboard-menu-detail-bottom-divider'>
                        Edit post
                      </Link>
                      <Link to="/posts/edit-post-image" className='edit-dashboard-menu-detail'>
                        Edit Image
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className='dashboard-post-body-details'>
                <div className='dashboard-post-body-image-wrapper'>
                  <img src={about} alt='post img' />
                </div>
                <div className='dashboard-post-body-detail category-detail-wrapper'>
                  <span>category</span>
                  <small>fashion</small>
                </div>
                <div className='dashboard-post-body-detail price-detail-wrapper'>
                  <span>price</span>
                  <small>&#8358; 5000</small>
                </div>
                <div className='dashboard-post-body-detail description-detail-wrapper'>
                  <span>description</span>
                  <small><TruncatedText text="Lorem sint in minimaute reprehenderit culpa. Do ex ad minim dolor" maxLength={20} /></small>
                </div>
                <div className='dashboard-post-body-detail link-detail-wrapper'>
                  <span>link</span>
                  <small><TruncatedText text="https://www.google.com" maxLength={20} /></small> 
                </div>
                <div className='dashboard-post-body-detail location-detail-wrapper'>
                  <span>location</span>
                  <small>Abuja</small>
                </div>
                <div className='dashboard-post-body-detail contact-detail-wrapper'>
                  <span>contact</span>
                  <small>0703-444-4444</small>
                </div>
              </div>
            </div>

            {/* <Pagination pageName="dashboard" page={page} actionGet={getPosts} numberOfPages={numberOfPages} totalNumber={totalNumber} /> */}
            <Pagination />
        </div>


      </div>
    </>
  )
}

export default DashboardMainContent
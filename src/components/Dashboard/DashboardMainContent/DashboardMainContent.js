import React, { useEffect, useState } from 'react'
import { Button, UserHeader, SearchProfileHeader, TruncatedText, Pagination, Loader } from '../../'
import { AddBoxRoundedIcon, DeleteRoundedIcon, EditRoundedIcon, PageviewRoundedIcon } from '../../../utils/constants'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, fetchPostsByUser } from '../../../actions/posts'
import './dashboardMainContent.css'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}

const DashboardMainContent = () => {
  const authData                                             = JSON.parse(localStorage.getItem('authData'))
  // const UserUniqueId          = authData?.result?._id +''+ authData?.result?.firstName +' '+ authData?.result?.lastName
  const userUniqueId                                         = authData?.result?._id
  const dispatch                                             = useDispatch()
  const query                                                = useQuery()
    //this will read the url and see if a page is available
  const page                                                 = query.get('page') || 1
  const {isLoading, userPosts, totalNumber, numberOfPages }  = useSelector((state) => state.postsLists)
  const [isEdit, setIsEdit]                                  = useState(false)

  const handleEditClick = () => {
    setIsEdit((prev) => !prev)
  }

  useEffect(() => {
    dispatch(fetchPostsByUser(page, userUniqueId))
  }, [ page, userUniqueId, dispatch])

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
              <span>Results found - {totalNumber}</span>
            </div>
            
            {isLoading ? (
              <Loader />
            ) : userPosts && userPosts.length > 0 ? ( 
              userPosts.map((result, index) => (
              <div key={result._id} className='dashboard-post-body-posts'>
                <div className='dashboard-post-body-title'>
                  <h2><TruncatedText text={result.title} maxLength={70} /></h2>
                  <div className='dashboard-post-body-title-icons-wrapper'>
                    <div className='dashboard-post-body-title-icons'>
                      <Button linkButton linkTo={`/posts/preview-post/${result._id}`} title="view post" linkIcon={<PageviewRoundedIcon />} />
                      <Button onClickButton title="Edit post" buttonIcon={<EditRoundedIcon />} onClickNavigate={handleEditClick} />
                      <Button onClickButton title="Delete post" buttonIcon={<DeleteRoundedIcon />} onClickNavigate={() => {window.confirm(`Are you sure you want to delete this post?`) && dispatch(deletePost(result._id))}} />
                    </div>

                    <div className='edit-dashboard-menu-wrapper'>
                      <div className={isEdit ? 'edit-dashboard-menu-option active' : 'edit-dashboard-menu-option'}>
                        <Link to={`/posts/edit-post/${result._id}`} className='edit-dashboard-menu-detail'>
                          Edit post
                        </Link>
                        <Link to={`/posts/edit-post-image/${result._id}`} className='edit-dashboard-menu-detail '>
                          Edit Image
                        </Link>
                        <Link to={`/posts/edit-post-add-images/${result._id}`} className='edit-dashboard-menu-detail'>
                          Add Images
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='dashboard-post-body-details'>
                  <div className='dashboard-post-body-image-wrapper'>
                    <span className='post-body-image-wrapper-count'>{result.selectedFileImages.length}</span>
                    <img src={result.selectedFile} alt='post img' />
                  </div>
                  <div className='dashboard-post-body-detail category-detail-wrapper'>
                    <span>category</span>
                    <small>{result.category}</small>
                  </div>
                  <div className='dashboard-post-body-detail price-detail-wrapper'>
                    <span>price</span>
                    <small>&#8358; {result.price}</small>
                  </div>
                  <div className='dashboard-post-body-detail description-detail-wrapper'>
                    <span>description</span>
                    <small><TruncatedText text={result.description} maxLength={20} /></small>
                  </div>
                  <div className='dashboard-post-body-detail link-detail-wrapper'>
                    <span>link</span>
                    <small><TruncatedText text={result.link} maxLength={20} /></small> 
                  </div>
                  <div className='dashboard-post-body-detail location-detail-wrapper'>
                    <span>location</span>
                    <small>{result.location}</small>
                  </div>
                  <div className='dashboard-post-body-detail contact-detail-wrapper'>
                    <span>contact</span>
                    <small>{result.contact}</small>
                  </div>
                </div>
              </div>))
            ) : (
              <div className='empty-profile-card-wrapper'>
                <div className='empty-profile-card-header'>
                  <h1>No Posts Found</h1>
                </div>
                <Link className='doctors' to='/posts/create-post'>Create post</Link>
              </div>
            )}
            
            <Pagination pageName="dashboard" page={page} actionGet={fetchPostsByUser} numberOfPages={numberOfPages} totalNumber={totalNumber} />
        </div>

      </div>
    </>
  )
}

export default DashboardMainContent
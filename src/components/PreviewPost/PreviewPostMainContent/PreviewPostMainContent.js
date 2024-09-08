import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Loader, PostReviews, RatePost, SimilarPosts } from '../../'
import { fetchPost, fetchPostRatings, fetchSimilarPosts } from '../../../actions/posts'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './previewPostMainContent.css'

const PreviewPostMainContent = () => {
  const dispatch                                    = useDispatch()
  const { id }                                      = useParams()
  const {isLoading, userPost, allPosts, actualRating, totalRate, ratingSum} = useSelector((state) => state.postsLists)
  const [selectedImage, setSelectedImage]           = useState("");
  const [dynamicMainBullets, setDynamicMainBullets] = useState(4);
  const [rating, setRating]                         = useState(0);

  const recommendedPosts = allPosts?.filter(({ _id}) => _id !==  userPost._id)

  const swiperSubImageSettings = {
    modules: [Navigation, Pagination],
    spaceBetween: 0,
    slidesPerView: 4,
    grabCursor: true,
    pagination: {
      dynamicBullets: true,
      dynamicMainBullets: dynamicMainBullets,
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0:{
        slidesPerView: 2,
        dynamicMainBullets: 2,
      },
      430:{
        slidesPerView: 3,
        dynamicMainBullets: 3,
      },
      768:{
        slidesPerView: 3,
        dynamicMainBullets: 3,
      },
      1024:{
        slidesPerView: 4,
        dynamicMainBullets: 4,
      }
    }
  }

  // Calculate and update dynamic main bullets based on current breakpoint
  const updateDynamicMainBullets = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1024) {
      setDynamicMainBullets(4);
    } else if (windowWidth >= 768) {
      setDynamicMainBullets(3);
    } else if (windowWidth >= 430) {
      setDynamicMainBullets(3);
    } else {
      setDynamicMainBullets(2);
    }
  };

  // Listen for window resize to update dynamic main bullets
  useEffect(() => {
    updateDynamicMainBullets();
    window.addEventListener('resize', updateDynamicMainBullets);
    return () => {
      window.removeEventListener('resize', updateDynamicMainBullets);
    };
  }, []);

  const handleSubImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  useEffect(() => {
    dispatch(fetchPost(id))
    dispatch(fetchPostRatings(id))
  }, [id, dispatch])

  // useEffect(() => {
    
  // }, [id, dispatch])

  useEffect(() => {
    if(userPost){
      dispatch(fetchSimilarPosts({ search: 'none', category: userPost?.category}))
    }
  }, [userPost, dispatch])

  return (
    <>
      {isLoading ? (
          <Loader />
        ) : (
          userPost ? (
            <div className='preview-post-wrapper'>
              <div className="preview-post-header">
                <span>posts {'>'} Preview</span>
              </div>
              <div className="preview-post-main">
                <div className='react-carousel-wrapper'>
                </div>
                <div className='preview-post-main-title'>
                  {userPost.title}
                </div>
                <div className='preview-post-main-body'>
                  <div className='preview-post-main-body-header'>
                    <div className='preview-post-main-body-image-wrapper'>
                      <div className='preview-post-main-body-main-image'>
                        <img src={selectedImage || userPost.selectedFile} alt='product main img' />
                      </div>
                      
                      <div className='preview-sub-image-swiper-container'>
                        <Swiper {...swiperSubImageSettings} className="preview-post-main-body-sub-image-wrap">
                          {/* <div className='preview-post-swiper-sub-image-main-content' onClick={() => handleSubImageClick(userPost.selectedFile)}>
                            <img src={userPost.selectedFile} alt='main img' />
                          </div> */}
                          {userPost.selectedFileImages.map((imageX, index) => (
                            <SwiperSlide key={index} className='preview-post-swiper-sub-image-settings'>
                              <div className='preview-post-swiper-sub-image-main-content' onClick={() => handleSubImageClick(imageX)}>
                                <img src={imageX} alt='main img' />
                              </div>
                            </SwiperSlide>
                          ))}
                          <div className="preview-post-swiper-button swiper-button-prev"></div>
                          <div className="preview-post-swiper-button swiper-button-next"></div>
                        </Swiper>
                      </div>
                    </div>
                    
                    <div className='preview-post-main-body-details'>
                      <div className='preview-post-main-body-details-title'>
                        <h3>Category</h3>
                      </div>
                      <div className='preview-post-main-body-details-body'>
                        {userPost.category}
                      </div>
                    </div>
                    <div className='preview-post-main-body-details'>
                      <div className='preview-post-main-body-details-title'>
                        <h3>Description</h3>
                      </div>
                      <div className='preview-post-main-body-details-body'>
                        {userPost.description}
                      </div>
                    </div>
                    <div className='preview-post-main-body-details'>
                      <div className='preview-post-main-body-details-title'>
                        <h3>Price</h3>
                      </div>
                      <div className='preview-post-main-body-details-body'>
                        &#8358;{userPost.price}
                      </div>
                    </div>
                    <div className='preview-post-main-body-details'>
                      <div className='preview-post-main-body-details-title'>
                        <h3>Verified Ratings ({totalRate})</h3>
                      </div>
                      <div className='preview-post-main-body-details-body'>
                        <span>{ratingSum}/5</span><br/>
                        <span>{actualRating} verified ratings</span>
                      </div>
                    </div>
                    <div className='preview-post-main-body-details'>
                      <div className='preview-post-main-body-details-title'>
                        <h3>Location 12345</h3>
                      </div>
                      <div className='preview-post-main-body-details-body'>
                        {userPost.location}
                      </div>
                    </div>
                    <div className='preview-post-main-body-details'>
                      <div className='preview-post-main-body-details-title'>
                        <h3>Links</h3>
                      </div>
                      <div className='preview-post-main-body-details-body'>
                        <a href='https://www.facebook.com' title='https://www.facebook.com'>https://www.facebook.com/product-link</a>
                        <a href='https://www.facebook.com' title='https://www.facebook.com'>https://www.twitter.com/product-link</a>
                        <a href='https://www.facebook.com' title='https://www.facebook.com'>https://www.amazon.com/product-link</a>
                      </div>
                    </div>
                  </div>

                  <RatePost rating={rating} postId={id} onRating={(rate) => setRating(rate)} />

                  <PostReviews loading={isLoading} postId={id} userPost={userPost} />
                  
                  <SimilarPosts recommendedPosts={recommendedPosts} isLoading={isLoading} />
                
                </div>
              </div>
            </div>
        ) : (
          <div className='empty-profile-card-wrapper'>
            <div className='empty-profile-card-header'>
              <h1>No Posts Found</h1>
            </div>
            <Link className='doctors' to='/posts/create-post'>
              Create post
            </Link>
          </div>
        )
      )}
    </>
  )
}

export default PreviewPostMainContent

// <!-- Slider main container basic setup -->
// {/* <div class="swiper">
//   <!-- Additional required wrapper -->
//   <div class="swiper-wrapper">
//     <!-- Slides -->
//     <div class="swiper-slide">Slide 1</div>
//     <div class="swiper-slide">Slide 2</div>
//     <div class="swiper-slide">Slide 3</div>
//     ...
//   </div>
//   <!-- If we need pagination -->
//   <div class="swiper-pagination"></div>

//   <!-- If we need navigation buttons -->
//   <div class="swiper-button-prev"></div>
//   <div class="swiper-button-next"></div>

//   <!-- If we need scrollbar -->
//   <div class="swiper-scrollbar"></div>
// </div> */}
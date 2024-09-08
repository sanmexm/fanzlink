import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import {TruncatedText, Button, Loader} from '../'
import 'swiper/css/scrollbar';
import './similarPosts.css'

const SimilarPosts = ({recommendedPosts, isLoading}) => {

    const swiperRelatedImageSettings = {
        className: 'swiper-scrollbar-settings',
        modules: [Scrollbar],
        spaceBetween: 0,
        // slidesPerView: 4,
        grabCursor: true,
        scrollbar: { 
          draggable: true,
          hide: false,
        },
        breakpoints: {
          0:{
            slidesPerView: 2,
          },
          430:{
            slidesPerView: 3,
          },
          768:{
            slidesPerView: 3,
          },
          1024:{
            slidesPerView: 4,
          },
        }
    }

  return (
    <>
      {isLoading ? (
        <Loader />
      ): recommendedPosts && recommendedPosts.length > 0 ? (
        <div className='preview-post-main-body-similar-posts'>
          <h2>Related Posts</h2>
          {recommendedPosts.map(({_id, selectedFile, title, price}) => (
              <div className='preview-post-main-body-similar-posts-main-wrapper' key={_id}>
                  <Swiper {...swiperRelatedImageSettings} className="preview-post-main-body-similar-posts-container swiper">
                      <SwiperSlide className='preview-similar-image-wrapper'>
                          <div className='preview-post-main-body-similar-main'>
                          <div className='body-similar-posts-img-wrapper'>
                              <img src={selectedFile} alt='about' />
                          </div>
                          <div className='body-similar-posts-details'>
                              <span><TruncatedText text={title} maxLength={20} /></span>
                              <span>&#8358;{price}</span>
                              <Button buttonWrapper="button-wrapper" linkButton linkTo={`/posts/preview-post/${_id}`} linkClass="link-wrapper" linkName="view post"/>
                          </div>
                          </div>
                      </SwiperSlide>
                  </Swiper>
              </div>
          ))}
        </div>
      ): (
        <div className="no-similar-posts">
          <p>No recommended posts</p>
        </div>
      )}
    </>
  )
}

export default SimilarPosts
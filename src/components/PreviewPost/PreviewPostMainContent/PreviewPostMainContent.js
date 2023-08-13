import React, { useEffect, useRef, useState } from 'react'
import { ArrowBackIosRoundedIcon, ArrowForwardIosRoundedIcon } from '../../../utils/constants'
import { about, img1, userImage } from '../../../assets'
import { TruncatedText, Button } from '../../'
import './previewPostMainContent.css'

const PreviewPostMainContent = () => {
  const galleryRef                        = useRef(null);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [selectedImage, setSelectedImage] = useState(about);

  const handleSubImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  useEffect(() => {
    const scrollContainer = galleryRef.current;
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');

    const handleScroll = () => {
      const isAtBeginning = scrollContainer.scrollLeft === 0;
      const isAtEnd = scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth;
  
      setCanScrollNext(!isAtEnd);
      setCanScrollBack(!isAtBeginning);
    };

    const updateScrollAvailability = () => {
      const subImageWrappers = scrollContainer.getElementsByClassName(
        'sub-post-gallery-img-wrapper'
      );

      let totalImagesWidth = 0;
      for (let i = 0; i < subImageWrappers.length; i++) {
        totalImagesWidth += subImageWrappers[i].offsetWidth;
      }

      const isScrollable = totalImagesWidth > scrollContainer.clientWidth;

      setCanScrollNext(canScrollNext && isScrollable);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateScrollAvailability);

    // Call the updateScrollAvailability initially to set the correct button visibility
    updateScrollAvailability();

    scrollContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      const scrollAmount = e.deltaY > 0 ? 100 : -100;
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    });

    nextBtn.addEventListener('click', () => {
      scrollContainer.scrollBy({
        left: 100,
        behavior: 'smooth',
      });
    });

    backBtn.addEventListener('click', () => {
      scrollContainer.scrollBy({
        left: -100,
        behavior: 'smooth',
      });
    });

    return () => {
      window.removeEventListener('resize', updateScrollAvailability);
      scrollContainer.removeEventListener('scroll', handleScroll);
      scrollContainer.removeEventListener('wheel', () => {});
      nextBtn.removeEventListener('click', () => {});
      backBtn.removeEventListener('click', () => {});
    };
  }, [canScrollNext]);

  return (
    <>
        <div className='preview-post-wrapper'>
            <div className="preview-post-header">
              <span>posts {'>'} Preview</span>
            </div>
            <div className="preview-post-main">
              <div className='preview-post-main-title'>Specialist in video coverage Reprehenderit labore voluptate et laborum laboris velit consectetur ea eiusmod mollit elit fugiat. Lorem sint in minim aute reprehenderit culpa. Dolore ipsum proident eiusmod nisi ex ad minim dolor.</div>

              <div className='preview-post-main-body'>
                <div className='preview-post-main-body-header'>
                  <div className='preview-post-main-body-image-wrapper'>
                    <div className='preview-post-main-body-main-image'>
                      <img src={selectedImage} alt='main img' />
                    </div>
                    <div className='preview-post-main-body-sub-image-wrap'>
                      <span id='backBtn' className={canScrollBack ? 'preview-post-btn': 'preview-post-btn active backBtn'}><ArrowBackIosRoundedIcon /></span>
                      <div className="sub-post-gallery" ref={galleryRef}>
                        <div className='sub-post-gallery-detail'>
                          <div className='sub-post-gallery-img-wrapper' onClick={() => handleSubImageClick(about)}>
                            <img src={about} alt='main img' />
                          </div>
                          <div className='sub-post-gallery-img-wrapper' onClick={() => handleSubImageClick(img1)}>
                            <img src={img1} alt='main img' />
                          </div>
                          <div className='sub-post-gallery-img-wrapper' onClick={() => handleSubImageClick(userImage)}>
                            <img src={userImage} alt='main img' />
                          </div>
                          <div className='sub-post-gallery-img-wrapper' onClick={() => handleSubImageClick(img1)}>
                            <img src={img1} alt='main img' />
                          </div>
                          <div className='sub-post-gallery-img-wrapper' onClick={() => handleSubImageClick(userImage)}>
                            <img src={userImage} alt='main img' />
                          </div>
                          <div className='sub-post-gallery-img-wrapper' onClick={() => handleSubImageClick(about)}>
                            <img src={about} alt='main img' />
                          </div>
                        </div>
                      </div>
                      <span id='nextBtn' className={canScrollNext ? 'preview-post-btn': 'preview-post-btn active nextBtn'}><ArrowForwardIosRoundedIcon /></span>
                    </div>
                  </div>
                  <div className='preview-post-main-body-details'>
                    <div className='preview-post-main-body-details-title'>
                      <h3>Description</h3>
                    </div>
                    <div className='preview-post-main-body-details-body'>
                      Irure quis Lorem eiusmod laborum dolor cupidatat ex et tempor. Occaecat consequat Lorem adipisicing adipisicing. Anim irure nisi duis elit non magna aliqua nisi dolore nisi labore. Qui ut veniam nulla nulla veniam laborum. Laboris veniam qui laborum non mollit enim eiusmod sint voluptate sint dolore aliquip eiusmod. Commodo fugiat do nostrud sit commodo. Labore adipisicing labore laborum eiusmod ex reprehenderit tempor nostrud fugiat esse nulla aliqua.
                    </div>
                  </div>
                  <div className='preview-post-main-body-details'>
                    <div className='preview-post-main-body-details-title'>
                      <h3>Price</h3>
                    </div>
                    <div className='preview-post-main-body-details-body'>
                      &#8358;5000
                    </div>
                  </div>
                  <div className='preview-post-main-body-details'>
                    <div className='preview-post-main-body-details-title'>
                      <h3>Location</h3>
                    </div>
                    <div className='preview-post-main-body-details-body'>
                      Lagos
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
                <div className='preview-post-main-body-similar-posts'>
                  <h2>Related Posts</h2>
                  <div className='preview-post-main-body-similar-posts-main-wrapper'>
                    <div className='preview-post-main-body-similar-main'>
                      <div className='body-similar-posts-img-wrapper'>
                        <img src={about} alt='about' />
                      </div>
                      <div className='body-similar-posts-details'>
                        <span><TruncatedText text="Lorem sint in minimaute reprehenderit culpa. Do ex ad minim dolor" maxLength={20} /></span>
                        <span>&#8358;10,000</span>
                        <Button buttonWrapper="button-wrapper" linkButton linkTo="/" linkClass="link-wrapper" linkName="view post"/>
                      </div>
                    </div>
                    <div className='preview-post-main-body-similar-main'>
                      <div className='body-similar-posts-img-wrapper'>
                        <img src={about} alt='about' />
                      </div>
                      <div className='body-similar-posts-details'>
                        <span><TruncatedText text="Lorem sint in minimaute reprehenderit culpa. Do ex ad minim dolor" maxLength={20} /></span>
                        <span>&#8358;10,000</span>
                        <Button buttonWrapper="button-wrapper" linkButton linkTo="/" linkClass="link-wrapper" linkName="view post"/>
                      </div>
                    </div>
                    <div className='preview-post-main-body-similar-main'>
                      <div className='body-similar-posts-img-wrapper'>
                        <img src={about} alt='about' />
                      </div>
                      <div className='body-similar-posts-details'>
                        <span><TruncatedText text="Lorem sint in minimaute reprehenderit culpa. Do ex ad minim dolor" maxLength={20} /></span>
                        <span>&#8358;10,000</span>
                        <Button buttonWrapper="button-wrapper" linkButton linkTo="/" linkClass="link-wrapper" linkName="view post"/>
                      </div>
                    </div>
                    <div className='preview-post-main-body-similar-main'>
                      <div className='body-similar-posts-img-wrapper'>
                        <img src={about} alt='about' />
                      </div>
                      <div className='body-similar-posts-details'>
                        <span><TruncatedText text="Lorem sint in minimaute reprehenderit culpa. Do ex ad minim dolor" maxLength={20} /></span>
                        <span>&#8358;10,000</span>
                        <Button buttonWrapper="button-wrapper" linkButton linkTo="/" linkClass="link-wrapper" linkName="view post"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default PreviewPostMainContent
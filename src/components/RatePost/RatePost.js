import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StarRateRoundedIcon } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { ratePost } from '../../actions/posts'
import { RatePostDataResponse } from '../'
import './ratePost.css'

const RatePost = ({ postId, count, rating, onRating }) => {
    const authData                          = JSON.parse(localStorage.getItem('authData'))
    const userId                            = authData?.result?._id
    const dispatch                          = useDispatch();
    const [postData, setPostData]           = useState({star: 0})
    const [rateMessage, setRateMessage]     = useState(false);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [responseData, setResponseData]   = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setRateMessage(false)
      const returnConfirm = window.confirm('Are you sure you want to submit rating?')
      if(returnConfirm){
        try{
          setRateMessage(true)
          const response = await dispatch(ratePost(postId, userId, postData));
          console.log(response)
          window.location.reload();
          setResponseData(response);
          setTimeout(() => {
            setRateMessage(null);
          }, 10000);
        } catch (error) {
          console.error(error);
        }
      }
    };

  return (
    <>
      <div className='rating-wrapper'>
        <h3>Rate this product</h3>
        <form onSubmit={handleSubmit}>
          {Array(count)
            .fill(0)
            .map((_, index) => index + 1)
            .map((index) => (
            <label
              key={index} 
              className={index <= (hoveredRating || rating) ? 'rating-label filled' : 'rating-label unfilled'}
              onMouseEnter={() => setHoveredRating(index)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => {
                onRating(index);
                setPostData({ star: index });
              }}
            >
              <StarRateRoundedIcon />
              {/* &#x2605; */}
              {/* <span>&#9733;</span> */}
            </label>
          ))}
          <button type="submit">Submit Rating</button>
          <p>Selected rating: {postData.star || 0}</p>
          {rateMessage && (<p>your rating has been submitted</p>)}
        </form>
        <RatePostDataResponse responseData={responseData} />
      </div>
    </>
  )
}

RatePost.propTypes = {
    count: PropTypes.number,
    star: PropTypes.number,
    onRating: PropTypes.func,
  };
  
RatePost.defaultProps = {
    count: 5,
    star: 0,
};

export default RatePost
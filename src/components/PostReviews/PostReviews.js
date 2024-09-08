import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { userImg } from '../../assets'
import {FormField, Button, Loader} from '../'
import { userValidateReview } from '../validations/review/review'
import { reviewPost } from '../../actions/posts'
import { fetchUser } from '../../actions/users'
import './postReviews.css'

const PostReviews = ({postId, userPost, loading}) => {
    const authData                                  = JSON.parse(localStorage.getItem('authData'))
    const userId                                    = authData?.result?._id
    const dispatch                                  = useDispatch();
    const { user }                                  = useSelector((state) => state.usersLists)
    const reviewsRef                                = useRef()
    const [reviews, setReviews]                     = useState(userPost?.reviews)
    const [savingInfo, setSavingInfo]               = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]   = useState(true);
    const [reviewErrors, setReviewErrors]           = useState(null);
    const [message, setMessage]                     = useState("");

    const [postData, setPostData]                   = useState({review: ''})
    const [isLoading, setIsLoading]                 = useState({review: false })
    const [isValid, setIsValid]                     = useState({review: false })

    const useDebounce = (value, delay ) => {
      const [debounced, setDebounced] = useState(value)
  
      useEffect(() =>{
        const handler = setTimeout(() => {
          setDebounced(value)
        }, delay);
        return () => clearTimeout(handler)
      }, [value, delay])
  
      return debounced
    }
  
    const debouncedPostData                         = useDebounce(postData, 500)

    const handleChange = (e) => {
      const { name, value } = e.target;
      setIsLoading((prevState) => ({ ...prevState, [name]: true }));
      setPostData((prevState) => ({ ...prevState, [name]: value }));
    }

    useEffect(() => {
        const validateReview = () => {
          const { isValid, errors } = userValidateReview(debouncedPostData.review);
          setIsValid((prevState) => ({
            ...prevState,
            review: isValid,
          }));
          setIsLoading((prevState) => ({
            ...prevState,
            review: false,
          }));
          return errors;
        };
      
        const reviewErrors        = validateReview()
    
        setReviewErrors(reviewErrors);
  
        const hasErrors = () => {
          // Check if any error exists in the form data
          if ( reviewErrors.length > 0 ) {
            return true;
          } else{
            return false;
          }
        };
        const hasFormErrors = hasErrors();
        setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData]);

    useEffect(() => {
      if (reviews && reviews.length && !user) {
        const userIdsToFetch = [...new Set(reviews.map(result => result.userId))];
        
        userIdsToFetch.forEach(userIdData => {
          dispatch(fetchUser(userIdData)).then((userData) => {
            // Now you have the userData for the specific userId
            // You can map this data to the corresponding review
            const reviewWithUserData = reviews.find(review => review.userId === userIdData);
            if (reviewWithUserData) {
              reviewWithUserData.userData = userData;
            }
          });
        });
      }
    }, [dispatch, reviews, user]);
    

    // useEffect(() => {
    //   if (reviews && reviews.length && !user ) {
    //     reviews.forEach(result => {
    //       const userIdData = result.userId;
  
    //       // Fetch user data only if it's not already loaded or being fetched
    //         dispatch(fetchUser(userIdData));
    //     });
    //   }
    // }, [dispatch, reviews, user]);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setSavingInfo(true); // Set loading to true to show loading state
      setMessage(false);
      try {
        const response = await dispatch(reviewPost(postId, userId, postData.review));
        setReviews(response)
        setPostData({review: ""})
        reviewsRef.current.scrollIntoView({ behavior: "smooth" })
      } catch (error) {
        console.error(error);
        setMessage("Error sending review");
      } finally {
        setSavingInfo(false); // Set loading to false when the action is complete
      }
    };
    
  return (
    <>
      {loading ? (
          <Loader />
        ) : (
        user && (
        <div className='post-reviews-main-wrapper'>
            <h2>Reviews</h2>
            <div className='post-reviews-content-container'>
              <div className='post-reviews-content-details-wrapper'>
                {reviews.map((result, index) => (
                  <div className='post-reviews-content-details' key={index}>
                    <div className='post-reviews-content-details-imgBx'>
                      <img src={result.userData?.selectedFile || userImg} alt='user img' />
                    </div>
                    <div className='post-reviews-content-details-review'>
                      <div>
                        <h3>{result.userData?.username}</h3>
                        <small>{moment.utc(result.createdAt).local().fromNow()}</small>
                      </div>
                      <div className='post-reviews-content-details-review-text'>
                        {result.review}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={reviewsRef} />
              </div>
              {authData?.result?.username && (
                <div className='post-reviews-content-form'>
                  <form className='post-review-form-container' onSubmit={handleSubmit} autoComplete="off">
                    <div className='post-review-form-container-title'>
                        <h3>write a review</h3>
                    </div>
                    <FormField textareaType maxLength={1000} labelName="Review" name="review" value={postData.review} handleChange={handleChange} isLoading={isLoading.review} isValid={isValid.review} errors={reviewErrors || []} />

                    <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Sending...</> : "Submit"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />
                    {message && <p error-msg>{message}</p>}
                  </form>
                </div>
              )}
            </div>
        </div>
      ))}
    </>
  )
}

export default PostReviews
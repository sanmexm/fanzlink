import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { KeyboardBackspaceRoundedIcon, LockRoundedIcon } from '../../utils/constants'
import { Link } from 'react-router-dom'
import { userValidateEmailAddress } from '../../components/validations/users/forgotUserValidateAccount'
import { Button, FormField, Loader } from '../../components'
import { fetchUsers, verifyEmailPassword } from '../../actions/users'
import './forgotPassword.css'

const ForgotPassword = () => {
  const dispatch                                     = useDispatch();
  const [savingInfo, setSavingInfo]                  = useState(false);
  const [emailAddressErrors, setEmailAddressErrors]  = useState(null);
  const [isButtonDisabled, setIsButtonDisabled]      = useState(true);
  const [postData, setPostData]                      = useState({emailAddress: ''})
  const [isLoadingBtn, setIsLoadingBtn]              = useState({emailAddress: false})
  const [isValid, setIsValid]                        = useState({emailAddress: false})
  const [message, setMessage]                        = useState(false);
  const {getAllUsers}                                = useSelector((state) => state.usersLists);

    useEffect(() => {
      // Fetch users data when the component mounts
      dispatch(fetchUsers(1));
    }, [dispatch]);
  
    //this will prevent the page from breaking
    useEffect(() => {
      // Wait for the users to be fetched before proceeding with validation
    }, [getAllUsers]);

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

    const debouncedPostData          = useDebounce(postData, 500) //postData

    const handleChange = (e) => {
      const { name, value } = e.target;
      setIsLoadingBtn((prevState) => ({ ...prevState, [name]: true }));
      setPostData((prevState) => ({ ...prevState, [name]: value }));
    }

    useEffect(() => {
      const validateEmailAddress = () => {
        const { isValid, errors } = userValidateEmailAddress(debouncedPostData.emailAddress, getAllUsers);
        setIsValid((prevState) => ({
          ...prevState,
          emailAddress: isValid,
        }));
        setIsLoadingBtn((prevState) => ({
          ...prevState,
          emailAddress: false,
        }));
        return errors;
      };

      const emailAddressErrors     = validateEmailAddress();
      setEmailAddressErrors(emailAddressErrors);

      const hasErrors = () => {
        // Check if any error exists in the form data
        if ( emailAddressErrors.length > 0 ) {
          return true;
        } else{
          return false;
        }
      };
      const hasFormErrors = hasErrors();
      setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData, getAllUsers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavingInfo(true); // Set loading to true to show loading state
    setMessage(false);
  
    try {
      const response = await dispatch(verifyEmailPassword(postData.emailAddress));
      if (response && response.status === 200) {
        setMessage(true);
      } else if (response && response.status === 400) {
        setMessage("Email does not exist");
      } else {
        setMessage("Error sending email");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error sending email");
    } finally {
      setSavingInfo(false); // Set loading to false when the action is complete
    }
  };
    
  return (
    <>
      <Helmet><title>Forgot Password</title></Helmet>
      <div className='forgot-password-wrapper'>
        <div className='forgot-password-form-container'>
          <div className='forgot-password-detail'>
            <div className="forgot-password-svg-wrapper"><LockRoundedIcon /></div>
              <h3>Forgot Password ?</h3>
              <span>No worries, we'll send you reset instructions.</span>
          </div>
          {!message ? (
            <form onSubmit={handleSubmit} autoComplete="off">
              <FormField inputType type="text" labelName="Email Address" name="emailAddress" value={postData.emailAddress} handleChange={handleChange} isLoadingBtn={isLoadingBtn.emailAddress} isValid={isValid.emailAddress} errors={emailAddressErrors || []} />

              <Button
                onClickButton
                buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`}
                onClickName={savingInfo ? <>{<Loader />} Verifying Email...</> : "Verify Email"}
                isButtonDisabled={isButtonDisabled}
                buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} 
                disabled={savingInfo}
              />

              <div className='forgot-password-have-account-wrapper'>
                <Link className='forgot-password-account-reg-log' to="/login"><KeyboardBackspaceRoundedIcon /> Back to log in</Link>
                <Link to="/resend-verification">Resend Verification</Link>
              </div>
            </form>
          ) : (
            <div className="registration-success-message">
              <p className="success-msg">Email sent, please check your email to reset your password.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ForgotPassword

// // const generateOtpCode = () =>{
//     //   var digits = '0123456789'
//     //   let OTP    = ''
//     //   for(let i = 0; i < 6; i++){
//     //     OTP += digits[Math.floor(Math.random() * 10)]
//     //   }
//     //   setGenerateOtp(OTP)
//     // }
//     {/* <button onClick={generateOtpCode} className='reg-btn-signup'>{generateOtp ? 'generating OTP...' : 'Generate OTP'}</button>
//     {generateOtp && (<p>{generateOtp}</p>)} */}
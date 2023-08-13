import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import { VisibilityIcon, VisibilityOffIcon } from '../../utils/constants'
import { Button, FormField, Loader } from '../../components'
import { createUser } from '../../actions/auth'
import { fetchUsers } from '../../actions/users'
import { userValidateFirstName, userValidateLastName, userValidateEmailAddress, userValidateUsername, userValidateSex, userValidatePassword, userValidateConfirmPassword } from '../../components/validations/users/usersRegistration'
import './account.css'

const Register = () => {
    const pageName                                            = "Sign up"
    const dispatch                                            = useDispatch();
    const navigate                                            = useNavigate();
    const location                                            = useLocation();
    const [hideShow, setHideShow]                             = useState(false);
    const [savingInfo, setSavingInfo]                         = useState(false);
    const [firstNameErrors, setFirstNameErrors]               = useState(null);
    const [lastNameErrors, setLastNameErrors]                 = useState(null);
    const [emailAddressErrors, setEmailAddressErrors]         = useState(null);
    const [usernameErrors, setUsernameErrors]                 = useState(null);
    const [sexErrors, setSexErrors]                           = useState(null);
    const [passwordErrors, setPasswordErrors]                 = useState(null);
    const [confirmPasswordErrors, setConfirmPasswordErrors]   = useState(null);
    const [captchaValue, setCaptchaValue]                     = useState(null);
    const [isButtonDisabled, setIsButtonDisabled]             = useState(true);
    const [errorMessage, setErrorMessage]                     = useState(null);
    const {getAllUsers}                                       = useSelector((state) => state.usersLists);

    useEffect(() => {
      // Fetch users data when the component mounts
      dispatch(fetchUsers(1));
    }, [dispatch]);
  
    //this will prevent the page from breaking
    useEffect(() => {
      // Wait for the users to be fetched before proceeding with validation
    }, [getAllUsers]);

    const [postData, setPostData]          = useState({firstName: '', lastName: '', emailAddress: '', username: '', sex: '', password: '', confirmPassword: ''})
    const [isLoading, setIsLoading]        = useState({firstName: false, lastName: false, emailAddress: false, username: false, sex: false, password: false, confirmPassword: false, })
    const [isValid, setIsValid]            = useState({firstName: false, lastName: false, emailAddress: false, username: false, sex: false, password: false, confirmPassword: false})

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

    const handleChangeCaptcha = (value) => {
      setCaptchaValue(value);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setIsLoading((prevState) => ({ ...prevState, [name]: true }));
      setPostData((prevState) => ({ ...prevState, [name]: value }));
    }

    useEffect(() => {
      
      const validateFirstName = () => {
        const { isValid, errors } = userValidateFirstName(debouncedPostData.firstName);
        setIsValid((prevState) => ({
          ...prevState,
          firstName: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          firstName: false,
        }));
        return errors;
      };

      const validateLastName = () => {
        const { isValid, errors } = userValidateLastName(debouncedPostData.lastName);
        setIsValid((prevState) => ({
          ...prevState,
          lastName: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          lastName: false,
        }));
        return errors;
      };
    
      const validateEmailAddress = () => {
        const { isValid, errors } = userValidateEmailAddress(debouncedPostData.emailAddress, getAllUsers);
        setIsValid((prevState) => ({
          ...prevState,
          emailAddress: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          emailAddress: false,
        }));
        return errors;
      };

      const validateUsername = () => {
        const { isValid, errors } = userValidateUsername(debouncedPostData.username, getAllUsers);
        setIsValid((prevState) => ({
          ...prevState,
          username: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          username: false,
        }));
        return errors;
      };

      const validateSex = () => {
        const { isValid, errors } = userValidateSex(debouncedPostData.sex);
        setIsValid((prevState) => ({
          ...prevState,
          sex: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          sex: false,
        }));
        return errors;
      };

      const validatePassword = () => {
        const { isValid, errors } = userValidatePassword(debouncedPostData.password);
        setIsValid((prevState) => ({
          ...prevState,
          password: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          password: false,
        }));
        return errors;
      };

      // the confirm password function should connect from the postData since you're comparing two fields
      const validateConfirmPassword = () => {
        const { isValid, errors } = userValidateConfirmPassword(debouncedPostData);
        setIsValid((prevState) => ({
          ...prevState,
          confirmPassword: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          confirmPassword: false,
        }));
        return errors;
      };
    
      const firstNameErrors        = validateFirstName();
      const lastNameErrors         = validateLastName();
      const emailAddressErrors     = validateEmailAddress();
      const usernameErrors         = validateUsername();
      const sexErrors              = validateSex();
      const passwordErrors         = validatePassword();
      const confirmPasswordErrors  = validateConfirmPassword();
      
      setFirstNameErrors(firstNameErrors);
      setLastNameErrors(lastNameErrors);
      setEmailAddressErrors(emailAddressErrors);
      setUsernameErrors(usernameErrors);
      setSexErrors(sexErrors);
      setPasswordErrors(passwordErrors);
      setConfirmPasswordErrors(confirmPasswordErrors);

      const hasErrors = () => {
        // Check if any error exists in the form data
        if ( firstNameErrors.length > 0 || lastNameErrors.length > 0 || emailAddressErrors.length > 0 || usernameErrors.length > 0 || sexErrors.length > 0  || passwordErrors.length > 0 || confirmPasswordErrors.length > 0 || !captchaValue ) {
          return true;
        } else{
          return false;
        }
      };
      const hasFormErrors = hasErrors();
      setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData, captchaValue, getAllUsers]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const returnConfirm = window.confirm('Are you sure you want to create account?')
        if(returnConfirm){
        setSavingInfo(true);
        dispatch(createUser(postData, setErrorMessage))
        // console.log(postData)
      }
    }
    
  return (
    <>
        <Helmet><title>{pageName}</title></Helmet>
        <div className='account-container'>
            <form className='account-reg-container' onSubmit={handleSubmit} autoComplete="off">
              <div className='account-login-container-title'>
                  <h3>Sign Up</h3>
              </div>

              <div className='account-login-input-btn-pass-container'>
                  <FormField inputType type="text" labelName="First Name" name="firstName" value={postData.firstName} handleChange={handleChange} isLoading={isLoading.firstName} isValid={isValid.firstName} errors={firstNameErrors || []} />
                  
                  <FormField inputType type="text" labelName="Last Name" name="lastName" value={postData.lastName} handleChange={handleChange} isLoading={isLoading.lastName} isValid={isValid.lastName} errors={lastNameErrors || []} />

                  <FormField inputType type="text" labelName="Email Address" name="emailAddress" value={postData.emailAddress} handleChange={handleChange} isLoading={isLoading.emailAddress} isValid={isValid.emailAddress} errors={emailAddressErrors || []} />

                  <FormField inputType type="text" labelName="Username" name="username" value={postData.username} handleChange={handleChange} isLoading={isLoading.username} isValid={isValid.username} errors={usernameErrors || []} />
                  
                  <div className='account-field-wrapper-quadruple'>
                    <FormField radioType htmlFor="male" id="male" type="radio" name="sex" value="male" labelTitle="Male" handleChange={handleChange} isLoading={isLoading.sex} isValid={isValid.sex} errors={sexErrors || []} />
                    
                    <FormField radioType htmlFor="female" id="female" type="radio" name="sex" value="female" labelTitle="Female" handleChange={handleChange} isLoading={isLoading.sex} isValid={isValid.sex} errors={sexErrors || []} />
                  </div>

                  <div className='account-login-group-wrapper'>
                    <FormField inputType type={hideShow ? 'text' : 'password'} labelName="Password" name="password" value={postData.password} handleChange={handleChange} isLoading={isLoading.password} isValid={isValid.password} errors={passwordErrors || []} />
                    <div className='account-login-show-hide-pass-container'>
                      <span className={ postData.password.length > 0 ? 'show-hide-password unlock' : 'show-hide-password' } onClick={() => setHideShow((prev) => !prev)}>{hideShow ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
                    </div>
                  </div>
                  <FormField inputType type={hideShow ? 'text' : 'password'} labelName="Confirm Password" name="confirmPassword" value={postData.confirmPassword} handleChange={handleChange} isLoading={isLoading.confirmPassword} isValid={isValid.confirmPassword} errors={confirmPasswordErrors || []} />

                  <div className='contact-captcha'><ReCAPTCHA sitekey="6Lck8TwnAAAAACY9Ep8jV5WsJWgfbg4VFIQYGAa8" onChange={handleChangeCaptcha}/></div>

                  <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Creating...</> : "Sign Up"} isButtonDisabled={isButtonDisabled} buttonClasses={isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass']} />

                  {errorMessage && <p className='error-msg'>{errorMessage}</p>}
              </div>
              <div className='have-account-wrapper'>
                <span>Have an Account?</span>
                <Link className='account-reg-log' to="/login">Sign In</Link>
              </div>
            </form>
        </div>
    </>
  )
}

export default Register

// const Register = () => {
//   const pageName                                            = "Sign up"
//   const dispatch                                            = useDispatch();
//   const {fUsers}                                            = useSelector((state) => state.usersLists);

//   console.log(fUsers)

//   useEffect(() => {
//     dispatch(fetchUsers(1))
//   }, [dispatch])

//   const useDebounce = (value, delay ) => {
//     const [debounced, setDebounced] = useState(value)
//     const [postData, setPostData]          = useState({firstName: '', lastName: '', emailAddress: '', username: '', sex: '', password: '', confirmPassword: ''})

//     useEffect(() =>{
//       const handler = setTimeout(() => {
//         setDebounced(value)
//       }, delay);
//       return () => clearTimeout(handler)
//     }, [value, delay])

//     return debounced
//   }

//   const debouncedPostData          = useDebounce(postData, 500) //postData

//   useEffect(() => {
    
//     const validateEmailAddress = () => {
//       const { isValid, errors } = userValidateEmailAddress(debouncedPostData.emailAddress, fUsers);
//       setIsValid((prevState) => ({
//         ...prevState,
//         emailAddress: isValid,
//       }));
//       setIsLoading((prevState) => ({
//         ...prevState,
//         emailAddress: false,
//       }));
//       return errors;
//     };
// })

// }

// const userValidateEmailAddress = (postData, fUsers) => {
//   const errors     = [];
//   let isValid      = true;
//   const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

//   if (postData === '') {
//       errors.push('');
//       isValid = true;
//   } else if (fUsers?.emailAddress.map.includes(postData)) {
//       errors.push('email address already exist');
//       isValid = false;
//   } else if (!emailRegex.test(postData)) {
//       errors.push('invalid email address');
//       isValid = false;
//   }
//   return { isValid, errors };
// }
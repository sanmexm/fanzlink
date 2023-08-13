import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha";
import { Button, FormField, Loader, } from '../'
import { userValidateFirstName, userValidateLastName, userValidatePrimaryPhone, userValidateEmailAddress, userValidateMessage } from '../validations/contact/contact'
import './contactForm.css'

const ContactForm = () => {
    const dispatch                                    = useDispatch();
    const navigate                                    = useNavigate();
    const location                                    = useLocation();
    const [savingInfo, setSavingInfo]                 = useState(false);
    const [firstNameErrors, setFirstNameErrors]       = useState(null);
    const [lastNameErrors, setLastNameErrors]         = useState(null);
    const [primaryPhoneErrors, setPrimaryPhoneErrors] = useState(null);
    const [emailAddressErrors, setEmailAddressErrors] = useState(null);
    const [messageErrors, setMessageErrors]           = useState(null);
    const [captchaValue, setCaptchaValue]             = useState(null);
    const [isButtonDisabled, setIsButtonDisabled]     = useState(true);

    const [postData, setPostData]     = useState({firstName: '', lastName: '', primaryPhone: '', emailAddress: '', message: ''})
    const [isLoading, setIsLoading]   = useState({firstName: false, lastName: false, primaryPhone: false, emailAddress: false, message: false })
    const [isValid, setIsValid]       = useState({firstName: false, lastName: false, primaryPhone: false, emailAddress: false, message: false })

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

      const validatePrimaryPhone = () => {
        const { isValid, errors } = userValidatePrimaryPhone(debouncedPostData.primaryPhone);
        setIsValid((prevState) => ({
          ...prevState,
          primaryPhone: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          primaryPhone: false,
        }));
        return errors;
      };
    
      const validateEmailAddress = () => {
        const { isValid, errors } = userValidateEmailAddress(debouncedPostData.emailAddress);
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

      const validateMessage = () => {
        const { isValid, errors } = userValidateMessage(debouncedPostData.message);
        setIsValid((prevState) => ({
          ...prevState,
          message: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          message: false,
        }));
        return errors;
      };
    
      const firstNameErrors      = validateFirstName();
      const lastNameErrors       = validateLastName();
      const primaryPhoneErrors   = validatePrimaryPhone();
      const emailAddressErrors   = validateEmailAddress();
      const messageErrors        = validateMessage()
      
      setFirstNameErrors(firstNameErrors);
      setLastNameErrors(lastNameErrors);
      setEmailAddressErrors(emailAddressErrors);
      setPrimaryPhoneErrors(primaryPhoneErrors);
      setMessageErrors(messageErrors);

      const hasErrors = () => {
        // Check if any error exists in the form data
        if ( firstNameErrors.length > 0 || lastNameErrors.length > 0 || primaryPhoneErrors.length > 0 || emailAddressErrors.length > 0 || messageErrors.length > 0 || !captchaValue ) {
          return true;
        } else{
          return false;
        }
      };
      const hasFormErrors = hasErrors();
      setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData, captchaValue]);

    // const resetFormData = () => {
    //   setPostData({firstName: '', lastName: '', primaryPhone: '', emailAddress: '', message: ''})
    // }
    // const sentMessage = () => {
    //   alert('Message Sent');
    // }

    const handleSubmit = (e) => {
      e.preventDefault();
      setSavingInfo(true);
      // dispatch(createContactUsMessage(postData, sentMessage))
      console.log(postData)
      // sentMessage()
      // resetFormData()
    }

  return (
    <>
        <form className='contact-reg-container' onSubmit={handleSubmit} autoComplete="off">
            <div className='contact-login-container-title'>
                <h3>Send a message</h3>
                <small>We'd love help</small>
            </div>

            <div className=''>
            <FormField inputType type="text" labelName="First Name" name="firstName" value={postData.firstName} handleChange={handleChange} isLoading={isLoading.firstName} isValid={isValid.firstName} errors={firstNameErrors || []} />
                
            <FormField inputType type="text" labelName="Last Name" name="lastName" value={postData.lastName} handleChange={handleChange} isLoading={isLoading.lastName} isValid={isValid.lastName} errors={lastNameErrors || []} />

            <FormField inputType type="text" maxLength={15} labelName="Primary phone" name="primaryPhone" value={postData.primaryPhone} handleChange={handleChange} isLoading={isLoading.primaryPhone} isValid={isValid.primaryPhone} errors={primaryPhoneErrors || []} />

            <FormField inputType type="text" labelName="Email Address" name="emailAddress" value={postData.emailAddress} handleChange={handleChange} isLoading={isLoading.emailAddress} isValid={isValid.emailAddress} errors={emailAddressErrors || []} />

            <FormField textareaType maxLength={1000} labelName="Message" name="message" value={postData.message} handleChange={handleChange} isLoading={isLoading.message} isValid={isValid.message} errors={messageErrors || []} />

            <div className='contact-captcha'><ReCAPTCHA sitekey="6LdOKzwnAAAAAFbP4KMhcR-XyF8IFEKYkJ6g-IM-" onChange={handleChangeCaptcha}/></div>

            <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Sending...</> : "Send"} isButtonDisabled={isButtonDisabled} buttonClasses={isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass']} />
            </div>
        </form>
    </>
  )
}

export default ContactForm
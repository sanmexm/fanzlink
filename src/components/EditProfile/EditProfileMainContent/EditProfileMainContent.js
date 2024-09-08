import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, FormField, Loader } from '../../'
import { userValidateFirstName, userValidateLastName, userValidateUsername, userValidateContact } from '../../validations/users/usersEditProfile'


import './editProfileMainContent.css'

const EditProfileMainContent = () => {
    const authData                                      = JSON.parse(localStorage.getItem('authData'))
    // const UserUniqueId          = authData?.result?._id +''+ authData?.result?.firstName +' '+ authData?.result?.lastName
    const userUniqueId                                  = authData?.result?._id
    const dispatch                                            = useDispatch();
    const navigate                                            = useNavigate();
    const location                                            = useLocation();
    const [savingInfo, setSavingInfo]                         = useState(false);
    const [firstNameErrors, setFirstNameErrors]               = useState(null);
    const [lastNameErrors, setLastNameErrors]                 = useState(null);
    const [usernameErrors, setUsernameErrors]                 = useState(null);
    const [contactErrors, setContactErrors]                   = useState(null);
    const [isButtonDisabled, setIsButtonDisabled]             = useState(true);

    const [postData, setPostData]          = useState({firstName: 'John', lastName: 'okoh', username: 'johnmike990', contact: '111-111-1111'})
    const [isLoading, setIsLoading]        = useState({firstName: false, lastName: false, username: false, contact: false})
    const [isValid, setIsValid]            = useState({firstName: false, lastName: false, username: false, contact: false})

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

      const validateUsername = () => {
        const { isValid, errors } = userValidateUsername(debouncedPostData.username);
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

      const validateContact = () => {
        const { isValid, errors } = userValidateContact(debouncedPostData.contact);
        setIsValid((prevState) => ({
          ...prevState,
          contact: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          contact: false,
        }));
        return errors;
      };
    
      const firstNameErrors        = validateFirstName();
      const lastNameErrors         = validateLastName();
      const usernameErrors         = validateUsername();
      const contactErrors          = validateContact();
      
      setFirstNameErrors(firstNameErrors);
      setLastNameErrors(lastNameErrors);
      setUsernameErrors(usernameErrors);
      setContactErrors(contactErrors);

      const hasErrors = () => {
        // Check if any error exists in the form data
        if ( firstNameErrors.length > 0 || lastNameErrors.length > 0 || usernameErrors.length > 0 || contactErrors.length > 0 ) {
          return true;
        } else{
          return false;
        }
      };
      const hasFormErrors = hasErrors();
      setIsButtonDisabled(hasFormErrors);
    }, [debouncedPostData]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const returnConfirm = window.confirm('Are you sure you want to update profile information?')
        if(returnConfirm){
        setSavingInfo(true);
        // dispatch(createUser(postData, navigate))
        console.log(postData)
      }
    }

  return (
    <>
        <Helmet><title>Edit Profile</title></Helmet>
        <div className='edit-profile-wrapper'>
          <div className='edit-profile-wrapper-title'>
            <h3>Edit profile information</h3>
          </div>
          <div className='edit-profile-form-wrapper'>
            <form className='edit-profile-form' onSubmit={handleSubmit} autoComplete="off" >
              <FormField inputType type="text" labelName="First Name" name="firstName" value={postData.firstName} handleChange={handleChange} isLoading={isLoading.firstName} isValid={isValid.firstName} errors={firstNameErrors || []} />
              
              <FormField inputType type="text" labelName="Last Name" name="lastName" value={postData.lastName} handleChange={handleChange} isLoading={isLoading.lastName} isValid={isValid.lastName} errors={lastNameErrors || []} />

              <FormField inputType type="text" labelName="Username" name="username" value={postData.username} handleChange={handleChange} isLoading={isLoading.username} isValid={isValid.username} errors={usernameErrors || []} />

              <FormField inputType type="text" labelName="Contact" name="contact" value={postData.contact} handleChange={handleChange} isLoading={isLoading.contact} isValid={isValid.contact} errors={contactErrors || []} />

              <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Updating...</> : "Update"} isButtonDisabled={isButtonDisabled} buttonClasses={isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass']} />
            </form>
          </div>
        </div>
    </>
  )
}

export default EditProfileMainContent
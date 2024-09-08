import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { categoryOptions } from '../../../utils/constants';
import { postValidateTitle, postValidateCategory, postValidatePrice, postValidateDescription, postValidateLink, postValidateLocation, postValidateContact } from '../../validations/posts/editUsersPost';
import {Button, FormField, Loader} from '../../';

import './editPostMainContent.css'

const EditPostMainContent = () => {
    const authData                                      = JSON.parse(localStorage.getItem('authData'))
    // const UserUniqueId          = authData?.result?._id +''+ authData?.result?.firstName +' '+ authData?.result?.lastName
    const userUniqueId                                  = authData?.result?._id
    const dispatch                                      = useDispatch();
    const navigate                                      = useNavigate();
    const location                                      = useLocation();
    const [savingInfo, setSavingInfo]                   = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]       = useState(true);
    const [titleErrors, setTitleErrors]                 = useState(null);
    const [categoryErrors, setCategoryErrors]           = useState(null);
    const [priceErrors, setPriceErrors]                 = useState(null);
    const [descriptionErrors, setDescriptionErrors]     = useState(null);
    const [linkErrors, setLinkErrors]                   = useState(null);
    const [locationErrors, setLocationErrors]           = useState(null);
    const [contactErrors, setContactErrors]             = useState(null);

    const [postData, setPostData]      = useState({userId: 'WK43978433334sa', title: 'Specialist in video coverage Reprehenderit', category: 'tech', price: '5000', description: 'Irure quis Lorem eiusmod laborum dolor cupidatat ex et tempor. Occaecat consequat Lorem adipisicing adipisicing. Anim irure nisi duis elit non magna aliqua nisi dolore nisi labore. Qui ut veniam nulla nulla veniam laborum. Laboris veniam qui laborum non mollit enim eiusmod sint voluptate sint dolore aliquip eiusmod. Commodo fugiat do nostrud sit commodo. Labore adipisicing labore laborum eiusmod ex reprehenderit tempor nostrud fugiat esse nulla aliqua.', link: 'https://www.facebook.com/product-link', location: 'location', contact: '0703-444-4444'})
    const [ isLoading, setIsLoading ]  = useState({title: false, category: false, price: false, description: false, link: false, location: false, contact: false})
    const [ isValid, setIsValid ]      = useState({title: false, category: false, price: false, description: false, link: false, location: false, contact: false})

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

    const debouncedPostData = useDebounce(postData, 500)

    const handleChange = (e) => {
      const { name, value } = e.target;
      setIsLoading((prevState) => ({ ...prevState, [name]: true }));
      setPostData((prevState) => ({ ...prevState, [name]: value }));
    }

    useEffect(() => {

      const validateTitle = () => {
        const { isValid, errors } = postValidateTitle(debouncedPostData.title);
        setIsValid((prevState) => ({
          ...prevState,
          title: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          title: false,
        }));
        return errors;
      }

      const validateCategory = () => {
        const { isValid, errors } = postValidateCategory(debouncedPostData.category);
        setIsValid((prevState) => ({
          ...prevState,
          category: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          category: false,
        }));
        return errors;
      }

      const validatePrice = () => {
        const { isValid, errors } = postValidatePrice(debouncedPostData.price);
        setIsValid((prevState) => ({
          ...prevState,
          price: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          price: false,
        }));
        return errors;
      }

      const validateDescription = () => {
        const { isValid, errors } = postValidateDescription(debouncedPostData.description);
        setIsValid((prevState) => ({
          ...prevState,
          description: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          description: false,
        }));
        return errors;
      }

      const validateLink = () => {
        const { isValid, errors } = postValidateLink(debouncedPostData.link);
        setIsValid((prevState) => ({
          ...prevState,
          link: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          link: false,
        }));
        return errors;
      }

      const validateLocation = () => {
        const { isValid, errors } = postValidateLocation(debouncedPostData.location);
        setIsValid((prevState) => ({
          ...prevState,
          location: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          location: false,
        }));
        return errors;
      }

      const validateContact = () => {
        const { isValid, errors } = postValidateContact(debouncedPostData.contact);
        setIsValid((prevState) => ({
          ...prevState,
          contact: isValid,
        }));
        setIsLoading((prevState) => ({
          ...prevState,
          contact: false,
        }));
        return errors;
      }

      const titleErrors         = validateTitle();
      const categoryErrors      = validateCategory();
      const priceErrors         = validatePrice();
      const descriptionErrors   = validateDescription();
      const linkErrors          = validateLink();
      const locationErrors      = validateLocation();
      const contactErrors       = validateContact();

      setTitleErrors(titleErrors)
      setCategoryErrors(categoryErrors)
      setPriceErrors(priceErrors)
      setDescriptionErrors(descriptionErrors)
      setLinkErrors(linkErrors)
      setLocationErrors(locationErrors)
      setContactErrors(contactErrors)

      const hasErrors = () => {
        // Check if any error exists in the form data
        if ( titleErrors.length > 0 || categoryErrors.length > 0 || priceErrors.length > 0 || descriptionErrors.length > 0 || linkErrors.length > 0  || locationErrors.length > 0 || contactErrors.length > 0 ) {
          return true;
        } else{
          return false;
        }
      };
      const hasFormErrors = hasErrors();
      setIsButtonDisabled(hasFormErrors);

    }, [debouncedPostData])

    const handleSubmit = (e) => {
      e.preventDefault();
        const returnConfirm = window.confirm('Are you sure you want to update post?')
        if(returnConfirm){
        setSavingInfo(true);
      // dispatch(createUser(postId, postData, navigate))
        console.log(postData)
      }
    }

  return (
    <>
        <div className='create-post-wrapper'>
          <div className='create-post-wrapper-title'>
              <h3>Edit Post</h3>
          </div>
      
          <div className='create-post-form-wrapper'>
            <form className='create-post-form' onSubmit={handleSubmit} autoComplete="off" >

              <FormField inputType type="text" labelName="Title" name="title" value={postData.title} handleChange={handleChange} isLoading={isLoading.title} isValid={isValid.title} errors={titleErrors || []} />

              <FormField selectType labelName="Category" name="category" value={postData.category} handleChange={handleChange} options={categoryOptions} isLoading={isLoading.category} isValid={isValid.category} errors={categoryErrors || []} />

              <FormField inputType type="text" labelName="Price" name="price" value={postData.price} handleChange={handleChange} isLoading={isLoading.price} isValid={isValid.price} errors={priceErrors || []} />

              <FormField textareaType labelName="Description" name="description" value={postData.description} handleChange={handleChange} isLoading={isLoading.description} isValid={isValid.description} errors={descriptionErrors || []} />

              <FormField inputType type="text" labelName="Link" name="link" value={postData.link} handleChange={handleChange} isLoading={isLoading.link} isValid={isValid.link} errors={linkErrors || []} />

              <FormField inputType type="text" labelName="Location" name="location" value={postData.location} handleChange={handleChange} isLoading={isLoading.location} isValid={isValid.location} errors={locationErrors || []} />

              <FormField inputType type="text" labelName="Contact" name="contact" value={postData.contact} handleChange={handleChange} isLoading={isLoading.contact} isValid={isValid.contact} errors={contactErrors || []} />

              <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Updating...</> : "Update"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

            </form>
          </div>
        </div>
    </>
  )
}

export default EditPostMainContent
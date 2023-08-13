import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { categoryOptions, PhotoRoundedIcon } from '../../../utils/constants';
import { postValidateSelectedFile, postValidateTitle, postValidateCategory, postValidatePrice, postValidateDescription, postValidateLink, postValidateLocation, postValidateContact } from '../../validations/posts/createUsersPost';
import {Button, FormField, Loader} from '../../';
import './createPostMainContent.css'

const CreatePostMainContent = () => {
    const dispatch                                      = useDispatch();
    const navigate                                      = useNavigate();
    const location                                      = useLocation();
    const [savingInfo, setSavingInfo]                   = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]       = useState(true);
    const [productImg, setProductImg]                   = useState(null);
    const [selectedFileErrors, setSelectedFileErrors]   = useState(null);
    const [titleErrors, setTitleErrors]                 = useState(null);
    const [categoryErrors, setCategoryErrors]           = useState(null);
    const [priceErrors, setPriceErrors]                 = useState(null);
    const [descriptionErrors, setDescriptionErrors]     = useState(null);
    const [linkErrors, setLinkErrors]                   = useState(null);
    const [locationErrors, setLocationErrors]           = useState(null);
    const [contactErrors, setContactErrors]             = useState(null);

    const [postData, setPostData]             = useState({userId: 'WK43978433334sa', selectedFile: '', title: '', category: '', price: '', description: '', link: '', location: '', contact: ''})
    const [ isLoading, setIsLoading ]         = useState({selectedFile: false, title: false, category: false, price: false, description: false, link: false, location: false, contact: false})
    const [ isValid, setIsValid ]             = useState({selectedFile: false, title: false, category: false, price: false, description: false, link: false, location: false, contact: false})

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

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const imageBase64 = reader.result.split(",")[1]; // remove the data URI scheme prefix
        const extension = file.name.split(".").pop(); // get the image extension
        const dataURI = `data:image/${extension};base64,${imageBase64}`; // add the data URI scheme prefix with the image extension
        setPostData({...postData, selectedFile: dataURI});
      };
    };
  
    const handleProductImageUpload = (e) => {
      const file = e.target.files[0]
  
      transformFile(file)
    }
  
    const transformFile = (file) => {
      const reader = new FileReader()
  
      if(file){
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setProductImg(reader.result)
        }
      }else{
        setProductImg("")
      }
    }

    useEffect(() => {
      
        const validateSelectedFile = () => {
          const { isValid, errors } = postValidateSelectedFile(debouncedPostData.selectedFile);
          setIsValid((prevState) => ({
            ...prevState,
            selectedFile: isValid,
          }));
          setIsLoading((prevState) => ({
            ...prevState,
            selectedFile: false,
          }));
          return errors;
        };

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

        const selectedFileErrors  = validateSelectedFile();
        const titleErrors         = validateTitle();
        const categoryErrors      = validateCategory();
        const priceErrors         = validatePrice();
        const descriptionErrors   = validateDescription();
        const linkErrors          = validateLink();
        const locationErrors      = validateLocation();
        const contactErrors       = validateContact();

        setSelectedFileErrors(selectedFileErrors)
        setTitleErrors(titleErrors)
        setCategoryErrors(categoryErrors)
        setPriceErrors(priceErrors)
        setDescriptionErrors(descriptionErrors)
        setLinkErrors(linkErrors)
        setLocationErrors(locationErrors)
        setContactErrors(contactErrors)

        const hasErrors = () => {
          // Check if any error exists in the form data
          if ( selectedFileErrors.length > 0 || titleErrors.length > 0 || categoryErrors.length > 0 || priceErrors.length > 0 || descriptionErrors.length > 0 || linkErrors.length > 0  || locationErrors.length > 0 || contactErrors.length > 0 ) {
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
          const returnConfirm = window.confirm('Are you sure you want to create post?')
          if(returnConfirm){
          setSavingInfo(true);
        // dispatch(createUser(postData, navigate))
          console.log(postData)
        }
    }

  return (
    <>
      <div className='create-post-wrapper'>
        <div className='create-post-wrapper-title'>
          <h3>Create Post</h3>
        </div>
    
        <div className='create-post-form-wrapper'>
          <form className='create-post-form' onSubmit={handleSubmit} autoComplete="off" >

              <div className='reg-image-group'>
                <div onChange={handleProductImageUpload}>
                  <FormField fileInputType name="selectedFile" handleChange={handleFileChange} isLoading={isLoading.selectedFile} isValid={isValid.selectedFile} errors={selectedFileErrors || []} />
                </div>
                <div className='reg-image-preview-wrapper'>
                  {productImg ? <img src={productImg} alt={productImg} />  : <span><PhotoRoundedIcon /></span>}
                </div>
              </div>

              <FormField inputType type="text" labelName="Title" name="title" value={postData.title} handleChange={handleChange} isLoading={isLoading.title} isValid={isValid.title} errors={titleErrors || []} />

              <FormField selectType labelName="Category" name="category" value={postData.category} handleChange={handleChange} options={categoryOptions} isLoading={isLoading.category} isValid={isValid.category} errors={categoryErrors || []} />

              <FormField inputType type="text" labelName="Price" name="price" value={postData.price} handleChange={handleChange} isLoading={isLoading.price} isValid={isValid.price} errors={priceErrors || []} />

              <FormField textareaType labelName="Description" name="description" value={postData.description} handleChange={handleChange} isLoading={isLoading.description} isValid={isValid.description} errors={descriptionErrors || []} />

              <FormField inputType type="text" labelName="Link" name="link" value={postData.link} handleChange={handleChange} isLoading={isLoading.link} isValid={isValid.link} errors={linkErrors || []} />

              <FormField inputType type="text" labelName="Location" name="location" value={postData.location} handleChange={handleChange} isLoading={isLoading.location} isValid={isValid.location} errors={locationErrors || []} />

              <FormField inputType type="text" labelName="Contact" name="contact" value={postData.contact} handleChange={handleChange} isLoading={isLoading.contact} isValid={isValid.contact} errors={contactErrors || []} />

              <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Posting...</> : "Create"} isButtonDisabled={isButtonDisabled} buttonClasses={isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass']} />

          </form>
        </div>
      </div>
    </>
  )
}

export default CreatePostMainContent
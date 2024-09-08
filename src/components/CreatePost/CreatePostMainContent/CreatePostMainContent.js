import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { categoryOptions, PhotoRoundedIcon } from '../../../utils/constants';
import { postValidateSelectedFile, postValidateTitle, postValidateCategory, postValidatePrice, postValidateDescription, postValidateLink, postValidateLocation, postValidateContact } from '../../validations/posts/createUsersPost';
import {Button, FormField, Loader} from '../../';
import { createPost } from '../../../actions/posts';
import './createPostMainContent.css'

const CreatePostMainContent = () => {
    const authData                                      = JSON.parse(localStorage.getItem('authData'))
    // const UserUniqueId          = authData?.result?._id +''+ authData?.result?.firstName +' '+ authData?.result?.lastName
    const userUniqueId                                  = authData?.result?._id
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
    const [successMessage, setSuccessMessage]           = useState(false);
    const [errorMessage, setErrorMessage]               = useState(null);
    
    const [postData, setPostData]             = useState({userId: userUniqueId, selectedFile: '', selectedFileImages: '', title: '', category: '', price: '', description: '', link: '', location: '', contact: ''})
    const [ isLoading, setIsLoading ]         = useState({selectedFile: false, selectedFileImages: false, title: false, category: false, price: false, description: false, link: false, location: false, contact: false})
    const [ isValid, setIsValid ]             = useState({selectedFile: false, selectedFileImages: false, title: false, category: false, price: false, description: false, link: false, location: false, contact: false})

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

    const handleMultipleFileChange = (event) => {
      const files = event.target.files;
      const fileArray = [];
    
      // Check if the number of selected files exceeds the maximum allowed (10 in your case)
      if (files.length > 10) {
        alert('You can only select a maximum of 10 files.');
        event.target.value = ''; // Clear the input to remove the excess files.
        return;
      }
    
      // Loop through the selected files and process them
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
    
        reader.onload = () => {
          const imageBase64 = reader.result.split(',')[1]; // remove the data URI scheme prefix
          const extension = file.name.split('.').pop(); // get the image extension
          const dataURI = `data:image/${extension};base64,${imageBase64}`; // add the data URI scheme prefix with the image extension
          fileArray.push(dataURI);
    
          // If all files have been processed, update the state
          if (fileArray.length === files.length) {
            setPostData({ ...postData, selectedFileImages: fileArray });
          }
        };
    
        reader.readAsDataURL(file);
      }
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

    // useEffect(() => {
    //   //this is coming from the action method to ensure that the user gets the registration message 
    //   const queryParams = new URLSearchParams(location.search);
    //   if (queryParams.get("verification") === "true") {
    //     setIsRegistered(true);
    //   }
    // }, [location.search]);

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

    const handleSubmit = async(e) => {
      e.preventDefault();
      const returnConfirm = window.confirm('Are you sure you want to create post?')
      if(returnConfirm){
        setSavingInfo(true);
        const response = await dispatch(createPost(postData))
        try{
          if (response.status === 201) {
            // Password reset successful, show success message from response
            setSuccessMessage("response.data.successMessage");
            setErrorMessage(null); // Clear any previous error message
          } else if (response.status === 400) {
            // Display appropriate error message based on the response
            setSuccessMessage(null);
            setErrorMessage("response.data.data.message");
          }
        }catch(error){
          setErrorMessage(error.response.status)
          setErrorMessage("unable to upload data, please check your internet and try again")
          setSavingInfo(false)
        }
      }
    }

  return (
    <>
      <div className='create-post-wrapper'>
        <div className='create-post-wrapper-title'>
          <h3>Create Post</h3>
        </div>
    
        <div className='create-post-form-wrapper'>
          <form className='create-post-form' onSubmit={handleSubmit} autoComplete="off">
            <div className='reg-image-group'>
              <div onChange={handleProductImageUpload}>
                <FormField fileInputType name="selectedFile" handleChange={handleFileChange} isLoading={isLoading.selectedFile} isValid={isValid.selectedFile} errors={selectedFileErrors || []} />
              </div>
              <div className='reg-image-preview-wrapper'>
                {productImg ? <img src={productImg} alt={productImg} />  : <span><PhotoRoundedIcon /></span>}
              </div>
            </div>

            <FormField multipleFileInputType name="selectedFileImages" handleChange={handleMultipleFileChange} isLoading={isLoading.selectedFileImages} isValid={isValid.selectedFileImages} errors={selectedFileErrors || []} />

            <FormField inputType type="text" labelName="Title" name="title" value={postData.title} handleChange={handleChange} isLoading={isLoading.title} isValid={isValid.title} errors={titleErrors || []} />

            <FormField selectType labelName="Category" name="category" value={postData.category} handleChange={handleChange} options={categoryOptions} isLoading={isLoading.category} isValid={isValid.category} errors={categoryErrors || []} />

            <FormField inputType type="text" labelName="Price" name="price" value={postData.price} handleChange={handleChange} isLoading={isLoading.price} isValid={isValid.price} errors={priceErrors || []} />

            <FormField textareaType labelName="Description" name="description" value={postData.description} handleChange={handleChange} isLoading={isLoading.description} isValid={isValid.description} errors={descriptionErrors || []} />

            <FormField inputType type="text" labelName="Link" name="link" value={postData.link} handleChange={handleChange} isLoading={isLoading.link} isValid={isValid.link} errors={linkErrors || []} />

            <FormField inputType type="text" labelName="Location" name="location" value={postData.location} handleChange={handleChange} isLoading={isLoading.location} isValid={isValid.location} errors={locationErrors || []} />

            <FormField inputType type="text" labelName="Contact" name="contact" value={postData.contact} handleChange={handleChange} isLoading={isLoading.contact} isValid={isValid.contact} errors={contactErrors || []} />

            <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Posting...</> : "Create"} isButtonDisabled={isButtonDisabled} buttonClasses={savingInfo ? ['button-disabled'] : (isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass'])} disabled={savingInfo} />

            {successMessage && <p className='success-msg'>{successMessage}</p>}
            {errorMessage && <p className='error-msg'>{errorMessage}</p>}

          </form>
        </div>
      </div>
    </>
  )
}

export default CreatePostMainContent
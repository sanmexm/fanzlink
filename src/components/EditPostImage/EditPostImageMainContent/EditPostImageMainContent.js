import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { PhotoRoundedIcon } from '../../../utils/constants';
import { postValidateSelectedFile  } from '../../validations/posts/editUsersPost';
import {Button, FormField, Loader} from '../../';

import './editPostImageMainContent.css'

const EditPostImageMainContent = () => {
    const dispatch                                      = useDispatch();
    const navigate                                      = useNavigate();
    const location                                      = useLocation();
    const [savingInfo, setSavingInfo]                   = useState(false);
    const [isButtonDisabled, setIsButtonDisabled]       = useState(true);
    const [productImg, setProductImg]                   = useState(null);
    const [selectedFileErrors, setSelectedFileErrors]   = useState(null);

    const [postData, setPostData]             = useState({userId: 'WK43978433334sa', selectedFile: ''})
    const [ isLoading, setIsLoading ]         = useState({selectedFile: false})
    const [ isValid, setIsValid ]             = useState({selectedFile: false})

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

        const selectedFileErrors  = validateSelectedFile();

        setSelectedFileErrors(selectedFileErrors)

        const hasErrors = () => {
          // Check if any error exists in the form data
          if ( selectedFileErrors.length > 0 ) {
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
          const returnConfirm = window.confirm('Are you sure you want to Edit Image?')
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
            <h3>Edit Post Image</h3>
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

              <Button onClickButton buttonClickWrap={savingInfo ? `button-login-submitted` : `button-login-submit`} onClickName={savingInfo ? <>{<Loader />} Updating...</> : "Update"} isButtonDisabled={isButtonDisabled} buttonClasses={isButtonDisabled ? ['buttonDisabledClass'] : ['buttonEnabledClass']} />

          </form>
        </div>
      </div>
    </>
  )
}

export default EditPostImageMainContent
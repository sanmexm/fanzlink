import React from 'react';

import { CloudUploadRoundedIcon } from '../../utils/constants';
import './formField.css'

const FormField = ({isLoadingBtn, isValid, hidden, labelBoolean, labelName, labelTitle, name, id, accept, type, value, handleChange, handleBlur, inputType, fileInputType, multipleFileInputType, selectType, textareaType, readOnly, maxLength, fullNameOption, valueOptionId, radioType, htmlFor, errors, options=[]}) => {

  return (
    <>
      <div className='reg-input-group'>
          {inputType ? (
            <>
              <input
                  name={name}
                  type={type}
                  value={value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete='off'
                  className='reg-input'
                  readOnly={readOnly}
                  maxLength={maxLength}
              />
            </>
          ) : fileInputType ? (
            <>
              <label htmlFor='reg-input-file' className='reg-input-file-wrapper' title='upload a file'>
                <input id="reg-input-file" type="file" accept="image/*" required name={name} onChange={handleChange} hidden />
                <div className='reg-input-file-icon'><CloudUploadRoundedIcon /></div>
                <span>Click to select a file</span>
              </label>
            </>
          ) : multipleFileInputType ? (
            <>
              <label htmlFor='reg-input-multiple-file' className='reg-input-file-wrapper' title='upload multiple files'>
                <input id="reg-input-multiple-file" type="file" accept="image/*" multiple max="10" required name={name} onChange={handleChange} hidden />
                <div className='reg-input-file-icon'><CloudUploadRoundedIcon /></div>
                <span>Click to select multiple files</span>
              </label>
            </>
          ) : selectType ? (
              <select required className='reg-input-select-group' name={name} value={value} onChange={handleChange} onBlur={handleBlur}>
                <option value=""></option>
                {options.map((option, index) => (
                    fullNameOption ? (
                        <option key={index} value={valueOptionId ? option._id : `${option._id}${option.firstName} ${option.lastName}`}>
                          {option.firstName} {option.lastName}
                        </option>
                      ) : (
                        <option key={index} value={option.name}>
                          {option.name}
                        </option>
                    )
                ))}
              </select>
          ) : textareaType ? (
              <textarea required className='reg-textarea-select-group' name={name} value={value} onChange={handleChange} onBlur={handleBlur} maxLength={maxLength}></textarea>
          ) : radioType ? (
              <label htmlFor={htmlFor} className='reg-input-label-radio'>
                <input type={type} name={name} id={id} value={value} className='reg-input-radio__input' onChange={handleChange} onBlur={handleBlur} />
                <div className='reg-input-radio__radio'></div>
                {labelTitle}
              </label>
          ) : null}

          {!labelBoolean && (
            <label htmlFor={name} className="reg-input-label">
              {labelName}
            </label>
          )}
        <div className={`spinner ${isLoadingBtn ? 'loading' : ''}`}></div>
      </div>
      <div className={`validation ${!isValid ? 'invalid' : ''}`}>
        {errors}
      </div>
    </>
  )
}

export default FormField
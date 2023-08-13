import React from 'react'
import { Link } from 'react-router-dom'

import './button.css'

const Button = ({ buttonWrapper, buttonClasses, onClickButton, linkButton, buttonClickWrap, onClickNavigate, isButtonDisabled, buttonIconBack, onClickName, buttonIcon, linkTo, linkClass, linkName, linkIcon, title}) => {
  
  const classNames = buttonClasses ? buttonClasses.join(' ') : '';
    
  return (
    <>
      <div className={buttonWrapper}>
        { onClickButton ? (
            <button className={`${buttonClickWrap} ${classNames}`} onClick={onClickNavigate} disabled={isButtonDisabled} title={title}>{buttonIconBack} {onClickName} {buttonIcon}</button>
        ): linkButton ? (
            <Link to={linkTo} className={linkClass} title={title}>{linkName} {linkIcon}</Link>
        ) : null }
      </div>
    </>
  )
}

export default Button
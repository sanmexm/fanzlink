import React from 'react'

import { DeleteRoundedIcon, LinkRoundedIcon, rightbarLink } from '../../utils/constants'
import {Button} from '../'
import './rightbarMenu.css'

const RightbarMenu = () => {
    const handleAccountDelete = (e) => {
        e.preventDefault();
        const returnConfirm = window.confirm('Are you sure you want to delete your account?')
        if (returnConfirm){
    
        }
    }
  return (
    <>
        <div className='rightbar-wrapper'>
            <div className='rightbar-sub-links'>
                <div className='rightbar-sub-icon'>
                    <LinkRoundedIcon />
                    <span>Quick Links</span>
                </div>
                <div className='rightbar-link-wrapper'>
                    {rightbarLink.map((link) => (
                    <a key={link.id} href={link.link} className='rightbar-link' title={link.name}>{link.name}</a>
                    ))}
                </div>
            </div>

            <div className="rightbar-bottom-links">
                <a href="/posts/create-post" className='rightbar-link-bottom' title='create a post'>create a post</a>
            </div>
        </div>

        <div className='rightbar-wrapper-delete'>
            <Button onClickButton buttonWrapper="button-wrapper" buttonClickWrap="delete-button-click-wrap" buttonIcon={<DeleteRoundedIcon />} title="delete account" onClickNavigate={handleAccountDelete} onClickName="Delete Account" />
        </div>
    </>
  )
}

export default RightbarMenu
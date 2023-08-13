import React from 'react'
import { Link } from 'react-router-dom'
import { SendRoundedIcon, CallRoundedIcon, EmailRoundedIcon, TwitterIcon, InstagramIcon, FacebookRoundedIcon } from '../../utils/constants'

import { BackToTop, Name } from '../'

import './footer.css'

const Footer = () => {
  return (
    <>
      <footer className='footer'>
        <div className="footer__container">
          <div className="footer__1">
            <Link to="/" className="footer__logo"><h4><Name /></h4></Link>
            <p>Best of the Web is the oldest, editor curated web directory online. Whether you’re looking for a plumber, a lawyer that specializes in a specific legal field</p>
            <div className="footer__subscribe">
              <input type="email" placeholder="Enter email" required />
              <button className='footer__subscribe-button' type="button"><SendRoundedIcon /></button>
            </div>
          </div>
          <div className="footer__2">
            <h4>Quick Links</h4>
            <ul className="permalinks">
              <li><Link className='footer-link' to="about">About</Link></li>
              <li><Link className='footer-link' to="terms">Terms & Conditions</Link></li>
              <li><Link className='footer-link' to="privacy">Privacy</Link></li>
              <li><Link className='footer-link' to="contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer__3">
            <h4>Permalinks</h4>
            <ul className="permalinks">
              <li><Link className='footer-link' to="frequently-asked-questions">Faq</Link></li>
              <li>8:00 AM - 11:00 AM</li>
            </ul>
          </div>
          <div className="footer__4">
            <h4>Contact us</h4>
            <div className='footer-contact'>
              <span className='footer-contact-icon'><CallRoundedIcon /> +1 234 546 4567</span>
              <span className='footer-contact-icon'><EmailRoundedIcon /> sample@fanzlink.com</span>
              <ul className="footer__socials">
                <li><a className='footer__socials_link' href={`https://facebook.com/fanzlink`} target="_blank" rel="noreferrer" ><FacebookRoundedIcon /></a></li>
                <li><a className='footer__socials_link' href={`https://instagram.com/fanzlink`} target="_blank" rel="noreferrer"><InstagramIcon /></a></li>
                <li><a className='footer__socials_link' href={`https://twitter.com/fanzlink`} target="_blank" rel="noreferrer"><TwitterIcon /></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright"><small>&copy; { new Date().getFullYear() } <Name /> | All rights reserved.</small></div>
      </footer>
      <BackToTop />
    </>
  )
}

export default Footer
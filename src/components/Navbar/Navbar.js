import React, { useEffect, useState } from 'react'
import decode from 'jwt-decode'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ConnectWithoutContactIcon, ShortTextIcon, navLinks } from '../../utils/constants'
import { LOGOUT } from '../../constants/actionTypes'
import { Name, Button } from '../'
import { useScrollPosition } from '../../utils/scrollPosition'
import './navbar.css'

const Navbar = () => {
  const [user, setUser]                         = useState(JSON.parse(localStorage.getItem('authData')))
  const authData                                = JSON.parse(localStorage.getItem('authData'))
  const UserUniqueId                            = authData?.result?._id
  const location                                = useLocation()
  const dispatch                                = useDispatch()
  const scrollPosition                          = useScrollPosition();
  const [selectedCategory, setSelectedCategory] = useState('Home')
  const [isOpen, setIsOpen]                     = useState(false)

  const logoutUser = () => {
    dispatch({ type: LOGOUT })
    window.location.replace('/login');
    setUser(null)
  }

  const handleAccountClick = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    let tokenExpirationTimeout;
    let inactivityTimeout;
  
    const resetTokenExpirationTimer = () => {
      clearTimeout(tokenExpirationTimeout);
  
      const token = user?.token;
      if (token) {
        const decodedToken = decode(token);
        const currentTime = Math.floor(Date.now() / 1000);
  
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          logoutUser();
        } else {
          const timeUntilExpiration = (decodedToken.exp - currentTime) * 1000;
          tokenExpirationTimeout = setTimeout(logoutUser, timeUntilExpiration);
        }
      }
    };
  
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(logoutUser, 15 * 60 * 1000);
    };
  
    const clearTimers = () => {
      clearTimeout(tokenExpirationTimeout);
      clearTimeout(inactivityTimeout);
    };
  
    const events = ["load", "mousemove", "mousedown", "touchstart", "click", "keypress", "scroll", "resize", "contextmenu", "wheel", "keydown", "keyup", "focus", "blur"];
  
    events.forEach((event) => {
      window.addEventListener(event, () => {
        resetTokenExpirationTimer();
        resetInactivityTimer();
      });
    });
  
    const clearTimersOnUnload = () => {
      clearTimers();
      events.forEach((event) => {
        window.removeEventListener(event, resetTokenExpirationTimer);
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  
    window.addEventListener("beforeunload", clearTimersOnUnload);
  
    return () => {
      clearTimersOnUnload();
      window.removeEventListener("beforeunload", clearTimersOnUnload);
    };
  }, [user?.token]);  

  return (
    <>
      <nav className={scrollPosition > 50 ? 'navbar active-scroll' : 'navbar'}>
        <div className='logo'><Name /> <ConnectWithoutContactIcon /></div>

        <div className='menu-tag'>
          <ShortTextIcon />
        </div>
        
        <div className='navbar-center'>
          <ul>
              {navLinks.map((navlink) => (
                <li key={navlink.name}><Link onClick={() => setSelectedCategory(navlink.name)} className={selectedCategory === navlink.name ? 'anchor active' : 'anchor' } to={navlink.link}><span>{navlink.name}</span></Link></li>
              ))}
              {user && (
                <>
                  <li><Link onClick={() => setSelectedCategory("dashboard")} className={selectedCategory === "dashboard" ? 'anchor active' : 'anchor' } to="/dashboard"><span>dashboard</span></Link></li>
                  <li><Link onClick={() => setSelectedCategory("profile")} className={selectedCategory === "profile" ? 'anchor active' : 'anchor' } to="/profile/user"><span>profile</span></Link></li>
                </>
              )}
            <li>
              {user ? (
                <div className='nav-account-btn-container'>
                  <Button buttonWrapper="button-wrapper" onClickButton buttonClickWrap="button-click-wrap" onClickNavigate={handleAccountClick} onClickName="settings" />
                  
                  <div className={isOpen ? 'nav-account-menu-option active' : 'nav-account-menu-option'}>
                    <Link to="/login" className='nav-account-menu-detail nav-account-menu-detail-bottom-divider' onClick={handleAccountClick}>
                      <span>profile</span>
                    </Link>
                    <div className='nav-account-menu-detail' onClick={logoutUser}>Logout</div>
                  </div>
                </div>
              ) : (
                <div className='nav-account-btn-container'>
                  <Button buttonWrapper="button-wrapper" onClickButton buttonClickWrap="button-click-wrap" onClickNavigate={handleAccountClick} onClickName="Account" />
                  
                  <div className={isOpen ? 'nav-account-menu-option active' : 'nav-account-menu-option'}>
                    <Link to="/login" className='nav-account-menu-detail nav-account-menu-detail-bottom-divider' onClick={handleAccountClick}>
                      <span>Login</span>
                    </Link>
                    <Link to="/register" className='nav-account-menu-detail' onClick={handleAccountClick}>
                      <span>Signup</span>
                    </Link>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
import React from 'react'
import { FacebookRoundedIcon, InstagramIcon, RocketLaunchRoundedIcon, TwitterIcon, WhatsAppIcon } from '../../utils/constants'
import { motion } from 'framer-motion'
import './comingSoon.css'

const ComingSoon = () => {

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delay: 2,
            type: 'spring',
            stiffness: 200,
            damping: 15,
          },
        },
    };

  return (
    <>
        <div className='coming-soon-hero'>
            <div className='coming-soon-nav'>
                <nav className='coming-soon-logo'><RocketLaunchRoundedIcon /></nav>
                <div className='coming-soon-btn'> Get quotes</div>
            </div>

            <div className='coming-soon-content'>
                {/* <small>Shey you're pretending you're not in a relationship?</small> */}
                <h1>Your breakthrough is
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.span>
                            coming soon...
                        </motion.span>
                    </motion.div>
                </h1>
                <form className='coming-soon-form'>
                    <input type='email' placeholder='Enter email address for breakthrough quotes' />
                    <button type='butt' className='coming-soon-btn'>Subscribe</button>
                </form>
            </div>

            <div className='coming-soon-links'>
                <a href="https://google.com"><FacebookRoundedIcon /></a>
                <a href="https://google.com"><TwitterIcon /></a>
                <a href="https://google.com"><InstagramIcon /></a>
                <a href="https://google.com"><WhatsAppIcon /></a>
            </div>
        </div>
    </>
  )
}

export default ComingSoon

// coming-soon-hero -> hero
// coming-soon-nav -> nav
// 
// 
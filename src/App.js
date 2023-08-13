import React, { createContext } from 'react'
import useLocalStorage from 'use-local-storage'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Footer, Navbar } from './components';
import { About, Contact, CreatePost, ComingSoon, Dashboard, Faq, Home, Login, PageNotFound, PreviewPost, Privacy, Profile, Register, Subscription, Terms, UserProfile, EditPost, TabContent, EditPostImage, EditProfile, EditProfileImage, VerifyEmail, ForgotPassword, ResetPassword, ResendVerification } from './pages';

export const ThemeContext = createContext(null) 

const App = () => {
    const authData          = JSON.parse(localStorage.getItem('authData'))
    const [theme, setTheme] = useLocalStorage("light")

    const toggleTheme = () => {
        setTheme((curr) => (curr === 'light' ? "dark" : "light"))
    }

    return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
        <div className='main-container' id={theme}>
            <Toaster position='top-center' reverseOrder="false" gutter={8} toastOptions={{ className: 'toast-option', }} containerStyle={{top: '15%', }}></Toaster>
            <Navbar toggleTheme={toggleTheme} theme={theme} />
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path="/login" exact element={!authData ? (<Login />) : (<Navigate to="/" replace />) } />
                <Route path="/register" exact element={!authData ? (<Register />) : (<Navigate to="/" replace />) } />
                <Route path="/dashboard" exact element={authData ? (<Dashboard />) : (<Navigate to='/login' replace />)} />
                <Route path='/profile/:id' exact element={<UserProfile />} />
                <Route path="/profile/user" exact element={authData ? (<Profile />) : (<Navigate to='/login' replace />)} />
                <Route path="/profile/edit-profile/:id" exact element={authData ? (<EditProfile />) : (<Navigate to='/login' replace />)} />
                <Route path="/profile/edit-profile-image/:id" exact element={authData ? (<EditProfileImage />) : (<Navigate to='/login' replace />)} />
                <Route path="/subscription" exact element={authData ? (<Subscription />) : (<Navigate to='/login' replace />)} />
                <Route path="/posts/create-post" exact element={authData ? (<CreatePost />) : (<Navigate to='/login' replace />)} />
                <Route path="/posts/edit-post/:id" exact element={authData ? (<EditPost />) : (<Navigate to='/login' replace />)} />
                <Route path="/posts/edit-post-image/:id" exact element={authData ? (<EditPostImage />) : (<Navigate to='/login' replace />)} />
                <Route path="/posts/preview-post/:id" exact element={authData ? (<PreviewPost />) : (<Navigate to='/login' replace />)} />
                <Route path='/user/:id/verify/:emailToken' exact element={<VerifyEmail />} />
                <Route path='/forgot-password' exact element={<ForgotPassword />} />
                <Route path='/resend-verification' exact element={<ResendVerification />} />
                <Route path='/users/:id/reset-password/:emailAddress/token/:resetPasswordToken' exact element={<ResetPassword />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/about" element={<About />} />
                <Route path="/frequently-asked-questions" element={<Faq />} />
                <Route path='/page-not-found' exact element={<PageNotFound />} />
                <Route path="*" element={<Navigate to="/page-not-found" replace />} />
                {/* random sample designs for later use */}
                <Route path="/coming-soon" element={<ComingSoon />} />
                <Route path="/tab-content" element={<TabContent />} />
                {/* random sample designs for later use */}
            </Routes>
            <Footer />
            {/* the back to top can be out the main-container div if the behavior isn't as expected */}
        </div>
    </ThemeContext.Provider>
    )
}
export default App
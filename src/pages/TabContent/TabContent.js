import React, { useState } from 'react'

import { HomeIcon, LockRoundedIcon, SettingsRoundedIcon } from '../../utils/constants'
import { Button, FormField } from '../../components';
import './tabContent.css'

const TabContent = () => {
    const [activeTab, setActiveTab] = useState(1);

    const [postData, setPostData]   = useState({ username: '', password: '' })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevState) => ({ ...prevState, [name]: value }));
      }

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };
  return (
    <>
        <div className='widget-main-wrapper'>
            <div className='widget-main'>
                <div className='widget-tabs'>
                    <input id="tab-1" type='radio' name='group' className='widget-tabs-top-input' checked={activeTab === 1} onChange={() => handleTabClick(1)} />
                    <input id="tab-2" type='radio' name='group' className='widget-tabs-top-input' checked={activeTab === 2} onChange={() => handleTabClick(2)} />
                    <input id="tab-3" type='radio' name='group' className='widget-tabs-top-input' checked={activeTab === 3} onChange={() => handleTabClick(3)} />
                    <div className='widget-buttons'>
                        <label htmlFor='tab-1' title='home'><HomeIcon /></label>
                        <label htmlFor='tab-2' title='sign in'><LockRoundedIcon /></label>
                        <label htmlFor='tab-3' title='settings'><SettingsRoundedIcon /></label>
                        <div className='widget-underline'></div>
                    </div>
                    <div className='widget-content'>
                        <div className='widget-content-inner'>
                            <div className='widget-content-inner-detail'>
                                <h3>Home</h3>
                                <p>
                                    Culpa ullamco reprehenderit ut aliquip nulla non aliquip nisi irure ullamco occaecat commodo. Ipsum dolore do nulla ea nulla voluptate exercitation esse laborum pariatur. Id consectetur velit enim ea quis dolor esse Lorem tempor sit ullamco laboris. Laboris elit elit dolor velit commodo ut pariatur enim minim quis voluptate ipsum duis.
                                </p>
                            </div>
                            <div className='widget-content-inner-detail'>
                                <h3> Account</h3>
                                <p className='account-login-input-btn-pass-container'>
                                    <FormField inputType type="text" labelName="Username" name="username" value={postData.username} handleChange={handleChange} />

                                    <FormField inputType type='password' labelName="Password" name="password" value={postData.password} handleChange={handleChange} />

                                    <Button onClickButton buttonClickWrap="button-login-submit" onClickName="Sign in"  />
                                </p>
                            </div>
                            <div className='widget-content-inner-detail'>
                                <h3>Settings</h3>
                                <p>
                                    Culpa ullamco reprehenderit ut aliquip nulla non aliquip nisi irure ullamco occaecat commodo. Ipsum dolore do nulla ea nulla voluptate exercitation esse laborum pariatur. Id consectetur velit enim ea quis dolor esse Lorem tempor sit ullamco laboris. Laboris elit elit dolor velit commodo ut pariatur enim minim quis voluptate ipsum duis.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default TabContent


// {/* <div className='widget-main-wrapper'>
//     <div className='widget-main'>
//         <div className='widget-tabs'>
//             <input id="tab-1" type='radio' name='group' />
//             <input id="tab-2" type='radio' name='group' />
//             <input id="tab-3" type='radio' name='group' />
//             <div className='widget-buttons'>
//                 <label htmlFor='tab-1' title='home'><HomeIcon /></label>
//                 <label htmlFor='tab-2' title='sign in'><LockRoundedIcon /></label>
//                 <label htmlFor='tab-3' title='settings'><SettingsRoundedIcon /></label>
//                 <div className='widget-underline'></div>
//             </div>
//             <div className='widget-content'>
//                 <div className='widget-content-inner'>
//                     <div className='widget-content-inner-detail'>
//                         <h3>Home</h3>
//                         <p>
//                             Culpa ullamco reprehenderit ut aliquip nulla non aliquip nisi irure ullamco occaecat commodo. Ipsum dolore do nulla ea nulla voluptate exercitation esse laborum pariatur. Id consectetur velit enim ea quis dolor esse Lorem tempor sit ullamco laboris. Laboris elit elit dolor velit commodo ut pariatur enim minim quis voluptate ipsum duis.
//                         </p>
//                     </div>
//                     <div className='widget-content-inner-detail'>
//                         <h3>Locked Account</h3>
//                         <p>
//                             Culpa ullamco reprehenderit ut aliquip nulla non aliquip nisi irure ullamco occaecat commodo. Ipsum dolore do nulla ea nulla voluptate exercitation esse laborum pariatur. Id consectetur velit enim ea quis dolor esse Lorem tempor sit ullamco laboris. Laboris elit elit dolor velit commodo ut pariatur enim minim quis voluptate ipsum duis.
//                         </p>
//                     </div>
//                     <div className='widget-content-inner-detail'>
//                         <h3>Settings</h3>
//                         <p>
//                             Culpa ullamco reprehenderit ut aliquip nulla non aliquip nisi irure ullamco occaecat commodo. Ipsum dolore do nulla ea nulla voluptate exercitation esse laborum pariatur. Id consectetur velit enim ea quis dolor esse Lorem tempor sit ullamco laboris. Laboris elit elit dolor velit commodo ut pariatur enim minim quis voluptate ipsum duis.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div> */}
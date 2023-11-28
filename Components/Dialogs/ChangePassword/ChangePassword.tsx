import React from 'react'

import { changePasswordHandler } from "../../../utils/auth";
import store from '../../../Redux/store';
import { hideDialog } from '../../../Redux/actions/dialogs';

export const ChangePassword = () => {
    return (

        <div className="dialogs">

            <div className="dialog update-pass show">

                <h2>Change Password</h2>

                <form method="post" onSubmit={ changePasswordHandler } >

                    <div className='input'>
                        <i className='fa-solid fa-lock'></i>
                        <div>
                            <input type="password" name="old_password" required />
                            <span>Old Password *</span>
                        </div>
                    </div>
                    <div className='input'>
                        <i className='fa-solid fa-lock'></i>
                        <div>
                            <input type="password" name="new_password" required />
                            <span>New Password *</span>
                        </div>
                    </div>
                    <div className='input'>
                        <i className='fa-solid fa-lock'></i>
                        <div>
                            <input type="password" name="confirm_password" required />
                            <span>Confirm New Password *</span>
                        </div>
                    </div>

                    <div className="controls">
                        <button onClick={()=>{store.dispatch(hideDialog())}} style={{backgroundColor: "#4A4A4A"}} type="button">Cancel</button>
                        <button style={{backgroundColor: "#f26826"}} type="submit">UPDATE PASSWORD</button>
                    </div>

                </form>

            </div>
        
        </div>

    )
}

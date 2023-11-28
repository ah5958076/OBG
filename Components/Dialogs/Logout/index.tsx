import React from 'react'

import store from '../../../Redux/store'
import { hideDialog } from '../../../Redux/actions/dialogs'
import { logoutUser } from '../../../utils/auth';

export const Logout = () => {
    return (
    
        <div className="dialogs">

            <div className="dialog confirmation-dialog show">

                <h2>Logout Dialog</h2>

                <p>Are you want to logout?</p>
                
                <div className="controls no-wrap">
                    <button onClick={()=>{store.dispatch(hideDialog())}}>Cancel</button>
                    <button onClick={ logoutUser }>Logout</button>
                </div>

            </div>
            
        </div>

    )
}

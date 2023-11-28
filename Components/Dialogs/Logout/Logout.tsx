import React from 'react'

import store from '../../../Redux/store'
import { hideDialog } from '../../../Redux/actions/dialogs'
import { CANCEL_BTN, SITE_CLR } from "../../../constants/colors";
import { logoutUser } from '../../../utils/auth';

export const Logout = () => {
    return (
    
        <div className="dialogs">

            <div className="dialog confirmation-dialog show">

                <h2>Logout Dialog</h2>

                <p>Are you want to logout?</p>
                
                <div className="controls no-wrap">
                    <button onClick={()=>{store.dispatch(hideDialog())}} style={{backgroundColor: CANCEL_BTN}}>Cancel</button>
                    <button style={{backgroundColor: SITE_CLR}} onClick={ logoutUser }>Logout</button>
                </div>

            </div>
            
        </div>

    )
}

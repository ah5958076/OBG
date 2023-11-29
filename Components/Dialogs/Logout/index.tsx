import React from 'react'
import dialogStyles from "@/styles/dialogs.module.css";

import store from '@/Redux/store'
import { hideDialog } from '@/Redux/actions/dialogs'
import { logoutUser } from '@/utils/auth';

export const Logout = () => {
    return (
    
        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.confirmation_dialog} ${dialogStyles.show}`}>

                <h2>Logout Dialog</h2>

                <p>Are you want to logout?</p>
                
                <div className={`${dialogStyles.controls} no-wrap`}>
                    <button style={{backgroundColor: "#4A4A4A"}} onClick={()=>{store.dispatch(hideDialog())}}>Cancel</button>
                    <button style={{backgroundColor: "var(--site-clr)"}} onClick={ logoutUser }>Logout</button>
                </div>

            </div>
            
        </div>

    )
}

import React from 'react'
import dialogStyles from "@/styles/dialogs.module.css";

import store from '@/Redux/store'
import { hideDialog } from '@/Redux/actions/dialogs'
import { confirmationHandler } from '@/utils/general'

export const ConfirmationDialog = (props:any) => {

    return (
        
        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.confirmation_dialog} ${dialogStyles.show}`}>

                <p>Are you Sure to delete?</p>
                
                <div className={`${dialogStyles.controls} no-wrap`}>
                    <button onClick={()=>{store.dispatch(hideDialog())}} style={{backgroundColor: "#4A4A4A"}}>Cancel</button>
                    <button onClick={()=>confirmationHandler(props.data)} style={{backgroundColor: "var(--site-clr)"}}>Yes</button>
                </div>

            </div>
            
        </div>

    )
}

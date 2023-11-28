import React from 'react'

import store from '../../../Redux/store'
import { hideDialog } from '../../../Redux/actions/dialogs'
import { confirmationHandler } from '../../../utils/general'

export const ConfirmationDialog = (props:any) => {
    if(!props.data?.mode)
        return;
    return (
        
        <div className="dialogs">

            <div className="dialog confirmation-dialog show">

                <h2>Confirmation Dialog</h2>

                <p>Are you Sure?</p>
                
                <div className="controls no-wrap">
                    <button onClick={()=>{store.dispatch(hideDialog())}} style={{backgroundColor: "#4A4A4A"}}>Cancel</button>
                    <button onClick={()=>confirmationHandler(props.data)} style={{backgroundColor: "#f26826"}}>Yes</button>
                </div>

            </div>
            
        </div>

    )
}

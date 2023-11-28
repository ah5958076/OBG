import React from 'react'

import IMAGE_PLACEHOLDER from "../../../assets/photo-placeholder.svg";
import { upload_image_preview } from "../../../utils/general"
import store from '../../../Redux/store';
import { hideDialog } from '../../../Redux/actions/dialogs';


export const AddInventory = () => {

    return (
        
        <div className="dialogs">

            <div className="dialog add-new-dialog show">

                <form action="#" method="post">

                    <div>
                        <p>Inventory Photo*</p>
                        <div className="file-input">
                            <img src={ IMAGE_PLACEHOLDER } alt="..." />
                            <input type="file" name="picture" onChange={upload_image_preview} required />
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <input type="text" name="name" required />
                            <span>Inventory Name *</span>
                        </div> 
                    </div>
                
                    <div className="controls">
                        <button onClick={()=>{store.dispatch(hideDialog())}} style={{backgroundColor:"gray"}} type='button'>Cancel</button>
                        <button style={{backgroundColor:"#f26826"}} type="submit">Add Inventory</button>
                    </div>

                </form>

            </div>

        </div>
    )

}

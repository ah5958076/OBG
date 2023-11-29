import React from 'react'

import images from "@/constants/images";
import store from '@/Redux/store';
import { hideDialog } from '@/Redux/actions/dialogs';
import { upload_image_preview } from "@/utils/general"


export const AddGames = () => {

    return (

        <div id='dialogs' className="dialogs">

            <div id='dialog' className="dialog add-league show">

                <form action="#" method="post">

                    <div className='input'>
                        <div>
                            <input type="text" name="name" required />
                            <span>Game Name *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <select name="type" required>
                                <option value="-" defaultChecked>Select Game Type</option>
                                <option value="Franchise">Franchise</option>
                            </select>
                            <span>Game Type</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <select name="platform" required>
                                <option value="-" defaultChecked>Select Game Platform</option>
                                <option value="IoS">IoS</option>
                            </select>
                            <span>Game Platform</span>
                        </div>
                    </div>
                    <div>
                        <label>Game Photo*</label>
                        <div className="file-input">
                            <img src={ images.PHOTO_PLACEHOLDER } alt="..." />
                            <input type="file" name="" accept="image/*" onChange={upload_image_preview} />
                        </div>
                    </div>

                    <div className="controls">
                        <button onClick={()=>{store.dispatch(hideDialog())}} style={{backgroundColor: "gray"}} type="button">Cancel</button>
                        <button style={{backgroundColor: "#F26826"}} type="submit">Add League</button>
                    </div>

                </form>

            </div>

        </div>

    )

}


export const UpdateGames = () => {

    return (

        <div className="dialogs">
        
            <div className="dialog update-league">

                <form action="#" method="post">

                    <div className='input'>
                        <div>
                            <input type="text" name="name" required />
                            <span>Game Name *</span>
                        </div>
                    </div>

                    <div className="input">
                        <div>
                            <select name="type" required>
                                <option value="-" selected>Select Game Type</option>
                                <option value="Franchise">Franchise</option>
                            </select>
                            <span>Game Type</span>
                        </div>
                    </div>

                    <div className="input">
                        <div>
                            <select name="platform" required>
                                <option value="-" selected>Select Game Platform</option>
                                <option value="IoS" selected>IoS</option>
                            </select>
                            <span>Game Platform</span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="imageInput">Game Photo*</label>
                        <div className="file-input">
                            <img src={ images.PHOTO_PLACEHOLDER } alt="..." />
                            <input type="file" name="" accept="image/*" onChange={upload_image_preview} />
                        </div>
                    </div>


                    <div className="controls">
                        <button style={{backgroundColor: "gray"}} type="button">Cancel</button>
                        <button style={{backgroundColor: "#F26826"}} type="submit">Update League</button>
                    </div>

                </form>

            </div>

        </div>
    )

}
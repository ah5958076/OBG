import React from 'react'

import images from "@/constants/images";
import { upload_image_preview } from "@/utils/general"
import store from '@/Redux/store';
import { hideDialog } from '@/Redux/actions/dialogs';


export const AddLadders = () => {

    return (
    
        <div id='dialogs' className="dialogs">

            <div id='dialog' className="dialog add-league show">

                <form action="#" method="post">

                    <div className="input">
                        <div>
                            <input type="text" name="name" required />
                            <span>Ladder Name *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <select name="gameName" required>
                                <option value="-">Select Game</option>
                            </select>
                            <span>Game Name *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <input type="text" name="entryFee" required />
                            <span>Entry Fee *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <input type="text" name="prize" required />
                            <span>Prize *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <input type="text" name="teamSize" required />
                            <span>Team Size *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <input type="text" name="totalTeams" required />
                            <span>Total Teams *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <select name="status" required>
                                <option value="-">Select Status</option>
                            </select>
                            <span>Status *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <input type="Date" name="startingDate" required />
                            <span>Starting Date & Time *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <input type="Date" name="endingDate" required />
                            <span>Ending Date & Time *</span>
                        </div>
                    </div>

                    <div className="league-photo">
                        <label>Tournament Photo*</label>
                        <div className="file-input">
                            <img src={ images.PHOTO_PLACEHOLDER } alt="..." />
                            <input type="file" name="picture" onChange={upload_image_preview} accept="image/*" />
                        </div>
                    </div>

                    <div className="controls">
                        <button onClick={()=>{store.dispatch(hideDialog())}} style={{backgroundColor: "gray"}} type="button">Cancel</button>
                        <button style={{backgroundColor: "#f26826"}} type="submit">Add Ladder</button>
                    </div>

                </form>

            </div>
            
        </div>

    )

}


export const UpdateLadders = () => {

    return (

    <div className='dialogs'>

        <div className="dialog update-league">

            <form action="#" method="post">

                <div className="input">
                    <div>
                        <input type="text" name="name" required />
                        <span>Ladder Name *</span>
                    </div>
                </div>
                <div className="input">
                    <div>
                        <select name="gameName" required>
                            <option value="">Select Game</option>
                        </select>
                        <span>Game Name *</span>
                    </div>
                </div>
                <div className="input">
                    <div>
                        <input type="text" name="entryFee" required />
                        <span>Entry Fee *</span>
                    </div>
                </div>
                <div className="input">
                    <div>
                        <input type="text" name="prize" required />
                        <span>Prize *</span>
                    </div>
                </div>
                <div className="input">
                    <div>
                        <input type="text" name="teamSize" required />
                        <span>Team Size *</span>
                    </div>
                </div>
                <div className="input">
                    <div>
                        <input type="text" name="totalTeams" required />
                        <span>Total Teams *</span>
                    </div>
                </div>
                <div className="input">
                    <div>
                        <select name="status" required>
                            <option value="">Select Status</option>
                        </select>
                        <span>Status *</span>
                    </div>
                </div>
                <div className="input">
                    <div>
                        <input type="Date" name="startingDate" required />
                        <span>Starting Date & Time *</span>
                    </div>
                </div>
                <div className="input">
                    <div>
                        <input type="Date" name="endingDate" required />
                        <span>Ending Date & Time *</span>
                    </div>
                </div>

                <div className="league-photo">
                    <label htmlFor="imageInput">Tournament Photo*</label>
                    <div className="file-input">
                        <img src={ images.PHOTO_PLACEHOLDER } alt="..." />
                        <input type="file" name="" id="imageInput" accept="image/*" />
                    </div>
                </div>

                <div className="controls">
                    <button style={{backgroundColor: "gray"}} type="button">Cancel</button>
                    <button style={{backgroundColor: "#f26826"}} type="submit">Update Ladder</button>
                </div>

            </form>

        </div>

    </div>
        
    )

}

import React from 'react'

import IMAGE_PLACEHOLDER from "../../../assets/photo-placeholder.svg";
import store from '../../../Redux/store';
import { hideDialog } from '../../../Redux/actions/dialogs';
import { upload_image_preview } from "../../../utils/general"


export const AddTournaments = () => {

    return (

        <div className="dialogs">

            <div className="dialog add-league show">

                <form action="#" method="post">

                    <div className="input">
                        <div>
                            <input type="text" name="name" required />
                            <span>Tournament Name *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <select name="type" required>
                                <option value="-" defaultChecked>--SELECT--</option>
                            </select>
                            <span>Tournament Type *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <select name="gameName" required>
                                <option value="-" defaultChecked>--SELECT--</option>
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
                            <input type="Date" name="startingDate" required />
                            <span>Starting Date & Time *</span>
                        </div>
                    </div>

                    <div className="league-photo">
                        <label>Tournament Photo*</label>
                        <div className="file-input">
                            <img src={ IMAGE_PLACEHOLDER } alt="..." />
                            <input type="file" name="picture" onChange={upload_image_preview} accept="image/*" />
                        </div>
                    </div>

                    <div className="controls">
                        <button onClick={()=>{store.dispatch(hideDialog())}} style={{backgroundColor:"gray"}} type="button">Cancel</button>
                        <button style={{backgroundColor: "#F26826"}} type="submit">Add Tournament</button>
                    </div>

                </form>

            </div>

        </div>
        
    )

}


export const UpdateTournaments = () => {

    return (

        <div className="dialogs">

            <div className="dialog update-league show">

                <form action="#" method="post">

                <div className="input">
                        <div>
                            <input type="text" name="name" required />
                            <span>Tournament Name *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <select name="type" required>
                                <option value="-" defaultChecked>--SELECT--</option>
                            </select>
                            <span>Tournament Type *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <select name="gameName" required>
                                <option value="-" defaultChecked>--SELECT--</option>
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
                            <input type="Date" name="startingDate" required />
                            <span>Starting Date & Time *</span>
                        </div>
                    </div>

                    <div className="league-photo">
                        <label>Tournament Photo*</label>
                        <div className="file-input">
                            <img src={ IMAGE_PLACEHOLDER } alt="..." />
                            <input type="file" name="picture" onChange={upload_image_preview} accept="image/*" />
                        </div>
                    </div>

                    <div className="controls">
                        <button style={{backgroundColor: "gray"}} type="button">Cancel</button>
                        <button style={{backgroundColor: "#F26826"}} type="submit">Update Tournament</button>
                    </div>

                </form>

            </div>

        </div>

    )

}
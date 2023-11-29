import React, { useState } from 'react'

import images from "@/constants/images";
import store from "@/Redux/store";
import { hideDialog } from "@/Redux/actions/dialogs";
import { upload_image_preview } from "@/utils/general";
import { addNewHandler, updateLeagueHanlder } from '@/utils/gpLeagues';


export const AddGPLeagues = (props:any) => {

    return (

        <div id='dialogs' className="dialogs">

            <div id='dialog' className="dialog add-league-dialog show">

                <h2>Add League</h2>

                <form action="#" method="post" onSubmit={ addNewHandler }>

                    <div className="input">
                        <div>
                            <input type="text" name="name" required />
                            <span>League Name *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <select name="gameName" required>
                                {props?.data?
                                    props.data.map((obj:any, index:number) => (
                                        <option key={index} value={obj._id}>{obj.name}</option>
                                    )):
                                    <option value="">Select Game</option>
                                }
                            </select>
                            <span>Select Game *</span>
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
                            <input type="date" name="startingDate" required />
                            <span>Starting Date *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <input type="date" name="endingDate" required />
                            <span>Ending Date *</span>
                        </div>
                    </div>

                    <div>
                        <label>League Photo*</label>
                        <div className="file-input">
                            <img src={ images.PHOTO_PLACEHOLDER } alt="..." />
                            <input type="file" name="picture" accept="image/*" onChange={ upload_image_preview } required />
                        </div>
                    </div>

                    <div className="controls">
                        <button onClick={()=>{store.dispatch(hideDialog())}} style={{backgroundColor: "gray"}} type="button">Cancel</button>
                        <button style={{backgroundColor: "#f26826"}} type="submit">ADD LEAGUE</button>
                    </div>

                </form>

            </div>

        </div>

    )

}


export const UpdateGPLeagues = (props:any) => {
    const [name, setName] = useState(props.data.name);
    const [gameName, setGameName] = useState(props.data.gameName._id);
    const [entryFee, setEntryFee] = useState(props.data.entryFee);
    const [prize, setPrize] = useState(props.data.prize);
    const [teamSize, setTeamSize] = useState(props.data.teamSize);
    const [totalTeams, setTotalTeams] = useState(props.data.totalTeams);
    const [startingDate, setStartingDate] = useState(props.data.startingDate);
    const [endingDate, setEndingDate] = useState(props.data.endingDate);

    return (
        
        <div id='dialogs' className="dialogs">

            <div id='dialog' className="dialog update-league-dialog show">

                <h1>Update League</h1>

                <form action="#" method="post" onSubmit={ updateLeagueHanlder }>


                    <input type="hidden" name="id" value={props.data._id} />

                    <div className="input">
                        <div>
                            <input type="text" name="name" value={name} onChange={(e) => {setName(e.target.value)}} required />
                            <span>League Name *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <select name="gameName" value={gameName} onChange={(e)=>setGameName(e.target.value)} required>
                                {props?.data?
                                    props.data.games.map((obj:any, index:number) => (
                                        <option key={index} value={obj._id}>{obj.name}</option>
                                    )):
                                    <option value="">Select Game</option>
                                }
                            </select>
                            <span>Select Game *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <input type="text" name="entryFee" value={entryFee} onChange={(e)=>setEntryFee(e.target.value)} required />
                            <span>Entry Fee *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <input type="text" name="prize" value={prize} onChange={(e)=>setPrize(e.target.value)} required />
                            <span>Prize *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <input type="text" name="teamSize" value={teamSize} onChange={(e)=>setTeamSize(e.target.value)} required />
                            <span>Team Size *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <input type="text" name="totalTeams" value={totalTeams} onChange={(e)=>setTotalTeams(e.target.value)} required />
                            <span>Total Teams *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <input type="date" name="startingDate" value={startingDate.substring(0, 10)} onChange={(e)=>setStartingDate(e.target.value)} required />
                            <span>Starting Date *</span>
                        </div>
                    </div>
                    <div className="input">
                        <div>
                            <input type="date" name="endingDate" value={endingDate.substring(0, 10)} onChange={(e)=>setEndingDate(e.target.value)} required />
                            <span>Ending Date *</span>
                        </div>
                    </div>

                    <div>
                        <label>League Photo*</label>
                        <div className="file-input">
                            <img src={ props.data.picture?`/${props.data.picture}`:images.PHOTO_PLACEHOLDER } alt="..." />
                            <input type="file" name="picture" accept="image/*" onChange={ upload_image_preview } />
                        </div>
                    </div>
                    <input type="hidden" name="old_picture" value={props.data.picture} required />

                    <div className="controls">
                        <button onClick={()=>{store.dispatch(hideDialog());}} style={{backgroundColor:"gray"}} type="button">Cancel</button>
                        <button style={{backgroundColor:"#f26826"}} type="submit">UPDATE LEAGUE</button>
                    </div>

                </form>

            </div>

        </div>

    )
 
}
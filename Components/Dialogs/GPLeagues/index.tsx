import React, { useState } from 'react'
import dialogStyles from "@/styles/dialogs.module.css";

import images from "@/constants/images";
import store from "@/Redux/store";
import { hideDialog } from "@/Redux/actions/dialogs";
import { upload_image_preview } from "@/utils/general";
import { addNewHandler, updateLeagueHanlder } from '@/utils/gpLeagues';
import Input from '@/Components/Input';
import Image from 'next/image';
import Select from '@/Components/Select';

let gameNames = [
    {"1":"Takken 3"},
    {"2":"Takken 5"},
    {"3":"Sand and Riaz"},
    {"4":"Snake Game"},
    {"5":"OBG"}
]

export const AddGPLeagues = (props:any) => {

    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <h2>Add League</h2>

                <form method="post" onSubmit={ addNewHandler }>

                    <Input title='League Name *' name='name' required={true} />
                    <Select title='Select Game *' name='gameName' required={true} options={gameNames} />                    
                    <Input title='Entry Fee *' name='entryFee' required={true} />
                    <Input title='Prize *' name='prize' required={true} />
                    <Input title='Team Size *' name='teamSize' required={true} />
                    <Input title='Total Teams *' name='totalTeams' required={true} />
                    <Input type='date' title='Starting Date *' name='startingDate' required={true} />
                    <Input type='date' title='Ending Date *' name='endingDate' required={true} />

                    <div>
                        <label>League Photo*</label>
                        <div className={dialogStyles.file_input}>
                            <Image src={ images.PHOTO_PLACEHOLDER } alt="..." width={100} height={100} />
                            <input type="file" name="picture" accept="image/*" onChange={ upload_image_preview } required />
                        </div>
                    </div>

                    <div className={dialogStyles.controls}>
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
        
        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <h1>Update League</h1>

                <form method="post" onSubmit={ updateLeagueHanlder }>


                    <input type="hidden" name="id" value={props.data._id} />

                    <Input name='name' title='League Name *' value={name} onChnage={(e:any)=>{setName(e.target.value)}} required={true} />
                    
                    <Select title='Select Game *' name='gameName' required={true} options={gameNames} value={gameName} onChnage={(e:any)=>setGameName(e.target.value)} />                    
                    
                    <Input name='entryFee' title='Entry Fee *' value={entryFee} onChnage={(e:any)=>{setEntryFee(e.target.value)}} required={true} />
                    <Input name='prize' title='Prize *' value={prize} onChnage={(e:any)=>{setPrize(e.target.value)}} required={true} />
                    <Input name='teamSize' title='Team Size *' value={teamSize} onChnage={(e:any)=>{setTeamSize(e.target.value)}} required={true} />
                    <Input name='totalTeams' title='Total Teams *' value={totalTeams} onChnage={(e:any)=>{setTotalTeams(e.target.value)}} required={true} />
                    <Input type='date' name='startingDate' title='Starting Date *' value={startingDate.substring(0, 10)} onChnage={(e:any)=>{setStartingDate(e.target.value)}} required={true} />
                    <Input type='date' name='endingDate' title='Ending Date *' value={endingDate.substring(0, 10)} onChnage={(e:any)=>{setEndingDate(e.target.value)}} required={true} />

                    <div>
                        <label>League Photo*</label>
                        <div className={dialogStyles.file_input}>
                            <Image src={ props.data.picture?`/${props.data.picture}`:images.PHOTO_PLACEHOLDER } alt="..." width={100} height={100} />
                            <input type="file" name="picture" accept="image/*" onChange={ upload_image_preview } />
                        </div>
                    </div>
                    <input type="hidden" name="old_picture" value={props.data.picture} required />

                    <div className={dialogStyles.controls}>
                        <button onClick={()=>store.dispatch(hideDialog())} style={{backgroundColor:"gray"}} type="button">Cancel</button>
                        <button style={{backgroundColor:"var(--site-clr"}} type="submit">UPDATE LEAGUE</button>
                    </div>

                </form>

            </div>

        </div>

    )
 
}
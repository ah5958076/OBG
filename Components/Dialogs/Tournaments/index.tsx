import React, { useState } from 'react'
import dialogStyles from "@/styles/dialogs.module.css"; 

import images from "@/constants/images";
import store from '@/Redux/store';
import { hideDialog } from '@/Redux/actions/dialogs';
import { upload_image_preview } from "@/utils/general"
import Input from '@/Components/Input';
import Select from '@/Components/Select';
import Image from 'next/image';
import { addTournamentHandler, updateTournamentHandler } from '@/utils/tournament';
import { BASE_URL } from '@/constants/backend-routes';



let catagories = [
    {"General": "General"},
    {"Grand Prix": "Grand Prix"}
]



export const AddTournaments = (props:any) => {

    let rawData = props?.data?.data;
    let games:any = [];
    rawData.forEach((elem:any) => {
        let datum:any = {};
        datum[`${elem._id}`]=elem.name;
        games.push(datum);
    })

    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={addTournamentHandler}>

                    <div className={dialogStyles.side_by_side}>
                        <div>
                            <Input name='name' title='Tournament Name *' required={true}/>
                            <Select options={catagories} name='catagory' title='Tournament Type *' required={true}/>
                            <Select options={games} name='gameName' title='Game Name *' required={true}/>
                            <Input name='entryFee' title='Entry Fee *' required={true}/>
                            <Input name='prize' title='Prize *' required={true}/>   
                            <Input name='teamSize' title='Team Size *' required={true}/>
                            <Input name='totalTeams' title='Total Teams *' required={true}/>
                            <Input type='date' name='startingDate' title='Starting Date & Time *' required={true}/>
                        </div>
                        <div className="league-photo">
                            <label>Tournament Photo*</label>
                            <div className={dialogStyles.file_input}>
                                <Image src={ images.PHOTO_PLACEHOLDER } alt="..." />
                                <input type="file" name="picture" onChange={upload_image_preview} accept="image/*" />
                            </div>
                        </div>
                    </div>


                    <div className={dialogStyles.controls}>
                        <button onClick={()=>{store.dispatch(hideDialog())}} style={{backgroundColor:"gray"}} type="button">Cancel</button>
                        <button style={{backgroundColor: "var(--site-clr)"}} type="submit">Add Tournament</button>
                    </div>

                </form>

            </div>

        </div>
        
    )

}


export const UpdateTournaments = (props:any) => {
    
    let rawData = props?.data?.games?.data;
    let games:any = [];
    rawData.forEach((elem:any) => {
        let datum:any = {};
        datum[`${elem._id}`]=elem.name;
        games.push(datum);
    });

    let tournament = props?.data?.tournament?._doc;
    const id = tournament._id;
    const [name, setName] = useState(tournament.name);
    const [type, setType] = useState(tournament.catagory);
    const [gameName, setGameName] = useState(tournament.gameName?._id);
    const [entryFee, setEntryFee] = useState(tournament.entryFee);
    const [prize, setPrize] = useState(tournament.prize);
    const [teamSize, setTeamSize] = useState(tournament.teamSize);
    const [totalTeams, setTotalTeams] = useState(tournament.totalTeams);
    const [startingDate, setStartingDate] = useState(tournament.startingDate.substring(0, 10));
    const [picture, setPicture] = useState(BASE_URL+tournament.picture);


    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={updateTournamentHandler}>

                    <input type="hidden" name="id" value={id} />

                    <div className={dialogStyles.side_by_side}>
                        <div>
                            <Input name='name' title='Tournament Name *' value={name} onChnage={(e:any)=>setName(e.target?.value)} required={true}/>
                            <Select options={catagories} name='catagory' title='Tournament Type *' value={type} onChnage={(e:any)=>setType(e.target?.value)} required={true}/>
                            <Select options={games} name='gameName' title='Game Name *' value={gameName} onChnage={(e:any)=>setGameName(e.target?.value)} required={true}/>
                            <Input name='entryFee' title='Entry Fee *' value={entryFee} onChnage={(e:any)=>setEntryFee(e.target?.value)} required={true}/>
                            <Input name='prize' title='Prize *' value={prize} onChnage={(e:any)=>setPrize(e.target?.value)} required={true}/>   
                            <Input name='teamSize' title='Team Size *' value={teamSize} onChnage={(e:any)=>setTeamSize(e.target?.value)} required={true}/>
                            <Input name='totalTeams' title='Total Teams *' value={totalTeams} onChnage={(e:any)=>setTotalTeams(e.target?.value)} required={true}/>
                            <Input type='date' name='startingDate' title='Starting Date & Time *' value={startingDate} onChnage={(e:any)=>setStartingDate(e.target?.value)} required={true}/>
                        </div>
                        <div className="league-photo">
                            <label>Tournament Photo*</label>
                            <div className={dialogStyles.file_input}>
                                <Image src={ (tournament.picture || picture)?picture:images.PHOTO_PLACEHOLDER } alt="..." width={100} height={100} />
                                <input type="file" name="picture" onChange={(e:any)=>{e.imageViewer=setPicture;upload_image_preview(e)}} accept="image/*" />
                            </div>
                            <input type="hidden" name="oldPicture" value={picture} />
                        </div>
                    </div>


                    <div className={dialogStyles.controls}>
                        <button style={{backgroundColor: "gray"}} type="button">Cancel</button>
                        <button style={{backgroundColor: "var(--site-clr)"}} type="submit">Update Tournament</button>
                    </div>

                </form>

            </div>

        </div>

    )

}
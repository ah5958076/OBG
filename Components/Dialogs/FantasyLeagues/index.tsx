import React, { useState } from 'react'
import dialogStyles from "@/styles/dialogs.module.css";

import store from '@/Redux/store'
import { hideDialog } from '@/Redux/actions/dialogs'
import { addNewHandler, updateLeagueHanlder } from '@/utils/fantasyLeagues'
import Input from '@/Components/Input';
import Select from '@/Components/Select';

let dummy_leagues = [
    {"1":"League 1"},
    {"2":"League 2"},
    {"3":"League 3"},
    {"4":"League 4"},
    {"5":"League 5"},
]

let teamSize = [
    {"4":"4"},
    {"8":"8"},
    {"16":"16"},
    {"32":"32"},
]

export const AddFantasyLeague = (props:any) => {

    return (
        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={addNewHandler}>

                    <Input name='name' title='Fantasy League Name *' required={true} />
                    <Select options={dummy_leagues} name='grandPrix_league' title='Grand Prix League *' required={true} />
                    <Input name='total_teams' title='Total Teams *' required={true} />
                    <Select options={teamSize} name='team_size' title='Team Size *' required={true} />
                    <Input type='datetime-local' name='draftDateTime' title='Draft Date & Time' required={true} />

                    <div className={dialogStyles.controls}>
                        <button onClick={()=>{store.dispatch(hideDialog())}} style={{backgroundColor: "gray"}} type='button'>Cancel</button>
                        <button style={{backgroundColor: "var(--site-clr)"}} type="submit">Create</button>
                    </div>

                </form>

            </div>

        </div>
    )
}


export const UpdateFantasyLeague = (props:any) => {
    console.log(props)  
    const [name, setName] = useState(props.data.name)
    const [grandPrix, setGrandPrix] = useState(props.data.grandPrixLeague._id);
    const [totalTeams, setTotalTeams] = useState(props.data.totalTeams);
    const [teamSize, setTeamSize] = useState(props.data.teamSize);
    const [year, setYear] = useState(props.data.year)

    return (
        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={ updateLeagueHanlder }>

                    <input type="hidden" name="id" value={props.data._id}/>

                    <Input name='name' title='Fantasy League Name *' required={true} value={name} onChnage={(e:any)=>{setName(e.target.value)}}/>
                    <Select name='grandPrix_league' title='Grand Prix League *' required={true} value={grandPrix} onChnage={(e:any)=>setGrandPrix(e.target.value)} options={dummy_leagues} />
                    <Input name='total_teams' title='Total Teams *' required={true} value={totalTeams} onChnage={(e:any)=>{setTotalTeams(e.target.value)}}/>
                    <Select name='team_size' title='Team Size *' required={true} value={teamSize} onChnage={(e:any)=>setTeamSize(e.target.value)} options={teamSize} />
                    <Input type='datetime-local' name='draftDateTime' title='Draft Date & Time *' required={true} value={year} onChnage={(e:any)=>{setYear(e.target.value)}}/>
                    
                    <div className={dialogStyles.controls}>
                        <button onClick={()=>store.dispatch(hideDialog())} style={{backgroundColor: "gray"}} type='button'>Cancel</button>
                        <button style={{backgroundColor: "var(--site-clr)"}} type="submit">Update</button>
                    </div>

                </form>

            </div>

        </div>
    )
}
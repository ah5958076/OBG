import React, { useState } from 'react'
import dialogStyles from "@/styles/dialogs.module.css";

import store from '@/Redux/store'
import { hideDialog } from '@/Redux/actions/dialogs'
import { addNewHandler, updateLeagueHanlder } from '@/utils/fantasyLeagues'
import Input from '@/Components/Input';
import Select from '@/Components/Select';


let teamSize = [
    {"4":"4"},
    {"8":"8"},
    {"16":"16"},
    {"32":"32"},
]


export const AddFantasyLeague = (props:any) => {
    let data:any = [];
    props.data?.data?.map((grandPrix:any) => {
        let datum:any = {}
        datum[`${grandPrix._id}`]=grandPrix.name;
        data.push(datum);
    });

    return (
        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={addNewHandler}>

                    <Input name='name' title='Fantasy League Name *' required={true} />
                    <Select options={data} name='grandPrixLeague' title='Grand Prix League *' required={true} />
                    <Input name='totalTeams' title='Total Teams *' required={true} />
                    <Select options={teamSize} name='teamSize' title='Team Size *' required={true} />
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
    let fantasyLeague = props?.data?.fantasyLeague?._doc;
    let grandPrix_list = props?.data?.grandPrix?.data;
    let data:any = [];
    grandPrix_list.map((grandPrix:any) => {
        let datum:any = {}
        datum[`${grandPrix._id}`]=grandPrix.name;
        data.push(datum);
    });


    const [name, setName] = useState(fantasyLeague.name)
    const [grandPrix, setGrandPrix] = useState(fantasyLeague.grandPrixLeague._id);
    const [totalTeams, setTotalTeams] = useState(fantasyLeague.totalTeams);
    const [totalTeamSize, setTeamSize] = useState(fantasyLeague.teamSize);
    const [draftDateTime, setDraftDateTime] = useState(fantasyLeague.draftDateTime?.substring(0, 16))


    return (
        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={ updateLeagueHanlder }>

                    <input type="hidden" name="id" value={fantasyLeague._id}/>

                    <Input name='name' title='Fantasy League Name *' required={true} value={name} onChnage={(e:any)=>{setName(e.target.value)}}/>
                    <Select name='grandPrixLeague' title='Grand Prix League *' required={true} value={grandPrix}
                     onChnage={(e:any)=>setGrandPrix(e.target.value)} options={data} />
                    <Input name='totalTeams' title='Total Teams *' required={true} value={totalTeams} onChnage={(e:any)=>{setTotalTeams(e.target.value)}}/>
                    <Select name='teamSize' title='Team Size *' required={true} value={totalTeamSize} onChnage={(e:any)=>setTeamSize(e.target.value)} options={teamSize} />
                    <Input type='datetime-local' name='draftDateTime' title='Draft Date & Time *' required={true} value={draftDateTime} onChnage={(e:any)=>{setDraftDateTime(e.target.value)}}/>
                    
                    <div className={dialogStyles.controls}>
                        <button onClick={()=>store.dispatch(hideDialog())} style={{backgroundColor: "gray"}} type='button'>Cancel</button>
                        <button style={{backgroundColor: "var(--site-clr)"}} type="submit">Update</button>
                    </div>

                </form>

            </div>

        </div>
    )
}
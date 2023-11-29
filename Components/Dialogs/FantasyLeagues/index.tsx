import React, { useState } from 'react'
import store from '@/Redux/store'
import { hideDialog } from '@/Redux/actions/dialogs'
import { addNewHandler, updateLeagueHanlder } from '@/utils/fantasyLeagues'


export const AddFantasyLeague = (props:any) => {

    return (
        <div id='dialogs' className="dialogs">

            <div id='dialog' className="dialog create-fantasy-league show">

                <h2>Add Fantasy League</h2>

                <form method="post" onSubmit={addNewHandler}>

                    <div className='input'>
                        <div>
                            <input type="text" name="name" required />
                            <span>Fantasy League Name *</span>
                        </div>
                    </div>
                    <div className='input'>
                        <div>
                            <select name="grandPrix_league" required>
                                {
                                    props?.data?
                                    props.data.map((obj:any, index:number) => {
                                        return <option value={obj._id} key={index}>{obj.name}</option>
                                    }):
                                    <option value="">Select Grand Prix</option>
                                }
                            </select>
                            <span>Grand Prix League *</span>
                        </div>
                    </div>
                    <div className='input'>
                        <div>
                            <input type="text" name="total_teams" required />
                            <span>Total Teams *</span>
                        </div>
                    </div>
                    <div className='input'>
                        <div>
                            <select name="team_size" required>
                                <option value="-" defaultChecked>Select Team Size</option>
                                <option value="4">4</option>
                                <option value="8">8</option>
                                <option value="16">16</option>
                                <option value="32">32</option>
                            </select>
                            <span>Team Size *</span>
                        </div>
                    </div>
                    <div className='input'>
                        <div>
                            <input type="number" name="year" min="0" required />
                            <span>Year *</span>
                        </div>
                    </div>

                    <div className="controls">
                        <button onClick={()=>{store.dispatch(hideDialog())}} style={{backgroundColor: "gray"}} type='button'>Cancel</button>
                        <button style={{backgroundColor: "#f26826"}} type="submit">Create</button>
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
        <div id='dialogs' className="dialogs">

            <div id='dialog' className="dialog update-fantasy-league show">

                <h2>Update Fantasy League</h2>

                <form method="post" onSubmit={ updateLeagueHanlder }>

                    <input type="hidden" name="id" value={props.data._id}/>

                    <div className='input'>
                        <div>
                            <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} required />
                            <span>Fantasy League Name *</span>
                        </div>
                    </div>
                    <div className='input'>
                        <div>
                            <select name="grandPrix_league" value={grandPrix} onChange={(e)=>setGrandPrix(e.target.value)} required>
                            {
                                props.data?
                                props.data?.grandPrix.map((obj:any, index:number) => {
                                    return <option value={obj._id} key={index}>{obj.name}</option>
                                }):
                                <option value="">Select Grand Prix</option>
                            }
                            </select>
                            <span>Grand Prix League *</span>
                        </div>
                    </div>
                    <div className='input'>
                        <div>
                            <input type="text" name="total_teams" value={totalTeams} onChange={(e)=>setTotalTeams(e.target.value)} required />
                            <span>Total Teams *</span>
                        </div>
                    </div>
                    <div className='input'>
                        <div>
                            <select name="team_size" value={teamSize} onChange={(e)=>setTeamSize(e.target.value)} required>
                                <option value="-" defaultChecked>Select Team Size</option>
                                <option value="4">4</option>
                                <option value="8">8</option>
                                <option value="16">16</option>
                                <option value="32">32</option>
                            </select>
                            <span>Team Size *</span>
                        </div>
                    </div>
                    <div className='input'>
                        <div>
                            <input type="number" name="year" min="0" value={year} onChange={(e)=>setYear(e.target.value)} required />
                            <span>Year *</span>
                        </div>
                    </div>

                    <div className="controls">
                        <button onClick={()=>store.dispatch(hideDialog())} style={{backgroundColor: "gray"}} type='button'>Cancel</button>
                        <button style={{backgroundColor: "#f26826"}} type="submit">Update</button>
                    </div>

                </form>

            </div>

        </div>
    )
}
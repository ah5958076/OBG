import React from 'react'
import dialogStyles from "@/styles/dialogs.module.css"; 

import images from "@/constants/images";
import store from '@/Redux/store';
import { hideDialog } from '@/Redux/actions/dialogs';
import { upload_image_preview } from "@/utils/general"
import Input from '@/Components/Input';
import Select from '@/Components/Select';
import Image from 'next/image';

const addTournamentHandler = (e:any) => {}
const updateTournamentHandler = (e:any) => {}

export const AddTournaments = () => {

    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={addTournamentHandler}>

                    <Input name='name' title='Tournament Name *' required={true}/>
                    <Select options={[]} name='type' title='Tournament Type *' required={true}/>
                    <Select options={[]} name='gameName' title='Game Name *' required={true}/>
                    <Input name='entryFee' title='Entry Fee *' required={true}/>
                    <Input name='prize' title='Prize *' required={true}/>   
                    <Input name='teamSize' title='Team Size *' required={true}/>
                    <Input name='totalTeams' title='Total Teams *' required={true}/>
                    <Input type='date' name='startingDate' title='Starting Date & Time *' required={true}/>

                    <div className="league-photo">
                        <label>Tournament Photo*</label>
                        <div className={dialogStyles.file_input}>
                            <Image src={ images.PHOTO_PLACEHOLDER } alt="..." />
                            <input type="file" name="picture" onChange={upload_image_preview} accept="image/*" />
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


export const UpdateTournaments = () => {

    return (

        <div className={dialogStyles.dialogs}>

            <div className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={updateTournamentHandler}>

                    <Input name='name' title='Tournament Name *' required={true}/>
                    <Select options={[]} name='type' title='Tournament Type *' required={true}/>
                    <Select options={[]} name='gameName' title='Game Name *' required={true}/>
                    <Input name='entryFee' title='Entry Fee *' required={true}/>
                    <Input name='prize' title='Prize *' required={true}/>   
                    <Input name='teamSize' title='Team Size *' required={true}/>
                    <Input name='totalTeams' title='Total Teams *' required={true}/>
                    <Input type='date' name='startingDate' title='Starting Date & Time *' required={true}/>

                    <div className="league-photo">
                        <label>Tournament Photo*</label>
                        <div className={dialogStyles.file_input}>
                            <Image src={ images.PHOTO_PLACEHOLDER } alt="..." />
                            <input type="file" name="picture" onChange={upload_image_preview} accept="image/*" />
                        </div>
                    </div>

                    <div className="controls">
                        <button style={{backgroundColor: "gray"}} type="button">Cancel</button>
                        <button style={{backgroundColor: "var(--site-clr)"}} type="submit">Update Tournament</button>
                    </div>

                </form>

            </div>

        </div>

    )

}
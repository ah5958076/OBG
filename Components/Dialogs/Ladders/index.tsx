import React from 'react'
import dialogStyles from "@/styles/dialogs.module.css";

import images from "@/constants/images";
import { upload_image_preview } from "@/utils/general"
import store from '@/Redux/store';
import { hideDialog } from '@/Redux/actions/dialogs';
import Input from '@/Components/Input';
import Select from '@/Components/Select';
import Image from 'next/image';

const addLadderHandler = (e:any) => {}
const updateLadderHandler = (e:any) => {}

export const AddLadders = () => {

    return (
    
        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={addLadderHandler}>

                    <Input name='name' title='Ladder Name *' required={true} />
                    <Select options={[]} name='gameName' title='Game Name *' required={true} />
                    <Input name='entryFee' title='Entry Fee *' required={true} />
                    <Input name='prize' title='Prize *' required={true} />
                    <Input name='teamSize' title='Team Size *' required={true} />
                    <Input name='totalTeams' title='Total Teams *' required={true} />
                    <Select options={[]} name='status' title='Status *' required={true} />
                    <Input type='date' name='startingDate' title='Starting Date & Time *' required={true} />
                    <Input type='date' name='endingDate' title='Ending Date & Time *' required={true} />

                    <div className="league-photo">
                        <label>Tournament Photo*</label>
                        <div className={dialogStyles.file_input}>
                            <Image src={ images.PHOTO_PLACEHOLDER } alt="..." width={100} height={100} />
                            <input type="file" name="picture" onChange={upload_image_preview} accept="image/*" />
                        </div>
                    </div>

                    <div className={dialogStyles.controls}>
                        <button onClick={()=>{store.dispatch(hideDialog())}} style={{backgroundColor: "gray"}} type="button">Cancel</button>
                        <button style={{backgroundColor: "var(--site-clr)"}} type="submit">Add Ladder</button>
                    </div>

                </form>

            </div>
            
        </div>

    )

}


export const UpdateLadders = () => {

    return (

    <div className={dialogStyles.dialogs}>

        <div className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

            <form method="post" onSubmit={updateLadderHandler}>

                <Input name='name' title='Ladder Name *' required={true} />
                <Select options={[]} name='gameName' title='Game Name *' required={true} />
                <Input name='entryFee' title='Entry Fee *' required={true} />
                <Input name='prize' title='Prize *' required={true} />
                <Input name='teamSize' title='Team Size *' required={true} />
                <Input name='totalTeams' title='Total Teams *' required={true} />
                <Select options={[]} name='status' title='Status *' required={true} />
                <Input type='date' name='startingDate' title='Starting Date & Time *' required={true} />
                <Input type='date' name='endingDate' title='Ending Date & Time *' required={true} />

                <div className="league-photo">
                    <label htmlFor="imageInput">Tournament Photo*</label>
                    <div className={dialogStyles.file_input}>
                        <Image src={ images.PHOTO_PLACEHOLDER } alt="..." width={100} height={100} />
                        <input type="file" name="picture" id="imageInput" accept="image/*" />
                    </div>
                </div>

                <div className={dialogStyles.controls}>
                    <button style={{backgroundColor: "gray"}} type="button">Cancel</button>
                    <button style={{backgroundColor: "var(--site-clr)"}} type="submit">Update Ladder</button>
                </div>

            </form>

        </div>

    </div>
        
    )

}

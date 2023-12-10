import React from 'react'
import dialogStyles from "@/styles/dialogs.module.css";

import images from "@/constants/images";
import store from '@/Redux/store';
import { hideDialog } from '@/Redux/actions/dialogs';
import { upload_image_preview } from "@/utils/general"
import Input from '@/Components/Input';
import Select from '@/Components/Select';
import Image from 'next/image';

const addGameHandler = (e:any) => {}
const updateGameHandler = (e:any) => {}

let dummy_game_types = [
    {"1":"Franchise1"},
    {"2":"Franchise2"},
    {"3":"Franchise3"},
    {"4":"Franchise4"},
]
let dummy_platforms = [
    {"1":"IoS"},
    {"2":"Windows"},
    {"3":"Mac"},
    {"4":"Android"},
]

export const AddGames = () => {

    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={addGameHandler}>

                    <div className={dialogStyles.side_by_side}>
                        <div>
                            <Input name='name' title='Game Name *' required={true} />
                            <Select options={dummy_game_types} name='type' title='Game Type *' required={true} />
                            <Select options={dummy_platforms} name='platform' title='Game Platform' required={true} />
                        </div>
                        <div>
                            <label>Game Photo*</label>
                            <div className={dialogStyles.file_input}>
                                <Image src={ images.PHOTO_PLACEHOLDER } alt="..." width={100} height={100} />
                                <input type="file" name="game_photo" accept="image/*" onChange={upload_image_preview} />
                            </div>
                        </div>
                    </div>


                    <div className={dialogStyles.controls}>
                        <button onClick={()=>{store.dispatch(hideDialog())}} style={{backgroundColor: "gray"}} type="button">Cancel</button>
                        <button style={{backgroundColor: "var(--site-clr)"}} type="submit">Add League</button>
                    </div>

                </form>

            </div>

        </div>

    )

}


export const UpdateGames = () => {

    return (

        <div id='dialogs' className={dialogStyles.dialogs}>
        
            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={updateGameHandler}>

                    <div className={dialogStyles.side_by_side}>
                        <div>
                            <Input name='name' title='Game Name *' required={true} />
                            <Select options={dummy_game_types} name='type' title='Game Type *' required={true} />
                            <Select options={dummy_platforms} name='platform' title='Game Platform' required={true} />
                        </div>
                        <div>
                            <label htmlFor="imageInput">Game Photo*</label>
                            <div className={dialogStyles.file_input}>
                                <Image src={ images.PHOTO_PLACEHOLDER } alt="..." />
                                <input type="file" name="game_photo" accept="image/*" onChange={upload_image_preview} />
                            </div>
                        </div>
                    </div>



                    <div className={dialogStyles.controls}>
                        <button style={{backgroundColor: "gray"}} type="button">Cancel</button>
                        <button style={{backgroundColor: "var(--site-clr)"}} type="submit">Update League</button>
                    </div>

                </form>

            </div>

        </div>
    )

}
import React, { useState } from 'react'
import dialogStyles from "@/styles/dialogs.module.css";
import images from "@/constants/images";
import store from '@/Redux/store';
import { hideDialog } from '@/Redux/actions/dialogs';
import { upload_image_preview } from "@/utils/general"
import { addGameHandler, updateGameHandler } from "@/utils/games"
import Input from '@/Components/Input';
import Select from '@/Components/Select';
import Image from 'next/image';
import { BASE_URL } from '@/constants/backend-routes';



let dummy_game_types = [
    {"Franchise 1":"Franchise 1"},
    {"Franchise 2":"Franchise 2"},
    {"Franchise 3":"Franchise 3"},
    {"Franchise 4":"Franchise 4"},
]
let dummy_platforms = [
    {"IoS":"IoS"},
    {"Windows":"Windows"},
    {"Mac":"Mac"},
    {"Android":"Android"},
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
                                <input type="file" name="picture" accept="image/*" onChange={upload_image_preview} />
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



export const UpdateGames = (props:any) => {
    
    let data = props.data._doc
    const [name, setName] = useState(data.name);
    const [type, setType] = useState(data.type);
    const [platform, setPlatform] = useState(data.platform);
    const [picture, setPicture] = useState(BASE_URL+data.picture);
    const id = data._id


    return (

        <div id='dialogs' className={dialogStyles.dialogs}>
        
            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={updateGameHandler}>

                    <div className={dialogStyles.side_by_side}>
                        <input type="hidden" name="id" value={id} />
                        <div>
                            <Input name='name' value={name} onChnage={(e:any)=>setName(e.target?.value)} title='Game Name *' required={true} />
                            <Select options={dummy_game_types} value={type} onChnage={(e:any)=>setType(e.target?.value)} name='type' title='Game Type *' required={true} />
                            <Select options={dummy_platforms} value={platform} onChnage={(e:any)=>setPlatform(e.target?.value)} name='platform' title='Game Platform' required={true} />
                        </div>
                        <div>
                            <label htmlFor="imageInput">Game Photo*</label>
                            <div className={dialogStyles.file_input}>
                                <Image width={100} height={100} src={ picture?picture:images.PHOTO_PLACEHOLDER } alt="..." />
                                <input type="file" name="picture" accept="image/*" onChange={(e:any)=>{e.imageViewer=setPicture;upload_image_preview(e)}} />
                                <input type="hidden" name="oldPicture" value={picture} />
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
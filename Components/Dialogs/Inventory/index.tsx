import React, { useState } from 'react'
import dialogStyles from "@/styles/dialogs.module.css";

import images from "@/constants/images";
import { upload_image_preview } from "@/utils/general"
import store from '@/Redux/store';
import { hideDialog } from '@/Redux/actions/dialogs';
import Image from 'next/image';
import Input from '@/Components/Input';
import {addInventoryHandler, updateInventoryHandler} from "@/utils/inventory";
import { BASE_URL } from '@/constants/backend-routes';





export const AddInventory = () => {

    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={addInventoryHandler}>

                    <div style={{ width: "40%" }}>
                        <p>Inventory Photo*</p>
                        <div className={dialogStyles.file_input}>
                            <Image src={images.PHOTO_PLACEHOLDER} alt="..." width={100} height={100} />
                            <input type="file" name="picture" onChange={upload_image_preview} required />
                        </div>
                    </div>
                    <div style={{ width: "60%" }}>
                        <Input id='name' name='name' title='Inventory Name *' required={true} />
                    </div>
                    <div className={dialogStyles.controls}>
                        <button onClick={() => { store.dispatch(hideDialog()) }} style={{ backgroundColor: "gray" }} type='button'>Cancel</button>
                        <button style={{ backgroundColor: "var(--site-clr)" }} type="submit">Add Inventory</button>
                    </div>

                </form>

            </div>

        </div>
    )

}



export const UpdateInventory = (props:any) => {

    let inventory = props?.data?._doc;
    const id = inventory._id;
    const [name, setName] = useState(inventory.name);
    const [picture, setPicture] = useState(BASE_URL+inventory.picture);

    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={updateInventoryHandler}>

                    <input type="hidden" name="id" value={id} />

                    <div style={{width:"40%"}}>
                        <p>Inventory Photo*</p>
                        <div className={dialogStyles.file_input}>
                            <Image src={(inventory.picture || picture)?picture : images.PHOTO_PLACEHOLDER} alt="..." width={100} height={100} />
                            <input type="file" name="picture" onChange={(e:any)=>{e.imageViewer=setPicture;upload_image_preview(e)}} />
                        </div>
                        <input type="hidden" name="oldPicture" value={picture} />
                    </div>
                    <div style={{ width: "60%" }}>
                        <Input name='name' title='Inventory Name *' value={name} onChnage={(e:any)=>setName(e.target?.value)} required={true} />
                    </div>

                    <div className={dialogStyles.controls}>
                        <button onClick={() => { store.dispatch(hideDialog()) }} style={{ backgroundColor: "gray" }} type='button'>Cancel</button>
                        <button style={{ backgroundColor: "var(--site-clr)" }} type="submit">Update Inventory</button>
                    </div>

                </form>

            </div>

        </div>
    )

}

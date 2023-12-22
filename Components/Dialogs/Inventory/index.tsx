import React from 'react'
import dialogStyles from "@/styles/dialogs.module.css";

import images from "@/constants/images";
import { upload_image_preview } from "@/utils/general"
import store from '@/Redux/store';
import { hideDialog } from '@/Redux/actions/dialogs';
import Image from 'next/image';
import Input from '@/Components/Input';

const addInventoryHandler = (e: any) => { }
const updateInventoryHandler = (e: any) => { }

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

    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={updateInventoryHandler}>

                    <div style={{width:"40%"}}>
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
                        <button style={{ backgroundColor: "var(--site-clr)" }} type="submit">Update Inventory</button>
                    </div>

                </form>

            </div>

        </div>
    )

}

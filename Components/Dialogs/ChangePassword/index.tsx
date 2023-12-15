import React, { useEffect } from 'react'
import dialogStyles from "@/styles/dialogs.module.css";

import { changePasswordHandler } from "@/utils/auth";
import store from '@/Redux/store';
import { hideDialog } from '@/Redux/actions/dialogs';
import Input from '@/Components/Input';
import { faKey } from '@fortawesome/free-solid-svg-icons';

export const ChangePassword = () => {

    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={changePasswordHandler} >

                    <Input id='oldPass' type='password' title='Old Password *' icon={faKey} name='old_password' required={true} />
                    <Input id='newPass' type='password' title='New Password *' icon={faKey} name='new_password' required={true} />
                    <Input id='confirmPass' type='password' title='Confirm Password *' icon={faKey} name='confirm_password' required={true} />

                    <div className={dialogStyles.controls}>
                        <button onClick={() => { store.dispatch(hideDialog()) }} style={{ backgroundColor: "#4A4A4A" }} type="button">
                            Cancel
                        </button>
                        <button style={{ backgroundColor: "var(--site-clr)" }} type="submit">UPDATE PASSWORD</button>
                    </div>

                </form>

            </div>

        </div>

    )
}

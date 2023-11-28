import React, { useEffect, useState } from 'react'
import styles from "@/styles/auth.module.css";
import Link from 'next/link';

import { changePasswordAtLoginHandler } from "../../utils/auth";
import { ROUTE_SIGNIN } from "../../constants/constants";
import { useRouter } from 'next/navigation';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import store from '@/Redux/store';
import { isLoading } from '@/Redux/actions/loader';
import Input from '@/Components/Input';
import { navigateTo } from '@/utils/general';


const ChangePasswordAtLogin = () => {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let session:any = localStorage.getItem("reset-data");
    session = session ? JSON.parse(session): null;
    if(!session || !session?.email || !session?.isVerified) router.replace(ROUTE_SIGNIN);
    store.dispatch(isLoading(false));
  }, [router]);


  return (

    <>

      <title>Change Your Password - OBG</title>

      <div className={styles.left}>

        <div className={styles.top}>
          <h1 style={{color: "black", fontSize: "30px"}}>ONLINE BATTLEGROUND</h1>
          <p style={{color: "lightgray", fontSize: "25px"}}>Best user experience of online gaming</p>
        </div>
        
        <div className={styles.bottom}>
          <h1 style={{color: "white", fontSize: "25px"}}>Play & Compete</h1>
          <p style={{color: "white", fontSize: "15px"}}>Create an account today to compete against different opponents</p>
        </div>

      </div>

      <div className={styles.right}>

        <div className={styles.navigation}>
          <h2>Change Password</h2>
          <p>Please fill in the email that you used to register. You will be sent a code with which you can change your password.</p>
        </div>

        <form className={styles.auth_form} method="post" onSubmit={ changePasswordAtLoginHandler }>

          <Input type='password' title='New Password' name='new_password' icon={faKey} required={true} />
          <Input type='password' title='Confirm Password' name='confirm_password' icon={faKey} required={true} />

          <button type="submit">Change Password</button>
          <Link href="#" onClick={(e)=>{navigateTo(e,ROUTE_SIGNIN)}} className={styles.back_to_login}>Back to Login</Link>

        </form>

      </div>

    </>

  )
}


export default ChangePasswordAtLogin;
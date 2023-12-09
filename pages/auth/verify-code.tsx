import React, { useEffect, useState } from 'react'
import styles from "@/styles/auth.module.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ROUTE_SIGNIN } from "../../constants/routes";
import { resendCode, verifyCode } from '../../utils/auth';
import store from '@/Redux/store';
import { isLoading } from '@/Redux/actions/loader';
import Input from '@/Components/Input';
import { navigateTo } from '@/utils/general';


const VerificationCode = () => {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let session:any = localStorage.getItem("reset-data");
    session = session ? JSON.parse(session): null;
    if(!session || !session?.email) router.replace(ROUTE_SIGNIN);
    store.dispatch(isLoading(false));
  }, [router]);


  return (

    <>

      <title>Verification Code - OBG</title>

      <div className={styles.left}>

            <div className={styles.top}>
                <h1 style={{color: "black", fontSize: "50px", fontFamily:"bebas-neue"}}>ONLINE<br/>BATTLEGROUND</h1>
                <p style={{color: "lightgray", fontSize: "28px"}}>Best user experience of online gaming</p>
            </div>
            
            <div className={styles.bottom}>
                <h1 style={{color: "white", fontSize: "38px"}}>Play & Compete</h1>
                <p style={{color: "white", fontSize: "18px"}}>Create an account today to compete against different opponents</p>
            </div>

        </div>

      <div className={styles.right}>

        <div className={styles.navigation}>
          <h2 style={{fontSize:"16px"}}>Verify Email</h2>
          <p style={{textAlign:"center",fontSize:"14px",width:"70%",marginTop:"60px"}}>Enter code sent byt he E-mail to reset your password</p>
        </div>

        <form className={styles.auth_form} method="post" onSubmit={ verifyCode }>

          <Input name='code' title='Enter Code' required={true} />
          
          <button type="submit">Verify Code</button>
          <p className={styles.receive_mail}>Didn't received email? <Link className={styles.back_to_login} href="#" onClick={ resendCode }>Send it again</Link></p>
          <Link className={styles.back_to_login} onClick={(e)=>{navigateTo(e,ROUTE_SIGNIN)}} href="#">Back to Login</Link>

        </form>

      </div>
    </>

  )

}

export default VerificationCode;
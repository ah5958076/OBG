import React, { useEffect } from "react"
import styles from "@/styles/auth.module.css";
import Link from "next/link";
import { ROUTE_SIGNIN } from "@/constants/routes";
import { forgotPassword } from "@/utils/auth";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import store from "@/Redux/store";
import { isLoading } from "@/Redux/actions/loader";
import Input from "@/Components/Input";
import { navigateTo } from "@/utils/general";


const Auth = () => {
    
    useEffect(()=>{
        store.dispatch(isLoading(false));
        localStorage.removeItem("reset-data");
    });

    return (
    <>
        <title>Forgot Password - OBG</title>

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
                <h2 style={{fontSize:"18px"}}>Reset Password</h2>
                <p style={{marginTop:"60px",width:"80%",fontSize:"14px", textAlign:"center"}}>Please fill in the email that you used to register. You will be sent an email with instructions on how to reset your password.</p>
            </div>

            <form className={styles.auth_form} method="post" onSubmit={ forgotPassword }>

                <Input type="email" name="email" title="Email" icon={faEnvelope} required={true} />

                <button type="submit">Send email</button>
                <Link href="#" onClick={(e)=>{navigateTo(e,ROUTE_SIGNIN)}} className={styles.back_to_login}>Back to login</Link>
            </form>

        </div>
    </>
    )
}

export default Auth;
import React, { useEffect } from "react"
import styles from "@/styles/auth.module.css";

import Link from "next/link";
import { ROUTE_FORGOT_PASSWORD, ROUTE_SIGNIN, ROUTE_SIGNUP } from '@/constants/routes';
import { loginHandler } from "@/utils/auth";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import store from "@/Redux/store";
import { isLoading } from "@/Redux/actions/loader";
import { navigateTo } from "@/utils/general";
import Input from "@/Components/Input"; 



const Login = () => {

    useEffect(() => {
        store.dispatch(isLoading(false));
        localStorage.removeItem("reset-data");
    });
    

    return (
    <>

        <title>Login - OBG</title>

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
                <Link href="#" onClick={(e)=>{navigateTo(e, ROUTE_SIGNIN)}} className={styles.active}>Sign in</Link>
                <Link href="#" onClick={(e)=>{navigateTo(e, ROUTE_SIGNUP)}}>Sign up</Link>
            </div>

            <form className={styles.auth_form} method="post" onSubmit={ loginHandler }>

                <Input type="email" name="email" icon={faEnvelope} title="Email" required={true} />
                <Input type="password" name="password" icon={faLock} title="Password" required={true} />

                <Link href="#" onClick={(e)=>{navigateTo(e,ROUTE_FORGOT_PASSWORD)}} className={styles.forgot_password}>Forgot Password?</Link>
                <button type="submit">Sign in</button>
                <p className={styles.new_account}>
                    <span>New on our Platform?</span>
                    <Link onClick={(e)=>{navigateTo(e, ROUTE_SIGNUP)}} href="#">Create an account</Link>
                </p>

            </form>
            
        </div>
    </>
    )
}

export default Login;
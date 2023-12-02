import React, { useEffect } from "react"
import styles from "@/styles/auth.module.css"
import Link from "next/link";
import { ROUTE_SIGNIN, ROUTE_SIGNUP } from "@/constants/routes";
import { signupHandler } from "@/utils/auth";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import store from "@/Redux/store";
import { isLoading } from "@/Redux/actions/loader";
import Input from "@/Components/Input";
import { navigateTo } from "@/utils/general";


const Auth = () => {

    useEffect(() => {
        store.dispatch(isLoading(false));
        localStorage.removeItem("reset-data");
    });


    return (
    <>
        
        <title>Signup - OBG</title>

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
                <Link href="#" onClick={(e)=>{navigateTo(e, ROUTE_SIGNIN)}}>Sign in</Link>
                <Link href="#" onClick={(e)=>{navigateTo(e, ROUTE_SIGNUP)}} className={styles.active}>Sign up</Link>
            </div>

            <form className={styles.aut_form} method="post" onSubmit={ signupHandler }>

                <Input name="name" title="Full Name" required={true} icon={faUser} />
                <Input name="username" title="Username" required={true} icon={faUser} />
                <Input name="email" title="Email" required={true} icon={faEnvelope} />
                <Input type="password" name="new_password" title="New Password" required={true} icon={faLock} />
                <Input type="password" name="confirm_password" title="Confirm Password" required={true} icon={faLock} />

                <button type="submit">Sign up</button>
                <p className={styles.new_account}>
                    <span>Already have an account?</span>
                    <Link onClick={(e)=>{navigateTo(e, ROUTE_SIGNIN)}} href="#">Sign in instead</Link>
                </p>

            </form>

        </div>
    </>
    )
}

export default Auth;
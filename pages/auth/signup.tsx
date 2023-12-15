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
                    <h1 style={{ marginTop: "37px", width: "231px", lineHeight: "60px", color: "#1A1A1A", opacity: "1", fontSize: "50px", fontStyle: "normal", fontFamily: "bebas-neue", fontWeight: '300' }}>ONLINE
                        BATTLEGROUND</h1>
                    <div style={{ marginTop: "37px", width: "307px", height: "67px", color: "#FFFFFF", opacity: "1", fontWeight: "300", fontSize: "30px", fontFamily: "roboto-light" }}>
                        Best user experience of online gaming
                    </div>
                </div>

                <div className={styles.bottom}>
                    <h1 style={{ color: "white", fontSize: "38px", fontFamily: "roboto", opacity: '1', fontStyle: "normal", fontWeight: "300" }}>Play & Compete</h1>
                    <p style={{ marginTop: "20px", color: "#fff", fontSize: "18px", fontFamily: "roboto-light", fontWeight: "100" }}>Create an account today to compete against different opponents</p>
                </div>

            </div >

            <div className={styles.right}>

                <div className={`${styles.navigation}  ${styles.robotoLight}`} style={{ marginTop: "50px" }}>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_SIGNIN) }}>Sign in</Link> &nbsp; &nbsp;
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_SIGNUP) }} className={styles.active}>Sign up</Link>
                </div>

                <form className={styles.aut_form} method="post" onSubmit={signupHandler}>

                    <Input id='name' name="name" title="Full Name" required={true} icon={faUser} />
                    <Input id='username' name="username" title="Username" required={true} icon={faUser} />
                    <Input id='email' name="email" title="Email" required={true} icon={faEnvelope} />
                    <Input id='password' type="password" name="new_password" title="Password" required={true} icon={faLock} />

                    <button style={{ fontWeight: "normal" }} type="submit">Sign up</button>
                    <p className={`${styles.new_account} ${styles.robotoLight}`}>
                        <span>Already have an account?</span>&nbsp; &nbsp;
                        <Link style={{ color: '#FFD4A0' }} onClick={(e) => { navigateTo(e, ROUTE_SIGNIN) }} href="#">Sign in instead</Link>
                    </p>

                </form>

            </div >
        </>
    )
}

export default Auth;
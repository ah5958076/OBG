import React, { useEffect, useState } from "react"
import styles from "@/styles/auth.module.css";
import { toast } from "react-toastify";
import Link from "next/link";
import { ROUTE_ADMIN_DASHBOARD, ROUTE_FORGOT_PASSWORD, ROUTE_SIGNIN, ROUTE_SIGNUP, ROUTE_USER_DASHBOARD } from '@/constants/routes';
import { loginHandler } from "@/utils/auth";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import store from "@/Redux/store";
import { isLoading } from "@/Redux/actions/loader";
import { getRequest, navigateTo } from "@/utils/general";
import Input from "@/Components/Input";
import { VERIFY_TOKEN_ROUTE } from "@/constants/backend-routes";



const Login = () => {
    useEffect(() => {
        store.dispatch(isLoading(true));
        localStorage.removeItem("reset-data");
        getRequest(VERIFY_TOKEN_ROUTE).then((data: any) => {
            console.log("login data", data);
            store.dispatch(isLoading(false));
            if (data.auth?.auth) {
                if (data.auth?.role === "Admin")
                    navigateTo(null, ROUTE_ADMIN_DASHBOARD);
                else if (data.auth?.role === "User")
                    navigateTo(null, ROUTE_USER_DASHBOARD);
            }
            else {
                localStorage.removeItem("token")
            }
        }).catch((e) => {
            console.log(e);
            store.dispatch(isLoading(false));
            localStorage.removeItem("token");
        });

    }, []);
    return (
        <>
            <title>Login - OBG</title>
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

                <div className={`${styles.navigation}  `} style={{ marginTop: "70px" }}>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_SIGNIN) }} className={styles.active}>Sign in</Link> &nbsp; &nbsp;
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_SIGNUP) }} >Sign up</Link>
                </div>

                <form className={styles.auth_form} method="post" onSubmit={loginHandler}>

                    <Input id='email' type="email" name="email" icon={faEnvelope} title="Email" required={true} />
                    <Input id='password' type="password" name="password" icon={faLock} title="Password" required={true} />

                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_FORGOT_PASSWORD) }} className={styles.forgot_password}>Forgot Password?</Link>
                    <button style={{ fontWeight: "normal" }} type="submit">Sign in</button>
                    <p className={styles.new_account}>
                        <span>New on our Platform?</span> &nbsp;
                        <Link onClick={(e) => { navigateTo(e, ROUTE_SIGNUP) }} href="#">Create an account</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Login;
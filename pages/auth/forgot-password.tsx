import React, { useEffect, useState } from "react"
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
    const [inputData, setInputData] = useState<any>('');
    const handleInputDataChange = (data: any) => {
        setInputData(data);
    };
    useEffect(() => {
        store.dispatch(isLoading(false));
        localStorage.removeItem("reset-data");
    });
    return (
        <>
            <title>Forgot Password - OBG</title>

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
                <div className={styles.navigation}>
                    <h2>Reset Password</h2>
                    <p className={styles.resetText}>Please fill in the email that you used to register. You will be sent an email with instructions on how to reset your password.</p>
                </div>
                <form className={styles.auth_form} method="post" onSubmit={forgotPassword}>
                    <Input id='email' type="email" name="email" title="Email" icon={faEnvelope} required={true}  />
                    <button style={{ marginTop: '20px', borderRadius: "0" }} type="submit">Send email</button>
                    <p className={`${styles.reEmail}`}>
                        <span>Didn't receieved email?</span>&nbsp; &nbsp;
                        {/* error over here */}
                        <a style={{ color: '#FFD4A0' }} >Send it again</a>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Auth;
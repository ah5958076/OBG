import React from 'react'
import styles from "./userFooter.module.css"
import Link from 'next/link'

function UserFooter() {
    return (
        
        <div className={styles.footer}>

            <div className={styles.left}>
                <h2> ONLINE<br/>BATTLEGROUND</h2>
                <span>Online BattleGround &copy; 2023</span>
            </div>

            <div className={styles.right}>
                <Link href="#">CONTACT US</Link>
                <Link href="#">TERMS OF SERVICE</Link>
                <Link href="#">PRIVACY POLICY</Link>
            </div>

        </div>

    )
}

export default UserFooter
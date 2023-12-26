import React from 'react'
import styles from "./userFooter.module.css"
import Link from 'next/link'
import { navigateTo } from '@/utils/general'
import { ROUTE_SIGNIN } from '@/constants/routes'

function UserFooter() {
    return (
        
        <div className={styles.footer}>

            <div className={styles.left}>
                <h2> ONLINE<br/>BATTLEGROUND</h2>
                <span>Online BattleGround &copy; 2023</span>
            </div>

            <div className={styles.right}>
                <Link href="#" onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)}>CONTACT US</Link>
                <Link href="#" onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)}>TERMS OF SERVICE</Link>
                <Link href="#" onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)}>PRIVACY POLICY</Link>
            </div>

        </div>

    )
}

export default UserFooter
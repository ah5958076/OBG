import React, {useEffect, useRef, useState} from 'react'
import styles from "./userNavbar.module.css";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faClose, faRightFromBracket, faSearch } from '@fortawesome/free-solid-svg-icons';
import { TYPE_USER_NAVBAR } from '@/constants/interfaces';
import { ROUTE_SIGNIN } from '@/constants/routes';



function UserNavBar({auth}:TYPE_USER_NAVBAR) {
    
    const navDropDownRef:any = useRef();
    const navOpenDropDownRef:any = useRef();

    const [isOpen, setIsOpen] = useState(false);
    
    const manageSubMenuClosing = (e:any) => {
        if(!navDropDownRef?.current?.contains(e.target) && !navOpenDropDownRef?.current?.contains(e.target))
            setIsOpen(false);
    }

    useEffect(()=>{
        window.addEventListener("click", manageSubMenuClosing);
    });    

    return (
        
        <>
        
            <nav className={`${styles.navbar} ${auth?styles.login:""}`}>
                <h1>ONLINE<br/>BATTLEGROUND</h1>
                <div className={styles.links}>
                    <Link className={`${styles.before_login} ${styles.active}`} href="#">Home</Link>
                    <Link href="./Games.html">Games</Link>
                    <Link href="./Grand Prix1.html">Grand Prix</Link>
                    <Link href="./Rules General.html">Rules</Link>
                    <div className={`${styles.search_bar} ${styles.after_login}`}>
                        <FontAwesomeIcon icon={faSearch} />
                        <input type="text" name="search" placeholder='Search...' />
                    </div>
                    <Link className={styles.after_login} href="#"><FontAwesomeIcon icon={faBell} /></Link>
                    <Link className={styles.after_login} href="#"><FontAwesomeIcon icon={faRightFromBracket} /></Link>
                    <Link href="#" className={`${styles.after_login} site_clr`}>Support</Link>
                    <Link href="#" className={`${styles.after_login} ${styles.link_btn}`}>Tour</Link>
                    <Link href={ROUTE_SIGNIN} className={`${styles.before_login} ${styles.link_btn}`}>Login</Link>
                </div>
            </nav>

            <nav className={`${styles.navbar} ${styles.small} ${auth?styles.login:""}`}>
                <h1>ONLINE<br/>BATTLEGROUND</h1>

                <div className={styles.menus}>
                    <button className={`${styles.nav_open_btn} ${isOpen?styles.show:""}`} onClick={(e:any)=>{setIsOpen(!isOpen)}} ref={navOpenDropDownRef}>
                        <FontAwesomeIcon icon={faBars}/>
                    </button>
                
                    <Link className={styles.after_login} href="#"><FontAwesomeIcon icon={faRightFromBracket} /></Link>
                    <Link className={styles.after_login} href="#"><FontAwesomeIcon icon={faBell} /></Link>

                    <div className={`${styles.after_login} ${styles.search_bar}`}>
                        <span onClick={(e:any)=>{e.currentTarget.parentElement?.classList.toggle(styles.show)}}>
                            <FontAwesomeIcon className={styles.fa_search} icon={faSearch} />
                            <FontAwesomeIcon className={styles.fa_close} icon={faClose} />
                        </span>
                        <input type="text" name="search" placeholder='Search...' />
                    </div>
                </div>
                
                <div className={styles.links} ref={navDropDownRef}>
                    <Link className={`${styles.before_login} ${styles.active}`} href="#">Home</Link>
                    <Link href="./Games.html">Games</Link>
                    <Link href="./Grand Prix1.html">Grand Prix</Link>
                    <Link href="./Rules General.html">Rules</Link>
                    <Link href="#" className={`${styles.after_login} site_clr`}>Support</Link>
                    <Link href="#" className={`${styles.after_login} ${styles.link_btn}`}>Tour</Link>
                    <Link href={ROUTE_SIGNIN} className={`${styles.before_login} ${styles.link_btn}`}>Login</Link>
                </div>
            </nav>
        
        </>

    )
}

export default UserNavBar
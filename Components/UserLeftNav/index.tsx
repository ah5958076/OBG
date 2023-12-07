import React, {useState, useRef, useEffect} from 'react'
import styles from "./userLeftNav.module.css";
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faBuildingFlag, faChessQueen, faMoneyCheckDollar, faPeopleGroup, faPeoplePulling, faUser, faWarehouse } from '@fortawesome/free-solid-svg-icons';



function UserLeftNav() {

    const [isOpen, setIsOpen] = useState(false)
    const balanceRef:any = useRef();
    const openBalanceRef:any = useRef();


    const closeBalanceViewer = (e:any)=>{
        if(!balanceRef?.current?.contains(e.target) && !openBalanceRef?.current?.contains(e.target))
            setIsOpen(false);
    }

    useEffect(()=>{
        window.addEventListener("click", closeBalanceViewer)
    })


    return (
        
        <nav className={styles.navbar}>

                <div className={styles.profile}>
                    <Image title='Amir Hamza' src="/user.jpg" alt="..." width={40} height={40} style={{borderRadius:"50%"}} />
                    <p>Amir Hamza</p>
                </div>
                
                <div className={styles.items}>
                    <Link href="#">
                        <FontAwesomeIcon icon={faChessQueen} />
                        <span>My Matches</span>
                    </Link>
                    <Link href="#">
                        <FontAwesomeIcon icon={faPeopleGroup} />
                        <span>My Teams</span>
                    </Link>
                    <Link href="#">
                        <FontAwesomeIcon icon={faPeoplePulling}/>
                        <span>Invites</span>
                    </Link>
                    <Link href="#" className={styles.active}>
                        <FontAwesomeIcon icon={faUser}/>
                        <span>Profile</span>
                    </Link>
                    <Link href="#">
                        <FontAwesomeIcon icon={faBuildingFlag}/>
                        <span>Fantasy League</span>
                    </Link>
                    <Link href="#">
                        <FontAwesomeIcon icon={faMoneyCheckDollar} />
                        <span>Transactions</span>
                    </Link>
                    <Link href="#">
                        <FontAwesomeIcon icon={faWarehouse} />
                        <span>Inventory</span>
                    </Link>
                </div>
            
                <div className={`${styles.balance} ${isOpen?styles.show:""}`}>
                    <Link ref={openBalanceRef} href="#" className={`${styles.icon} ${isOpen?styles.active:""}`} onClick={(e)=>{e.preventDefault();setIsOpen(!isOpen)}}>
                        <FontAwesomeIcon icon={faBuildingColumns} />
                    </Link>
                    <div ref={balanceRef}>
                        <p>Platform Credits</p>
                        <h1>$300</h1>
                        <Link href="#">Withdraw</Link>
                        <Link href="#">Add</Link>
                    </div>
                </div>
            
            </nav>

    )
}

export default UserLeftNav
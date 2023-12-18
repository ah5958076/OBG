import React, { useEffect, useRef, useState } from 'react'
import styles from "./navbar.module.css";
import Link from 'next/link';
import images from "@/constants/images";
import {
    ROUTE_ADMIN_DASHBOARD, ROUTE_ADMIN_FANTASY_LEAGUES, ROUTE_ADMIN_GAMES, ROUTE_ADMIN_GP_LEAGUES, ROUTE_ADMIN_GP_LEAGUE_RESULTS, ROUTE_ADMIN_GRAND_PRIX, ROUTE_ADMIN_INVENTORY, ROUTE_ADMIN_LADDERS, ROUTE_ADMIN_MATCH_RESULTS, ROUTE_ADMIN_TOTAL_WAR_LADDER_RESULTS, ROUTE_ADMIN_TOURNAMENTS, ROUTE_ADMIN_TOURNAMENT_RESULTS, ROUTE_ADMIN_USERS
} from '../../constants/routes';
import { DIALOG_CHANGE_PASSWORD, DIALOG_LOGOUT } from "@/constants/dialog-names";
import store from '../../Redux/store';
import { showDialog } from '../../Redux/actions/dialogs';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBars } from "@fortawesome/free-solid-svg-icons"
import { navigateTo } from '@/utils/general';


const Navbar = (props: any) => {

    const [showSmallNav, isShowingSmallNav] = useState(false);
    const [showResultsMenu, isShowingResultsMenu] = useState(false);
    const [showUserMenu, isShowingUserMenu] = useState(false);

    const navRef: any = useRef();
    const navBtnRef: any = useRef();
    const userSubMenuButton: any = useRef();
    const userSubMenu: any = useRef();
    const resultSubMenuButton: any = useRef();
    const resultSubMenu: any = useRef();

    const smallnav_userSubMenuButton: any = useRef();
    const smallnav_userSubMenu: any = useRef();
    const smallnav_resultSubMenuButton: any = useRef();
    const smallnav_resultSubMenu: any = useRef();

    const manageSubMenuClosing = (e: any) => {
        if (navRef.current && !navRef.current.contains(e.target) && !navBtnRef.current.contains(e.target))
            isShowingSmallNav(false);
        if (resultSubMenu.current && !resultSubMenu.current.contains(e.target) && !resultSubMenuButton.current.contains(e.target) && !smallnav_resultSubMenuButton.current.contains(e.target) && !smallnav_resultSubMenu.current.contains(e.target))
            isShowingResultsMenu(false);
        if (userSubMenu.current && !userSubMenu.current.contains(e.target) && !userSubMenuButton.current.contains(e.target) && !smallnav_userSubMenuButton.current.contains(e.target) && !smallnav_userSubMenu.current.contains(e.target))
            isShowingUserMenu(false);
    }

    useEffect(() => {
        window.addEventListener("click", manageSubMenuClosing);
    });

    return (

        <>

            <nav className={styles.navbar}>
                <h1>ONLINE<br />BATTLEGROUND</h1>

                <div>

                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_DASHBOARD) }} className={props.index === 0 ? styles.active : ""}>
                        Dashboard
                    </Link>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_GRAND_PRIX) }} className={props.index === 1 ? styles.active : ""}>
                        Grand Prix
                    </Link>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_GP_LEAGUES) }} className={props.index === 2 ? styles.active : ""}>
                        GP Leagues
                    </Link>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_FANTASY_LEAGUES) }} className={props.index === 3 ? styles.active : ""}>
                        Fantasy Leagues
                    </Link>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_USERS) }} className={props.index === 4 ? styles.active : ""}>
                        Users
                    </Link>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_GAMES) }} className={props.index === 5 ? styles.active : ""}>
                        Games
                    </Link>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_TOURNAMENTS) }} className={props.index === 6 ? styles.active : ""}>
                        Tournaments
                    </Link>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_LADDERS) }} className={props.index === 7 ? styles.active : ""}>
                        Ladders
                    </Link>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_INVENTORY) }} className={props.index === 8 ? styles.active : ""}>
                        Inventory
                    </Link>


                    <div onClick={() => { isShowingResultsMenu(!showResultsMenu); isShowingUserMenu(false) }} className={`${(props.index >= 9 && props.index <= 12) ? styles.active : ""} ${showResultsMenu ? styles.show : ""}`} ref={resultSubMenuButton}>
                        <span style={{ fontSize: "16px" }}>Results</span>
                        <span><FontAwesomeIcon icon={faAngleDown} style={{ marginTop: '8px' }} /></span>

                        <div className={styles.sub_menu} ref={resultSubMenu}>
                            <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_TOURNAMENT_RESULTS) }} className={props.index === 9 ? styles.active : ""}>
                                Tournament Results
                            </Link>
                            <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_TOTAL_WAR_LADDER_RESULTS) }} className={props.index === 10 ? styles.active : ""}>
                                Total War Ladder Results
                            </Link>
                            <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_MATCH_RESULTS) }} className={props.index === 11 ? styles.active : ""}>
                                Matches Results
                            </Link>
                            <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_GP_LEAGUE_RESULTS) }} className={props.index === 12 ? styles.active : ""}>
                                GP League Results
                            </Link>
                        </div>
                    </div>

                    <div onClick={() => { isShowingUserMenu(!showUserMenu); isShowingResultsMenu(false) }} className={showUserMenu ? styles.show : ""} ref={userSubMenuButton}>
                        <Image src={images.USER} alt="..." className={styles.profile_pic} width={40} height={40} />
                        <FontAwesomeIcon icon={faAngleDown} />

                        <div className={styles.sub_menu} ref={userSubMenu}>
                            <Link href="#" onClick={() => { store.dispatch(showDialog(DIALOG_CHANGE_PASSWORD)) }}>
                                Change Password
                            </Link>
                            <Link href='#' onClick={() => { store.dispatch(showDialog(DIALOG_LOGOUT)) }}>
                                logout
                            </Link>
                        </div>
                    </div>
                </div>

            </nav>

            <nav className={styles.nav_small}>
                <h1>ONLINE<br />BATTLEGROUND</h1>

                <button ref={navBtnRef} className={`${styles.nav_open_btn} ${showSmallNav ? styles.show : ""}`} onClick={() => { isShowingSmallNav(!showSmallNav) }}>
                    <FontAwesomeIcon icon={faBars} />
                </button>

                <div ref={navRef} className={styles.items}>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_DASHBOARD) }} className={props.index === 0 ? styles.active : ""}>
                        Dashboard
                    </Link>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_GRAND_PRIX) }} className={props.index === 1 ? styles.active : ""}>
                        Grand Prix
                    </Link>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_GP_LEAGUES) }} className={props.index === 2 ? styles.active : ""}>
                        GP Leagues
                    </Link>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_FANTASY_LEAGUES) }} className={props.index === 3 ? styles.active : ""}>
                        Fantasy Leagues
                    </Link>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_USERS) }} className={props.index === 4 ? styles.active : ""}>
                        Users
                    </Link>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_GAMES) }} className={props.index === 5 ? styles.active : ""}>
                        Games
                    </Link>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_TOURNAMENTS) }} className={props.index === 6 ? styles.active : ""}>
                        Tournaments
                    </Link>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_LADDERS) }} className={props.index === 7 ? styles.active : ""}>
                        Ladders
                    </Link>
                    <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_INVENTORY) }} className={props.index === 8 ? styles.active : ""}>
                        Inventory
                    </Link>

                    <div onClick={() => { isShowingResultsMenu(!showResultsMenu); isShowingUserMenu(false) }} className={` ${(props.index >= 9 && props.index <= 12) ? styles.active : ""}`} ref={smallnav_resultSubMenuButton}>
                        <span>Results</span>
                        <span><FontAwesomeIcon style={{ marginLeft: "5px" }} icon={faAngleDown} /></span>

                        <div className={`${styles.sub_menu} ${showResultsMenu ? styles.show : ""}`} ref={smallnav_resultSubMenu}>
                            <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_TOURNAMENT_RESULTS) }} className={props.index === 9 ? styles.active : ""}>
                                Tournament Results
                            </Link>
                            <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_TOTAL_WAR_LADDER_RESULTS) }} className={props.index === 10 ? styles.active : ""}>
                                Total War Ladder Results
                            </Link>
                            <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_MATCH_RESULTS) }} className={props.index === 11 ? styles.active : ""}>
                                Matches Results
                            </Link>
                            <Link href="#" onClick={(e) => { navigateTo(e, ROUTE_ADMIN_GP_LEAGUE_RESULTS) }} className={props.index === 12 ? styles.active : ""}>
                                GP League Results
                            </Link>
                        </div>
                    </div>

                    <div className='flex items-center ' onClick={() => { isShowingUserMenu(!showUserMenu); isShowingResultsMenu(false) }} ref={smallnav_userSubMenuButton}>
                        <Image src={images.USER} alt='...' className={`{styles.profile_pic} mr-3`} width={40} height={40} />
                        <FontAwesomeIcon icon={faAngleDown} />

                        <div className={`${styles.sub_menu} ${showUserMenu ? styles.show : ""}`} ref={smallnav_userSubMenu}>
                            <Link href="#" onClick={() => { store.dispatch(showDialog(DIALOG_CHANGE_PASSWORD)); isShowingSmallNav(false) }}>
                                Change Password
                            </Link>
                            <Link href="#" onClick={() => { store.dispatch(showDialog(DIALOG_LOGOUT)); isShowingSmallNav(false) }}>
                                logout
                            </Link>
                        </div>
                    </div>

                </div>

            </nav>

        </>

    )
}

export default Navbar;
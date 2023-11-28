import React, { useRef, useState } from 'react'
import "./navbar.css"
import Link from 'next/link';

import IMAGE_USER_PLACEHOLDER from "../../public/user.jpg";

import { 
    DIALOG_CHANGE_PASSWORD, DIALOG_LOGOUT, ROUTE_ADMIN_DASHBOARD, ROUTE_ADMIN_FANTASY_LEAGUES, ROUTE_ADMIN_GAMES, ROUTE_ADMIN_GP_LEAGUES, ROUTE_ADMIN_GP_LEAGUE_RESULTS, ROUTE_ADMIN_GRAND_PRIX, ROUTE_ADMIN_INVENTORY, ROUTE_ADMIN_LADDERS, ROUTE_ADMIN_MATCH_RESULTS, ROUTE_ADMIN_TOTAL_WAR_LADDER_RESULTS, ROUTE_ADMIN_TOURNAMENTS, ROUTE_ADMIN_TOURNAMENT_RESULTS, ROUTE_ADMIN_USERS
} from '../../constants/constants';
import store from '../../Redux/store';
import { showDialog } from '../../Redux/actions/dialogs';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons"


const Navbar = (props:any) => {
    
    const [showResultsMenu, isShowingResultsMenu] = useState(false);
    const [showUserMenu, isShowingUserMenu]=useState(false);
    const [showSmallNav, isShowingSmallNav] = useState(false);


    const navRef:any = useRef();
    const navBtnRef:any = useRef();
    window.addEventListener("click", (e) => {
        if(navRef.current && !navRef.current.contains(e.target) && !navBtnRef.current.contains(e.target))
            isShowingSmallNav(false);
    })

    return (
    
        <>

            <nav>
                <h1>ONLINE<br />BATTLEGROUND</h1>

                <div>
                    <Link href={ ROUTE_ADMIN_DASHBOARD } className={props.index===0?"active":""}>Dashboard</Link>
                    <Link href={ ROUTE_ADMIN_GRAND_PRIX } className={props.index===1?"active":""}>Grand Prix</Link>
                    <Link href={ ROUTE_ADMIN_GP_LEAGUES } className={props.index===2?"active":""}>GP Leagues</Link>
                    <Link href={ ROUTE_ADMIN_FANTASY_LEAGUES } className={props.index===3?"active":""}>Fantasy Leagues</Link>
                    <Link href={ ROUTE_ADMIN_USERS } className={props.index===4?"active":""}>Users</Link>
                    <Link href={ ROUTE_ADMIN_GAMES } className={props.index===5?"active":""}>Games</Link>
                    <Link href={ ROUTE_ADMIN_TOURNAMENTS } className={props.index===6?"active":""}>Tournaments</Link>
                    <Link href={ ROUTE_ADMIN_LADDERS } className={props.index===7?"active":""}>Ladders</Link>
                    <Link href={ ROUTE_ADMIN_INVENTORY } className={props.index===8?"active":""}>Inventory</Link>

                    <div onClick={() => {isShowingResultsMenu(!showResultsMenu);isShowingUserMenu(false)}} className={`${(props.index>=9 && props.index<=12)?"active":""} ${showResultsMenu?"show":""}`}>
                        <span>Results</span>
                        <span><i className="fa-solid fa-angle-down"></i></span>

                        <div className="sub-menu">
                            <Link href={ ROUTE_ADMIN_TOURNAMENT_RESULTS } className={props.index===9?"active":""}>Tournament Results</Link>
                            <Link href={ ROUTE_ADMIN_TOTAL_WAR_LADDER_RESULTS } className={props.index===10?"active":""}>Total War Ladder Results</Link>
                            <Link href={ ROUTE_ADMIN_MATCH_RESULTS } className={props.index===11?"active":""}>Matches Results</Link>
                            <Link href={ ROUTE_ADMIN_GP_LEAGUE_RESULTS } className={props.index===12?"active":""}>GP League Results</Link>
                        </div>
                    </div>

                    <div onClick={()=>{isShowingUserMenu(!showUserMenu);isShowingResultsMenu(false)}} className={`${showUserMenu?"show":""}`}>
                        <Image src={ IMAGE_USER_PLACEHOLDER } alt="..." className="profile-pic" layout='fit' />
                        <i className="fa-solid fa-angle-down"></i>

                        <div className="sub-menu">
                            <Link href="#" onClick={()=>{store.dispatch(showDialog(DIALOG_CHANGE_PASSWORD));}}>Change Password</Link>
                            <Link href='#' onClick={()=>{store.dispatch(showDialog(DIALOG_LOGOUT))}}>logout</Link>
                        </div>
                    </div>
                </div>

            </nav>

            <nav className="nav-small">
                <h1>ONLINE<br/>BATTLEGROUND</h1>

                <button ref={navBtnRef} className={ `nav-open-btn ${showSmallNav?"show":""}` } onClick={() => {isShowingSmallNav(!showSmallNav)}}>  
                    <FontAwesomeIcon icon={faBars} />
                    </button>

                <div ref={navRef} className="items">
                    <Link href="/admin/dashboard" className={props.index===0?"active":""}>Dashboard</Link>
                    <Link href="/admin/grand-prix" className={props.index===1?"active":""}>Grand Prix</Link>
                    <Link href="/admin/gp-leagues" className={props.index===2?"active":""}>GP Leagues</Link>
                    <Link href="/admin/fantasy-leagues" className={props.index===3?"active":""}>Fantasy Leagues</Link>
                    <Link href="/admin/users" className={props.index===4?"active":""}>Users</Link>
                    <Link href="/admin/games" className={props.index===5?"active":""}>Games</Link>
                    <Link href="/admin/tournaments" className={props.index===6?"active":""}>Tournaments</Link>
                    <Link href="/admin/ladders" className={props.index===7?"active":""}>Ladders</Link>
                    <Link href="/admin/inventory" className={props.index===8?"active":""}>Inventory</Link>

                    <div onClick={() => {isShowingResultsMenu(!showResultsMenu);isShowingUserMenu(false)}} className={`${(props.index>=9 && props.index<=12)?"active":""} ${showResultsMenu?"show":""}`}>
                        <span>Results</span>
                        <span><i className="fa-solid fa-angle-down"></i></span>

                        <div className="sub-menu">
                            <Link href="/admin/results/tournament-results" className={props.index===9?"active":""}>Tournament Results</Link>
                            <Link href="/admin/results/total-war-ladder-results" className={props.index===10?"active":""}>Total War Ladder Results</Link>
                            <Link href="/admin/results/match-results" className={props.index===11?"active":""}>Matches Results</Link>
                            <Link href="/admin/results/gp-league-results" className={props.index===12?"active":""}>GP League Results</Link>
                        </div>
                    </div>

                    <div className={`${showUserMenu?"show":""}`} onClick={()=>{isShowingUserMenu(!showUserMenu);isShowingResultsMenu(false);}}>
                        <Image src={ IMAGE_USER_PLACEHOLDER } alt="..." className="profile-pic" layout='fit' />
                        <i className="fa-solid fa-angle-down"></i>

                        <div className="sub-menu">
                            <Link href="#" onClick={()=>{store.dispatch(showDialog(DIALOG_CHANGE_PASSWORD));isShowingSmallNav(false)}}>Change Password</Link>
                            <Link href="#" onClick={()=>{store.dispatch(showDialog(DIALOG_LOGOUT));isShowingSmallNav(false)}}>logout</Link>
                        </div>
                    </div>

                </div>

            </nav>

        </>

    )
}

export default Navbar;
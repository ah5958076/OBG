import React, { useRef, useState } from 'react'
import dialogStyles from "@/styles/dialogs.module.css";
import userStyles from "./User.module.css";

import images from "@/constants/images";
import store from '@/Redux/store';
import { hideDialog } from '@/Redux/actions/dialogs';
import Link from 'next/link';
import Image from 'next/image';
import Input from '@/Components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faXmark } from '@fortawesome/free-solid-svg-icons';

const addUserHandler = (e:any) => {};
const updateUserHandler = (e:any) => {};
const userProfileHandler = (e:any) => {};





export const AddUser = () => {
    
    const [credit, setCredit] = useState(50);


    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={addUserHandler}>

                    <div className={userStyles.credit}>
                        <div>
                            <sup>$</sup>
                            <input autoComplete='off' type="number" min="0" value={credit} onChange={(e:any)=>{setCredit(e.target.value)}} name="credit" required />
                        </div>
                        <p style={{fontSize:"10px"}}>Enter only numbers</p>
                    </div>

                    <Input name='name' title='Full Name *' required={true} />
                    <Input name='username' title='Username *' required={true} />
                    <Input type='password' name='password' title='Password *' required={true} />
                    <Input type='email' name='email' title='Email *' required={true} />
                    <Input name='about' title='About *' required={true} />

                    <div className={dialogStyles.controls}>
                        <button onClick={()=>{store.dispatch(hideDialog())}} style={{backgroundColor: "gray"}} type='button'>Cancel</button>
                        <button style={{backgroundColor: "var(--site-clr)"}} type="submit">Add User</button>
                    </div>

                </form>

            </div>

        </div>

    )

}


export const UpdateUser = () => {
    const [credit, setCredit] = useState(50);

    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>
                
                <form method="post" onSubmit={updateUserHandler}>

                    <div className={userStyles.credit}>
                        <div>
                            <sup>$</sup>
                            <input  autoComplete='off' type="number" min="0" value={credit} onChange={(e:any)=>{setCredit(e.target.value)}} name="credit" required />
                        </div>
                        <p style={{fontSize: "10px"}}>Enter only numbers</p>
                    </div>

                    <Input name='name' title='Full Name *' required={true} />
                    <Input name='username' title='Username *' required={true} />
                    <Input type='password' name='password' title='Password *' required={true} />
                    <Input type='email' name='email' title='Email *' required={true} />
                    <Input name='about' title='About *' required={true} />

                    <div className={dialogStyles.controls}>
                        <button onClick={()=>{store.dispatch(hideDialog())}} style={{backgroundColor: "gray"}} type='button'>Cancel</button>
                        <button style={{backgroundColor: "#ff7700"}} type="submit">Update User</button>
                    </div>

                </form>

            </div>
        
        </div>

    )

}


export const AddUserInventoryDialog = () => {

    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <button className={userStyles.closeBtn} onClick={(e)=>{store.dispatch(hideDialog())}}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                
                <div className={userStyles.inventories}>
                    <div className={userStyles.inventory}>
                        <div><Image src={ images.USER } alt="..." width={80} height={80} style={{borderRadius: "5px"}}/></div>
                        <p>akindseries_green</p>
                        <button style={{backgroundColor: "var(--site-clr)"}}>ADD</button>
                    </div>
                    <div className={userStyles.inventory}>
                        <div><Image src={ images.USER } alt="..." width={80} height={80} style={{borderRadius: "5px"}}/></div>
                        <p>akindseries_green</p>
                        <button style={{backgroundColor: "var(--site-clr)"}}>ADD</button>
                    </div>
                    <div className={userStyles.inventory}>
                        <div><Image src={ images.USER } alt="..." width={80} height={80} style={{borderRadius: "5px"}}/></div>
                        <p>akindseries_green</p>
                        <button style={{backgroundColor: "var(--site-clr)"}}>ADD</button>
                    </div>
                    <div className={userStyles.inventory}>
                        <div><Image src={ images.USER } alt="..." width={80} height={80} style={{borderRadius: "5px"}}/></div>
                        <p>akindseries_green</p>
                        <button style={{backgroundColor: "var(--site-clr)"}}>ADD</button>
                    </div>
                </div>
                            
            </div>

        </div>

    )

}


export const UserProfileDialog = () => {

    const infoTabRef:any = useRef();
    const transactionTabRef:any = useRef();
    const matchHistoryTabRef:any = useRef();
    
    const infoTableRef:any = useRef();
    const transactionTableRef:any = useRef();
    const matchHistoryTableRef:any = useRef();

    const infoDropDownOpenerRef:any = useRef();
    const infoDropDownRef:any = useRef();


    const manageInfoTab = () => {
        infoTabRef.current.classList.add(userStyles.active)
        transactionTabRef.current.classList.remove(userStyles.active)
        matchHistoryTabRef.current.classList.remove(userStyles.active)
        
        infoTableRef.current.classList.add(userStyles.show);
        transactionTableRef.current.classList.remove(userStyles.show);
        matchHistoryTableRef.current.classList.remove(userStyles.show);
    }
    const manageTransactionTab = () => {
        infoTabRef.current.classList.remove(userStyles.active)
        transactionTabRef.current.classList.add(userStyles.active)
        matchHistoryTabRef.current.classList.remove(userStyles.active)
        
        infoTableRef.current.classList.remove(userStyles.show);
        transactionTableRef.current.classList.add(userStyles.show);
        matchHistoryTableRef.current.classList.remove(userStyles.show);    
    }
    const manageMatchHistoryTab = () => {
        infoTabRef.current.classList.remove(userStyles.active)
        transactionTabRef.current.classList.remove(userStyles.active)
        matchHistoryTabRef.current.classList.add(userStyles.active)
        
        infoTableRef.current.classList.remove(userStyles.show);
        transactionTableRef.current.classList.remove(userStyles.show);
        matchHistoryTableRef.current.classList.add(userStyles.show);
    }

    const openInfoTableDropDown = () => {
        infoDropDownRef.current.classList.toggle(userStyles.show);
    }
    const manageDropdownsClosing = (e:any) => {
        // dialogContainer && e.target===dialogContainer && e.target!==dialog
        if(!(infoDropDownRef.current.contains(e.target) || infoDropDownOpenerRef.current.contains(e.target)))
            infoDropDownRef.current.classList.remove(userStyles.show);
    }


    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`} onClick={(e:any)=>{manageDropdownsClosing(e)}}>

                <div className={userStyles.dpImage}>
                    <Image src={ images.USER } alt="..." width={100} height={100} />
                </div>

                <div className={userStyles.info}>
                    <p>
                        <span style={{fontSize: "20px", color: "white"}}>Chrismix</span>
                        <span style={{fontSize: "12px", color: "#9a9a9a"}}>( Chrismix112 )</span>
                    </p>
                    <p>
                        <span style={{fontSize: "16px", color: "white"}}>Total Credits</span>
                        <span style={{fontSize: "18px", color: "#9a9a9a"}}>$ 100</span>
                    </p>
                </div>


                <div className={userStyles.tabs}>
                    <div ref={infoTabRef} onClick={()=>{manageInfoTab()}} className={`${userStyles.tab} ${userStyles.active}`}>Info</div>
                    <div ref={transactionTabRef} onClick={()=>{manageTransactionTab()}} className={`${userStyles.tab}`}>Transaction</div>
                    <div ref={matchHistoryTabRef} onClick={()=>{manageMatchHistoryTab()}} className={`${userStyles.tab}`}>Match History</div>
                </div>


                <table ref={infoTableRef} className={`${userStyles.table} ${userStyles.info} ${userStyles.show}`}>

                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>Friends</td>
                            <td>20</td>
                        </tr>

                        <tr>
                            <td>
                                <div>
                                    <span>Teams</span> 
                                    <FontAwesomeIcon style={{cursor:"pointer"}} ref={infoDropDownOpenerRef} icon={faAngleDown} onClick={() => {openInfoTableDropDown()}}/>
                                </div>
                                <div className={`${userStyles.drop_down}`} ref={infoDropDownRef}>
                                    <div>Grand Prix <span>07</span></div>
                                    <div>General <span>03</span></div>
                                </div>
                            </td>
                            <td>10</td>
                        </tr>

                        <tr>
                            <td>Franchise Member</td>
                            <td>Franchise-A</td>
                        </tr>

                        <tr>
                            <td>Franchise Member</td>
                            <td>Franchise-C</td>
                        </tr>
                    </tbody>

                </table>
                
                <table ref={transactionTableRef} className={`${userStyles.table} ${userStyles.Transaction}`}>

                    <tr>
                        <th>Date & Time</th>
                        <th>Type</th>
                        <th>Amount</th>
                    </tr>

                    <tr>
                        <td>11/08/22- 10:30pm</td>
                        <td>Deposit</td>
                        <td>50$</td>
                    </tr>

                    <tr>
                        <td>05/01/23- 08:30pm</td>
                        <td>Deposit</td>
                        <td>50$</td>
                    </tr>

                    <tr>
                        <td>16/07/20- 11:30pm</td>
                        <td>Withdraw</td>
                        <td>50$</td>
                    </tr>

                </table>

                <table ref={matchHistoryTableRef} className={`${userStyles.table} ${userStyles.matchHistory}`}>
                    <tr>
                        <td> 
                            Match Category 
                            <i className="fa-solid fa-angle-down"></i>
                            <div className="drop-down" id="match-cat">
                            <div>Ladder</div>
                            <div>GP Leagues</div>
                            <div>1 to 1 Matches</div>
                            <div>Fantacy League</div>
                            <div>LeagueTournament</div>
                            </div>
                        </td>
                    </tr>
                    
                    <div className="dropdown">
                        <button className="dropbtn">Dropdown</button>
                        <div className="dropdown-content">
                        <Link href="#">Link 1</Link>
                        <Link href="#">Link 2</Link>
                        <Link href="#">Link 3</Link>
                        </div>
                    </div>
                    
                    <tr>
                        <th>Name</th>
                        <th>Game</th>
                        <th>Credits</th>
                        <th>Result</th>
                    </tr>

                    <tr>
                        <td><Image src={ images.USER } alt="" layout='fill' />Elizabeth</td>
                        <td>call of Duty</td>
                        <td>50 Credits</td>
                        <td className="result-box" style={{backgroundColor: "#33582d"}}>
                            <div> <img src={ images.GOLDEN_CUP } alt="" />Won</div>
                            <div id="more-info">
                                More Info
                                <div className="drop-down" id="more-info-drop-down-won">
                                    <div>Match with<span>Adam Lee</span></div>
                                    <div>Result announce<span>05 Jan 22(6:30am)</span></div>
                                    <div>Winner<span>Paul Semon</span></div>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td><Image src={ images.USER } alt="" layout='fill' /> Hamza</td>
                        <td>call of Duty</td>
                        <td>50 Credits</td>
                        <td className="result-box" style={{backgroundColor:"#FF2E2E"}}>
                            <div><img src={ images.RED_CROSS } alt="" /> Lost</div>
                            <div id="more-info">
                                More info
                                <div className="drop-down" id="more-info-drop-down-lost">
                                    <div>Match with<span>Adam Lee</span></div>
                                    <div>Result announce<span>05 Jan 22(6:30am)</span></div>
                                    <div>Winner<span>Paul Semon</span></div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    
                </table>

            </div>

        </div>
    )

}

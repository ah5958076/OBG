import React, { useState } from 'react'
import dialogStyles from "@/styles/dialogs.module.css";
import userStyles from "./User.module.css";

import images from "@/constants/images";
import store from '@/Redux/store';
import { hideDialog } from '@/Redux/actions/dialogs';
import Link from 'next/link';
import Image from 'next/image';
import Input from '@/Components/Input';

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

        <div className={dialogStyles.dialogs}>

            <div className={`${dialogStyles.dialog} ${dialogStyles.show}`}>
                
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

        <div className={dialogStyles.dialogs}>

            <div className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <div className="main-box">

                    <div className="cross-button">
                        <button><i className="fa-solid fa-xmark"></i></button>
                    </div>

                    <div>

                        <table>

                            <tr>
                                <td><img src="/images/Hillay Gbret.jpg" alt="" /></td>
                                <td><p>akindseries_green</p></td>
                                <td><button>ADD</button></td>
                            </tr>
                            
                            <tr>
                                <td><img src="/images/jebrew.jpg" alt="" /></td>
                                <td><p>akindseries_green </p></td>
                                <td><button>ADD</button></td>
                            </tr>

                            <tr>
                                <td><img src="/images/hurtre.jpg" alt="" /></td>
                                <td><p>akindseries_green </p></td>
                                <td><button>ADD</button></td>
                            </tr>

                            <tr>
                                <td><img src="/images/Hillay Gbret.jpg" alt="" /></td>
                                <td><p>akindseries_green </p></td>
                                <td><button>ADD</button></td>
                            </tr>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    )

}


export const UserProfileDialog = () => {

    return (

        <div className={dialogStyles.dialogs}>

            <div className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={userProfileHandler}>

                    <div className="crim-img">
                        <Image src={ images.USER } alt="" layout='fill' />
                    </div>

                    <div className="below-img">
                        <p>
                            <span style={{fontSize: "20px", color: "white"}}>Chrismix</span>
                            <span style={{fontSize: "12px", color: "#9a9a9a"}}>( Chrismix112 )</span>
                        </p>
                        <p>
                            <span style={{fontSize: "16px", color: "white"}}>Total Credits</span>
                            <span style={{fontSize: "18px", color: "#9a9a9a"}}>$ 100</span>
                        </p>
                    </div>

                    <div className="tabs">
                        <div className="tab">Info</div>
                        <div className="tab">Transaction</div>
                        <div className="tab">Match History</div>
                    </div>

                    <table id="info-table">

                        <tr>
                            <td>Friends</td>
                            <td>20</td>
                        </tr>

                        <tr>
                            <td>
                                Teams 
                                <i className="fa-solid fa-angle-down"></i>
                                <div className="drop-down">
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

                    </table>
                    
                    <table className="trans-table">

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

                    <table className="match-history">
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

                </form>

            </div>

        </div>
    )

}

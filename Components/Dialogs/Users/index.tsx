import React, { useRef, useState } from 'react'
import dialogStyles from "@/styles/dialogs.module.css";
import userStyles from "./User.module.css";
import images from "@/constants/images";
import store from '@/Redux/store';
import { hideDialog } from '@/Redux/actions/dialogs';
import Image from 'next/image';
import Input from '@/Components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { addUserHandler, updateUserHandler, addInventoryToUser } from '@/utils/users';
import { BASE_URL } from '@/constants/backend-routes';





export const AddUser = () => {

    const [credit, setCredit] = useState(50);


    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={addUserHandler}>

                    <div className={userStyles.credit}>
                        <div>
                            <sup>$</sup>
                            <input autoComplete='off' type="number" min="0" value={credit} onChange={(e: any) => { setCredit(e.target.value) }} name="credit" required />
                        </div>
                        <p >Enter only numbers</p>
                    </div>

                    <Input name='name' title='Full Name *' required={true} />
                    <Input name='username' title='Username *' required={true} />
                    <Input type='password' name='password' title='Password *' required={true} />
                    <Input type='email' name='email' title='Email *' required={true} />
                    <Input name='about' title='About *' required={true} />

                    <div className={dialogStyles.controls}>
                        <button onClick={() => { store.dispatch(hideDialog()) }} style={{ backgroundColor: "gray" }} type='button'>Cancel</button>
                        <button style={{ backgroundColor: "var(--site-clr)" }} type="submit">Add User</button>
                    </div>

                </form>

            </div>

        </div>

    )

}


export const UpdateUser = (props:any) => {

    let id= props.data?._doc?._id;
    const email = props.data?._doc?.email;
    const [credit, setCredit] = useState(props.data?._doc?.balance);
    const [name, setName] = useState(props.data?._doc?.fullName);
    const [username, setUsername] = useState(props.data?._doc?.username);
    const [about, setAbout] = useState(props.data?._doc?.about);

    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <form method="post" onSubmit={updateUserHandler}>

                    <input type="hidden" name="id" value={id} />

                    <div className={userStyles.credit}>
                        <div>
                            <sup>$</sup>
                            <input autoComplete='off' type="number" min="0" value={credit} onChange={(e: any) => { setCredit(e.target.value) }} name="credit" required />
                        </div>
                        <p >Enter only numbers</p>
                    </div>

                    <Input name='name' value={name} onChnage={(e:any)=>{setName(e.target?.value)}} title='Full Name *' required={true} />
                    <Input name='username' value={username} onChnage={(e:any)=>{setUsername(e.target?.value)}} title='Username *' required={true} />
                    <input type="hidden" name='email' value={email} />
                    <span style={{color:"gray", width:"100%",borderBottom:"1px solid gray",paddingBottom:"5px"}}>{email}</span>
                    <Input name='about' value={about} onChnage={(e:any)=>{setAbout(e.target?.value)}} title='About *' required={true} />

                    <div className={dialogStyles.controls}>
                        <button onClick={() => { store.dispatch(hideDialog()) }} style={{ backgroundColor: "gray" }} type='button'>Cancel</button>
                        <button style={{ backgroundColor: "#ff7700" }} type="submit">Update User</button>
                    </div>

                </form>

            </div>

        </div>

    )

}


export const AddUserInventoryDialog = (props:any) => {
    let inventories = props.data?.data?.data || null;
    let userID = props.data?.userID;

    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div id='dialog' style={{height:'85%'}} className={`${dialogStyles.dialog} ${dialogStyles.show}`}>

                <button className={userStyles.closeBtn} onClick={(e) => { store.dispatch(hideDialog()) }}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <div className={userStyles.inventories}>

                    {inventories?
                        inventories.map((elem:any, index:number) => (
                            <div key={index} className={userStyles.inventory}>
                                <div><Image src={elem?.picture?BASE_URL+elem.picture:images.USER} alt="..." width={80} height={80} style={{ borderRadius: "5px" }} /></div>
                                <p>{elem?.name || ""}</p>
                            <button onClick={()=>{addInventoryToUser(userID, elem._id)}} style={{ backgroundColor: "var(--site-clr)", width: "25%" }}>ADD</button>
                    </div>
                        )) : 
                        <div className={userStyles.inventory}><p>No inventories found</p></div>
                    }

                </div>

            </div>

        </div>

    )

}


export const UserProfileDialog = () => {

    const infoTabRef: any = useRef();
    const transactionTabRef: any = useRef();
    const matchHistoryTabRef: any = useRef();

    const infoTableRef: any = useRef();
    const transactionTableRef: any = useRef();
    const matchHistoryTableRef: any = useRef();

    const infoDropDownOpenerRef: any = useRef();
    const infoDropDownRef: any = useRef();


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
    const manageDropdownsClosing = (e: any) => {
        if (!(infoDropDownRef.current.contains(e.target) || infoDropDownOpenerRef.current.contains(e.target)))
            infoDropDownRef.current.classList.remove(userStyles.show);
    }
    const openOrCloseMatchHistoryDropdown = (e: any) => {
        e.currentTarget.parentElement.nextElementSibling.classList.toggle(userStyles.show);
    }


    return (

        <div id='dialogs' className={dialogStyles.dialogs}>

            <div style={{height:'auto'}} id='dialog' className={`${dialogStyles.dialog} ${userStyles.profileDialog} ${dialogStyles.show}`} onClick={(e: any) => { manageDropdownsClosing(e) }}>

                <div className={userStyles.dpImage}>
                    <Image src={images.USER} alt="..." width={100} height={100} />
                </div>

                <div className={userStyles.info}>
                    <p>
                        <span style={{ fontSize: "20px", color: "white" }}>Chrismix</span>
                        <span style={{ fontSize: "12px", color: "#9a9a9a" }}>( Chrismix112 )</span>
                    </p>
                    <p>
                        <span style={{ fontSize: "16px", color: "white" }}>Total Credits</span>
                        <span style={{ fontSize: "18px", color: "#9a9a9a", }}>$ 100</span>
                    </p>
                </div>


                <div  className={userStyles.tabs}>
                    <div ref={infoTabRef} onClick={() => { manageInfoTab() }} className={`${userStyles.tab} ${userStyles.active}`}>Info</div>
                    <div ref={transactionTabRef} onClick={() => { manageTransactionTab() }} className={`${userStyles.tab}`}>Transaction</div>
                    <div ref={matchHistoryTabRef} onClick={() => { manageMatchHistoryTab() }} className={`${userStyles.tab}`}>Match History</div>
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
                                    <FontAwesomeIcon style={{ cursor: "pointer" }} ref={infoDropDownOpenerRef} icon={faAngleDown} onClick={() => { openInfoTableDropDown() }} />
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

                <div ref={transactionTableRef} className={`${userStyles.table} ${userStyles.Transaction}`}>

                    <table>

                        <thead>
                            <tr>
                                <th>Date & Time</th>
                                <th>Type</th>
                                <th>Amount</th>
                            </tr>
                        </thead>

                        <tbody>
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
                        </tbody>

                    </table>

                </div>

                <div ref={matchHistoryTableRef} className={`${userStyles.table} ${userStyles.matchHistory}`}>

                    <select name="matchCatagory">
                        <option value="">Match Catagory</option>
                        <option value="Ladder">Ladder</option>
                        <option value="GP League">GP League</option>
                        <option value="1 to 1 Matches">1 to 1 Matches</option>
                        <option value="Fantasy League">Fantasy League</option>
                        <option value="Tournament">Tournament</option>
                    </select>

                    <div className={userStyles.mainTable}>

                        <table>

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Game</th>
                                    <th>Credits</th>
                                    <th>Result</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>
                                        <div>
                                            <Image src={images.USER} alt="..." width={30} height={30} style={{ borderRadius: "50%" }} />
                                            <span>Elizabeth</span>
                                        </div>
                                    </td>
                                    <td>call of Duty</td>
                                    <td>50 Credits</td>
                                    <td className={userStyles.win}>
                                        <div>
                                            <div>
                                                <Image src={images.GOLDEN_CUP} alt="..." width={10} height={10} />
                                                <span>Won</span>
                                            </div>
                                            <div onClick={(e: any) => { openOrCloseMatchHistoryDropdown(e) }}>
                                                More Info
                                            </div>
                                        </div>

                                        <div className={`${userStyles.more_info}`}>
                                            <div>
                                                <span>Match with: </span>
                                                <span>Adam Lee</span>
                                            </div>
                                            <div>
                                                <span>Result announce: </span>
                                                <span>05 Jan 22(6:30am)</span>
                                            </div>
                                            <div>
                                                <span>Winner: </span>
                                                <span>Paul Semon</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div>
                                            <Image src={images.USER} alt="..." width={30} height={30} style={{ borderRadius: "50%" }} />
                                            <span>Hamza</span>
                                        </div>
                                    </td>
                                    <td>call of Duty</td>
                                    <td>50 Credits</td>
                                    <td className={userStyles.loss}>
                                        <div>
                                            <div>
                                                <Image src={images.WHITE_CROSS} alt="..." width={7} height={7} />
                                                <span>Loss</span>
                                            </div>
                                            <div onClick={(e: any) => { openOrCloseMatchHistoryDropdown(e) }}>
                                                More Info
                                            </div>
                                        </div>
                                        <div className={`${userStyles.more_info}`}>
                                            <div>
                                                <span>Match with: </span>
                                                <span>Adam Lee</span>
                                            </div>
                                            <div>
                                                <span>Result announce: </span>
                                                <span>05 Jan 22(6:30am)</span>
                                            </div>
                                            <div>
                                                <span>Winner: </span>
                                                <span>Paul Semon</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    )

}

import React, { useEffect, useState } from 'react'
import styles from "./userRightNav.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faEyeSlash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import images from '@/constants/images';




function UserRightNav() {
    const [isOpened, setIsOpened] = useState(false);
    const [isPrivateChatsFocused, setIsPrivateChatsFocused] = useState(true);
    const [isChatOpened, setIsChatOpened] = useState(false);


    const open_chat = (id:string) => {console.log(id);setIsOpened(true);setIsChatOpened(true)}
    const sendMessage = (e:any) => {
        e.preventDefault();
    }

    useEffect(() => {
        setIsPrivateChatsFocused(true);
        if(!isOpened)
            setIsChatOpened(false);
    }, [isOpened]);


    return (

        <>
        
            <div className={styles.place_holder}></div>

            <nav className={`${styles.right_nav} ${isOpened?styles.open:""}`}>

                <div className={styles.top}>

                    <div className={styles.public_private}>
                        <button onClick={()=>setIsPrivateChatsFocused(true)} className={`${isPrivateChatsFocused?styles.active:""}`}>Private</button>
                        <button onClick={()=>setIsPrivateChatsFocused(false)} className={`${!isPrivateChatsFocused?styles.active:""}`}>Public</button>
                    </div>

                    <div className={styles.handles}>
                        <span className={styles.nav_opener} onClick={()=>setIsOpened(!isOpened)}>
                            <FontAwesomeIcon icon={faAngleRight}/>
                        </span>
                        <div className={styles.search}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <input type="text" placeholder="search" />
                        </div>
                        <Image src="/chats.svg" alt="" width={25} height={25} />
                    </div>

                </div>
                
                <div className={`${styles.private_chats} ${isPrivateChatsFocused?styles.enabled:""}`}>

                    <Link href="#" onClick={()=>{open_chat("userID")}}>
                        <span className={`${styles.active} ${styles.online}`}>
                            <Image width={40} height={40} src={images.USER} alt=""/>
                        </span>
                        <p>Random</p>
                    </Link>
                    <Link href="#" onClick={()=>{open_chat("userID")}}>
                        <span>
                            <Image width={40} height={40} src={images.USER} alt=""/>
                        </span>
                        <p>Random</p>
                    </Link>
                    <Link href="#" onClick={()=>{open_chat("userID")}}>
                        <span>
                            <Image width={40} height={40} src={images.USER} alt=""/>
                        </span>
                        <p>Random</p>
                    </Link>
                    <Link href="#" onClick={()=>{open_chat("userID")}}>
                        <span>
                            <Image width={40} height={40} src={images.USER} alt=""/>
                        </span>
                        <p>Random</p>
                    </Link>
                    <Link href="#" onClick={()=>{open_chat("userID")}}>
                        <span>
                            <Image width={40} height={40} src={images.USER} alt=""/>
                        </span>
                        <p>Random</p>
                    </Link>
                </div>

                <div className={`${styles.public_chats} ${!isPrivateChatsFocused?styles.enabled:""}`} >
                        
                    <div className={styles.chat}>
                        <Image style={{gridArea: "img"}} width={40} height={40} src={images.USER} alt=""/>
                        <p style={{gridArea: "name"}} className={styles.name}>Nymo<span>Yesterday at 1:20 PM</span></p>
                        <p style={{gridArea: "msg"}} className={styles.message}>Hey What are you doing?</p>
                    </div>

                    <div className={styles.chat}>
                        <Image style={{gridArea: "img"}} width={40} height={40} src={images.USER} alt=""/>
                        <p style={{gridArea: "name"}} className={styles.name}>Nymo<span>Yesterday at 1:20 PM</span></p>
                        <p style={{gridArea: "msg"}} className={styles.message}>Hey What are you doing?</p>
                    </div>

                    <div className={styles.chat}>
                        <Image style={{gridArea: "img"}} width={40} height={40} src={images.USER} alt=""/>
                        <p style={{gridArea: "name"}} className={styles.name}>Nymo<span>Yesterday at 1:20 PM</span></p>
                        <p style={{gridArea: "msg"}} className={styles.message}>Hey What are you doing?</p>
                    </div>

                    <div className={styles.divider}>Today</div>

                    <div className={styles.chat}>
                        <Image style={{gridArea: "img"}} width={40} height={40} src={images.USER} alt=""/>
                        <p style={{gridArea: "name"}} className={styles.name}>Nymo<span>Yesterday at 1:20 PM</span></p>
                        <p style={{gridArea: "msg"}} className={styles.message}>Hey What are you doing?</p>
                    </div>

                    <div className={styles.chat}>
                        <Image style={{gridArea: "img"}} width={40} height={40} src={images.USER} alt=""/>
                        <p style={{gridArea: "name"}} className={styles.name}>Nymo<span>Yesterday at 1:20 PM</span></p>
                        <p style={{gridArea: "msg"}} className={styles.message}>Hey What are you doing?</p>
                    </div>

                </div>

                <div className={`${styles.private_opened_chat} ${isChatOpened?styles.enabled:""}`}>
                    
                    <div className={styles.heading}>
                        <span onClick={()=>setIsChatOpened(false)}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </span>
                        <span className={styles.online}>
                            <Image src={images.USER} alt='' width={25} height={25} />
                        </span>
                        <p className={styles.name}>Dynamo</p>
                    </div>

                    <div className={styles.chats}>

                        <div className={styles.chat}>
                            <Image src={images.USER} alt='' width={40} height={40} />
                            <div>
                                <p className={styles.message}>Hey what are u doing?</p>
                                <span className={styles.time}>2d</span>
                            </div>
                        </div>

                    </div>

                    <form className={styles.footer} onSubmit={sendMessage}>
                        <input type="text" name='message' placeholder='Enter your message' required />
                        <button type='submit' className='not-a-button'>
                            <Image src={"/send_message.svg"} alt='' width={25} height={25} />
                        </button>
                    </form>

                </div>

            </nav>
        
        </>


    )
}

export default UserRightNav
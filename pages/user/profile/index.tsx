import React from 'react'
import styles from "./profile.module.css";
import UserLeftNav from '@/Components/UserLeftNav'
import UserNavBar from '@/Components/UserNavbar'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faImage, faPen } from '@fortawesome/free-solid-svg-icons';

function Profile() {
    return (

        <>

            <UserNavBar auth={true} />
        
            <div className="container">

                <UserLeftNav />

                <div className={styles.main}>

                    <div className={styles.personal_info}>
                        
                        <div className={`${styles.replace} ${styles.banner}`}>
                            <FontAwesomeIcon icon={faImage} /> 
                            <input type="file" name="banner_file" />
                        </div>

                        <div className={styles.myself}>
                            <div className={styles.dp_image}>
                                <Image src="/user.jpg" alt='...' width={100} height={100} />
                                <div className={styles.replace}>
                                    <FontAwesomeIcon icon={faImage} /> 
                                    <input type="file" name="dp_file" />
                                </div>
                            </div>
                            <div className={styles.name}>
                                <p>Amir Hamza</p>
                                <span>
                                    <FontAwesomeIcon icon={faPen} />
                                </span>
                            </div>
                        </div>

                    </div>

                    <div className={styles.data}>

                        <div className={`${styles.datum} ${styles.overview}`}>
                            <h3>Overview</h3>

                            <div className={styles.current_match}>
                                <p>Current Match</p>
                                
                                <div className={styles.cards}>
                                    <div className={styles.card}>
                                        <div className={styles.card_img}>   
                                            <FontAwesomeIcon icon={faCircleXmark} />
                                        </div>
                                        <p className={styles.body}>No Match Found!</p>
                                    </div>
                                </div>

                            </div>

                            <div className={styles.prev_record}>
                                <div className={`${styles.datum} ${styles.match}`}>
                                    <span>Matches</span>
                                    <span>0</span>
                                </div>
                                <div className={`${styles.datum} ${styles.win}`}>
                                    <span>Wins</span>
                                    <span>0</span>
                                </div>
                                <div className={`${styles.datum} ${styles.loss}`}>
                                    <span>Losses</span>
                                    <span>0</span>
                                </div>
                                <div className={`${styles.datum} ${styles.win_percent}`}>
                                    <span>Win %</span>
                                    <span>0%</span>
                                </div>
                                <div className={`${styles.datum} ${styles.recent_result}`}>
                                    <span>Recent Result</span>
                                    <span>--</span>
                                </div>
                            </div>

                        </div>

                        <div className={`${styles.datum} ${styles.about}`}>
                            <h3>About<span><FontAwesomeIcon icon={faPen} /></span></h3>
                            <p>Here about user has been written</p>
                        </div>

                        <div className={`${styles.datum} ${styles.my_inventory}`}>
                            <h3>My Inventory</h3>

                            <div className={styles.cards}>

                                <div className={styles.card}>
                                    <div className={styles.card_img}>   
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    </div>
                                    <p className={styles.body}>No Inventory Found!</p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        
        </>


    )
}

export default Profile
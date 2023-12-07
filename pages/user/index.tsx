import React from "react";
import styles from "@/pages/user/index.module.css";
import UserNavBar from "@/Components/UserNavbar";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch, faTrophy } from "@fortawesome/free-solid-svg-icons";
import UserFooter from "@/Components/UserFooter";

function Home() {
    return (
        <>
            <UserNavBar auth={false} />

            <div className={styles.main_img}>
                <div>
                    <h1>COMPETE & WIN</h1>
                    <h2>EXPERIENCE BEST OF ESPORTS PLATFORM</h2>
                </div>
            </div>

            <div className={styles.container}>
                <h2>Featured Tournament</h2>

                <div className={styles.cards}>

                    <div className={styles.card}>

                        <div className={styles.card_img}>
                            <Image src="/index-2.png" alt="..." layout="responsive" width={100} height={100} style={{borderRadius:"10px"}}  />
                            <div>
                                <span>May 14</span>
                                <span><span>STARTING AT</span> <span className="site_clr">10:00 AM EST</span></span>
                            </div>
                        </div>

                        <p className={styles.body}>Call of Duty Tournament</p>
                        
                        <div className={styles.footer}>
                            <div>
                                <p className={styles.footer_heading}>Prize Pool</p>
                                <p>
                                    <Image src="/gold-coin.png" alt="..." width={12} height={12} />
                                    <span>500</span>
                                </p>
                            </div>
                            <div>
                                <p className={styles.footer_heading}>Team Size</p>
                                <p>
                                    <Image src="/knife-cross-by-cross.png" alt="..." width={12} height={12} />
                                    <span>5x5</span>
                                </p>
                            </div>
                            <div>
                                <p className={styles.footer_heading}>Entry Fee</p>
                                <p>
                                    <Image src="/gold-coin.png" alt="..." width={12} height={12} />
                                    <span>500</span>
                                </p>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div className={styles.card}>

                        <div className={styles.card_img}>
                            <Image src="/index-2.png" alt="..." layout="responsive" width={100} height={100} style={{borderRadius:"10px"}}  />
                            <div>
                                <span>May 14</span>
                                <span><span>STARTING AT</span> <span className="site_clr">10:00 AM EST</span></span>
                            </div>
                        </div>

                        <p className={styles.body}>Call of Duty Tournament</p>
                        
                        <div className={styles.footer}>
                            <div>
                                <p className={styles.footer_heading}>Prize Pool</p>
                                <p>
                                    <Image src="/gold-coin.png" alt="..." width={12} height={12} />
                                    <span>500</span>
                                </p>
                            </div>
                            <div>
                                <p className={styles.footer_heading}>Team Size</p>
                                <p>
                                    <Image src="/knife-cross-by-cross.png" alt="..." width={12} height={12} />
                                    <span>5x5</span>
                                </p>
                            </div>
                            <div>
                                <p className={styles.footer_heading}>Entry Fee</p>
                                <p>
                                    <Image src="/gold-coin.png" alt="..." width={12} height={12} />
                                    <span>500</span>
                                </p>
                            </div>
                        </div>
                        
                    </div>

                    <div className={styles.card}>

                        <div className={styles.card_img}>
                            <Image src="/index-2.png" alt="..." layout="responsive" width={100} height={100} style={{borderRadius:"10px"}}  />
                            <div>
                                <span>May 14</span>
                                <span><span>STARTING AT</span> <span className="site_clr">10:00 AM EST</span></span>
                            </div>
                        </div>

                        <p className={styles.body}>Call of Duty Tournament</p>
                        
                        <div className={styles.footer}>
                            <div>
                                <p className={styles.footer_heading}>Prize Pool</p>
                                <p>
                                    <Image src="/gold-coin.png" alt="..." width={12} height={12} />
                                    <span>500</span>
                                </p>
                            </div>
                            <div>
                                <p className={styles.footer_heading}>Team Size</p>
                                <p>
                                    <Image src="/knife-cross-by-cross.png" alt="..." width={12} height={12} />
                                    <span>5x5</span>
                                </p>
                            </div>
                            <div>
                                <p className={styles.footer_heading}>Entry Fee</p>
                                <p>
                                    <Image src="/gold-coin.png" alt="..." width={12} height={12} />
                                    <span>500</span>
                                </p>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div className={styles.card}>

                        <div className={styles.card_img}>
                            <Image src="/index-2.png" alt="..." layout="responsive" width={100} height={100} style={{borderRadius:"10px"}}  />
                            <div>
                                <span>May 14</span>
                                <span><span>STARTING AT</span> <span className="site_clr">10:00 AM EST</span></span>
                            </div>
                        </div>

                        <p className={styles.body}>Call of Duty Tournament</p>
                        
                        <div className={styles.footer}>
                            <div>
                                <p className={styles.footer_heading}>Prize Pool</p>
                                <p>
                                    <Image src="/gold-coin.png" alt="..." width={12} height={12} />
                                    <span>500</span>
                                </p>
                            </div>
                            <div>
                                <p className={styles.footer_heading}>Team Size</p>
                                <p>
                                    <Image src="/knife-cross-by-cross.png" alt="..." width={12} height={12} />
                                    <span>5x5</span>
                                </p>
                            </div>
                            <div>
                                <p className={styles.footer_heading}>Entry Fee</p>
                                <p>
                                    <Image src="/gold-coin.png" alt="..." width={12} height={12} />
                                    <span>500</span>
                                </p>
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>

            <div className={`${styles.container} ${styles.updates}`}>
                <h2>ONLINE BATTLEGROUND FOR UPDATES</h2>
                <button>Follow</button>
            </div>

            <div className={`${styles.container} ${styles.WinToEarn}`}>
                <h2>
                    <span className="site_clr">#</span>
                    <span>WinToEarn</span>
                </h2>
                <p style={{color:"var(--secondary-clr)"}}>Show your gaming skills, compete and win to earn as much as you can</p>

                <div className={styles.cards}>

                    <div className={`${styles.card}`} style={{color:"var(--site-clr)"}}>
                        <FontAwesomeIcon icon={faTrophy} style={{fontSize:"50px"}} />
                        <span>Tournaments | Leagues | Ladders</span>
                        
                        <span className={styles.body}>
                            Optimze or compete in any of our tournaments, leagues and win prizes
                        </span>

                        <button>Get Started</button>
                    </div>

                    <div className={`${styles.card}`} style={{color:"#004981"}}>
                        <FontAwesomeIcon icon={faStopwatch} style={{fontSize:"50px"}} />
                        <span>Play Anytime</span>
                        
                        <span className={styles.body}>
                            Optimze or compete in any of our tournaments, leagues and win prizes
                        </span>

                        <button>Get Started</button>
                    </div>

                    <div className={`${styles.card}`} style={{color:"#9E8E00"}}>
                        <Image style={{marginBottom:"-20px",marginTop:"-20px"}} src="/fight.png" alt="..." width={100} height={100} />
                        <span style={{fontSize:"18px"}}>Challenge</span>
                        
                        <span className={styles.body}>
                            Optimze or compete in any of our tournaments, leagues and win prizes
                        </span>

                        <button>Get Started</button>
                    </div>
                    
                </div>

            </div>

            <div className={styles.container}>

                <h2>Featured Ladders</h2>
            
                <div className={styles.cards}>

                    <div className={styles.card}>

                        <div className={styles.card_img}>
                            <Image src="/index-3.png" alt="" width={100} height={100} layout="responsive" />
                            <div>
                                <span className="site_clr">Open</span>
                                <span>May 14</span>
                                <span>
                                    <span>STARTING AT</span>
                                    <span className="site_clr">10:00 AM EST</span>
                                </span>
                            </div>
                        </div>

                        <p className={styles.body}>Call of Duty Tournament</p>

                        <div className={styles.footer}>
                            <div>
                                <span>Prize Pool</span>
                                <span>
                                    <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                    <span>500</span>
                                </span>
                            </div>
                            <div>
                                <span>Team Size</span>
                                <span>
                                    <Image src="/knife-cross-by-cross.png" alt="..." width={10} height={10} />
                                    <span>5x5</span>
                                </span>
                            </div>
                            <div>
                                <span>Entry Fee</span>
                                <span>
                                    <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                    <span>500</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>

                        <div className={styles.card_img}>
                            <Image src="/index-3.png" alt="" width={100} height={100} layout="responsive" />
                            <div>
                                <span className="site_clr">Open</span>
                                <span>May 14</span>
                                <span>
                                    <span>STARTING AT</span>
                                    <span className="site_clr">10:00 AM EST</span>
                                </span>
                            </div>
                        </div>

                        <p className={styles.body}>Call of Duty Tournament</p>

                        <div className={styles.footer}>
                            <div>
                                <span>Prize Pool</span>
                                <span>
                                    <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                    <span>500</span>
                                </span>
                            </div>
                            <div>
                                <span>Team Size</span>
                                <span>
                                    <Image src="/knife-cross-by-cross.png" alt="..." width={10} height={10} />
                                    <span>5x5</span>
                                </span>
                            </div>
                            <div>
                                <span>Entry Fee</span>
                                <span>
                                    <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                    <span>500</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>

                        <div className={styles.card_img}>
                            <Image src="/index-3.png" alt="" width={100} height={100} layout="responsive" />
                            <div>
                                <span className="site_clr">Open</span>
                                <span>May 14</span>
                                <span>
                                    <span>STARTING AT</span>
                                    <span className="site_clr">10:00 AM EST</span>
                                </span>
                            </div>
                        </div>

                        <p className={styles.body}>Call of Duty Tournament</p>

                        <div className={styles.footer}>
                            <div>
                                <span>Prize Pool</span>
                                <span>
                                    <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                    <span>500</span>
                                </span>
                            </div>
                            <div>
                                <span>Team Size</span>
                                <span>
                                    <Image src="/knife-cross-by-cross.png" alt="..." width={10} height={10} />
                                    <span>5x5</span>
                                </span>
                            </div>
                            <div>
                                <span>Entry Fee</span>
                                <span>
                                    <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                    <span>500</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>

                        <div className={styles.card_img}>
                            <Image src="/index-3.png" alt="" width={100} height={100} layout="responsive" />
                            <div>
                                <span className="site_clr">Open</span>
                                <span>May 14</span>
                                <span>
                                    <span>STARTING AT</span>
                                    <span className="site_clr">10:00 AM EST</span>
                                </span>
                            </div>
                        </div>

                        <p className={styles.body}>Call of Duty Tournament</p>

                        <div className={styles.footer}>
                            <div>
                                <span>Prize Pool</span>
                                <span>
                                    <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                    <span>500</span>
                                </span>
                            </div>
                            <div>
                                <span>Team Size</span>
                                <span>
                                    <Image src="/knife-cross-by-cross.png" alt="..." width={10} height={10} />
                                    <span>5x5</span>
                                </span>
                            </div>
                            <div>
                                <span>Entry Fee</span>
                                <span>
                                    <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                    <span>500</span>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.banner}>
                    <Image src="/index-5.png" alt="..." width={200} height={250} />
                    <div>
                        <h1>ESPORTS FANTASY <span>LEAGUES FOR</span> GRAND PRIX</h1>
                        <button>Join</button>
                    </div>
                </div>
            </div>

            <div className={`${styles.container} ${styles.featured_games}`}>

                <h2>Featured Games</h2>
                
                <div className={styles.cards}>
                    
                    <div className={styles.card}>
                        <div className={styles.card_img}>
                            <Image src="/index-2.png" alt="..." width={250} height={250} layout="responsive" />
                            <div style={{width:"100%"}}>
                                <span style={{fontSize:"18px",textAlign:"center"}}>Street Fight</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.card}>
                        <div className={styles.card_img}>
                            <Image src="/index-2.png" alt="..." width={250} height={250} layout="responsive" />
                            <div style={{width:"100%"}}>
                                <span style={{fontSize:"18px",textAlign:"center"}}>Street Fight</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.card}>
                        <div className={styles.card_img}>
                            <Image src="/index-2.png" alt="..." width={250} height={250} layout="responsive" />
                            <div style={{width:"100%"}}>
                                <span style={{fontSize:"18px",textAlign:"center"}}>Street Fight</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.card}>
                        <div className={styles.card_img}>
                            <Image src="/index-2.png" alt="..." width={250} height={250} layout="responsive" />
                            <div style={{width:"100%"}}>
                                <span style={{fontSize:"18px",textAlign:"center"}}>Street Fight</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.card}>
                        <div className={styles.card_img}>
                            <Image src="/index-2.png" alt="..." width={250} height={250} layout="responsive" />
                            <div style={{width:"100%"}}>
                                <span style={{fontSize:"18px",textAlign:"center"}}>Street Fight</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <UserFooter />
        </>
    );
}

export default Home;

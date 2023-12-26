import { useEffect, useState } from "react";
import UserFooter from "@/Components/UserFooter";
import UserNavBar from "@/Components/UserNavbar";
import { isLoading } from "@/Redux/actions/loader";
import store from "@/Redux/store";
import { VERIFY_TOKEN_ROUTE } from "@/constants/backend-routes";
import { ROUTE_ADMIN_DASHBOARD, ROUTE_SIGNIN, ROUTE_USER_DASHBOARD } from "@/constants/routes";
import { getRequest, navigateTo } from "@/utils/general";
import styles from "@/styles/home.module.css"
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch, faTrophy } from "@fortawesome/free-solid-svg-icons";

export default function Home() {

  const [hasAuth, setAuth] = useState(true); 

  useEffect(() => {
    store.dispatch(isLoading(true));
    getRequest(VERIFY_TOKEN_ROUTE).then((response: any) => {
      setAuth(true);
      if (response?.data?.result?.user?.role === "Admin")
        navigateTo(null, ROUTE_ADMIN_DASHBOARD);
      else if (response?.data?.result?.user?.role === "User")
        navigateTo(null, ROUTE_USER_DASHBOARD);
    }).catch((err:any) => {
      localStorage.removeItem("token");
      setAuth(false);
      store.dispatch(isLoading(false));
    });
  });


  return (
    <>
      {!hasAuth?
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

                  <div onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)} className={`${styles.card} ${styles.clickable}`}>

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
                                  <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                  <span>500</span>
                              </p>
                          </div>
                          <div>
                              <p className={styles.footer_heading}>Team Size</p>
                              <p>
                                  <Image src="/knife-cross-by-cross.png" alt="..." width={10} height={10} />
                                  <span>5x5</span>
                              </p>
                          </div>
                          <div>
                              <p className={styles.footer_heading}>Entry Fee</p>
                              <p>
                                  <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                  <span>500</span>
                              </p>
                          </div>
                      </div>
                      
                  </div>

                  <div onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)} className={`${styles.card} ${styles.clickable}`}>

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
                                  <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                  <span>500</span>
                              </p>
                          </div>
                          <div>
                              <p className={styles.footer_heading}>Team Size</p>
                              <p>
                                  <Image src="/knife-cross-by-cross.png" alt="..." width={10} height={10} />
                                  <span>5x5</span>
                              </p>
                          </div>
                          <div>
                              <p className={styles.footer_heading}>Entry Fee</p>
                              <p>
                                  <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                  <span>500</span>
                              </p>
                          </div>
                      </div>
                      
                  </div>
                  
                  <div onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)} className={`${styles.card} ${styles.clickable}`}>

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
                                  <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                  <span>500</span>
                              </p>
                          </div>
                          <div>
                              <p className={styles.footer_heading}>Team Size</p>
                              <p>
                                  <Image src="/knife-cross-by-cross.png" alt="..." width={10} height={10} />
                                  <span>5x5</span>
                              </p>
                          </div>
                          <div>
                              <p className={styles.footer_heading}>Entry Fee</p>
                              <p>
                                  <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                  <span>500</span>
                              </p>
                          </div>
                      </div>
                      
                  </div>
                  
                  <div onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)} className={`${styles.card} ${styles.clickable}`}>

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
                                  <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                  <span>500</span>
                              </p>
                          </div>
                          <div>
                              <p className={styles.footer_heading}>Team Size</p>
                              <p>
                                  <Image src="/knife-cross-by-cross.png" alt="..." width={10} height={10} />
                                  <span>5x5</span>
                              </p>
                          </div>
                          <div>
                              <p className={styles.footer_heading}>Entry Fee</p>
                              <p>
                                  <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                  <span>500</span>
                              </p>
                          </div>
                      </div>
                      
                  </div>

              </div>
          </div>

          <div className={`${styles.container} ${styles.updates}`}>
              <h2>ONLINE BATTLEGROUND FOR UPDATES</h2>
              <button onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)}>Follow</button>
          </div>

          <div className={`${styles.container} ${styles.WinToEarn}`}>
              <h2>
                  <span className="site_clr" style={{fontSize: "30px", marginRight: "5px"}}>#</span>
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

                      <button onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)}>Get Started</button>
                  </div>

                  <div className={`${styles.card}`} style={{color:"#004981"}}>
                      <FontAwesomeIcon icon={faStopwatch} style={{fontSize:"50px"}} />
                      <span>Play Anytime</span>
                      
                      <span className={styles.body}>
                          Optimze or compete in any of our tournaments, leagues and win prizes
                      </span>

                      <button onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)}>Get Started</button>
                  </div>

                  <div className={`${styles.card}`} style={{color:"#9E8E00"}}>
                      <Image style={{marginBottom:"-20px",marginTop:"-20px"}} src="/fight.png" alt="..." width={100} height={100} />
                      <span style={{fontSize:"18px"}}>Challenge</span>
                      
                      <span className={styles.body}>
                          Optimze or compete in any of our tournaments, leagues and win prizes
                      </span>

                      <button onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)}>Get Started</button>
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
                            <span className="site_clr" style={{fontSize:"10px"}}>Open</span>
                            <span style={{fontSize:"12px"}}>May 14</span>
                            <span style={{fontSize:"12px"}}>
                                <span>STARTING AT</span>
                                <span className="site_clr">10:00 AM EST</span>
                            </span>
                        </div>
                    </div>

                    <p className={styles.body}>Call of Duty Tournament</p>

                    <div className={styles.footer}>
                        <div>
                            <p>Prize Pool</p>
                            <p>
                                <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                <span>500</span>
                            </p>
                        </div>
                        <div>
                            <p>Team Size</p>
                            <p>
                                <Image src="/knife-cross-by-cross.png" alt="..." width={10} height={10} />
                                <span>5x5</span>
                            </p>
                        </div>
                        <div>
                            <p>Entry Fee</p>
                            <p>
                                <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                <span>500</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.card}>

                    <div className={styles.card_img}>
                        <Image src="/index-3.png" alt="" width={100} height={100} layout="responsive" />
                        <div>
                            <span className="site_clr" style={{fontSize:"10px"}}>Open</span>
                            <span style={{fontSize:"12px"}}>May 14</span>
                            <span style={{fontSize:"12px"}}>
                                <span>STARTING AT</span>
                                <span className="site_clr">10:00 AM EST</span>
                            </span>
                        </div>
                    </div>

                    <p className={styles.body}>Call of Duty Tournament</p>

                    <div className={styles.footer}>
                        <div>
                            <p>Prize Pool</p>
                            <p>
                                <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                <span>500</span>
                            </p>
                        </div>
                        <div>
                            <p>Team Size</p>
                            <p>
                                <Image src="/knife-cross-by-cross.png" alt="..." width={10} height={10} />
                                <span>5x5</span>
                            </p>
                        </div>
                        <div>
                            <p>Entry Fee</p>
                            <p>
                                <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                <span>500</span>
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className={styles.card}>

                    <div className={styles.card_img}>
                        <Image src="/index-3.png" alt="" width={100} height={100} layout="responsive" />
                        <div>
                            <span className="site_clr" style={{fontSize:"10px"}}>Open</span>
                            <span style={{fontSize:"12px"}}>May 14</span>
                            <span style={{fontSize:"12px"}}>
                                <span>STARTING AT</span>
                                <span className="site_clr">10:00 AM EST</span>
                            </span>
                        </div>
                    </div>

                    <p className={styles.body}>Call of Duty Tournament</p>

                    <div className={styles.footer}>
                        <div>
                            <p>Prize Pool</p>
                            <p>
                                <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                <span>500</span>
                            </p>
                        </div>
                        <div>
                            <p>Team Size</p>
                            <p>
                                <Image src="/knife-cross-by-cross.png" alt="..." width={10} height={10} />
                                <span>5x5</span>
                            </p>
                        </div>
                        <div>
                            <p>Entry Fee</p>
                            <p>
                                <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                <span>500</span>
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className={styles.card}>

                    <div className={styles.card_img}>
                        <Image src="/index-3.png" alt="" width={100} height={100} layout="responsive" />
                        <div>
                            <span className="site_clr" style={{fontSize:"10px"}}>Open</span>
                            <span style={{fontSize:"12px"}}>May 14</span>
                            <span style={{fontSize:"12px"}}>
                                <span>STARTING AT</span>
                                <span className="site_clr">10:00 AM EST</span>
                            </span>
                        </div>
                    </div>

                    <p className={styles.body}>Call of Duty Tournament</p>

                    <div className={styles.footer}>
                        <div>
                            <p>Prize Pool</p>
                            <p>
                                <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                <span>500</span>
                            </p>
                        </div>
                        <div>
                            <p>Team Size</p>
                            <p>
                                <Image src="/knife-cross-by-cross.png" alt="..." width={10} height={10} />
                                <span>5x5</span>
                            </p>
                        </div>
                        <div>
                            <p>Entry Fee</p>
                            <p>
                                <Image src="/gold-coin.png" alt="..." width={10} height={10} />
                                <span>500</span>
                            </p>
                        </div>
                    </div>
                </div>

              </div>
          </div>

          <div className={styles.container}>
              <div className={styles.banner}>   
                  <Image src="/index-5.png" alt="..." width={200} height={250} />
                  <div>
                      <h1>ESPORTS FANTASY <span>LEAGUES <br/>FOR</span> GRAND PRIX</h1>
                      <button onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)}>Join</button>
                  </div>
              </div>
          </div>

          <div className={`${styles.container} ${styles.featured_games}`}>

              <h2>Featured Games</h2>
              
              <div className={styles.cards}>
                  
                  <div onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)} className={`${styles.card} ${styles.clickable}`}>
                      <div className={styles.card_img}>
                          <Image src="/index-2.png" alt="..." width={250} height={250} layout="responsive" />
                          <div style={{width:"calc(100% - 20px)"}}>
                              <span style={{fontSize:"20px",textAlign:"center"}}>Street Fight</span>
                          </div>
                      </div>
                  </div>
                  
                  <div onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)} className={`${styles.card} ${styles.clickable}`}>
                      <div className={styles.card_img}>
                          <Image src="/index-2.png" alt="..." width={250} height={250} layout="responsive" />
                          <div style={{width:"calc(100% - 20px)"}}>
                              <span style={{fontSize:"20px",textAlign:"center"}}>Street Fight</span>
                          </div>
                      </div>
                  </div>
                  
                  <div onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)} className={`${styles.card} ${styles.clickable}`}>
                      <div className={styles.card_img}>
                          <Image src="/index-2.png" alt="..." width={250} height={250} layout="responsive" />
                          <div style={{width:"calc(100% - 20px)"}}>
                              <span style={{fontSize:"20px",textAlign:"center"}}>Street Fight</span>
                          </div>
                      </div>
                  </div>
                  
                  <div onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)} className={`${styles.card} ${styles.clickable}`}>
                      <div className={styles.card_img}>
                          <Image src="/index-2.png" alt="..." width={250} height={250} layout="responsive" />
                          <div style={{width:"calc(100% - 20px)"}}>
                              <span style={{fontSize:"20px",textAlign:"center"}}>Street Fight</span>
                          </div>
                      </div>
                  </div>
                  
                  <div onClick={(e)=>navigateTo(e, ROUTE_SIGNIN)} className={`${styles.card} ${styles.clickable}`}>
                      <div className={styles.card_img}>
                          <Image src="/index-2.png" alt="..." width={250} height={250} layout="responsive" />
                          <div style={{width:"calc(100% - 20px)"}}>
                              <span style={{fontSize:"20px",textAlign:"center"}}>Street Fight</span>
                          </div>
                      </div>
                  </div>
                  
              </div>
          </div>

          <UserFooter /> 

        </> : <></>
      }
    </>
  )
}

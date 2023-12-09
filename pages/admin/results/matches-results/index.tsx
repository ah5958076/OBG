import React from 'react'
import tableStyles from "@/styles/pagesTables.module.css";
import styles from "./MatchesResults.module.css"

import images from "@/constants/images";
import Navbar from '@/Components/Navbar/Navbar'
import { NameAndExportData } from '@/Components/NameAndExportData/NameAndExportData'
import { Pagination } from '@/Components/Pagination/Pagination'
import { SearchBar } from '@/Components/SearchBar/SearchBar';
import { DIALOG_CONFIRMATION } from '@/constants/dialog-names';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { TITLE_ADMIN_MATCHES_RESULTS } from '@/constants/page-titles';
import { openDeleteDialog, select_all, select_individual } from '@/utils/general';


const MatchesResults = () => {

  const toggleAccordian = (e:any) => {
    e.preventDefault();
    let accordianBody = e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement?.querySelector("tbody");
    accordianBody.classList.toggle(styles.show);
  }


  return (
    
    <>
    
      <Navbar index={11} />

      <title>{TITLE_ADMIN_MATCHES_RESULTS}</title>

      <div className={tableStyles.container}>

        <NameAndExportData url="/api/matches-results/download-record" title="Matches Results" />
        <SearchBar url="/api/matches-results/search" addBtn={false} deleteDialog={DIALOG_CONFIRMATION} />      
        
        
        <div className={`${tableStyles.table} ${styles.table}`}>

          <table>

            <thead>

              <tr>
                <th><input type="checkbox" name="select_all" onChange={ select_all } /></th>
                <th colSpan={2}>Show Nested Result</th>
                <th colSpan={2}>Match</th>
                <th colSpan={2}>Game</th>
                <th colSpan={2}>Winner</th>
                <th>Actions</th>
              </tr>

            </thead>


            <tbody>

              <tr>
                <td colSpan={10} className={`${styles.accordian}`}>

                  <div className={`${tableStyles.table} ${styles.table}`}>

                    <table>

                      <thead>
                        <tr>
                          <td><input type="checkbox" name="selection-box" value={1} onChange={select_individual} /></td>
                          <td colSpan={2} className={styles.open_btn}>
                            <Link href="#" onClick={toggleAccordian}>
                              <FontAwesomeIcon icon={faAngleDown}/>Click Me
                            </Link>
                          </td>
                          <td colSpan={2}>G.Team2</td>
                          <td colSpan={2}>PUBG</td>
                          <td colSpan={2}>33</td>
                          <td>
                            <button className='not-a-button'  onClick={()=>{openDeleteDialog(TITLE_ADMIN_MATCHES_RESULTS, "/api/tournament-results/delete", "")}}>
                              <FontAwesomeIcon icon={faTrashCan} style={{color:"#df4646"}}/>
                            </button>
                          </td>
                        </tr>
                      </thead>

                      <tbody className={styles.accordian_body}>

                        <tr>
                          <th colSpan={2}>Player</th>
                          <th>Score</th>
                          <th>Map Score 1</th>
                          <th>Map Score 2</th>
                          <th>Map Score 3</th>
                          <th>Map Score 4</th>
                          <th>Map Score 5</th>
                          <th>Video</th>
                          <th>Win/Loss</th>
                        </tr>

                        <tr>
                          <td colSpan={2}>Bravo 3</td>
                          <td>500</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>
                            <Image src={ images.USER } alt="..." width={50} height={50} />
                          </td>
                          <td>
                            <button className={`${tableStyles.Win} ${tableStyles.left}`}>
                              <span>Win</span>
                            </button>
                          </td>
                        </tr>

                        <tr>
                          <td colSpan={2}>Bravo 3</td>
                          <td>500</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>
                            <Image src={ images.USER } alt="..." width={50} height={50} />
                          </td>
                          <td>
                            <button className={`${tableStyles.Loss} ${tableStyles.left}`}>
                              <span>Loss</span>
                            </button>
                          </td>
                        </tr>

                      </tbody>

                    </table>

                  </div>

                </td>
              </tr>

              <tr>
                <td colSpan={10} className={`${styles.accordian}`}>

                  <div className={`${tableStyles.table} ${styles.table}`}>

                    <table>

                      <thead>
                        <tr>
                          <td><input type="checkbox" name="selection-box" value={2} onChange={select_individual} /></td>
                          <td colSpan={2} className={styles.open_btn}>
                            <Link href="#" onClick={toggleAccordian}>
                              <FontAwesomeIcon icon={faAngleDown}/>Click Me
                            </Link>
                          </td>
                          <td colSpan={2}>G.Team2</td>
                          <td colSpan={2}>PUBG</td>
                          <td colSpan={2}>33</td>
                          <td>
                            <button className='not-a-button'  onClick={()=>{openDeleteDialog(TITLE_ADMIN_MATCHES_RESULTS, "/api/tournament-results/delete", "")}}>
                              <FontAwesomeIcon icon={faTrashCan} style={{color:"#df4646"}}/>
                            </button>
                          </td>
                        </tr>
                      </thead>

                      <tbody className={styles.accordian_body}>

                        <tr>
                          <th colSpan={2}>Player</th>
                          <th>Score</th>
                          <th>Map Score 1</th>
                          <th>Map Score 2</th>
                          <th>Map Score 3</th>
                          <th>Map Score 4</th>
                          <th>Map Score 5</th>
                          <th>Video</th>
                          <th>Win/Loss</th>
                        </tr>

                        <tr>
                          <td colSpan={2}>Bravo 3</td>
                          <td>500</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>
                            <Image src={ images.USER } alt="..." width={50} height={50} />
                          </td>
                          <td>
                            <button className={`${tableStyles.Win} ${tableStyles.left}`}>
                              <span>Win</span>
                            </button>
                          </td>
                        </tr>

                        <tr>
                          <td colSpan={2}>Bravo 3</td>
                          <td>500</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>
                            <Image src={ images.USER } alt="..." width={50} height={50} />
                          </td>
                          <td>
                            <button className={`${tableStyles.Loss} ${tableStyles.left}`}>
                              <span>Loss</span>
                            </button>
                          </td>
                        </tr>

                      </tbody>

                    </table>

                  </div>

                </td>
              </tr>

              <tr>
                <td colSpan={10} className={`${styles.accordian}`}>

                  <div className={`${tableStyles.table} ${styles.table}`}>

                    <table>

                      <thead>
                        <tr>
                          <td><input type="checkbox" name="selection-box" value={3} onChange={select_individual} /></td>
                          <td colSpan={2} className={styles.open_btn}>
                            <Link href="#" onClick={toggleAccordian}>
                              <FontAwesomeIcon icon={faAngleDown}/>Click Me
                            </Link>
                          </td>
                          <td colSpan={2}>G.Team2</td>
                          <td colSpan={2}>PUBG</td>
                          <td colSpan={2}>33</td>
                          <td>
                            <button className='not-a-button'  onClick={()=>{openDeleteDialog(TITLE_ADMIN_MATCHES_RESULTS, "/api/tournament-results/delete", "")}}>
                              <FontAwesomeIcon icon={faTrashCan} style={{color:"#df4646"}}/>
                            </button>
                          </td>
                        </tr>
                      </thead>

                      <tbody className={styles.accordian_body}>

                        <tr>
                          <th colSpan={2}>Player</th>
                          <th>Score</th>
                          <th>Map Score 1</th>
                          <th>Map Score 2</th>
                          <th>Map Score 3</th>
                          <th>Map Score 4</th>
                          <th>Map Score 5</th>
                          <th>Video</th>
                          <th>Win/Loss</th>
                        </tr>

                        <tr>
                          <td colSpan={2}>Bravo 3</td>
                          <td>500</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>
                            <Image src={ images.USER } alt="..." width={50} height={50} />
                          </td>
                          <td>
                            <button className={`${tableStyles.Win} ${tableStyles.left}`}>
                              <span>Win</span>
                            </button>
                          </td>
                        </tr>

                        <tr>
                          <td colSpan={2}>Bravo 3</td>
                          <td>500</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>
                            <Image src={ images.USER } alt="..." width={50} height={50} />
                          </td>
                          <td>
                            <button className={`${tableStyles.Loss} ${tableStyles.left}`}>
                              <span>Loss</span>
                            </button>
                          </td>
                        </tr>

                      </tbody>

                    </table>

                  </div>

                </td>
              </tr>
              
              <tr>
                <td colSpan={10} className={`${styles.accordian}`}>

                  <div className={`${tableStyles.table} ${styles.table}`}>

                    <table>

                      <thead>
                        <tr>
                          <td><input type="checkbox" name="selection-box" value={4} onChange={select_individual} /></td>
                          <td colSpan={2} className={styles.open_btn}>
                            <Link href="#" onClick={toggleAccordian}>
                              <FontAwesomeIcon icon={faAngleDown}/>Click Me
                            </Link>
                          </td>
                          <td colSpan={2}>G.Team2</td>
                          <td colSpan={2}>PUBG</td>
                          <td colSpan={2}>33</td>
                          <td>
                            <button className='not-a-button' onClick={()=>{openDeleteDialog(TITLE_ADMIN_MATCHES_RESULTS, "/api/tournament-results/delete", "")}}>
                              <FontAwesomeIcon icon={faTrashCan} style={{color:"#df4646"}}/>
                            </button>
                          </td>
                        </tr>
                      </thead>

                      <tbody className={styles.accordian_body}>

                        <tr>
                          <th colSpan={2}>Player</th>
                          <th>Score</th>
                          <th>Map Score 1</th>
                          <th>Map Score 2</th>
                          <th>Map Score 3</th>
                          <th>Map Score 4</th>
                          <th>Map Score 5</th>
                          <th>Video</th>
                          <th>Win/Loss</th>
                        </tr>

                        <tr>
                          <td colSpan={2}>Bravo 3</td>
                          <td>500</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>
                            <Image src={ images.USER } alt="..." width={50} height={50} />
                          </td>
                          <td>
                            <button className={`${tableStyles.Win} ${tableStyles.left}`}>
                              <span>Win</span>
                            </button>
                          </td>
                        </tr>

                        <tr>
                          <td colSpan={2}>Bravo 3</td>
                          <td>500</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          <td>
                            <Image src={ images.USER } alt="..." width={50} height={50} />
                          </td>
                          <td>
                            <button className={`${tableStyles.Loss} ${tableStyles.left}`}>
                              <span>Loss</span>
                            </button>
                          </td>
                        </tr>

                      </tbody>

                    </table>

                  </div>

                </td>
              </tr>

            </tbody>

          </table>

        </div>


        <Pagination start={0} end={0} total={0} />

      </div>

    </>

  )

}


export default MatchesResults;
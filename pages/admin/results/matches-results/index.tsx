import React from 'react'
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
import { faAngleDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TITLE_ADMIN_MATCHES_RESULTS } from '@/constants/page-titles';


const MatchesResults = (props:any) => {

  return (
    
    <>
    
      <Navbar index={11} />

      <title>{TITLE_ADMIN_MATCHES_RESULTS}</title>

      <div className="container">

        <NameAndExportData url="/api/matches-results/download-record" title="Matches Results" />
        <SearchBar url="/api/matches-results/search" addBtn={false} deleteDialog={DIALOG_CONFIRMATION} />

        <div className="table">

          <table>

            <thead>

              <tr>
                <th><input type="checkbox" /></th>
                <th>Show Nested Result</th>
                <th colSpan={2}>Match</th>
                <th colSpan={2}>Game</th>
                <th colSpan={2}>Winner</th>
                <th>Actions</th>
              </tr>

            </thead>



            <thead className={styles.nested_heading}>
              
              <tr>
                <th><input type="checkbox" /></th>
                <th><Link href="#" onClick={()=>{}}><FontAwesomeIcon icon={faAngleDown}/> Click Me</Link></th>
                <th colSpan={2}>G.Team2</th>
                <th colSpan={2}>PUBG</th>
                <th colSpan={2}>33</th>
                <th><FontAwesomeIcon icon={faTrash}/></th>
              </tr>

            </thead>

            <tbody className={`${styles.tbody} ${styles.nested_elems}`}>

              <tr>
                <th>Player</th>
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
                <td>Bravo 3</td>
                <td>500</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td><Image src={ images.USER } alt="..." width={50} height={50} /></td>
                <td><button className="win">Win</button></td>
              </tr>

              <tr>
                <td>Bravo 3</td>
                <td>500</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td><Image src={ images.USER } alt="..." width={50} height={50} /></td>
                <td><button className="win">Win</button></td>
              </tr>

            </tbody>



            <thead className={styles.nested_heading}>
              
              <tr>
                <th><input type="checkbox" /></th>
                <th><Link href="#" onClick={()=>{}}><FontAwesomeIcon icon={faAngleDown}/> Click Me</Link></th>
                <th colSpan={2}>G.Team2</th>
                <th colSpan={2}>PUBG</th>
                <th colSpan={2}>33</th>
                <th><FontAwesomeIcon icon={faTrash}/></th>
              </tr>

            </thead>

            <tbody className={`${styles.tbody} ${styles.nested_elems}`}>

              <tr>
                <th>Player</th>
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
                <td>Bravo 3</td>
                <td>500</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td><Image src={ images.USER } alt="..." width={50} height={50} /></td>
                <td><button className="win">Win</button></td>
              </tr>

              <tr>
                <td>Bravo 3</td>
                <td>500</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td><Image src={ images.USER } alt="..." width={50} height={50} /></td>
                <td><button className="win">Win</button></td>
              </tr>

            </tbody>



            <thead className={styles.nested_heading}>

              <tr>
                <th><input type="checkbox" /></th>
                <th><Link href="#" onClick={()=>{}}><FontAwesomeIcon icon={faAngleDown}/> Click Me</Link></th>
                <th colSpan={2}>G.Team2</th>
                <th colSpan={2}>PUBG</th>
                <th colSpan={2}>33</th>
                <th><FontAwesomeIcon icon={faTrash}/></th>
              </tr>

            </thead>

            <tbody className={`${styles.tbody} ${styles.nested_elems}`}>

              <tr>
                <th>Player</th>
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
                <td>Bravo 3</td>
                <td>500</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td><Image src={ images.USER } alt="..." width={50} height={50} /></td>
                <td><button className="win">Win</button></td>
              </tr>

              <tr>
                <td>Bravo 3</td>
                <td>500</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td><Image src={ images.USER } alt="..." width={50} height={50} /></td>
                <td><button className="win">Win</button></td>
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
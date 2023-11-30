import React from 'react'
import styles from "./TotalWarLadderResults.module.css"

import images from "@/constants/images" 
import Navbar from '@/Components/Navbar/Navbar';
import { NameAndExportData } from '@/Components/NameAndExportData/NameAndExportData';
import { SearchBar } from '@/Components/SearchBar/SearchBar';
import { Pagination } from '@/Components/Pagination/Pagination';
import { DIALOG_CONFIRMATION } from '@/constants/dialog-names';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { TITLE_ADMIN_TOTAL_WAR_LADDER_RESULTS } from '@/constants/page-titles';


const TotalWarLadderResults = (props:any) => {

  return (
    
    <>
    
      <Navbar index={10} />

      <title>{TITLE_ADMIN_TOTAL_WAR_LADDER_RESULTS}</title>

      <div className="container">

        <NameAndExportData url="/api/total-war-ladder-results/download-record" title="Total War Ladder Results" />
        <SearchBar url="/api/total-war-ladder-results/search" addBtn={false} deleteDialog={DIALOG_CONFIRMATION} />

        <div className="table">

          <table className={styles.table}>

            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>User/Team</th>
                <th>Game</th>
                <th>Tournament</th>
                <th>Score</th>
                <th>Video/Image</th>
                <th>Win/Loss</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td><input type="checkbox" /></td>
                <td>XYZ</td>
                <td>Call of Duty</td>
                <td>Call of Duty Championship</td>
                <td>33</td>
                <td><Image src={ images.USER } alt="" width={50} height={50} /></td>
                <td className={styles.Win}><span>Win</span></td>
                <td>
                  <button><FontAwesomeIcon icon={faTrashCan} style={{color: "#df4646"}}/></button>
                </td>
              </tr>

              <tr>
                <td><input type="checkbox" /></td>
                <td>XYZ</td>
                <td>Call of Duty</td>
                <td>Call of Duty Championship</td>
                <td>33</td>
                <td><Image src={ images.USER } alt="" width={50} height={50} /></td>
                <td className={styles.Loss}><span>Loss</span></td>
                <td>
                  <button><FontAwesomeIcon icon={faTrashCan} style={{color: "#df4646"}}/></button>
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


export default TotalWarLadderResults;
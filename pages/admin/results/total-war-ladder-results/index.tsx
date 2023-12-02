import React from 'react'
import tableStyles from "@/styles/pagesTables.module.css";

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
import { openDeleteDialog, select_all, select_individual } from '@/utils/general';


const TotalWarLadderResults = (props:any) => {

  return (
    
    <>
    
      <Navbar index={10} />

      <title>{TITLE_ADMIN_TOTAL_WAR_LADDER_RESULTS}</title>

      <div className={tableStyles.container}>

        <NameAndExportData url="/api/total-war-ladder-results/download-record" title="Total War Ladder Results" />
        <SearchBar url="/api/total-war-ladder-results/search" addBtn={false} deleteDialog={DIALOG_CONFIRMATION} />

        <div className={tableStyles.table}>

          <table className={tableStyles.table}>

            <thead>
              <tr>
                <th><input type="checkbox" name="select_all" onChange={ select_all } /></th>
                <th>Ladder</th>
                <th>Team</th>
                <th>Game</th>
                <th>Score</th>
                <th className={tableStyles.center}>Video/Image</th>
                <th>Win/Loss</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td><input type="checkbox" name="selection-box" value={1} onChange={select_individual} /></td>
                <td>XYZ</td>
                <td>Call of Duty Championship</td>
                <td>Call of Duty</td>
                <td>33</td>
                <td className={tableStyles.center}>
                  <Image src={ images.USER } alt="" width={50} height={50} />
                </td>
                <td className={tableStyles.Win}>
                  <span>Win</span>
                </td>
                <td>
                  <button className='not-a-button' onClick={()=>{openDeleteDialog(TITLE_ADMIN_TOTAL_WAR_LADDER_RESULTS, "/api/tournament-results/delete", "")}}>
                    <FontAwesomeIcon icon={faTrashCan} style={{color: "#df4646"}}/>
                  </button>
                </td>
              </tr>

              <tr>
                <td><input type="checkbox" name="selection-box" value={2} onChange={select_individual} /></td>
                <td>XYZ</td>
                <td>Call of Duty Championship</td>
                <td>Call of Duty</td>
                <td>33</td>
                <td className={tableStyles.center}>
                  <Image src={ images.USER } alt="" width={50} height={50} />
                </td>
                <td className={tableStyles.Loss}>
                  <span>Loss</span>
                </td>
                <td>
                  <button className='not-a-button' onClick={()=>{openDeleteDialog(TITLE_ADMIN_TOTAL_WAR_LADDER_RESULTS, "/api/tournament-results/delete", "")}}>
                    <FontAwesomeIcon icon={faTrashCan} style={{color: "#df4646"}}/>
                  </button>
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
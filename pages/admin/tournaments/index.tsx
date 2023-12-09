import React from 'react'
import tableStyles from "@/styles/pagesTables.module.css";

import images from "@/constants/images";
import Navbar from '@/Components/Navbar/Navbar'
import { NameAndExportData } from '@/Components/NameAndExportData/NameAndExportData'
import { SearchBar } from '@/Components/SearchBar/SearchBar'
import { Pagination } from '@/Components/Pagination/Pagination'
import { DIALOG_ADD_TOURNAMENTS, DIALOG_CONFIRMATION, DIALOG_UPDATE_TOURNAMENTS } from '@/constants/dialog-names'
import Image from 'next/image';
import { TITLE_ADMIN_TOURNAMENTS } from '@/constants/page-titles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { openDeleteDialog, openEditDialog, select_all, select_individual } from '@/utils/general';


const Tournaments = (props:any) => {

  return (
    
    <>

      {/* <button>All</button>
      <button>General</button>
      <button>Grand Prix</button> */}

      <Navbar index={6} />

      <title>{TITLE_ADMIN_TOURNAMENTS}</title>

      <div className={tableStyles.container}>

        <NameAndExportData url="/api/tournaments/download-record" title="Tournaments" />
        <SearchBar url="/api/tournaments/search" addDialog={DIALOG_ADD_TOURNAMENTS} deleteDialog={DIALOG_CONFIRMATION} />

        <div className={tableStyles.table}>

          <table>

            <thead>
              <tr>
                <th><input type="checkbox" name="select_all" onChange={ select_all } /></th>
                <th>Tournament</th>
                <th>Category</th>
                <th>Game</th>
                <th>Picture</th>
                <th>Entry Fee</th>
                <th>Prize</th>
                <th>Team Size</th>
                <th>Total Teams</th>
                <th>Start Date & Time</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td><input type="checkbox" name="selection-box" value={1} onChange={select_individual} /></td>
                <td>Call of Duty 5*5 tournament</td>
                <td>General</td>
                <td>Call of Duty</td>
                <td className="td-pic"><Image src={ images.USER } alt="" width={50} height={50} /></td>
                <td>$500</td>
                <td>$500</td>
                <td>06</td>
                <td>04</td>
                <td>2022-02-13,06:30AM</td>
                <td>
                  <button className='not-a-button' onClick={()=>{openEditDialog(DIALOG_UPDATE_TOURNAMENTS, "", "/api/gp-league/show")}}>
                    <FontAwesomeIcon icon={faPen} style={{color: "#89bfeb"}} />
                  </button>
                  <button className='not-a-button' onClick={()=>{openDeleteDialog(TITLE_ADMIN_TOURNAMENTS, "/api/gp-league/delete", "")}}>
                    <FontAwesomeIcon icon={faTrashCan} style={{color: "#df4646"}}/>
                  </button>
                </td>
              </tr>

              <tr>
                <td><input type="checkbox" name="selection-box" value={2} onChange={select_individual} /></td>
                <td>PUBG ThunderStorm</td>
                <td>Grand Prix</td>
                <td>PUBG</td>
                <td className="td-pic"><Image src={ images.USER } alt="" width={50} height={50} /></td>
                <td>$500</td>
                <td>$500</td>
                <td>02</td>
                <td>02</td>
                <td>2023-02-13,10:30AM</td>
                <td>
                  <button className='not-a-button' onClick={()=>{openEditDialog(DIALOG_UPDATE_TOURNAMENTS, "", "/api/gp-league/show")}}>
                    <FontAwesomeIcon icon={faPen} style={{color: "#89bfeb"}}/>
                  </button>
                  <button className='not-a-button' onClick={()=>{openDeleteDialog(TITLE_ADMIN_TOURNAMENTS, "/api/gp-league/delete", "")}}>
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


export default Tournaments;
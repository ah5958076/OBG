import React from 'react'
import tableStyles from "@/styles/pagesTables.module.css";

import { SearchBar } from '@/Components/SearchBar/SearchBar'
import { Pagination } from '@/Components/Pagination/Pagination'
import Navbar from '@/Components/Navbar/Navbar'
import { NameAndExportData } from '@/Components/NameAndExportData/NameAndExportData'
import { DIALOG_ADD_USERS, DIALOG_CONFIRMATION, DIALOG_UPDATE_USERS } from '@/constants/dialog-names'
import { TITLE_ADMIN_USERS } from '@/constants/page-titles'
import { openDeleteDialog, openEditDialog, select_all, select_individual } from '@/utils/general';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faMedal, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { fetchGrandPrixforEditDialog } from '@/utils/fantasyLeagues';


const Users = () => {

  return (

    <>

      <Navbar index={4} />

      <title>{TITLE_ADMIN_USERS}</title>

      <div className={tableStyles.container}>
        
        <NameAndExportData url="/api/users/download-record" title="Users" />
        <SearchBar url="/api/users/search" addDialog={DIALOG_ADD_USERS} deleteDialog={DIALOG_CONFIRMATION} />

        <div className={tableStyles.table}>
          <table>

            <thead>
              <tr>
                <th><input type="checkbox" name="select_all" onChange={ select_all } /></th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Credits</th>
                <th>Matches</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Win %</th>
                <th>About</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>


            <tbody>

              <tr>
                <td><input type="checkbox" name="selection-box" value={1} onChange={select_individual}/></td>
                <td>Name</td>
                <td>Username</td>
                <td>Email</td>
                <td>Credits</td>
                <td>Matches</td>
                <td>Wins</td>
                <td>Losses</td>
                <td>Win %</td>
                <td>About</td>
                <td>Status</td>
                <td>
                  <button className='not-a-button' onClick={()=>{openDeleteDialog(TITLE_ADMIN_USERS, "/api/users/delete", "")}}>
                    <FontAwesomeIcon icon={faMedal} rotation={180} style={{color: "var(--site-clr)"}}/>
                  </button>
                  <button className='not-a-button' onClick={()=>{fetchGrandPrixforEditDialog("")}}>
                    <FontAwesomeIcon icon={faEye} style={{color: "#89bfeb"}}/>
                  </button>
                  <button className='not-a-button' onClick={()=>{openEditDialog(DIALOG_UPDATE_USERS, "", "/api/users/show")}}>
                    <FontAwesomeIcon icon={faPen} style={{color: "#89bfeb"}}/>
                  </button>
                  <button className='not-a-button' onClick={()=>{openDeleteDialog(TITLE_ADMIN_USERS, "/api/users/delete", "")}}>
                    <FontAwesomeIcon icon={faTrashCan} style={{color: "#df4646"}}/>
                  </button>
                </td>
              </tr>
              
              <tr>
                <td><input type="checkbox" name="selection-box" value={1} onChange={select_individual}/></td>
                <td>Name</td>
                <td>Username</td>
                <td>Email</td>
                <td>Credits</td>
                <td>Matches</td>
                <td>Wins</td>
                <td>Losses</td>
                <td>Win %</td>
                <td>About</td>
                <td>Status</td>
                <td>
                  <button className='not-a-button' onClick={()=>{openDeleteDialog(TITLE_ADMIN_USERS, "/api/users/delete", "")}}>
                    <FontAwesomeIcon icon={faMedal} rotation={180} style={{color: "var(--site-clr)"}}/>
                  </button>
                  <button className='not-a-button' onClick={()=>{fetchGrandPrixforEditDialog("")}}>
                    <FontAwesomeIcon icon={faEye} style={{color: "#89bfeb"}}/>
                  </button>
                  <button className='not-a-button' onClick={()=>{openEditDialog(DIALOG_UPDATE_USERS, "", "/api/users/show")}}>
                    <FontAwesomeIcon icon={faPen} style={{color: "#89bfeb"}}/>
                  </button>
                  <button className='not-a-button' onClick={()=>{openDeleteDialog(TITLE_ADMIN_USERS, "/api/users/delete", "")}}>
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


export default Users;
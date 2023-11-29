import React from 'react'

import images from "@/constants/images"
import Navbar from '@/Components/Navbar/Navbar'
import { NameAndExportData } from '@/Components/NameAndExportData/NameAndExportData'
import { SearchBar } from '@/Components/SearchBar/SearchBar'
import { Pagination } from '@/Components/Pagination/Pagination'
import { DIALOG_CONFIRMATION } from '@/constants/dialog-names'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'


const TournamentsResults = (props:any) => {
  
  return (
    
    // <button>All</button>
    //   <button>General</button>
    //   <button>Grand Prix</button>

    <>
    
      <Navbar index={9} />

      <title>{props.title}</title>
      
      <div className="container">

        <NameAndExportData url="/api/tournament-results/download-record" title="Tournament Results" />
        <SearchBar url="/api/tournament-results/search" addBtn={false} deleteDialog={DIALOG_CONFIRMATION} />

        <div className="table">

          <table>

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
                <td className="Win">
                  <span>Win</span>
                  <button><FontAwesomeIcon icon={faPen} style={{color: "#89bfeb"}}/></button>
                </td>
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
                <td className="Loss">
                  <span>Loss</span>
                  <button><FontAwesomeIcon icon={faPen} style={{color: "#89bfeb"}}/></button>
                </td>
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

export default TournamentsResults;
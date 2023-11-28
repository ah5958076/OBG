import React from 'react'

import RANDOM_IMAGE from "../../assets/user.jpg"
import { Navbar } from '../../../../Components/Navbar/Navbar'
import { NameAndExportData } from '../../../../Components/NameAndExportData/NameAndExportData'
import { SearchBar } from '../../../../Components/SearchBar/SearchBar'
import { Pagination } from '../../../../Components/Pagination/Pagination'
import { DIALOG_CONFIRMATION } from '../../../../constants/constants'
import Image from 'next/image'


export const TournamentsResults = (props:any) => {
  
  return (
    
    // <button>All</button>
    //   <button>General</button>
    //   <button>Grand Prix</button>

    <>
    
      <Navbar index={9} />

      <title>{props.title}</title>
      
      <div className="container">

        <NameAndExportData title="Tournament Results" />
        <SearchBar addBtn={false} deleteDialog={DIALOG_CONFIRMATION} />

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
                <td><Image src={ RANDOM_IMAGE } alt="" /></td>
                <td className="Win">
                  <span>Win</span>
                  <button><i className="fa-solid fa-pen" style={{color: "#89bfeb"}}></i></button>
                </td>
                <td>
                  <button><i className="fa-solid fa-trash-can" style={{color: "#df4646"}}></i></button>
                </td>
              </tr>

              <tr>
                <td><input type="checkbox" /></td>
                <td>XYZ</td>
                <td>Call of Duty</td>
                <td>Call of Duty Championship</td>
                <td>33</td>
                <td><Image src={ RANDOM_IMAGE } alt="" /></td>
                <td className="Loss">
                  <span>Loss</span>
                  <button><i className="fa-solid fa-pen" style={{color: "#89bfeb"}}></i></button>
                </td>
                <td>
                  <button><i className="fa-solid fa-trash-can" style={{color: "#df4646"}}></i></button>
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


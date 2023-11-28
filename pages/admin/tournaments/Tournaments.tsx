import React from 'react'

import RANDOM_IMAGE from "../../assets/user.jpg";
import { Navbar } from '../../../../Components/Navbar/Navbar'
import { NameAndExportData } from '../../../../Components/NameAndExportData/NameAndExportData'
import { SearchBar } from '../../../../Components/SearchBar/SearchBar'
import { Pagination } from '../../../../Components/Pagination/Pagination'
import { DIALOG_ADD_TOURNAMENTS, DIALOG_CONFIRMATION } from '../../../../constants/constants'
import Image from 'next/image';


export const Tournaments = (props:any) => {

  return (
    
    <>

      {/* <button>All</button>
      <button>General</button>
      <button>Grand Prix</button> */}

      <Navbar index={6} />

      <title>{props.title}</title>

      <div className="container">

        <NameAndExportData title="Tournaments" />
        <SearchBar addDialog={DIALOG_ADD_TOURNAMENTS} deleteDialog={DIALOG_CONFIRMATION} />

        <div className="table">

          <table>

            <thead>
              <tr>
                <th><input type="checkbox" /></th>
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
                <td><input type="checkbox" /></td>
                <td>Call of Duty 5*5 tournament</td>
                <td>General</td>
                <td>Call of Duty</td>
                <td className="td-pic"><Image src={ RANDOM_IMAGE } alt="" /></td>
                <td>$500</td>
                <td>$500</td>
                <td>06</td>
                <td>04</td>
                <td>2022-02-13,06:30AM</td>
                <td>
                  <button><i className="fa-solid fa-pen" style={{color: "#89bfeb"}}></i></button>
                  <button><i className="fa-solid fa-trash-can" style={{color: "#df4646"}}></i></button>
                </td>
              </tr>

              <tr>
                <td><input type="checkbox" /></td>
                <td>PUBG ThunderStorm</td>
                <td>Grand Prix</td>
                <td>PUBG</td>
                <td className="td-pic"><Image src={ RANDOM_IMAGE } alt="" /></td>
                <td>$500</td>
                <td>$500</td>
                <td>02</td>
                <td>02</td>
                <td>2023-02-13,10:30AM</td>
                <td>
                  <button title="Edit"><i className="fa-solid fa-pen" style={{color: "#89bfeb"}}></i></button>
                  <button title="Delete"><i className="fa-solid fa-trash-can" style={{color: "#df4646"}}></i></button>
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
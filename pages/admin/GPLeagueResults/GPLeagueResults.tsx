import React from 'react'
import "./GPLeagueResults.css"

import RANDOM_IMAGE from "../../assets/user.jpg";
import { Navbar } from '../../../../Components/Navbar/Navbar'
import { NameAndExportData } from '../../../../Components/NameAndExportData/NameAndExportData'
import { SearchBar } from '../../../../Components/SearchBar/SearchBar'
import { Pagination } from '../../../../Components/Pagination/Pagination'
import { DIALOG_CONFIRMATION } from '../../../../constants/constants';
import Image from 'next/image';


export const GPLeagueResults = (props:any) => {

  return (
    
    <>

      <Navbar index={12} />

      <title>{props.title}</title>

      <div className="container">

        <NameAndExportData title="GP League Results" />
        <SearchBar addBtn={false} deleteDialog={DIALOG_CONFIRMATION} />

        <div className="table">

          <table>

            <thead>

              <tr>
                <th><input type="checkbox" /></th>
                <th>League</th>
                <th>Game</th>
                <th>Team</th>
                <th>Score</th>
                <th>Video/Image</th>
                <th>Total Points(Kill+Place)</th>
                <th>Results</th>
              </tr>
              
            </thead>


            <tbody>
              
              <tr>
                <td><input type="checkbox" /></td>
                <td>XYZ</td>
                <td>Call of Duty</td>
                <td>Team4</td>
                <td>33</td>
                <td><Image src={ RANDOM_IMAGE } alt="" /></td>
                <td>71</td>
                <td className="Win">
                  <span>Win</span>
                  <button><i className="fa-solid fa-pen" style={{color:"#89bfeb"}}></i></button>
                </td>

              </tr>

              <tr>
                <td><input type="checkbox" /></td>
                <td>XYZ</td>
                <td>Call of Duty</td>
                <td>Team4</td>
                <td>33</td>
                <td><Image src={ RANDOM_IMAGE } alt="" /></td>
                <td>71</td>
                <td className="Win">
                  <span>Win</span>
                  <span style={{backgroundColor:"#610000"}}>Loss</span>
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
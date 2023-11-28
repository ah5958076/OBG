import React from 'react'
import "./MatchesResults.css"

import RANDOM_IMAGE from "../../assets/user.jpg";
import { Navbar } from '../../../../Components/Navbar/Navbar'
import { NameAndExportData } from '../../../../Components/NameAndExportData/NameAndExportData'
import { Pagination } from '../../../../Components/Pagination/Pagination'
import { SearchBar } from '../../../../Components/SearchBar/SearchBar';
import { DIALOG_CONFIRMATION } from '../../../../constants/constants';
import Link from 'next/link';
import Image from 'next/image';


export const MatchesResults = (props:any) => {

  return (
    
    <>
    
      <Navbar index={11} />

      <title>{props.title}</title>

      <div className="container">

        <NameAndExportData title="Matches Results" />
        <SearchBar addBtn={false} deleteDialog={DIALOG_CONFIRMATION} />

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



            <thead className="nested-heading">
              
              <tr>
                <th><input type="checkbox" /></th>
                <th><Link href="#" onClick={()=>{}}><i className="fa-solid fa-angle-down"></i> Click Me</Link></th>
                <th colSpan={2}>G.Team2</th>
                <th colSpan={2}>PUBG</th>
                <th colSpan={2}>33</th>
                <th><i className="fa-solid fa-trash"></i></th>
              </tr>

            </thead>

            <tbody className="nested-elems">

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
                <td><Image src={ RANDOM_IMAGE } alt="..." /></td>
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
                <td><Image src={ RANDOM_IMAGE } alt="..." /></td>
                <td><button className="win">Win</button></td>
              </tr>

            </tbody>



            <thead className="nested-heading">
              
              <tr>
                <th><input type="checkbox" /></th>
                <th><button onClick={()=>{}}><i className="fa-solid fa-angle-down"></i> Click Me</button></th>
                <th colSpan={2}>G.Team2</th>
                <th colSpan={2}>PUBG</th>
                <th colSpan={2}>33</th>
                <th><i className="fa-solid fa-trash"></i></th>
              </tr>

            </thead>

            <tbody className="nested-elems">

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
                <td><Image src={ RANDOM_IMAGE } alt="..." /></td>
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
                <td><Image src={ RANDOM_IMAGE } alt="..." /></td>
                <td><button className="win">Win</button></td>
              </tr>

            </tbody>



            <thead className="nested-heading">

              <tr>
                <th><input type="checkbox" /></th>
                <th><button onClick={()=>{}}><i className="fa-solid fa-angle-down"></i> Click Me</button></th>
                <th colSpan={2}>G.Team2</th>
                <th colSpan={2}>PUBG</th>
                <th colSpan={2}>33</th>
                <th><i className="fa-solid fa-trash"></i></th>
              </tr>

            </thead>

            <tbody className="nested-elems">

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
                <td><Image src={ RANDOM_IMAGE } alt="..." /></td>
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
                <td><Image src={ RANDOM_IMAGE } alt="..." /></td>
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
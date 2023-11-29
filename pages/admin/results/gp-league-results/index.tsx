import React from 'react'
import styles from "./GPLeagueResults.module.css";

import images from "@/constants/images";
import Navbar from '@/Components/Navbar/Navbar'
import { NameAndExportData } from '@/Components/NameAndExportData/NameAndExportData'
import { SearchBar } from '@/Components/SearchBar/SearchBar'
import { Pagination } from '@/Components/Pagination/Pagination'
import { DIALOG_CONFIRMATION } from '@/constants/dialog-names';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';


const GPLeagueResults = (props:any) => {

  return (
    
    <>

      <Navbar index={12} />

      <title>{props.title}</title>

      <div className="container">

        <NameAndExportData url="/api/gp-leagues-results/download-record" title="GP League Results" />
        <SearchBar url="/api/gp-leagues-results/search" addBtn={false} deleteDialog={DIALOG_CONFIRMATION} />

        <div className="table">

          <table className={styles.table}>

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
                <td><Image src={ images.USER } alt="" width={50} height={50} /></td>
                <td>71</td>
                <td className={styles.Win}>
                  <span>Win</span>
                  <button><FontAwesomeIcon icon={faPen} style={{color:"#89bfeb"}} /></button>
                </td>

              </tr>

              <tr>
                <td><input type="checkbox" /></td>
                <td>XYZ</td>
                <td>Call of Duty</td>
                <td>Team4</td>
                <td>33</td>
                <td><Image src={ images.USER } alt="" width={50} height={50} /></td>
                <td>71</td>
                <td className={styles.Win}>
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


export default GPLeagueResults;
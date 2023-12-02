import React from 'react'
import tableStyles from "@/styles/pagesTables.module.css"; 

import images from "@/constants/images";
import Navbar from '@/Components/Navbar/Navbar'
import { NameAndExportData } from '@/Components/NameAndExportData/NameAndExportData'
import { SearchBar } from '@/Components/SearchBar/SearchBar'
import { Pagination } from '@/Components/Pagination/Pagination'
import { DIALOG_CONFIRMATION } from '@/constants/dialog-names';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { TITLE_ADMIN_GP_LEAGUE_RESULTS } from '@/constants/page-titles';
import { select_all, select_individual } from '@/utils/general';


const GPLeagueResults = () => {

  return (
    
    <>

      <Navbar index={12} />

      <title>{TITLE_ADMIN_GP_LEAGUE_RESULTS}</title>

      <div className={tableStyles.container}>

        <NameAndExportData url="/api/gp-leagues-results/download-record" title="GP League Results" />
        <SearchBar url="/api/gp-leagues-results/search" addBtn={false} deleteDialog={DIALOG_CONFIRMATION} />

        <div className={tableStyles.table}>

          <table>

            <thead>

              <tr>
                <th><input type="checkbox" name="select_all" onChange={ select_all } /></th>
                <th>League</th>
                <th>Game</th>
                <th>Team</th>
                <th>Score</th>
                <th>Video/Image</th>
                <th>Total Points(Kill+Place)</th>
                <th colSpan={2}>Results</th>
              </tr>
              
            </thead>


            <tbody>
              
              <tr>
                <td><input type="checkbox" name="selection-box" value={1} onChange={select_individual} /></td>
                <td>XYZ</td>
                <td>Call of Duty</td>
                <td>Team4</td>
                <td>33</td>
                <td>
                  <Image src={ images.USER } alt="" width={50} height={50} />
                </td>
                <td>71</td>
                <td className={tableStyles.Win} style={{width:"60px"}}>
                  <span>Win</span>
                </td>
                <td>
                  <button className='not-a-button'>
                    <FontAwesomeIcon icon={faPen} style={{color:"#89bfeb"}} />
                  </button>
                </td>

              </tr>

              <tr>
                <td><input type="checkbox" name="selection-box" value={2} onChange={select_individual} /></td>
                <td>XYZ</td>
                <td>Call of Duty</td>
                <td>Team4</td>
                <td>33</td>
                <td><Image src={ images.USER } alt="" width={50} height={50} /></td>
                <td>71</td>
                <td className={tableStyles.Win} style={{width:"60px"}}>
                  <span>Win</span>
                </td>
                <td className={tableStyles.Loss}>
                  <span>Loss</span>
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
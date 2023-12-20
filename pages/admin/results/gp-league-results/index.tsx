import React, { useEffect } from 'react'
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
import { getRequest, navigateTo, select_all, select_individual } from '@/utils/general';
import { useSelector } from 'react-redux';
import store from '@/Redux/store';
import { isLoading } from '@/Redux/actions/loader';
import { ADMIN_GPLEAGUE_RESULTS_LIST_ROUTE } from '@/constants/backend-routes';
import { setLoadedData } from '@/Redux/actions/pagination';
import { UNAUTHORIZED } from '@/constants/constants';
import { ROUTE_SIGNIN } from '@/constants/routes';
import { toast } from 'react-toastify';


const GPLeagueResults = () => {
  const data = useSelector((state: any) => { return state.pagination.title === TITLE_ADMIN_GP_LEAGUE_RESULTS ? state.pagination : null });

  useEffect(() => {
    if (!data?.data) {
      store.dispatch(isLoading(true));
      getRequest(`${ADMIN_GPLEAGUE_RESULTS_LIST_ROUTE}?page_num=${data ? data.page_num : 1}`).then((response: any) => {
          store.dispatch(setLoadedData(ADMIN_GPLEAGUE_RESULTS_LIST_ROUTE, response?.data?.result, data?data.page_num : 1));
          store.dispatch(isLoading(false));
      }).catch((err: any) => {
        if(err?.status===UNAUTHORIZED){
          localStorage.removeItem("token");
          navigateTo(null, ROUTE_SIGNIN);
        }
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false));
      });
    }
  }, [data]);


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
                <th><input type="checkbox" name="select_all" onChange={select_all} /></th>
                <th>League</th>
                <th>Game</th>
                <th>Team</th>
                <th>Score</th>
                <th>Video/Image</th>
                <th>Total Points(Kill+Place)</th>
                <th  >Results</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" name="selection-box" value={1} onChange={select_individual} /></td>
                <td>XYZ</td>
                <td>Call of Duty</td>
                <td>Team4</td>
                <td>33</td>
                <td className={tableStyles.imgCenter}>
                  <Image src={images.USER} alt="" width={50} height={50} />
                </td>
                <td>71</td>
                <td className={`${tableStyles.Win} `}  >
                  <div className='flex justify-center'>
                    <span className='mr-2'>Win</span>
                    <a className='not-a-button'>
                      <FontAwesomeIcon icon={faPen} style={{ color: "#89bfeb" }} />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" name="selection-box" value={1} onChange={select_individual} /></td>
                <td>XYZ</td>
                <td>Call of Duty</td>
                <td>Team4</td>
                <td>33</td>
                <td className={tableStyles.imgCenter}>
                  <Image src={images.USER} alt="" width={50} height={50} />
                </td>
                <td>71</td>
                <td className={`${tableStyles.Win} `}  >
                  <div className='flex justify-center'>
                    <span className='mr-2'>Win</span>
                    <a className='not-a-button'>
                      <FontAwesomeIcon icon={faPen} style={{ color: "#89bfeb" }} />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" name="selection-box" value={1} onChange={select_individual} /></td>
                <td>XYZ</td>
                <td>Call of Duty</td>
                <td>Team4</td>
                <td>33</td>
                <td className={tableStyles.imgCenter}>
                  <Image src={images.USER} alt="" width={50} height={50} />
                </td>
                <td>71</td>
                <td className={`${tableStyles.Win} `}  >
                  <div className='flex justify-center'>
                    <span className='mr-2'>Win</span>
                    <a className='not-a-button'>
                      <FontAwesomeIcon icon={faPen} style={{ color: "#89bfeb" }} />
                    </a>
                  </div>
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
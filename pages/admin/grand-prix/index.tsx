import React, { useEffect } from 'react'
import tableStyles from "@/styles/pagesTables.module.css";

import images from "@/constants/images";
import { SearchBar } from '@/Components/SearchBar/SearchBar'
import Navbar from '@/Components/Navbar/Navbar'
import { NameAndExportData } from '@/Components/NameAndExportData/NameAndExportData'
import { Pagination } from '@/Components/Pagination/Pagination'
import { block, unblock } from '@/utils/grandprix'
import { getRequest, navigateTo } from "@/utils/general"
import { useSelector } from 'react-redux';
import { TITLE_ADMIN_GRANDPRIX } from '@/constants/page-titles';
import Image from 'next/image';
import store from '@/Redux/store';
import { isLoading } from '@/Redux/actions/loader';
import { setLoadedData } from '@/Redux/actions/pagination';
import { ROUTE_SIGNIN } from '@/constants/routes';
import { ADMIN_GRAND_PRIX_DOWNLOAD_RECORD_ROUTE, ADMIN_GRAND_PRIX_LIST_ROUTE, ADMIN_GRAND_PRIX_SEARCH_ROUTE } from '@/constants/backend-routes';
import { toast } from 'react-toastify';
import { UNAUTHORIZED } from '@/constants/constants';


const GrandPrix = () => {
  const data = useSelector((state: any) => { return state.pagination?.title === TITLE_ADMIN_GRANDPRIX ? state.pagination :null });

  
  useEffect(() => {
    if (!data?.data) {
      store.dispatch(isLoading(true));
      getRequest(`${ADMIN_GRAND_PRIX_LIST_ROUTE}?pageNum=${data ? data.page_num : 1}`).then((response: any) => {
        store.dispatch(setLoadedData(TITLE_ADMIN_GRANDPRIX, response?.data?.result, data ? data.page_num : 1));
        store.dispatch(isLoading(false));
      }).catch((err) => {
        if(err?.status===UNAUTHORIZED){
          localStorage.removeItem("token");
          return navigateTo(null, ROUTE_SIGNIN);
        }
        store.dispatch(isLoading(false));
        toast.error(err?.data?.message);
      });
    }
  }, [data]);


  return (
    <>
      <Navbar index={1} />

      <title>{TITLE_ADMIN_GRANDPRIX}</title>

      <div className={tableStyles.container}>

        <NameAndExportData url={ADMIN_GRAND_PRIX_DOWNLOAD_RECORD_ROUTE} title={TITLE_ADMIN_GRANDPRIX} />
        <SearchBar url={ADMIN_GRAND_PRIX_SEARCH_ROUTE} title={TITLE_ADMIN_GRANDPRIX} deleteAll={false} addBtn={false} />

        <div className={tableStyles.table}>

          <table>

            <thead>
              <tr>
                {/* <th><input type="checkbox" name="select_all" onChange={ select_all } /></th> */}
                <th>Name</th>
                <th>Grand Prix Owner's</th>
                <th>Total Teams</th>
                <th>Owner's Occupation</th>
                <th>Owner's Yearly Income($)</th>
                <th>Owner's Address</th>
                <th>Block/Unblock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>


              {(data?.data && data?.data?.total)?
                data?.data?.data?.map((obj: any, index: number) => (

                  <tr key={index}>
                    {/* <td><input type="checkbox" name="selection-box" value={obj._id} onChange={ select_individual } /></td> */}
                    <td>{obj.name}</td>
                    <td>{obj.grandPrixOwner}</td>
                    <td>{obj.totalTeams}</td>
                    <td>{obj.ownerOccupation}</td>
                    <td>{obj.ownerYearlyIncome}$</td>
                    <td>{obj.ownerAddress}</td>
                    <td className={tableStyles.center}>
                      <Image style={{objectFit: "fill"}} width={25} height={25} src={obj.isBlock ? images.CLOSE_LOCK : images.OPEN_LOCK} alt="" />
                    </td>
                    <td>
                      {obj.isBlock ?
                        <a style={{display: "inline-block"}} onClick={() => { unblock(obj._id, data ? data.page_num : 1) }}>
                          <Image title='Unblock this user' src={images.GREEN_TICK} alt="" width={30} height={30} />
                        </a> :
                        <a style={{display: "inline-block"}} onClick={() => { block(obj._id, data ? data.page_num : 1) }}>
                          <Image title='Block this user' src={images.RED_CROSS} alt="" width={30} height={30} />
                        </a>}
                    </td>
                  </tr>
                )) :
                <tr><td colSpan={8}>No data found</td></tr>
              }
            </tbody>
          </table>
        </div>
        <Pagination title={TITLE_ADMIN_GRANDPRIX} start={data?.data?.start} end={data?.data?.end} total={(!(data?.data?.start && data?.data?.end)) ? data?.data?.data?.length : data?.data?.total} />

      </div>

    </>
  )
}
export default GrandPrix;
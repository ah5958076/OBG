import React, { useEffect } from 'react'
import tableStyles from "@/styles/pagesTables.module.css";
import images from "@/constants/images";
import Navbar from '@/Components/Navbar/Navbar'
import { SearchBar } from '@/Components/SearchBar/SearchBar'
import { NameAndExportData } from '@/Components/NameAndExportData/NameAndExportData'
import { Pagination } from '@/Components/Pagination/Pagination'
import { DIALOG_ADD_GP_LEAGUES, DIALOG_CONFIRMATION } from '@/constants/dialog-names'
import { TITLE_ADMIN_GPLEAGUES } from '@/constants/page-titles'
import { useSelector } from 'react-redux'
import { computeDate, getRequest, navigateTo, openDeleteDialog, select_all, select_individual } from '@/utils/general'
import { openAddNewDialog, updateDialogDisplayHandler } from '@/utils/gpLeagues';
import Image from 'next/image';
import { isLoading } from '@/Redux/actions/loader';
import { setLoadedData } from '@/Redux/actions/pagination';
import store from '@/Redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ADMIN_GP_LEAGUES_DELETE_ROUTE, ADMIN_GP_LEAGUES_DOWNLOAD_RECORD_ROUTE, ADMIN_GP_LEAGUES_LIST_ROUTE, ADMIN_GP_LEAGUES_SEARCH_ROUTE, BASE_URL } from '@/constants/backend-routes';
import { toast } from 'react-toastify';
import { ROUTE_SIGNIN } from '@/constants/routes';
import Link from 'next/link';
import { UNAUTHORIZED } from '@/constants/constants';



const GPLeagues = () => {
  const data = useSelector((state: any) => { return state.pagination?.title === TITLE_ADMIN_GPLEAGUES ? state.pagination : null });

  useEffect(() => {
    if (!data?.data) {
      store.dispatch(isLoading(true));
      getRequest(`${ADMIN_GP_LEAGUES_LIST_ROUTE}?page_num=${data ? data.page_num : 1}`).then((response: any) => {
          store.dispatch(setLoadedData(TITLE_ADMIN_GPLEAGUES, response?.data?.result, data?data.page_num : 1));
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

      <Navbar index={2} />

      <title>{TITLE_ADMIN_GPLEAGUES}</title>

      <div className={tableStyles.container}>

        <NameAndExportData url={ADMIN_GP_LEAGUES_DOWNLOAD_RECORD_ROUTE} title={TITLE_ADMIN_GPLEAGUES} />
        <SearchBar AddNewHandler={openAddNewDialog} url={ADMIN_GP_LEAGUES_SEARCH_ROUTE} title={TITLE_ADMIN_GPLEAGUES} addDialog={DIALOG_ADD_GP_LEAGUES} deleteDialog={DIALOG_CONFIRMATION} />

        <div className={tableStyles.table}>
          <table>

            <thead>
              <tr>
                <th><input type="checkbox" name="select_all" onChange={select_all} /></th>
                <th>Name</th>
                <th>Game</th>
                <th>Picture</th>
                <th>Entry Fee</th>
                <th>Prize</th>
                <th>Team Size</th>
                <th>Total Teams</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {(data?.data && data?.data?.total)?
                data?.data?.data?.map((obj: any, index: any) => (
                  <tr key={index}>
                    <td><input type="checkbox" name="selection-box" value={obj._id} onChange={select_individual} /></td>
                    <td>{obj.name}</td>
                    <td>{obj.gameName?.name}</td>
                    <td className={tableStyles.imgCenter}>
                      <Image style={{objectFit: "contain"}} src={obj.picture?BASE_URL+obj.picture:images.NO_PIC} alt="" width={50} height={50} />
                    </td>
                    <td>{obj.entryFee}</td>
                    <td>{obj.prize}</td>
                    <td>{obj.teamSize}</td>
                    <td>{obj.totalTeams}</td>
                    <td>{computeDate(obj.startingDate)}</td>
                    <td>{computeDate(obj.endingDate)}</td>
                    <td>
                      <Link href="#" onClick={() => { updateDialogDisplayHandler(obj._id) }}>
                        <FontAwesomeIcon icon={faPen} style={{ color: "#89bfeb" }}/>
                      </Link>
                      <Link href="#" onClick={() => { openDeleteDialog(TITLE_ADMIN_GPLEAGUES, ADMIN_GP_LEAGUES_DELETE_ROUTE, obj._id) }}>
                        <FontAwesomeIcon icon={faTrashCan} style={{ color: "#df4646" }}/>
                      </Link>
                    </td>
                  </tr>
                )) : 
                <tr><td colSpan={11}>No data found</td></tr>}

            </tbody>

          </table>
        </div>

        <Pagination title={TITLE_ADMIN_GPLEAGUES} start={data?.data?.start} end={data?.data?.end} total={(!(data?.data?.start && data?.data?.end)) ? data?.data?.data?.length : data?.data?.total} />

      </div>

    </>
  )

}


export default GPLeagues;
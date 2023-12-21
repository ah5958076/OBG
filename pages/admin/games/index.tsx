import React, { useEffect } from 'react'
import tableStyles from "@/styles/pagesTables.module.css";
import { Pagination } from '@/Components/Pagination/Pagination'
import { NameAndExportData } from '@/Components/NameAndExportData/NameAndExportData'
import { SearchBar } from '@/Components/SearchBar/SearchBar'
import Navbar from '@/Components/Navbar/Navbar'
import { DIALOG_ADD_GAMES, DIALOG_CONFIRMATION, DIALOG_UPDATE_GAMES } from '@/constants/dialog-names'
import { TITLE_ADMIN_GAMES, TITLE_ADMIN_GPLEAGUES } from '@/constants/page-titles'
import { computeDate, getRequest, navigateTo, openDeleteDialog, openEditDialog, select_all, select_individual } from '@/utils/general';
import Image from 'next/image';
import images from '@/constants/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import store from '@/Redux/store';
import { isLoading } from '@/Redux/actions/loader';
import { ADMIN_GAMES_DELETE_ROUTE, ADMIN_GAMES_DOWNLOAD_RECORD_ROUTE, ADMIN_GAMES_LIST_ROUTE, ADMIN_GAMES_SEARCH_ROUTE, ADMIN_GAMES_SHOW_ROUTE, BASE_URL } from '@/constants/backend-routes';
import { setLoadedData } from '@/Redux/actions/pagination';
import { UNAUTHORIZED } from '@/constants/constants';
import { ROUTE_SIGNIN } from '@/constants/routes';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { showDialog } from '@/Redux/actions/dialogs';
import Link from 'next/link';


const Games = () => {
  const data = useSelector((state: any) => { return state.pagination.title === TITLE_ADMIN_GAMES ? state.pagination : null });


  useEffect(() => {
    if (!data?.data) {
      store.dispatch(isLoading(true));
      getRequest(`${ADMIN_GAMES_LIST_ROUTE}?page_num=${data ? data.page_num : 1}`).then((response: any) => {
          store.dispatch(setLoadedData(TITLE_ADMIN_GAMES, response?.data?.result, data?data.page_num : 1));
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
      <Navbar index={5} />
      <title>{TITLE_ADMIN_GAMES}</title>

      <div className={tableStyles.container}>

      <NameAndExportData url={ADMIN_GAMES_DOWNLOAD_RECORD_ROUTE} title={TITLE_ADMIN_GAMES} />
      <SearchBar AddNewHandler={()=>{store.dispatch(showDialog(DIALOG_ADD_GAMES))}} url={ADMIN_GAMES_SEARCH_ROUTE} title={TITLE_ADMIN_GAMES} deleteDialog={DIALOG_CONFIRMATION} />

        <div className={tableStyles.table}>
          <table>

            <thead>
              <tr>
                <th><input type="checkbox" name="select_all" onChange={select_all} /></th>
                <th>Game</th>
                <th>Game Type</th>
                <th>Picture</th>
                <th>Platforms</th>
                <th>Uploaded Date & Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

              {(data?.data && data?.data?.total)?
              data?.data?.data?.map((obj: any, index: number) => (
                <tr key={index}>
                  <td><input type="checkbox" name="selection-box" value={obj._id} onChange={select_individual} /></td>
                  <td>{obj.name}</td>
                  <td>{obj.type}</td>
                  <td className={tableStyles.imgCenter} >
                    <Image src={obj.picture?BASE_URL+obj.picture:images.NO_PIC} alt="..." width={50} height={50} />
                  </td>
                  <td>{obj.platform}</td>
                  <td>{computeDate(new Date(obj.createdAt))}</td>
                  <td>
                    <Link href="#" className='not-a-button' onClick={() => { openEditDialog(DIALOG_UPDATE_GAMES, obj._id, ADMIN_GAMES_SHOW_ROUTE) }}>
                      <FontAwesomeIcon icon={faPen} style={{ color: "#89bfeb" }} />
                    </Link>
                    <Link href="#" className='not-a-button' onClick={() => { openDeleteDialog(TITLE_ADMIN_GAMES, ADMIN_GAMES_DELETE_ROUTE, obj._id) }}>
                      <FontAwesomeIcon icon={faTrashCan} style={{ color: "#df4646" }} />
                    </Link>
                  </td>
                </tr>
              )) : <tr><td colSpan={7}>No Data Found</td></tr>}

            </tbody>

          </table>
        </div>

        <Pagination title={TITLE_ADMIN_GAMES} start={data?.data?.start} end={data?.data?.end} total={(!(data?.data?.start && data?.data?.end))? data?.data?.data?.length : data?.data?.total} />

      </div>

    </>
  )
}


export default Games;
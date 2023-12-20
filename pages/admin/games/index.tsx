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
import { ADMIN_GAMES_LIST_ROUTE } from '@/constants/backend-routes';
import { setLoadedData } from '@/Redux/actions/pagination';
import { UNAUTHORIZED } from '@/constants/constants';
import { ROUTE_SIGNIN } from '@/constants/routes';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


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

        <NameAndExportData url="/api/games/download-record" title="Games" />
        <SearchBar url="/api/games/search" addDialog={DIALOG_ADD_GAMES} deleteDialog={DIALOG_CONFIRMATION} />

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
              <tr>
                <td><input type="checkbox" name="selection-box" value={1} onChange={select_individual} /></td>
                <td>Name 1</td>
                <td>Game Type 1</td>
                <td className={tableStyles.imgCenter} >
                  <Image src={images.NO_PIC} alt="..." width={50} height={50} />
                </td>
                <td>IoS</td>
                <td>{computeDate(Date.now())}</td>
                <td>
                  <a className='not-a-button' onClick={() => { openEditDialog(DIALOG_UPDATE_GAMES, "", "/api/games/show") }}>
                    <FontAwesomeIcon icon={faPen} style={{ color: "#89bfeb" }} />
                  </a>
                  <a className='not-a-button' onClick={() => { openDeleteDialog(TITLE_ADMIN_GPLEAGUES, "/api/gp-league/delete", "") }}>
                    <FontAwesomeIcon icon={faTrashCan} style={{ color: "#df4646" }} />
                  </a>
                </td>
              </tr>

              <tr>
                <td><input type="checkbox" name="selection-box" value={1} onChange={select_individual} /></td>
                <td>Name 1</td>
                <td>Game Type 1</td>
                <td className={tableStyles.imgCenter} >
                  <Image src={images.NO_PIC} alt="..." width={50} height={50} />
                </td>
                <td>IoS</td>
                <td>{computeDate(Date.now())}</td>
                <td>
                  <a className='not-a-button' onClick={() => { openEditDialog(DIALOG_UPDATE_GAMES, "", "/api/games/show") }}>
                    <FontAwesomeIcon icon={faPen} style={{ color: "#89bfeb" }} />
                  </a>
                  <a className='not-a-button' onClick={() => { openDeleteDialog(TITLE_ADMIN_GPLEAGUES, "/api/gp-league/delete", "") }}>
                    <FontAwesomeIcon icon={faTrashCan} style={{ color: "#df4646" }} />
                  </a>
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


export default Games;
import React, { useEffect } from 'react'
import tableStyles from "@/styles/pagesTables.module.css";

import { SearchBar } from '@/Components/SearchBar/SearchBar'
import { Pagination } from '@/Components/Pagination/Pagination'
import Navbar from '@/Components/Navbar/Navbar'
import { NameAndExportData } from '@/Components/NameAndExportData/NameAndExportData'
import { DIALOG_ADD_USERS, DIALOG_CONFIRMATION, DIALOG_UPDATE_USERS } from '@/constants/dialog-names'
import { TITLE_ADMIN_USERS } from '@/constants/page-titles'
import { getRequest, navigateTo, openDeleteDialog, openEditDialog, select_all, select_individual } from '@/utils/general';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faMedal, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { showProfile, openInventoryDialog } from '@/utils/users';
import { useSelector } from 'react-redux';
import store from '@/Redux/store';
import { isLoading } from '@/Redux/actions/loader';
import { ADMIN_USERS_DELETE_ROUTE, ADMIN_USERS_DOWNLOAD_RECORD_ROUTE, ADMIN_USERS_LIST_ROUTE, ADMIN_USERS_SEARCH_ROUTE, ADMIN_USERS_SHOW_ROUTE } from '@/constants/backend-routes';
import { setLoadedData } from '@/Redux/actions/pagination';
import { UNAUTHORIZED } from '@/constants/constants';
import { ROUTE_SIGNIN } from '@/constants/routes';
import { toast } from 'react-toastify';
import { showDialog } from '@/Redux/actions/dialogs';


const Users = () => {
  const data = useSelector((state: any) => { return state.pagination.title === TITLE_ADMIN_USERS ? state.pagination : null });

  useEffect(() => {
    if (!data?.data) {
      store.dispatch(isLoading(true));
      getRequest(`${ADMIN_USERS_LIST_ROUTE}?pageNum=${data ? data.page_num : 1}`).then((response: any) => {
          store.dispatch(setLoadedData(TITLE_ADMIN_USERS, response?.data?.result, data?data.page_num : 1));
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
      <Navbar index={4} />

      <title>{TITLE_ADMIN_USERS}</title>

      <div className={tableStyles.container}>

      <NameAndExportData url={ADMIN_USERS_DOWNLOAD_RECORD_ROUTE} title={TITLE_ADMIN_USERS} />
      <SearchBar AddNewHandler={()=>{store.dispatch(showDialog(DIALOG_ADD_USERS))}} url={ADMIN_USERS_SEARCH_ROUTE} title={TITLE_ADMIN_USERS} deleteDialog={DIALOG_CONFIRMATION} />

        <div className={tableStyles.table}>
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" name="select_all" onChange={ select_all } /></th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Credits</th>
                <th>Matches</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Win %</th>
                <th>About</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {(data?.data && data?.data?.total)?
                data?.data?.data?.map((obj: any, index: number) => (
                  <tr key={index}>
                    <td><input type="checkbox" name="selection-box" value={obj._id} onChange={select_individual}/></td>
                    <td>{obj.fullName}</td>
                    <td>{obj.username}</td>
                    <td>{obj.email}</td>
                    <td>{obj.email}</td>
                    <td>{obj.matches || 0}</td>
                    <td>{obj.wins || 0}</td>
                    <td>{obj.losses || 0}</td>
                    <td>{Math.round((obj.wins/obj.matches)*100) || 0}</td>
                    <td>{obj.about}</td>
                    <td>{obj.status}</td>
                    <td>
                      <a className='not-a-button' onClick={ ()=>{openInventoryDialog(obj._id)} }>
                        <FontAwesomeIcon icon={faMedal} rotation={180} style={{color: "var(--site-clr)"}}/>
                      </a>
                      <a className='not-a-button' onClick={()=>{showProfile(obj._id)}}>
                        <FontAwesomeIcon icon={faEye} style={{color: "var(--green)"}}/>
                      </a>
                      <a className='not-a-button' onClick={()=>{openEditDialog(DIALOG_UPDATE_USERS, obj._id, ADMIN_USERS_SHOW_ROUTE)}}>
                        <FontAwesomeIcon icon={faPen} style={{color: "#89bfeb"}}/>
                      </a>
                      <a className='not-a-button' onClick={()=>{openDeleteDialog(TITLE_ADMIN_USERS, ADMIN_USERS_DELETE_ROUTE, obj._id)}}>
                        <FontAwesomeIcon icon={faTrashCan} style={{color: "#df4646"}}/>
                      </a>
                    </td>
                  </tr>
                )) : <tr><td colSpan={12}>No Data Found</td></tr>
              }
            </tbody>
          </table>
        </div>
          
        <Pagination title={TITLE_ADMIN_USERS} start={data?.data?.start} end={data?.data?.end} total={(!(data?.data?.start && data?.data?.end))? data?.data?.data?.length : data?.data?.total} />

      </div>

    </>

  )
}


export default Users;
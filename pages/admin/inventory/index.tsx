import React, { useEffect } from 'react'
import tableStyles from "@/styles/pagesTables.module.css";
import styles from "./inventory.module.css";

import images from "@/constants/images";
import Navbar from '@/Components/Navbar/Navbar';
import { NameAndExportData } from '@/Components/NameAndExportData/NameAndExportData';
import { SearchBar } from '@/Components/SearchBar/SearchBar';
import { DIALOG_ADD_INVENTORY, DIALOG_UPDATE_INVENTORY } from '@/constants/dialog-names';
import Image from 'next/image';
import { TITLE_ADMIN_INVENTORY } from '@/constants/page-titles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getRequest, navigateTo, openDeleteDialog, openEditDialog } from '@/utils/general';
import { useSelector } from 'react-redux';
import store from '@/Redux/store';
import { isLoading } from '@/Redux/actions/loader';
import { ADMIN_INVENTORY_LIST_ROUTE } from '@/constants/backend-routes';
import { setLoadedData } from '@/Redux/actions/pagination';
import { UNAUTHORIZED } from '@/constants/constants';
import { ROUTE_SIGNIN } from '@/constants/routes';
import { toast } from 'react-toastify';




const Inventory = () => {
  const data = useSelector((state: any) => { return state.pagination.title === TITLE_ADMIN_INVENTORY ? state.pagination : null });

  useEffect(() => {
    if (!data?.data) {
      store.dispatch(isLoading(true));
      getRequest(`${ADMIN_INVENTORY_LIST_ROUTE}?page_num=${data ? data.page_num : 1}`).then((response: any) => {
          store.dispatch(setLoadedData(TITLE_ADMIN_INVENTORY, response?.data?.result, data?data.page_num : 1));
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
    
      <Navbar index={8} />

      <title>{TITLE_ADMIN_INVENTORY}</title>

      <div className={tableStyles.container}>
        <NameAndExportData url="/api/inventory/download-record" title="Inventory" />
        <SearchBar url="/api/inventory/search" deleteAll={false} addDialog={DIALOG_ADD_INVENTORY} />
        <div className={styles.inventories}>
          <div className={styles.inventory}>
            <Image src={ images.USER } alt="..." />
            <div className={styles.data}>
              <p className="name">Random</p>
              <div className={styles.controls}>
                <button onClick={()=>{openEditDialog(DIALOG_UPDATE_INVENTORY, "", "/api/inventory/show")}}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button onClick={()=>{openDeleteDialog(TITLE_ADMIN_INVENTORY, "/api/inventory/delete", "")}}>
                  <FontAwesomeIcon icon={faTrash} style={{color: "#df4646"}} />
                </button>
              </div>
            </div>
          </div>

          <div className={styles.inventory}>
            <Image src={ images.USER } alt="..." />
            <div className={styles.data}>
              <p className="name">Random</p>
              <div className={styles.controls}>
                <button onClick={()=>{openEditDialog(DIALOG_UPDATE_INVENTORY, "", "/api/inventory/show")}}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button onClick={()=>{openDeleteDialog(TITLE_ADMIN_INVENTORY, "/api/inventory/delete", "")}}>
                  <FontAwesomeIcon icon={faTrash} style={{color: "#df4646"}} />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.inventory}>
            <Image src={ images.USER } alt="..." />
            <div className={styles.data}>
              <p className="name">Random</p>
              <div className={styles.controls}>
                <button onClick={()=>{openEditDialog(DIALOG_UPDATE_INVENTORY, "", "/api/inventory/show")}}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button onClick={()=>{openDeleteDialog(TITLE_ADMIN_INVENTORY, "/api/inventory/delete", "")}}>
                  <FontAwesomeIcon icon={faTrash} style={{color: "#df4646"}} />
                </button>
              </div>
            </div>
          </div>

          <div className={styles.inventory}>
            <Image src={ images.USER } alt="..." />
            <div className={styles.data}>
              <p className="name">Random</p>
              <div className={styles.controls}>
                <button onClick={()=>{openEditDialog(DIALOG_UPDATE_INVENTORY, "", "/api/inventory/show")}}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button onClick={()=>{openDeleteDialog(TITLE_ADMIN_INVENTORY, "/api/inventory/delete", "")}}>
                  <FontAwesomeIcon icon={faTrash} style={{color: "#df4646"}} />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.inventory}>
            <Image src={ images.USER } alt="..." />
            <div className={styles.data}>
              <p className="name">Random</p>
              <div className={styles.controls}>
                <button onClick={()=>{openEditDialog(DIALOG_UPDATE_INVENTORY, "", "/api/inventory/show")}}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button onClick={()=>{openDeleteDialog(TITLE_ADMIN_INVENTORY, "/api/inventory/delete", "")}}>
                  <FontAwesomeIcon icon={faTrash} style={{color: "#df4646"}} />
                </button>
              </div>
            </div>
          </div>

          <div className={styles.inventory}>
            <Image src={ images.USER } alt="..." />
            <div className={styles.data}>
              <p className="name">Random</p>
              <div className={styles.controls}>
                <button onClick={()=>{openEditDialog(DIALOG_UPDATE_INVENTORY, "", "/api/inventory/show")}}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button onClick={()=>{openDeleteDialog(TITLE_ADMIN_INVENTORY, "/api/inventory/delete", "")}}>
                  <FontAwesomeIcon icon={faTrash} style={{color: "#df4646"}} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </>

  )

}

export default Inventory;
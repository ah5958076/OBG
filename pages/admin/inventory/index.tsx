import React from 'react'
import styles from "./inventory.module.css";

import images from "@/constants/images";
import Navbar from '@/Components/Navbar/Navbar';
import { NameAndExportData } from '@/Components/NameAndExportData/NameAndExportData';
import { SearchBar } from '@/Components/SearchBar/SearchBar';
import { DIALOG_ADD_INVENTORY } from '@/constants/dialog-names';
import Image from 'next/image';
import { TITLE_ADMIN_INVENTORY } from '@/constants/page-titles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';


const Inventory = (props:any) => {

  return (
    
    <>
    
      <Navbar index={8} />

      <title>{TITLE_ADMIN_INVENTORY}</title>

      <div className="container">

        <NameAndExportData url="/api/inventory/download-record" title="Inventory" />
        <SearchBar url="/api/inventory/search" deleteAll={false} addDialog={DIALOG_ADD_INVENTORY} />

        <div className={styles.inventories}>

          <div className={styles.inventory}>
            <Image src={ images.USER } alt="..." />
            <div className={styles.data}>
              <p className="name">Random</p>
              <div className={styles.controls}>
                <button><FontAwesomeIcon icon={faPencil} /></button>
                <button><FontAwesomeIcon icon={faTrash} style={{color: "#df4646"}} /></button>
              </div>
            </div>
          </div>

          <div className={styles.inventory}>
            <Image src={ images.USER } alt="..." />
            <div className={styles.data}>
              <p className="name">Random</p>
              <div className={styles.controls}>
                <button><FontAwesomeIcon icon={faPencil} /></button>
                <button><FontAwesomeIcon icon={faTrash} style={{color: "#df4646"}} /></button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </>

  )

}

export default Inventory;
import React from 'react'
import styles from "./nameAndExportData.module.css";
import Link from 'next/link';
import { export_data } from "@/utils/general";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons';


export const NameAndExportData = (props:any) => {
    return (
      
        <div className={styles.controls_under_nav}>

            <p>{props.title}</p>
            <Link href={props.url} onClick={ export_data } id="export_data" title={props.title}>
                <span>Export Data</span> 
                <FontAwesomeIcon icon={faArrowDownLong} />
            </Link>

        </div>

    )
}
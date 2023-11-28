import React from 'react'
import "./nameAndExportData.css";
import Link from 'next/link';
import { export_data } from "../../utils/general";


export const NameAndExportData = (props:any) => {
    return (
      
        <div className="controls-under-nav">

            <p>{props.title}</p>
            <Link href={props.url} onClick={ export_data } id="export_data" title={props.title}>
                <span>Export Data</span> 
                <i className="fa-solid fa-arrow-down-long"></i>
            </Link>

        </div>

    )
}
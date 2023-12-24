import React from 'react'
import styles from "./nameAndExportData.module.css";
import Image from 'next/image';
import Link from 'next/link';
import { export_data } from "@/utils/general";
import images from '@/constants/images';


export const NameAndExportData = ({title, children, url, hasExport=true}:any) => {
    return (

        <div className={styles.controls_under_nav}>

            <div>
                <p style={{ fontFamily: "roboto-light", fontSize: "16px", fontWeight: "600", fontStyle: "normal" }}>
                    {title}
                </p>
                <div>
                    {children}
                </div>
            </div>
            {hasExport? 
                <Link href="#" onClick={(e)=>{export_data(e, url)}} id="export_data" title={title}>
                    <span >Export Data</span>
                    <Image src={images.DOWNLOADIMAGE} alt='...' height={20} width={20} />
                </Link> : null
            }

        </div>

    )
}
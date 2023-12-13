import React from 'react'
import styles from "./nameAndExportData.module.css";
import Image from 'next/image';
import Link from 'next/link';
import { export_data } from "@/utils/general";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DOWNLOADIMAGE } from '@/constants/img';
import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons';


export const NameAndExportData = (props: any) => {
    return (

        <div className={styles.controls_under_nav}>

            <div>
                <p style={{ fontFamily: "roboto-light", fontSize: "16px", fontWeight: "600", fontStyle: "normal" }}>
                    {props.title}
                </p>
                <div>
                    {props.children}
                </div>
            </div>

            <Link href={props.url} onClick={export_data} id="export_data" title={props.title}>
                <span >Export Data</span>
                {/* <FontAwesomeIcon icon={faArrowDownLong} /> */}
                <Image src={DOWNLOADIMAGE} alt='...' height={20} width={20} />
            </Link>

        </div>

    )
}
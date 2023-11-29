import React from 'react'
import styles from "./pagination.module.css"
import store from "@/Redux/store";
import { loadNewData } from '@/Redux/actions/pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';


export const Pagination = (props:any) => {

    let start=1, end=0, total=0;
    start=props.start?props.start:1;
    end=props.end?props.end:props.total?props.total:0;
    total=props.total?props.total:0;
    
    return (
    
        <div className={styles.pagination}>
            <p>{(!(props.start && props.end))?total+" Records":start+" - "+end+" of "+total}</p>

            <button onClick={()=>{store.dispatch(loadNewData(props.title, props.page_num-1))}} className={styles.prev_page} disabled={(start && start===1)?true:false}>
                <FontAwesomeIcon icon={faCircleChevronLeft} />
            </button>

            <button onClick={()=>{store.dispatch(loadNewData(props.title, props.page_num+1))}} className={styles.next_page} disabled={(end===total)?true:false}>
                <FontAwesomeIcon icon={faCircleChevronLeft} className="fa-rotate-180" />
            </button>

        </div>

    )
}
import React from 'react'
import "./pagination.css"
import store from '../../Redux/store';
import { loadNewData } from '../../Redux/actions/pagination';


export const Pagination = (props:any) => {

    let start=1, end=0, total=0;
    start=props.start?props.start:1;
    end=props.end?props.end:props.total?props.total:0;
    total=props.total?props.total:0;
    
    return (
    
        <div className="pagination">
            <p>{(!(props.start && props.end))?total+" Records":start+" - "+end+" of "+total}</p>

            <button onClick={()=>{store.dispatch(loadNewData(props.title, props.page_num-1))}} className="prev-page" disabled={(start && start===1)?true:false}>
                <i className="fa-solid fa-circle-chevron-left"></i>
            </button>

            <button onClick={()=>{store.dispatch(loadNewData(props.title, props.page_num+1))}} className="next-page" disabled={(end===total)?true:false}>
                <i className="fa-solid fa-circle-chevron-left fa-rotate-180"></i>
            </button>

        </div>

    )
}
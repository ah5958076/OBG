import React from 'react'
import "./searchBar.css"
import { showDialog } from "../../Redux/actions/dialogs"
import store from "../../Redux/store";
import { openDeleteDialog, searchData } from '../../utils/general';


export const SearchBar = (props:any) => {
    let deleteURL = props.url.split("/");
    deleteURL.pop();
    deleteURL=deleteURL.join("/")+"/delete";

    return (
    
        <div className="search">

            <div>
                
                <input type="text" name="search" placeholder="Search" onInput={ (e)=>{searchData(e, props.title, props.url)} } />
                <i className="fa-solid fa-magnifying-glass"></i>

            </div>

            <div className="controls">

                {(props && props.addBtn===false)? 
                    "" : 
                    <button onClick={(e)=>{props.AddNewHandler?props.AddNewHandler.call():store.dispatch(showDialog(props.addDialog))}} style={{color: 'black'}}><i className="fa-solid fa-plus"></i></button> }
                    
                {(props && props.deleteAll===false)?
                    "":
                    <button onClick={()=>{openDeleteDialog(props.title,deleteURL)}} style={{color: "red"}}><i className="fa-solid fa-trash-can"></i></button>}

            </div>

        </div>

    )
}
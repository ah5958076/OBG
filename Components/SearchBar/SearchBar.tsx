import React from 'react'
import styles from "./searchBar.module.css";
import { showDialog } from "@/Redux/actions/dialogs"
import store from "@/Redux/store";
import { openDeleteDialog, searchData } from "@/utils/general";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';


export const SearchBar = (props: any) => {
    let deleteURL = props.url.split("/");
    deleteURL.pop();
    deleteURL = deleteURL.join("/") + "/delete";

    return (

        <div className={styles.search}>

            <div>

                <input type="text" autoComplete='off' name="search" placeholder="Search" onInput={(e: any) => { searchData(e.target?.value, props.title, props.url) }} />
                <FontAwesomeIcon icon={faMagnifyingGlass} />

            </div>

            <div className={styles.controls}>

                {(props && props.addBtn === false) ?
                    "" :
                    <button onClick={(e) => { props.AddNewHandler ? props.AddNewHandler.call() : store.dispatch(showDialog(props.addDialog)) }} style={{ color: 'black' }}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>}

                {(props && props.deleteAll === false) ?
                    "" :
                    <button onClick={() => { openDeleteDialog(props.title, deleteURL) }} style={{ color: "red" }}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>}

            </div>

        </div>

    )
}
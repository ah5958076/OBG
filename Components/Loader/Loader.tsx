import React from 'react'
import styles from "./loader.module.css";

import { useSelector } from 'react-redux';


const Loader = () => {
  const loaderState = useSelector((state:any) => {return state.loader?.flag});
  if(!loaderState)
    return;
  return ( 
      <div className={styles.loader}>
        <div>
          <span></span>
        </div>
      </div>
  )
}

export default Loader;
import React from 'react'
import "./Inventory.css"

import RANDOM_IMAGE from "../../assets/user.jpg";
import { Navbar } from '../../../../Components/Navbar/Navbar';
import { NameAndExportData } from '../../../../Components/NameAndExportData/NameAndExportData';
import { SearchBar } from '../../../../Components/SearchBar/SearchBar';
import { DIALOG_ADD_INVENTORY } from '../../../../constants/constants';
import Image from 'next/image';


export const Inventory = (props:any) => {

  return (
    
    <>
    
      <Navbar index={8} />

      <title>{props.title}</title>

      <div className="container">

        <NameAndExportData title="Inventory" />
        <SearchBar deleteAll={false} addDialog={DIALOG_ADD_INVENTORY} />

        <div className="inventories">

          <div className="inventory">
            <Image src={ RANDOM_IMAGE } alt="..." />
            <div className="data">
              <p className="name">Random</p>
              <div className="controls">
                <button><i className="fa-solid fa-pencil"></i></button>
                <button><i className="fa-solid fa-trash " style={{color: "#df4646"}}></i></button>
              </div>
            </div>
          </div>

          <div className="inventory">
            <Image src={ RANDOM_IMAGE } alt="..." />
            <div className="data">
              <p className="name">Random</p>
              <div className="controls">
                <button><i className="fa-solid fa-pencil"></i></button>
                <button><i className="fa-solid fa-trash" style={{color: "#df4646"}}></i></button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </>

  )

}
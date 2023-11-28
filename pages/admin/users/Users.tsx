import React from 'react'

import { SearchBar } from '../../../../Components/SearchBar/SearchBar'
import { Pagination } from '../../../../Components/Pagination/Pagination'
import { Navbar } from '../../../../Components/Navbar/Navbar'
import { NameAndExportData } from '../../../../Components/NameAndExportData/NameAndExportData'
import { DIALOG_ADD_USERS, DIALOG_CONFIRMATION } from '../../../../constants/constants'


export const Users = (props:any) => {

  return (

    <>

      <Navbar index={4} />

      <title>{props.title}</title>

      <div className="container">
        
        <NameAndExportData title="Users" />
        <SearchBar addDialog={DIALOG_ADD_USERS} deleteDialog={DIALOG_CONFIRMATION} />

        <div className="table">
          <table></table>
        </div>

          <Pagination start={0} end={0} total={0} />

      </div>

    </>

  )
}
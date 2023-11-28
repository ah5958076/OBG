import React from 'react'

import { Pagination } from '../../../../Components/Pagination/Pagination'
import { NameAndExportData } from '../../../../Components/NameAndExportData/NameAndExportData'
import { SearchBar } from '../../../../Components/SearchBar/SearchBar'
import { Navbar } from '../../../../Components/Navbar/Navbar'
import { DIALOG_ADD_GAMES, DIALOG_CONFIRMATION } from '../../../../constants/constants'


export const Games = (props:any) => {

  return (
    <>

      <Navbar index={5} />

      <title>{props.title}</title>

      <div className="container">

        <NameAndExportData title="Games" />
        <SearchBar addDialog={DIALOG_ADD_GAMES} deleteDialog={DIALOG_CONFIRMATION} />

        <div className="table">
          <table></table>
        </div>

        <Pagination start={0} end={0} total={0} />

      </div>

    </>
  )
}
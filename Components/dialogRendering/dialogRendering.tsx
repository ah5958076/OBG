import React from 'react'
import { useSelector } from 'react-redux'

import { ConfirmationDialog } from '../Dialogs/Confirmation/ConfirmationDialog'
import { ChangePassword } from "../Dialogs/ChangePassword/ChangePassword"
import { Logout } from "../Dialogs/Logout/Logout"
import { AddGPLeagues, UpdateGPLeagues } from "../Dialogs/GPLeagues/GPLeagues"
import { AddFantasyLeague, UpdateFantasyLeague } from "../Dialogs/FantasyLeagues/FantasyLeagues"
import { AddUser } from "../Dialogs/Users/Users"
import { AddGames } from "../Dialogs/Games/Games"
import { AddTournaments } from "../Dialogs/Tournaments/Tournaments"
import { AddLadders } from "../Dialogs/Ladders/Ladders"
import { AddInventory } from "../Dialogs/Inventory/Inventory"

import { 
    DIALOG_ADD_FANTASY_LEAGUES, DIALOG_ADD_GAMES, DIALOG_ADD_GP_LEAGUES, DIALOG_ADD_INVENTORY, DIALOG_ADD_LADDERS, DIALOG_ADD_TOURNAMENTS, DIALOG_ADD_USERS, DIALOG_CHANGE_PASSWORD, DIALOG_CONFIRMATION, DIALOG_LOGOUT, DIALOG_UPDATE_FANTASY_LEAGUES, DIALOG_UPDATE_GP_LEAGUES
} from '../../constants/constants'


export const DialogRendering = () => {
    const dialogState = useSelector((state:any) => {return state.Dialogs})

    return (

    <>

        {(dialogState.name===DIALOG_CONFIRMATION && dialogState.isShowing)? <ConfirmationDialog data={dialogState.data} /> : null}
        {(dialogState.name===DIALOG_CHANGE_PASSWORD && dialogState.isShowing)?<ChangePassword />:null}
        {(dialogState.name===DIALOG_LOGOUT && dialogState.isShowing)?<Logout />:null}

        {(dialogState.name===DIALOG_ADD_GP_LEAGUES && dialogState.isShowing)? <AddGPLeagues data={dialogState.data} /> : null }
        {(dialogState.name===DIALOG_UPDATE_GP_LEAGUES && dialogState.isShowing)? <UpdateGPLeagues data={dialogState.data} /> : null }
        {(dialogState.name===DIALOG_ADD_FANTASY_LEAGUES && dialogState.isShowing)? <AddFantasyLeague data={dialogState.data} /> : null }
        {(dialogState.name===DIALOG_UPDATE_FANTASY_LEAGUES && dialogState.isShowing)? <UpdateFantasyLeague data={dialogState.data} /> : null }
        {(dialogState.name===DIALOG_ADD_USERS && dialogState.isShowing)? <AddUser /> : null }
        {(dialogState.name===DIALOG_ADD_GAMES && dialogState.isShowing)? <AddGames /> : null }
        {(dialogState.name===DIALOG_ADD_TOURNAMENTS && dialogState.isShowing)? <AddTournaments /> : null }
        {(dialogState.name===DIALOG_ADD_LADDERS && dialogState.isShowing)? <AddLadders /> : null }
        {(dialogState.name===DIALOG_ADD_INVENTORY && dialogState.isShowing)? <AddInventory /> : null }

    </>   

    )
}

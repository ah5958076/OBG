import React from 'react'
import { useSelector } from 'react-redux'

import { ConfirmationDialog } from '@/Components/Dialogs/Confirmation'
import { ChangePassword } from "@/Components/Dialogs/ChangePassword"
import { Logout } from "@/Components/Dialogs/Logout"
import { AddGPLeagues, UpdateGPLeagues } from "@/Components/Dialogs/GPLeagues"
import { AddFantasyLeague, UpdateFantasyLeague } from "@/Components/Dialogs/FantasyLeagues"
import { AddUser } from "@/Components/Dialogs/Users"
import { AddGames } from "@/Components/Dialogs/Games"
import { AddTournaments } from "@/Components/Dialogs/Tournaments"
import { AddLadders } from "@/Components/Dialogs/Ladders"
import { AddInventory } from "@/Components/Dialogs/Inventory"

import { 
    DIALOG_ADD_FANTASY_LEAGUES, DIALOG_ADD_GAMES, DIALOG_ADD_GP_LEAGUES, DIALOG_ADD_INVENTORY, DIALOG_ADD_LADDERS, DIALOG_ADD_TOURNAMENTS, DIALOG_ADD_USERS, DIALOG_CHANGE_PASSWORD, DIALOG_CONFIRMATION, DIALOG_LOGOUT, DIALOG_UPDATE_FANTASY_LEAGUES, DIALOG_UPDATE_GP_LEAGUES
} from '../../constants/dialog-names'


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

import React, { useEffect } from 'react'
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
import store from '@/Redux/store'
import { hideDialog, showDialog } from '@/Redux/actions/dialogs'


const DialogRendering = () => {
    const state = useSelector((state:any) => {return state.dialogs})

    useEffect(()=>{
        window.addEventListener("click", (e:any)=> {
            let dialogContainer = document.querySelector("#dialogs");
            let dialog = document.querySelector("#dialog");
            if(dialogContainer && e.target===dialogContainer && e.target!==dialog)
                store.dispatch(hideDialog());
        });

    }, [state])


    return (

        <>

            {(state.name===DIALOG_CONFIRMATION && state.isShowing)? <ConfirmationDialog data={state.data} /> : null}
            {(state.name===DIALOG_CHANGE_PASSWORD && state.isShowing)?<ChangePassword />:null}
            {(state.name===DIALOG_LOGOUT && state.isShowing)?<Logout />:null}

            {(state.name===DIALOG_ADD_GP_LEAGUES && state.isShowing)? <AddGPLeagues data={state.data} /> : null }
            {(state.name===DIALOG_UPDATE_GP_LEAGUES && state.isShowing)? <UpdateGPLeagues data={state.data} /> : null }
            {(state.name===DIALOG_ADD_FANTASY_LEAGUES && state.isShowing)? <AddFantasyLeague data={state.data} /> : null }
            {(state.name===DIALOG_UPDATE_FANTASY_LEAGUES && state.isShowing)? <UpdateFantasyLeague data={state.data} /> : null }
            {(state.name===DIALOG_ADD_USERS && state.isShowing)? <AddUser /> : null }
            {(state.name===DIALOG_ADD_GAMES && state.isShowing)? <AddGames /> : null }
            {(state.name===DIALOG_ADD_TOURNAMENTS && state.isShowing)? <AddTournaments /> : null }
            {(state.name===DIALOG_ADD_LADDERS && state.isShowing)? <AddLadders /> : null }
            {(state.name===DIALOG_ADD_INVENTORY && state.isShowing)? <AddInventory /> : null }

        </>   

    )
}


export default DialogRendering;
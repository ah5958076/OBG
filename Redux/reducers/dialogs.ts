import { TYPE_DIALOG_STATE } from "../../constants/interfaces";

const initialState:TYPE_DIALOG_STATE = {
    name: "", 
    isShowing: false, 
    data: null, 
    type: ""
};

const Dialogs = (state:TYPE_DIALOG_STATE=initialState, action:any):TYPE_DIALOG_STATE => {
    if(action.type==="DIALOGS")
        return {name: action.name, isShowing: action.isShowing, data: action.data, type:action.type};
    return state;
}

export default Dialogs
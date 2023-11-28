import { TYPE_LOADER_STATE } from "../../constants/interfaces";

let initialState:TYPE_LOADER_STATE = {
    type: "LOADER",
    flag: false
};

const changeLoaderState = (state:TYPE_LOADER_STATE=initialState, action:any):TYPE_LOADER_STATE => {
    if(action.type==="LOADER")
        return {type:action.type, flag:action.flag};
    return state;
}

export default changeLoaderState
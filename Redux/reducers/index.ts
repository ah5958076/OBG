import { combineReducers } from "redux"
import loader from "./loader";
import dialogs from "./dialogs"
import pagination from "./pagination"


let rootReducer = combineReducers({
    loader, dialogs, pagination
});

export default rootReducer;
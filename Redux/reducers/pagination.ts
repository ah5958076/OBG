import { TYPE_PAGINATION_STATE } from "../../constants/interfaces";

const initialState:TYPE_PAGINATION_STATE = {
    title: "",
    data: null,
    page_num: 1,
    type: "PAGINATION"
}; 

const PagesLoading = (state:TYPE_PAGINATION_STATE=initialState, action:any):TYPE_PAGINATION_STATE => {
    if(action.title)
        return {title: action.title, data: action.data, page_num: action.page_num};
    return state;
}

export default PagesLoading
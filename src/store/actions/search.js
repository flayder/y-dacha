import {SET_SEARCH_PARAMETER } from "../types";
import {AppFetch} from "../../AppFetch";

export const setSearchParameter = (payload) => {
    return async dispatch => {
        //const result = await AppFetch.getWithToken("getMainEvents")
        //const payload = (result.result) ? result.data : []
        dispatch({
            type: SET_SEARCH_PARAMETER,
            payload
        })
    }
}

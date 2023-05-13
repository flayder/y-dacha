import {GET_MAIN_SORTS} from "../types";
import {AppFetch} from "../../AppFetch";

export const setCultureParamType = (type) => {
    return async dispatch => {
        const payload = type
        dispatch({
            type: GET_MAIN_SORTS,
            payload
        })
    }
}
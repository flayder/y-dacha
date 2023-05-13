import {SET_CURRENT_FILTER, GET_CURRENT_FILTER, SET_CURRENT_FILTER_TYPE, EMPTY_FILTER} from "../types";
import {AppFetch} from "../../AppFetch";

export const emptyFilter = () => {
    return async dispatch => {
        dispatch({
            type: EMPTY_FILTER,
            payload: []
        })
    }
}

export const setFilterData = (data) => {
    return async dispatch => {
        //console.log('dataFilter', data)
        dispatch({
            type: SET_CURRENT_FILTER,
            payload: data
        })
    }
}

export const loadFilter = (link, params, navigation) => {
    return async (dispatch) => {
        const result = await AppFetch.getWithToken(link, params, {}, navigation)
        const payload = (result.result) ? result.data : []
        //console.log('payload', payload)
        dispatch({
            type: GET_CURRENT_FILTER,
            payload
        })
    }
}
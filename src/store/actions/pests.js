import {GET_PESTS, GET_PEST, SET_PAGINATION_PESTS} from "../types";
import {AppFetch} from "../../AppFetch";

export const setPestsPagination = (pagination) => {
    return async dispatch => {
        dispatch({
            type: SET_PAGINATION_PESTS,
            payload: pagination
        })
    }
}

export const loadPests = ({id, type, loadMore = true, navigation}) => {
    return async (dispatch, getState) => {
        //console.log('getState().pests', getState().pests)
        const page = getState().pests.pagination
        const filter = JSON.stringify(getState().filter.filter)
        const result = await AppFetch.getWithToken("getPests", {
            page,
            filter,
            id,
            type
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : []
        dispatch({
            type: GET_PESTS,
            payload,
            loadMore,
            page
        })
    }
}

export const loadPest = ({id, navigation}) => {
    return async (dispatch, getState) => {
        const result = await AppFetch.getWithToken("getPest", {
            id
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : {}
        dispatch({
            type: GET_PEST,
            payload
        })
    }
}

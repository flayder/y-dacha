import {GET_DISEASES, GET_DISEASE, SET_PAGINATION_DISEASES} from "../types";
import {AppFetch} from "../../AppFetch";

export const setDiseasesPagination = (pagination, resetFilter = false) => {
    return async dispatch => {
        dispatch({
            type: SET_PAGINATION_DISEASES,
            payload: pagination,
            resetFilter
        })
    }
}

export const loadDiseases = ({id, type, loadMore = true, navigation}) => {
    return async (dispatch, getState) => {
        //console.log('getState().pests', getState().pests)
        const page = getState().diseases.pagination
        const filter = JSON.stringify(getState().filter.filter)
        const result = await AppFetch.getWithToken("getDiseases", {
            page,
            filter,
            id,
            type
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : []
        dispatch({
            type: GET_DISEASES,
            payload,
            loadMore,
            page
        })
    }
}

export const loadDisease = ({id, navigation}) => {
    return async (dispatch, getState) => {
        const result = await AppFetch.getWithToken("getDisease", {
            id
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : {}
        dispatch({
            type: GET_DISEASE,
            payload
        })
    }
}

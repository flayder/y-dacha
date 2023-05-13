import {GET_CULTURES, SET_PAGINATION_CULTURES, GET_CULTURE_PREVIEW} from "../types";
import {AppFetch} from "../../AppFetch";

export const setCulturesPagination = (pagination) => {
    return async dispatch => {
        dispatch({
            type: SET_PAGINATION_CULTURES,
            payload: pagination
        })
    }
}

export const loadCultures = ({type, loadMore = true, navigation}) => {
    return async (dispatch, getState) => {
        const state = getState()
        const page = state.cultures.pagination
        const filter = JSON.stringify(state.filter.filter)
        // console.log('culture11', {
        //     page,
        //     type,
        //     filter
        // })
        const result = await AppFetch.getWithToken("getCultures", {
            page,
            type,
            filter
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : []
        dispatch({
            type: GET_CULTURES,
            payload,
            loadMore,
            page
        })
    }
}

export const loadPreview = ({id, navigation}) => {
    return async dispatch => {
        const result = await AppFetch.getWithToken("getCulturePreview", {
            id
        }, {}, navigation)
        //console.log('result', result)
        const preview = (result.result) ? result.data : false
        dispatch({
            type: GET_CULTURE_PREVIEW,
            payload: preview
        })
    }
}
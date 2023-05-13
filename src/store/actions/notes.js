import {GET_NOTES, GET_NOTE, SET_PAGINATION_NOTES} from "../types";
import {AppFetch} from "../../AppFetch";

export const setNotesPagination = (pagination) => {
    return async dispatch => {
        dispatch({
            type: SET_PAGINATION_NOTES,
            payload: pagination
        })
    }
}

export const loadNotes = ({id, type, loadMore = true, navigation}) => {
    return async (dispatch, getState) => {
        //console.log('getState().pests', getState().pests)
        const page = getState().notes.pagination
        const filter = JSON.stringify(getState().filter.filter)
        const result = await AppFetch.getWithToken("getNotes", {
            page,
            filter,
            id,
            type
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : []
        dispatch({
            type: GET_NOTES,
            payload,
            loadMore,
            page
        })
    }
}

export const loadNote = ({id, navigation}) => {
    return async (dispatch, getState) => {
        const result = await AppFetch.getWithToken("getNote", {
            id
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : {}
        dispatch({
            type: GET_NOTE,
            payload
        })
    }
}

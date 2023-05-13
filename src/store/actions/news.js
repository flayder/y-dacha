import {GET_MAIN_NEWS, GET_NEWS, SET_NEWS_PAGINATION} from "../types";
import {AppFetch} from "../../AppFetch";

export const setNewsPagination = (pagination) => {
    return async dispatch => {
        dispatch({
            type: SET_NEWS_PAGINATION,
            payload: pagination
        })
    }
}

export const loadMainNews = ({navigation}) => {
    return async dispatch => {
        const result = await AppFetch.getWithToken("getMainNews", {}, {}, navigation)
        const payload = (result.result) ? result.data : []
        dispatch({
            type: GET_MAIN_NEWS,
            payload
        })
    }
}

export const loadNews = () => {
    return async (dispatch, getState) => {
        const result = await AppFetch.getWithToken("getNews", {
            page: getState().news.pagination
        })
        const payload = (result.result) ? result.data : []
        dispatch({
            type: GET_NEWS,
            payload
        })
    }
}
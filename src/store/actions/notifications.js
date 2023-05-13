import {GET_NOTIFICATIONS, SET_PAGINATION_NOTIFICATION} from "../types";
import {AppFetch} from "../../AppFetch";

export const setNotificationPagination = (pagination) => {
    return async dispatch => {
        dispatch({
            type: SET_PAGINATION_NOTIFICATION,
            payload: pagination
        })
    }
}

export const loadNotifications = ({loadMore = true, navigation}) => {
    return async (dispatch, getState) => {
        //console.log('getState().pests', getState().pests)
        const page = getState().notifications.pagination
        const result = await AppFetch.getWithToken("getNotifications", {
            page,
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result && result.data.hasOwnProperty('items')) ? result.data.items : []
        const counts = (result.result && result.data.hasOwnProperty('counts')) ? result.data.counts : 0
        dispatch({
            type: GET_NOTIFICATIONS,
            payload,
            loadMore,
            page,
            counts
        })
    }
}

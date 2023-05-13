import {SET_DRAWER_POSITION} from "../types";

export const setDrawerPosition = (state) => {
    return dispatch => {
        const payload = state
        dispatch({
            type: SET_DRAWER_POSITION,
            payload
        })
    }
}
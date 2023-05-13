import {AppFetch} from "../../AppFetch"
import {
    CLOSE_GLOBAL_WINDOW,
    GET_BASKET_ITEMS,
    GET_GLOBAL_LOCATION,
    GET_GLOBAL_USER_INFO, GLOBAL_LOGOUT, SET_GLOBAL_MESSAGE, SET_GLOBAL_MUTED, SET_GLOBAL_ORDER,
    SET_GLOBAL_ROUTE,
    SET_MIDDLE_MENU_TYPE
} from "../types";
import {DB} from "../../db";

export const getGlobalUserInfo = ({navigation, forced = false}) => {
    return async (dispatch, getState) => {
        let isGoingTo = false
        if(forced) isGoingTo = true
        else if(!getState().others.userInfo) isGoingTo = true

        let data = null
        if(isGoingTo) {
            const user = await DB.getUser()
            if(typeof user == "object" && user.hasOwnProperty('token') && user.token) {
                const response = await AppFetch.getWithToken("getGlobalUserInfo", {}, {}, navigation)
                //console.log('sss', response)
                if(!response.data) data = false
                else
                    data = response.data
            }

        }

        dispatch({
            type: GET_GLOBAL_USER_INFO,
            user: data
        })
    }
}

export const globalLogout = () => {
    return async (dispatch) => {
        dispatch({
            type: GLOBAL_LOGOUT
        })
    }
}

export const closeGlobalModal = ({navigation}) => {
    return async (dispatch) => {
        const response = await AppFetch.getWithToken("closeModal", {}, {}, navigation)
        console.log('responseCloseModal', response)
        dispatch({
            type: CLOSE_GLOBAL_WINDOW
        })
    }
}

export const getGlobalLocation = ({ip, forced = false}) => {
    return async (dispatch, getState) => {
        let isGoingTo = false
        if(forced) isGoingTo = true
        else if(!getState().others.location) isGoingTo = true

        let data = null
        if(isGoingTo) {
            const response = await AppFetch.get("getLocation", {
                ip
            })
            if(!response.data) data = false
            else
                data = response.data
        }

        dispatch({
            type: GET_GLOBAL_LOCATION,
            location: data
        })
    }
}

export const getBasketItems = ({navigation}) => {
    return async (dispatch, getState) => {
        const response = await AppFetch.getWithToken("getBasketItems", {}, {}, navigation)
        let items = []
        if(response.result) {
            items = response.data
        }
        //console.log(response)
        dispatch({
            type: GET_BASKET_ITEMS,
            items
        })
    }
}

export const setTabNavigationType = (type) => {
    return async (dispatch) => {
        dispatch({
            type: SET_MIDDLE_MENU_TYPE,
            menu_type: type
        })
    }
}

export const setGlobalMuted = (user_id) => {
    return async (dispatch, getState) => {
        let muted = getState().others.muted
        if(muted.includes(user_id)) {
            const index = muted.indexOf(user_id)
            muted.splice(index, 1)
        } else {
            muted.push(user_id)
        }
        dispatch({
            type: SET_GLOBAL_MUTED,
            muted
        })
    }
}

export const setCurrentRoute = (route) => {
    return async (dispatch) => {
        dispatch({
            type: SET_GLOBAL_ROUTE,
            route
        })
    }
}

export const setGlobalMessage = (is) => {
    return async (dispatch) => {
        dispatch({
            type: SET_GLOBAL_MESSAGE,
            is
        })
    }
}

export const setGlobalOrder = (is) => {
    return async (dispatch) => {
        dispatch({
            type: SET_GLOBAL_ORDER,
            is
        })
    }
}
import {
    CLOSE_GLOBAL_WINDOW,
    GET_BASKET_ITEMS,
    GET_GLOBAL_LOCATION,
    GET_GLOBAL_USER_INFO, GLOBAL_LOGOUT, SET_GLOBAL_MESSAGE, SET_GLOBAL_MUTED, SET_GLOBAL_ORDER,
    SET_GLOBAL_ROUTE,
    SET_MIDDLE_MENU_TYPE
} from "../types";

const initialState = {
    basket_items: [],
    menu_type: "buyer",
    userInfo: false,
    location: false,
    currentRoute: false,
    muted: [],
    globalMessage: false,
    globalOrder: false
}

export const Other = (state = initialState, action) => {
    switch (action.type) {
        case CLOSE_GLOBAL_WINDOW:
            const userInfo = state.userInfo
            userInfo.firstAuthicated = 1
            return {
                ...state,
                userInfo
            }
        case GLOBAL_LOGOUT:
            return {
                ...state,
                userInfo: false,
            }
        case GET_GLOBAL_USER_INFO:
            const returning = {
                ...state
            }
            if(action.user !== null) returning.userInfo = action.user

            return returning
        case GET_GLOBAL_LOCATION:
            const returningLocation = {
                ...state
            }
            if(action.location !== null) returningLocation.location = action.location

            return returningLocation
        case SET_GLOBAL_ROUTE:
            return {
                ...state,
                currentRoute: action.route,
            }
        case SET_GLOBAL_MESSAGE:
            return {
                ...state,
                globalMessage: !!action.is,
            }
        case SET_GLOBAL_ORDER:
            return {
                ...state,
                globalOrder: !!action.is,
            }
        case SET_GLOBAL_MUTED:
            return {
                ...state,
                muted: action.muted,
            }
        case GET_BASKET_ITEMS:
            return {
                ...state,
                basket_items: action.items,
            }
        case SET_MIDDLE_MENU_TYPE:
            return {
                ...state,
                menu_type: action.menu_type,
            }
        default: return state
    }
}
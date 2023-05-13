import {INIT, ENABLE_PUSHING, DISABLE_PUSHING, GET_PUSHING} from "../types";

const initialState = {
    init: false,
    pushing: null
}

export const System = (state = initialState, action) => {
    switch (action.type) {
        case INIT: return {
            ...state,
            init: action.payload
        }
        case GET_PUSHING || ENABLE_PUSHING || DISABLE_PUSHING: return {
            ...state,
            pushing: action.payload
        }
        default: return state
    }
}
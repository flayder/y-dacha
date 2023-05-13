import {GET_DRAWER_POSITION, SET_DRAWER_POSITION} from "../types";

const initialState = {
    toggleRightMenu: false
}

export const Drawers = (state = initialState, action) => {
    switch (action.type) {
        case SET_DRAWER_POSITION:
            return {
                ...state,
                toggleRightMenu: action.payload
            }
        default: return state
    }
}
import {GET_CURRENT_USER, SIGN_IN, REMEMBER_TOKEN} from "../types";

const initialState = {
    currentUser: {},
    registerToken: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMEMBER_TOKEN: return {
            ...state,
            registerToken: action.payload
        }
        default: return state
    }
}
import {SET_SEARCH_PARAMETER} from "../types";

const initialState = {
    parameter: "all"
}

export const Search = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_PARAMETER:
            return {
            ...state,
            parameter: action.payload
        }
        default: return state
    }
}
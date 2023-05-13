import {SET_CURRENT_FILTER, GET_CURRENT_FILTER, SET_CURRENT_FILTER_TYPE, EMPTY_FILTER} from "../types";

const initialState = {
    items: [],
    filter: [],
    type: ""
}

export const Filter = (state = initialState, action) => {
    switch (action.type) {
        case EMPTY_FILTER:
            return {
                ...state,
                filter: action.payload
            }
        case SET_CURRENT_FILTER:
            return {
                ...state,
                filter: action.payload
            }
        case GET_CURRENT_FILTER:
            const items = []
            action.payload.map(item => {
                items.push(item)
            })
            //console.log('redux', items)
            return {
                ...state,
                items
            }
        default: return state
    }
}
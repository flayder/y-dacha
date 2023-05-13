import {GET_ORDER_LIST} from "../types";

const initialState = {
    items: []
}

export const Order = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_LIST:
            return {
                ...state,
                items: action.items
            }
        default: return state
    }
}
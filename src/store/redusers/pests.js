import {GET_PEST, GET_PESTS, GET_SORT, SET_PAGINATION_PESTS} from "../types";

const initialState = {
    itemsList: [],
    pagination: 1,
    counts: 0,
    currentPest: {}
}

export const Pests = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGINATION_PESTS:
            return {
                ...state,
                pagination: action.payload
            }
        case GET_PEST:
            return {
                ...state,
                currentPest: action.payload
            }
        case GET_PESTS:
            const items = (action.loadMore && action.page > 1) ? state.itemsList : []
            action.payload.map(item => {
                items.push(item)
            })
            return {
                ...state,
                counts: action.loadMore ? action.payload.length : 0,
                itemsList: items
            }
        default: return state
    }
}
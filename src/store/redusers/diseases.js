import {GET_DISEASE, GET_DISEASES, SET_PAGINATION_DISEASES} from "../types";

const initialState = {
    itemsList: [],
    pagination: 1,
    counts: 0,
    currentDisease: {}
}

export const Diseases = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGINATION_DISEASES:
            return {
                ...state,
                pagination: action.payload
            }
        case GET_DISEASE:
            return {
                ...state,
                currentDisease: action.payload
            }
        case GET_DISEASES:
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
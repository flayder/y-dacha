import {GET_NOTES, GET_NOTE, SET_PAGINATION_NOTES} from "../types";

const initialState = {
    itemsList: [],
    pagination: 1,
    counts: 0,
    currentNote: {}
}

export const Notes = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGINATION_NOTES:
            return {
                ...state,
                pagination: action.payload
            }
        case GET_NOTE:
            return {
                ...state,
                currentNote: action.payload
            }
        case GET_NOTES:
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
import {GET_CULTURE_PREVIEW, GET_CULTURES, SET_PAGINATION_CULTURES} from "../types";

const initialState = {
    preview: false,
    culturesList: [],
    pagination: 1,
    counts: 0
}

export const Cultures = (state = initialState, action) => {
    switch (action.type) {
        case GET_CULTURE_PREVIEW:
            return {
                ...state,
                preview: action.payload
            }
        case SET_PAGINATION_CULTURES:
            return {
                ...state,
                pagination: action.payload
            }
        case GET_CULTURES:
            const items = (action.loadMore && action.page > 1) ? state.culturesList : []
            action.payload.map(item => {
                items.push(item)
            })
            return {
                ...state,
                counts: action.payload.length,
                culturesList: items
            }
        default: return state
    }
}
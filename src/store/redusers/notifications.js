import {GET_NOTIFICATIONS, SET_PAGINATION_NOTIFICATION} from "../types";

const initialState = {
    itemsList: [],
    pagination: 1,
    counts: 0,
    fullCountItems: 0
}

export const Notifications = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGINATION_NOTIFICATION:
            return {
                ...state,
                pagination: action.payload
            }
        case GET_NOTIFICATIONS:
            const items = (action.loadMore && action.page > 1) ? state.itemsList : []
            action.payload.map(item => {
                items.push(item)
            })
            return {
                ...state,
                counts: action.loadMore ? action.payload.length : 0,
                itemsList: items,
                fullCountItems: action.counts
            }
        default: return state
    }
}
import {GET_CHEMICAL, GET_CHEMICALS, SET_PAGINATION_CHEMICALS} from "../types";
import {SORTBYNAME} from "../../../global";

const initialState = {
    itemsList: [],
    pagination: 1,
    counts: 0,
    // sort: SORTBYNAME,
    // order: true,
    currentChemical: {}
}

export const Chemicals = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGINATION_CHEMICALS:
            return {
                ...state,
                pagination: action.payload
            }
        case GET_CHEMICAL:
            return {
                ...state,
                currentChemical: action.payload
            }
        case GET_CHEMICALS:
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
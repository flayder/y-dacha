import {GET_MAIN_SORTS, GET_SORT, GET_SORTS, SET_PAGINATION_SORTS, SET_SORTS_SORTING} from "../types";
import {SORTBYNAME} from "../../../global";

const initialState = {
    mainSad: [],
    mainOgorod: [],
    mainKlumba: [],
    itemsList: [],
    pagination: 1,
    counts: 0,
    sort: SORTBYNAME,
    order: true,
    currentSort: {}
}

export const Sorts = (state = initialState, action) => {
    switch (action.type) {
        case GET_MAIN_SORTS:
            const payload = action.payload
            return {
                ...state,
                mainSad: (payload.hasOwnProperty('sad') && payload.sad.length > 0) ? payload.sad : [],
                mainOgorod: (payload.hasOwnProperty('ogorod') && payload.ogorod.length > 0) ? payload.ogorod : [],
                mainKlumba: (payload.hasOwnProperty('klumba') && payload.klumba.length > 0) ? payload.klumba : [],
            }
        case SET_SORTS_SORTING:
            return {
                ...state,
                sort: action.sort ? action.sort : SORTBYNAME,
                order: !!action.order
            }
        case SET_PAGINATION_SORTS:
            return {
                ...state,
                pagination: action.payload
            }
        case GET_SORT:
            return {
                ...state,
                currentSort: action.payload
            }
        case GET_SORTS:
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
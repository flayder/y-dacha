import {
    GET_MAIN_MASTERS,
    GET_MASTER,
    GET_MASTERS,
    SET_PAGINATION_MASTERS,
    SET_MASTERS_SORTING,
    GET_MASTER_ASSORTMENT, GET_MASTER_COMMENTS, SET_MASTERS_REGION
} from "../types";
import {MASTERBYNAME} from "../../../global";

const initialState = {
    mainMasters: [],
    itemsList: [],
    pagination: 1,
    counts: 0,
    sort: MASTERBYNAME,
    order: true,
    currentItem: {},
    assortments: [],
    comments: [],
    regions: [],
    region: 0
}

export const Masters = (state = initialState, action) => {
    switch (action.type) {
        case GET_MAIN_MASTERS:
            return {
                ...state,
                mainMasters: action.payload
            }
        case SET_MASTERS_SORTING:
            return {
                ...state,
                sort: action.sort ? action.sort : MASTERBYNAME,
                order: !!action.order
            }
        case SET_MASTERS_REGION:
            return {
                ...state,
                region: action.region,
            }
        case GET_MASTER_COMMENTS:
            return {
                ...state,
                comments: action.payload
            }
        case SET_PAGINATION_MASTERS:
            return {
                ...state,
                pagination: action.payload
            }
        case GET_MASTER_ASSORTMENT:
            return {
                ...state,
                assortments: action.payload
            }
        case GET_MASTER:
            return {
                ...state,
                currentItem: action.payload
            }
        case GET_MASTERS:
            const items = (action.loadMore && action.page > 1) ? state.itemsList : []
            action.payload.map(item => {
                items.push(item)
            })
            return {
                ...state,
                counts: action.loadMore ? action.payload.length : 0,
                itemsList: items,
                regions: action.regions
            }
        default: return state
    }
}
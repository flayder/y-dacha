import {
    GET_ALL_SHOPS,
    GET_MAIN_SHOPES,
    GET_SHOP,
    GET_SHOPS,
    SET_PAGINATION_SHOPS,
    SET_SHOPS_OPENED,
    SET_SHOPS_SORTING
} from "../types";
import {SHOPBYNAME} from "../../../global";

const initialState = {
    mainShops: [],
    itemsList: [],
    opened: [],
    currentShop: {},
    sort: SHOPBYNAME,
    order: true,
    counts: 0,
    pagination: 1
}

export const Shops = (state = initialState, action) => {
    switch (action.type) {
        case GET_MAIN_SHOPES:
            return {
                ...state,
                mainShops: action.payload
            }
        case SET_SHOPS_SORTING:
            //console.log('SET_SHOPS_SORTING', action)
            return {
                ...state,
                sort: action.sort ? action.sort : SHOPBYNAME,
                order: !!action.order
            }
        case SET_SHOPS_OPENED:
            const id = action.id
            const opened = state.opened
            const index = opened.indexOf(id)

            if(index !== -1) {
                opened.splice(index, 1)
            } else {
                opened.push(id)
            }

            return {
                ...state,
                opened
            }
        case SET_PAGINATION_SHOPS:
            return {
                ...state,
                pagination: action.payload
            }
        case GET_SHOP:
            return {
                ...state,
                currentShop: action.payload
            }
        case GET_SHOPS:
            let items = (action.loadMore && action.page > 1) ? state.itemsList : []
            action.payload.map(item => {
                items.push(item)
            })
            return {
                ...state,
                counts: action.loadMore ? action.payload.length : 0,
                itemsList: items
            }
        case GET_ALL_SHOPS:
            let itemsArr = (action.loadMore && action.page > 1) ? state.itemsList : []
            action.payload.map(item => {
                itemsArr.push(item)
            })
            return {
                ...state,
                counts: action.loadMore ? action.payload.length : 0,
                itemsList: itemsArr
            }
        default: return state
    }
}
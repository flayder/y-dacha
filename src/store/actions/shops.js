import {
    GET_ALL_SHOPS,
    GET_MAIN_SHOPES, GET_OPENED,
    GET_SHOP,
    GET_SHOPS,
    SET_PAGINATION_SHOPS,
    SET_SHOPS_OPENED,
    SET_SHOPS_SORTING
} from "../types";
import {AppFetch} from "../../AppFetch";

export const loadMainShops = ({navigation}) => {
    return async dispatch => {
        const result = await AppFetch.getWithToken("getMainShops", {}, {}, navigation)
        const payload = (result.result) ? result.data : []
        dispatch({
            type: GET_MAIN_SHOPES,
            payload
        })
    }
}

export const setShopsOpened = (id) => {
    return async dispatch => {
        dispatch({
            type: SET_SHOPS_OPENED,
            id
        })
    }
}

// export const getShopsOpened = (id) => {
//     return async dispatch => {
//         dispatch({
//             type: GET_OPENED,
//             id
//         })
//     }
// }

export const setShopsSorting = (sort, order) => {
    return async dispatch => {
        dispatch({
            type: SET_SHOPS_SORTING,
            sort,
            order
        })
    }
}

export const setShopsPagination = (pagination) => {
    return async dispatch => {
        dispatch({
            type: SET_PAGINATION_SHOPS,
            payload: pagination
        })
    }
}

export const loadShop = ({id, navigation}) => {
    return async (dispatch, getState) => {
        const result = await AppFetch.getWithToken("getShop", {
            id
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : {}
        dispatch({
            type: GET_SHOP,
            payload
        })
    }
}

export const loadShops = ({id, type, loadMore = true, navigation}) => {
    return async (dispatch, getState) => {
        const state = getState()
        const filter = JSON.stringify(state.filter.filter)
        const order = state.shops.order ? "asc" : "desc"
        const page = state.shops.pagination
        const sort = state.shops.sort
        const result = await AppFetch.getWithToken("getShops", {
            page,
            sort,
            order,
            id,
            type,
            filter
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : []
        dispatch({
            type: GET_SHOPS,
            payload,
            loadMore,
            page
        })
    }
}

export const loadAllShops = ({loadMore = true, navigation}) => {
    return async (dispatch, getState) => {
        const state = getState()
        const filter = JSON.stringify(state.filter.filter)
        //console.log('filter', filter)
        const order = state.shops.order ? "asc" : "desc"
        const page = state.shops.pagination
        const sort = state.shops.sort
        const result = await AppFetch.getWithToken("getAllShops", {
            page,
            sort,
            order,
            filter
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : []
        dispatch({
            type: GET_ALL_SHOPS,
            payload,
            loadMore,
            page
        })
    }
}
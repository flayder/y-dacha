import {GET_MAIN_SORTS, GET_SORTS, GET_SORT, SET_PAGINATION_SORTS, SET_SORTS_SORTING} from "../types";
import {AppFetch} from "../../AppFetch";

export const setSortsSorting = (sort, order) => {
    return async dispatch => {
        dispatch({
            type: SET_SORTS_SORTING,
            sort,
            order
        })
    }
}

export const loadMainSorts = ({navigation}) => {
    return async dispatch => {
        const result = await AppFetch.getWithToken("getMainSorts", {}, {}, navigation)
        const payload = (result.result) ? result.data : []
        dispatch({
            type: GET_MAIN_SORTS,
            payload
        })
    }
}

export const setSortsPagination = (pagination) => {
    return async dispatch => {
        dispatch({
            type: SET_PAGINATION_SORTS,
            payload: pagination
        })
    }
}

export const loadSort = ({id, navigation}) => {
    return async (dispatch, getState) => {
        const result = await AppFetch.getWithToken("getSort", {
            id
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : {}
        dispatch({
            type: GET_SORT,
            payload
        })
    }
}

export const loadSorts = ({id, type, loadMore = true, navigation}) => {
    return async (dispatch, getState) => {
        const state = getState()
        const order = state.sorts.order ? "asc" : "desc"
        const page = state.sorts.pagination
        const sort = state.sorts.sort
        const filter = JSON.stringify(state.filter.filter)
        const result = await AppFetch.getWithToken("getSorts", {
            page,
            sort,
            filter,
            order,
            id,
            type
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : []
        dispatch({
            type: GET_SORTS,
            payload,
            loadMore,
            page
        })
    }
}

import {
    GET_MAIN_MASTERS,
    GET_MASTER,
    GET_MASTERS,
    SET_PAGINATION_MASTERS,
    SET_MASTERS_SORTING, GET_MASTER_ASSORTMENT, GET_MASTER_COMMENTS, SET_MASTERS_REGION
} from "../types";
import {AppFetch} from "../../AppFetch";

export const loadMainMasters = ({navigation}) => {
    return async dispatch => {
        const result = await AppFetch.getWithToken("getMainMasters", {}, {}, navigation)
        const payload = (result.result) ? result.data : []
        //console.log('result.result', result)
        dispatch({
            type: GET_MAIN_MASTERS,
            payload
        })
    }
}

export const loadMasterAssortment = ({id, navigation}) => {
    return async dispatch => {
        const result = await AppFetch.getWithToken("getMaterAssortment", {
            id
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : []
        dispatch({
            type: GET_MASTER_ASSORTMENT,
            payload
        })
    }
}

export const loadMyMasterAssortment = ({navigation}) => {
    return async dispatch => {
        const result = await AppFetch.getWithToken("getMyMaterAssortment", {}, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : []
        dispatch({
            type: GET_MASTER_ASSORTMENT,
            payload
        })
    }
}

export const setMastersSorting = (sort, order) => {
    return async dispatch => {
        dispatch({
            type: SET_MASTERS_SORTING,
            sort,
            order
        })
    }
}

export const setMastersPagination = (pagination) => {
    return async dispatch => {
        dispatch({
            type: SET_PAGINATION_MASTERS,
            payload: pagination
        })
    }
}

export const loadMaster = ({id, navigation}) => {
    return async (dispatch, getState) => {
        const result = await AppFetch.getWithToken("getMaster", {
            id
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : {}
        dispatch({
            type: GET_MASTER,
            payload
        })
    }
}

export const setMastersRegion = (id) => {
    return async (dispatch) => {
        dispatch({
            type: SET_MASTERS_REGION,
            region: id
        })
    }
}

export const loadMasters = ({loadMore = true, navigation}) => {
    return async (dispatch, getState) => {
        const state = getState()
        const order = state.masters.order ? "asc" : "desc"
        const page = state.masters.pagination
        const sort = state.masters.sort
        const region = state.masters.region
        const filter = JSON.stringify(state.filter.filter)
        // console.log('filter11', {
        //     page,
        //     sort,
        //     filter,
        //     order,
        //     region
        // })
        const result = await AppFetch.getWithToken("getMasters", {
            page,
            sort,
            filter,
            order,
            region
        }, {}, navigation)
        //console.log('result', result)
        let regions = []
        const payload = (result.result) ? result.data : []
        if(result.hasOwnProperty('regions') && Array.isArray(result.regions) && result.regions.length > 0) regions = result.regions
        dispatch({
            type: GET_MASTERS,
            payload,
            loadMore,
            regions,
            page
        })
    }
}
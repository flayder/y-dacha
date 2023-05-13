import {GET_CHEMICAL, GET_CHEMICALS, SET_CHEMICAL_SORTING, SET_PAGINATION_CHEMICALS} from "../types";
import {AppFetch} from "../../AppFetch";

export const setChemicalSorting = (sort, order) => {
    return async dispatch => {
        dispatch({
            type: SET_CHEMICAL_SORTING,
            sort,
            order
        })
    }
}

// export const loadMainSorts = () => {
//     return async dispatch => {
//         const result = await AppFetch.getWithToken("getMainSorts")
//         const payload = (result.result) ? result.data : []
//         dispatch({
//             type: GET_MAIN_SORTS,
//             payload
//         })
//     }
// }

export const setChemicalsPagination = (pagination) => {
    return async dispatch => {
        dispatch({
            type: SET_PAGINATION_CHEMICALS,
            payload: pagination
        })
    }
}

export const loadChemical = ({id, navigation}) => {
    return async (dispatch, getState) => {
        const result = await AppFetch.getWithToken("getChemical", {
            id
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : {}
        dispatch({
            type: GET_CHEMICAL,
            payload
        })
    }
}

export const loadChemicals = ({loadMore = true, navigation}) => {
    return async (dispatch, getState) => {
        const page = getState().chemicals.pagination
        const filter = JSON.stringify(getState().filter.filter)
        const result = await AppFetch.getWithToken("getChemicals", {
            page,
            filter
        }, {}, navigation)
        //console.log('result', result)
        const payload = (result.result) ? result.data : []
        dispatch({
            type: GET_CHEMICALS,
            payload,
            loadMore,
            page
        })
    }
}

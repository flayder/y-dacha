import {
    GET_EVENT,
    GET_EVENT_COMMENTS,
    GET_EVENTS,
    GET_MAIN_EVENTS, GET_USER_EVENTS,
    SET_EVENTS_CURRENT,
    SET_EVENTS_DATE, SET_EVENTS_TYPE
} from "../types";
import {AppFetch} from "../../AppFetch";

export const loadMainEvents = ({navigation}) => {
    return async dispatch => {
        const result = await AppFetch.getWithToken("getMainEvents", {}, {}, navigation)
        const payload = (result.result) ? result.data : []
        dispatch({
            type: GET_MAIN_EVENTS,
            payload
        })
    }
}

export const loadEvent = ({id, navigation}) => {
    return async dispatch => {
        const result = await AppFetch.getWithToken("getEventDetail", {id}, {}, navigation)
        const payload = (result.result) ? result.data : []
        //console.log('result.data', result.data)
        dispatch({
            type: GET_EVENT,
            payload
        })
    }
}

export const loadEventComments = ({id, navigation}) => {
    return async dispatch => {
        const result = await AppFetch.getWithToken("getEventComments", {id}, {}, navigation)
        const payload = (result.result) ? result.data : []
        dispatch({
            type: GET_EVENT_COMMENTS,
            payload
        })
    }
}

const getEventResult = async ({getState, url, region = 0, navigation, init}) => {
    let result
    if(init) {
        result = await AppFetch.getWithToken(url, {region}, {}, navigation)
    } else {
        const state = getState().events
        const date = state.date
        const selected = state.selected
        const type = state.type
        // console.log({
        //     date,
        //     selected,
        //     type
        // })
        result = await AppFetch.getWithToken(url, {
            date,
            selected,
            type
        }, {}, navigation)
    }

    return Promise.resolve(result)
}

export const loadEvents = ({navigation, region = 0, init = true}) => {
    return async (dispatch, getState) => {
        const result = await getEventResult({getState, url: "getEvents", navigation, region, init})

        const payload = (result.result) ? result.data : []
        //console.log('payload', JSON.stringify(result))
        dispatch({
            type: GET_EVENTS,
            payload
        })
    }
}

export const loadUserEvents = ({navigation, region = 0, init = true}) => {
    return async (dispatch, getState) => {
        const result = await getEventResult({getState, region, url: "getUserEvents", navigation, init})

        const payload = (result.result) ? result.data : []
        //console.log('payload', payload)
        dispatch({
            type: GET_EVENTS,
            payload
        })
    }
}

export const setEventDate = (date) => {
    return async dispatch => {
        dispatch({
            type: SET_EVENTS_DATE,
            date
        })
    }
}

export const setEventSelected = (selected) => {
    return async dispatch => {
        dispatch({
            type: SET_EVENTS_CURRENT,
            selected
        })
    }
}

export const setEventType = (type) => {
    return async dispatch => {
        console.log('asasa', type)
        dispatch({
            type: SET_EVENTS_TYPE,
            typeIs: type
        })
    }
}
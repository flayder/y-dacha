import {
    GET_EVENT,
    GET_EVENT_COMMENTS,
    GET_EVENTS,
    GET_MAIN_EVENTS,
    SET_EVENTS_CURRENT,
    SET_EVENTS_DATE, SET_EVENTS_TYPE
} from "../types";

const initialState = {
    mainEvents: [],
    itemsList: [],
    currentEvent: [],
    types: [],
    type: "",
    date: "",
    selected: "",
    regions: [],
    comments: []
}

export const Events = (state = initialState, action) => {
    switch (action.type) {
        case GET_MAIN_EVENTS:
            return {
            ...state,
            mainEvents: action.payload
        }
        case GET_EVENT:
            return {
                ...state,
                currentEvent: action.payload
            }
        case GET_EVENT_COMMENTS:
            return {
                ...state,
                comments: action.payload
            }
        case SET_EVENTS_DATE:
            return {
                ...state,
                date: action.date,
                selected: ""
            }
        case SET_EVENTS_TYPE:
            return {
                ...state,
                type: action.typeIs
            }
        case SET_EVENTS_CURRENT:
            return {
                ...state,
                selected: action.selected
            }
        case GET_EVENTS:
            let itemsList = []
            let types = []
            let regions = []

            if(action.payload.hasOwnProperty('types')) {
                types = action.payload.types
            }

            if(action.payload.hasOwnProperty('events')) {
                itemsList = action.payload.events
            }

            if(action.payload.hasOwnProperty('regions')) {
                regions = action.payload.regions
            }

            return {
                ...state,
                itemsList,
                types,
                regions,
            }
        default: return state
    }
}
import {GET_MAIN_NEWS, GET_NEWS, SET_NEWS_PAGINATION} from "../types";

const initialState = {
    mainNews: [],
    newsList: [],
    pagination: 1,
    counts: 0
}

export const News = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEWS_PAGINATION:
            return {
                ...state,
                pagination: action.payload
            }
        case GET_MAIN_NEWS:
            return {
            ...state,
            mainNews: action.payload
        }
        case GET_NEWS:
            const news = state.newsList
            action.payload.map(item => {
                news.push(item)
            })
            return {
                ...state,
                counts: action.payload.length,
                newsList: news
            }
        default: return state
    }
}
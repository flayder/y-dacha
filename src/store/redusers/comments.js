import {GET_ALL_COMMENTS, GET_COMMENTS, SET_COMMENT_TAB_NAME} from "../types";

const initialState = {
    comments: [],
    votes: [],
    //pagination: 1,
    counts: 0,
    commentsCount: 0,
    tabName: "Сообщения"
}

export const Comments = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS:
            const items = (action.loadMore && action.page > 1) ? state.comments : []
            action.comments.map(item => {
                items.push(item)
            })
            return {
                ...state,
                comments: items,
                votes: action.votes,
                counts: action.counts,
                commentsCount: action.commentsCount
                //pagination: action.page
            }
        case GET_ALL_COMMENTS:
            const items1 = (action.loadMore && action.page > 1) ? state.comments : []
            action.comments.map(item => {
                items1.push(item)
            })
            return {
                ...state,
                comments: items1,
                counts: action.counts
            }
        case SET_COMMENT_TAB_NAME:
            //console.log('action.tabName', action.tabName)
            return {
                ...state,
                tabName: action.tabName
            }
        default: return state
    }
}
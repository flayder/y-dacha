import {AppFetch} from "../../AppFetch"
import {GET_ALL_COMMENTS, GET_COMMENTS, SET_COMMENT_TAB_NAME} from "../types";

export const getComments = (
    {
        id,
        type,
        pagination = 1,
        loadMore = false, navigation
    }) => {
    return async (dispatch, getState) => {
        let page = pagination
        let counts = getState().comments.counts
        let comments = getState().comments.comments
        let commentsCount = 0
        let votes = []
        //if(counts > 0 && loadMore) page += 1
        const result = await AppFetch.getWithToken("getComments", {
            id,
            type,
            page
        }, {}, navigation)
        //console.log('result.result', result.data)
        //console.log('loading')
        if(result.result) {
            try {
                if(result.data.hasOwnProperty('comments'))
                    comments = result.data.comments
                if(result.data.hasOwnProperty('votes'))
                    votes = result.data.votes
                if(result.data.hasOwnProperty('counts'))
                    commentsCount = result.data.counts
            } catch (e) {}
        }

        counts = comments.length

        dispatch({
            type: GET_COMMENTS,
            comments,
            votes,
            counts,
            page,
            loadMore,
            commentsCount
        })
    }
}

export const getAllComments = ({ pagination = 1, loadMore = false, navigation}) => {
    return async (dispatch, getState) => {
        let page = pagination
        let comments = getState().comments.comments
        let votes = []
        //if(counts > 0 && loadMore) page += 1
        const result = await AppFetch.getWithToken("getAllComments", {
            page
        }, {}, navigation)
        //console.log('result.result', result.data, page)
        //console.log('loading')
        if(result.result) {
            try {
                if(result.data.hasOwnProperty('comments'))
                    comments = result.data.comments
            } catch (e) {}
        }

        const counts = comments.length

        dispatch({
            type: GET_ALL_COMMENTS,
            comments,
            page,
            counts,
            loadMore
        })
    }
}

export const setCommentTab = ({tabName}) => {
    return async (dispatch) => {
        dispatch({
            type: SET_COMMENT_TAB_NAME,
            tabName,
        })
    }
}
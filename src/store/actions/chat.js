import {AppFetch} from "../../AppFetch"
import {GET_CHAT, GET_CHATS} from "../types";

export const getChat = ({id, type, pagination = 1, loadMore = false, navigation}) => {
    return async (dispatch, getState) => {
        let page = pagination
        let messages = {}
        let user_to = {}
        let user_from = {}
        let blocked = false
        //if(counts > 0 && loadMore) page += 1
        const result = await AppFetch.getWithToken("getChat", {
            id,
            type,
            page
        }, {}, navigation)
        //console.log('result.result', result)
        //console.log('loading', page)
        if(result.result) {
            if(result.data.hasOwnProperty('messages'))
                messages = result.data.messages
            if(result.data.hasOwnProperty('user_to'))
                user_to = result.data.user_to
            if(result.data.hasOwnProperty('user_from'))
                user_from = result.data.user_from
            if(result.data.hasOwnProperty('blocked'))
                blocked = result.data.blocked
        }

        //counts = messages.length

        dispatch({
            type: GET_CHAT,
            messages,
            user_to,
            user_from,
            //counts,
            page,
            loadMore,
            blocked
        })
    }
}

export const getChats = ({navigation}) => {
    return async (dispatch, getState) => {
        let messages = {}
        let user = {}
        //if(counts > 0 && loadMore) page += 1
        const result = await AppFetch.getWithToken("getChats", {}, {}, navigation)
        //console.log('result', result)
        if(result.result) {
            if(result.data.hasOwnProperty('messages'))
                messages = result.data.messages
            if(result.data.hasOwnProperty('user'))
                user = result.data.user
        }

        dispatch({
            type: GET_CHATS,
            messages,
            user
        })
    }
}
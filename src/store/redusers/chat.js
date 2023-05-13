import {GET_CHAT, GET_CHATS} from "../types";

const initialState = {
    messages: [],
    user_from: {},
    user_to: {},
    blocked: false,
    counts: 0,
    user: {}
}

export const Chat = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHAT:
            let items
            let newItems = []

            if(action.loadMore && action.page > 1) {
                items = state.messages
            } else {
                items = []
            }

            const counts = action.messages.length
            //console.log('action.messages', counts)

            action.messages.map(item => {
                items.push(item)
            })

            // let cloneItems = items
            //
            // items = []
            //
            // newItems.map(item => {
            //     items.push(item)
            // })
            //
            // cloneItems.map(item => {
            //     items.push(item)
            // })

            return {
                ...state,
                counts,
                messages: items,
                user_to: action.user_to,
                user_from: action.user_from,
                blocked: action.blocked
            }
        case GET_CHATS:

            return {
                ...state,
                messages: action.messages,
                user: action.user
            }
        default: return state
    }
}
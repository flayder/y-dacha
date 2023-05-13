import {GET_CURRENT_USER, HAS_ACCESS, REMEMBER_TOKEN} from "../types";
import {DB} from "@root/db"
import {AppFetch} from "../../AppFetch";
//export const

export const signIn = (email, password) => {
    return async dispatch => {
        const auth = await AppFetch.get("auth", {
            email:      email,
            password:   password
        })
        console.log(auth)
        dispatch({
            type: GET_CURRENT_USER,
            payload: payload
        })
    }
}

export const hasAccess = () => {
    return async dispatch => {
        let payload = false
        const dbUser = await DB.getUser()

        if(dbUser.token) {
            const isAuth = await AppFetch.get("isAuth", {}, {
                "Content-type": "application/json",
                "Authorization": `Bearer ${dbUser.token}`
            })
            //console.log('isAuth', isAuth)
            if(isAuth) payload = true

        } else if(dbUser.login && dbUser.password) {
            const auth = await AppFetch.get("auth", {
                email:      dbUser.login,
                password:   dbUser.password
            })
            //console.log('auth', auth)
            if(auth.hasOwnProperty('token')) {
                const updated = await DB.update({
                    'table_name':   'user',
                    'names':        ['token'],
                    'values':       [auth.token],
                    'where':        `id = ${dbUser.id}`
                })
                if(updated) payload = true
            }
        }

        dispatch({
            type: HAS_ACCESS,
            payload: payload
        })
    }
}

export const getCurrentUser = () => {
    return dispatch => {
        DB.getUser().then(dbUser => {
            let payload = false
            if(dbUser.token) {
                AppFetch
            }
            dispatch({
                type: GET_CURRENT_USER,
                payload: payload
            })
        })
    }
}

export const setRememberToken = ($token) => {
    return dispatch => {
        dispatch({
            type: REMEMBER_TOKEN,
            payload: $token
        })
    }
}
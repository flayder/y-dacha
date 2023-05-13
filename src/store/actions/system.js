import {INIT, GET_PUSHING, ENABLE_PUSHING, DISABLE_PUSHING} from "../types";
import {DB} from "@root/db";

export const init = () => {
    return {
        type: INIT,
        payload: true
    }
}

export const getPushing = () => {
    return async dispatch => {
        const payload = await DB.getPushing()
        dispatch({
            type: GET_PUSHING,
            payload
        })
    }
}

export const enablePushing = () => {
    return async dispatch => {
        await DB.update({
            table_name: "options",
            names: ["name", "value"],
            values: ["pushing", true],
            where: "name = 'pushing'"
        })
        //console.log('enabled')
        dispatch({
            type: ENABLE_PUSHING,
            payload: 1
        })
    }
}

export const disablePushing = () => {
    return async dispatch => {

        //console.log('disabled')
        dispatch({
            type: DISABLE_PUSHING,
            payload: 0
        })
    }
}
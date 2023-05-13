import React from "react"
import AppBottomFooter from "./AppBottomFooter"
import AppFirstOpenAnimation from "./AppFirstOpenAnimation"
import {useSelector} from "react-redux";

export default () => {
    const auth = useSelector(state => state.others.userInfo.firstAuthicated)
    //console.log('auth', auth)
    if(auth !== undefined && !auth)
        return (
            <>
                <AppBottomFooter />
                <AppFirstOpenAnimation />
            </>
        )
    else
        return <AppBottomFooter />
}
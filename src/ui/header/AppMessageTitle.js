import React from "react"
import {useSelector} from "react-redux";
import {AppTextBold} from "../AppTextBold";

export default () => {
    const tab = useSelector(state => state.comments.tabName)

    return <AppTextBold style={{textAlign: "center", marginTop: 20}}>
        {tab}
    </AppTextBold>
}
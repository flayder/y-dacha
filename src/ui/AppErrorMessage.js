import React from "react"
import {StyleSheet} from "react-native";
import {AppTextBold} from "./AppTextBold";

export const AppErrorMessage = ({errorMessage, toShow = false, style}) => {
    if(toShow && errorMessage !== "") {
        return (
            <AppTextBold style={{...styles.error, ...style}}>
                {errorMessage}
            </AppTextBold>
        )
    } else return <></>
}

const styles = StyleSheet.create({
    error: {
        color: "red",
        fontSize: 20,
        marginTop: 25,
        marginBottom: 25,
        textAlign: "center"
    }
})
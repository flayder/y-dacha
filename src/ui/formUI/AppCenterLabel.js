import React from "react"
import {StyleSheet} from "react-native"
import {AppTextBold} from "../AppTextBold";

export default ({text, style}) => {
    return <AppTextBold style={{...styles.text, ...style}}>{text}</AppTextBold>
}

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        marginTop: 15,
        marginBottom: 15
    }
})
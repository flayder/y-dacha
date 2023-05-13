import React from "react"
import {View, StyleSheet, Text} from "react-native"

export const AppTextCom = props => {
    return <Text style={{...styles.default, ...props.style}}>{props.children}</Text>
}

const styles = StyleSheet.create({
    default: {
        fontFamily: "comfortaa-regular",
        fontSize: 17,
        marginTop: 15,
        marginBottom: 15,
    }
})
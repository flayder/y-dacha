import React from "react"
import {View, StyleSheet, Text} from "react-native"

export const AppTextItalic = props => {
    return <Text style={{...styles.default, ...props.style}}>{props.children}</Text>
}

const styles = StyleSheet.create({
    default: {
        fontFamily: "ptsans-italic",
        fontSize: 16
    }
})
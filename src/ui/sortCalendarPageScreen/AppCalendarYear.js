import React from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {AppText} from "../AppText";
import {THEME} from "../../../theme";

export default ({data, year, borderColor, text, onResult}) => {
    const bgColor = THEME.YELLOW
    const active = year == text
    const measure = (active) ? 80 : 60
    const radius = (active) ? 40 : 30
    const bgCol = (active && bgColor) ? bgColor : "#fff"
    const borColor = (active && borderColor) ? borderColor : THEME.GREY
    const color = (active && bgColor) ? "#fff" : THEME.GREY
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{
                ...styles.wrap,
                width: measure,
                height: measure,
                borderRadius: radius,
                backgroundColor: bgCol,
                borderColor: borColor
            }}
            onPress={() => {
                if(onResult) onResult(text)
            }}
        >
            <AppText style={{...styles.text, color: color}}>
                {text}
            </AppText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrap: {
        alignItems: "center",
        justifyContent: "center",
        borderStyle: "solid",
        borderWidth: 1
    },
    text: {
        marginTop: 0,
        marginBottom: 0
    }
})
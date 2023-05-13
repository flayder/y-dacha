import React from "react"
import {StyleSheet, TouchableOpacity} from "react-native"
import SWGImage from "expo-svg-uri";
import {AppText} from "@root/ui/AppText"

export const AppMoreLink = ({style, arrow, width = 15, height = 15, onPress, text}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.more, ...style}}>
            <AppText style={styles.text}>{text}</AppText>
            <SWGImage
                width={width}
                height={height}
                source={require("@images/more/more.svg")}
                style={{...styles.arrow, ...arrow}}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    more: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 3,
        marginRight: -5
    },
    text: {
        fontSize: 14
    },
    arrow: {
        marginLeft: 10
    }
})
import React from "react"
import {View, StyleSheet, ImageBackground, Dimensions} from "react-native"
import {AppText} from "./AppText";

export default ({imgSrc = false, reversed = false, style, text}) => {
    if(!imgSrc && !reversed) imgSrc = require("@images/sorts/notification.png")
    else if(!imgSrc && reversed) imgSrc = require("@images/sorts/notification-reversed.png")
    return (
        <View style={{...style}}>
            <View style={styles.wrap}>
                <ImageBackground
                    style={styles.img}
                    source={imgSrc}
                    resizeMode={"stretch"}
                />
                <AppText style={styles.text}>
                    {text}
                </AppText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        position: "relative"
    },
    text: {
        fontSize: 12,
        marginTop: 0,
        paddingTop: 10,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 10,
        textAlign: "center",
        lineHeight: 11
    },
    img: {
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
    }
})
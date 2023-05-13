import {StyleSheet} from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";

export default (
    {
        children = <></>,
        style,
        uri,
        resizeMode = "cover",
        priority = "normal"
    }) => {

    let priorityIs

    switch (priority) {
        case "low":
            priorityIs = FastImage.priority.low
            break
        case "high":
            priorityIs = FastImage.priority.high
            break
        default:
            priorityIs = FastImage.priority.normal
    }

    let resizeIs

    switch (resizeMode) {
        case "contain":
            resizeIs = FastImage.resizeMode.contain
            break
        case "stretch":
            resizeIs = FastImage.resizeMode.stretch
            break
        case "center":
            resizeIs = FastImage.resizeMode.center
            break
        default:
            resizeIs = FastImage.resizeMode.cover
    }

    return (
        <FastImage
            style={style}
            source={{
                uri,
                priority: priorityIs,
            }}
            resizeMode={resizeIs}
        >
            {children}
        </FastImage>
    )
}
const styles = StyleSheet.create({

})
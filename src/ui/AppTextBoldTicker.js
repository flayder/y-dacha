import React from "react"
import {StyleSheet, Text} from "react-native"
import TextTicker from 'react-native-text-ticker'

export default ({
        style,
        children,
        loop = true,
        bounce = true,
        duration = 3000,
        repeatSpacer = 50,
        margueeDelay = 1000
    }) => {
    try {
        return <TextTicker
            duration={duration}
            loop={loop}
            bounce={bounce}
            repeatSpacer={repeatSpacer}
            marqueeDelay={margueeDelay}
            style={{...styles.default, ...style}}
        >
            {children}
        </TextTicker>
    } catch (e) {
        return <></>
    }
}


const styles = StyleSheet.create({
    default: {
        fontFamily: "ptsans-bold",
        fontSize: 17,
        marginTop: 15,
        marginBottom: 15,
    }
})
import React from "react"
import {AppBlueButton} from "../AppBlueButton";
import {ActivityIndicator, StyleSheet} from "react-native";

export default ({text = "", indicator = false, style, onPress}) => {
    const len = text.length * 12
    const width = (len > 100) ? len : 100

    if(!indicator)
        return (
            <AppBlueButton
                style={{...styles.btn, width: width, ...style}}
                onPress={() => {
                    if(onPress) onPress()
                }}
            >
                {text}
            </AppBlueButton>
        )
    else
    return (
        <AppBlueButton
            style={{...styles.btn, width: width, ...style}}
        >
            <ActivityIndicator size="small" style={{marginRight: 20}} color={"#fff"} />
            {text}
        </AppBlueButton>
    )
}

const styles = StyleSheet.create({
    btn: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: "auto",
        marginRight: "auto"
    }
})
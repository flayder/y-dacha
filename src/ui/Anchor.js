import React from "react"
import {StyleSheet, TouchableOpacity} from "react-native"
import {useNavigation} from "@react-navigation/native";
import {THEME} from "../../theme";
import {AppText} from "./AppText";

export const Anchor = ({children, style, onPress, opacity = .8}) => {
    const linkHandler = () => {
        if(onPress)
            onPress()
    }
    return (
        <TouchableOpacity style={{...styles.anchor, ...style}} onPress={linkHandler} activeOpacity={opacity}>
            <AppText style={{...styles.anchor, ...style}}>
                {children}
            </AppText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    anchor: {
        color: THEME.BLUE,
        fontSize: 17
    }
})
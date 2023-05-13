import React from "react"
import {View, StyleSheet} from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export const AppShadow = prop => {

    return (
        <View style={{...styles.wrap, ...prop.style}}>
            <View style={styles.upper}>
                {prop.children}
            </View>
            <LinearGradient colors={[prop.setting.color, "transparent"]} style={{...styles.shadow, ...prop.setting}} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        position: "relative"
    },
    upper: {
        position: "relative",
        zIndex: 2
    },
    shadow: {
        position: "absolute",
        zIndex: 1,
        opacity: .3
    }
})
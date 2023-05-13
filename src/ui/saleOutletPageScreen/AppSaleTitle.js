import React, {useState} from "react"
import {StyleSheet, ImageBackground, View, TouchableOpacity} from "react-native"
import {AppTextBold} from "../AppTextBold";
import {Svg, Path} from "react-native-svg";
import {THEME} from "../../../theme";

export default ({title}) => {
    return (
        <View style={styles.wrap}>
            <AppTextBold style={styles.text}>
                {title}
            </AppTextBold>
            <View style={styles.icon}>
                <Svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M9 1.85966e-05L10 1.00002L5.00002 6L0 0.999992L0.999997 -4.29153e-06L5.00001 4.00001L9 1.85966e-05Z" fill="black"/>
                </Svg>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: THEME.SLIDER_BG,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 40,
        paddingRight: 40,
        marginTop: 20,
        marginBottom: 20
    },
    text: {
        width: "100%",
        textAlign: "center",
        paddingRight: 20
    }
})
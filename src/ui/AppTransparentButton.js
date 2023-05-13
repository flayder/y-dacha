import React from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import {AppShadow} from "@root/ui/AppShadow"
import {AppTextBold} from "./AppTextBold";
import {THEME} from "../../theme";

export const AppTransparentButton = (
    {
        children,
        onPress,
        colorTextDefault = "#000",
        colorTextActive = "#fff",
        backgroundDefault="transparent",
        backgroundActive = THEME.PURPLE,
        style,
        active = false
    }) => {

    if(active) {
        colorTextDefault = colorTextActive
        backgroundDefault = backgroundActive
    }
    return (
       <TouchableOpacity onPress={onPress} activeOpacity={.8}>
           <View style={{...styles.btn, backgroundColor: backgroundDefault}}>
               <AppTextBold style={{...styles.text, color: colorTextDefault}}>
                   {children}
               </AppTextBold>
           </View>
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: THEME.GREY,
        height: 53,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#000",
        fontSize: 17
    }
})
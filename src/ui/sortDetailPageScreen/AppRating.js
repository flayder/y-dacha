import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity, Platform} from "react-native"
import {AppShadow} from "../AppShadow";
import {LinearGradient} from "expo-linear-gradient";

export default ({children, style}) => {
    //const color = Platform.OS === "ios" ? {} : {}
    return (
       <View style={styles.sh}>
           <View style={{...styles.wrap, ...style}}>
               {children}
           </View>
       </View>
    )
}

const styles = StyleSheet.create({
    sh: {
        borderRadius: 60,
        elevation: 7,
        paddingTop: 10,
        marginTop: 30
    },
    wrap: {
        width: "100%",
        padding: 30,
        paddingBottom: 50,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 60,
        elevation: 1,
        shadowColor: "#000",
        shadowOpacity: .1,
        backgroundColor: "white",
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        shadowOffset: {
            width: 0,
            height: -10
        }
    }
})
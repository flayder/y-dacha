import React from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import {AppShadow} from "@root/ui/AppShadow"
import {AppTextBold} from "./AppTextBold";

export const AppGreyButton = ({children, onPress, style}) => {
    const shadow = {
        width:"101%",
        left: "-.5%",
        bottom: -7,
        height: 12,
        color:"#000",
        opacity: .2,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }

    return (
       <TouchableOpacity onPress={onPress} activeOpacity={.8}>
           <AppShadow setting={shadow}>
                <LinearGradient
                    start={{x: 1, y: 0}} end={{x: 1, y: 1}}
                    colors={['#BEC1C9', '#757575']}
                    style={styles.main}
                >
                    <View style={{...styles.btn}}>
                        <AppTextBold style={styles.text}>
                            {children}
                        </AppTextBold>
                    </View>
                </LinearGradient>
           </AppShadow>
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main: {
        borderRadius: 8,
    },
    btn: {
        height: 53,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 17
    }
})
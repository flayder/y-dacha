import React from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import InsetShadow from 'react-native-inset-shadow'
import {AppTextBold} from "./AppTextBold";

export const AppActiveBlueButton = ({children, onPress, style}) => {
    return (
        <View style={{...styles.inset, ...style}}>
            <InsetShadow>
                <TouchableOpacity onPress={onPress}>
                    <View style={{...styles.btn}}>
                        <AppTextBold style={styles.text}>
                            {children}
                        </AppTextBold>
                    </View>
                </TouchableOpacity>
            </InsetShadow>
        </View>
    )
}

const styles = StyleSheet.create({
    inset: {
        height: 55,
        backgroundColor: '#668FF3',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    btn: {
        height: 52,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 17
    }
})
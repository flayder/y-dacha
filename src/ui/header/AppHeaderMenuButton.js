import React from "react"
import {StyleSheet, TouchableOpacity, View} from "react-native"

export default ({style, color = "#000", onPress}) => {
    return (
        <TouchableOpacity style={styles.btnWrap} onPress={onPress}>
            <View style={styles.btn}>
                <View style={{...styles.line, backgroundColor: color}}></View>
                <View style={{...styles.line, backgroundColor: color}}></View>
                <View style={{...styles.line, backgroundColor: color}}></View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    line: {
        width: "100%",
        height: 3,
        marginTop: 4
    },
    btnWrap: {
        width: 50,
        height: 50,
        marginLeft: -10,
        paddingLeft: 10,
        paddingTop: 14
    },
    btn: {
        width: 26,
        height: 20
    }
})
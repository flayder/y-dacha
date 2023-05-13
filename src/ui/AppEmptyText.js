import React from "react"
import {View, StyleSheet} from "react-native"
import {AppText} from "./AppText";

export default ({text, color = "green"}) => {
    return (
        <View style={styles.wrap}>
            <AppText style={{...styles.text, color: color}}>
                {text}
            </AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        width: "100%",
        paddingTop: 20,
        paddingBottom: 20
    },
    text: {
        fontSize: 16,
        textAlign: "center"
    }
})
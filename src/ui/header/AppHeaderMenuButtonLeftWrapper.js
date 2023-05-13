import React from "react"
import {View, StyleSheet} from "react-native"

export default ({children}) => {
    return (
        <View style={styles.style}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    style: {
        width: 50,
        paddingLeft: 15,
        paddingBottom: 10
    }
})
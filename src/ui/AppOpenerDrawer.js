import React from "react"
import {TouchableOpacity, Image, StyleSheet} from "react-native"
import {OPENER} from "../../global";


export default ({navigation}) => {
    return (
        <TouchableOpacity style={styles.opener} activeOpacity={.9} onPress={() => {
            navigation.toggleDrawer()
        }}>
            <Image source={require("@images/filter/BarsSkroll.png")} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    opener: {
        position: "absolute",
        width: 30,
        height: 208,
        top: "50%",
        marginTop: -104,
        left: 0,
        zIndex: 9,
    }
})
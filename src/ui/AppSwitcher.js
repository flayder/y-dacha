import React, {useState, useRef} from "react"
import {View, Animated, StyleSheet, TouchableOpacity} from "react-native"
import {THEME} from "../../theme";
import {SHADOW} from "../../global";

export default ({onResult, defaultIs = false}) => {
    const [active, setActive] = useState(defaultIs)
    let bgCol = THEME.GREY
    const left = useRef(new Animated.Value(0)).current
    if(active) {
        Animated.timing(left, {
            toValue: 20,
            duration: 300,
            useNativeDriver: false
        }).start()
        bgCol = THEME.BLUE
    } else {
        Animated.timing(left, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start()
    }
    return (
        <TouchableOpacity
            style={{...styles.wrap, backgroundColor: bgCol}}
            activeOpacity={1}
            onPress={() => {
                if(onResult) onResult(!active)
                setActive(!active)
            }}
        >
            <Animated.View style={{...styles.trigger, left: left}}></Animated.View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: THEME.BLUE,
        width: 50,
        borderRadius: 20,
        height: 28
    },
    trigger: {
        position: "relative",
        top: -1,
        left: 20,
        width: 30,
        height: 30,
        backgroundColor: "white",
        borderRadius: 25,
        ...SHADOW,
        zIndex: 99,
        elevation: 9
    }
})
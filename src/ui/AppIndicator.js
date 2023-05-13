import React, {useState, useEffect, useRef} from "react"
import {View, ActivityIndicator, StyleSheet, Platform} from "react-native"
import {THEME} from "../../theme";

export default ({timer1, justShow = false}) => {
    const timer = 1
    const [ready, setReady] = useState(true)
    const initial = useRef(true)
    useEffect(() => {
        if(timer && timer > 0 && initial.current) {
            setTimeout(() => {
                initial.current = false
                setReady(false)
            }, timer * 1000)
        } else {
            if(!justShow)
                setReady(false)
        }
    }, [ready])

    if(ready)
        return (
            <View style={{...styles.container, ...styles.horizontal}}>
                <ActivityIndicator size="large" color={THEME.BLUE} />
            </View>
        )
    else return <></>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 999999,
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        backgroundColor: "white"
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});
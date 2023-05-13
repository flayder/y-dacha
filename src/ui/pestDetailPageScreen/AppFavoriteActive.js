import React from "react"
import {View, StyleSheet} from "react-native"
import {Svg, Path} from "react-native-svg";
import {AppText} from "../AppText";

export default ({style, bgStyle, text = "В избранное"}) => {
    return (
        <View style={{...styles.wrap, ...style}}>
            <View style={styles.unWrap}>
                <View style={{...styles.bg, ...bgStyle}}></View>
                <View style={styles.body}>
                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M16.4634 1.6875C14.4146 -0.5625 11.078 -0.5625 9 1.6875C6.95122 -0.5625 3.61463 -0.5625 1.53659 1.6875C-0.512195 3.9375 -0.512195 7.59375 1.53659 9.84375L9 18L16.4634 9.84375C18.5122 7.59375 18.5122 3.9375 16.4634 1.6875ZM15.5268 5.84375L14.5317 5.3125C14.6195 5.15625 14.6488 4.96875 14.6488 4.78125C14.6488 4.125 14.1512 3.59375 13.5366 3.59375C13.3024 3.59375 13.0976 3.6875 12.922 3.8125L12.278 2.78125C12.6293 2.53125 13.0683 2.375 13.5366 2.375C14.7659 2.375 15.7902 3.4375 15.7902 4.78125C15.7902 5.15625 15.7024 5.53125 15.5561 5.84375H15.5268Z" fill="white"/>
                    </Svg>
                    <AppText style={styles.text}>
                        {text}
                    </AppText>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        width: 80,
        height: 60,
        alignItems: "center",
        justifyContent: "center"
    },
    unWrap: {
        position: "relative",
        backgroundColor: "transparent",
        width: 80,
        height: 60,
        alignItems: "center",
        justifyContent: "center"
    },
    bg: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        opacity: .6
    },
    body: {
        padding: 10,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 10,
        marginBottom: 0,
        marginTop: 5,
        color: "#fff"
    }
})
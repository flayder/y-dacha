import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity, Platform} from "react-native"
import {AppText} from "./AppText";
import {THEME} from "../../theme";
import {SHADOW} from "../../global";
import InsetShadow from "react-native-inset-shadow";

export default (
    {
        style,
        onPress,
        activeOpacity = 1,
        color = THEME.BLUE,
        textColor = "#fff",
        shadowHeight = 40,
        children = <></>
    }) => {

    const [click, setClick] = useState(false)
    const opacity = (!click) ? 1 : .9
    const shadow = (!click) ? SHADOW : {
        ...SHADOW,
        shadowOpacity: 0
    }
    return (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            style={{...shadow, ...styles.wrap, ...style, opacity: opacity, backgroundColor: color}}
            onPress={onPress}
            onPressIn={() => {
                setClick(true)
            }}
            onPressOut={() => {
                setClick(false)
            }}
        >
            {
                !click
                    ?
                    <AppText style={{...styles.text, color: textColor}}>
                        {children}
                    </AppText>
                    :
                    <>
                        <InsetShadow
                            shadowRadius={5}
                            containerStyle={{...styles.shadow, height: shadowHeight}}
                        >
                            <></>
                        </InsetShadow>
                        <AppText style={{...styles.text, color: textColor}}>
                            {children}
                        </AppText>
                    </>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    inset: {
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    link: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    wrap: {
        position: "relative",
        borderRadius: 6,
        paddingTop: 8,
        paddingBottom: 8,
        minWidth: 100,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    },
    shadow: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "105%",
        minWidth: 100,
        height: "100%",
        borderRadius: 4
    },
    text: {
        marginTop: 0,
        marginBottom: 0,
        textAlign: "center"
    }
})
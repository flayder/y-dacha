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
                    <Svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                        <Path d="M8.74567 1.91909L8.9982 2.19643L9.25269 1.92088C11.1955 -0.182713 14.2977 -0.180008 16.2091 1.91909C18.1382 4.03771 18.1383 7.49304 16.2094 9.61181C16.2093 9.61192 16.2092 9.61204 16.2091 9.61216L9 17.4905L1.79092 9.61216C-0.138067 7.49372 -0.138339 4.0388 1.7901 1.91998C3.73299 -0.182713 6.83456 -0.17971 8.74567 1.91909ZM15.3648 6.14719L15.4408 6.18773H15.5268H15.5561H15.7748L15.8676 5.98963C16.0351 5.63204 16.1342 5.2073 16.1342 4.78125C16.1342 3.26611 14.9739 2.03102 13.5366 2.03102C12.9917 2.03102 12.4838 2.21258 12.0786 2.50102L11.8148 2.68878L11.9863 2.96343L12.6302 3.99468L12.8237 4.30464L13.1214 4.09273C13.2622 3.99252 13.3981 3.93773 13.5366 3.93773C13.9404 3.93773 14.3048 4.2934 14.3048 4.78125C14.3048 4.9386 14.2793 5.05957 14.2318 5.14399L14.0596 5.45041L14.3697 5.61594L15.3648 6.14719Z" stroke="white" stroke-width="0.687951"/>
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
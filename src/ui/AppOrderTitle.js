import React from "react"
import {View, StyleSheet} from "react-native"
import {AppTextBold} from "./AppTextBold";
import {THEME} from "../../theme";
import {Svg, Rect} from "react-native-svg";


export default ({title, bgColor = THEME.FOOTER_BG, textColor = "#fff"}) => {
    return (
        <View style={{...styles.wrap}}>
            <View style={{...styles.titleWrap, backgroundColor: bgColor}}>
                <AppTextBold style={{...styles.title, color: textColor}}>
                    {title}
                </AppTextBold>
                <View style={styles.icon}>
                    <Svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Rect width="12.7828" height="12.7828" rx="1" transform="matrix(0.582157 0.813076 -0.582157 0.813076 8 0)" fill={bgColor}/>
                    </Svg>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    titleWrap: {
        borderRadius: 30,
        position: "relative"
    },
    wrap: {
        paddingBottom: 20
    },
    icon: {
        position: "absolute",
        bottom: -10,
        left: "50%",
        marginLeft: -8,
        zIndex: 1
    },
    title: {
        textAlign: "center",
        position: "relative",
        zIndex: 0
    }
})
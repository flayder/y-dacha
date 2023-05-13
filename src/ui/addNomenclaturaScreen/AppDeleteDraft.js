import React from "react"
import {View, StyleSheet, TouchableOpacity, Dimensions, TextInput, Image, ScrollView} from "react-native"
import {AppTextBold} from "../AppTextBold";
import {Circle, Path, Svg} from "react-native-svg";
import {THEME} from "../../../theme";
import {SHADOW_SMALL} from "../../../global";


export default ({onResult, disabled = true}) => {
    const textColor = disabled ? THEME.GREY : "#000"
    const iconColor = disabled ? THEME.GREY : THEME.CHEMICAL_COLOR
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.addProductBtn}
            onPress={() => {
                if(onResult) onResult()
            }}
        >
            <AppTextBold style={{...styles.addProductBtnText, color: textColor}}>
                Удалить{"\n"}
                товар
            </AppTextBold>
            <Svg width="20" height="20" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M2.26514 6.79785V16.9097C2.26514 17.5164 2.75051 18.0423 3.39767 18.0423H14.6421C15.2488 18.0423 15.7746 17.5569 15.7746 16.9097V6.79785H2.26514ZM7.88734 15.2514C7.88734 15.575 7.64466 15.8176 7.32108 15.8176C6.9975 15.8176 6.75481 15.575 6.75481 15.2514V8.49665C6.75481 8.17307 6.9975 7.93038 7.32108 7.93038C7.64466 7.93038 7.88734 8.17307 7.88734 8.49665V15.2514ZM11.2445 15.2514C11.2445 15.575 11.0018 15.8176 10.6782 15.8176C10.3546 15.8176 10.112 15.575 10.112 15.2514V8.49665C10.112 8.17307 10.3546 7.93038 10.6782 7.93038C11.0018 7.93038 11.2445 8.17307 11.2445 8.49665V15.2514Z" fill={iconColor}/>
                <Path d="M1.13253 5.66265H2.26506H15.7745H16.9071C17.5138 5.66265 18.0396 5.17728 18.0396 4.53012V3.39759C18.0396 2.79088 17.5542 2.26506 16.9071 2.26506H11.2849C11.2849 1.01119 10.2737 0 9.0198 0C7.76593 0 6.75474 1.01119 6.75474 2.26506H1.13253C0.525818 2.26506 0 2.75043 0 3.39759V4.53012C0 5.13684 0.48537 5.66265 1.13253 5.66265ZM9.0198 1.17298C9.62651 1.17298 10.1523 1.65835 10.1523 2.30551H7.88727C7.88727 1.6988 8.37264 1.17298 9.0198 1.17298Z" fill={iconColor}/>
            </Svg>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addProductBtnText: {
        paddingRight: 10,
        paddingLeft: 10,
        fontSize: 14,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10
    },
    addProductBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: THEME.SLIDER_BG,
        borderTopLeftRadius: 35,
        borderBottomLeftRadius: 35,
        ...SHADOW_SMALL
    },
})
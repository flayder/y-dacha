import React from "react"
import {StyleSheet, View, TouchableOpacity} from "react-native"
import {AppTextBold} from "../AppTextBold";
import {AppText} from "../AppText";
import {Svg, Rect} from "react-native-svg";
import {THEME} from "../../../theme";
import {getRandomKey} from "../../../global";
import AppToBlock from "../plantFormPageScreen/AppToBlock";

export default ({data = [], active, onResult}) => {
    return (
        <View style={styles.wrap}>
            {
                data.map(item => {
                    const isActive = active == item.value
                    const backStyle = (isActive) ? {backgroundColor: THEME.ORANGE} : {}
                    const textStyle = (isActive) ? {color: "#fff"} : {}
                    return <TouchableOpacity
                        activeOpacity={1}
                        style={{...styles.btn, ...backStyle}}
                        key={getRandomKey()}
                        onPress={() => {
                            if(onResult) onResult(item.value)
                        }}
                    >
                        {
                            (!isActive)
                                ?
                                <AppText style={{...styles.btnText, ...textStyle}}>
                                    {item.name}
                                </AppText>
                                :
                                <>
                                    <AppTextBold style={{...styles.btnText, ...textStyle}}>
                                        {item.name}
                                    </AppTextBold>
                                    <View style={styles.icon}>
                                        <Svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Rect width="12.7828" height="12.7828" rx="1" transform="matrix(0.582157 0.813076 -0.582157 0.813076 8 0)" fill="#F39314"/>
                                        </Svg>
                                    </View>
                                </>
                        }
                    </TouchableOpacity>
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    name: {
        color: THEME.GREY_TEXT
    },
    btnText: {
        textAlign: "center"
    },
    wrap: {
        flexDirection: "row",
        borderRadius: 24,
        backgroundColor: THEME.ALL_COLOR,
        marginBottom: 20
    },
    icon: {
        position: "absolute",
        left: "50%",
        bottom: -10,
        marginLeft: -8
    },
    btn: {
        width: "50%",
        position: "relative",
        borderRadius: 24
    }
})
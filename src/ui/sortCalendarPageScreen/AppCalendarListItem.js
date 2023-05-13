import React, {useRef} from "react"
import {View, StyleSheet, Animated} from "react-native"
import {AppText} from "../AppText";
import {THEME} from "../../../theme";
import {AppTextBold} from "../AppTextBold";
import {getCalendarColor, getCalendarMatch} from "../../../global";

export default ({Icon, data, screenWidth, year, id, text}) => {
    //console.log(screenWidth)
    const activeWidth = screenWidth - 100
    const passiveWidth = screenWidth - 130
    const width = useRef(new Animated.Value(passiveWidth)).current

    const active = getCalendarMatch(year, id)
    //console.log('active', year)
    let bgColor = false

    if(active && active > 0) {
        bgColor = getCalendarColor(active)
    }

    Animated.timing(width, {
        toValue: (active) ? activeWidth : passiveWidth,
        duration: 500,
        useNativeDriver: false
    }).start()

    const bgCol = (active && bgColor) ? bgColor : THEME.SLIDER_BG
    const color = (active && bgColor) ? "#fff" : "#000"

    if(id && !text && data && data.hasOwnProperty("actions")) {
        for(let $id in data.actions) {
            if($id == id) {
                text = data.actions[$id]
            }
        }
    }

    return (
        <Animated.View style={{...styles.wrap, width: width, backgroundColor: bgCol}}>
            <View style={styles.icon}>
                <Icon
                    active={active}
                />
            </View>
            {
                !active
                    ?
                    <AppText style={{...styles.text, color: color}}>
                        {text}
                    </AppText>
                    :
                    <AppTextBold style={{...styles.text, color: color}}>
                        {text}
                    </AppTextBold>
            }
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 4,
        backgroundColor: "red"
    },
    icon: {
        paddingRight: 20
    },
    text: {
        marginTop: 8,
        marginBottom: 8,
        paddingRight: 20,
        fontSize: 12
    }
})
import React, {useState, useRef} from "react"
import {View, ScrollView, StyleSheet, Platform} from "react-native"
import {AppTextBold} from "./AppTextBold";
import {AppText} from "./AppText";
import {Svg, Path} from "react-native-svg";
import {THEME} from "../../theme";
import {getRandomKey, SHADOW} from "../../global";
import {TouchableOpacity} from "react-native-gesture-handler"

export default
    ({
        style,
        selectStyle,
        itemStyle,
        onResult,
        title = "",
        data = [],
        color = "#000",
        colorOpened = THEME.GREY_TEXT,
        headerBg = "transparent",
        borderColor = THEME.FOOTER_BG,
        borderRadius = 8,
        initValue = false,
        editable = true,
        showDefaultTitle = true,
        cancelDefaultAutoNaming = false,
        activeSelectColor = THEME.BLUE,
        activeColor = "#fff",
        preText = "",
        force = false
    }) => {
    const [opened, setOpened] = useState(false)
    const [result, setResult] = useState(title)
    const useable = useRef(false)

    if(!useable.current && force && title != result) {
        setResult(title)
    }

    //console.log('initValue', initValue)

    const positionIs = Platform.OS == "android" ? {position: "relative"} : {top: "100%", position: "absolute"}

    const getHeight = () => {
        let height = 200
        if(data.length < 10) {
            height = data.length * 44
            if(showDefaultTitle) height += 40
        }

        return height
    }

    //console.log('sss', data)
    return (
        <View style={{...styles.wrap, ...style}}>
            <TouchableOpacity
                style={{...styles.header, backgroundColor: headerBg, borderColor: borderColor, borderRadius: borderRadius}}
                activeOpacity={1}
                onPress={() => {
                    if(editable)
                        setOpened(!opened)
                }}
            >
                <View style={styles.selectTextWrap}>
                    <AppTextBold style={{...styles.textSelect, color: color}}>
                        {preText}{result}
                    </AppTextBold>
                </View>
                {
                    !opened
                        ?
                        <Svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M9 5.99998L10 4.99998L5.00002 0L0 5.00001L0.999997 6L5.00001 1.99999L9 5.99998Z"
                                  fill={color}/>
                        </Svg>
                        :
                        <Svg width="10" height="6" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M9 0.48537L10 1.48537L5.00002 6.48535L0 1.48534L0.999997 0.485347L5.00001 4.48536L9 0.48537Z"
                                  fill={color}/>
                        </Svg>
                }
            </TouchableOpacity>
            {
                opened
                    ?
                    <ScrollView
                        //keyboardShouldPersistTaps={'handled'}
                        nestedScrollEnabled={true}
                        style={{...styles.textSelectWrap, ...positionIs, ...selectStyle, flex: 1, height: getHeight()}}
                    >
                        <View style={{flex: 1}}>
                            {
                                showDefaultTitle
                                    ?
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        style={{...styles.selectLine, ...itemStyle}}
                                        onPressIn={() => {
                                            if(onResult) onResult(false)
                                            setResult(title)
                                            setOpened(false)
                                        }}
                                    >
                                        <AppText style={{...styles.selectLineText, color: colorOpened}}>
                                            {title}
                                        </AppText>
                                    </TouchableOpacity>
                                    :
                                    <></>
                            }
                            {
                                data.map(item => {
                                    let activeStyle
                                    let colorStyle
                                    if(!initValue) {
                                        activeStyle = item.name == title ? {backgroundColor: activeSelectColor} : {}
                                        colorStyle = item.name == title ? {color: activeColor} : {}
                                    } else {
                                        activeStyle = item.value == initValue ? {backgroundColor: activeSelectColor} : {}
                                        colorStyle = item.value == initValue ? {color: activeColor} : {}

                                        if(!cancelDefaultAutoNaming && !useable.current && item.value == initValue) setResult(item.name)
                                    }
                                    return <TouchableOpacity
                                        key={getRandomKey()}
                                        accessible={true}
                                        activeOpacity={1}
                                        style={{...styles.selectLine, ...itemStyle, ...activeStyle}}
                                        onPress={() => {
                                            if(onResult) onResult(item.value)
                                            useable.current = true
                                            setResult(item.name)
                                            setOpened(false)
                                        }}
                                    >
                                        <AppText style={{...styles.selectLineText, color: colorOpened, ...colorStyle}}>
                                            {item.name}
                                        </AppText>
                                    </TouchableOpacity>
                                })
                            }
                        </View>
                    </ScrollView>
                    :
                    <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        width: "100%",
        position: "relative",
        zIndex: 999,
        elevation: 999
    },
    textSelectWrap: {
        position: "absolute",
        left: 0,
        width: "100%",
        zIndex: 2,
        elevation: 2,
        minHeight: 50,
        backgroundColor: "#fff",
        paddingBottom: 10,
        borderRadius: 8,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: THEME.GREY_TEXT,
        ...SHADOW
    },
    selectLineText: {
        paddingLeft: 10,
        paddingRight: 10,
        //color: "#fff",
        marginTop: 5,
        marginBottom: 5,
        //backgroundColor: "#fff"
    },
    selectTextWrap: {
        flexDirection: "row"
    },
    textSelect: {
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 8,
        marginBottom: 8,
        fontSize: 14
        //color: "#fff"
    },
    header: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderStyle: "solid"
        //backgroundColor: THEME.GREY
    }
})
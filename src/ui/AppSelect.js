import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {AppTextBold} from "./AppTextBold";
import {AppText} from "./AppText";
import {Svg, Path} from "react-native-svg";
import {THEME} from "../../theme";
import {SHADOW} from "../../global";

export default ({style, backgroundColor = THEME.GREY}) => {
    const [opened, setOpened] = useState(false)
    return (
        <View style={{...styles.wrap, ...style}}>
            <TouchableOpacity
                style={{...styles.header, backgroundColor}}
                activeOpacity={1}
                onPress={() => {
                    setOpened(!opened)
                }}
            >
                <View style={{...styles.selectTextWrap, backgroundColor}}>
                    <AppTextBold style={styles.textSelect}>
                        Ваш регион:
                    </AppTextBold>
                    <AppText style={styles.textSelect}>
                        Белгородская область
                    </AppText>
                </View>
                <Svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M9 5.99998L10 4.99998L5.00002 0L0 5.00001L0.999997 6L5.00001 1.99999L9 5.99998Z" fill="white"/>
                </Svg>
            </TouchableOpacity>
            {
                opened
                    ?
                    <View style={styles.textSelectWrap}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.selectLine}
                        >
                            <AppText style={styles.selectLineText}>
                                Белгородская область
                            </AppText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.selectLine}
                        >
                            <AppText style={styles.selectLineText}>
                                Белгородская область
                            </AppText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.selectLine}
                        >
                            <AppText style={styles.selectLineText}>
                                Белгородская область
                            </AppText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.selectLine}
                        >
                            <AppText style={styles.selectLineText}>
                                Белгородская область
                            </AppText>
                        </TouchableOpacity>
                    </View>
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
        zIndex: 9,
    },
    textSelectWrap: {
        paddingBottom: 10,
        ...SHADOW
    },
    selectLineText: {
        paddingLeft: 20,
        paddingRight: 20,
        color: "#fff",
        marginTop: 10,
        marginBottom: 10
    },
    selectTextWrap: {
        flexDirection: "row"
    },
    textSelect: {
        paddingLeft: 5,
        paddingRight: 5,
        color: "#fff",
        marginTop: 10,
        marginBottom: 10
    },
    header: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})
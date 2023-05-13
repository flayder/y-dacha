import React, {useState} from "react"
import {StyleSheet, ImageBackground, View, TouchableOpacity} from "react-native"
import {AppText} from "../AppText";
import {THEME} from "../../../theme";
import {AppTextBold} from "../AppTextBold";
import {Svg, Path} from "react-native-svg";

export default ({number, place, data, active = false, onPress}) => {
    const one = data.length == 1
    return(
        <TouchableOpacity
            activeOpacity={1}
            style={{...styles.point}}
            onPress={() => {
                if(onPress) onPress(number - 1)
            }}
        >
            {
                !active
                    ?
                    <>
                        <View style={styles.circle}>
                            <AppText style={styles.num}>
                                {number}
                            </AppText>
                        </View>
                        <AppText style={styles.place}>
                            {place}
                        </AppText>
                    </>
                    :
                    <View
                        style={{...styles.back}}
                        //source={require("@images/saleOutletPageScreen/iconGeolocation.png")}
                        //resizeMode={"stretch"}
                    >
                        <View style={styles.bgPoint}>
                            <Svg width="60" height="68" viewBox="0 0 45 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path fillRule="evenodd" clipRule="evenodd" d="M29.6345 43.8453C38.5639 40.8621 45 32.4327 45 22.5C45 10.0736 34.9264 0 22.5 0C10.0736 0 0 10.0736 0 22.5C0 31.8857 5.74684 39.9292 13.9137 43.3036L21.232 52.0791C21.6318 52.5585 22.3682 52.5585 22.768 52.0791L29.6345 43.8453Z" fill="white"/>
                                <Path fillRule="evenodd" clipRule="evenodd" d="M43 22.5C43 31.7297 36.9004 39.5348 28.5123 42.1042L22.7715 49.0647C22.3715 49.5496 21.6285 49.5496 21.2285 49.0647L15.0873 41.6188C7.42923 38.6475 2 31.2078 2 22.5C2 11.1782 11.1782 2 22.5 2C33.8218 2 43 11.1782 43 22.5ZM39 22.5C39 31.6127 31.6127 39 22.5 39C13.3873 39 6 31.6127 6 22.5C6 13.3873 13.3873 6 22.5 6C31.6127 6 39 13.3873 39 22.5Z" fill="#F39314"/>
                            </Svg>
                        </View>
                        <AppTextBold style={styles.activeNum}>
                            {number}
                        </AppTextBold>
                    </View>
            }
            {
                !one
                    ?
                    <View style={styles.line}></View>
                    :
                    <></>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    activeNum: {
        fontSize: 22,
        color: THEME.ORANGE,
        textAlign: "center"
    },
    back: {
        width: 65,
        height: 75,
        marginTop: -25,
        position: "relative",
        zIndex: 9
    },
    bgPoint: {
        position: "absolute",
        left: 2,
        top: 2
    },
    circle: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 5,
        borderColor: THEME.ALL_COLOR
    },
    line: {
        width: 60,
        height: 5,
        position: "absolute",
        top: 38,
        left: 50,
        backgroundColor: THEME.ALL_COLOR
    },
    point: {
        paddingTop: 20,
        paddingBottom: 20,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 40,
        position: "relative"
    },
    place: {
        marginTop: 5,
        height: 20,
        textAlign: "center"
    },
    num: {
        marginTop: 0,
        marginBottom: 0
    }
})
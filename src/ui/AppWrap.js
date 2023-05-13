import React, {useState} from "react"
import {ScrollView, View, StyleSheet, Dimensions, Platform} from "react-native";
//import {isOrientation} from "../../global";\
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export const AppWrap =
    (
        {
            children,
            container,
            wrap,
            scroll,
            onScroll,
            height = 0,
            measure = false,
            ref,
            iosKeyboardAdaptive = false
        }) => {
    if(measure) {
        const [heightIss, setHeight] = useState(Dimensions.get('screen').height)
        // Dimensions.addEventListener('change', () => {
        //     let {height} = Dimensions.get('screen')
        //     if (isOrientation() !== "portrait") height += 150
        //     setHeight(height)
        // })
        height += heightIss
    }

    let minHeight = 0
    if(measure) minHeight = "100%"

    let marginBottom = 70
    if(Platform.OS == "android") {
        marginBottom = 50
    }
    //console.log('Platform.OS', Platform.OS)
    if(Platform.OS != "ios") {
        return (
            <View style={{...styles.container, ...container}}>
                <ScrollView
                    style={{marginBottom, height, ...styles.scroll, ...scroll}}
                    scrollEventThrottle={1}
                    //contentContainerStyle={{...styles.wrap, ...wrap}}
                    ref={ref}
                    onScroll={props => {
                        if(onScroll) {
                            onScroll(props)
                        }
                    }}
                >
                    <View style={{...styles.wrap, ...wrap, minHeight: height}}>
                        {children}
                    </View>
                </ScrollView>
            </View>
        )
    } else  {
        return (
            <View style={{...styles.container, ...container}}>
                <KeyboardAwareScrollView
                    style={{marginBottom, height, ...styles.scroll, ...scroll}}
                    scrollEventThrottle={1}
                    ref={ref}
                    //contentContainerStyle={{...styles.wrap, ...wrap}}
                    onScroll={props => {
                        if(onScroll) {
                            onScroll(props)
                        }
                    }}
                >
                    <View style={{...styles.wrap, ...wrap, minHeight}}>
                        {children}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#fff"
    },
    scroll: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        width: "100%",
        //minHeight: "100%"
    },
    wrap: {
        flex: 1,
        width: "100%",
        height: "100%"
    }
})
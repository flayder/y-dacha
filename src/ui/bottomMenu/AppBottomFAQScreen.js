import React, {useRef, useState} from "react"
import SWGImage from "expo-svg-uri";
import {View, TouchableOpacity, StyleSheet, Animated, Platform} from "react-native"

export default () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [display, setDisplay] = useState("none")

    const fadeIn = () => {
        setDisplay("flex")
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(({finished}) => {
            setDisplay("none")
        });
    };

    const paddingBottom = Platform.OS === "ios" ? 20 : 0

    return (
        <View style={{...styles.menu, paddingBottom: paddingBottom}}>
            <View style={styles.wrap}>
                <Animated.View style={{...styles.show}}>
                    <View style={{...styles.line, width: 60}}>
                        <TouchableOpacity style={styles.btn}>
                            <SWGImage source={require("@images/bottomMenu/comfort.svg")} />
                        </TouchableOpacity>
                    </View>
                    <View style={{...styles.line, width: "40%"}}>
                        <TouchableOpacity style={styles.btn}>
                            <SWGImage source={require("@images/bottomMenu/events.svg")} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn}>
                            <SWGImage source={require("@images/bottomMenu/sells.svg")} />
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                <View style={styles.line}>
                    <TouchableOpacity style={styles.btn}>
                        <SWGImage source={require("@images/bottomMenu/message.svg")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <SWGImage source={require("@images/bottomMenu/orders.svg")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        if(display != "none") fadeOut()
                        else fadeIn()
                    }}>
                        <SWGImage source={require("@images/bottomMenu/buy.svg")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <SWGImage source={require("@images/bottomMenu/favorites.svg")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <SWGImage source={require("@images/bottomMenu/profile.svg")} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
        marginTop: 120,
        backgroundColor: "white",
        paddingTop: 10
        //position: "absolute",
        //bottom: 0,
        //left: 0,
        //width: "100%",
        //backgroundColor: "transparent"
    },
    wrap: {
        position: "relative",
        backgroundColor: "transparent"
    },
    line: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    show: {
        position: "absolute",
        left: 0,
        width: "100%",
        bottom: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})

import React, {useState, useRef} from "react"
import {Animated, View, ImageBackground, StyleSheet, TouchableOpacity} from "react-native";
import {AppText} from "./AppText";

export default ({Icon, text, style}) => {
    const [init, setInit] = useState(false)
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        setInit(true)
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start(({finished}) => {
            if(finished) {
                setTimeout(() => {
                    fadeOut()
                }, 2000)
            }
        });
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start(({finished}) => {
            if(finished) setInit(false)
        });
    };

    return (
        <TouchableOpacity
            style={{...styles.wrapper, ...style}}
            activeOpacity={1}
            onPress={() => {
                fadeIn()
            }}
        >
            <Icon />
               <Animated.View style={{...styles.wrapHint, opacity: fadeAnim}}>
                   {
                       text && init
                           ?
                           <ImageBackground
                               resizeMode={"stretch"}
                               source={require("@images/sorts/notification.png")}
                               style={styles.back}
                           >
                               <View style={styles.wrap}>
                                   <AppText style={styles.text}>
                                       {text}
                                   </AppText>
                               </View>
                           </ImageBackground>
                           :
                           <></>
                   }
               </Animated.View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapHint: {
        position: "absolute",
        left: 0,
        top: -25,
        width: 180,
        zIndex: 9
    },
    text: {
        fontSize: 12,
        textAlignVertical: "top",
        marginTop: 5,
        marginBottom: 20,
        textAlign: "center"
    },
    wrapper: {
        position: "relative"
    },
    back: {
        width: "100%",
        height: "100%"
    }
})
import React, {useRef, useState, useEffect} from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import SWGImage from "expo-svg-uri"
import { useNavigation } from '@react-navigation/native';
import {getRandomInt} from "../../global";
import {THEME} from "../../theme";
import {AppText} from "@root/ui/AppText";
import {init} from "../store/actions/system";


function useInterval(callback, delay) {
    const savedCallback = useRef()

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export const LoadingBar = ({onFinish, delay = 1000}) => {
    const navigation = useNavigation()
    let animation = useRef(new Animated.Value(0));
    const [progress, setProgress] = useState(0);
    useInterval(() => {
        if(progress < 100) {
            let currentProgress = progress + getRandomInt(1, 25)
            setProgress(currentProgress > 100 ? 100 : currentProgress);
        }
    }, delay);

    useEffect(() => {
        Animated.timing(animation.current, {
            toValue: progress,
            duration: 100,
            useNativeDriver: false
        }).start();
        if(progress == 100) {
            onFinish()
        }
    },[progress])

    let width = animation.current.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
    })

    return (
        <View style={styles.containerWr}>
            <View style={styles.containerWrap}>
                <Image source={require("@images/iconFlower.gif")} style={styles.logo} />
                <View style={styles.progressBarWr}>
                    <View style={styles.container}>
                        <AppText style={styles.progressText}>
                            {`${progress}%`}
                        </AppText>
                        <View style={styles.progressBar}>
                            <Animated.View style={[StyleSheet.absoluteFill], {width, ...styles.bar}}/>
                        </View>
                        <AppText style={styles.version}>
                            Версия 1.3.14.15:6547
                        </AppText>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    version: {
        fontSize: 12,
        marginTop: 40,
        color: THEME.GREY_TEXT
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 8,
    },
    progressText: {
        marginBottom: 15
    },
    progressBar: {
        flexDirection: 'row',
        height: 12,
        width: '100%',
        backgroundColor: THEME.GREY,
    },
    bar: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: THEME.BLUE
    },
    containerWrap: {
        position: "relative",
        flex: 1,
        width: "100%",
        height: "100%",
        maxWidth: 340,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
    },
    containerWr: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#fff"
    },
    logo: {
        height: 100,
        width: 60,
        marginTop: -150
    },
    progressBarWr: {
        position: "absolute",
        width: "100%",
        bottom: "15%",
        left: 0
    }
});
import React, {useLayoutEffect, useState, useEffect} from "react"
import SWGImage from "expo-svg-uri"
import { Dimensions, ImageBackground, View, StyleSheet } from "react-native"
import { AppTextCom } from "../ui/AppTextCom"
import { emptyNavigation, isOrientation } from "../../global"

export const StartPage = ({navigation}) => {
    const [orientation, funOrientation] = useState(isOrientation)
    useEffect(() => {
        const onChange = () => {
            funOrientation(isOrientation)
        }
        Dimensions.addEventListener('change', onChange)
    })
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTintColor: 'white',
            headerStyle: emptyNavigation
        }, [navigation])
    })

    const Content = () => {
        return (
            <>
                <SWGImage
                    width="100%"
                    source={require('@images/logo.svg')}
                    style={styles.logo}
                />
                <AppTextCom style={styles.text}>
                    Создай уголок своей мечты!
                </AppTextCom>
            </>
        )
    }
    setTimeout(() => {

        navigation.navigate({name: "LoadingScreen"})
    }, 5000)

    if(orientation === "portrait") {
        return (
            <View style={styles.container_p}>
                <ImageBackground style={styles.background} imageStyle={{resizeMode: 'cover'}}
                                 source={require("@images/imgDacha.jpg")}>
                    <Content/>
                </ImageBackground>
            </View>
        )
    } else {
        return (
            <View style={styles.container_c}>
                <Content />
            </View>
        )
    }
}

let {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
    container_p: {
        flex: 1,
        width: "100%",
        minHeight: "100%",
        backgroundColor: "#fff"
    },
    container_c: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    logo: {
        width: "100%",
    },
    text: {
        marginTop: 20,
        width: "100%",
        textAlign: "center",
        fontSize: 18
    },
    background: {
        width: "100%",
        height: height - height * .2
    }
})
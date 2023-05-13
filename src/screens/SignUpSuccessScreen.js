import React, {useLayoutEffect, useState} from "react"
import { View, StyleSheet, TouchableOpacity, Image } from "react-native"
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppText} from "@root/ui/AppText";
import {emptyNavigation} from "../../global"
import {THEME} from "../../theme";
import {AppWrap} from "../ui/AppWrap";
import {AppLogoFirstScreens} from "../ui/AppLogoFirstScreens";
import {createStackNavigator} from "@react-navigation/stack";
import {Svg, Path} from "react-native-svg";

const SignUpSuccessWrapper = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTintColor: 'white',
            headerStyle: {
                height: 50,
                ...emptyNavigation
            }
        }, [navigation])

        navigation.getParent().setOptions({
            gestureEnabled: false
        })
    })
    return (
        <AppWrap wrap={{...styles.wrap}} scroll={{marginBottom: 0}} measure={true}>
            <AppLogoFirstScreens />
            <View style={styles.form}>
                <View style={styles.successWrap}>
                    <View style={styles.imageWrap}>
                        <Image
                            style={{width: 160, height: 160, marginTop: -2, marginLeft: -2}}
                            source={require('@images/signUpSuccess/successSignUp.gif')}
                            resizeMode={"cover"}
                        />
                    </View>
                    <View style={styles.circle}>
                        <Svg width="54" height="45" viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path fillRule="evenodd" clipRule="evenodd" d="M27.7878 0.45975C28.4008 1.07275 28.4008 2.06675 27.7878 2.67875L10.5258 19.9417C9.91275 20.5548 8.91975 20.5548 8.30675 19.9417L0.45975 12.0948C-0.15325 11.4818 -0.15325 10.4887 0.45975 9.87575C1.07275 9.26275 2.06675 9.26275 2.67875 9.87575L9.41575 16.6127L25.5688 0.45975C26.1818 -0.15325 27.1758 -0.15325 27.7878 0.45975Z" fill="white"/>
                        </Svg>
                    </View>
                </View>
                <AppText style={{...styles.text, marginTop: 20}}>
                    Регистрация
                </AppText>
                <AppText style={styles.text}>
                    пройдена успешно
                </AppText>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.blueBtn} onPress={() => {
                    navigation.navigate("SignInScreen")
                }}>
                    <AppTextBold style={styles.blueBtnText}>
                        Войти
                    </AppTextBold>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}></View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    successWrap: {
        position: "relative"
    },
    imageWrap: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: "hidden"
    },
    circle: {
        backgroundColor: "#60A04E",
        width: 110,
        height: 110,
        borderRadius: 55,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 20,
        top: 20
    },
    blueBtn: {
        width: 80,
        marginTop: 25,
        marginBottom: 25,
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    blueBtnText: {
        fontSize: 18,
        color: THEME.BLUE
    },
    form: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    wrap: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around"
    },
    bold: {
        marginTop: 30,
        textAlign: "center"
    },
    text: {
        marginTop: 0,
        marginBottom: 0,
        width: "100%",
        textAlign: "center"
    },
    bottomText: {
        fontSize: 20,
        color: "#000"
    },
    btn: {
        width: "100%",
        marginBottom: 30,
    },
    logo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
    },
    bottom: {
        width: "100%",
        marginTop: 30,
    }
})

const Stack = createStackNavigator()

export const SignUpSuccessScreen = () => {
    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false
        })}>
            <Stack.Screen name="SignUpSuccessWrapper" component={SignUpSuccessWrapper} />
        </Stack.Navigator>
    )
}
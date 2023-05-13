import React, {useLayoutEffect, useState, useEffect} from "react"
//import SWGImage from "expo-svg-uri"
import { Dimensions, View, ScrollView, StyleSheet, TouchableOpacity} from "react-native"
import {createStackNavigator, useHeaderHeight} from '@react-navigation/stack'
import {useDispatch} from "react-redux";
import {AppTextBold} from "@root/ui/AppTextBold";
import {isOrientation, emptyNavigation} from "../../global"
import {THEME} from "../../theme";
import {AppBlueButton} from "../ui/AppBlueButton";
import {AppAuthorizeInput} from "../ui/AppAuthorizeInput";
import {GLOBAL_CONST} from "../../global";
//import {AppFetch} from "../AppFetch";
//import {DB} from "../db"
import {Svg, Path} from "react-native-svg";
import {hasAccess} from "../store/actions/user";
import {AppWrap} from "../ui/AppWrap";
import {AppLogoFirstScreens} from "../ui/AppLogoFirstScreens";

const RestorePassEmailWrapper = ({route, navigation}) => {
    const defaultValue = (route.params !== undefined && route.params.hasOwnProperty('email')) ? route.params.email : ""
    const [email, setEmail] = useState(defaultValue)
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

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(hasAccess())
    }, [dispatch])

    //AppFetch.get("authorizeByToken", {}, {
    //   "Content-type": "application/json",
    //   "Authorization": "Bearer 237482763487263472"
    //}).then(response => {
    //   console.log("res", response)
    //})

    return (
        <AppWrap wrap={{...styles.wrap}} scroll={{marginBottom: 0}} height={-50} measure={true}>
            <AppLogoFirstScreens />
            <View style={styles.form}>
                <AppTextBold style={styles.bold}>
                    Восстановление пароля
                </AppTextBold>
                <AppAuthorizeInput
                    rule={GLOBAL_CONST.emailValidation}
                    placeholder="Введите E-Mail"
                    error="Некорректный E-Mail"
                    onChangeText={em => {
                        setEmail(em)
                    }}
                    value={email}
                />
            </View>
            <TouchableOpacity style={styles.blueBtn} onPress={() => {
                navigation.navigate("SignInScreen")
            }}>
                <Svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M6.1249 12.1219C5.8928 12.1218 5.6703 12.0305 5.5062 11.868L0.2562 6.66826C-0.0854 6.32986 -0.0854 5.78126 0.2562 5.44286L5.5062 0.243258C5.8496 -0.0851423 6.3953 -0.0804423 6.7328 0.253758C7.0703 0.588058 7.0751 1.12856 6.7435 1.46866L2.1121 6.05556L6.7435 10.6426C6.9937 10.8904 7.0685 11.2631 6.9331 11.5869C6.7977 11.9107 6.4787 12.1218 6.1249 12.1219Z" fill="#5382D8"/>
                    <Path d="M20.125 6.92226H0.875C0.3918 6.92226 0 6.53426 0 6.05556C0 5.57696 0.3918 5.18896 0.875 5.18896H20.125C20.6082 5.18896 21 5.57696 21 6.05556C21 6.53426 20.6082 6.92226 20.125 6.92226Z" fill="#5382D8"/>
                </Svg>
                <AppTextBold style={styles.blueBtnText}>
                    Отмена
                </AppTextBold>
            </TouchableOpacity>
            <View style={styles.btnShort}>
                <AppBlueButton onPress={() => {
                    if(route.hasOwnProperty('params')) {
                        navigation.navigate("RestorePassScreen", {
                            screen: "RestorePassWrapper",
                            params: {
                                email: route.params !== undefined && route.params.hasOwnProperty('email') ? route.params.email : ""
                            }
                        })
                    }
                }}>
                    Далее
                </AppBlueButton>
            </View>
            <View style={{marginTop: 30}}></View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    container: {
        textAlign: "center",
        justifyContent: "center",
        flex: 1,
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        paddingLeft: 20,
        paddingRight: 20
    },
    btnShort: {
        width: 180,
        marginLeft: "auto",
        marginRight: "auto"
    },
    blueBtn: {
        width: 150,
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
        marginTop: 10
    },
    wrap: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around"
    },
    bold: {
        textAlign: "center"
    },
    text: {
        width: "100%",
    },
    bottomText: {
        color: "#000"
    },
    btn: {
        width: "100%",
        marginBottom: 30,
    },
    bottom: {
        width: "100%",
        marginTop: 30,
    }
})

const Stack = createStackNavigator()

export const RestorePassEmailScreen = () => {
    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false
        })}>
            <Stack.Screen name="RestorePassEmailWrapper" component={RestorePassEmailWrapper} />
        </Stack.Navigator>
    )
}
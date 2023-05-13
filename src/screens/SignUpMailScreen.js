import React, {useEffect, useLayoutEffect, useState} from "react"
import SWGImage from "expo-svg-uri"
import { View, StyleSheet, TouchableOpacity} from "react-native"
import {createStackNavigator} from '@react-navigation/stack'
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppText} from "@root/ui/AppText";
import {emptyNavigation} from "../../global"
import {THEME} from "../../theme";
import {AppFetch} from "../AppFetch";
import {Svg, Path} from "react-native-svg";
//import {useDispatch, useSelector} from "react-redux";
//import * as Linking from "expo-linking";
//import {setRememberToken} from "../store/actions/user";
import {AppErrorMessage} from "../ui/AppErrorMessage";
import {AppWrap} from "../ui/AppWrap";
import {AppLogoFirstScreens} from "../ui/AppLogoFirstScreens";

const SignUpMailWrapper = ({route, navigation}) => {
    //const headerHeight = useHeaderHeight()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    //const [navHeight, setNavHeithg] = useState(headerHeight)
    //console.log('route', route)
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTintColor: 'white',
            headerStyle: {
                //height: navHeight / 2,
                ...emptyNavigation
            }
        }, [navigation])

        navigation.getParent().setOptions({
            gestureEnabled: false
        })
    })
    return (
        <AppWrap wrap={{...styles.wrap}} scroll={{marginBottom: 0}} measure={true}>
            <View style={styles.form}>
                <AppLogoFirstScreens />
                <AppTextBold style={styles.bold}>
                    Регистрация
                </AppTextBold>
                <AppErrorMessage toShow={error} errorMessage={errorMessage} />
                <AppText style={styles.text}>
                    <Svg style={{flexBasis: 15, marginRight: 5}} width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M16.2 14.4H1.8C0.805887 14.4 0 13.5941 0 12.6V1.7217C0.0419475 0.758294 0.83568 -0.000911138 1.8 8.2072e-07H16.2C17.1941 8.2072e-07 18 0.805889 18 1.8V12.6C18 13.5941 17.1941 14.4 16.2 14.4ZM1.8 3.4812V12.6H16.2V3.4812L9 8.28L1.8 3.4812ZM2.52 1.8L9 6.12L15.48 1.8H2.52Z" fill="#5382D8"/>
                    </Svg>
                    &nbsp;На ваш адрес отправлено письмо,
                    содержащее ссылку для подтверждения регистрации.
                </AppText>
                <AppText style={styles.text}>
                    Если Вы не получили письмо в течение 5 минут, повторите попытку еще раз.
                </AppText>
            </View>
            <TouchableOpacity style={styles.blueBtn} onPress={async () => {
                if(route.params !== undefined && route.params.hasOwnProperty('email') && route.params.hasOwnProperty('password')) {
                    AppFetch.get('checkRegisterUser', {
                        "email":    route.params.email,
                        "password": route.params.password
                    }).then(response => {
                        if(response.result)
                            navigation.navigate("SignUpSuccessScreen")
                        else {
                            setError(true)
                            setErrorMessage("Ошибка при попытке подтверждения регистрации")
                        }
                    }).catch(err => {
                        setError(true)
                        setErrorMessage("Ошибка при попытке подтверждения регистрации")
                    })
                } else
                    navigation.navigate("SignUpScreen")
            }}>
                <AppTextBold style={styles.blueBtnText}>
                    Далее
                    <SWGImage
                        width="40"
                        height="12"
                        source={require('@images/btns/iconForward.svg')}
                    />
                </AppTextBold>
            </TouchableOpacity>
            <View style={{marginTop: 30}}></View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
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
        marginTop: 20
    },
    anchor: {
        flexDirection: "column",
        alignItems: "stretch",
    },
    wrap: {
        paddingTop: 30,
        paddingBottom: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around"
    },
    bold: {
        textAlign: "center"
    },
    text: {
        alignItems: "center",
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

export const SignUpMailScreen = ({route}) => {
    //console.log('dhhhd', route)
    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false
        })}>
            <Stack.Screen name="SignMailUpWrapper" component={SignUpMailWrapper} />
        </Stack.Navigator>
    )
}
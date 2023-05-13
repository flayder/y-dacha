import React, {useLayoutEffect, useState} from "react"
//import SWGImage from "expo-svg-uri"
import { Dimensions, View, ScrollView, StyleSheet, TouchableOpacity} from "react-native"
import {createStackNavigator} from '@react-navigation/stack'
import {AppTextBold} from "@root/ui/AppTextBold";
import {isOrientation, emptyNavigation, getBackHandle} from "../../global"
import {THEME} from "../../theme";
import {AppBlueButton} from "../ui/AppBlueButton";
import {AppAuthorizeInput} from "../ui/AppAuthorizeInput";
import {AppFetch} from "../AppFetch";
import {AppLogoFirstScreens} from "../ui/AppLogoFirstScreens";
import {AppWrap} from "../ui/AppWrap";
import {Svg, Path} from "react-native-svg";
import {DB} from "../db";

const RestorePassWrapper = ({route, navigation}) => {
    //console.log('route', route)
    //const headerHeight = useHeaderHeight()
    const [heightIs, setHeight] = useState(Dimensions.get('screen').height)
    //const [navHeight, _] = useState(headerHeight)
    const [password, setPass] = useState("")
    const [passwordConfirmed, setPassConfirmed] = useState("")
    const [passwordCorrect, setPassCorrect] = useState(false)
    const [passwordConfirmedCorrect, setPassConfirmedCorrect] = useState(false)
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

    Dimensions.addEventListener('change', () => {
        let {height} = Dimensions.get('screen')
        if(isOrientation() !== "portrait")
            height += 150
        setHeight(height)
    })

    const changePasswordHandler = async () => {
        //console.log('okokok')
        if(passwordCorrect && passwordConfirmedCorrect) {
            const res = await AppFetch.get("ressPass", {
                email:                      route.params.email,
                password:                   password,
                "password_confirmation":    passwordConfirmed
            })
            //console.log('resres1', res)
            if(route.params !== undefined) {
                navigation.navigate("RestorePassMailScreen", {
                    screen: "RestorePassMailWrapper",
                    params: {
                        email: route.params.email,
                        password: password
                    }
                })
            }
        }
    }

    //console.log('passwordCorrect && passwordConfirmedCorrect', passwordCorrect, passwordConfirmedCorrect)

    return (
        <View style={styles.container}>
            <AppWrap scroll={{marginBottom: 0}} measure={true}>
                <View style={{...styles.wrap, minHeight: heightIs - 50}}>
                    <AppLogoFirstScreens />
                    <View style={styles.form}>
                        <AppTextBold style={styles.bold}>
                            Измнение пароля
                        </AppTextBold>
                        <AppAuthorizeInput
                            rule={/^[a-z0-9]{5,}$/i}
                            placeholder="Введите пароль"
                            error="Пароль должен содержать не меньше 5 латинских символов и цифр"
                            type="password"
                            onCorrect={correct => {
                                setPassCorrect(correct)
                            }}
                            onChangeText={(test) => {
                                setPass(test)
                            }}
                        />
                        <AppAuthorizeInput
                            rule={password}
                            placeholder="Подтвердите пароль"
                            ruleType="str"
                            type="password"
                            error="Пароли не совпадают"
                            onCorrect={correct => {
                                setPassConfirmedCorrect(correct)
                            }}
                            onChangeText={(test) => {
                                if(passwordCorrect)
                                    setPassConfirmed(test)
                            }}
                        />
                    </View>
                    <TouchableOpacity style={styles.blueBtn} onPress={changePasswordHandler}>
                        <AppTextBold style={styles.blueBtnText}>
                            Сменить пароль
                        </AppTextBold>
                        <Svg style={{marginLeft: 5, marginTop: 5}} width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M15.3751 12.1219C15.6072 12.1218 15.8297 12.0305 15.9938 11.868L21.2438 6.66826C21.5854 6.32986 21.5854 5.78126 21.2438 5.44286L15.9938 0.243258C15.6504 -0.0851423 15.1047 -0.0804423 14.7672 0.253758C14.4297 0.588058 14.4249 1.12856 14.7565 1.46866L19.3879 6.05556L14.7565 10.6426C14.5063 10.8904 14.4315 11.2631 14.5669 11.5869C14.7023 11.9107 15.0213 12.1218 15.3751 12.1219Z" fill="#5382D8"/>
                            <Path d="M1.375 6.92226H20.625C21.1082 6.92226 21.5 6.53426 21.5 6.05556C21.5 5.57696 21.1082 5.18896 20.625 5.18896H1.375C0.8918 5.18896 0.5 5.57696 0.5 6.05556C0.5 6.53426 0.8918 6.92226 1.375 6.92226Z" fill="#5382D8"/>
                        </Svg>
                    </TouchableOpacity>
                    <View style={styles.btnShort}>
                        <AppBlueButton onPress={async () => {
                            const user = await DB.getUser()
                            if(user.token)
                                navigation.navigate("SettingScreen")
                            else
                                navigation.navigate("SignInScreen")
                        }}>
                            Отмена
                        </AppBlueButton>
                    </View>
                    <View style={{marginTop: 30}}></View>
                </View>
            </AppWrap>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        textAlign: "center",
        justifyContent: "center",
        flex: 1,
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#fff"
    },
    btnShort: {
        width: 180,
        marginLeft: "auto",
        marginRight: "auto"
    },
    blueBtn: {
        width: 210,
        marginTop: 25,
        marginBottom: 25,
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: "row",
        alignItems: "center"
    },
    blueBtnText: {
        fontSize: 24,
        color: THEME.BLUE,
        alignItems: "center"
    },
    form: {
        width: "100%",
        marginTop: 10
    },
    wrap: {
        flex: 1,
        marginTop: -30,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around"
    },
    bold: {
        fontSize: 22,
        marginTop: 20,
        textAlign: "center"
    },
    text: {
        width: "100%",
        fontSize: 22,
        marginTop: 30,
        marginBottom: 30
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

export const RestorePassScreen = () => {
    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false
        })}>
            <Stack.Screen name="RestorePassWrapper" component={RestorePassWrapper} />
        </Stack.Navigator>
    )
}
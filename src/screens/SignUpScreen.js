import React, {useLayoutEffect, useState} from "react"
//import SWGImage from "expo-svg-uri"
import { View, StyleSheet, TouchableOpacity} from "react-native"
import {createStackNavigator} from '@react-navigation/stack'
import {AppTextBold} from "@root/ui/AppTextBold";
import {emptyNavigation} from "../../global"
import {THEME} from "../../theme";
import {AppBlueButton} from "../ui/AppBlueButton";
import {AppAuthorizeInput} from "../ui/AppAuthorizeInput";
import {GLOBAL_CONST} from "../../global";
import {AppFetch} from "../AppFetch";
import {AppErrorMessage} from "../ui/AppErrorMessage";
import * as Linking from 'expo-linking'
import {AppWrap} from "../ui/AppWrap";
import {AppLogoFirstScreens} from "../ui/AppLogoFirstScreens";
import {Svg, Path} from "react-native-svg";
import AppSuccessMessage from "../ui/AppSuccessMessage";
import {globalAlert} from "../globalHeaders";

const SignUpWrapper = ({navigation}) => {
    //const headerHeight = useHeaderHeight()
    //const [navHeight, setNavHeight] = useState(0)
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const [passwordConfirm, setPassConfirm] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [emailCorrect, setEmailCorrect] = useState(true)
    const [passwordCorrect, setPassCorrect] = useState(true)
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

    const signUp = async () => {
       if(emailCorrect && passwordCorrect && password === passwordConfirm) {
           const signUp = await AppFetch.get("signUp", {
               email:                      email,
               password:                   password,
               "password_confirmation":    passwordConfirm,
               //url:                        Linking.createURL("/SignUpSuccessScreen")
           })
           console.log('signUp', signUp)
           if(!signUp.result) {
               if(signUp.data.hasOwnProperty('email')) {
                   setErrorMessage(signUp.data.email)
               } else if(signUp.data.hasOwnProperty('password')) {
                   setErrorMessage(signUp.data.password)
               } else if(signUp.data.hasOwnProperty('password_confirmation')) {
                   setErrorMessage(signUp.data['password_confirmation'])
               } else {
                   setErrorMessage("Произошла неизвестная ошибка!")
               }
           } else {
               setErrorMessage("")
               globalAlert({
                   title: "Вы успешно зарегистрировались",
                   onOkFun() {
                       navigation.navigate("AuthorizationScreen")
                   }
               })
               // navigation.navigate("SignMailUpScreen", {
               //     screen: "SignMailUpWrapper",
               //     params: {
               //         email:      email,
               //         password:   password
               //     }
               // })
           }
       } else if(!passwordCorrect) {
           setErrorMessage("Некорректный пароль, пароль должен содержать большую и малую латинкускую букву")
       } else {
           setErrorMessage("Введены некорректные данные")
       }
    }

    //console.log(email, password, passwordConfirm)

    return (
        <AppWrap wrap={{...styles.wrap}} scroll={{marginBottom: 0}} measure={true}>
            <AppLogoFirstScreens />
            <View style={styles.form}>
                <AppTextBold style={styles.bold}>
                    Регистрация
                </AppTextBold>
                {
                    (errorMessage != "")
                        ?
                        <AppErrorMessage errorMessage={errorMessage} toShow={true} />
                        :
                        <></>
                }
                <AppAuthorizeInput
                    rule={GLOBAL_CONST.emailValidation}
                    placeholder="Введите E-Mail"
                    error="Некорректный E-Mail"
                    preCorrect={async ($email) => {
                        const res = await AppFetch.get('checkEmail', {
                            email: $email
                        })
                        if(res.result) {
                            //console.log('res123', $email)
                            return Promise.resolve({
                                error: "Такой email уже существует"
                            })
                        } else {
                            return Promise.resolve({})
                        }
                    }}
                    onChangeText={email => {
                        setEmail(email)
                    }}
                    onCorrect={correct => {
                        setEmailCorrect(correct)
                    }}
                />
                <AppAuthorizeInput
                    rule={/^[a-z0-9\.\-\_]{5,}$/i}
                    placeholder="Введите пароль"
                    error="Пароль должен содержать не меньше 5 латинских символов и цифр"
                    type="password"
                    autoCorrect={false}
                    onChangeText={pass => {
                        setPass(pass)
                    }}
                    onCorrect={correct => {
                        setPassCorrect(correct)
                    }}
                />
                <AppAuthorizeInput
                    rule={password}
                    placeholder="Подтвердите пароль"
                    ruleType="str"
                    autoCorrect={false}
                    passwordRules={"lower"}
                    type="password"
                    error="Пароли не совпадают"
                    onChangeText={passwordConfirm => {
                        setPassConfirm(passwordConfirm)
                    }}
                />
            </View>
            <TouchableOpacity style={styles.blueBtn} onPress={async () => {
                await signUp()
            }}>
                <AppTextBold style={styles.blueBtnText}>
                    Далее
                </AppTextBold>
                <Svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M15.3751 12.1219C15.6072 12.1218 15.8297 12.0305 15.9938 11.868L21.2438 6.66826C21.5854 6.32986 21.5854 5.78126 21.2438 5.44286L15.9938 0.243258C15.6504 -0.0851423 15.1047 -0.0804423 14.7672 0.253758C14.4297 0.588058 14.4249 1.12856 14.7565 1.46866L19.3879 6.05556L14.7565 10.6426C14.5063 10.8904 14.4315 11.2631 14.5669 11.5869C14.7023 11.9107 15.0213 12.1218 15.3751 12.1219Z" fill="#5382D8"/>
                    <Path d="M1.375 6.92226H20.625C21.1082 6.92226 21.5 6.53426 21.5 6.05556C21.5 5.57696 21.1082 5.18896 20.625 5.18896H1.375C0.8918 5.18896 0.5 5.57696 0.5 6.05556C0.5 6.53426 0.8918 6.92226 1.375 6.92226Z" fill="#5382D8"/>
                </Svg>
            </TouchableOpacity>
            <View style={styles.btnShort}>
                <AppBlueButton onPress={() => {
                    navigation.navigate("AuthorizationScreen")
                }}>
                    Отмена
                </AppBlueButton>
            </View>
            <View style={{marginTop: 30}}></View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
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
        color: THEME.BLUE,
        paddingRight: 10,
        alignItems: "center"
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
        paddingTop: 40,
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

export const SignUpScreen = () => {
    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false
        })}>
            <Stack.Screen name="SignUpWrapper" component={SignUpWrapper} />
        </Stack.Navigator>
    )
}
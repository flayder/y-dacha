import React, {useLayoutEffect, useState} from "react"
import { View, StyleSheet, TouchableOpacity, Alert} from "react-native"
import {AppTextBold} from "@root/ui/AppTextBold";
import {emptyNavigation, LinkTo} from "../../global"
import {THEME} from "../../theme";
import {AppBlueButton} from "../ui/AppBlueButton";
import {AppAuthorizeInput} from "../ui/AppAuthorizeInput";
import {GLOBAL_CONST} from "../../global";
import {AppFetch} from "../AppFetch";
import {DB} from "../db";
import {AppErrorMessage} from "../ui/AppErrorMessage";
import {AppWrap} from "../ui/AppWrap";
import {AppLogoFirstScreens} from "../ui/AppLogoFirstScreens";
import {createStackNavigator} from "@react-navigation/stack";
import {Svg, Path} from "react-native-svg";

const SignInWrapper = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const [emailCorrect, setEmailCorrect] = useState(false)
    const [passwordCorrect, setPassCorrect] = useState(false)
    const [inCorrectAuth, setIncorrectAuth] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    //console.log('email', email)
    //console.log('password', password)
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
    const signIn = async () => {
        //console.log('asidajsidjai')
        if(emailCorrect && passwordCorrect) {
            const response =  await AppFetch.get("auth", {
                email: email,
                password: password
            })
            //console.log('response', response)
            if(response.result && response.data.hasOwnProperty('token')) {
                setIncorrectAuth(false)
                const user = await DB.getUser()
                const res = await DB.update({
                    table_name: "user",
                    names: ["login", "password", "token"],
                    values: [email, password, response.data.token],
                    where: `id = ${user.id}`
                })

                //console.log(email, password, response.data.token)

                return Promise.resolve(1)
            } else if(response.data.hasOwnProperty('error')) {
                Alert.alert(
                    response.data.error,
                    "",
                    [
                        {
                            text: "Повторить попытку",
                            onPress: () => {}
                        },
                        {
                            text: "Восстановить пароль",
                            onPress: () => {
                                navigation.navigate("RestorePassEmailScreen", {
                                    screen: "RestorePassEmailWrapper",
                                    params: {
                                        email
                                    }
                                })
                            },
                            style: "cancel"
                        },
                        {}
                    ],
                    { cancelable: false }
                );
            }
        } else {
            setErrorMessage('Поля для авторизации заполнены некорретно')
            setIncorrectAuth(true)
        }
        return Promise.resolve(0)
    }
    return (
        <AppWrap wrap={{...styles.wrap}} scroll={{marginBottom: 0}} height={-50} measure={true}>
            <AppLogoFirstScreens />
            <View style={styles.form}>
                <AppTextBold style={styles.bold}>
                    Авторизация почтой
                </AppTextBold>
                <AppErrorMessage errorMessage={errorMessage} toShow={inCorrectAuth} />
                <AppAuthorizeInput
                    rule={GLOBAL_CONST.emailValidation}
                    placeholder="Введите E-Mail"
                    error="Некорректный E-Mail"
                    onCorrect={correct => {
                        setEmailCorrect(correct)
                    }}
                    onChangeText={email => {
                        setEmail(email)
                    }}
                />
                <AppAuthorizeInput
                    rule={/^[a-z0-9]{5,}$/i}
                    placeholder="Введите пароль"
                    error="Пароль должен содержать не меньше 5 латинских символов и цифр"
                    type="password"
                    onCorrect={correct => {
                        setPassCorrect(correct)
                    }}
                    onChangeText={pass => {
                        setPass(pass)
                    }}
                />
            </View>
            <TouchableOpacity style={styles.blueBtn} onPress={() => {
                navigation.navigate("AuthorizationScreen")
            }}>
                <Svg style={{marginRight: 5, marginTop: 2}} width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M6.1249 12.1219C5.8928 12.1218 5.6703 12.0305 5.5062 11.868L0.2562 6.66826C-0.0854 6.32986 -0.0854 5.78126 0.2562 5.44286L5.5062 0.243258C5.8496 -0.0851423 6.3953 -0.0804423 6.7328 0.253758C7.0703 0.588058 7.0751 1.12856 6.7435 1.46866L2.1121 6.05556L6.7435 10.6426C6.9937 10.8904 7.0685 11.2631 6.9331 11.5869C6.7977 11.9107 6.4787 12.1218 6.1249 12.1219Z" fill="#5382D8"/>
                    <Path d="M20.125 6.92226H0.875C0.3918 6.92226 0 6.53426 0 6.05556C0 5.57696 0.3918 5.18896 0.875 5.18896H20.125C20.6082 5.18896 21 5.57696 21 6.05556C21 6.53426 20.6082 6.92226 20.125 6.92226Z" fill="#5382D8"/>
                </Svg>
                <AppTextBold style={styles.blueBtnText}>
                    Отмена
                </AppTextBold>
            </TouchableOpacity>
            <View style={styles.btnShort}>
                <AppBlueButton onPress={() => {
                    signIn().then(response => {
                        if(response === 1)
                            LinkTo("MainPageScreen", {}, navigation)
                    })
                }}>
                    Войти
                </AppBlueButton>
            </View>
            <View style={{marginTop: 20}}></View>
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
        marginTop: 15,
        marginBottom: 15,
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
        paddingTop: 20,
        paddingBottom: 20,
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
    logo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
    },
    bottom: {
        width: "100%",
        marginTop: 15,
    }
})

const Stack = createStackNavigator()

export const SignInScreen = () => {
    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false
        })}>
            <Stack.Screen name="SignInWrapper" component={SignInWrapper} />
        </Stack.Navigator>
    )
}
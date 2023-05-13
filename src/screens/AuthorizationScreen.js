import React, {useLayoutEffect, useState, useEffect} from "react"
import { useBackHandler } from '@react-native-community/hooks'
import {View, StyleSheet, TouchableOpacity, Alert, Platform} from "react-native"
import {createStackNavigator} from '@react-navigation/stack'
import { EvilIcons, AntDesign, Entypo } from '@expo/vector-icons'
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppText} from "@root/ui/AppText";
import {LinkTo} from "../../global"
import { Anchor } from "../ui/Anchor";
import {THEME} from "../../theme";
import {AppBlueButton} from "../ui/AppBlueButton";
import * as WebBrowser from 'expo-web-browser'
import {isAvailableAsync} from 'expo-apple-authentication';
import * as Linking from "expo-linking";
import {AppWrap} from "../ui/AppWrap";
import {Svg, Path} from "react-native-svg";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {GoogleSocial, AppleSocial, FacebookLogin, VK} from "../AuthBySocial";
import {globalAlert, NavigationBack, navigationBackHandler} from "../globalHeaders";
import VKLogin from "react-native-vkontakte-login";
//import VKLogin from 'rn-vk-login';

GoogleSignin.configure({
    offlineAccess: false
    //webClientId: '331979201147-ncqinkj840nr0pffucsoo5hkfd4l37fr.apps.googleusercontent.com',
    //androidClientId: '331979201147-ncqinkj840nr0pffucsoo5hkfd4l37fr.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    //iosClientId: '331979201147-vlbvgq98mmchkn1cjs25kcsj3ejhj0t0.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

VKLogin.initialize(7799219)

WebBrowser.maybeCompleteAuthSession();

const AuthorizationWrapper = ({navigation, route}) => {
    //const headerHeight = useHeaderHeight()
    //const [navHeight, _] = useState(headerHeight)
    //const [requestGoogle, responseGoogle, promptGoogleAsync] = GoogleSocial.init()
    const [isAvalailableApple, setAvailableApple] = useState(null)
    let mT = 0

    //console.log('route', route)

    if(Platform.OS == "ios") mT = 50
    // useEffect(() => {
    //     // const linkingHandler = event => {
    //     //     linkHandler(event.url)
    //     // }
    //     // const linkHandler = (url, getUrl) => {
    //     //     console.log('vkvfvfv', url)
    //     //     const urlData = new String(url).split('access_token=')
    //     //     if(urlData.length > 1 && urlData[1] !== '') {
    //     //         VK.login(urlData[1]).then(result => {
    //     //             if(result)
    //     //                 navigation.navigate("MainPageScreen")
    //     //         })
    //     //     }
    //     // }
    //     // Linking.getInitialURL().then(linkHandler)
    //     // Linking.addEventListener('url', linkingHandler)
    // }, [Linking])

    // useEffect(() => {
    //     if (responseGoogle?.type === 'success') {
    //         const { authentication } = responseGoogle;
    //     }
    // }, [responseGoogle]);
    //console.log('route.params', route.params)
    useEffect(() => {
        if(isAvalailableApple === null)
            isAvailableAsync().then(resp => {
                setAvailableApple(resp)
            }).catch(err => console.log('catch avail', err))
    }, [isAvalailableApple])

    useBackHandler(() => {
        navigation.navigate("MainPageScreen")
        //console.log('here')
        return true
    })
    //console.log('route.params', route.params)
    if(route.params !== undefined && route.params.hasOwnProperty("Authorized") && !route.params.Authorized) {

        useLayoutEffect(() => {
            navigation.setOptions({
                title: "Страница авторизации",
                //headerTintColor: 'white',
                headerLeft() {
                    return <TouchableOpacity style={{padding: 20, marginTop: -4}} onPress={() => {
                        navigation.navigate("MainPageScreen")
                    }}>
                        <Svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M14.4 21.6L12 24L-5.24538e-07 12L12 5.24537e-07L14.4 2.39999L4.79997 12L14.4 21.6Z" fill="black"/>
                        </Svg>
                    </TouchableOpacity>
                }
            }, [navigation])

            navigation.getParent().setOptions({
                gestureEnabled: false
            })
        })
    } else {
        useLayoutEffect(() => {
            navigation.setOptions({
                title: "Страница авторизации",
                //headerTintColor: 'white',
            }, [navigation])

            navigation.getParent().setOptions({
                gestureEnabled: false
            })
        })
    }


    const btnOpacity = .8

    const alertText = "Пароли авторизации несовпадают"
    const alertBody = "Возможно вы уже авторизовались, но затем изменили пароль"

    return (
        <AppWrap wrap={{...styles.wrap, marginTop: mT}} scroll={{marginBottom: 0}} measure={true}>
            {/*<AppLogoFirstScreens style={{height: 100}} width="185" height="85" />*/}
            {/*<AppButton onPress={() => {*/}
            {/*    navigation.navigate("MainPageScreen")*/}
            {/*}}>asdasd</AppButton>*/}
            <AppText style={styles.bold}>
                Авторизуйтесь или зарегистрируйтесь
                для открытия дополнительного функционала
                и возможности совершать покупки
                через приложение.
            </AppText>
            <TouchableOpacity activeOpacity={btnOpacity} style={{width: "100%"}} onPress={() => {
                FacebookLogin().then(res => {
                    if(res)
                        navigation.navigate("MainPageScreen")
                    else
                        globalAlert({
                            title: alertText,
                            text: alertBody
                        })
                    //else
                    //    AlertDanger()
                })
            }}>
                <View style={{...styles.btnA, ...styles.facebook}}>
                    <EvilIcons name="sc-facebook" size={45} color="#fff" />
                    <AppTextBold style={styles.btnText}>
                        Авторизация через Facebook
                    </AppTextBold>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={btnOpacity} style={{width: "100%"}} onPress={() => {
                //requestGoogle, responseGoogle, promptGoogleAsync
                GoogleSocial.login().then(res => {
                    if(res)
                        navigation.navigate("MainPageScreen")
                    else
                        globalAlert({
                            title: alertText,
                            text: alertBody
                        })
                    //else
                    //    AlertDanger()
                })
            }}>
                <View style={{...styles.btnA, ...styles.white}}>
                    <Svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path fillRule="evenodd" clipRule="evenodd" d="M4.29545 10.2666C4.29545 9.59977 4.40857 8.96044 4.61045 8.36077L1.07673 5.71851C0.388023 7.08771 0 8.6305 0 10.2666C0 11.9014 0.387545 13.4432 1.0753 14.8115L4.60711 12.1641C4.40714 11.5672 4.29545 10.9302 4.29545 10.2666Z" fill="#FBBC05"/>
                        <Path fillRule="evenodd" clipRule="evenodd" d="M10.4999 4.2C11.9795 4.2 13.3158 4.71333 14.3658 5.55333L17.4204 2.56667C15.559 0.98 13.1727 0 10.4999 0C6.35052 0 2.78434 2.32353 1.07666 5.71853L4.61039 8.3608C5.42461 5.94067 7.74559 4.2 10.4999 4.2Z" fill="#EA4335"/>
                        <Path fillRule="evenodd" clipRule="evenodd" d="M10.4999 16.3334C7.74559 16.3334 5.42461 14.5927 4.61039 12.1726L1.07666 14.8144C2.78434 18.2099 6.35052 20.5334 10.4999 20.5334C13.061 20.5334 15.506 19.643 17.3412 17.9747L13.9869 15.4355C13.0405 16.0193 11.8487 16.3334 10.4999 16.3334Z" fill="#34A853"/>
                        <Path fillRule="evenodd" clipRule="evenodd" d="M20.5227 10.2666C20.5227 9.6599 20.4273 9.00657 20.2841 8.3999H10.5V12.3666H16.1318C15.8502 13.719 15.0837 14.7587 13.987 15.4354L17.3412 17.9745C19.2689 16.2226 20.5227 13.613 20.5227 10.2666Z" fill="#4285F4"/>
                    </Svg>
                    <AppTextBold style={{...styles.btnText, ...styles.whiteText}}>
                        Авторизация через Google
                    </AppTextBold>
                </View>
            </TouchableOpacity>
            {isAvalailableApple ?
                <TouchableOpacity activeOpacity={btnOpacity} style={{width: "100%"}} onPress={() => {
                    AppleSocial().then(res => {
                        if(res)
                            navigation.navigate("MainPageScreen")
                        else
                            globalAlert({
                                title: alertText,
                                text: alertBody
                            })
                        //else
                        //    AlertDanger()
                    })
                }}>

                    <View style={{...styles.btnA, ...styles.apple}}>
                        <AntDesign name="apple1" size={30} style={{marginRight: 15}} color="white" />
                        <AppTextBold style={styles.btnText}>
                            Вход с Apple
                        </AppTextBold>
                    </View>
                </TouchableOpacity>
                : <></> }
            <TouchableOpacity activeOpacity={btnOpacity} style={{width: "100%"}} onPress={() => {
                VK.init().then(res => {
                    if(res)
                        navigation.navigate("MainPageScreen")
                    // else
                    //     globalAlert({
                    //         title: alertText,
                    //         text: alertBody
                    //     })
                })
            }}>
                <View style={{...styles.btnA, ...styles.vk}}>
                    <Entypo name="vk" size={30} style={{marginRight: 15}} color="white" />
                    <AppTextBold style={styles.btnText}>
                        Авторизация через VK
                    </AppTextBold>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={btnOpacity} style={{width: "100%"}} onPress={() => {
                navigation.navigate("SignInScreen")
            }}>
                <View style={{...styles.btnA, ...styles.white}}>
                    <Svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M16.5719 9.62808L25 14.9562V4.07495L16.5719 9.62808Z" fill="#A1A1A1"/>
                        <Path d="M0 4.07495V14.9562L8.42813 9.62808L0 4.07495Z" fill="#A1A1A1"/>
                        <Path d="M15.1407 10.5719L12.9297 12.0281C12.7985 12.1141 12.65 12.1562 12.5 12.1562C12.35 12.1562 12.2016 12.1141 12.0704 12.0281L9.85942 10.5703L0.0500488 16.775C0.170361 17.5172 0.785986 18.0938 1.56255 18.0938H23.4375C24.2141 18.0938 24.8297 17.5172 24.9501 16.775L15.1407 10.5719Z" fill="#A1A1A1"/>
                        <Path d="M23.4375 0.90625H1.5625C0.782813 0.90625 0.164063 1.4875 0.046875 2.23594L12.5 10.4406L24.9531 2.23594C24.8359 1.4875 24.2172 0.90625 23.4375 0.90625Z" fill="#A1A1A1"/>
                    </Svg>
                    <AppTextBold style={{...styles.btnText, ...styles.whiteText}}>
                        Авторизация через почту
                    </AppTextBold>
                </View>
            </TouchableOpacity>
            <AppText style={{...styles.bold, marginTop: 5, marginBottom: 10}}>
                или
            </AppText>
            <View style={{width: "100%"}}>
                <AppBlueButton onPress={() => {
                    navigation.navigate("SignUpScreen")
                }}>
                    Зарегистрироваться
                </AppBlueButton>
            </View>
            <View style={styles.bottom}>
                <View>
                    <Anchor style={{width: "auto"}} onPress={async () => {
                        await WebBrowser.openBrowserAsync("https://y-dacha.com/pologenie-page")
                        //navigation.navigate("PolicyScreenTextConfirmation")
                    }}>
                        <AppText style={styles.bottomText}>
                            Создавая или выполняя вход в аккаунт, Вы соглашаетесь
                            с нашим&nbsp;
                        </AppText>
                        Правилами и условиями и Положением
                        о конфиденциальности.
                    </Anchor>
                </View>
            </View>
            <View style={{height: 30}}></View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    anchor: {
        flexDirection: "column",
        alignItems: "stretch",
    },
    btnA: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 7,
        marginTop: 10,
        marginBottom: 10
    },
    btnText: {
        fontSize: 17,
        height: 22,
        color: "#fff",
        paddingLeft: 10
    },
    white: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: THEME.PLACEHOLDER
    },
    whiteText: {
        color: THEME.PLACEHOLDER,
    },
    btnImg: {
        marginRight: 15
    },
    facebook: {
        backgroundColor: "#4460A0"
    },
    vk: {
        backgroundColor: "#4D7198",
    },
    apple: {
        backgroundColor: "black"
    },
    checkbox: {
        marginRight: 15
    },
    wrap: {
        paddingTop: 20,
        justifyContent: "space-around",
        alignItems: "center"
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
        marginTop: 15,
    }
})

const Stack = createStackNavigator()

export const AuthorizationScreen = ({navigation}) => {
    const state = navigation.getState()
    let params = {}
    if(typeof state == "object" && state.hasOwnProperty('routes')) {
        const route = state.routes[state.routes.length - 1]
        if(typeof route == "object" && route.hasOwnProperty('name') && route.name == "AuthorizationScreen" && route.hasOwnProperty('state')) {
            if(route.state.hasOwnProperty('routes') && Array.isArray(route.state.routes)) {
                if(typeof route.state.routes[0] == "object" && route.state.routes[0].hasOwnProperty('state')) {
                    if(route.state.routes[0].state.hasOwnProperty('routes') && Array.isArray(route.state.routes[0].state.routes)) {
                        if(route.state.hasOwnProperty('routes') && Array.isArray(route.state.routes)) {
                            if(typeof route.state.routes[0].state.routes[0] == "object" && route.state.routes[0].state.routes[0].hasOwnProperty('state')) {
                                if(route.state.routes[0].state.routes[0].state.hasOwnProperty('routes') && Array.isArray(route.state.routes[0].state.routes[0].state.routes)) {
                                    const lastRoute = route.state.routes[0].state.routes[0].state.routes[0]
                                    if(typeof lastRoute == "object" && lastRoute.hasOwnProperty('params') && lastRoute.params !== undefined)
                                        params = lastRoute.params
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return (
        <Stack.Navigator screenOptions={() => ({
            //headerShown: false
        })}>
            <Stack.Screen
                name="AuthorizationWrapper"
                initialParams={params}
                component={AuthorizationWrapper}
            />
        </Stack.Navigator>
    )
}
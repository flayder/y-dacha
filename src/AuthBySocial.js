import React from "react"
import * as Facebook from "expo-facebook";
import {Alert, Platform} from "react-native";
import {AppFetch} from "./AppFetch";
import {DB} from "./db";
import * as WebBrowser from 'expo-web-browser'
import * as AppleAuthentication from "expo-apple-authentication";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import VKLogin from "react-native-vkontakte-login";
import * as AuthSession from "expo-auth-session"
import {globalAlert} from "./globalHeaders";

WebBrowser.maybeCompleteAuthSession();

const prepareForSending = async (email, password, identityToken = false) => {
    //console.log(email, password)
    const response = await AppFetch.get("loginBySocial", {
        email:      email,
        password:   password,
        identityToken
    })
    //console.log('response', response)
    if(response.result && response.data.token) {
        await DB.getUser()
        await DB.update({
            "table_name": "user",
            "names": ["login", "password", "token"],
            "values": [email, password, response.data.token],
            "where": "id = 1"
        })
        return Promise.resolve(true)
    } else
        return Promise.resolve(false)
}

const authFunc = async (email, password) => {
    const data = await AppFetch.get('auth', {
        email:      email,
        password:   password
    })
    if(data.result) return Promise.resolve(true)

    return Promise.resolve(false)
}

export const AppleSocial = async () => {
    try {
        //const csrf = Math.random().toString(36).substring(2, 15);
        //const nonce = Math.random().toString(36).substring(2, 10);
        //const hashedNonce = await Crypto.digestStringAsync(
        //Crypto.CryptoDigestAlgorithm.SHA256, nonce);
        const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
            //state: csrf,
            //nonce: hashedNonce
        });
        const password = `Lol19648209166630`
        //console.log('credential', credential)
        if (typeof credential == "object" && credential.hasOwnProperty("user") && credential.user) {
            if (credential.hasOwnProperty('email')) {
                if(credential.email === null) {
                    const res = await AppFetch.get('loginBySocialWithIdentifyToken', {
                        identityToken: credential.user
                    })
                    //console.log('resresres', res)
                    if(res.result) {
                        credential.email = res.data
                    }
                }
                if(credential.email !== null) {
                    try {
                        const result = await prepareForSending(credential.email, password, credential.user)
                        if (result) return Promise.resolve(true)
                    } catch (e) {
                        return Promise.resolve(false)
                    }
                }
            } else {
                const user = await DB.getUser()
                if (user.login !== null && user.password !== null) {
                    const data = await authFunc(user.email, user.password)
                    if (data) return Promise.resolve(true)
                }
            }
        }
        //AlertMessage("для авторизации с помощью apple, email должен быть в наличии")
        return Promise.resolve(false)
    } catch (e) {
        console.log(e)
    }
}


export class VK {
    static async init () {
        let email = null
        try {
            if(Platform.OS == "android") {
                const isLoggedIn = await VKLogin.isLoggedIn();
                //console.log('isLoggedIn', isLoggedIn)
                //const access_token = await VKLogin.getAccessToken()
                //console.log('access_tokenaccess_token', access_token)
                const auth = await VKLogin.login(['email']);
                //console.log('authVk', auth)
                await VKLogin.logout();
                if(typeof auth == "object" && auth.hasOwnProperty('email'))
                    email = auth.email
                const result = await VK.login(email)
                return Promise.resolve(result)
            } else {
                let redirectUrl = 'https://y-dacha.com/api/v1/redirectToApplication'
                //console.log('redirectUrl', redirectUrl)

                const result = await AuthSession.startAsync({
                    authUrl: `https://oauth.vk.com/authorize?client_id=7799219&display=mobile&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=token&scope=email`,
                    //returnUrl: 'ydacha://authorizeVk'
                    returnUrl: 'https://y-dacha.com/api/v1/redirectToApplication'
                })

                //console.log('resultVK123', result)
                if (result.type === 'success' && result.hasOwnProperty('params') && typeof result.params == "object") {
                    if(result.params.email) {
                        const res = await VK.login(result.params.email)
                        return Promise.resolve(res)
                    }
                    // if(result.params.access_token) {
                    //     const response = await fetch(`https://api.vk.com/method/users.get?access_token=${result.params.access_token}&v=5.92`);
                    //     const user = await response.json();
                    //     console.log('useruser', user)
                    //     // if(typeof user == "object" && user.email) {
                    //     //     const res = await VK.login(user.email)
                    //     //     return Promise.resolve(res)
                    //     // }
                    // }

                }
            }
        } catch (e) {
            //console.log('vkError', e)
            return Promise.reject(e)
        }

        globalAlert({
            title: "При попытке авторизации не найден email",
            text: "Возможно email не указан в личных настройках аккаунта, попробуйте обратиться в администрацию или попробовать другой способ авторизации"
        })

        return Promise.resolve(false)
    }

    //url
    static async login(email) {
        let isVk = false
        // try {
        //     if(new String(url).indexOf("expires_in=86400") !== -1) isVk = true
        //     const preData = new String(url).split('email=')
        //     if(preData.length > 1 && preData[1] !== '') {
        //         const response = await fetch(`https://api.vk.com/method/users.get?v=5.92&access_token=${url}`);
        //         const user = await response.json()
        //
        //         console.log('userVk', user)
        //         let email = preData[1]
        //         if(email.indexOf("&") !== -1) {
        //             let str = email.split("&")
        //             email = str[0]
        //         }
        //
        //     }
        // } catch (e) {
        //     return Promise.resolve(false)
        // }
        if(email !== "") {
            const password = `Lol568007002`
            const result = await prepareForSending(email, password)
            if(result) return Promise.resolve(true)
        } else {
            const user = DB.getUser()
            if (user.login !== null && user.password !== null) {
                const data = await authFunc(user.email, user.password)
                if (data) return Promise.resolve(true)
            }
        }

        AlertMessage("для авторизации с помощью VK, email должен быть в наличии")

        return Promise.resolve(false)
    }
}

export class GoogleSocial {
    //requestGoogle, responseGoogle, promptGoogleAsync
    static async login () {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //console.log('userInfo', userInfo)
            if(typeof userInfo == "object" &&
                userInfo.hasOwnProperty('user') &&
                userInfo.user.hasOwnProperty('email') &&
                userInfo.user.email) {
                const password = `Lol104529823350891014932`
                const res = await prepareForSending(userInfo.user.email, password)
                if(res) return Promise.resolve(true)
                return Promise.resolve(false)
            } else {
                const user = await DB.getUser()
                if(user?.login !== null && user?.password !== null) {
                    const data = await authFunc(user.email, user.password)
                    if(data) return Promise.resolve(true)
                }
            }
        } catch (e) {
            AlertMessage(e)
            //console.log('googleSignInError', e)
        }

        AlertMessage(" для авторизации с помощью google, email должен быть в наличии")
        return Promise.resolve(false)
    }
}

const AlertMessage = (message) => {
    Alert.alert(
        "Не удалось получить email,",
        message,
        [
            {
                text: "Отмена авторизации",
                onPress: () => {() => Promise.resolve(false)},
                style: "cancel"
            },
            {}
        ]
    )
}

export const FacebookLogin = async () => {
    await Facebook.initializeAsync({appId: '196957464266863', appName: 'Cleverdacha'})
    const result = await Facebook.logInWithReadPermissionsAsync({
        permission: ['public_profile', 'email']
    })

    //console.log('resultFacebook', result)

    if (result.type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?fields=id,email&access_token=${result.token}`)
        const json = await response.json()
        //console.log('jsonFacebook', json)
        if(json.hasOwnProperty("email") && json.email) {
            const password = `Lol113659520811070`
            const res = await prepareForSending(json.email, password)
            if(res)
                return Promise.resolve(true)
        } else {
            const user = await DB.getUser()
            if(user.login !== null && user.password !== null) {
                const data = await authFunc(user.email, user.password)
                if(data) return Promise.resolve(true)
            }
        }
    }
    AlertMessage("для авторизации с помощью facebook, email должен быть в наличии")
    return Promise.resolve(false)
}
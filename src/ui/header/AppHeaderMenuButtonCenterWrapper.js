import React, {useEffect} from "react"
import {View, StyleSheet, Platform} from "react-native"
import {useDispatch, useSelector} from "react-redux";
import { useBackHandler } from '@react-native-community/hooks'
import {getGlobalLocation, getGlobalUserInfo, setGlobalMessage, setGlobalOrder} from "../../store/actions/other";
import * as Network from 'expo-network';
import {DB} from "../../db";
import {
    getBackHandle,
    LinkTo,
} from "../../../global";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from "@react-native-firebase/messaging";
import {getChat} from "../../store/actions/chat";
import {GlobalPushNotification, GlobalPushNotificationIOS} from "../../PushNotifications";
import {loadMainEvents} from "../../store/actions/events";
import {loadMainMasters} from "../../store/actions/masters";
import {loadMainNews} from "../../store/actions/news";
import {loadMainShops} from "../../store/actions/shops";

export default ({navigation, route, children}) => {
    const getGlobalRoute = (fullRoute = false) => {
        let route = ""
        const mainState = navigation.getParent().getParent().getParent().getState()
        if (mainState.hasOwnProperty('history')) {
            const lastElement = mainState.history[mainState.history.length - 1]
            if (typeof lastElement == "object" && lastElement.hasOwnProperty('key')) {

                let arrKey = lastElement.key.split("-")
                //console.log('lastElement', arrKey)
                route = arrKey[0]
            }
        }
        return route
    }

    useBackHandler(() => {
        try {
            const data = getBackHandle(navigation)
            if(data.routeName) {
                LinkTo(data.routeName, data.params, navigation)
            } else
                LinkTo("MainPageScreen", {}, navigation)
        } catch (e) {
            console.log('useBackHandlerError', e)
            LinkTo("MainPageScreen", {}, navigation)
        }
        return true
    })
    const init = true
    const data = useSelector(state => state.others)
    const dispatch = useDispatch()
    const globalRoute = getGlobalRoute()
    const globalMessage = data.globalMessage
    const globalOrder = data.globalOrder
    const location = typeof data.location == "object" ? data.location : {}
    const globalUser = typeof data.userInfo == "object" ? data.userInfo : {}

    //console.log('globalRoute', globalRoute)

    useEffect(() => {
        if(globalRoute == "MessagesPageScreen" && globalMessage) {
            dispatch(setGlobalMessage(false))
        } else if(
            globalRoute == "BasketPageScreen" ||
            globalRoute == "OrderBuyerPageScreen" ||
            globalRoute == "OrderMasterPageScreen"
        ) {
            if(globalOrder) {
                dispatch(setGlobalOrder(false))
            }
        }
    }, [globalRoute])

    const reactOnMessage = async (message) => {
        if (message.data.hasOwnProperty('action')) {
            //console.log('actionOnMessage')
            const data = message.data
            //console.log('reactOnMessage', message)
            if (data.action == "message") {
                if (globalRoute == "ChatPageScreen" && data.hasOwnProperty('user_id')) {
                    dispatch(getChat({
                        id: data.user_id,
                        navigation
                    }))
                    //console.log('here')
                    return Promise.resolve(false)
                } else
                if(!globalMessage) dispatch(setGlobalMessage(true))
            } else if (data.action == "shop" || data.action == "master") {
                if(!globalOrder) dispatch(setGlobalOrder(true))
            } else if (data.action == "updateMainPage") {
                dispatch(loadMainEvents({navigation}))
                dispatch(loadMainMasters({navigation}))
                dispatch(loadMainNews({navigation}))
                dispatch(loadMainShops({navigation}))
            }
        }
        //console.log('finishOnMessage')
        return Promise.resolve(true)
    }

    const soundIs = async (message) => {
        if(message.data.hasOwnProperty('action') && message.data.hasOwnProperty('user_id')) {
            if(message.data.user_id > 0) {
                let muted = data.muted
                if(muted.includes(message.data.user_id))
                    return Promise.resolve(false)
            }
        }

        return Promise.resolve(true)
    }

    const createNotificationFun = (data) => {
        if(data.action == "message" && data.hasOwnProperty('user_id')) {

            if(globalRoute != "ChatPageScreen") {
                LinkTo("ChatPageScreen", {
                    masterId: data.user_id
                }, navigation)
            } else {
                dispatch(getChat({
                    id: data.user_id,
                    navigation
                }))
            }

        } else if(data.action == "shop" && data.hasOwnProperty('user_id')) {
            LinkTo("OrderListPageScreen", {}, navigation)
        } else if(data.action == "master" && data.hasOwnProperty('user_id')) {
            LinkTo("OrderMasterOwnerScreen", {}, navigation)
        } else if(data.action == "status_owner" && data.hasOwnProperty('user_id')) {
            LinkTo("OrderMasterPageScreen", {}, navigation)
        } else if(data.action == "status_owner_master" && data.hasOwnProperty('user_id')) {
            LinkTo("OrderMasterOwnerScreen", {}, navigation)
        } else if(data.action == "status_user" && data.hasOwnProperty('user_id')) {
            LinkTo("OrderBuyerPageScreen", {}, navigation)
        } else if(data.action == "status_user_master" && data.hasOwnProperty('user_id')) {
            LinkTo("OrderListPageScreen", {}, navigation)
        }
    }

    try {
        if(Platform.OS == "android") {
            useEffect(() => {
                PushNotification.configure({
                    // (optional) Called when Token is generated (iOS and Android)
                    onRegister: function (token) {
                        //console.log("TOKEN:", token);
                    },

                    // (required) Called when a remote is received or opened, or local notification is opened
                    onNotification: function (notification) {
                        //console.log("NOTIFICATION:", notification);
                        const data = notification.data

                        if(notification.userInteraction)
                            createNotificationFun(data)

                        // (required) Called when a remote is received or opened, or local notification is opened
                        notification.finish(PushNotificationIOS.FetchResult.NoData);
                    },

                    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
                    onAction: function (notification) {
                        //console.log("ACTION:", notification.action);
                        //console.log("NOTIFICATION:", notification);

                        // process the action
                    },

                    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
                    onRegistrationError: function(err) {
                        //console.error(err.message, err);
                    },

                    // IOS ONLY (optional): default: all - Permissions to register.
                    permissions: {
                        alert: true,
                        badge: true,
                        sound: true,
                    },

                    // Should the initial notification be popped automatically
                    // default: true
                    popInitialNotification: true,

                    /**
                     * (optional) default: true
                     * - Specified if permissions (ios) and token (android and ios) will requested or not,
                     * - if not, you must call PushNotificationsHandler.requestPermissions() later
                     * - if you are not using remote notification or do not have Firebase installed, use this:
                     *     requestPermissions: Platform.OS === 'ios'
                     */
                    requestPermissions: true,
                })
                GlobalPushNotification.checkingPermission()

                const token = GlobalPushNotification.getPushToken(navigation)
                //if(typeof token == "string" && token != notificationToken)
                //    setNotificationToken(token)
            }, [init])
        } else {
            const onRemoteNotification = (notification) => {
                const data = notification.getData()
                const isClicked = data.userInteraction === 1;
                //console.log('iosClick', data)
                if (isClicked) {
                    createNotificationFun(data)
                }
            }
            useEffect(() => {
                const iosNotification = async () => {
                    const token = await GlobalPushNotificationIOS.requestUserPermission()
                    await GlobalPushNotification.getPushToken(navigation)
                    //if(typeof token == "string" && token != notificationToken)
                    //    setNotificationToken(token)
                }
                iosNotification()
                PushNotificationIOS.addEventListener('notification', onRemoteNotification);
                PushNotificationIOS.addEventListener('localNotification', onRemoteNotification);
                //console.log('okokokook')
            }, [init]);
        }
    } catch (e) {console.log('loadingNavigationInitiationError', e)}

    useEffect(() => {
        // DB.getUser().then(user => {
        //     if(!user.token) navigation.navigate("AuthorizationScreen")
        // })
        DB.getPushing().then(pushing => {
            if(pushing) {
                //console.log('hereMessage')
                try {
                    const unsubscribe = messaging().onMessage(async remoteMessage => {
                        //console.log('onMessage', remoteMessage)
                        const show = await reactOnMessage(remoteMessage)
                        //console.log('showOnMessage', show)
                        if (show) {
                            const sound = await soundIs(remoteMessage)

                            if (Platform.OS == "android")
                                await GlobalPushNotification.getMessage(remoteMessage, sound)
                            else {
                                await GlobalPushNotificationIOS.getMessage(remoteMessage, sound)
                            }
                        }
                    })

                    return unsubscribe
                } catch (e) {
                    console.log('onMessageInitiationError', e)
                }
            }
        })

    }, [init])

    useEffect(() => {
        DB.getPushing().then(pushing => {
            if(pushing) {
                //console.log('hereMessage1')
                try {
                    const unsubscribe = messaging().setBackgroundMessageHandler(async remoteMessage => {
                        //console.log('setBackgroundMessageHandler', remoteMessage)
                        const show = await reactOnMessage(remoteMessage)
                        //console.log('showSetBackgroundMessageHandler', show)
                        if (show) {
                            const sound = await soundIs(remoteMessage)

                            if (Platform.OS == "android")
                                await GlobalPushNotification.getMessage(remoteMessage, sound)
                            else {
                                await GlobalPushNotificationIOS.getMessage(remoteMessage, sound)
                            }
                        }
                    })

                    return unsubscribe
                } catch (e) {
                    console.log('backgroundMessageInitiationError', e)
                }
            }
        })
    }, [init])

    useEffect(() => {
        if(!globalUser.hasOwnProperty('id'))
            dispatch(getGlobalUserInfo({navigation}))
        //console.log()
    }, [globalUser.hasOwnProperty('id')])

    useEffect(() => {
        const initLocal = async () => {
            const ip = await Network.getIpAddressAsync()
            //console.log('ip', ip)
            dispatch(getGlobalLocation({ip}))
        }
        if(!location.hasOwnProperty('id'))
            initLocal()
        //console.log('data.location123', data.location)
    }, [location.hasOwnProperty('id')])


    return (
        <View style={styles.style}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    style: {
        paddingBottom: 10
    }
})
import PushNotification, {Importance} from "react-native-push-notification"
import {DB} from "./db";
import {GLOBAL_PUSHING, PUSHING_DEFAULT_CHANNEL_ID, PUSHING_SOUND_CHANNEL_ID} from "../global";
import messaging from "@react-native-firebase/messaging";
import {AppFetch} from "./AppFetch";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

class AbstractNotificationClass {
    static getPushToken = async (navigation) => {
        //console.log('navigationnavigationnavigation', navigation)
        let token = false
        try {
            token = await messaging().getToken()
            let checkToken = await DB.getOption("appPushToken")
            //console.log('token', token, "=====================", checkToken)
            if(navigation !== undefined && token && token != checkToken) {
                const ss = await DB.createOrUpdate("appPushToken", token)
                //console.log('ss', ss)
                const res = await AppFetch.getWithToken("setUserPushToken", {'appPushToken': token}, {}, navigation)
                //console.log('ssss', res)
            }
            //if(token != notificationToken) return Promise.resolve(token)
        } catch (error) {
            console.log('tokenError', error)
        }
        return Promise.resolve(true)
    }
}

export class GlobalPushNotification extends AbstractNotificationClass {

    static checkingPermission() {
        PushNotification.checkPermissions(({ alert, badge, sound }) => {
            if (!alert || !badge || !sound) {
                PushNotification.requestPermissions();
            }
        })
    }

    static async getMessage(remoteMessage, sound = true) {
        await GlobalPushNotification.createDefaultChannels()

        const params = {
            channelId: PUSHING_SOUND_CHANNEL_ID,
            message: remoteMessage.notification.body,
            playSound: sound,
            userInfo: remoteMessage.data
        }

        if (remoteMessage.notification.title) {
            params.title = remoteMessage.notification.title
        }

        PushNotification.localNotification(params)

        return Promise.resolve(remoteMessage)
    }

    static async createDefaultChannels() {
        const isExist = await DB.getOption(GLOBAL_PUSHING)
        if(!isExist) {
            PushNotification.channelExists(PUSHING_DEFAULT_CHANNEL_ID, function (exists) {
                if(!exists) {
                    PushNotification.createChannel(
                        {
                            channelId: PUSHING_DEFAULT_CHANNEL_ID, // (required)
                            channelName: `Default channel`, // (required)
                            channelDescription: "A default channel", // (optional) default: undefined.
                            importance: Importance.LOW, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                            vibrate: false, // (optional) default: true. Creates the default vibration pattern if true.
                        },
                        (created) => console.log(`createChannel 'default-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
                    )
                }
            })

            PushNotification.channelExists(PUSHING_SOUND_CHANNEL_ID, function (exists) {
                if(!exists) {
                    PushNotification.createChannel(
                        {
                            channelId: PUSHING_SOUND_CHANNEL_ID, // (required)
                            channelName: `Sound channel`, // (required)
                            channelDescription: "A sound channel", // (optional) default: undefined.
                            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
                        },
                        (created) => console.log(`createChannel 'sound-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
                    )
                }
            })
        }

        return Promise.resolve(true)
    }

    static async setPushingToDB(type) {
        await DB.createOrUpdate(GLOBAL_PUSHING, type)

        return Promise.resolve(true)
    }
}

export class GlobalPushNotificationIOS extends AbstractNotificationClass {
    static requestUserPermission = async () => {
        //console.log('messaging', firebase.app().name)
        try {
            const data = await PushNotificationIOS.requestPermissions({
                alert: true,
                badge: true,
                sound: true,
                critical: true,
            })
                .then(
                    (data) => {
                        console.log('PushNotificationIOS.requestPermissions', data);
                    },
                    (data) => {
                        console.log('PushNotificationIOS.requestPermissions failed', data);
                    },
                );
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                const token = await GlobalPushNotificationIOS.getPushToken()
                return Promise.resolve(token)
            }
        } catch (error) {
            console.log('notification.error', error)
        }

        return Promise.resolve(true)
    }
    static async getMessage(message, sound = true) {
        const params = {
            soundName: "default",
            isSilent: !sound,
            alertBody: message.notification.body,
            userInfo: message.data
        }

        if(message.notification.title) {
            params.alertTitle = message.notification.title
        }

        PushNotificationIOS.presentLocalNotification((params))

        return Promise.resolve(message)
    }
}


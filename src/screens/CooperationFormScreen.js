import React, {useLayoutEffect, useState, useRef, useEffect} from "react"
import {View, StyleSheet, TouchableOpacity, Platform, ActivityIndicator} from "react-native"
import {Svg, Path} from "react-native-svg";
import {AppWrap} from "../ui/AppWrap";
import {createDrawerNavigator} from "@react-navigation/drawer"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from "@react-navigation/stack";
import AppTextInput from "../ui/AppTextInput";
import {AppBlueButton} from "../ui/AppBlueButton";
import {commonHeader} from "@root/globalHeaders"
import AppIndicator from "../ui/AppIndicator";
import {FileHandler, globalRouteFun} from "../../global";
import {AppFetch} from "../AppFetch";
import AppSuccessMessage from "../ui/AppSuccessMessage";
import {AppLogoFirstScreens} from "../ui/AppLogoFirstScreens";
import * as ImagePicker from 'expo-image-picker';
import {globalAlert} from "../globalHeaders";
import {THEME} from "../../theme";

const pageWrapper = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [theme, setTheme] = useState("")
    const [message, setMessage] = useState("")
    const [file, setFile] = useState(false)
    const [success, setSuccess] = useState(false)
    const [sending, setSending] = useState(false)
    //console.log('message', message)

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    globalAlert({
                        title: "Вы не дали разрешение на загрузку фото"
                    })
                }
            }
        })();
    }, []);

    const uploadFile = async () => {
        const file = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        setFile(file)
    }
    const submit = () => {
        setSending(true)
        const data = new FormData
        data.append('email', email)
        data.append('theme', theme)
        data.append('message', message)
        const files = FileHandler(file)
        if(files)
            data.append('file', files)

        AppFetch.postWithToken('feedback', data, {}, {}, navigation).then(response => {
            setSending(false)
            if(response) {
                setSuccess(true)
                setTimeout(() => {
                    setFile(false)
                    setEmail("")
                    setMessage("")
                    setTheme("")
                    setMessage("")
                    setSuccess(false)
                }, 3000)
            }
        })
    }
    //console.log("statePushing " + Platform.OS, statePushing)
    useLayoutEffect(() => {
        navigation.getParent().getParent().setOptions({
            gestureEnabled: false
        })
        navigation.getParent().getParent().getParent().setOptions({
            gestureEnabled: false
        })
        navigation.setOptions(
            commonHeader({
                title: "Мы готовы к сотрудничеству",
                navigation: navigation,
                jumpTo: "MainPageScreen"
            }),

            [navigation]
        )
    })

    return (
        <AppWrap
            scroll={{paddingTop: 40, marginBottom: 0}}
            measure={true}
        >
            {!success ?
                <View style={styles.wrap}>
                    <AppLogoFirstScreens />
                    <AppTextInput
                        placeholder="Введите E-mail"
                        style={styles.input}
                        value={email}
                        onPressText={text => {
                            setEmail(text)
                        }}
                    />
                    <AppTextInput
                        placeholder="Введите тему письма"
                        style={styles.input}
                        value={theme}
                        onPressText={text => {
                            setTheme(text)
                        }}
                    å/>
                    <View style={styles.textWrappper}>
                        <AppTextInput
                            placeholder="Введите сообщение"
                            multiline={true}
                            style={styles.textArea}
                            value={message}
                            onPressText={text => {
                                setMessage(text)
                            }}/>
                        <TouchableOpacity style={styles.file} onPress={uploadFile}>
                            <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M16.7548 10.3051L6.53152 0L5.7591 0.813559L15.9823 11.1186C17.3 12.4294 17.3 14.5537 15.9823 15.8644C14.6647 17.1751 12.5746 17.1751 11.2569 15.8644L1.80611 6.37288C0.942811 5.51412 0.942811 4.0678 1.80611 3.20904C2.6694 2.35028 4.07794 2.35028 4.94124 3.20904L14.3921 12.7006C14.8464 13.1525 14.8464 13.8305 14.3921 14.2825C13.9377 14.7345 13.2561 14.7345 12.8018 14.2825L4.16881 5.55932L3.39639 6.37288L12.0294 15.096C12.8927 15.9548 14.3012 15.9548 15.1645 15.096C16.0278 14.2373 16.0278 12.791 15.1645 11.9322L5.71366 2.44068C4.396 1.12994 2.30591 1.12994 0.988247 2.44068C-0.329416 3.75141 -0.329416 5.87571 0.988247 7.18644L10.4391 16.678C12.1657 18.4407 14.9827 18.4407 16.7093 16.678C18.4359 14.9153 18.4359 12.0678 16.7093 10.3503L16.7548 10.3051Z" fill="#6C6C6C"/>
                            </Svg>
                        </TouchableOpacity>
                    </View>
                    {
                        sending
                            ?
                            <AppBlueButton style={styles.btn}>
                                <ActivityIndicator size="small" style={{marginRight: 20}} color={"#fff"} />
                                Отправить
                            </AppBlueButton>
                            :
                            <AppBlueButton style={styles.btn} onPress={submit}>
                                Отправить
                            </AppBlueButton>

                    }
                </View>
                :
                <AppSuccessMessage
                    navigation={navigation}
                    title={"Данные"}
                    text={"отправлены успешно"}
                    label={"На главную"}
                />
            }
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    textWrappper: {
        position: "relative"
    },
    file: {
        position: "absolute",
        right: 20,
        bottom: 55
    },
    wrap: {
        width: "100%",
        height: "100%"
    },
    input: {
        marginTop: 15,
        marginBottom: 15
    },
    textArea: {
        height: 150,
        textAlignVertical: "top",
        paddingTop: 15,
        marginTop: 15,
        marginBottom: 35
    },
    btn: {

    }
})

const Stack = createStackNavigator()

const pageScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"StackSettingScreen"} component={pageWrapper} />
        </Stack.Navigator>
    )
}

//Tabs
const Tab = createBottomTabNavigator();

const pageTab = () => {
    return (
        <Tab.Navigator tabBar={() => {
            return <></>
        }}
        >
            <Tab.Screen name={"MainTabs"} component={pageScreen} />
        </Tab.Navigator>
    )
}

//Drawers
const Drawer = createDrawerNavigator()

export default ({route}) => {
    globalRouteFun(route)
    return (
        <>
            <Drawer.Navigator screenOptions={() => ({
                headerShown: false
            })} drawerPosition="left">
                <Drawer.Screen name="DrawerSettingScreen" component={pageTab} />
            </Drawer.Navigator>
            <AppIndicator timer={1} />
        </>
    )
}

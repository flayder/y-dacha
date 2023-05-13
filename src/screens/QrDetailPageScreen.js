import React, {useLayoutEffect, useEffect, useState, useRef} from "react"
import {StyleSheet, View, Image, Animated, Clipboard} from "react-native"
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppWrap} from "../ui/AppWrap";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import {globalRouteFun, SharingFile} from "../../global";
import {AppAuthorizeInput} from "../ui/AppAuthorizeInput";
import AppHint from "../ui/AppHint";
import {AppBlueButton} from "../ui/AppBlueButton";
import {AppFetch} from "../AppFetch";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentRoute} from "../store/actions/other";

const pageWrapper = ({navigation, route}) => {
    let id = 0
    let type = ""
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('sortId')) {
            id = route.params.sortId
        } else if(route.params.hasOwnProperty('chemicalId')) {
            id = route.params.chemicalId
        }

        if(route.params.hasOwnProperty('type')) {
            type = route.params.type
        }
    }
    const fadeAnim = useRef(new Animated.Value(1)).current
    const closeHint = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }
        ).start(() => {
            fadeAnim.current = 1
        })
    }

    if(id === 0 || type == "") {
       return (
           <AppTextBold>
               Неверные данные!
           </AppTextBold>
       )
    }

    let text = ""
    if(type == "sort") {
        text = "сорт"
    } else if(type == "chemical") {
        text = "химикат"
    }

    useLayoutEffect(() => {
        navigation.setOptions(
            mainHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "MainPageScreen"
                }),
            [navigation])
    })

    const [data, setData] = useState({})
    const init = true
    useEffect(() => {
        AppFetch.getWithToken("getQrCode", {
            id,
            type
        }, {}, navigation).then(response => {
            if(response.result) {
                setData(response.data)
            }
        })
    }, [init])

    const [copiedText, setCopiedText] = useState(false)

    const copyToClipboard = () => {
        if(data.hasOwnProperty('url'))
            Clipboard.setString(data.url)
    }

    const fetchCopiedText = async () => {
        const text = await Clipboard.getString()
        setCopiedText(true)
    }

    return (
        <AppWrap measure={true} height={-200}>
            <View style={styles.container}>
                {
                    data.hasOwnProperty('qr')
                        ?
                        <Image
                            style={styles.qr}
                            source={{uri: data.qr}}
                        />
                        :
                        <></>
                }
                {
                    data.hasOwnProperty('url')
                        ?
                        <>
                            <AppAuthorizeInput
                                placeholder={"Ссылка на " + text}
                                value={data.url}
                            />
                           <View>
                               <View style={styles.btnWrap}>
                                   {/*<AppHint*/}
                                   {/*    style={styles.hint}*/}
                                   {/*    text={"QR код был скопирован"}*/}
                                   {/*/>*/}
                                   <AppBlueButton
                                       onPress={async () => {
                                           await SharingFile(data.qr)
                                       }}
                                   >
                                       <AppTextBold>
                                           Поделиться QR кодом
                                       </AppTextBold>
                                   </AppBlueButton>
                               </View>
                               <View style={styles.btnWrap}>
                                   {
                                       copiedText
                                           ?
                                           <Animated.View style={{...styles.hint, opacity: fadeAnim}}>
                                               <AppHint
                                                   text={"Ссылка скопирована"}
                                               />
                                           </Animated.View>

                                           :
                                           <></>

                                   }

                                   <AppBlueButton
                                       onPress={async () => {
                                           copyToClipboard()
                                           await fetchCopiedText()
                                           setTimeout(() => {
                                               closeHint()
                                           }, 3000)
                                       }}
                                   >
                                       <AppTextBold>
                                           Скопировать ссылку
                                       </AppTextBold>
                                   </AppBlueButton>
                               </View>
                           </View>
                        </>
                        :
                        <></>
                }
            </View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "space-around",
        paddingBottom: 20,
        paddingTop: 20
    },
    qr: {
        width: 250,
        height: 250,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 40
    },
    btnWrap: {
        position: "relative",
        width: 250,
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: 20,
        paddingBottom: 20
    },
    hint: {
        position: "absolute",
        width: 200,
        left: "50%",
        top: -1,
        zIndex: 9,
        marginLeft: -30
    }
})

const Stack = createStackNavigator()

const pageScreen = ({navigation, route}) => {
    //console.log('StackPageScreen', route.params)
    return (
        <Stack.Navigator>
            <Stack.Screen name={"StackPageScreen"} component={pageWrapper} />
        </Stack.Navigator>
    )
}

//Tabs
const Tab = createBottomTabNavigator();

const PageTab = ({navigation, route}) => {
    //console.log('InsideTabs', route.params)
    return (
        <Tab.Navigator tabBar={() => {
            return <BottomMenu />
        }}
        >
            <Tab.Screen name={"InsideTabs"} component={pageScreen} />
        </Tab.Navigator>
    )
}

//Drawers
const Drawer = createDrawerNavigator()

export default ({route}) => {
    globalRouteFun(route)
    return (
        <>
            <Drawer.Navigator
                screenOptions={() => ({
                    headerShown: false
                })}
                drawerContent={AppDrawerContentHandler} drawerPosition="left"
            >
                <Drawer.Screen name="InsidePageScreen" component={PageTab} />
            </Drawer.Navigator>
            <AppIndicator timer={2} />
        </>
    )
}

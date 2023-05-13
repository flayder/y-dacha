import React, {useLayoutEffect, useState, useEffect} from "react"
import {StyleSheet, Dimensions} from "react-native"
import {AppWrap} from "../ui/AppWrap";
import {createDrawerNavigator} from "@react-navigation/drawer"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {useDispatch, useSelector} from "react-redux";
import AppIndicator from "../ui/AppIndicator";
import {mainHeader} from "../globalHeaders";
import {AppTextBold} from "../ui/AppTextBold";
import AppPhotoBlock from "../ui/userProfile/AppPhotoBlock";
import AppShopBlock from "../ui/userProfile/AppShopBlock";
import AppShopSocial from "../ui/userProfile/AppShopSocial";
import {AppFetch} from "../AppFetch";
import {globalRouteFun, LinkTo} from "../../global";
import {THEME} from "../../theme";
import AppButton from "../ui/AppButton";
import {setCurrentRoute} from "../store/actions/other";

const StackPageScreen = ({navigation, route}) => {
    const dispatch = useDispatch()
    let id = 0
    let type = "decorator"
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('masterId')) {
            id = route.params.masterId
        }

        route.params.type = type
    }
    //console.log('Master route.params', route.params)
    useLayoutEffect(() => {
        route.params.previousRoute = ""
        navigation.setOptions(
            mainHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "MasterDetailPageScreen"
                }),
            [navigation])
    })
    const [data, setData] = useState({
        info: [],
        infoShop: [],
        socialInfo: []
    })
    const init = true
    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })
    //const widthImg = screeWidth - 40

    useEffect(() => {
        AppFetch.getWithToken('getProfile', {
            id,
            type
        }, {}, navigation).then(item => {
            if(item.result) {
                setData(item.data)
            }
        })
    }, [init])
    //console.log('route.params111111', route.params)
    return (
        <AppWrap scroll={{paddingTop: 0, paddingLeft: 0, paddingRight: 0}}>
            <AppTextBold style={styles.title}>
                Контакты мастера
            </AppTextBold>
            {
                data.info
                    ?
                    <AppPhotoBlock data={data.info} />
                    :
                    <></>
            }
            {
                data.infoShop
                    ?
                    <>
                        <AppTextBold style={styles.title}>
                            Контакты магазина
                        </AppTextBold>
                        <AppShopBlock data={data.infoShop} />
                    </>
                    :
                    <></>
            }
            {
                data.hasOwnProperty('socialInfo')
                    ?
                    <AppShopSocial
                        data={data.socialInfo}
                        Button={() => {
                            return <AppButton
                                style={styles.btn}
                                color={THEME.FOOTER_BG}
                                onPress={() => {
                                    route.params.previousRoute = "MasterContactPageScreen"
                                    LinkTo("ChatPageScreen", route.params, navigation)
                                }}
                            >
                                Написать мастеру
                            </AppButton>
                        }}
                    />
                    :
                    <></>
            }
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 230,
        marginLeft: "auto",
        marginRight: "auto"
    },
    title: {
        marginTop: 20,
        marginBottom: 20,
        width: "100%",
        textAlign: "center",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})

const Stack = createStackNavigator()

const InsidePageScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"StackPageScreen"} component={StackPageScreen} />
        </Stack.Navigator>
    )
}

//Tabs
const Tab = createBottomTabNavigator();

const PageTab = () => {
    return (
        <Tab.Navigator tabBar={() => {
            return <BottomMenu />
        }}
        >
            <Tab.Screen name={"InsideTabs"} component={InsidePageScreen} />
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
                drawerPosition="left">
                <Drawer.Screen name="InsidePageScreen" component={PageTab} />
            </Drawer.Navigator>
            <AppIndicator timer={1} />
        </>
    )
}

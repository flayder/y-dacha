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
import AppShopSocial from "../ui/userProfile/AppShopSocial";
import {globalRouteFun, LinkTo} from "../../global";
import {THEME} from "../../theme";
import AppButton from "../ui/AppButton";
import {loadShop} from "../store/actions/shops";
import AppShopInsideBlock from "../ui/userProfile/AppShopInsideBlock";

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
        navigation.setOptions(
            mainHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "ShopDetailPageScreen"
                }),
            [navigation])
    })
    const data = useSelector(state => state.shops.currentShop)
    const init = true
    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    //console.log('data', data)

    useEffect(() => {
        dispatch(loadShop({id, navigation}))
    }, [init])
    //const widthImg = screeWidth - 40
    //console.log('route.params111111', route.params)
    return (
        <AppWrap scroll={{paddingTop: 0, paddingLeft: 0, paddingRight: 0}}>
            <AppTextBold style={styles.title}>
                Контакты продавца
            </AppTextBold>
            {
                data.hasOwnProperty('user') && data.user.hasOwnProperty('info')
                    ?
                    <AppPhotoBlock
                        data={data.user.info}
                        color={THEME.FOOTER_BG}
                    />
                    :
                    <></>
            }
            {
                data.hasOwnProperty('user') && data.user.hasOwnProperty('info')
                    ?
                    <>
                        <AppTextBold style={styles.title}>
                            Контакты магазина
                        </AppTextBold>
                        <AppShopInsideBlock
                            data={data}
                            emblem={data.emblem}
                        />
                    </>
                    :
                    <></>
            }
            {
                data.hasOwnProperty("user") && data.user.hasOwnProperty('socialInfo')
                    ?
                    <AppShopSocial
                        data={data.user.socialInfo}
                        title={"Социальные сети магазина"}
                        color={THEME.FOOTER_BG}
                        Button={() => {
                            return <AppButton
                                style={styles.btn}
                                color={THEME.FOOTER_BG}
                                onPress={() => {
                                    LinkTo("ChatPageScreen", {
                                        previousRoute: "ShopContactPageScreen",
                                        ...route.params
                                    }, navigation)
                                }}
                            >
                                <AppTextBold>
                                    Написать
                                </AppTextBold>
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
        width: 140,
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

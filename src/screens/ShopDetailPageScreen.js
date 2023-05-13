import React, {useLayoutEffect, useEffect} from "react"
import {View, StyleSheet, ImageBackground, TouchableOpacity} from "react-native"
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppWrap} from "../ui/AppWrap";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {useDispatch, useSelector} from "react-redux";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {globalAlert, mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import AppDescription from "../ui/sortDetailPageScreen/AppDescription";
import AppRating from "../ui/sortDetailPageScreen/AppRating";
import AppRatingVote from "../ui/sortDetailPageScreen/AppRatingVote";
import {Svg, Path} from "react-native-svg";
import {AppTextItalic} from "../ui/AppTextItalic";
import {AppText} from "../ui/AppText";
import {THEME} from "../../theme";
import * as Linking from 'expo-linking';
import AppButton from "../ui/AppButton";
import {
    getRandomKey,
    GLOBAL_NOT_ADDING_TARRIF,
    GLOBAL_NOT_ADDING_TARRIF_TITLE,
    globalRouteFun,
    LinkTo
} from "../../global";
import {loadShop} from "../store/actions/shops";
import AppShopBottomPanel from "../ui/shopDetailPageScreen/AppShopBottomPanel";

const pageWrapper = ({navigation, route}) => {
    let id = 0
    let cultureId = 0
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('masterId')) {
            id = route.params.masterId
        }

        if(route.params.hasOwnProperty('cultureId')) {
            cultureId = route.params.cultureId
        }
    }
    //console.log('detailroute', route)
    if(id === 0) {
        return (
            <AppTextBold>
                Неверные данные!
            </AppTextBold>
        )
    }
    const userInfo = useSelector(state => state.others.userInfo)
    useLayoutEffect(() => {
        navigation.setOptions(
            mainHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "ShopsPageScreen"
                }),
            [navigation])
    })

    //console.log('route', route)

    const init = true
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadShop({id, navigation}))
    }, [init])

    const data = useSelector(state => state.shops.currentShop)

    //console.log('data', data)

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            <View style={styles.mainTitle}>
                <Svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M17.4375 5.68039H15.9844L10.6406 0.233922C10.4062 -0.00495808 9.9375 -0.10051 9.75 0.13837C9.51562 0.37725 9.51562 0.711682 9.75 0.950562L14.3906 5.68039H3.60938L8.25 0.950562C8.48438 0.711682 8.48438 0.37725 8.25 0.13837C8.01562 -0.10051 7.59375 -0.00495808 7.35938 0.233922L2.01562 5.68039H0.5625C0.234375 5.68039 0 5.91927 0 6.2537C0 6.58813 0.234375 6.82701 0.5625 6.82701H1.125L2.25 14.8534C2.25 15.4745 2.76563 16 3.375 16H14.625C15.2344 16 15.75 15.4745 15.75 14.8534L16.875 6.82701H17.4375C17.7656 6.82701 18 6.58813 18 6.2537C18 5.91927 17.7656 5.68039 17.4375 5.68039ZM13.6406 13.7068H4.35938L4.21875 12.5601H13.7812L13.6406 13.7068ZM13.9219 11.4135H4.07812L3.9375 10.2669H14.0625L13.9219 11.4135ZM14.2031 9.12026H3.79688L3.65625 7.97363H14.3438L14.2031 9.12026Z" fill="black"/>
                </Svg>
                <View style={{width: 10}}></View>
                <AppTextBold style={styles.title}>
                    {data.name}
                </AppTextBold>
            </View>
            {
                data.hasOwnProperty("user") && data.user.hasOwnProperty("info") && data.user.info.site
                    ?
                    <View style={styles.site}>
                        <TouchableOpacity
                            style={styles.siteLink}
                            activeOpacity={1}
                            onPress={() => {
                                Linking.openURL(data.user.info.site).then(response => {})
                            }}
                        >
                            <View style={styles.siteHttp}>
                                <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M13.1107 13.1122C13.3742 11.7952 13.5205 10.4195 13.5205 9.01467C13.5205 7.60979 13.3742 6.23418 13.1107 4.91711C11.7937 4.6537 10.4181 4.50735 9.01318 4.50735C7.6083 4.50735 6.23269 4.6537 4.91562 4.91711C4.6522 6.23418 4.50586 7.60979 4.50586 9.01467C4.50586 10.4195 4.6522 11.7952 4.91562 13.1122C6.23269 13.3756 7.6083 13.522 9.01318 13.522C10.4181 13.522 11.7937 13.3756 13.1107 13.1122Z" fill="#53588A"/>
                                    <Path d="M3.36585 9.01466C3.36585 7.69758 3.51219 6.43905 3.71707 5.20978C2.57561 5.50246 1.46341 5.88295 0.409756 6.32197C0.146341 7.17075 0 8.07807 0 9.01466C0 9.95124 0.146341 10.8586 0.409756 11.7073C1.46341 12.1756 2.57561 12.5561 3.71707 12.8488C3.51219 11.6195 3.36585 10.3317 3.36585 9.04392V9.01466Z" fill="#53588A"/>
                                    <Path d="M9.01582 3.36585C10.3329 3.36585 11.5914 3.51219 12.8207 3.71707C12.528 2.57561 12.1475 1.46341 11.7085 0.409756C10.8597 0.146341 9.9524 0 9.01582 0C8.07923 0 7.17191 0.146341 6.32313 0.409756C5.85484 1.46341 5.47435 2.57561 5.21094 3.71707C6.44021 3.51219 7.72801 3.36585 9.01582 3.36585Z" fill="#53588A"/>
                                    <Path d="M9.01582 14.6341C7.69874 14.6341 6.44021 14.4878 5.21094 14.2829C5.50362 15.4244 5.88411 16.5366 6.32313 17.5902C7.17191 17.8536 8.07923 18 9.01582 18C9.9524 18 10.8597 17.8536 11.7085 17.5902C12.1768 16.5366 12.5573 15.4244 12.8207 14.2829C11.5914 14.4878 10.3036 14.6341 9.01582 14.6341Z" fill="#53588A"/>
                                    <Path d="M13.1416 1.02435C13.4928 1.99021 13.8148 2.95606 14.0489 3.98045C15.0733 4.2146 16.0392 4.50728 17.005 4.88777C16.1562 3.24874 14.8099 1.9024 13.1709 1.05362L13.1416 1.02435Z" fill="#53588A"/>
                                    <Path d="M4.85951 16.9756C4.50829 16.0097 4.18634 15.0439 3.95219 14.0195C2.9278 13.7854 1.96195 13.4927 0.996094 13.1122C1.84487 14.7512 3.19122 16.0975 4.83024 16.9463L4.85951 16.9756Z" fill="#53588A"/>
                                    <Path d="M17.5915 11.678C17.8549 10.8292 18.0013 9.92191 18.0013 8.98533C18.0013 8.04874 17.8549 7.14143 17.5915 6.29265C16.5378 5.82435 15.4256 5.44387 14.2842 5.18045C14.4891 6.40972 14.6354 7.69752 14.6354 8.98533C14.6354 10.3024 14.4891 11.5609 14.2842 12.7902C15.4256 12.4975 16.5378 12.117 17.5915 11.6487V11.678Z" fill="#53588A"/>
                                    <Path d="M16.9767 13.1415C16.0108 13.4927 15.045 13.8147 14.0206 14.0488C13.7865 15.0732 13.4938 16.039 13.1133 17.0049C14.7523 16.1561 16.0986 14.8098 16.9474 13.1707L16.9767 13.1415Z" fill="#53588A"/>
                                    <Path d="M1.02539 4.85853C1.99124 4.50731 2.9571 4.18536 3.98149 3.95121C4.21563 2.92682 4.50832 1.96097 4.8888 0.995117C3.24978 1.8439 1.90344 3.19024 1.05466 4.82926L1.02539 4.85853Z" fill="#53588A"/>
                                </Svg>
                                <AppText style={{...styles.siteLinkText, fontSize: 12, paddingRight: 10, marginLeft: 10}}>
                                    {data.user.info.site}
                                </AppText>
                            </View>
                            <AppTextItalic style={styles.siteLinkText}>
                                Перейти на сайт
                            </AppTextItalic>
                        </TouchableOpacity>
                    </View>
                    :
                    <></>
            }

            <View style={styles.img}>
                <ImageBackground
                    style={styles.bg}
                    source={{uri: data.emblem}}
                    resizeMode={"cover"}
                />
            </View>
            <AppShopBottomPanel
                data={data}
                route={route}
            />
            {
                userInfo.hasOwnProperty('is_addition') && userInfo.is_addition
                    ?
                    <AppButton
                        style={styles.btnMap}
                        color={THEME.FOOTER_BG}
                        onPress={() => {
                            LinkTo("GoogleMapShopPageScreen", {
                                masterId: data.id,
                                previousRoute: "ShopDetailPageScreen",
                                cultureId
                            }, navigation)
                        }}
                    >
                        <View
                            style={styles.btnWrap}
                        >
                            <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M1.905 0.490924V0.91919C1.39496 0.849125 0.87871 0.80004 0.345 0.784916V0.350208C0.874196 0.366083 1.38921 0.417312 1.905 0.490924Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M5.0668 1.89939C4.61997 1.68671 4.16495 1.49471 3.68951 1.33913L3.70501 0.873989C4.22999 1.03406 4.74289 1.25318 5.24974 1.48777L5.0668 1.89939Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M9.56265 6.14625C9.36329 5.78494 9.13655 5.4438 8.90664 5.12428L9.32082 4.82161C9.59937 5.19529 9.8496 5.58628 10.0819 5.9955L9.56265 6.14625Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M9.79384 10.47H10.7066H11.1388L11.043 10.0485C10.8746 9.30753 10.6497 8.59716 10.3931 7.918L10.9244 7.78089C11.2103 8.53273 11.4283 9.33656 11.5279 10.1661L11.5643 10.47H11.8704H12.6668L11.2303 11.9065L9.79384 10.47Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M6.85328 2.40136C7.2887 2.69326 7.69432 3.01946 8.08167 3.38081L7.69498 3.71916C7.36636 3.40147 7.02495 3.09908 6.64699 2.82979L6.85328 2.40136Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M10.1764 2.86153L10.9053 2.68723V3.63676C10.6713 3.3671 10.4527 3.13695 10.2674 2.95163C10.2361 2.92033 10.2057 2.89028 10.1764 2.86153Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M8.20994 7.67009C8.37048 8.06579 8.48188 8.40772 8.55402 8.65498H7.095V5.62665C7.6026 6.33255 7.96301 7.06146 8.20994 7.67009Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M5.31906 3.89077V17.5581L1.25762 16.5428C0.969473 16.4519 0.745421 16.3445 0.596859 16.2136C0.459441 16.0926 0.384062 15.951 0.384062 15.75V3.21983C0.384062 3.01262 0.463879 2.86907 0.585877 2.7703C0.708622 2.67094 0.893766 2.60263 1.12446 2.5956L4.65083 3.46771C4.88339 3.5874 5.09533 3.73196 5.31906 3.89077Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M7.095 17.5581V10.376L10.905 14.186V16.6056L7.095 17.5581Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M16.7913 3.7097L16.9808 3.75707L17.0107 3.72717C17.4469 3.88343 17.6938 4.13714 17.6938 4.46121V16.8362C17.6938 17.2175 17.5883 17.3848 17.4882 17.4683C17.3811 17.5575 17.2096 17.6107 16.9547 17.6158L12.7588 16.5668V13.061L16.5758 9.24395L17.1648 8.655H16.3319H13.2144C13.1712 7.90067 12.9891 7.18274 12.72 6.52603V2.69187L16.7913 3.7097Z" stroke="white" stroke-width="0.69"/>
                            </Svg>
                            <AppTextBold style={{fontSize: 14, marginTop: 0, marginBottom: 0, color: "#fff", marginLeft: 10}}>
                                Открыть карту
                            </AppTextBold>
                        </View>
                    </AppButton>
                    :
                    <AppButton
                        style={styles.btnMap}
                        color={THEME.GREY}
                        onPress={() => {
                            globalAlert({
                                title: GLOBAL_NOT_ADDING_TARRIF_TITLE,
                                text: GLOBAL_NOT_ADDING_TARRIF
                            })
                        }}
                    >
                        <View
                            style={styles.btnWrap}
                        >
                            <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M1.905 0.490924V0.91919C1.39496 0.849125 0.87871 0.80004 0.345 0.784916V0.350208C0.874196 0.366083 1.38921 0.417312 1.905 0.490924Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M5.0668 1.89939C4.61997 1.68671 4.16495 1.49471 3.68951 1.33913L3.70501 0.873989C4.22999 1.03406 4.74289 1.25318 5.24974 1.48777L5.0668 1.89939Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M9.56265 6.14625C9.36329 5.78494 9.13655 5.4438 8.90664 5.12428L9.32082 4.82161C9.59937 5.19529 9.8496 5.58628 10.0819 5.9955L9.56265 6.14625Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M9.79384 10.47H10.7066H11.1388L11.043 10.0485C10.8746 9.30753 10.6497 8.59716 10.3931 7.918L10.9244 7.78089C11.2103 8.53273 11.4283 9.33656 11.5279 10.1661L11.5643 10.47H11.8704H12.6668L11.2303 11.9065L9.79384 10.47Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M6.85328 2.40136C7.2887 2.69326 7.69432 3.01946 8.08167 3.38081L7.69498 3.71916C7.36636 3.40147 7.02495 3.09908 6.64699 2.82979L6.85328 2.40136Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M10.1764 2.86153L10.9053 2.68723V3.63676C10.6713 3.3671 10.4527 3.13695 10.2674 2.95163C10.2361 2.92033 10.2057 2.89028 10.1764 2.86153Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M8.20994 7.67009C8.37048 8.06579 8.48188 8.40772 8.55402 8.65498H7.095V5.62665C7.6026 6.33255 7.96301 7.06146 8.20994 7.67009Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M5.31906 3.89077V17.5581L1.25762 16.5428C0.969473 16.4519 0.745421 16.3445 0.596859 16.2136C0.459441 16.0926 0.384062 15.951 0.384062 15.75V3.21983C0.384062 3.01262 0.463879 2.86907 0.585877 2.7703C0.708622 2.67094 0.893766 2.60263 1.12446 2.5956L4.65083 3.46771C4.88339 3.5874 5.09533 3.73196 5.31906 3.89077Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M7.095 17.5581V10.376L10.905 14.186V16.6056L7.095 17.5581Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M16.7913 3.7097L16.9808 3.75707L17.0107 3.72717C17.4469 3.88343 17.6938 4.13714 17.6938 4.46121V16.8362C17.6938 17.2175 17.5883 17.3848 17.4882 17.4683C17.3811 17.5575 17.2096 17.6107 16.9547 17.6158L12.7588 16.5668V13.061L16.5758 9.24395L17.1648 8.655H16.3319H13.2144C13.1712 7.90067 12.9891 7.18274 12.72 6.52603V2.69187L16.7913 3.7097Z" stroke="white" stroke-width="0.69"/>
                            </Svg>
                            <AppTextBold style={{fontSize: 14, marginTop: 0, marginBottom: 0, color: "#fff", marginLeft: 10}}>
                                Открыть карту
                            </AppTextBold>
                        </View>
                    </AppButton>
            }
            <AppDescription style={{marginTop: -10}} description={data.description} />
            {
                data.hasOwnProperty('votes')
                    ?
                    <AppRating style={styles.voteWrap}>
                        <AppTextBold style={{width: "100%", marginBottom: 10, textAlign: "center"}}>
                            Рейтинг
                        </AppTextBold>
                        {
                            data.votes.map(item => {
                                return <AppRatingVote
                                    style={styles.vote}
                                    key={getRandomKey()}
                                    active={false}
                                    text={item.name}
                                    starWidth={20}
                                    starHeight={20}
                                    initiate={item.rating}
                                />
                            })
                        }
                    </AppRating>
                    :
                    <></>
            }
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    btnWrap: {
        flexDirection: "row",
        alignItems: "center"
    },
    btnMap: {
        width: 180,
        height: 40,
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 9,
        //paddingBottom: 9,
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: THEME.FOOTER_BG
    },
    voteBlocking: {
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 9
    },
    img: {
        position: "relative"
    },
    siteHttp: {
        flexDirection: "row",
        alignItems: "center"
    },
    siteLink: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    siteLinkText: {
        color: THEME.FOOTER_BG
    },
    content: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    text: {
        marginTop: 0,
        marginBottom: 0
    },
    mainTitle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20
    },
    bg: {
        width: "100%",
        height: 160
    },
    voteWrap: {
        //flexDirection: "row",
        //flexWrap: "wrap"
    },
    vote: {
        width: 250,
        marginLeft: "auto",
        marginRight: "auto",
        flexWrap: "wrap",
        paddingLeft: 30,
        paddingRight: 30
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

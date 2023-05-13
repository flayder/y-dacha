import React from "react"
import {TouchableOpacity, View, Alert, Platform} from "react-native"
import AppHeaderMenuButtonLeftWrapper from "./ui/header/AppHeaderMenuButtonLeftWrapper";
import AppHeaderMenuButton from "./ui/header/AppHeaderMenuButton";
import AppHeaderMenuButtonCenterWrapper from "./ui/header/AppHeaderMenuButtonCenterWrapper";
import AppSearchInput from "./ui/header/AppSearchInput";
import AppHeaderMenuButtonRightWrapper from "./ui/header/AppHeaderMenuButtonRightWrapper";
import {AppQrHeaderButton} from "./ui/header/AppQrHeaderButton";
import {configurateState, GetRootNavigation} from "../global";
import {Svg, Path} from "react-native-svg";
import AppChatCenter from "./ui/header/AppChatCenter";
import AppChatRight from "./ui/header/AppChatRight";
import { CommonActions } from '@react-navigation/native';
import {AppTextBold} from "./ui/AppTextBold";
import AppMessageRight from "./ui/header/AppMessageRight";
import AppMessageTitle from "./ui/header/AppMessageTitle";

const GLOBAL_HEADER_HEIGHT = Platform.OS == "android" ? 100 : 115

export const globalAlert = (
    {
        title = "",
        text,
        okButtonText = "Ok",
        cancelButtonText,
        cancelable = true,
        onOkFun,
        onCancelFun
    }) => {

    let cancel = {}
    const param = []

    if(cancelButtonText) {
        cancel = {
            text: cancelButtonText,
            style: "cancel",
            onPress: () => {
                if(onCancelFun) onCancelFun()
            }
        }
        param.push(cancel)
    }

    const okParam = {
        text: okButtonText, onPress: () => {
        if(onOkFun) onOkFun()
    } }

    param.push(okParam)

    Alert.alert(
        title,
        text,
        param,
        { cancelable: cancelable }
    )
}

const getDeepestParams = (state) => {
    let res = {}
    if(state && state.hasOwnProperty('state')) {
        if(state.state.hasOwnProperty('routes') && state.state.routes.length > 0) {
            let freshState = state.state.routes[0]
            if(freshState && freshState.hasOwnProperty('state')) {
                if(freshState.state.hasOwnProperty('routes') && freshState.state.routes.length > 0) {
                    freshState = freshState.state.routes[0]
                    if(freshState && freshState.hasOwnProperty('state')) {
                        if(freshState.state.hasOwnProperty('routes') && freshState.state.routes.length > 0) {
                            if(freshState.state.routes[0] && freshState.state.routes[0].hasOwnProperty('params') && freshState.state.routes[0].params !== undefined)
                                res = freshState.state.routes[0].params
                        }
                    }
                }
            }
        }
    }
    //console.log('route', res)
    return res
}

export const navigationBackHandler = (
    {
        routeName = "",
        navigation,
        route = "",
        jumpTo = false,
        position = 1
    }
    ) => {
    //console.log('route.params', route.params)
    // if(!routeName && !jumpTo)
    //     navigation.back()
    // else
    if(jumpTo)
        navigation.jumpTo(jumpTo)
    else {
        let isOk = false
        const nav = GetRootNavigation(navigation)
        nav.dispatch(state => {
            //console.log('nav', state.history)
            if(
                state &&
                state.hasOwnProperty('history') &&
                state.history.length > 0 &&
                state.history.splice(state.history.length - position, 1).length > 0
            ) {
                //console.log('previousState', params)
                const routePrevious = state.history[state.history.length - position]
                const previousState = state.routes[state.routes.length - position]
                let params = getDeepestParams(previousState)
                if(typeof routePrevious === "object" && routePrevious.hasOwnProperty('params')) {
                    params = routePrevious.params
                }
                //console.log('routePrevious', routePrevious)
                if(typeof routePrevious == "object") {
                    if(routePrevious.hasOwnProperty('key')) {
                        const routeSplit = routePrevious.key.split("-")
                        //console.log('routeSplit[0]', routeSplit[0])
                        if(routeSplit[0] != "") {
                            isOk = true
                            if(route.params === undefined) route.params = {}

                            const routes = configurateState(routeSplit[0], {
                                ...params,
                                ...route.params
                            }, state)
                            //console.log('routes', routes)
                            return CommonActions.reset({
                                ...state,
                                routes,
                                index: routes.length - 1,
                            });
                        }
                        //console.log('routeSplit', routeSplit)
                    }
                }
            }
            if(!isOk) {
                if(
                    route.params !== undefined &&
                    route.params.hasOwnProperty('previousRoute') &&
                    route.params.previousRoute != ""
                ) {
                    const newRoute = route.params
                    const routeName = newRoute.previousRoute
                    newRoute.previousRoute = ""

                    const routes = configurateState(routeName, routeName, state)
                    //console.log('routes1', routes)
                    return CommonActions.reset({
                        ...state,
                        routes,
                        index: routes.length - 1,
                    });
                } else {
                    const routes = configurateState(routeName, route.params, state)
                    //console.log('routes2', routes)
                    return CommonActions.reset({
                        ...state,
                        routes,
                        index: routes.length - 1,
                    });
                }
            }
        })

    }
}

export const NavigationBack = (
    {
        routeName = "",
        navigation,
        route = "",
        jumpTo = false,
        position = 1
    }) => {
    //console.log('some', routeName, route)
    return (
        <TouchableOpacity style={{padding: 20, marginTop: -4}} onPress={() => {
            navigationBackHandler({
                routeName,
                navigation,
                route,
                jumpTo,
                position
            })
        }}>
            <Svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M14.4 21.6L12 24L-5.24538e-07 12L12 5.24537e-07L14.4 2.39999L4.79997 12L14.4 21.6Z" fill="black"/>
            </Svg>
        </TouchableOpacity>
    )
}

export const commonHeader = ({navigation, routeName, jumpTo, route, title = "", props = {}}) => {
    return {
        headerLeft:() => {
            return <NavigationBack
                routeName={routeName}
                jumpTo={jumpTo}
                route={route}
                navigation={navigation}
            />
        },
        headerTitleContainerStyle: {
            width: "100%",
            //backgroundColor: "red",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center"
        },
        headerTintColor: '#000',
        headerTitle: title,
        headerTitleAlign: "center",
        headerStyle: {
            elevation: 0
        }
    }
}

export const mainHeader = ({
        route,
        navigation,
        jumpTo,
        routeName,
        qrcode = "",
        headerLeftBack,
        backgroundColor = "#fff",
        height = GLOBAL_HEADER_HEIGHT,
        paddingTop = 1,
        style
    }) => {

    return {
        //headerTintColor: '#000',
        headerLeft() {
            if(headerLeftBack) return <View style={{paddingTop}}>
                <NavigationBack
                    routeName={routeName}
                    navigation={navigation}
                    route={route}
                    jumpTo={jumpTo}
                />
            </View>
            else {
                return (
                    <View style={{paddingTop}}>
                        <AppHeaderMenuButtonLeftWrapper>
                            <AppHeaderMenuButton onPress={() => {
                                navigation.toggleDrawer()
                            }} />
                        </AppHeaderMenuButtonLeftWrapper>
                    </View>
                )
            }
        },
        headerTitleContainerStyle: {
            width: "100%",
            backgroundColor: "transparent",
        },
        headerTitleAlign: "left",
        headerTitle(props) {
            return (
                <View style={{paddingTop}}>
                    <AppHeaderMenuButtonCenterWrapper
                        navigation={navigation}
                        route={route}
                    >
                        <AppSearchInput navigation={navigation} />
                    </AppHeaderMenuButtonCenterWrapper>
                </View>
            )
        },
        headerRight() {
            return (
                <View style={{paddingTop}}>
                    <AppHeaderMenuButtonRightWrapper>
                        <AppQrHeaderButton qrcode={qrcode} route={route} navigation={navigation} />
                    </AppHeaderMenuButtonRightWrapper>
                </View>
            )
        },
        headerStyle: {
            height,
            backgroundColor,
            elevation: 0,
            ...style,
        }
    }
}

export const chatHeader = (
    {
        route,
        navigation,
        jumpTo,
        routeName,
        qrcode = "",
        headerLeftBack
    }) => {
    return {
        headerTintColor: '#000',
        headerLeft: () => {
            if(headerLeftBack) return <NavigationBack
                routeName={routeName}
                navigation={navigation}
                route={route}
                jumpTo={jumpTo}
            />
            else {
                return (
                    <AppHeaderMenuButtonLeftWrapper>
                        <AppHeaderMenuButton onPress={() => {
                            navigation.toggleDrawer()
                        }} />
                    </AppHeaderMenuButtonLeftWrapper>
                )
            }
        },
        headerTitleContainerStyle: {
            width: "100%"
        },
        headerTitleAlign: "left",
        headerTitle: (props) => {
            return (
                <AppHeaderMenuButtonCenterWrapper
                    navigation={navigation}
                    route={route}
                >
                    <AppChatCenter navigation={navigation} />
                </AppHeaderMenuButtonCenterWrapper>
            )
        },
        headerRight: () => {
            return (
                <AppChatRight />
            )
        },
        headerStyle: {
            height: GLOBAL_HEADER_HEIGHT,
            elevation: 0
        }
    }
}

export const messageHeader = (
    {
        route,
        navigation,
        jumpTo,
        routeName,
        qrcode = "",
        headerLeftBack,
        titleName = ""
    }) => {
    return {
        headerTintColor: '#000',
        headerLeft: () => {
            if(headerLeftBack) return <NavigationBack
                routeName={routeName}
                navigation={navigation}
                route={route}
                jumpTo={jumpTo}
            />
            else {
                return (
                    <AppHeaderMenuButtonLeftWrapper>
                        <AppHeaderMenuButton onPress={() => {
                            navigation.toggleDrawer()
                        }} />
                    </AppHeaderMenuButtonLeftWrapper>
                )
            }
        },
        headerTitleContainerStyle: {
            width: "100%"
        },
        headerTitleAlign: "left",
        headerTitle: (props) => {
            return (
                <AppHeaderMenuButtonCenterWrapper
                    navigation={navigation}
                    route={route}
                >
                    <AppMessageTitle titleName={titleName} />
                </AppHeaderMenuButtonCenterWrapper>
            )
        },
        headerRight: () => {
            return (
                <AppMessageRight navigation={navigation} />
            )
        },
        headerStyle: {
            height: GLOBAL_HEADER_HEIGHT,
            elevation: 0
        }
    }
}

export const titleHeader = (
    {
        route,
        navigation,
        jumpTo,
        routeName,
        qrcode = "",
        headerLeftBack,
        titleName = "",
        mainIcon = false,
        rightIcon
    }) => {
    return {
        headerTintColor: '#000',
        headerLeft: () => {
            if(headerLeftBack) return <NavigationBack
                routeName={routeName}
                navigation={navigation}
                route={route}
                jumpTo={jumpTo}
            />
            else {
                return (
                    <AppHeaderMenuButtonLeftWrapper>
                        <AppHeaderMenuButton onPress={() => {
                            navigation.toggleDrawer()
                        }} />
                    </AppHeaderMenuButtonLeftWrapper>
                )
            }
        },
        headerTitleContainerStyle: {
            width: "100%"
        },
        headerTitleAlign: "left",
        headerTitle: (props) => {
            return (
                <AppHeaderMenuButtonCenterWrapper
                    navigation={navigation}
                    route={route}
                >
                    <AppTextBold style={{textAlign: "center", paddingTop: 5}}>
                        {titleName}
                    </AppTextBold>
                </AppHeaderMenuButtonCenterWrapper>
            )
        },
        headerRight: () => {
            if(mainIcon) {
                return <AppHeaderMenuButtonRightWrapper>
                    <AppQrHeaderButton
                        qrcode={qrcode}
                        route={route}
                        navigation={navigation}
                        showSearchPanel={false}
                    />
                </AppHeaderMenuButtonRightWrapper>
            } else {
                if(rightIcon) {
                    return (
                        rightIcon()
                    )
                } else {
                    return (
                        <></>
                    )
                }
            }
        },
        headerStyle: {
            height: GLOBAL_HEADER_HEIGHT,
            elevation: 0
        }
    }
}
import React, {useLayoutEffect, useEffect, useState} from "react"
import {View, StyleSheet, TouchableOpacity, Dimensions} from "react-native"
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {useDispatch, useSelector} from "react-redux";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {messageHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import {Svg, Path} from "react-native-svg";
import {THEME} from "../../theme";
import {getRandomKey, globalRouteFun, SCROLL_INITIATION_TO_PAGINATE} from "../../global";
import AppNotificationItem from "../ui/notificationsPageScreen/AppNotificationItem";
import {loadNotifications, setNotificationPagination} from "../store/actions/notifications";
import {AppWrap} from "../ui/AppWrap";
import {AppFetch} from "../AppFetch";
import {setCommentTab} from "../store/actions/comments";

const pageWrapper = ({navigation, route}) => {
    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })
    useLayoutEffect(() => {
        navigation.setOptions(
            messageHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "SortsPageScreen",
                    titleName: "Уведомления"
                }),
            [navigation])
    })

    const init = true
    const [loadMore, setLoadMore] = useState(true)
    const dispatch = useDispatch()
    const itemsState = useSelector(state => state.notifications)
    const pagination = itemsState.pagination
    const data = itemsState.itemsList
    const counts = itemsState.counts

    //console.log('data', data.length)
    //console.log('data', data)
    //console.log('itemsState', itemsState)

    useEffect(() => {
        if (pagination > 1) dispatch(setNotificationPagination(1))
        dispatch(setCommentTab({tabName: "Уведомления"}))
    }, [init])

    //console.log('preview', preview)

    //load more items
    useEffect(() => {
        if (!loadMore) {
            dispatch(setNotificationPagination(pagination + 1)).then(res => {
                setTimeout(() => {
                    setLoadMore(true)
                    //console.log('done')
                }, 500)
            })
        }
    }, [loadMore])

    //loadBydefault
    useEffect(() => {
        dispatch(loadNotifications({navigation})).then(res => {
            //setData(res)
            //console.log('here')
        })
        //setData(true)
    }, [pagination])

    // useEffect(() => {
    //     let ok = false
    //
    //     // if(filter.length) ok = true
    //     // else if(filter.length > 0 && filter[0].hasOwnProperty('data')) {
    //     //     if(filter[0].data.length === 0) ok = true
    //     // }
    //
    //     if(filterInitiation.current)
    //         dispatch(loadNotifications({loadMore: false, navigation})).then(res => {
    //             //setData(res)
    //             //console.log('ok')
    //         })
    //     else
    //         filterInitiation.current = true
    // }, [filter.length])

    const scrollerHandler = ({nativeEvent}) => {
        const scroll = nativeEvent.contentSize.height - (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y)
        if (scroll < SCROLL_INITIATION_TO_PAGINATE && 0 < scroll && loadMore && counts > 0) {
            setLoadMore(false)
        }
    }

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}} onScroll={scrollerHandler}
            style={styles.scroll}
        >
            <View style={styles.commentBlock}>
                {
                    data.map(item => {
                        return <AppNotificationItem
                            key={getRandomKey()}
                            screenWidth={screeWidth}
                            item={item}
                            Icon={() => {
                                return <TouchableOpacity
                                    activeOpacity={1}
                                >
                                    <Svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <Path
                                            d="M9.01797 17.8886C10.2529 17.8886 11.2718 16.8698 11.2718 15.6348H6.76416C6.76416 16.8698 7.783 17.8886 9.01797 17.8886Z"
                                            fill="#F39314"/>
                                        <Path
                                            d="M17.4456 12.3808C16.8281 11.7633 15.377 10.3431 15.1918 10.1269C15.0065 9.91081 14.9756 9.57118 14.9756 9.57118L14.6051 5.61921C14.6051 5.61921 14.0494 0 8.98606 0C3.92272 0 3.36699 5.61921 3.36699 5.61921L3.02737 9.57118C3.02737 9.57118 2.9965 9.94168 2.81125 10.1269C2.62601 10.3431 1.17493 11.7633 0.557448 12.3808C-0.0600329 12.9983 0.00171522 14.0789 0.00171522 14.0789C0.00171522 14.0789 0.00171524 14.6346 0.557448 14.6346H17.4456C18.0013 14.6346 18.0013 14.0789 18.0013 14.0789C18.0013 14.0789 18.063 12.9983 17.4456 12.3808Z"
                                            fill="#F39314"/>
                                    </Svg>
                                </TouchableOpacity>
                            }}
                            onDelete={async id => {
                                const response = await AppFetch.getWithToken("deleteNotification", {id}, {}, navigation)
                                console.log('delete', response)
                                if(response.result) dispatch(loadNotifications({navigation}))
                            }}
                        />
                    })
                }
            </View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
        selectedText: {
            color: THEME.BLUE
        },
        selectedTextWrap: {
            paddingLeft: 10
        },
        selected: {
            flexDirection: "row",
                alignItems: "center"
        },
        selectedBlock: {
            flexDirection: "row",
                justifyContent: "space-between"
        },
        commentBlock: {
            paddingLeft: 20,
            paddingRight: 20
        },
        blockedUser: {
            color: "red",
                fontSize: 20
        },
        // scroll: {
        //     backgroundColor: "#fff",
        //         paddingLeft: 20,
        //         paddingRight: 20,
        //         position: "relative"
        // },
        inputMessage: {
            backgroundColor: THEME.SLIDER_BG,
                padding: 15,
                height: 60,
                borderRadius: 30
        },
        messagePanel: {
            padding: 20,
                backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
        },
        avaWrap: {
            paddingTop: 20
        },
        messageBlockLeft: {
            paddingLeft: 20
        },
        date: {
            textAlign: "center",
                textDecorationLine: "underline",
                textDecorationStyle: "solid",
                textDecorationColor: "#000"
        },
        messageLeft: {
            flexDirection: "row"
        },

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
            <AppIndicator timer={1} />
        </>
    )
}


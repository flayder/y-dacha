import React, {useLayoutEffect, useEffect, useState, useRef} from "react"
import {View, StyleSheet, Dimensions} from "react-native"
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppWrap} from "../ui/AppWrap";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {useDispatch, useSelector} from "react-redux";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import AppCommentTab from "../ui/commentsPage/AppCommentTab";
import {getComments} from "../store/actions/comments";
import {globalRouteFun, SCROLL_INITIATION_TO_PAGINATE} from "../../global";

const StackPageScreen = ({navigation, route}) => {
    let id = 0
    let type = ""
    let prevRoute = ""
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('masterId')) {
            id = route.params.masterId
        } else if(route.params.hasOwnProperty('chemicalId')) {
            id = route.params.chemicalId
        } else if(route.params.hasOwnProperty('sortId')) {
            id = route.params.sortId
        }

        if(route.params.hasOwnProperty('previousRoute') && route.params.previousRoute) prevRoute = route.params.previousRoute

        if(route.params.hasOwnProperty('type')) {
            type = route.params.type
        }
    }

    //console.log(route)
    if(id === 0 || !type) {
       return (
           <AppTextBold>
               Неверные данные!
           </AppTextBold>
       )
    }
    useLayoutEffect(() => {
        navigation.setOptions(
            mainHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: (prevRoute) ? prevRoute : "MainPageScreen"
                }),
            [navigation])
    })
    const [loadMore, setLoadMore] = useState(false)
    const dataCurrent = useSelector(state => state.comments)
    const pagination = useRef(1)
    const votes = dataCurrent.votes
    const data = dataCurrent.comments
    const counts = dataCurrent.counts
    const commentsCount = dataCurrent.commentsCount
    const init = true
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getComments({id, type, navigation})).then(res => {
            setLoadMore(true)
        })
    }, [init])

    useEffect(() => {
        if(pagination.current > 1 && counts > 0)
            dispatch(getComments({id, type, pagination: pagination.current, loadMore: true, navigation})).then(res => {
                setLoadMore(true)
            })
        //setData(true)
    }, [pagination.current])

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    const scrollerHandler = ({nativeEvent}) => {
        const scroll = nativeEvent.contentSize.height - (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y)
        //console.log(scroll < 50 && 0 < scroll && loadMore && counts > 0, scroll, loadMore, counts)
        if(scroll < SCROLL_INITIATION_TO_PAGINATE && 0 < scroll && loadMore && counts > 0) {
            pagination.current = pagination.current += 1
            setLoadMore(false)
        }
    }

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}} onScroll={scrollerHandler}>
            <View style={styles.mainTitle}>
                <AppTextBold style={styles.title}>
                    Комментарии
                </AppTextBold>
            </View>
            <AppCommentTab
                comments={data}
                votes={votes}
                screenWidth={screeWidth}
                counts={commentsCount}
                id={id}
                type={type}
                navigation={navigation}
            />
            {
                commentsCount == 0
                    ?
                    <View style={styles.empty}>
                        <AppTextBold style={styles.emptyText}>
                            Здесь еще не оставляли комментарии.
                        </AppTextBold>
                    </View>
                    :
                    <></>
            }

        </AppWrap>
    )
}

const styles = StyleSheet.create({
    empty: {
        marginTop: 100,
        paddingLeft: 20,
        paddingRight: 20,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    emptyText: {
        textAlign: "center",
        color: "green",
        fontSize: 16
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
    }
})

const Stack = createStackNavigator()

const InsidePageScreen = ({navigation, route}) => {
    //console.log('StackPageScreen', route.params)
    return (
        <Stack.Navigator>
            <Stack.Screen name={"StackPageScreen"} component={StackPageScreen} />
        </Stack.Navigator>
    )
}

//Tabs
const Tab = createBottomTabNavigator();

const InsideTabs = ({navigation, route}) => {
    //console.log('InsideTabs', route.params)
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
                drawerContent={AppDrawerContentHandler} drawerPosition="left"
            >
                <Drawer.Screen name="InsidePageScreen" component={InsideTabs} />
            </Drawer.Navigator>
            <AppIndicator timer={2} />
        </>
    )
}

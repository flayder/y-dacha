import React, {useLayoutEffect, useEffect, useState, useMemo} from "react"
import {StyleSheet, Dimensions, Platform} from "react-native"
import {AppWrap} from "../ui/AppWrap";
import {useSelector, useDispatch} from "react-redux";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {createDrawerNavigator} from "@react-navigation/drawer"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import AppNew from "../ui/AppNew";
import {loadNews, setNewsPagination} from "../store/actions/news";
import * as Random from 'expo-random';
import {AppTextBold} from "../ui/AppTextBold";
import {setCurrentRoute} from "../store/actions/other";
import {globalRouteFun, SCROLL_INITIATION_TO_PAGINATE} from "../../global";

const pageWrapper = ({navigation, route}) => {
    const [_, setData] = useState([])
    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    const [loadMore, setLoadMore] = useState(true)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    useLayoutEffect(() => {
        navigation.setOptions(
            mainHeader(
                {
                    route,
                    navigation
                }),
            [navigation])
    })

    const dispatch = useDispatch()
    const newsState = useSelector(state => state.news)
    const pagination = newsState.pagination
    const data = newsState.newsList
    const counts = newsState.counts

    useEffect(() => {
        if(!loadMore) {
            dispatch(setNewsPagination(pagination + 1)).then(res => {
                setTimeout(() => {
                    setLoadMore(true)
                    console.log('done')
                }, 500)
            })
        }
    }, [loadMore])

    const scrollerHandler = ({nativeEvent}) => {
        const scroll = nativeEvent.contentSize.height - (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y)
        if(scroll < SCROLL_INITIATION_TO_PAGINATE && 0 < scroll && loadMore && counts > 0) {
            setLoadMore(false)
        }
    }

    useEffect(() => {
        dispatch(loadNews()).then(res => {
            setData(res)
        })
        setData(true)
    }, [pagination])

    return (
        <AppWrap onScroll={scrollerHandler}>
            <AppTextBold style={styles.title}>
                Новости и акционные предложения
            </AppTextBold>
            {
                data.map(item => {
                    return <AppNew key={Random.getRandomBytes(item.id)} imgWidth={screeWidth - 40} item={item} navigation={navigation} />
                })
            }
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center"
    }
})

const Stack = createStackNavigator()

const pageScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"StackMainPageScreen"} component={pageWrapper} />
        </Stack.Navigator>
    )
}

//Tabs
const Tab = createBottomTabNavigator();

const pageTab = () => {
    return (
        <Tab.Navigator tabBar={() => {
            return <BottomMenu />
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
            <Drawer.Navigator
                screenOptions={() => ({
                    headerShown: false
                })}
                drawerContent={AppDrawerContentHandler} drawerPosition="left">
                <Drawer.Screen name="InsideNewsPageScreen" component={pageTab} />
            </Drawer.Navigator>
            <AppIndicator timer={2} />
        </>
    )
}

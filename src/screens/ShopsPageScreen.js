import React, {useLayoutEffect, useState, useEffect, useRef} from "react"
import {View, StyleSheet, Dimensions} from "react-native"
import {AppWrap} from "../ui/AppWrap";
import {createDrawerNavigator} from "@react-navigation/drawer"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import {useDispatch, useSelector} from "react-redux";
import {getRandomKey, globalRouteFun, SCROLL_INITIATION_TO_PAGINATE} from "../../global";
import {AppTextBold} from "../ui/AppTextBold";
import AppShopsSorting from "../ui/shopsPageScreen/AppShopsSorting";
import AppShopItem from "../ui/shopsPageScreen/AppShopItem";
import {loadShops, setShopsPagination} from "../store/actions/shops";
import AppOpenerDrawer from "../ui/AppOpenerDrawer";
import {loadFilter} from "../store/actions/filter";
import AppFilter from "../drawers/paramsFunctions/AppFilter";
import AppEmptyText from "../ui/AppEmptyText";

const pageWrapper = ({navigation, route}) => {
    let type = ""
    let id = 0
    //console.log('route.params', route.params)
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('type')) {
            type = route.params.type
        }

        if(route.params.hasOwnProperty('chemicalId')) {
            id = route.params.chemicalId
        } else if(route.params.hasOwnProperty('sortId')) {
            id = route.params.sortId
        }
    }

    //console.log(route)

    if(id === 0) {
        return (
            <AppTextBold>
                Неверные данные!
            </AppTextBold>
        )
    }

    //console.log('loading')

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })
    useLayoutEffect(() => {
        navigation.setOptions(
            mainHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "CulturesPageScreen"
                }),
            [navigation])
    })

    const init = true
    const shopInitiation = useRef(false)
    const filterInitiation = useRef(false)
    const [loadMore, setLoadMore] = useState(true)
    const dispatch = useDispatch()
    const itemsState = useSelector(state => state.shops)
    const pagination = itemsState.pagination
    const data = itemsState.itemsList
    const counts = itemsState.counts
    const sort = itemsState.sort
    const order = itemsState.order
    const opened = itemsState.opened
    const filter = useSelector(state => state.filter.filter)

    //console.log('opened', opened)
    //console.log('data', data.length)
    //console.log('data', data)
    //console.log('itemsState', itemsState)

    useEffect(() => {
        dispatch(loadFilter("getShopsFilter", {
            type,
            id
        }, navigation))
        if(pagination > 1) dispatch(setShopsPagination(1))
    }, [init])

    useEffect(() => {
        if(shopInitiation.current) {
            dispatch(loadShops({id, type, loadMore: false, navigation})).then(res => {
                //console.log('res', res)
            })
        }
        shopInitiation.current = true
    }, [sort, order])

    //console.log('preview', preview)

    //load more items
    useEffect(() => {
        if(!loadMore) {
            dispatch(setShopsPagination(pagination + 1)).then(res => {
                setTimeout(() => {
                    setLoadMore(true)
                    //console.log('done')
                }, 500)
            })
        }
    }, [loadMore])

    //loadBydefault
    useEffect(() => {
        dispatch(loadShops({id, type, navigation})).then(res => {
            //setData(res)
        })
        //setData(true)
    }, [pagination])

    useEffect(() => {
        let ok = false

        // if(filter.length) ok = true
        // else if(filter.length > 0 && filter[0].hasOwnProperty('data')) {
        //     if(filter[0].data.length === 0) ok = true
        // }

        if(filterInitiation.current)
            dispatch(loadShops({id, type, loadMore: false, navigation})).then(res => {
                //setData(res)
                //console.log('ok')
            })
        else
            filterInitiation.current = true
        //dispatch(emptyFilter())

    }, [filter])

    const scrollerHandler = ({nativeEvent}) => {
        const scroll = nativeEvent.contentSize.height - (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y)
        if(scroll < SCROLL_INITIATION_TO_PAGINATE && 0 < scroll && loadMore && counts > 0) {
            setLoadMore(false)
        }
    }
    //console.log(data)
    return (
        <>
            <AppOpenerDrawer navigation={navigation} />
            <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}} onScroll={scrollerHandler}>
                {/*<AppCategoriesSlider />*/}
                <AppShopsSorting />
                <View style={styles.container}>
                    {
                        data.length > 0
                            ?
                            data.map(item => {
                                const index = opened.indexOf(item.productId)
                                return <AppShopItem
                                    screeWidth={screeWidth}
                                    key={getRandomKey()}
                                    data={item}
                                    navigation={navigation}
                                    route={route}
                                    openedIs={index !== -1}
                                />
                            })
                            :
                            <AppEmptyText text={"К сожалению, еще не появились магазины по вашему запросу"} />
                    }
                </View>
            </AppWrap>
        </>
    )
}

const styles = StyleSheet.create({
    empty: {
        width: "100%",
        textAlign: "center",
        color: "green",
        paddingTop: 40,
        paddingBottom: 40
    },
    container: {
        padding: 20,
        paddingLeft: 35,
        paddingBottom: 100,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    item: {
        width: "50%",
        marginTop: 10,
        marginBottom: 10
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
                initialParams={route.params}
                drawerContent={
                    ({navigation}) => <AppFilter navigation={navigation} />
                } drawerPosition="left"
            >
                <Drawer.Screen name="InsidePageScreen" component={PageTab} />
            </Drawer.Navigator>
            <AppIndicator timer={2} />
        </>
    )
}

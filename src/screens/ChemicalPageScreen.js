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
import AppFilter from "../drawers/paramsFunctions/AppFilter";
import {loadFilter} from "../store/actions/filter";
import AppOpenerDrawer from "../ui/AppOpenerDrawer";
import AppCatalogSortItem from "../ui/AppCatalogSortItem";
import {CHEMICAL, getRandomKey, globalRouteFun} from "../../global";
import {loadChemicals, setChemicalsPagination} from "../store/actions/chemicals";
import AppCategoriesSlider from "../ui/MainScreen/AppCategoriesSlider";
import {setCurrentRoute} from "../store/actions/other";

const pageWrapper = ({navigation, route}) => {

    if(route.params === undefined) route.params = {}
    route.params.type = CHEMICAL

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
                    routeName: "MainPageScreen"
                }),
            [navigation])
    })

    const init = true
    const filterInitiation = useRef(false)
    const [mainData, setData] = useState(false)
    const [loadMore, setLoadMore] = useState(true)
    const dispatch = useDispatch()
    const itemsState = useSelector(state => state.chemicals)
    const filter = useSelector(state => state.filter.filter)
    const pagination = itemsState.pagination
    const data = itemsState.itemsList
    const counts = itemsState.counts

    //console.log('data', data.length)
    //console.log('data', data)
    //console.log('itemsState', itemsState)

    useEffect(() => {
        dispatch(loadFilter("getChemicalsFilter", {}, navigation))
        if(pagination > 1) dispatch(setChemicalsPagination(1))
    }, [init])


    //load more items
    useEffect(() => {
        if(!loadMore) {
            dispatch(setChemicalsPagination(pagination + 1)).then(res => {
                setTimeout(() => {
                    setLoadMore(true)
                    //console.log('done')
                }, 500)
            })
        }
    }, [loadMore])

    //loadBydefault
    useEffect(() => {
        dispatch(loadChemicals({navigation})).then(res => {
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
            dispatch(loadChemicals({loadMore: false, navigation})).then(res => {
                //setData(res)
                //console.log('ok')
            })
        else
            filterInitiation.current = true
            //dispatch(emptyFilter())

    }, [filter])

    const scrollerHandler = ({nativeEvent}) => {
        const scroll = nativeEvent.contentSize.height - (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y)
        if(scroll < 50 && 0 < scroll && loadMore && counts > 0) {
            setLoadMore(false)
        }
    }

    return (
        <>
            <AppOpenerDrawer navigation={navigation} />
            <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}} onScroll={scrollerHandler}>
                <AppCategoriesSlider />
                <View style={styles.container}>
                    {
                        data.map(item => {
                            return <View key={getRandomKey()} style={styles.item}>
                                <AppCatalogSortItem
                                    screenWidth={screeWidth / 2.7 - 30}
                                    item={item}
                                    navigation={navigation}
                                    chemical={true}
                                />
                            </View>
                        })
                    }
                </View>
            </AppWrap>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingLeft: 35,
        paddingRight: 10,
        paddingTop: 0,
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

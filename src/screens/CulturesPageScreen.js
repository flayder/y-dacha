import React, {useLayoutEffect, useState, useEffect, useRef} from "react"
import {View, StyleSheet, Dimensions} from "react-native"
import {AppWrap} from "../ui/AppWrap";
import AppCategoriesSlider from "../ui/MainScreen/AppCategoriesSlider"
import {createDrawerNavigator} from "@react-navigation/drawer"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import {useDispatch, useSelector} from "react-redux";
import {loadCultures, setCulturesPagination} from "../store/actions/cultures";
import AppCatalogCultureItem from "../ui/AppCatalogCultureItem";
import AppFilter from "../drawers/paramsFunctions/AppFilter";
import {emptyFilter, loadFilter} from "../store/actions/filter";
import {getColorType, getRandomKey, globalRouteFun, SAD, SCROLL_INITIATION_TO_PAGINATE} from "../../global";
import AppOpenerDrawer from "../ui/AppOpenerDrawer";

const pageWrapper = ({navigation, route}) => {
    let color = "#000"
    let type = SAD
    //console.log('route.params', route.params)
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('type')) {
            type = route.params.type
            color = getColorType(type)
        }
    }
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
                    jumpTo: "MainPageScreen"
                }),
            [navigation])
    })

    const init = true
    const filterInitiation = useRef(false)
    const [mainData, setData] = useState(false)
    const [loadMore, setLoadMore] = useState(true)
    const dispatch = useDispatch()
    const itemsState = useSelector(state => state.cultures)
    const filter = useSelector(state => state.filter.filter)
    let pagination = itemsState.pagination
    const data = itemsState.culturesList
    const counts = itemsState.counts

    //load filters
    useEffect(() => {
        dispatch(loadFilter("getCulturesFilter", {
            type
        }, navigation))
        if(pagination > 1) dispatch(setCulturesPagination(1))
        if(filter.length > 0) {
            dispatch(emptyFilter())
        }
    }, [init])

    //load more items
    useEffect(() => {
        if(!loadMore) {
            dispatch(setCulturesPagination(pagination + 1)).then(res => {
                setTimeout(() => {
                    setLoadMore(true)
                    //console.log('done')
                }, 500)
            })
        }
    }, [loadMore])

    //console.log('pagination', pagination, route.params)

    //loadBydefault
    useEffect(() => {
        dispatch(loadCultures({type, navigation})).then(res => {
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
            dispatch(loadCultures({type, loadMore: false, navigation})).then(res => {
                setData(res)
            })
        else
            filterInitiation.current = true
            //dispatch(emptyFilter())
        //setFilterInitiation(true)
    }, [filter])

    const scrollerHandler = ({nativeEvent}) => {
        const scroll = nativeEvent.contentSize.height - (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y)
        if(scroll < SCROLL_INITIATION_TO_PAGINATE && 0 < scroll && loadMore && counts > 0) {
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
                            return <View key={getRandomKey() + "view"} style={styles.item}>
                                <AppCatalogCultureItem
                                    key={getRandomKey()}
                                    item={item}
                                    navigation={navigation}
                                    color={color}
                                    middleText={""}
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
        paddingRight: 10,
        paddingLeft: 35,
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

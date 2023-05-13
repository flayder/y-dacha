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
import {getRandomKey, globalRouteFun, SCROLL_INITIATION_TO_PAGINATE} from "../../global";
import {AppTextBold} from "../ui/AppTextBold";
import AppMasterItem from "../ui/master/AppMasterItem";
import AppMasterSorting from "../ui/master/AppMasterSorting";
import {loadMasters, setMastersPagination, setMastersRegion} from "../store/actions/masters";
import AppSelectRegions from "../ui/AppSelectRegions";
import {THEME} from "../../theme";
import {setCurrentRoute} from "../store/actions/other";
import AppEmptyText from "../ui/AppEmptyText";

const pageWrapper = ({navigation, route}) => {
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
    const filterInitiation = useRef(false)
    const itemInitiation = useRef(false)
    const [mainData, setData] = useState(false)
    const [loadMore, setLoadMore] = useState(true)
    const dispatch = useDispatch()
    const itemsState = useSelector(state => state.masters)
    const filter = useSelector(state => state.filter.filter)
    const pagination = itemsState.pagination
    const data = itemsState.itemsList
    const counts = itemsState.counts
    const sort = itemsState.sort
    const order = itemsState.order
    const region = itemsState.region
    const regions = itemsState.regions

    //console.log('data', data.length)
    //console.log('data', data)
    //console.log('itemsState', itemsState)
    //console.log('regions', regions)

    useEffect(() => {
        dispatch(loadFilter("getMastersFilter", {}, navigation))
        if(pagination > 1) dispatch(setMastersPagination(1))
    }, [init])

    useEffect(() => {
        if(itemInitiation.current) {
           dispatch(loadMasters({navigation}))
        }
        itemInitiation.current = true
    }, [sort, order])

    //console.log('preview', preview)

    //load more items
    useEffect(() => {
       if(!loadMore) {
           dispatch(setMastersPagination(pagination + 1)).then(res => {
               setTimeout(() => {
                   setLoadMore(true)
                   //console.log('done')
               }, 500)
           })
       }
    }, [loadMore])

    //loadBydefault
    useEffect(() => {
        dispatch(loadMasters({navigation}))
        setData(true)
    }, [pagination])

    useEffect(() => {
        let ok = false

        //console.log('filter', filter)

        // if(filter.length) ok = true
        // else if(filter.length > 0 && filter[0].hasOwnProperty('data')) {
        //    if(filter[0].data.length === 0) ok = true
        // }

        if(filterInitiation.current)
           dispatch(loadMasters({navigation, loadMore: false}))
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

    return (
        <>
            <AppOpenerDrawer navigation={navigation} />
            <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}} onScroll={scrollerHandler}>
                <AppTextBold style={{textAlign: "center"}}>
                    Список всех мастеров
                </AppTextBold>
                <AppMasterSorting />
                {
                    typeof regions == "object" && regions.length > 0
                        ?
                        <AppSelectRegions
                            showDefaultTitle={true}
                            title={"Регион работы"}
                            fullRegions={false}
                            dataRegions={regions}
                            defaultIs={region}
                            style={{
                                marginBottom: 20
                            }}
                            backgroundColor={THEME.COMFORT_COLOR}
                            borderColor={THEME.COMFORT_COLOR}
                            color={"#fff"}
                            onResult={text => {
                                if(text > 0) dispatch(setMastersRegion(text))
                                else dispatch(setMastersRegion(0))
                                dispatch(loadMasters({loadMore: false, navigation}))
                            }}
                        />
                        :
                        <></>
                }
                <View style={styles.container}>
                    {
                        data.length > 0
                            ?
                            data.map(item => {
                                return <AppMasterItem
                                    key={getRandomKey()}
                                    screenWidth={screeWidth - 60}
                                    item={item}
                                    navigation={navigation}
                                />
                            })
                            :
                            <AppEmptyText text={"Список мастеров пуст"} />
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

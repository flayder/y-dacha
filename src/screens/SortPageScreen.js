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
import {loadPreview} from "../store/actions/cultures";
import AppFilter from "../drawers/paramsFunctions/AppFilter";
import {emptyFilter, loadFilter} from "../store/actions/filter";
import {getColorType, globalRouteFun, SAD, SCROLL_INITIATION_TO_PAGINATE} from "../../global";
import AppOpenerDrawer from "../ui/AppOpenerDrawer";
import AppCatalogSortItem from "../ui/AppCatalogSortItem";
import {loadSorts, setSortsPagination} from "../store/actions/sorts";
import {getRandomKey} from "../../global";
import AppSortMenu from "../ui/sortPageScreen/AppSortMenu";
import AppSortPreview from "../ui/sortPageScreen/AppSortPreview";
import AppSortSorting from "../ui/sortPageScreen/AppSortSorting";
import {AppTextBold} from "../ui/AppTextBold";
import {setCurrentRoute} from "../store/actions/other";

const pageWrapper = ({navigation, route}) => {
    let color = "#000"
    let type = SAD
    let id = 0
    //console.log('route.params', route.params)
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('type')) {
            type = route.params.type
            color = getColorType(type)
        }

        if(route.params.hasOwnProperty('cultureId')) {
            id = route.params.cultureId
        }
    }

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
    const filterInitiation = useRef(false)
    const sortInitiation = useRef(false)
    const [mainData, setData] = useState(false)
    const [loadMore, setLoadMore] = useState(true)
    const dispatch = useDispatch()
    const itemsState = useSelector(state => state.sorts)
    const preview = useSelector(state => state.cultures.preview)
    const filter = useSelector(state => state.filter.filter)
    const pagination = itemsState.pagination
    const data = itemsState.itemsList
    const counts = itemsState.counts
    const sort = itemsState.sort
    const order = itemsState.order
    const scrollTo = useRef(0)
    const scrollIs = useRef()

    //console.log('data', data.length)
    //console.log('data', data)
    //console.log('itemsState', itemsState)

    // useEffect(() => {
    //     //console.log('scrollIs.current', scrollIs.current)
    //     if(scrollIs.current !== undefined && pagination > 1) {
    //         setTimeout(() => {
    //             //console.log('scrollTo.current', scrollTo.current)
    //             scrollIs.current.scrollTo({y: scrollTo.current})
    //         }, 200)
    //     }
    // }, [data.length])

    useEffect(() => {
       dispatch(loadPreview({id, navigation})).then(res => {
           //setData(true)
       })
       dispatch(loadFilter("getSortsFilter", {
           type,
           id
       }, navigation))
       if(pagination > 1) dispatch(setSortsPagination(1))
       if(filter.length > 0) dispatch(emptyFilter())
    }, [init])

    useEffect(() => {
        if(sortInitiation.current) {
            dispatch(loadSorts({id, type, loadMore: false, navigation})).then(res => {
                //console.log('res', res)
            })
        }
        sortInitiation.current = true
    }, [sort, order])

    //console.log('preview', preview)

    //load more items
    useEffect(() => {
        if(!loadMore) {
            dispatch(setSortsPagination(pagination + 1)).then(res => {
                setTimeout(() => {
                    setLoadMore(true)
                    //console.log('done')
                }, 500)
            })
        }
    }, [loadMore])

    //loadBydefault
    useEffect(() => {
        dispatch(loadSorts({id, type, navigation})).then(res => {
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
            dispatch(loadSorts({id, type, loadMore: false, navigation})).then(res => {
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
            scrollTo.current = nativeEvent.contentSize.height
            setLoadMore(false)
        }
    }

    return (
        <>
            <AppOpenerDrawer navigation={navigation} />
            <AppWrap
                refInitiation={node => {
                    scrollIs.current = node
                }}
                scroll={{paddingLeft: 0, paddingRight: 0}}
                onScroll={scrollerHandler}>
                {/*<AppCategoriesSlider />*/}
                <AppSortMenu />
                <View style={styles.wrapPreview}>
                    {
                        preview
                            ?
                            <AppSortPreview
                                image={preview.photo}
                                text={preview.description}
                                title={preview.name}
                                data={preview}
                            />
                            :
                            <></>
                    }
                </View>
                <AppSortSorting />
                <View style={styles.container}>
                    {
                        data.map(item => {
                            return <View key={getRandomKey()} style={styles.item}>
                                <AppCatalogSortItem
                                    screenWidth={screeWidth / 2.7 - 30}
                                    item={item}
                                    navigation={navigation}
                                    color={color}
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
    wrapPreview: {
        position: "relative",
        zIndex: 999
    },
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

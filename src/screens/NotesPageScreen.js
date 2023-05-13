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
import {loadFilter} from "../store/actions/filter";
import {getColorType, globalRouteFun, SAD, SCROLL_INITIATION_TO_PAGINATE} from "../../global";
import AppOpenerDrawer from "../ui/AppOpenerDrawer";
import {getRandomKey} from "../../global";
import AppSortMenu from "../ui/sortPageScreen/AppSortMenu";
import AppSortPreview from "../ui/sortPageScreen/AppSortPreview";
import {AppTextBold} from "../ui/AppTextBold";
import AppCultureTitle from "../ui/pestsPageScreen/AppCultureTitle";
import {loadNotes, setNotesPagination} from "../store/actions/notes";
import AppNotesItem from "../ui/AppNotesItem";
import AppFilter from "../drawers/paramsFunctions/AppFilter";
import {setCurrentRoute} from "../store/actions/other";

const pageWrapper = ({navigation, route}) => {
    let type = SAD
    let id = 0
    let color = "#000"
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
    //console.log(Platform.OS + ' loading')

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
                    routeName: "SortPageScreen"
                }),
            [navigation])
    })

    const init = true
    const filterInitiation = useRef(false)
    const [mainData, setData] = useState(false)
    const [loadMore, setLoadMore] = useState(true)
    const dispatch = useDispatch()
    const itemsState = useSelector(state => state.notes)
    const preview = useSelector(state => state.cultures.preview)
    const filter = useSelector(state => state.filter.filter)
    const pagination = itemsState.pagination
    const data = itemsState.itemsList
    const counts = useSelector(state => state.notes.counts)

    //console.log('data', data.length)
    //console.log('data', data)
    //console.log('itemsState', itemsState)

    useEffect(() => {
        if(!preview) {
            dispatch(loadPreview({id, navigation})).then(res => {
                //setData(true)
            })
        }
        dispatch(loadFilter("getNotesFilter", {
            type,
            id
        }, navigation))
        if(pagination > 1) dispatch(setNotesPagination(1))
    }, [init])

    //console.log('preview', preview)

    //load more items
    useEffect(() => {
        if(!loadMore) {
            dispatch(setNotesPagination(pagination + 1)).then(res => {
                setTimeout(() => {
                    setLoadMore(true)
                    //console.log('done')
                }, 500)
            })
        }
    }, [loadMore])

    //loadBydefault
    useEffect(() => {
        dispatch(loadNotes({id, type, navigation})).then(res => {
           //setData(res)
            //console.log('here')
        })
        setData(true)
    }, [pagination])

    useEffect(() => {
        let ok = false

        // if(filter.length) ok = true
        // else if(filter.length > 0 && filter[0].hasOwnProperty('data')) {
        //     if(filter[0].data.length === 0) ok = true
        // }

        if(filterInitiation.current)
            dispatch(loadNotes({id, type, loadMore: false, navigation})).then(res => {
               //setData(res)
               //console.log('ok')
            })
        else
           filterInitiation.current = true
    }, [filter.length])

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
                {/*<AppCategoriesSlider />*/}
                <AppSortMenu />
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
                <AppCultureTitle title={'Справочная информация'} />
                <View style={styles.container}>
                    {
                        data.map(item => {
                            return <AppNotesItem
                                color={color}
                                item={item}
                                routeName="NoteDetailPageScreen"
                                id="noteId"
                                navigation={navigation}
                                key={getRandomKey()}
                            />
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
        paddingRight: 20,
        paddingTop: 0,
        flexDirection: "row",
        flexWrap: "wrap"
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
                }
                drawerPosition="left"
            >
                <Drawer.Screen name="InsidePageScreen" component={PageTab} />
            </Drawer.Navigator>
            <AppIndicator timer={2} />
        </>
    )
}

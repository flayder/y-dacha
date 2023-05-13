import React, {useLayoutEffect, useState, useEffect, useRef} from "react"
import {View, StyleSheet, Dimensions, Platform, ImageBackground, Image} from "react-native"
import {AppWrap} from "../ui/AppWrap";
import {createDrawerNavigator} from "@react-navigation/drawer"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import {useDispatch, useSelector} from "react-redux";
import AppFilter from "../drawers/paramsFunctions/AppFilter";
import AppEventCalendar from "../ui/eventsPageScreen/AppEventCalendar";
import {THEME} from "../../theme";
import {AppTextBold} from "../ui/AppTextBold";
import {getRandomKey, globalRouteFun} from "../../global";
import {loadEvents} from "../store/actions/events";
import AppEventItem from "../ui/eventsPageScreen/AppEventItem";
import AppEmptyText from "../ui/AppEmptyText";
import AppSelectRegions from "../ui/AppSelectRegions";

const pageWrapper = ({navigation, route}) => {
    //console.log('nav', navigation)
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
                    backgroundColor: THEME.EVENT_COLOR,
                    routeName: "CulturesPageScreen",
                    height: 100,
                    paddingTop: Platform.OS == 'ios' ? 0 : 15,
                }),
            [navigation])
    })

    const init = useRef(true)
    const [loadMore, setLoadMore] = useState(true)
    const dispatch = useDispatch()
    const itemsState = useSelector(state => state.events)
    const data = itemsState.itemsList
    const types = itemsState.types
    const date = itemsState.date
    const selected = itemsState.selected
    const type = itemsState.type
    const regions = itemsState.regions

    //console.log('date', data)

    useEffect(() => {
        if(!init.current) {
            dispatch(loadEvents({navigation}))
        } else {
            init.current = true
            dispatch(loadEvents({navigation, init: false}))
        }
    }, [date, type, selected])

    const scrollerHandler = ({nativeEvent}) => {
        // const scroll = nativeEvent.contentSize.height - (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y)
        // if(scroll < 50 && 0 < scroll && loadMore && counts > 0) {
        //     setLoadMore(false)
        // }
    }

    return (
        <>
            <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}} onScroll={scrollerHandler}>
                <ImageBackground
                    style={styles.title}
                    source={require('@images/eventsPageScreen/title.png')}
                    resizeMode={"contain"}
                >
                    <AppTextBold style={styles.titleText}>
                        События
                    </AppTextBold>
                </ImageBackground>
                <View style={styles.bgColorCal}></View>
                <AppEventCalendar
                    item={types}
                    activeDate={date}
                    selected={selected}
                />
                <View style={styles.selecter}>
                    <Image
                        style={styles.city}
                        source={require("@images/eventsPageScreen/imgCity.png")}
                        resizeMode={"contain"}
                    />
                    <AppSelectRegions
                        title={"Не выбран"}
                        dataRegions={regions}
                        showDefaultTitle={true}
                        fullRegions={false}
                        preText={"Регион проведения: "}
                        style={styles.select}
                        backgroundColor={THEME.FOOTER_BG}
                        color={"#fff"}
                        onResult={region => {
                            if(region > 0)
                                dispatch(loadEvents({navigation, region}))
                            else
                                dispatch(loadEvents({navigation}))
                        }}
                    />
                    {/*<AppSelect*/}
                    {/*    style={styles.select}*/}
                    {/*    backgroundColor={THEME.FOOTER_BG}*/}
                    {/*/>*/}
                </View>
                <View style={styles.container}>
                    {
                        (Array.isArray(data) && data.length > 0)
                            ?
                            data.map(item => {
                                return <AppEventItem
                                    key={getRandomKey()}
                                    item={item}
                                    navigation={navigation}
                                />
                            })
                            :
                            <AppEmptyText text={"Мероприятий в этот день не найдено"} />
                    }
                </View>
            </AppWrap>
        </>
    )
}

const styles = StyleSheet.create({
    city: {
        width: "100%",
        height: 38,
        marginBottom: -4
    },
    select: {
        backgroundColor: THEME.FOOTER_BG
    },
    title: {
        position: "relative",
        zIndex: 9,
        alignItems: "center",
        paddingTop: 15,
        minHeight: 70,
        width: "100%",
        backgroundColor: THEME.EVENT_COLOR
    },
    bgColorCal: {
        backgroundColor: THEME.EVENT_COLOR,
        height: 90,
        marginBottom: -80
    },
    titleText: {
        textAlign: "center"
    },
    wrapPreview: {
        position: "relative",
        zIndex: 999
    },
    container: {
        padding: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    selecter: {
        zIndex: 9999,
        elevation: 9999
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
                options={{ gestureEnabled: false }}
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

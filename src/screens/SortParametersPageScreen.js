import React, {useLayoutEffect, useEffect} from "react"
import {StyleSheet, Image, View} from "react-native"
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
import {loadSort} from "../store/actions/sorts";
import {AppText} from "../ui/AppText";
import {getRandomKey, globalRouteFun} from "../../global";
import {THEME} from "../../theme";
import {setCurrentRoute} from "../store/actions/other";

const pageWrapper = ({navigation, route}) => {
    let id = 0
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('sortId')) {
            id = route.params.sortId
        }
    }
    if(id === 0) {
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
                    routeName: "SortPageScreen"
                }),
            [navigation])
    })

    const init = true
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadSort(id))
    }, [init])

    const data = useSelector(state => state.sorts.currentSort)

    return (
        <AppWrap>
            <AppTextBold style={styles.title}>
                Параметры
            </AppTextBold>
            {
                data.hasOwnProperty('params')
                    ?
                    data.params.map(item => {
                        return <View
                            style={styles.item}
                            key={getRandomKey()}
                        >
                            <View style={styles.icon}>
                                <Image
                                    style={styles.img}
                                    source={{uri: item.photo}}
                                />
                            </View>
                            <AppText style={styles.name}>
                                {item.name}
                            </AppText>
                            <AppText style={styles.value}>
                                {item.value}
                            </AppText>
                        </View>
                    })
                    :
                    <></>
            }
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderColor: THEME.GREY
    },
    icon: {
        width: "15%",
        paddingRight: 5,
    },
    name: {
        width: "50%",
        paddingLeft: 5,
        paddingRight: 5
    },
    value: {
        width: "35%",
        paddingLeft: 5,
        paddingRight: 5
    },
    img: {
        width: 35,
        height: 35
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
                drawerContent={AppDrawerContentHandler} drawerPosition="left"
            >
                <Drawer.Screen name="InsidePageScreen" component={PageTab} />
            </Drawer.Navigator>
            <AppIndicator timer={2} />
        </>
    )
}

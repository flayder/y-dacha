import React, {useLayoutEffect, useEffect, useState} from "react"
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
import AppMasterAssortment from "../ui/masterAssortmentPageScreen/AppMasterAssortment";
import {loadMasterAssortment} from "../store/actions/masters";
import {getRandomKey, globalRouteFun} from "../../global";

const pageWrapper = ({navigation, route}) => {
    let id = 0
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('masterId')) {
            id = route.params.masterId
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
                    routeName: "MasterDetailPageScreen"
                }),
            [navigation])
    })

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    const init = true
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadMasterAssortment({id, navigation}))
    }, [init])

    const data = useSelector(state => state.masters.assortments)

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            <View style={styles.mainTitle}>
                <AppTextBold style={styles.title}>
                    Ассортимент мастера
                </AppTextBold>
            </View>
            {
                data.map(item => {
                    return <AppMasterAssortment
                        key={getRandomKey()}
                        data={item}
                        screenWidth={screeWidth}
                        navigation={navigation}
                    />
                })
            }

        </AppWrap>
    )
}

const styles = StyleSheet.create({
    mainTitle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20
    },
    title: {
        width: "100%",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20
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

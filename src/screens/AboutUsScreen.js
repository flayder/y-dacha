import React, {useLayoutEffect, useState, useEffect} from "react"
import {View,StyleSheet, TouchableOpacity, Platform} from "react-native"
//import SWGImage from "expo-svg-uri";
import {AppText} from "../ui/AppText";
import {AppWrap} from "../ui/AppWrap";
import {createDrawerNavigator} from "@react-navigation/drawer"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {AppBlueButton} from "../ui/AppBlueButton";
import AppIndicator from "../ui/AppIndicator";
import {AppLogoFirstScreens} from "../ui/AppLogoFirstScreens";
import {mainHeader} from "../globalHeaders";
import {AppTextBold} from "../ui/AppTextBold";
import {AppFetch} from "../AppFetch";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentRoute} from "../store/actions/other";
import {globalRouteFun} from "../../global";

const pageWrapper = ({navigation, route}) => {
    const [data, setData] = useState({})
    const init = true
    useLayoutEffect(() => {
        navigation.getParent().getParent().setOptions({
            gestureEnabled: false
        })
        //navigation.dangerouslyGetParent().dangerouslyGetParent().dangerouslyGetParent().setOptions({
        //    gestureEnabled: false
        //})
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
    useEffect(() => {
        AppFetch.getWithToken('getAbout', {}, {}, navigation).then(result => {
            if(result.result) setData(result.data)
        })
    }, [init])
    //console.log('data', data)
    return (
        <AppWrap scroll={{paddingTop: 40}}>
            <AppLogoFirstScreens />
            <AppTextBold style={{textAlign: "center", width: "100%"}}>
                {data.title}
            </AppTextBold>
            <AppText>
                {data.text}
            </AppText>
            <AppBlueButton style={styles.btn} onPress={() => {
                navigation.jumpTo("FAQScreen")
            }}>
                Справка
            </AppBlueButton>
            <View style={{paddingBottom: 80}}></View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 200,
        marginLeft: "auto",
        marginRight: "auto"
    }
})

const Stack = createStackNavigator()

const pageScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"StackAboutUsScreen"} component={pageWrapper} />
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
            <Drawer.Navigator screenOptions={() => ({
                headerShown: false
            })} drawerPosition="left">
                <Drawer.Screen name="DrawerAboutUsScreen" component={pageTab} />
            </Drawer.Navigator>
            <AppIndicator timer={1} />
        </>
    )
}

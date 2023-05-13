import React, {useLayoutEffect, useEffect} from "react"
import {View, StyleSheet} from "react-native"
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppWrap} from "../ui/AppWrap";
import AppCategoriesSlider from "../ui/MainScreen/AppCategoriesSlider"
import AppNewsSlider from "../ui/MainScreen/AppNewsSlider";
import AppMastersSlider from "../ui/MainScreen/AppMastersSlider";
import {AppMoreLink} from "../ui/AppMoreLink";
import AppShopsSlider from "../ui/MainScreen/AppShopsSlider";
import AppEventsSlider from "../ui/MainScreen/AppEventsSlider";
import AppSortsSlider from "../ui/MainScreen/AppSortsSlider";
import {AppLogoFirstScreens} from "../ui/AppLogoFirstScreens";
import AppFooter from "../ui/footer/AppFooter";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {createDrawerNavigator} from "@react-navigation/drawer"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import {globalRouteFun, LinkTo} from "../../global";
import {useDispatch, useSelector} from "react-redux";
import {AppBlueButton} from "../ui/AppBlueButton";
import {setCurrentRoute} from "../store/actions/other";

const pageWrapper = ({navigation, route}) => {
    useLayoutEffect(() => {
        navigation.setOptions(
            mainHeader(
                {
                    route,
                    navigation
                }),
            [navigation])
    })

    return (
        <>
            {/*<AppIndicator time={3} />*/}
            <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
                <AppCategoriesSlider />
                <View style={styles.new}>
                    <AppTextBold style={{...styles.newText, marginBottom: 20}}>
                        Новости и Акционные предложения
                    </AppTextBold>
                    <AppNewsSlider navigation={navigation} />
                </View>
                <View style={styles.masters}>
                    <AppMoreLink
                        onPress={() => {
                            LinkTo("MasterPageScreen", {}, navigation)
                        }}
                        style={styles.mores}
                        text={'См.все'}
                    />
                    <AppTextBold style={styles.newText}>
                        Популярные мастера
                    </AppTextBold>
                </View>
                <AppMastersSlider navigation={navigation} />
                <View style={styles.shops}>
                    <AppMoreLink
                        onPress={() => {
                            LinkTo("ShopsAllPageScreen", {}, navigation)
                        }}
                        text={'См.все'}
                        style={styles.mores}
                    />
                    {/* text={'См.все'}*/}
                    <AppTextBold style={styles.newText}>
                        Популярные магазины
                    </AppTextBold>
                </View>
                <AppShopsSlider />
                <View style={styles.shops}>
                    <AppMoreLink
                        onPress={() => {
                            LinkTo("EventsPageScreen", {}, navigation)
                        }}
                        style={styles.mores}
                        text={'См.все'}
                    />
                    <AppTextBold style={styles.newText}>
                        События
                    </AppTextBold>
                </View>
                <AppEventsSlider navigation={navigation} />
                <AppSortsSlider navigation={navigation} />
                <View style={styles.logo}>
                    <AppLogoFirstScreens />
                </View>
                <AppFooter />
            </AppWrap>
        </>
    )
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 20,
        marginBottom: 20
    },
    new: {
        paddingTop: 10,
        //paddingBottom: 20
    },
    newText: {
        width: "100%",
        textAlign: "center",
        fontSize: 18,
    },
    masters: {
        width: "100%",
        position: "relative"
    },
    mores: {
        position: "absolute",
        top: 0,
        right: 20,
        zIndex: 9
    }
})

const Stack = createStackNavigator()

const pageScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"StackMainPageScreen"} component={pageWrapper} />
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
            })} drawerContent={AppDrawerContentHandler} drawerPosition="left">
                <Drawer.Screen name="InsideMainPageScreen" component={pageTab} />
            </Drawer.Navigator>
            <AppIndicator timer={2} />
        </>
    )
}

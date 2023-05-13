import React, {useLayoutEffect, useEffect, useState} from "react"
import {View, StyleSheet, Dimensions, TouchableOpacity} from "react-native"
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
import {loadMyMasterAssortment} from "../store/actions/masters";
import {getRandomKey, globalRouteFun, LinkTo} from "../../global";
import {Mask, Path, Svg} from "react-native-svg";
import {THEME} from "../../theme";
import AppMyMasterAssortment from "../ui/myMasterAssortmentScreen/AppMyMasterAssortment";

const pageWrapper = ({navigation, route}) => {
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
    //console.log('ok')

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    const init = true
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadMyMasterAssortment({navigation}))
    }, [init])

    const data = useSelector(state => state.masters.assortments)

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            <View style={styles.mainTitle}>
                <AppTextBold style={styles.title}>
                    Ассортимент мастера
                </AppTextBold>
            </View>
            <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                    LinkTo("AddMasterProductScreen", {}, navigation)
                }}
            >
                <Svg width="24" height="24" style={styles.addBtnIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Mask id="path-1-inside-1" fill="white">
                        <Path fillRule="evenodd" clipRule="evenodd" d="M12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24ZM10.8736 10.9224C10.9289 10.9224 10.9736 10.8777 10.9736 10.8224V5.74697C10.9736 5.69174 11.0184 5.64697 11.0736 5.64697H12.3285C12.3838 5.64697 12.4285 5.69174 12.4285 5.74697V10.8224C12.4285 10.8777 12.4733 10.9224 12.5285 10.9224H17.547C17.6022 10.9224 17.647 10.9672 17.647 11.0224V12.0904C17.647 12.1456 17.6022 12.1904 17.547 12.1904H12.5285C12.4733 12.1904 12.4285 12.2351 12.4285 12.2904V17.547C12.4285 17.6022 12.3838 17.647 12.3285 17.647H11.0736C11.0184 17.647 10.9736 17.6022 10.9736 17.547V12.2904C10.9736 12.2351 10.9289 12.1904 10.8736 12.1904H5.74697C5.69174 12.1904 5.64697 12.1456 5.64697 12.0904V11.0224C5.64697 10.9672 5.69174 10.9224 5.74697 10.9224H10.8736Z"/>
                    </Mask>
                    <Path d="M0.690001 12C0.690001 18.2463 5.75366 23.31 12 23.31V24.69C4.99151 24.69 -0.690001 19.0085 -0.690001 12H0.690001ZM12 0.69C5.75366 0.69 0.690001 5.75366 0.690001 12H-0.690001C-0.690001 4.99151 4.99151 -0.69 12 -0.69V0.69ZM23.31 12C23.31 5.75366 18.2463 0.69 12 0.69V-0.69C19.0085 -0.69 24.69 4.99151 24.69 12H23.31ZM12 23.31C18.2463 23.31 23.31 18.2463 23.31 12H24.69C24.69 19.0085 19.0085 24.69 12 24.69V23.31ZM11.6636 10.8224C11.6636 11.2587 11.3099 11.6124 10.8736 11.6124V10.2324C10.5478 10.2324 10.2836 10.4966 10.2836 10.8224H11.6636ZM11.6636 5.74697V10.8224H10.2836V5.74697H11.6636ZM11.0736 6.33697C11.3995 6.33697 11.6636 6.07282 11.6636 5.74697H10.2836C10.2836 5.31066 10.6373 4.95697 11.0736 4.95697V6.33697ZM12.3285 6.33697H11.0736V4.95697H12.3285V6.33697ZM11.7385 5.74697C11.7385 6.07282 12.0027 6.33697 12.3285 6.33697V4.95697C12.7648 4.95697 13.1185 5.31067 13.1185 5.74697H11.7385ZM11.7385 10.8224V5.74697H13.1185V10.8224H11.7385ZM12.5285 11.6124C12.0922 11.6124 11.7385 11.2588 11.7385 10.8224H13.1185C13.1185 10.4966 12.8544 10.2324 12.5285 10.2324V11.6124ZM17.547 11.6124H12.5285V10.2324H17.547V11.6124ZM16.957 11.0224C16.957 11.3483 17.2211 11.6124 17.547 11.6124V10.2324C17.9833 10.2324 18.337 10.5861 18.337 11.0224H16.957ZM16.957 12.0904V11.0224H18.337V12.0904H16.957ZM17.547 11.5004C17.2211 11.5004 16.957 11.7645 16.957 12.0904H18.337C18.337 12.5267 17.9833 12.8804 17.547 12.8804V11.5004ZM12.5285 11.5004H17.547V12.8804H12.5285V11.5004ZM11.7385 12.2904C11.7385 11.8541 12.0922 11.5004 12.5285 11.5004V12.8804C12.8544 12.8804 13.1185 12.6162 13.1185 12.2904H11.7385ZM11.7385 17.547V12.2904H13.1185V17.547H11.7385ZM12.3285 16.957C12.0027 16.957 11.7385 17.2211 11.7385 17.547H13.1185C13.1185 17.9833 12.7648 18.337 12.3285 18.337V16.957ZM11.0736 16.957H12.3285V18.337H11.0736V16.957ZM11.6636 17.547C11.6636 17.2211 11.3995 16.957 11.0736 16.957V18.337C10.6373 18.337 10.2836 17.9833 10.2836 17.547H11.6636ZM11.6636 12.2904V17.547H10.2836V12.2904H11.6636ZM10.8736 11.5004C11.3099 11.5004 11.6636 11.8541 11.6636 12.2904H10.2836C10.2836 12.6162 10.5478 12.8804 10.8736 12.8804V11.5004ZM5.74697 11.5004H10.8736V12.8804H5.74697V11.5004ZM6.33697 12.0904C6.33697 11.7645 6.07282 11.5004 5.74697 11.5004V12.8804C5.31067 12.8804 4.95697 12.5267 4.95697 12.0904H6.33697ZM6.33697 11.0224V12.0904H4.95697V11.0224H6.33697ZM5.74697 11.6124C6.07282 11.6124 6.33697 11.3483 6.33697 11.0224H4.95697C4.95697 10.5861 5.31066 10.2324 5.74697 10.2324V11.6124ZM10.8736 11.6124H5.74697V10.2324H10.8736V11.6124Z" fill="white" mask="url(#path-1-inside-1)"/>
                </Svg>
                <View style={{width: 10}}></View>
                <AppTextBold style={styles.addBtnText}>
                    Добавление новый товар
                </AppTextBold>
            </TouchableOpacity>
            {
                data.map(item => {
                    return <AppMyMasterAssortment
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
    addBtn: {
        width: 280,
        marginBottom: 20,
        alignItems: "center",
        backgroundColor: THEME.BLUE,
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 8,
        padding: 8,
        marginLeft: "auto",
        marginRight: "auto"
    },
    addBtnText: {
        marginTop: 0,
        marginBottom: 0,
        color: "#fff"
    },
    addBtnIcon: {
        alignItems: "center"
    },
    mainTitle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
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
    //console.log('pkokoko')
    return (
        <Tab.Navigator
            tabBar={() => {
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

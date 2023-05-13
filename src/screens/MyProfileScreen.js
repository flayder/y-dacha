import React, {useLayoutEffect, useState, useEffect} from "react"
import {View, StyleSheet, Dimensions, TouchableOpacity, Platform} from "react-native"
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from "@react-navigation/stack";
import {globalAlert, titleHeader} from "../globalHeaders";
import {useSelector, useDispatch} from "react-redux";
import AppIndicator from "../ui/AppIndicator";
import 'moment/locale/ru'
import {AppWrap} from "../ui/AppWrap";
import {Svg, Path} from "react-native-svg";
import AppProfilePhotoBlock from "../ui/myProfileScreen/AppProfilePhotoBlock";
import {THEME} from "../../theme";
import AppAddressBlock from "../ui/myProfileScreen/AppAddressBlock";
import AppRollsBlock from "../ui/myProfileScreen/AppRollsBlock";
import AppSocPassive from "../ui/myProfileScreen/AppSocPassive";
import AppSellerTab from "../ui/myProfileScreen/AppSellerTab";
import AppMasterTab from "../ui/myProfileScreen/AppMasterTab";
import AppEventTab from "../ui/myProfileScreen/AppEventTab";
import AppDefaultTab from "../ui/myProfileScreen/AppDefaultTab";
import {globalRouteFun, LinkTo} from "../../global";
import {getGlobalUserInfo, setCurrentRoute} from "../store/actions/other";
import {DB} from "../db";
import * as InAppPurchases from 'expo-in-app-purchases';
import {AppBlueButton} from "../ui/AppBlueButton";
import {AppFetch} from "../AppFetch";

const itemsInfo = Platform.select({
    ios: ['4', '9', '8', '7', 'master', 'guru', 'expert'],
    android: ['']
})

const pageWrapper = ({navigation, route}) => {
    useLayoutEffect(() => {
        navigation.setOptions(
            titleHeader(
                {
                    route,
                    navigation,
                    titleName: "Профиль",
                    headerLeftBack: true,
                    routeName: "MasterDetailPageScreen",
                    rightIcon() {
                        return (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                    LinkTo("MyProfileEditScreen", {}, navigation)
                                }}
                                style={{
                                    paddingRight: 20,
                                    marginTop: -5
                                }}
                            >
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M14.7726 4.14372L14.5286 3.89977V3.89977L14.7726 4.14372ZM14.7726 3.0472L14.5286 3.29116V3.29116L14.7726 3.0472ZM13.3494 5.56685L13.1055 5.81081L13.3494 6.05476L13.5934 5.81081L13.3494 5.56685ZM10.4332 2.65059L10.1892 2.40664L9.94526 2.65059L10.1892 2.89454L10.4332 2.65059ZM11.8563 1.22746L12.1002 1.47141L12.1005 1.47113L11.8563 1.22746ZM12.9528 1.22746L12.7086 1.47113L12.7089 1.47141L12.9528 1.22746ZM1.11665 11.9671L0.872699 11.7231L0.872698 11.7231L1.11665 11.9671ZM9.60103 3.4827L9.84498 3.23874L9.60103 2.99479L9.35708 3.23874L9.60103 3.4827ZM12.5173 6.39896L12.7611 6.64302L13.0053 6.39907L12.7612 6.15501L12.5173 6.39896ZM4.02514 14.8833L3.7813 14.6393L3.77482 14.6457L3.7687 14.6525L4.02514 14.8833ZM15.0165 4.38767C15.4545 3.94965 15.4545 3.24127 15.0165 2.80325L14.5286 3.29116C14.6972 3.45972 14.6972 3.73121 14.5286 3.89977L15.0165 4.38767ZM13.5934 5.81081L15.0165 4.38767L14.5286 3.89977L13.1055 5.3229L13.5934 5.81081ZM10.1892 2.89454L13.1055 5.81081L13.5934 5.3229L10.6771 2.40664L10.1892 2.89454ZM11.6123 0.983505L10.1892 2.40664L10.6771 2.89454L12.1002 1.47141L11.6123 0.983505ZM12.4046 0.655C12.1072 0.655 11.8221 0.773291 11.6121 0.98378L12.1005 1.47113C12.1811 1.39038 12.2905 1.345 12.4046 1.345V0.655ZM13.197 0.98378C12.987 0.773291 12.7019 0.655 12.4046 0.655V1.345C12.5186 1.345 12.628 1.39038 12.7086 1.47113L13.197 0.98378ZM15.0165 2.80325L13.1968 0.983505L12.7089 1.47141L14.5286 3.29116L15.0165 2.80325ZM0.655 12.247V14.6112H1.345V12.247H0.655ZM0.872698 11.7231C0.73097 11.8649 0.655 12.0456 0.655 12.247H1.345C1.345 12.2346 1.34701 12.2295 1.34762 12.2281C1.34826 12.2265 1.35077 12.2209 1.3606 12.211L0.872698 11.7231ZM9.35708 3.23874L0.872699 11.7231L1.3606 12.211L9.84498 3.72665L9.35708 3.23874ZM12.7612 6.15501L9.84498 3.23874L9.35708 3.72665L12.2733 6.64291L12.7612 6.15501ZM4.26898 15.1274L12.7611 6.64302L12.2734 6.15489L3.7813 14.6393L4.26898 15.1274ZM3.75295 15.345C3.93934 15.345 4.13823 15.2734 4.28157 15.1141L3.7687 14.6525C3.77018 14.6509 3.77063 14.6513 3.76801 14.6524C3.76502 14.6536 3.75974 14.655 3.75295 14.655V15.345ZM1.38883 15.345H3.75295V14.655H1.38883V15.345ZM0.655 14.6112C0.655 15.0194 0.980549 15.345 1.38883 15.345V14.655C1.3725 14.655 1.36274 14.6493 1.35671 14.6433C1.35069 14.6372 1.345 14.6275 1.345 14.6112H0.655Z" fill="#6C6C6C"/>
                                </Svg>
                            </TouchableOpacity>
                        )
                    }
                }),
            [navigation])
    })

    const [reload, setReload] = useState(false)
    //const [data, setData] = useState([])
    const data = useSelector(state => state.others.userInfo)
    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const init = true
    const [roll, setRoll] = useState('default')

    //console.log('data', data)

    const initiate = () => {
        // AppFetch.getWithToken("getFullUserInfo", {}, {}, navigation).then(response => {
        //     //console.log(response)
        //     if(response.result) {
        //         setData(response.data)
        //     }
        // })
        //dispatch(getGlobalUserInfo(true))
        //console.log('ok')
    }

    useEffect(() => {
        DB.getUser().then(user => {
            if(!user.token) LinkTo("AuthorizationScreen", {
                Authorized: false
            }, navigation)
            else
                dispatch(getGlobalUserInfo({navigation, forced: true}))
        })

        //initiate()

        if(Platform.OS == "ios") {
            InAppPurchases.connectAsync().then(async (res) => {
                const { responseCode, results } = await InAppPurchases.getProductsAsync(itemsInfo)
                // console.log('products', results)
                // globalAlert({
                //     title: 'Products',
                //     text: JSON.stringify(results)
                // })
                if (responseCode === InAppPurchases.IAPResponseCode.OK)
                    setProducts(results)
            }).catch(error => {
                console.log('error connection' + error)
            })

            InAppPurchases.setPurchaseListener(({ responseCode, results, errorCode }) => {
                //console.log('resultsresults123', results, responseCode)
                if (responseCode === InAppPurchases.IAPResponseCode.OK) {
                    results.forEach(purchase => {
                        if (!purchase.acknowledged) {
                            //console.log('purchase2222222', purchase)
                            const formData = new FormData
                            for(let jsonName in purchase) {
                                formData.append(jsonName, purchase[jsonName])
                            }
                            //console.log('formData',  dformData)
                            AppFetch.postWithToken("checkingIosPurchase", formData, {}, {}, navigation).then(result => {

                                if(result.result) {
                                    //console.log('resultPurchasingCheck', result)
                                    dispatch(getGlobalUserInfo({navigation, forced: true}))
                                    setReload(!reload)
                                }
                            }).catch(err => {
                                console.log('problem is' + err)
                            })
                            InAppPurchases.finishTransactionAsync(purchase, true).then()
                        }
                    });
                } else if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
                    globalAlert({
                        title: 'Вы отменили транзакцию.',
                        text: "Подписка не была активирована."
                    })
                } else if (responseCode === InAppPurchases.IAPResponseCode.DEFERRED) {
                    globalAlert({
                        title: 'У вас нет разрешений на покупку.'
                    })
                } else {
                    console.warn(`Something went wrong with the purchase. Received errorCode ${errorCode}`);
                }
            });
        }
    }, [init])

    const tabIs = () => {
        switch (roll) {
            case "is_seller":
                return <AppSellerTab
                    data={data}
                    navigation={navigation}
                    products={products}
                    //onChange={() => {
                    //    initiate()
                    //}}
                />
            case "is_decorator":
                return <AppMasterTab
                    products={products}
                    screenWidth={screeWidth}
                    data={data}
                    navigation={navigation}
                    //onChange={() => {
                    //    initiate()
                    //}}
                />
            case "is_partymaker":
                return <AppEventTab
                    navigation={navigation}
                    products={products}
                    data={data}
                    //onChange={() => {
                    //    initiate()
                    //}}
                />
            default:
                return <AppDefaultTab
                    navigation={navigation}
                    products={products}
                    data={data}
                />
        }
    }

    //console.log('data', data)

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    //console.log('loadMore', loadMore)

    try {
        if(typeof data == "object") {
            return (
                <AppWrap
                    scroll={{paddingLeft: 0, paddingRight: 0, marginBottom: 0}}
                >
                    <AppProfilePhotoBlock
                        color={THEME.GREY_TEXT}
                        data={data}
                    />
                    <AppAddressBlock
                        data={data}
                    />
                    <View style={styles.container}>
                        <AppSocPassive
                            data={data}
                        />
                    </View>
                    <AppRollsBlock
                        value={roll}
                        onResult={type => {
                            setRoll(type)
                        }}
                    />
                    {tabIs()}
                    <View style={{height: 50}}></View>
                </AppWrap>
            )
        } return <></>
    } catch (e) {return <></>}
}

const styles = StyleSheet.create({
    btnSave: {
        width: 120,
        marginTop: 30,
        marginBottom: 30,
        marginLeft: "auto",
        marginRight: "auto"
    },

    title: {
        textAlign: "center"
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20
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
            return <></>
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
            <AppIndicator timer={.5} />
        </>
    )
}

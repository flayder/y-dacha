import React, {useLayoutEffect, useState, useEffect, useRef} from "react"
import {View, StyleSheet, Dimensions, Image} from "react-native"
import {AppWrap} from "../ui/AppWrap";
import {createDrawerNavigator} from "@react-navigation/drawer"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import MapView, {Marker, Callout} from 'react-native-maps'
import Geocoder from 'react-native-geocoding'
import {AppTextBold} from "../ui/AppTextBold";
import {AppFetch} from "../AppFetch";
import {getRandomKey, globalRouteFun, GOOGLE_API_KEY} from "../../global";
import AppMapItemShopOpened from "../ui/map/AppMapItemShopOpened";
import AppSwitcher from "../ui/AppSwitcher";
import {AppText} from "../ui/AppText";
import * as Linking from "expo-linking";
import AppSelectRegions from "../ui/AppSelectRegions";
import {THEME} from "../../theme";

const pageWrapper = ({navigation, route}) => {
    let id = 0
    let cultureId = 0
    //console.log('route.params', route.params)
    if(route.params !== undefined) {

        if(route.params.hasOwnProperty('masterId')) {
            id = route.params.masterId
        }

        if(route.params.hasOwnProperty('cultureId')) {
            cultureId = route.params.cultureId
        }
    }

    // if(id === 0) {
    //     return (
    //         <AppTextBold>
    //             Неверные данные!
    //         </AppTextBold>
    //     )
    // }

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
                    routeName: "ShopsPageScreen"
                }),
            [navigation])
    })

    const init = true
    const initial = useRef(false)
    const data = useRef([])
    const [reload, setReload] = useState(false)
    const [render, setRender] = useState(true)
    const [allCulture, setAllCulture] = useState((!id && cultureId > 0))
    const [regions, setRegions] = useState([])
    const [region, setRegion] = useState(0)
    const mapRef = useRef()

    const grabAddress = async (item) => {
        Geocoder.init(GOOGLE_API_KEY)
        const firstItem = item.data.addresses[0]
        const mapInfo = await Geocoder.from(firstItem)
        const items = []
        let location = mapInfo.results[0].geometry.location
        //console.log('location', location)
        if(location.hasOwnProperty('lat') && location.hasOwnProperty('lng')) {
            initial.current = location

            let obj = item.data.hasOwnProperty('user') ? item.data.user : {}
            obj.title = item.data.name
            obj.description = item.data.description
            obj.emblem = item.data.emblem

            items.push({
                coordinates: location,
                address: firstItem,
                ...obj
            })

            const addresses = item.data.addresses
            for(let i = 1; i < addresses.length; i++) {
                let result = await Geocoder.from(addresses[i])
                let location = result.results[0].geometry.location
                items.push({
                    address: addresses[i],
                    coordinates: location,
                    ...obj
                })
            }

            //console.log('items', items)

        }
        return Promise.resolve(items)
    }

    const grabAddressAll = async (item) => {
        //console.log('ssss', item)
        const items = []
        Geocoder.init(GOOGLE_API_KEY)
        const firstItem = item.addresses[0]
        const mapInfo = await Geocoder.from(firstItem)
        let location = mapInfo.results[0].geometry.location
        //console.log('location', location)
        if(location.hasOwnProperty('lat') && location.hasOwnProperty('lng')) {
            initial.current = location

            let obj = item.hasOwnProperty('user') ? item.user : {}
            obj.title = item.name
            obj.description = item.description
            obj.emblem = item.emblem

            items.push({
                coordinates: location,
                address: firstItem,
                ...obj
            })

            const addresses = item.addresses
            for(let i = 1; i < addresses.length; i++) {
                let result = await Geocoder.from(addresses[i])
                let location = result.results[0].geometry.location
                items.push({
                    address: addresses[i],
                    coordinates: location,
                    ...obj
                })
            }
        }
        //console.log('items', items)
        const result = await Promise.all(items)

        return result
    }

    const parseData = async (data) => {
        const items = []

        for(let i = 0; i < data.length; i++) {
            if (data[i].hasOwnProperty('addresses') && data[i].addresses.length > 0) {
                const addresses = await grabAddressAll(data[i])
                if(Array.isArray(addresses)) {
                    addresses.map(addr => {
                        items.push(addr)
                    })
                }

            }
        }

        const result = await Promise.all(items)
        return result
    }

    const initiate = (region = 0) => {
        //console.log('allCulture || cultureId', allCulture, cultureId)
        if(region > 0) {
            AppFetch.getWithToken("getShopsByRegionID", {
                region,
                cultureId
            }, {}, navigation).then(async (result) => {
                if (result.result) {
                    //console.log('result', result.data)
                    const items = []
                    if(Array.isArray(result.data)) {
                        const items = await parseData(result.data)
                        data.current = items
                        //console.log('result.result', items)
                        setReload(!reload)
                    }
                }
            })
        } else {
            if(!allCulture || cultureId <= 0) {
                AppFetch.getWithToken("getShop", {
                    id
                }, {}, navigation).then(async (item) => {
                    if (item.result) {
                        //console.log('item', item)
                        if (item.data.hasOwnProperty('addresses') && item.data.addresses.length > 0) {
                            const items = await grabAddress(item)
                            data.current = items
                            setReload(!reload)
                        }
                    }
                })
            } else {
                AppFetch.getWithToken("getShop", {
                    id,
                    cultureId
                }, {}, navigation).then(async (result) => {
                    //console.log('result.result', result)
                    if (result.result) {
                        const items = []
                        if(Array.isArray(result.data)) {
                            const items = await parseData(result.data)
                            data.current = items
                            setReload(!reload)
                        }
                    }
                })
            }
        }
    }

    useEffect(() => {
        AppFetch.getWithToken("getShopsRegions", {}, {}, navigation).then(response => {
            if(response.result) {
                setRegions(response.data)
            }
        })
    }, [init])

    useEffect(() => {
        //console.log('cultureId', cultureId)
        initiate()
    }, [init, allCulture])

    const initiationCoordinates = {
        latitude: initial.current.lat,
        longitude: initial.current.lng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    }

    useEffect(() => {
        if(mapRef.current !== undefined && initiationCoordinates.latitude !== undefined && initiationCoordinates.longitude !== undefined) {
            //console.log('initiationCoordinates', initiationCoordinates)
            setTimeout(() => {
                mapRef.current.animateToRegion({
                    latitude: initiationCoordinates.latitude,
                    longitude: initiationCoordinates.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                })
            }, 500)
        }
    })

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            <View style={styles.container}>
                <AppTextBold style={styles.title}>
                    Карта
                </AppTextBold>
                <View style={styles.selectWrap}>
                    {
                        regions.length > 0
                            ?
                            <AppSelectRegions
                                preText={"Ваш регион: "}
                                showDefaultTitle={false}
                                fullRegions={false}
                                dataRegions={regions}
                                defaultIs={region}
                                backgroundColor={THEME.GREY}
                                borderColor={THEME.GREY}
                                color={"#fff"}
                                onResult={text => {
                                    text = text > 0 ? text : 0
                                    setRegion(text)
                                    initiate(text)
                                }}
                            />
                            :
                            <></>
                    }
                </View>
                {
                    cultureId > 0
                        ?
                        <View style={styles.mapText}>
                            <AppText style={styles.mapTextNative}>
                                Показать всех продавцов этой культуры
                            </AppText>
                            <View style={{width: 5}}></View>
                            <AppSwitcher defaultIs={allCulture} onResult={result => {
                                setAllCulture(result)
                            }} />
                        </View>
                        :
                        <></>
                }
                {
                    data.current.length > 0
                        ?
                        <MapView
                            ref={mapRef}
                            loadingEnabled={true}
                            provider={"google"}
                            zoomEnabled={true}
                            scrollEnabled={true}
                            showsScale={true}
                            initialRegion={initiationCoordinates}
                            style={styles.map}
                        >
                            {
                                data.current.map(item => {
                                    return <Marker
                                        key={getRandomKey()}
                                        coordinate={{
                                            latitude: item.coordinates.lat,
                                            longitude : item.coordinates.lng
                                        }}
                                    >
                                        <Image
                                            source={{uri: item.emblem}}
                                            style={styles.mapImg}
                                        />
                                        <Callout
                                            tooltip={true}
                                            onPress={async () => {
                                                if(item.hasOwnProperty('infoShop') && item.infoShop.hasOwnProperty('site') && item.infoShop.site)
                                                    await Linking.openURL(item.infoShop.site)

                                                setRender(!render)
                                            }}
                                        >
                                            <AppMapItemShopOpened
                                                data={item}
                                                route={route}
                                                navigation={navigation}
                                            />
                                        </Callout>
                                    </Marker>
                                })
                            }
                        </MapView>
                        :
                        <></>
                }

            </View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    mapTextNative: {
        fontSize: 14,
        marginTop: 0,
        marginBottom: 0
    },
    mapText: {
        position: "relative",
        zIndex: 99,
        top: 50,
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: -20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    mapImg: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    selectWrap: {
        paddingLeft: 20,
        paddingRight: 20,
        position: "relative",
        width: "100%",
        zIndex: 999,
        elevation: 4,
        marginBottom: 30
    },
    title: {
        textAlign: "center"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 200,
    },
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
                // drawerContent={
                //     ({navigation}) => <AppFilter navigation={navigation} />
                // } drawerPosition="left"
            >
                <Drawer.Screen name="InsidePageScreen" component={PageTab} />
            </Drawer.Navigator>
            <AppIndicator timer={2} />
        </>
    )
}

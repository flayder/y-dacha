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
import AppMapItemOpened from "../ui/map/AppMapItemOpened";
import {AppFetch} from "../AppFetch";
import {getRandomKey, globalRouteFun, GOOGLE_API_KEY} from "../../global";
import {THEME} from "../../theme";
import AppSelectRegions from "../ui/AppSelectRegions";

const pageWrapper = ({navigation, route}) => {
    let id = 0
    //console.log('route.params', route.params)
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
                    routeName: "MasterDetailPageScreen"
                }),
            [navigation])
    })

    const init = true
    const initial = useRef({})
    const data = useRef([])
    const [reload, setReload] = useState(false)
    const [render, setRender] = useState(true)
    const [regions, setRegions] = useState([])
    const [region, setRegion] = useState(0)
    const mapRef = useRef()

    const setGlobalData = async (dataIs) => {
        Geocoder.init(GOOGLE_API_KEY)
        if(typeof dataIs == "object" && dataIs.hasOwnProperty('regtown')) {
            const mapInfo = await Geocoder.from(dataIs.regtown)
            const items = []
            try {
                let location = mapInfo.results[0].geometry.location
                if(location.hasOwnProperty('lat') && location.hasOwnProperty('lng')) {
                    initial.current = location
                    dataIs.coordinates = location
                    //console.log('items', items)
                }
            } catch (e) {}
        }

        //console.log('ssss', dataIs)
        return Promise.resolve(dataIs)
    }

    const parseData = async (data) => {
        const items = []
        //console.log('sjjsjsjs', data)
        for(let i = 0; i < data.length; i++) {
            const res = await setGlobalData(data[i])
            items.push(res)
        }

        const result = await Promise.all(items)
        return result
    }
    const initiate = (region = 0) => {
        //console.log('region', region)
        if(region > 0) {
            AppFetch.getWithToken("getMastersByRegionID", {
                region
            }, {}, navigation).then(async response => {
                //console.log('response', response)
                if(response.result) {
                    const items = await parseData(response.data)

                    //console.log('items11111', items)
                    data.current = items
                    setReload(!reload)
                }
            })
        } else {
            AppFetch.getWithToken("getMaster", {
                id
            }, {}, navigation).then(async item => {
                if(item.result) {
                    const items = []
                    const itemIs = await setGlobalData(item.data)
                    items.push(itemIs)
                    //console.log('items', items)
                    data.current = items
                    setReload(!reload)
                }
            })
        }
    }

    useEffect(() => {
        initiate()

        AppFetch.getWithToken("getMasterRegions", {}, {}, navigation).then(response => {
            if(response.result) {
                setRegions(response.data)
            }
        })
    }, [init])

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
                                    if(
                                        item.hasOwnProperty('coordinates') && item.coordinates.hasOwnProperty('lat')
                                        &&
                                        item.hasOwnProperty('coordinates') && item.coordinates.hasOwnProperty('lng')
                                    ) {
                                        return <Marker
                                            key={getRandomKey()}
                                            coordinate={{
                                                latitude: item.coordinates.lat,
                                                longitude : item.coordinates.lng
                                            }}
                                        >
                                            <Image
                                                source={{uri: item.photo}}
                                                style={styles.mapImg}
                                            />
                                            <Callout
                                                onPress={() => {

                                                    setRender(!render)
                                                }}
                                            >
                                                <AppMapItemOpened
                                                    data={item}
                                                    route={route}
                                                    navigation={navigation}
                                                />
                                            </Callout>
                                        </Marker>
                                    }
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
        elevation: 999,
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

export default ({navigation, route}) => {
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

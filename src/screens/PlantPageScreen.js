import React, {useLayoutEffect, useEffect, useState, useRef} from "react"
import {StyleSheet, Dimensions, View} from "react-native"
import {AppWrap} from "../ui/AppWrap";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {globalAlert, mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import {AppTextBold} from "../ui/AppTextBold";
import {THEME} from "../../theme";
import {AppFetch} from "../AppFetch";
import {
    getRandomKey, globalRouteFun
} from "../../global";
import AppEmptyText from "../ui/AppEmptyText";
import AppSelectModified from "../ui/AppSelectModified";
import AppPlantPanel from "../ui/plantPageScreen/AppPlantPanel";
import AppPlantItem from "../ui/plantPageScreen/AppPlantItem";

const pageWrapper = ({navigation, route}) => {
    let id = 0
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('eventId')) {
            id = route.params.eventId
        }
    }
    useLayoutEffect(() => {
        navigation.setOptions(
            mainHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "EventsPageScreen"
                }),
            [navigation])
    })

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    const init = true
    const items = useRef([])
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    const type = useRef("")
    const filter = useRef([])
    const deletable = useRef([])
    const setFilter = () => {
        const arr = []
        items.current.map(item => {
            if(item.culture_id == type.current || !type.current) arr.push(item)
        })

        setData(arr)
        setLoad(!load)
    }

    const configureFilter = (data) => {
        const arr = []
        data.map(item => {
            if(!arr.includes(item.culture_id)) {
                arr.push(item.culture_id)
                filter.current.push({
                    name: item.culture_name,
                    value: item.culture_id
                })
            }
        })

        //console.log('filter.current', filter.current)
    }

    const initiate = () => {
        AppFetch.getWithToken('getMyPlants', {}, {}, navigation).then(response => {
           //console.log('response', response)
           if(response.result) {
               configureFilter(response.data)
               items.current = response.data
               setFilter()
           }
        })
    }
    useEffect(() => {
        initiate()
    }, [init])

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            <AppTextBold style={styles.title}>
                Мои растения
            </AppTextBold>
            <View style={styles.selectBlock}>
                <AppSelectModified
                    style={styles.select}
                    selectStyle={styles.selectStyle}
                    itemStyle={styles.itemStyle}
                    title={"Кульутра (все)"}
                    data={filter.current}
                    color={"#fff"}
                    colorOpened={THEME.EVENT_COLOR}
                    onResult={res => {
                        //console.log('res', res)
                        type.current = res
                        setFilter()
                    }}
                />
            </View>
            <AppPlantPanel
                onDelete={async () => {
                    globalAlert(
                        {
                            title: "Вы уверены что хотите удалить растения?",
                            okButtonText: "Да",
                            cancelButtonText: "Нет",
                            async onOkFun() {
                                await AppFetch.getWithToken("deleteMyPlants", {
                                    data: JSON.stringify(deletable.current)
                                }, {}, navigation)
                                initiate()
                            }
                        })
                }}
            />
            <View style={styles.product}>
                {
                    data.length
                        ?
                        data.map(item => {
                            return <AppPlantItem
                                onResultActive={active => {
                                    if(deletable.current.includes(item.plant_id)) {
                                        if(!active) {
                                            deletable.current.splice(deletable.current.indexOf(item.plant_id), 1)
                                        }
                                    } else {
                                        if(active) {
                                            deletable.current.push(item.plant_id)
                                        }
                                    }
                                }}
                                style={styles.pr}
                                key={getRandomKey()}
                                navigation={navigation}
                                item={item}
                            />
                        })
                        :
                        <AppEmptyText text={"Список моих растений пуст"} />
                }
            </View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    pr: {
        width: "32%"
    },
    selectBlock: {
        position: "relative",
        zIndex: 5,
        width: 200,
        marginLeft: "auto",
        marginRight: "auto"
    },
    title: {
        textAlign: "center"
    },
    itemStyle: {
        color: "#fff",
        backgroundColor: THEME.FOOTER_BG
    },
    select: {
        backgroundColor: THEME.FOOTER_BG
    },
    selectStyle: {
        backgroundColor: THEME.FOOTER_BG
    },
    product: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    radioBlock: {
        padding: 20,
        paddingTop: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    radio: {
        width: "33.3332%"
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

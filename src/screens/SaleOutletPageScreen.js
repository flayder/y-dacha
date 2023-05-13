import React, {useLayoutEffect, useEffect, useState, useRef} from "react"
import {View, StyleSheet, TouchableOpacity, Dimensions, TextInput, Platform, ScrollView} from "react-native"
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {globalAlert, titleHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import {Svg, Path, Circle} from "react-native-svg";
import {AppText} from "../ui/AppText";
import {THEME} from "../../theme";
import {addToArrayOrRemove, getRandomKey, globalRouteFun} from "../../global";
import {AppWrap} from "../ui/AppWrap";
import AppSaleOutletPoint from "../ui/saleOutletPageScreen/AppSaleOutletPoint";
import {AppAuthorizeInput} from "../ui/AppAuthorizeInput";
import AppSaleTitle from "../ui/saleOutletPageScreen/AppSaleTitle";
import {AppBlueButton} from "../ui/AppBlueButton";
import {AppFetch} from "../AppFetch";
import AppEmptyText from "../ui/AppEmptyText";
import AppSelectRegions from "../ui/AppSelectRegions";

const pageWrapper = ({navigation, route}) => {
    useLayoutEffect(() => {
        navigation.setOptions(
            titleHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "MasterDetailPageScreen",
                    titleName: "Редактирование точек продаж",
                    mainIcon: true
                }),
            [navigation])
    })
    const [reload, setReload] = useState(false)
    const [data, setData] = useState([])
    const [day, setDay] = useState([])
    const place = useRef("")
    const region = useRef(0)
    const init = true
    const time = useRef({
        fromHour: "",
        fromMinute: "",
        toHour: "",
        toMinute: ""
    })
    const [currentPoint, setCurrentPoint] = useState(0)

    const configureData = (data, num = false) => {
        let currentPoint = (currentPoint) ? currentPoint : 0
        if(num && parseInt(num) >= 0) {
            currentPoint = num
        }
        if(data[currentPoint] !== undefined) {
            //console.log(data[currentPoint])
            if(data[currentPoint].hasOwnProperty("place") && data[currentPoint].place != "") {
                place.current = data[currentPoint].place
            } else {
                place.current = ""
            }

            if(data[currentPoint].hasOwnProperty("region") && data[currentPoint].region != "") {
                region.current = data[currentPoint].region
            } else {
                region.current = ""
            }

            if(data[currentPoint].hasOwnProperty("time") && data[currentPoint].time != "") {
                const timeArr = data[currentPoint].time.split(" ")
                if(timeArr[1] !== undefined && timeArr[1].indexOf(":") !== -1) {
                    const from = timeArr[1].split(":")
                    time.current.fromHour = from[0]
                    time.current.fromMinute = from[1]
                }

                if(timeArr[3] !== undefined && timeArr[3].indexOf(":") !== -1) {
                    const to = timeArr[3].split(":")
                    time.current.toHour = to[0]
                    time.current.toMinute = to[1]
                }
            } else {
                time.current.fromHour = ""
                time.current.fromMinute = ""
                time.current.toHour = ""
                time.current.toMinute = ""
            }

            if(data[currentPoint].hasOwnProperty("weekDays") && data[currentPoint].weekDays) {
                let arr = JSON.parse(data[currentPoint].weekDays)
                if(!Array.isArray(arr)) arr = []
                setDay(arr)
            } else {
                setDay([])
            }
        }
    }

    let androidInput = {}

    if(Platform.OS == "android") androidInput = {
        paddingTop: 0,
        paddingBottom: 0,
        height: 25,
    }

    const initiate = async (currentItem = false) => {
        const response = await AppFetch.getWithToken("getSaleOutlets", {}, {}, navigation)
        //console.log('responseresponseresponse', response)
        if(response.result) {
            configureData(response.data, currentItem)
            //console.log('response.data', response.data)
            setData(response.data)
        }
    }

    useEffect(() => {
        initiate()
    }, [init])

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    const addPoint = async () => {
        const response = await AppFetch.getWithToken("addSaleOutlet", {}, {}, navigation)
        //console.log('add', response)

        if(response.result) initiate(data.length + 1)
    }

    const removePoint = async () => {
        const id = (data.length > 0 && data[currentPoint] !== undefined && data[currentPoint].hasOwnProperty('id')) ? data[currentPoint].id : 0
        globalAlert(
            {
                title: "Вы точно хотите удалить эту точку?",
                okButtonText: "Да",
                cancelButtonText: "Нет",
                async onOkFun() {
                    if(id > 0) {
                        const response = await AppFetch.getWithToken("removeSaleOutlet", {id}, {}, navigation)

                        if (response.result) {
                            setCurrentPoint(0)
                            initiate(0)
                        }
                    }
                }
            }
       )
    }

    const saveOutlet = async (num) => {
        const id = (data.length > 0 && data[currentPoint] !== undefined && data[currentPoint].hasOwnProperty('id')) ? data[currentPoint].id : 0
        //console.log('id', data)
        if(id > 0) {
            let error = false
            if(place.current == "") {
                error = true
                globalAlert({title: "Вы не указали адрес"})
            } else if (region.current <= 0) {
                error = true
                globalAlert({
                    title: "Вы не выбрали регион точки продаж"
                })
            } else if (day.length == 0) {
                error = true
                globalAlert({title: "Вы не выбрали режим работы"})
            } else if (
                time.current.fromHour == "" ||
                time.current.fromMinute == "" ||
                time.current.toHour == "" ||
                time.current.toMinute == ""
            ) {
                error = true
                globalAlert({title: "Некорректно указано время работы. Пример \"с 7:00 до 19:00\""})
            }

            if(!error) {
                const params = {
                    id,
                    place: place.current,
                    region: region.current,
                    days: JSON.stringify(day),
                    time: `с ${time.current.fromHour}:${time.current.fromMinute} до ${time.current.toHour}:${time.current.toMinute}`
                }
                const response = await AppFetch.getWithToken("updateSaleOutlet", params, {}, navigation)
                //console.log('resss', response)
                if(response.result) {
                    globalAlert({
                        title: "Точка продаж успешно обновлена"
                    })
                    initiate(num)
                }
            }
        } else
            globalAlert({
                title: "Вы не добавили точку продаж"
            })
    }

    //console.log('loadMore', loadMore)

    const month = [
        {
            name: "Пн",
            value: 1
        },
        {
            name: "Вт",
            value: 2
        },
        {
            name: "Ср",
            value: 3
        },
        {
            name: "Чт",
            value: 4
        },
        {
            name: "Пт",
            value: 5
        },
        {
            name: "Сб",
            value: 6
        },
        {
            name: "Вс",
            value: 7
        }
    ]

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            <View style={styles.topPanelBlock}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.topPanelBtn}
                    onPress={addPoint}
                >
                    <View style={styles.topPanelIcon}>
                        <Svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Circle cx="17" cy="17" r="17" fill="#5382D8"/>
                            <Path d="M18.4539 15.3736C18.4539 15.4288 18.4987 15.4736 18.5539 15.4736H25.9C25.9552 15.4736 26 15.5184 26 15.5736V17.1698C26 17.225 25.9552 17.2698 25.9 17.2698H18.5539C18.4987 17.2698 18.4539 17.3146 18.4539 17.3698V24.9C18.4539 24.9552 18.4091 25 18.3539 25H16.4928C16.4376 25 16.3928 24.9552 16.3928 24.9V17.3698C16.3928 17.3146 16.348 17.2698 16.2928 17.2698H9.1C9.04477 17.2698 9 17.225 9 17.1698V15.5736C9 15.5184 9.04477 15.4736 9.1 15.4736H16.2928C16.348 15.4736 16.3928 15.4288 16.3928 15.3736V8.1C16.3928 8.04477 16.4376 8 16.4928 8H18.3539C18.4091 8 18.4539 8.04477 18.4539 8.1V15.3736Z" fill="white"/>
                        </Svg>

                    </View>
                    <AppText style={{...styles.topPanelText, color: THEME.BLUE}}>
                        Добавить {"\n"}
                        точку продаж
                    </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.topPanelBtn}
                    onPress={removePoint}
                >
                    <View style={styles.topPanelIcon}>
                        <Svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Circle cx="17" cy="17" r="17" fill="#53588A"/>
                            <Path d="M18.4539 15.4736H25.9C25.9552 15.4736 26 15.5184 26 15.5736V17.1699C26 17.2251 25.9552 17.2699 25.9 17.2699H18.4539H16.3928H9.1C9.04477 17.2699 9 17.2251 9 17.1699V15.5736C9 15.5184 9.04477 15.4736 9.1 15.4736H16.3928H18.4539Z" fill="white"/>
                        </Svg>
                    </View>
                    <AppText style={{...styles.topPanelText, color: THEME.FOOTER_BG}}>
                        Удалить {"\n"}
                        точку продаж
                    </AppText>
                </TouchableOpacity>
            </View>

            {
                data.length > 0
                    ?
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={styles.contentContainer}
                    >
                        {
                            data.map((item, key) => {
                                return <AppSaleOutletPoint
                                    key={getRandomKey()}
                                    number={key + 1}
                                    active={key == currentPoint}
                                    place={item.place}
                                    data={data}
                                    onPress={num => {
                                        setCurrentPoint(num)

                                        setTimeout(() => {
                                            configureData(data, num)
                                        }, 200)
                                    }}
                                />
                            })
                        }
                    </ScrollView>
                    :
                    <AppEmptyText text={"Здесь пока еще нет точек продаж"} />
            }

            <View style={styles.container}>
                <AppSelectRegions
                    preText={"Ваш регион: "}
                    showDefaultTitle={false}
                    defaultIs={region.current}
                    style={{marginBottom: 10}}
                    onResult={text => {
                        region.current = text
                        setReload(!reload)
                    }}
                />
                <AppAuthorizeInput
                    placeholder={"Укажите адрес"}
                    onChangeText={text => {
                        place.current = text
                        setReload(!reload)
                    }}
                    value={place.current}
                />
                <AppSaleTitle title={"Укажите режим работы"} />
                <View style={styles.month}>
                    {
                        month.map(item => {
                            //console.log('day.includes(item.value)', day.includes(item.value))
                            const activeBtn = day.includes(item.value) ? {backgroundColor: THEME.ORANGE} : {}
                            const colorBtn = day.includes(item.value) ? {color: "#fff"} : {color: THEME.PLACEHOLDER}
                            return <TouchableOpacity
                                activeOpacity={1}
                                key={getRandomKey()}
                                style={{...styles.day, ...activeBtn}}
                                onPress={() => {
                                    const arr = addToArrayOrRemove(item.value, day)
                                    setDay(arr)
                                    setReload(!reload)
                                }}
                            >
                                <AppText style={{...styles.dayText, ...colorBtn}}>
                                    {item.name}
                                </AppText>
                            </TouchableOpacity>
                        })
                    }
                </View>
                <AppSaleTitle title={"Укажите время работы"} />
                <View style={styles.timeBlock}>
                    <AppText style={styles.letter}>с</AppText>
                    <TextInput
                        style={{...styles.input, ...androidInput}}
                        onChangeText={text => {
                            time.current.fromHour = text
                            setReload(!reload)
                        }}
                        value={time.current.fromHour}
                    />
                    <AppText style={styles.letter}>:</AppText>
                    <TextInput
                        style={{...styles.input, ...androidInput}}
                        onChangeText={text => {
                            time.current.fromMinute = text
                            setReload(!reload)
                        }}
                        value={time.current.fromMinute}
                    />
                    <AppText style={styles.letter}>до</AppText>
                    <TextInput
                        style={{...styles.input, ...androidInput}}
                        onChangeText={text => {
                            time.current.toHour = text
                            setReload(!reload)
                        }}
                        value={time.current.toHour}
                    />
                    <AppText style={styles.letter}>:</AppText>
                    <TextInput
                        style={{...styles.input, ...androidInput}}
                        onChangeText={text => {
                            time.current.toMinute = text
                            setReload(!reload)
                        }}
                        value={time.current.toMinute}
                    />
                </View>
                <AppBlueButton
                    style={styles.btn}
                    onPress={() => {
                        saveOutlet(currentPoint)
                    }}
                >
                    Сохранить
                </AppBlueButton>
            </View>
            <View style={{height: 50}}></View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 140,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 30
    },
    timeBlock: {
        flexDirection: "row",
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: "center"
    },
    letter: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 0,
        marginBottom: 0
    },
    input: {
        width: 50,
        borderBottomWidth: 1
    },
    dayText: {
        marginTop: 0,
        marginBottom: 0
    },
    month: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: THEME.GREY,
        paddingBottom: 10,
        marginBottom: 10
    },
    day: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    topPanelText: {
        paddingLeft: 10
    },
    topPanelBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20
    },
    topPanelBtn: {
        flexDirection: "row",
        alignItems: "center"
    },
    contentContainer: {
        paddingLeft: 20,
        paddingTop: 10
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
            <AppIndicator timer={.5} />
        </>
    )
}

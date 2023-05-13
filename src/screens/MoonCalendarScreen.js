import React, {useLayoutEffect, useEffect, useState, useRef} from "react"
import {StyleSheet, ImageBackground, TouchableOpacity, Image, View, ScrollView, Dimensions} from "react-native"
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppWrap} from "../ui/AppWrap";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {globalAlert, mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import {THEME} from "../../theme";
import AppMoontem from "../ui/moonCalendarPage/AppMoontem";
import {Svg, Path} from "react-native-svg";
import {getCalendarActiveColor, getRandomKey, globalRouteFun} from "../../global";
import moment from "moment";
import AppDateSelect from "../ui/moonCalendarPage/AppDateSelect";
import AppYearSelect from "../ui/moonCalendarPage/AppYearSelect";
import AppConditionBlock from "../ui/moonCalendarPage/AppConditionBlock";
import AppCalendarUsual from "../ui/AppCalendarUsual";
import AppButton from "../ui/AppButton";
import {AppFetch} from "../AppFetch";

const pageWrapper = ({navigation, route}) => {
    // if(id === 0) {
    //    return (
    //        <AppTextBold>
    //            Неверные данные!
    //        </AppTextBold>
    //    )
    // }
    useLayoutEffect(() => {
        navigation.setOptions(
            mainHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "SortPageScreen",
                    backgroundColor: THEME.FOOTER_BG,
                    style: {
                        elevation: 0,
                        shadowOpacity: 0
                    }
                }),
            [navigation])
    })

    //console.log('id', id)

    const init = true
    const [date, setDate] = useState(moment())
    const [reload, setReload] = useState(false)
    const plants = useRef([])
    const actions = useRef([])
    const [data, setData] = useState([])
    const preview = useRef(false)
    const operation_id = useRef(0)
    const monthValue = useRef(moment().format("MM"))
    const yearValue = useRef(moment().format("YYYY"))
    const sortsValue = useRef([])
    const initiate = () => {
        AppFetch.getWithToken("getMoonData", {}, {}, navigation).then(result => {
            //console.log(result)
            if(result.result) {
                //console.log('result.data.plants', result.data.plants)
                if(result.data.hasOwnProperty('plants')) plants.current = result.data.plants
                if(result.data.hasOwnProperty('actions')) actions.current = result.data.actions
                setReload(!reload)
            }
        })
    }

    const setMoonCalendar = async () => {
        // console.log('month', monthValue.current)
        // console.log('year', yearValue.current)
        // console.log('plants', sortsValue.current)
        // console.log('operation', operation_id.current)
        let error = false
        if(!monthValue.current) {
            error = true
            globalAlert({title: "Вы не выбрали месяц"})
        }
        else if (!yearValue.current) {
            error = true
            globalAlert({title: "Вы не выбрали год"})
        }
        else if (sortsValue.current.length == 0) {
            error = true
            globalAlert({title: "Вы не выбрали растение из вашего списка"})
        }
        else if (!operation_id.current) {
            error = true
            globalAlert({title: "Вы не выбрали действие"})
        }
        if(!error) {
            const response = await AppFetch.getWithToken('setMoonCalendar', {
                date: yearValue.current + '-' + monthValue.current + '-01',
                sort_id: JSON.stringify(sortsValue.current),
                operation_id: operation_id.current
            }, {}, navigation)
            //console.log('res', response)
            if(response.result) setData(response.data)
        }
    }

    //console.log('plants', plants.current)

    useEffect(() => {
        initiate()
    }, [init])

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    //console.log('data', actions.current)

    const getColor = () => {
        if(operation_id.current)
            return getCalendarActiveColor(operation_id.current)
        return "#000"
    }

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            <ImageBackground
                style={styles.topBg}
                source={require("@images/moonCalendarScreen/moon-bg.png")}
                resizeMode={"stretch"}
            >
                <AppTextBold style={styles.title}>
                    Лунный календарь
                </AppTextBold>
                <AppTextBold style={{...styles.title, color: THEME.ORANGE}}>
                    Укажите сорт
                </AppTextBold>
                <View style={styles.slider}>
                    <Image
                        style={styles.sliderBg}
                        source={require("@images/moonCalendarScreen/bg.png")}
                        resizeMode={"stretch"}
                    />
                    <ScrollView
                        style={styles.scroll}
                        horizontal={true}
                    >
                        {
                            plants.current.map(item => {
                                return <AppMoontem
                                    key={getRandomKey()}
                                    item={item}
                                    onResultActive={id => {
                                        if(sortsValue.current.includes(id))
                                            sortsValue.current.splice(sortsValue.current.indexOf(id), 1)
                                        else
                                            sortsValue.current.push(id)
                                    }}
                                />
                            })
                        }
                    </ScrollView>
                </View>
                <AppTextBold style={{...styles.title, paddingBottom: 10}}>
                    Поиск по дате, месяцу и году
                </AppTextBold>
            </ImageBackground>
            <View style={styles.container}>
                <View style={styles.selectorBlock}>
                    <AppDateSelect
                        dateIs={date}
                        onResult={date => {
                            monthValue.current = date
                        }}
                    />
                    <AppYearSelect
                        dateIs={date}
                        onResult={date => {
                            yearValue.current = date
                        }}
                    />
                </View>
                {/*<AppDateSlider dateIs={date} />*/}
            </View>
            <View style={styles.borderTitle}>
                <AppTextBold style={styles.borderTitleText}>
                    Определите действие
                </AppTextBold>
            </View>
            <AppConditionBlock
                data={actions.current}
                onResult={id => {
                    operation_id.current = id
                    getColor()
                }}
            />
            <AppButton
                color={THEME.FOOTER_BG}
                style={{
                    width: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 20,
                    marginBottom: 20
                }}
                onPress={() => {
                    setMoonCalendar()
                }}
            >
                <Svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M16.8712 4.51411V11.2853C16.8712 13.768 14.8399 15.7994 12.3571 15.7994C11.9057 15.7994 11.5107 15.7429 11.1157 15.5737C11.7928 14.6708 12.2442 13.5987 12.3571 12.4138V11.2853V6.77116V5.64263C12.075 2.48276 9.42292 0 6.20662 0C2.99032 0 0.338284 2.48276 0.0561523 5.64263V11.2853V12.4138C0.338284 15.5737 2.99032 18.0564 6.20662 18.0564C7.78656 18.0564 9.19722 17.4922 10.2693 16.5329C10.9464 16.815 11.6236 16.9279 12.4135 16.9279C15.517 16.9279 18.0562 14.3887 18.0562 11.2853V4.51411H16.9276H16.8712ZM6.1502 16.9279C3.32888 16.9279 1.07183 14.6708 1.07183 11.8495C1.07183 11.6803 1.07183 6.4326 1.07183 6.2069C1.07183 3.38558 3.32888 1.12853 6.1502 1.12853C8.97151 1.12853 11.2286 3.38558 11.2286 6.2069C11.2286 6.37618 11.2286 11.6238 11.2286 11.8495C11.2286 14.6708 8.97151 16.9279 6.1502 16.9279Z" fill="white"/>
                    <Path d="M12.4138 6.2069C12.4138 2.76489 9.6489 0 6.2069 0C2.76489 0 0 2.76489 0 6.2069C0 6.37618 0 6.60188 0 6.77116V11.2853C0 11.4545 0 11.6803 0 11.8495C0 15.2915 2.76489 18.0564 6.2069 18.0564C9.6489 18.0564 12.4138 15.2915 12.4138 11.8495C12.4138 11.6803 12.4138 11.4545 12.4138 11.2853V6.77116C12.4138 6.60188 12.4138 6.37618 12.4138 6.2069ZM6.77116 7.33542C6.77116 7.67398 6.54545 7.89969 6.2069 7.89969C5.86834 7.89969 5.64263 7.67398 5.64263 7.33542V2.82132C5.64263 2.48276 5.86834 2.25705 6.2069 2.25705C6.54545 2.25705 6.77116 2.48276 6.77116 2.82132V7.33542Z" fill="white"/>
                </Svg>
                <View style={{width: 10}}></View>
                <AppTextBold>
                    Сформировать
                </AppTextBold>
            </AppButton>
            <AppTextBold style={{...styles.title, color: "#000"}}>
                Формирование календаря
            </AppTextBold>
            <AppCalendarUsual
                style={styles.calendar}
                titleColor={"#000"}
                arrowColor={"#000"}
                activeColor={getColor()}
                activeDataArr={data}
                activeDateArr={true}
            />
        </AppWrap>
    )

}

const styles = StyleSheet.create({
    calendar: {
        marginTop: 20,
        marginBottom: 40
    },
    borderTitleText: {
        textAlign: "center"
    },
    borderTitle: {
        marginTop: 10,
        width: 170,
        marginLeft: "auto",
        marginRight: "auto",
        borderTopWidth: 1,
        borderStyle: "solid",
        borderColor: "#000"
    },
    selectorBlock: {
        position: "relative",
        zIndex: 9,
        marginTop: -18,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    container: {
        position: "relative",
        zIndex: 9,
        paddingLeft: 20,
        paddingRight: 20
    },
    slider: {
        marginTop: 20,
        position: "relative"
    },
    sliderBg: {
        position: "absolute",
        left: 0,
        top: "-45%",
        width: "100%",
        height: "140%"
    },
    topBg: {
        width: "100%",
        backgroundColor: THEME.FOOTER_BG
    },
    title: {
        color: "#fff",
        textAlign: "center"
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

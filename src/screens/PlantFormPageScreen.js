import React, {useLayoutEffect, useState, useEffect, useRef} from "react"
import {StyleSheet, View, ImageBackground, TouchableOpacity, Dimensions, Platform} from "react-native"
import {AppWrap} from "../ui/AppWrap";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {useDispatch, useSelector} from "react-redux";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {globalAlert, mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import {AppText} from "../ui/AppText";
import {getColorType, globalRouteFun, LinkTo} from "../../global";
import {THEME} from "../../theme";
import {AppBlueButton} from "../ui/AppBlueButton";
import AppDateBlock from "../ui/eventFormPageScreen/AppDateBlock";
import {AppFetch} from "../AppFetch";
import AppPlantEditListTopPanel from "../ui/plantEditListScreen/AppPlantEditListTopPanel";
import AppInputBorderBottom from "../ui/formUI/AppInputBorderBottom";
import AppToBlock from "../ui/plantFormPageScreen/AppToBlock";
import AppWrapperBottomBorder from "../ui/formUI/AppWrapperBottomBorder";
import CheckboxWithLabel from "../ui/CheckboxWithLabel";
import AppSelectModified from "../ui/AppSelectModified";
import AppCounter from "../ui/AppCounter";
import {setCurrentRoute} from "../store/actions/other";

const pageWrapper = ({navigation, route}) => {
    let id = 0
    let questionary_id = 0
    let update = false
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('plantId')) {
            id = route.params.plantId
        }

        if(route.params.hasOwnProperty('questionary_id')) {
            questionary_id = route.params.questionary_id
        }

        if(route.params.hasOwnProperty('update')) {
            update = route.params.update
        }
    }
    //console.log('id', id)
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
    //console.log('navigation', navigation)

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    const [reload, setReload] = useState(false)

    const formData = useRef({
        region: "",
        place: "",
        ground: "",
        sealevel: "",
        average_annual: "",
        date_landing: "",
        date_in_ground: "",
        cultivation: "",
        date: "",
        cut: "",
        preventive: "",
        diseaseIs: "",
        disease1: "",
        disease2: "",
        disease3: "",
        generation: "",
        area: 0,
        frost: "",
        add_irrigation: "",
        drip_irrigation: "",
        fertilizer: "",
        rainfall: "",
        harvest: 0,
        measure: ""
    })

    const addToData = (name, value) => {
        if(formData.current.hasOwnProperty(name)) formData.current[name] = value
    }

    const init = true
    const [data, setData] = useState(false)
    const [block, setBlock] = useState(true)
    useEffect(() => {
        //console.log('id', id)
        AppFetch.getWithToken("getMyPlant", {id, questionary_id}, {}, navigation).then(result => {
            if(result.result) {
                for(let name in result.data) {
                    if(formData.current.hasOwnProperty(name)) formData.current[name] = result.data[name]
                }
                //console.log('data', formData.current)
                setData(result.data)
            }
        })
    }, [init])

    //const data = useSelector(state => state.events.currentEvent)

    //console.log('formData.current', formData.current, currentDay)

    const calendarWidth = Platform.OS == "android" ? screeWidth - 100 : "100%"

    const sendToModeration = async () => {
        let error = false
        const url = (!update) ? "addQuestionery" : "updateQuestionery"
        if(update) id = questionary_id
        //console.log('data', formData.current)
        // if(formData.current.title == "") {
        //     error = true
        //     globalAlert({text: "Не введено название события"})
        // }

        if(!error) {
            //console.log('url', url, route.params)
            const response = await AppFetch.getWithToken(url, {...formData.current, id}, {}, navigation)
            //console.log('response', response)
            if(response.result) {
                const title = (!update) ? "Анкета была успешно добавлена!" : "Анкета была успешно обновлена!"
                globalAlert({title})
                LinkTo('PlantEditListScreen', {plantId: response.data.plant_id}, navigation)
            }
        }
    }

    if(data) {
        return (
            <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
                <AppPlantEditListTopPanel
                    data={data}
                />
                <View style={styles.container}>
                    <AppInputBorderBottom
                        placeholder={"Регион посадки"}
                        value={formData.current.region}
                        editable={block}
                        onResult={value => {
                            addToData('region', value)
                        }}
                    />
                    <AppInputBorderBottom
                        placeholder={"Введите населенный пункт посадки"}
                        value={formData.current.place}
                        editable={block}
                        onResult={value => {
                            addToData('place', value)
                        }}
                    />
                    <AppInputBorderBottom
                        placeholder={"Тип почвы в который посажен сорт"}
                        value={formData.current.ground}
                        onResult={value => {
                            addToData('ground', value)
                        }}
                    />
                    <AppInputBorderBottom
                        placeholder={"Высота на уровнем моря"}
                        value={formData.current.sealevel}
                        editable={block}
                        onResult={value => {
                            addToData('sealevel', value)
                        }}
                    />
                    <AppInputBorderBottom
                        placeholder={"Среднегодовое количество"}
                        value={formData.current.average_annual}
                        editable={block}
                        onResult={value => {
                            addToData('average_annual', value)
                        }}
                    />
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.dateBlock}
                    >
                        <AppText style={styles.dateBlockText}>
                            Укажите д/м/г посадки
                        </AppText>
                        <AppDateBlock
                            screenWidth={screeWidth}
                            calendarWidth={calendarWidth}
                            style={styles.dateInput}
                            dateIs={formData.current.date}
                            background={"#fff"}
                            textBtnColor={"#000"}
                            iconColor={"#000"}
                            titleCalendar={"Дата посадки"}
                            onResult={date => {
                                addToData('date', date)
                            }}
                        />
                    </TouchableOpacity>
                    <AppToBlock
                        isLocked={block}
                        onResult={res => {
                            setBlock(res)
                        }}
                    />
                </View>
                <ImageBackground
                    style={styles.bg}
                    source={require("@images/plantFormPageScreen/bg.png")}
                    resizeMode={"cover"}
                >
                    <View style={styles.container}>
                        <AppInputBorderBottom
                            placeholder={"Дата посадки на рассаду"}
                            value={formData.current.date_landing}
                            editable={block}
                            onResult={value => {
                                addToData('date_landing', value)
                            }}
                        />
                        <AppInputBorderBottom
                            placeholder={"Дата высадки рассады в открытый грунт"}
                            value={formData.current.date_in_ground}
                            editable={block}
                            onResult={value => {
                                addToData('date_in_ground', value)
                            }}
                        />
                        <AppWrapperBottomBorder
                            placeholder={"Тепличное/комнатное выращивание"}
                        >
                            <CheckboxWithLabel
                                label={"Тепличное"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 110, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.cultivation == "Тепличное"}
                                onChange={value => {
                                    if(value) addToData("cultivation", "Тепличное")
                                    setReload(!reload)
                                }}
                            />
                            <CheckboxWithLabel
                                label={"Комнатное"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 110, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.cultivation == "Комнатное"}
                                onChange={value => {
                                    if(value) addToData("cultivation", "Комнатное")
                                    setReload(!reload)
                                }}
                            />
                        </AppWrapperBottomBorder>
                        <AppWrapperBottomBorder
                            placeholder={"Производилась ли санитарная обрезка"}
                        >
                            <CheckboxWithLabel
                                label={"Да"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 50, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.cut == "Да"}
                                onChange={value => {
                                    if(value) addToData("cut", "Да")
                                    setReload(!reload)
                                }}
                            />
                            <CheckboxWithLabel
                                label={"Нет"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 60, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.cut == "Нет"}
                                onChange={value => {
                                    if(value) addToData("cut", "Нет")
                                    setReload(!reload)
                                }}
                            />
                        </AppWrapperBottomBorder>
                        <AppWrapperBottomBorder
                            placeholder={"Производилась ли профилактика от грибов, насекомых"}
                        >
                            <CheckboxWithLabel
                                label={"Да"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 50, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.preventive == "Да"}
                                onChange={value => {
                                    if(value) addToData("preventive", "Да")
                                    setReload(!reload)
                                }}
                            />
                            <CheckboxWithLabel
                                label={"Нет"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 60, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.preventive == "Нет"}
                                onChange={value => {
                                    if(value) addToData("preventive", "Нет")
                                    setReload(!reload)
                                }}
                            />
                        </AppWrapperBottomBorder>
                        <AppWrapperBottomBorder
                            placeholder={"Болеет ли растение"}
                        >
                            <CheckboxWithLabel
                                label={"Да"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 50, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.diseaseIs == "Да"}
                                onChange={value => {
                                    if(value) addToData("diseaseIs", "Да")
                                    setReload(!reload)
                                }}
                            />
                            <CheckboxWithLabel
                                label={"Нет"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 60, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.diseaseIs == "Нет"}
                                onChange={value => {
                                    if(value) addToData("diseaseIs", "Нет")
                                    setReload(!reload)
                                }}
                            />
                        </AppWrapperBottomBorder>
                        {
                            formData.current.diseaseIs == "Да"
                                ?
                                <>
                                    <AppInputBorderBottom
                                        editable={block}
                                        placeholder={"Болезнь №1"}
                                        value={formData.current.disease1}
                                        onResult={value => {
                                            addToData('disease1', value)
                                        }}
                                    />
                                    <AppInputBorderBottom
                                        editable={block}
                                        placeholder={"Болезнь №2"}
                                        value={formData.current.disease2}
                                        onResult={value => {
                                            addToData('disease2', value)
                                        }}
                                    />
                                    <AppInputBorderBottom
                                        editable={block}
                                        placeholder={"Болезнь №3"}
                                        value={formData.current.disease3}
                                        onResult={value => {
                                            addToData('disease3', value)
                                        }}
                                    />
                                </>
                                :
                                <></>
                        }
                        <AppSelectModified
                            style={{...styles.selector, width: screeWidth}}
                            color={"#fff"}
                            editable={block}
                            title={formData.current.cultivation ? formData.current.cultivation : "Номер поколения"}
                            colorOpened={"#000"}
                            selectStyle={{backgroundColor: THEME.DEDEDE}}
                            borderColor={"transparent"}
                            data={[
                                {
                                    value: 1,
                                    name: 1
                                },
                                {
                                    value: 2,
                                    name: 2
                                },
                                {
                                    value: 3,
                                    name: 3
                                },
                                {
                                    value: 4,
                                    name: 4
                                },
                                {
                                    value: "4+",
                                    name: "4+"
                                }
                            ]}
                            onResult={value => {
                                addToData('generation', value)
                            }}
                        />
                        <View style={styles.priceBlock}>
                            <AppText style={styles.priceLabel}>
                                Площадь посадки
                            </AppText>
                            <View style={styles.counterBlock}>
                                <AppCounter
                                    valueIs={formData.current.area}
                                    editable={block}
                                    onResult={area => {
                                        formData.current.area = area
                                    }}
                                />
                                <AppText style={styles.measure}>гектары</AppText>
                            </View>
                        </View>
                        <AppWrapperBottomBorder
                            placeholder={"Подвергалось ли растение воздействию весенних заморозков"}
                        >
                            <CheckboxWithLabel
                                label={"Да"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 50, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.frost == "Да"}
                                onChange={value => {
                                    if(value) addToData("frost", "Да")
                                    setReload(!reload)
                                }}
                            />
                            <CheckboxWithLabel
                                label={"Нет"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 60, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.frost == "Нет"}
                                onChange={value => {
                                    if(value) addToData("frost", "Нет")
                                    setReload(!reload)
                                }}
                            />
                        </AppWrapperBottomBorder>
                        <AppWrapperBottomBorder
                            placeholder={"Наличие дополнительного полива"}
                        >
                            <CheckboxWithLabel
                                label={"Да"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 50, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.add_irrigation == "Да"}
                                onChange={value => {
                                    if(value) addToData("add_irrigation", "Да")
                                    setReload(!reload)
                                }}
                            />
                            <CheckboxWithLabel
                                label={"Нет"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 60, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.add_irrigation == "Нет"}
                                onChange={value => {
                                    if(value) addToData("add_irrigation", "Нет")
                                    setReload(!reload)
                                }}
                            />
                        </AppWrapperBottomBorder>
                        <AppWrapperBottomBorder
                            placeholder={"Наличие капельного полива"}
                        >
                            <CheckboxWithLabel
                                label={"Да"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 50, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.drip_irrigation == "Да"}
                                onChange={value => {
                                    if(value) addToData("drip_irrigation", "Да")
                                    setReload(!reload)
                                }}
                            />
                            <CheckboxWithLabel
                                label={"Нет"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 60, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.drip_irrigation == "Нет"}
                                onChange={value => {
                                    if(value) addToData("drip_irrigation", "Нет")
                                    setReload(!reload)
                                }}
                            />
                        </AppWrapperBottomBorder>
                        <AppWrapperBottomBorder
                            placeholder={"Наличие органических и минеральных удобрений"}
                        >
                            <CheckboxWithLabel
                                label={"Да"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 50, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.fertilizer == "Да"}
                                onChange={value => {
                                    if(value) addToData("fertilizer", "Да")
                                    setReload(!reload)
                                }}
                            />
                            <CheckboxWithLabel
                                label={"Нет"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 60, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.fertilizer == "Нет"}
                                onChange={value => {
                                    if(value) addToData("fertilizer", "Нет")
                                    setReload(!reload)
                                }}
                            />
                        </AppWrapperBottomBorder>
                        <AppWrapperBottomBorder
                            placeholder={"Оцените год по количеству выпавших осадков"}
                        >
                            <CheckboxWithLabel
                                label={"Засушлив"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 100, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.rainfall == "Засушлив"}
                                onChange={value => {
                                    if(value) addToData("rainfall", "Засушлив")
                                    setReload(!reload)
                                }}
                            />
                            <CheckboxWithLabel
                                label={"Нормальный"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 110, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.rainfall == "Нормальный"}
                                onChange={value => {
                                    if(value) addToData("rainfall", "Нормальный")
                                    setReload(!reload)
                                }}
                            />
                            <CheckboxWithLabel
                                label={"Влажный"}
                                disabled={!block}
                                reversed={true}
                                color={"#000"}
                                textStyle={{paddingLeft: 10, marginTop: 5, marginBottom: 5}}
                                style={{width: 110, paddingBottom: 5, paddingTop: 5}}
                                conditionInit={formData.current.rainfall == "Влажный"}
                                onChange={value => {
                                    if(value) addToData("rainfall", "Влажный")
                                    setReload(!reload)
                                }}
                            />
                        </AppWrapperBottomBorder>
                        <View style={styles.priceBlock}>
                            <AppText style={styles.priceLabel}>
                                Полученный урожай
                            </AppText>
                            <View style={styles.counterBlock}>
                                <AppCounter
                                    valueIs={formData.current.harvest}
                                    editable={block}
                                    onResult={value => {
                                        formData.current.harvest = value
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{height: 20}}></View>
                        <AppSelectModified
                            editable={block}
                            style={{...styles.selector, width: screeWidth}}
                            color={"#fff"}
                            title={formData.current.measure ? formData.current.measure : "Единица измерения"}
                            colorOpened={"#000"}
                            selectStyle={{backgroundColor: THEME.DEDEDE}}
                            borderColor={"transparent"}
                            data={[
                                {
                                    value: "Центнер",
                                    name: "Центнер"
                                },
                                {
                                    value: "Тонна",
                                    name: "Тонна"
                                },
                                {
                                    value: "Килограмм",
                                    name: "Килограмм"
                                }
                            ]}
                            onResult={value => {
                                addToData('measure', value)
                            }}
                        />
                        <View style={{height: 30}}></View>
                        <AppBlueButton
                            style={styles.moderateBtn}
                            onPress={async () => {
                                try {
                                    await sendToModeration()
                                } catch (e) {console.log(e)}
                            }}
                        >
                            Сохранить
                        </AppBlueButton>
                        <View style={{height: 30}}></View>
                    </View>
                </ImageBackground>
            </AppWrap>
        )
    } else {
        return <></>
    }
}

const styles = StyleSheet.create({
    bg: {
        width: "100%"
    },
    priceLabel: {
        fontSize: 14
    },
    measure: {
        paddingLeft: 10,
        fontSize: 14,
        color: THEME.GREY_TEXT
    },
    counterBlock: {
        flexDirection: "row",
        alignItems: "center"
    },
    priceBlock: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    selector: {
        backgroundColor: THEME.BLUE,
        borderWidth: 0,
        borderColor: "transparent",
        marginLeft: -20,
        zIndex: 999
    },
    dateBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 20
    },
    dateInput: {
        width: 150,
        borderWidth: 1,
        borderStyle: "solid"
    },
    moderateBtn: {
        width: 180,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
        marginBottom: 40
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20
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
                drawerContent={AppDrawerContentHandler} drawerPosition="left"
            >
                <Drawer.Screen name="InsidePageScreen" component={PageTab} />
            </Drawer.Navigator>
            <AppIndicator timer={.2} />
        </>
    )
}

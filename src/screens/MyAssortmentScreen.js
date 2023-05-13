import React, {useLayoutEffect, useEffect, useState, useRef} from "react"
import {View, StyleSheet, Dimensions, Platform} from "react-native"
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import 'moment/locale/ru'
import {AppWrap} from "../ui/AppWrap";
import {AppTextBold} from "../ui/AppTextBold";
import AppButton from "../ui/AppButton";
import {THEME} from "../../theme";
import {Svg, Path, Mask, Circle} from "react-native-svg";
import {getRandomKey, globalRouteFun, LinkTo, SHADOW_SMALL} from "../../global";
import CheckboxWithLabel from "../ui/CheckboxWithLabel";
import AppSelectModified from "../ui/AppSelectModified";
import {AppText} from "../ui/AppText";
import {AppFetch} from "../AppFetch";
import AppAssortmentItem from "../ui/myAssortmentScreen/AppAssortmentItem";
import AppEmptyText from "../ui/AppEmptyText";

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

    const [reload, setReload] = useState(false)
    const cultures_list = useRef([])
    const products = useRef([])
    const [data, setData] = useState([])
    const sorts_list = useRef([])
    const init = true
    const formData = useRef({
        type: "",
    })

    const ifExistCulture = (culture_id) => {
        let exist = false
        cultures_list.current.map(item => {
            if(item.value == culture_id) exist = true
        })

        return exist
    }

    const ifExistSort = (sort_id) => {
        let exist = false
        sorts_list.current.map(item => {
            if(item.value == sort_id) exist = true
        })

        return exist
    }

    const configureFilter = () => {
        const data = products.current
        data.map(item => {
            if(item.type == "sort") {
                if (item.culture_id > 0 && !ifExistCulture(item.culture_id)) cultures_list.current.push({
                    name: item.culture_name,
                    value: item.culture_id
                })

                if (item.sort_id > 0 && !ifExistSort(item.sort_id)) sorts_list.current.push({
                    name: item.sort_name,
                    value: item.sort_id
                })
            }
        })
        setData(data)
        setTimeout(() => {
            console.log(setReload(!reload))
        }, 200)
    }

    const initiate = () => {
        AppFetch.getWithToken("getMyAssort", {}, {}, navigation).then(response => {
            //console.log(response)
            products.current = response.data
            configureFilter()
        })
    }

    useEffect(() => {
        initiate()

    }, [init])

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    //console.log('loadMore', loadMore)
    const selectStyle = Platform.OS == "android" ? {
        position: "relative",
        top: 0
    } : {}

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            <AppTextBold style={styles.title}>
                Мой ассортимент
            </AppTextBold>
            <AppButton
                color={THEME.BLUE}
                style={styles.addBtnOrig}
                onPress={() => {
                    LinkTo("AddNomenclaturaScreen", {}, navigation)
                }}
            >
                <View style={styles.addBtn}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Mask id="path-1-inside-1" fill="white">
                            <Path fillRule="evenodd" clipRule="evenodd" d="M12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24ZM10.8736 10.9224C10.9289 10.9224 10.9736 10.8777 10.9736 10.8224V5.74697C10.9736 5.69174 11.0184 5.64697 11.0736 5.64697H12.3285C12.3838 5.64697 12.4285 5.69174 12.4285 5.74697V10.8224C12.4285 10.8777 12.4733 10.9224 12.5285 10.9224H17.547C17.6022 10.9224 17.647 10.9672 17.647 11.0224V12.0904C17.647 12.1456 17.6022 12.1904 17.547 12.1904H12.5285C12.4733 12.1904 12.4285 12.2351 12.4285 12.2904V17.547C12.4285 17.6022 12.3838 17.647 12.3285 17.647H11.0736C11.0184 17.647 10.9736 17.6022 10.9736 17.547V12.2904C10.9736 12.2351 10.9289 12.1904 10.8736 12.1904H5.74697C5.69174 12.1904 5.64697 12.1456 5.64697 12.0904V11.0224C5.64697 10.9672 5.69174 10.9224 5.74697 10.9224H10.8736Z"/>
                        </Mask>
                        <Path d="M0.690001 12C0.690001 18.2463 5.75366 23.31 12 23.31V24.69C4.99151 24.69 -0.690001 19.0085 -0.690001 12H0.690001ZM12 0.69C5.75366 0.69 0.690001 5.75366 0.690001 12H-0.690001C-0.690001 4.99151 4.99151 -0.69 12 -0.69V0.69ZM23.31 12C23.31 5.75366 18.2463 0.69 12 0.69V-0.69C19.0085 -0.69 24.69 4.99151 24.69 12H23.31ZM12 23.31C18.2463 23.31 23.31 18.2463 23.31 12H24.69C24.69 19.0085 19.0085 24.69 12 24.69V23.31ZM11.6636 10.8224C11.6636 11.2587 11.3099 11.6124 10.8736 11.6124V10.2324C10.5478 10.2324 10.2836 10.4966 10.2836 10.8224H11.6636ZM11.6636 5.74697V10.8224H10.2836V5.74697H11.6636ZM11.0736 6.33697C11.3995 6.33697 11.6636 6.07282 11.6636 5.74697H10.2836C10.2836 5.31066 10.6373 4.95697 11.0736 4.95697V6.33697ZM12.3285 6.33697H11.0736V4.95697H12.3285V6.33697ZM11.7385 5.74697C11.7385 6.07282 12.0027 6.33697 12.3285 6.33697V4.95697C12.7648 4.95697 13.1185 5.31067 13.1185 5.74697H11.7385ZM11.7385 10.8224V5.74697H13.1185V10.8224H11.7385ZM12.5285 11.6124C12.0922 11.6124 11.7385 11.2588 11.7385 10.8224H13.1185C13.1185 10.4966 12.8544 10.2324 12.5285 10.2324V11.6124ZM17.547 11.6124H12.5285V10.2324H17.547V11.6124ZM16.957 11.0224C16.957 11.3483 17.2211 11.6124 17.547 11.6124V10.2324C17.9833 10.2324 18.337 10.5861 18.337 11.0224H16.957ZM16.957 12.0904V11.0224H18.337V12.0904H16.957ZM17.547 11.5004C17.2211 11.5004 16.957 11.7645 16.957 12.0904H18.337C18.337 12.5267 17.9833 12.8804 17.547 12.8804V11.5004ZM12.5285 11.5004H17.547V12.8804H12.5285V11.5004ZM11.7385 12.2904C11.7385 11.8541 12.0922 11.5004 12.5285 11.5004V12.8804C12.8544 12.8804 13.1185 12.6162 13.1185 12.2904H11.7385ZM11.7385 17.547V12.2904H13.1185V17.547H11.7385ZM12.3285 16.957C12.0027 16.957 11.7385 17.2211 11.7385 17.547H13.1185C13.1185 17.9833 12.7648 18.337 12.3285 18.337V16.957ZM11.0736 16.957H12.3285V18.337H11.0736V16.957ZM11.6636 17.547C11.6636 17.2211 11.3995 16.957 11.0736 16.957V18.337C10.6373 18.337 10.2836 17.9833 10.2836 17.547H11.6636ZM11.6636 12.2904V17.547H10.2836V12.2904H11.6636ZM10.8736 11.5004C11.3099 11.5004 11.6636 11.8541 11.6636 12.2904H10.2836C10.2836 12.6162 10.5478 12.8804 10.8736 12.8804V11.5004ZM5.74697 11.5004H10.8736V12.8804H5.74697V11.5004ZM6.33697 12.0904C6.33697 11.7645 6.07282 11.5004 5.74697 11.5004V12.8804C5.31067 12.8804 4.95697 12.5267 4.95697 12.0904H6.33697ZM6.33697 11.0224V12.0904H4.95697V11.0224H6.33697ZM5.74697 11.6124C6.07282 11.6124 6.33697 11.3483 6.33697 11.0224H4.95697C4.95697 10.5861 5.31066 10.2324 5.74697 10.2324V11.6124ZM10.8736 11.6124H5.74697V10.2324H10.8736V11.6124Z" fill="white" mask="url(#path-1-inside-1)"/>
                    </Svg>

                    <AppTextBold style={styles.addBtnText}>
                        Добавить новый товар
                    </AppTextBold>
                </View>
            </AppButton>
            <AppButton
                color={THEME.FOOTER_BG}
                style={{...styles.addBtnOrig, width: 270, marginTop: 20}}
                onPress={() => {
                    LinkTo("MyAssortmentPDFScreen", {}, navigation)
                }}
            >
                <View style={styles.addBtn}>
                    <Svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M16.8712 4.51411V11.2853C16.8712 13.768 14.8399 15.7994 12.3571 15.7994C11.9057 15.7994 11.5107 15.7429 11.1157 15.5737C11.7928 14.6708 12.2442 13.5987 12.3571 12.4138V11.2853V6.77116V5.64263C12.075 2.48276 9.42292 0 6.20662 0C2.99032 0 0.338284 2.48276 0.0561523 5.64263V11.2853V12.4138C0.338284 15.5737 2.99032 18.0564 6.20662 18.0564C7.78656 18.0564 9.19722 17.4922 10.2693 16.5329C10.9464 16.815 11.6236 16.9279 12.4135 16.9279C15.517 16.9279 18.0562 14.3887 18.0562 11.2853V4.51411H16.9276H16.8712ZM6.1502 16.9279C3.32888 16.9279 1.07183 14.6708 1.07183 11.8495C1.07183 11.6803 1.07183 6.4326 1.07183 6.2069C1.07183 3.38558 3.32888 1.12853 6.1502 1.12853C8.97151 1.12853 11.2286 3.38558 11.2286 6.2069C11.2286 6.37618 11.2286 11.6238 11.2286 11.8495C11.2286 14.6708 8.97151 16.9279 6.1502 16.9279Z" fill="white"/>
                        <Path d="M12.4138 6.2069C12.4138 2.76489 9.6489 0 6.2069 0C2.76489 0 0 2.76489 0 6.2069C0 6.37618 0 6.60188 0 6.77116V11.2853C0 11.4545 0 11.6803 0 11.8495C0 15.2915 2.76489 18.0564 6.2069 18.0564C9.6489 18.0564 12.4138 15.2915 12.4138 11.8495C12.4138 11.6803 12.4138 11.4545 12.4138 11.2853V6.77116C12.4138 6.60188 12.4138 6.37618 12.4138 6.2069ZM6.77116 7.33542C6.77116 7.67398 6.54545 7.89969 6.2069 7.89969C5.86834 7.89969 5.64263 7.67398 5.64263 7.33542V2.82132C5.64263 2.48276 5.86834 2.25705 6.2069 2.25705C6.54545 2.25705 6.77116 2.48276 6.77116 2.82132V7.33542Z" fill="white"/>
                    </Svg>
                    <AppTextBold style={styles.addBtnText}>
                        Сформировать каталог с QR
                    </AppTextBold>
                </View>
            </AppButton>
            {
                formData.current.type == "sort"
                    ?
                    <View style={{...styles.selectBlock, position: "relative", zIndex: 90}}>
                        <View style={styles.select}>
                            <AppText style={styles.selectLabel}>
                                Культура
                            </AppText>
                            <AppSelectModified
                                title={"Выберите культуру"}
                                showDefaultTitle={false}
                                style={{backgroundColor: THEME.BLUE}}
                                borderColor={THEME.BLUE}
                                selectStyle={{
                                    backgroundColor: THEME.ALL_COLOR,
                                    borderColor: "transparent", ...selectStyle
                                }}
                                color={"#fff"}
                                data={cultures_list.current}
                                onResult={culture_id => {
                                    const data = products.current
                                    const arr = []
                                    sorts_list.current = []
                                    data.map(item => {
                                        if(item.culture_id == culture_id) {
                                            arr.push(item)
                                        }

                                        if(item.culture_id == culture_id && !ifExistSort(item.sort_id)) {
                                            sorts_list.current.push({
                                                name: item.sort_name,
                                                value: item.sort_id
                                            })
                                        }
                                    })

                                    setData(arr)
                                }}
                            />
                        </View>
                        <View style={styles.select}>
                            <AppText style={styles.selectLabel}>
                                Сорт
                            </AppText>
                            <AppSelectModified
                                title={"Выберите сорт"}
                                showDefaultTitle={false}
                                style={{backgroundColor: THEME.BLUE}}
                                borderColor={THEME.BLUE}
                                selectStyle={{backgroundColor: THEME.ALL_COLOR, borderColor: "transparent", ...selectStyle}}
                                color={"#fff"}
                                data={sorts_list.current}
                                onResult={sort_id => {
                                    const data = products.current
                                    const arr = []
                                    data.map(item => {
                                        if(item.sort_id == sort_id) {
                                            arr.push(item)
                                        }
                                    })

                                    setData(arr)
                                }}
                            />
                        </View>
                    </View>
                    :
                    <></>
            }
            <View style={styles.container}>
                <View style={styles.selectBlock}>
                    <CheckboxWithLabel
                        label={"Растение"}
                        reversed={true}
                        conditionInit={formData.current.type == "sort"}
                        style={{width: 90, paddingBottom: 0, borderBottomColor: "transparent"}}
                        textStyle={{paddingLeft: 20, borderColor: "transparent"}}
                        onChange={() => {
                            if(formData.current.type != "sort")
                                formData.current.type = "sort"
                            else
                                formData.current.type = ""

                            configureFilter()

                            const data = products.current
                            const arr = []
                            if(formData.current.type == 'sort') {
                                data.map(item => {
                                    if(item.type == "sort") {
                                        arr.push(item)
                                    }
                                })
                                setData(arr)
                            } else {
                                setData(products.current)
                            }
                        }}
                    />
                    <CheckboxWithLabel
                        label={"Химикат"}
                        reversed={true}
                        conditionInit={formData.current.type == "chemical"}
                        style={{width: 100, paddingBottom: 0, borderBottomColor: "transparent"}}
                        textStyle={{paddingLeft: 20}}
                        onChange={() => {
                            if(formData.current.type != "chemical")
                                formData.current.type = "chemical"
                            else
                                formData.current.type = ""

                            configureFilter()

                            const data = products.current
                            const arr = []
                            if(formData.current.type == 'chemical') {
                                data.map(item => {
                                    if(item.type == "chemical") {
                                        arr.push(item)
                                    }
                                })
                                setData(arr)
                            } else {
                                setData(products.current)
                            }
                        }}
                    />
                </View>
            </View>
            {
                Array.isArray(data) && data.length > 0
                    ?
                    data.map((item, key) => {
                        return <AppAssortmentItem
                            onDelete={async id => {
                                const response = await AppFetch.getWithToken("removeProduct", {id}, {}, navigation)
                                //console.log('del', response, id)
                                if(response.result) initiate()
                            }}
                            num={key + 1}
                            key={getRandomKey()}
                            item={item}
                            screenWidth={screeWidth}
                            navigation={navigation}
                        />
                    })
                    :
                    <AppEmptyText text={"У вас пока нет товаров в ассортименте"} />
            }
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 140,
        marginTop: 20,
        marginBottom: 40,
        marginLeft: "auto",
        marginRight: "auto"
    },
    counterBlock: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 20
    },
    counterBlockLabel: {
        paddingLeft: 10,
        fontSize: 14,
        color: THEME.GREY_TEXT
    },
    selectLabel: {
        paddingLeft: 20,
        color: THEME.GREY_TEXT,
        fontSize: 14
    },
    selectBlock: {
        position: "relative",
        zIndex: 9,
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 9
    },
    select: {
        width: "48%"
    },
    addProductBtnText: {
        paddingRight: 10,
        fontSize: 14,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10
    },
    addProductBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: THEME.SLIDER_BG,
        borderTopRightRadius: 35,
        borderBottomRightRadius: 35,
        ...SHADOW_SMALL
    },
    topPanelWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20
    },
    topPanelImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#C4C4C4"
    },
    addBtnOrig: {
        width: 230,
        marginLeft: "auto",
        marginRight: "auto"
    },
    addBtn: {
        flexDirection: "row",
        alignItems: "center"
    },
    addBtnText: {
        color: "#fff",
        paddingLeft: 10,
        marginTop: 0,
        marginBottom: 0
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

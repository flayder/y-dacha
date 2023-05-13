import React, {useLayoutEffect, useEffect, useState, useRef} from "react"
import {View, StyleSheet, TouchableOpacity, Dimensions, Image, Platform, ActivityIndicator} from "react-native"
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {globalAlert, mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import 'moment/locale/ru'
import {AppWrap} from "../ui/AppWrap";
import {AppTextBold} from "../ui/AppTextBold";
import AppButton from "../ui/AppButton";
import {THEME} from "../../theme";
import {Svg, Path, Mask, Circle} from "react-native-svg";
import AppDeleteDraft from "../ui/addNomenclaturaScreen/AppDeleteDraft";
import {globalRouteFun, LinkTo, SHADOW_SMALL} from "../../global";
import AppWrapperBottomBorder from "../ui/formUI/AppWrapperBottomBorder";
import CheckboxWithLabel from "../ui/CheckboxWithLabel";
import AppSelectModified from "../ui/AppSelectModified";
import {AppText} from "../ui/AppText";
import AppInputBorderBottom from "../ui/formUI/AppInputBorderBottom";
import AppCounter from "../ui/AppCounter";
import {AppBlueButton} from "../ui/AppBlueButton";
import {AppFetch} from "../AppFetch";

const pageWrapper = ({navigation, route}) => {
    let id = 0
    let type = ""

    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('assortment_id')) {
            id = route.params.assortment_id
        }

        if(route.params.hasOwnProperty('type')) {
            type = route.params.type
        }
    }

    if(!id) type = ""

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
    const img = useRef("")
    const sorts_list = useRef([])
    const categories_list = useRef([])
    const categories_val_list = useRef([])
    const [updateLoad, setUpdateLoad] = useState(false)
    const [sending, setSending] = useState(false)
    const init = true
    const formData = useRef({
        type: "sort",
        culture: 0,
        sort: 0,
        chemical: 0,
        category_id: "",
        category_value: "",
        name: "",
        quality: 0,
        price: 0,
        unit: "",
        addition_information: ""
    })

    const setImage = (id) => {
        sorts_list.current.map(item => {
            if(item.value == id) img.current = item.main_photo
        })

        //console.log(id, img.current)
    }

    const configureData = (data) => {
        //console.log('data', data)
        if(data.hasOwnProperty("cultures") && Array.isArray(data.cultures) && data.cultures.length > 0) {
            let arr = []
            data.cultures.map(item => {
                arr.push({
                    name: item.name,
                    value: item.id
                })
            })
            cultures_list.current = arr
        }

        if(data.hasOwnProperty("sorts") && Array.isArray(data.sorts) && data.sorts.length > 0) {
            let arr = []
            data.sorts.map(item => {
                arr.push({
                    name: item.name,
                    value: item.id,
                    main_photo: item.main_photo
                })
            })
            sorts_list.current = arr
        }

        if(data.hasOwnProperty("categories") && Array.isArray(data.categories) && data.categories.length > 0) {
            let arr = []
            data.categories.map(item => {
                arr.push({
                    name: item.category,
                    value: item.id
                })
            })
            categories_list.current = arr
        }

        if(data.hasOwnProperty("cat_values")) {
            let arr = []
            data.cat_values.map((item, key) => {
                arr.push({
                    name: item,
                    value: key
                })
            })
            categories_val_list.current = arr
        }

        setReload(!reload)
    }

    const getSorts = async (culture_id) => {
        const response = await AppFetch.getWithToken("getFirstSortData", {id: culture_id}, {}, navigation)
        if(response.result) {
            configureData(response.data)
        }
        return Promise.resolve(true)
    }

    const getChemical = async () => {
        const response = await AppFetch.getWithToken("getChemicalData", {}, {}, navigation)
        //console.log('chem', response)
        if(response.result) {
            configureData(response.data)
        }
        return Promise.resolve(true)
    }

    const getCultures = async () => {
        const response = await AppFetch.getWithToken("getCulturesData", {}, {}, navigation)
        //console.log('getCultures', response)

        if(response.result) {
            configureData(response.data)
        }

        return Promise.resolve(true)
    }

    const getCat = async () => {
        const response = await AppFetch.getWithToken("getCategories", {type: formData.current.type}, {}, navigation)
        //console.log('response', formData.current.type, response)

        if(response.result) {
            configureData(response.data)
        }

        return Promise.resolve(true)
    }

    const getCatValues = async (cat_id) => {
        const response = await AppFetch.getWithToken("getCategoryValues", {id: cat_id}, {}, navigation)
        //console.log('response', cat_id, response)

        if(response.result) {
            configureData(response.data)
        }
    }

    const updateFormData = async (data) => {
        if(data.hasOwnProperty('type')) formData.current.type = data.type

        if(data.hasOwnProperty('unit')) formData.current.unit = data.unit
        if(data.hasOwnProperty('quantity')) formData.current.quality = data.quantity
        if(data.hasOwnProperty('price')) formData.current.price = data.price
        if(data.type == "sort") {
            await getCultures()
            if(data.hasOwnProperty('sort_id')) formData.current.sort = data.sort_id
            if(data.hasOwnProperty('culture_id')) {
                formData.current.culture = data.culture_id
                await getCat("sort")
                await getSorts(data.culture_id)
            }

        } else {
            await getChemical()
            await getCat("chemical")
            if(data.hasOwnProperty('chemical_id')) formData.current.sort = data.chemical_id
        }

        if(data.hasOwnProperty('main_photo')) img.current = data.main_photo
        if(data.hasOwnProperty('char_orig')) {
            if(data.char_orig.indexOf('_') !== -1) {
                const char = data.char_orig.split('_')
                if(char[0] !== undefined && char[1] !== undefined) {
                    await getCatValues(char[0])
                    formData.current.category_id = char[0]
                    formData.current.category_value = char[1]
                }
            }
        }

        if(data.hasOwnProperty('add_information')) formData.current.addition_information = data.add_information
        //console.log('updated', sorts_list.current)
        //console.log('sss', sorts_list.current)
        setTimeout(() => {
            setUpdateLoad(true)
        }, 200)
    }

    useEffect(() => {
        if(type == "update") {
            AppFetch.getWithToken('getProduct', {id}, {}, navigation).then(response => {
                if(response.result) {
                    updateFormData(response.data)
                }
            })
        } else {
            AppFetch.getWithToken("getFirstFormData", {}, {}, navigation).then(response => {
                configureData(response.data)
            })
        }
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

    const validateForm = (data) => {
        let err = false
        if(!data.unit) {
            globalAlert(
                {
                    title: "Вы не ввели наименование единицы измерение"
                }
            )
            err = true
        } else if(data.quality == 0) {
            globalAlert(
                {
                    title: "Количество в наличии не должноы быть 0"
                }
            )
            err = true
        } else if(data.price == 0) {
            globalAlert(
                {
                    title: "Цена товара не должна быть 0"
                }
            )
            err = true
        } else if(data.type == "sort" && data.culture == 0) {
            globalAlert(
                {
                    title: "Вы не выбрали культуру"
                }
            )
            err = true
        } else if(data.type == "sort" && data.sort == 0) {
            globalAlert(
                {
                    title: "Вы не выбрали сорт"
                }
            )
            err = true
        } else if(data.category_id == "") {
            globalAlert(
                {
                    title: "Вы не выбрали категорию"
                }
            )
            err = true
        } else if(data.category_value < 0) {
            globalAlert(
                {
                    title: "Вы не выбрали значение категории"
                }
            )
            err = true
        }

        return err
    }

    const addProduct = async () => {

        const data = formData.current
        //console.log('pre', data)
        const err = validateForm(data)

        if(!err) {
            setSending(true)
            const params = {
                section_id: data.type == "sort" ? data.culture : 0,
                name: data.sort,
                //product_name: data.name,
                type: data.type,
                characteristic: data.category_id + "_" + data.category_value,
                quantity: data.quality,
                unit: data.unit,
                price: data.price,
                add_information: data.addition_information
            }

            //console.log('params', params)
            const response = await AppFetch.getWithToken("addProduct", params, {}, navigation)
            setSending(false)
            if(response.result) {
                globalAlert({
                    title: "Вы успешно создали товар!",
                    onOkFun() {
                        LinkTo("MyAssortmentScreen", {}, navigation)
                    }
                })
            }
        }
    }

    const getNameOfProp = (id, type, defaultName = false) => {
        let name = ""
        if(type == 'sort') {
            sorts_list.current.map(item => {
                if(item.value == id) name = item.name
            })
        } else if(type == 'culture') {
            cultures_list.current.map(item => {
                if(item.value == id) name = item.name
            })
        } else if(type == 'cat') {
            //console.log('categories_list.current', categories_list.current, id)
            categories_list.current.map(item => {
                if(item.value == id) name = item.name
            })
        } else if(type == 'cat_val') {
            categories_val_list.current.map(item => {
                if(item.value == id) name = item.name
            })
        }
        if(defaultName && !name) name = defaultName

        return name
    }

    const updateProduct = async () => {

        const data = formData.current
        const err = validateForm(data)

        //console.log('err', err)

        if(!err) {
            setSending(true)
            const params = {
                id,
                section_id: data.type == "sort" ? data.culture : 0,
                name: data.sort,
                //product_name: data.name,
                type: data.type,
                characteristic: data.category_id + "_" + data.category_value,
                quantity: data.quality,
                unit: data.unit,
                price: data.price,
                add_information: data.addition_information
            }
            const response = await AppFetch.getWithToken("updateProduct", params, {}, navigation)
            setSending(false)
            //console.log('response', response)
            if(response.result) {
                globalAlert({
                    title: "Вы успешно обновили свой товар",
                    onOkFun() {
                        LinkTo("MyAssortmentScreen", {}, navigation)
                    }
                })
            }
        }
    }

    if(type != "update" || type == "update" && updateLoad) {
        return (
            <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
                <AppTextBold style={styles.title}>
                    Мой ассортимент
                </AppTextBold>
                <AppButton
                    color={THEME.BLUE}
                    style={styles.addBtnOrig}
                    onPress={() => {
                        LinkTo("CooperationScreen", {}, navigation)
                    }}
                >
                    <View style={styles.addBtn}>
                        <AppTextBold style={styles.addBtnText}>
                            Обратная связь
                        </AppTextBold>
                    </View>
                </AppButton>
                <View style={styles.topPanelWrapper}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{...styles.addProductBtn, opacity: 0}}
                        onPress={() => {
                            //LinkTo("AddNomenclaturaScreen", {}, navigation)
                        }}
                    >
                        <AppTextBold style={styles.addProductBtnText}>
                            Добавить{"\n"}
                            товар
                        </AppTextBold>
                        <Svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Circle r="12" transform="matrix(-1 0 0 1 12 12)" fill="#E96C6C"/>
                            <Path d="M10.9736 10.8224C10.9736 10.8777 10.9289 10.9224 10.8736 10.9224H5.74697C5.69174 10.9224 5.64697 10.9672 5.64697 11.0224V12.0904C5.64697 12.1456 5.69174 12.1904 5.74697 12.1904H10.8736C10.9289 12.1904 10.9736 12.2351 10.9736 12.2904V17.547C10.9736 17.6022 11.0184 17.647 11.0736 17.647H12.3285C12.3838 17.647 12.4285 17.6022 12.4285 17.547V12.2904C12.4285 12.2351 12.4733 12.1904 12.5285 12.1904H17.547C17.6022 12.1904 17.647 12.1456 17.647 12.0904V11.0224C17.647 10.9672 17.6022 10.9224 17.547 10.9224H12.5285C12.4733 10.9224 12.4285 10.8777 12.4285 10.8224V5.74697C12.4285 5.69174 12.3838 5.64697 12.3285 5.64697H11.0736C11.0184 5.64697 10.9736 5.69174 10.9736 5.74697V10.8224Z" fill="white"/>
                        </Svg>
                    </TouchableOpacity>
                    {
                        img.current
                            ?
                            <Image
                                style={styles.topPanelImg}
                                source={{uri: img.current}}
                            />
                            :
                            <Image
                                style={styles.topPanelImg}
                            />
                    }
                    <AppDeleteDraft
                        id={id}
                        disabled={type != "update"}
                        onResult={() => {
                            globalAlert({
                                title: "Вы действительно хотите удалить товар?",
                                okButtonText: "Да",
                                cancelButtonText: "Нет",
                                async onOkFun() {
                                    const response = await AppFetch.getWithToken("removeProduct", {id}, {}, navigation)
                                    if(response.result) {
                                        LinkTo("MyAssortmentScreen", {}, navigation)
                                    }
                                }
                            })
                        }}
                    />
                </View>
                <View style={styles.container}>
                    <AppWrapperBottomBorder
                        placeholder={"Тип"}
                    >
                        <CheckboxWithLabel
                            label={"Растение"}
                            reversed={true}
                            conditionInit={formData.current.type == "sort"}
                            style={{width: 90, paddingBottom: 0, borderBottomWidth: 0}}
                            textStyle={{paddingLeft: 20}}
                            onChange={async () => {
                                formData.current.type = "sort"
                                await getCat("sort")
                            }}
                        />
                        <CheckboxWithLabel
                            label={"Химикат"}
                            reversed={true}
                            conditionInit={formData.current.type == "chemical"}
                            style={{width: 100, paddingBottom: 0, borderBottomWidth: 0}}
                            textStyle={{paddingLeft: 20}}
                            onChange={async () => {
                                formData.current.type = "chemical"
                                await getChemical()
                                await getCat("chemical")
                            }}
                        />
                    </AppWrapperBottomBorder>
                </View>
                {
                    formData.current.type == "sort"
                        ?
                        <View style={{...styles.selectBlock, position: "relative", zIndex: 90}}>
                            <View style={styles.select}>
                                <AppText style={styles.selectLabel}>
                                    Культура
                                </AppText>
                                <AppSelectModified
                                    title={type != "update" ? "Выберите культуру" : getNameOfProp(formData.current.culture, 'culture', "Выберите культуру")}
                                    showDefaultTitle={false}
                                    style={{backgroundColor: THEME.BLUE}}
                                    borderColor={THEME.BLUE}
                                    selectStyle={{
                                        backgroundColor: THEME.ALL_COLOR,
                                        borderColor: "transparent", ...selectStyle
                                    }}
                                    color={"#fff"}
                                    data={cultures_list.current}
                                    onResult={async culture_id => {
                                        formData.current.culture = culture_id
                                        await getSorts(culture_id)
                                    }}
                                />
                            </View>
                            <View style={styles.select}>
                                <AppText style={styles.selectLabel}>
                                    Сорт
                                </AppText>
                                <AppSelectModified
                                    title={type != "update" ? "Выберите сорт" : getNameOfProp(formData.current.sort, 'sort', "Выберите сорт")}
                                    showDefaultTitle={false}
                                    style={{backgroundColor: THEME.BLUE}}
                                    borderColor={THEME.BLUE}
                                    selectStyle={{backgroundColor: THEME.ALL_COLOR, borderColor: "transparent", ...selectStyle}}
                                    color={"#fff"}
                                    data={sorts_list.current}
                                    onResult={sort_id => {
                                        formData.current.sort = sort_id
                                        setImage(sort_id)
                                        setReload(!reload)
                                    }}
                                />
                            </View>
                        </View>
                        :
                        <View style={{position: "relative", zIndex: 91}}>
                            <AppText style={styles.selectLabel}>
                                Химикат
                            </AppText>
                            <AppSelectModified
                                title={type != "update" ? "Выберите химикат" : getNameOfProp(formData.current.sort, 'sort', "Выберите химикат")}
                                showDefaultTitle={false}
                                //initValue={formData.current.sort}
                                style={{backgroundColor: THEME.BLUE}}
                                borderColor={THEME.BLUE}
                                selectStyle={{backgroundColor: THEME.ALL_COLOR, borderColor: "transparent", ...selectStyle}}
                                color={"#fff"}
                                data={sorts_list.current}
                                onResult={sort_id => {
                                    formData.current.sort = sort_id
                                    setImage(sort_id)
                                    setReload(!reload)
                                }}
                            />
                        </View>
                }
                <View style={{...styles.selectBlock, zIndex: 1}}>
                    <View style={styles.select}>
                        <AppText style={styles.selectLabel}>
                            Категория
                        </AppText>
                        <AppSelectModified
                            title={type != "update" ? "Выберите категорию" : getNameOfProp(formData.current.category_id, 'cat', "Выберите категорию")}
                            showDefaultTitle={false}
                            style={{backgroundColor: THEME.BLUE}}
                            borderColor={THEME.BLUE}
                            selectStyle={{
                                backgroundColor: THEME.ALL_COLOR,
                                borderColor: "transparent", ...selectStyle
                            }}
                            color={"#fff"}
                            data={categories_list.current}
                            onResult={async cat_id => {
                                formData.current.category_id = cat_id
                                await getCatValues(cat_id)
                            }}
                        />
                    </View>
                    <View style={styles.select}>
                        <AppText style={styles.selectLabel}>
                            Значение категории
                        </AppText>
                        <AppSelectModified
                            title={type != "update" ? "Значение категории" : getNameOfProp(formData.current.category_value, 'cat_val', "Значение категории")}
                            showDefaultTitle={false}
                            style={{backgroundColor: THEME.BLUE}}
                            borderColor={THEME.BLUE}
                            selectStyle={{backgroundColor: THEME.ALL_COLOR, borderColor: "transparent", ...selectStyle}}
                            color={"#fff"}
                            data={categories_val_list.current}
                            onResult={val => {
                                formData.current.category_value = val
                            }}
                        />
                    </View>
                </View>
                <View style={{...styles.container}}>
                    <View accessible={true}>
                        {/*<AppInputBorderBottom*/}
                        {/*    placeholder={"Категория"}*/}
                        {/*/>*/}
                        {/*<AppInputBorderBottom*/}
                        {/*    placeholder={"Характеристика"}*/}
                        {/*/>*/}
                        <AppInputBorderBottom
                            placeholder={"Наименование единицы измерения"}
                            value={formData.current.unit}
                            onResult={val => {
                                formData.current.unit = val
                                setReload(!reload)
                            }}
                        />
                    </View>
                    <AppWrapperBottomBorder
                        placeholder={"Единица измерения"}
                    >
                        <View style={styles.counterBlock}>
                            <AppCounter
                                btnStyle={{borderColor: THEME.GREY_TEXT}}
                                initColor={THEME.GREY_TEXT}
                                color={THEME.GREY_TEXT}
                                inputStyle={{color: THEME.GREY_TEXT}}
                                valueIs={formData.current.quality}
                                onResult={val => {
                                    formData.current.quality = val
                                    setReload(!reload)
                                }}
                            />
                            <AppText style={styles.counterBlockLabel}>
                                Количество в наличии
                            </AppText>
                        </View>
                    </AppWrapperBottomBorder>
                    <AppWrapperBottomBorder>
                        <View style={{...styles.counterBlock, marginTop: 20}}>
                            <AppCounter
                                btnStyle={{borderColor: THEME.GREY_TEXT}}
                                initColor={THEME.GREY_TEXT}
                                valueIs={formData.current.price}
                                color={THEME.GREY_TEXT}
                                inputStyle={{color: THEME.GREY_TEXT}}
                                textAfter={"₽"}
                                onResult={val => {
                                    formData.current.price = val
                                    setReload(!reload)
                                }}
                            />
                            <AppText style={styles.counterBlockLabel}>
                                Стоимость за 1 ед. измерения в руб.
                            </AppText>
                        </View>
                    </AppWrapperBottomBorder>
                    <AppInputBorderBottom
                        checkbox={true}
                        //inputStyle={{backgroundColor: "red"}}
                        bottomPlaceholder={true}
                        placeholder={"Дополнительная информация"}
                        value={formData.current.addition_information}
                        onResult={val => {
                            formData.current.addition_information = val
                            setReload(!reload)
                        }}
                    />
                    {
                        !sending
                            ?
                            <AppBlueButton
                                style={styles.btn}
                                onPress={async () => {
                                    if(type != "update") await addProduct()
                                    else await updateProduct()
                                }}
                            >
                                Сохранить
                            </AppBlueButton>
                            :
                            <AppBlueButton
                                style={styles.btn}
                            >
                                <ActivityIndicator size="small" style={{marginRight: 20}} color={"#fff"} />
                                Сохранить
                            </AppBlueButton>
                    }
                </View>

            </AppWrap>
        )
    } else return <></>
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
        zIndex: 9999,
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 9999
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
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#C4C4C4"
    },
    addBtnOrig: {
        width: 160,
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
        marginBottom: 0,
        fontSize: 12
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
            <AppIndicator timer={.2} />
        </>
    )
}

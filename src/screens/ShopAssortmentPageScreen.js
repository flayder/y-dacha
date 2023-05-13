import React, {useLayoutEffect, useEffect, useState, useRef} from "react"
import {View, StyleSheet, ImageBackground, TouchableOpacity, Dimensions} from "react-native"
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppWrap} from "../ui/AppWrap";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {useDispatch, useSelector} from "react-redux";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {globalAlert, mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import AppRatingVote from "../ui/sortDetailPageScreen/AppRatingVote";
import {Svg, Path, Circle} from "react-native-svg";
import {AppText} from "../ui/AppText";
import {THEME} from "../../theme";
import * as Linking from 'expo-linking';
import {
    getRandomKey, GLOBAL_NOT_ADDING_TARRIF,
    GLOBAL_NOT_ADDING_TARRIF_TITLE,
    globalRouteFun,
    LinkTo,
    SHOPBYNAME,
    SHOPBYPRICE
} from "../../global";
import {loadShop} from "../store/actions/shops";
import AppProductItem from "../ui/shopAssortmentPageScreen/AppProductItem";
import AppSelectModified from "../ui/AppSelectModified";
import {AppFetch} from "../AppFetch";
import {AppTextItalic} from "../ui/AppTextItalic";

const pageWrapper = ({navigation, route}) => {
    let id = 0
    let productId = 0
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('masterId')) {
            id = route.params.masterId
        }

        if(route.params.hasOwnProperty('productId')) {
            productId = route.params.productId
        }
    }
    if(id === 0) {
        return (
            <AppTextBold>
                Неверные данные!
            </AppTextBold>
        )
    }
    useLayoutEffect(() => {
        navigation.setOptions(
            mainHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "ShopDetailPageScreen"
                }),
            [navigation])
    })

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    const init = true
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadShop({id, navigation})).then()
    }, [init])

    const data = useSelector(state => state.shops.currentShop)
    //const [filterUsed, setFilterUsed] = useState(false)
    const [sort, setSort] = useState("name")
    const [order, setOrder] = useState("asc")
    const [culturesSelected, setCulturesSelected] = useState(0)
    const [categoriesSelected, setCategoriesSelected] = useState(0)
    const [typeSelected, setTypeSelected] = useState("")
    const [availableSelected, setAvailableSelected] = useState("")
    const [products, setProducts] = useState([])
    const categories = useRef([])
    const cultures = useRef([])
    const product = useRef(false)
    //const initiation = useRef(false)

    const pluckCategories = async (data) => {
        categories.current = []
        data.map(item => {
            categories.current.push({
                name: item.category,
                value: item.id
            })
        })

        return Promise.resolve(true)
    }

    const pagination = useRef(1)

    const pluckCultures = async (data) => {
        cultures.current = []
        data.map(item => {
            cultures.current.push({
                name: item.name,
                value: item.id
            })
        })

        return Promise.resolve(true)
    }

    const [load, setLoad] = useState(false)

    const searchProduct = async (data) => {
        product.current = data
        //console.log('product.current', product.current)
        return Promise.resolve(true)
    }

    const counts = useRef(0)

    const initiate = (page = 1) => {
        pagination.current = page
        if(page == 1 && products.length > 0) {
            setProducts([])
        }
        AppFetch.getWithToken("getProducts", {
            id,
            productId,
            sort,
            order,
            page,
            cultures: culturesSelected,
            categories: categoriesSelected,
            type: typeSelected,
            available: availableSelected
        }, {}, navigation).then(async (response) => {
            //console.log('loading', response)
            if(response.result) {
                counts.current = response.data.products.length
                if(cultures.current.length == 0) {
                    await pluckCategories(response.data.categories)
                    await pluckCultures(response.data.cultures)
                    await searchProduct(response.data.product)
                }
                const arr = pagination.current > 1 ? products : []
                for(let i in response.data.products) {
                    arr.push(response.data.products[i])
                }

                setProducts(arr)
                setLoad(!load)
                //console.log('arr123', products.length)

            }
        })
    }

    const user = useSelector(state => state.others.userInfo)

    //console.log('products', products.length)

    useEffect(() => {
        //console.log('okokko', Date.now() + Platform.OS)
        initiate()
    }, [sort, order, culturesSelected, categoriesSelected, availableSelected, typeSelected])

    const scrollerHandler = ({nativeEvent}) => {
        const scroll = nativeEvent.contentSize.height - (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y)
        if(scroll < 50 && 0 < scroll && counts.current > 0) {
            initiate(pagination.current + 1)
        }
    }
    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}} onScroll={scrollerHandler}>
            <View style={styles.mainTitle}>
                <Svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M17.4375 5.68039H15.9844L10.6406 0.233922C10.4062 -0.00495808 9.9375 -0.10051 9.75 0.13837C9.51562 0.37725 9.51562 0.711682 9.75 0.950562L14.3906 5.68039H3.60938L8.25 0.950562C8.48438 0.711682 8.48438 0.37725 8.25 0.13837C8.01562 -0.10051 7.59375 -0.00495808 7.35938 0.233922L2.01562 5.68039H0.5625C0.234375 5.68039 0 5.91927 0 6.2537C0 6.58813 0.234375 6.82701 0.5625 6.82701H1.125L2.25 14.8534C2.25 15.4745 2.76563 16 3.375 16H14.625C15.2344 16 15.75 15.4745 15.75 14.8534L16.875 6.82701H17.4375C17.7656 6.82701 18 6.58813 18 6.2537C18 5.91927 17.7656 5.68039 17.4375 5.68039ZM13.6406 13.7068H4.35938L4.21875 12.5601H13.7812L13.6406 13.7068ZM13.9219 11.4135H4.07812L3.9375 10.2669H14.0625L13.9219 11.4135ZM14.2031 9.12026H3.79688L3.65625 7.97363H14.3438L14.2031 9.12026Z" fill="black"/>
                </Svg>
                <View style={{width: 10}}></View>
                <AppTextBold style={styles.title}>
                    {data.name}
                </AppTextBold>
            </View>
            <View style={styles.topPanelWrap}>
                {
                    typeof user == "object" && user.is_addition
                        ?
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.topPanelLink}
                            onPress={() => {
                                LinkTo("GoogleMapShopPageScreen", {
                                    masterId: data.id,
                                    previousRoute: "ShopAssortmentPageScreen",
                                    cultureId: data.culture_id
                                }, navigation)
                            }}
                        >
                            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Circle cx="9" cy="9" r="9" fill="#BDBDBD"/>
                                <Path d="M9.15666 3.70587C7.01306 3.70587 5.29395 5.49236 5.29395 7.67101C5.29395 8.38997 5.48496 9.06535 5.82454 9.65358L9.17788 14.2941L12.5312 9.65358C12.8708 9.06535 13.0618 8.38997 13.0618 7.67101C13.0618 5.47058 11.3215 3.70587 9.1991 3.70587L9.15666 3.70587ZM9.15666 9.65358C8.09547 9.65358 7.2253 8.76034 7.2253 7.67101C7.2253 6.58169 8.09547 5.68844 9.15666 5.68844C10.2178 5.68844 11.088 6.58169 11.088 7.67101C11.088 8.76034 10.2178 9.65358 9.15666 9.65358Z" fill="white"/>
                            </Svg>
                            <View style={{width: 8}}></View>
                            <AppText style={styles.topPanelText}>
                                На карте
                            </AppText>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.topPanelLink}
                            onPress={() => {
                                globalAlert({
                                    title: GLOBAL_NOT_ADDING_TARRIF_TITLE,
                                    text: GLOBAL_NOT_ADDING_TARRIF
                                })
                            }}
                        >
                            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Circle cx="9" cy="9" r="9" fill="#BDBDBD"/>
                                <Path d="M9.15666 3.70587C7.01306 3.70587 5.29395 5.49236 5.29395 7.67101C5.29395 8.38997 5.48496 9.06535 5.82454 9.65358L9.17788 14.2941L12.5312 9.65358C12.8708 9.06535 13.0618 8.38997 13.0618 7.67101C13.0618 5.47058 11.3215 3.70587 9.1991 3.70587L9.15666 3.70587ZM9.15666 9.65358C8.09547 9.65358 7.2253 8.76034 7.2253 7.67101C7.2253 6.58169 8.09547 5.68844 9.15666 5.68844C10.2178 5.68844 11.088 6.58169 11.088 7.67101C11.088 8.76034 10.2178 9.65358 9.15666 9.65358Z" fill="white"/>
                            </Svg>
                            <View style={{width: 8}}></View>
                            <AppText style={styles.topPanelText}>
                                На карте
                            </AppText>
                        </TouchableOpacity>
                }

                <AppRatingVote
                    style={styles.topPanelVote}
                    initiate={data.rating}
                    starWidth={10}
                    starHeight={10}
                />
            </View>
            <View style={styles.img}>
                <ImageBackground
                    style={styles.bg}
                    source={{uri: data.emblem}}
                    resizeMode={"cover"}
                />
                {
                    data.hasOwnProperty('user') && data.user.hasOwnProperty('info')
                        ?
                        <View style={styles.siteBlock}>
                            <TouchableOpacity
                                style={styles.siteBlockTextWrap}
                                activeOpacity={1}
                                onPress={async () => {
                                    await Linking.openURL(data.user.info.site)
                                }}
                            >
                                <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M13.1107 13.1123C13.3742 11.7952 13.5205 10.4196 13.5205 9.0147C13.5205 7.60982 13.3742 6.23421 13.1107 4.91714C11.7937 4.65373 10.4181 4.50739 9.01318 4.50739C7.6083 4.50739 6.23269 4.65373 4.91562 4.91714C4.6522 6.23421 4.50586 7.60982 4.50586 9.0147C4.50586 10.4196 4.6522 11.7952 4.91562 13.1123C6.23269 13.3757 7.6083 13.522 9.01318 13.522C10.4181 13.522 11.7937 13.3757 13.1107 13.1123Z" fill="white"/>
                                    <Path d="M3.36585 9.01466C3.36585 7.69758 3.51219 6.43905 3.71707 5.20978C2.57561 5.50246 1.46341 5.88295 0.409756 6.32197C0.146341 7.17075 0 8.07807 0 9.01466C0 9.95124 0.146341 10.8586 0.409756 11.7073C1.46341 12.1756 2.57561 12.5561 3.71707 12.8488C3.51219 11.6195 3.36585 10.3317 3.36585 9.04392V9.01466Z" fill="white"/>
                                    <Path d="M9.01582 3.36585C10.3329 3.36585 11.5914 3.51219 12.8207 3.71707C12.528 2.57561 12.1475 1.46341 11.7085 0.409756C10.8597 0.146341 9.9524 0 9.01582 0C8.07923 0 7.17191 0.146341 6.32313 0.409756C5.85484 1.46341 5.47435 2.57561 5.21094 3.71707C6.44021 3.51219 7.72801 3.36585 9.01582 3.36585Z" fill="white"/>
                                    <Path d="M9.01582 14.6341C7.69874 14.6341 6.44021 14.4878 5.21094 14.2829C5.50362 15.4244 5.88411 16.5366 6.32313 17.5902C7.17191 17.8536 8.07923 18 9.01582 18C9.9524 18 10.8597 17.8536 11.7085 17.5902C12.1768 16.5366 12.5573 15.4244 12.8207 14.2829C11.5914 14.4878 10.3036 14.6341 9.01582 14.6341Z" fill="white"/>
                                    <Path d="M13.1416 1.02435C13.4928 1.99021 13.8148 2.95606 14.0489 3.98045C15.0733 4.2146 16.0392 4.50728 17.005 4.88777C16.1562 3.24874 14.8099 1.9024 13.1709 1.05362L13.1416 1.02435Z" fill="white"/>
                                    <Path d="M4.85951 16.9756C4.50829 16.0097 4.18634 15.0439 3.95219 14.0195C2.9278 13.7854 1.96195 13.4927 0.996094 13.1122C1.84487 14.7512 3.19122 16.0975 4.83024 16.9463L4.85951 16.9756Z" fill="white"/>
                                    <Path d="M17.5915 11.678C17.8549 10.8293 18.0013 9.92194 18.0013 8.98536C18.0013 8.04877 17.8549 7.14146 17.5915 6.29268C16.5378 5.82438 15.4256 5.4439 14.2842 5.18048C14.4891 6.40975 14.6354 7.69755 14.6354 8.98536C14.6354 10.3024 14.4891 11.561 14.2842 12.7902C15.4256 12.4976 16.5378 12.1171 17.5915 11.6488V11.678Z" fill="white"/>
                                    <Path d="M16.9767 13.1415C16.0108 13.4927 15.045 13.8147 14.0206 14.0488C13.7865 15.0732 13.4938 16.039 13.1133 17.0049C14.7523 16.1561 16.0986 14.8098 16.9474 13.1707L16.9767 13.1415Z" fill="white"/>
                                    <Path d="M1.02539 4.85853C1.99124 4.50731 2.9571 4.18536 3.98149 3.95121C4.21563 2.92682 4.50832 1.96097 4.8888 0.995117C3.24978 1.8439 1.90344 3.19024 1.05466 4.82926L1.02539 4.85853Z" fill="white"/>
                                </Svg>
                                <View style={{width: 10}}></View>
                                <AppText style={styles.siteBlockText}>
                                    {data.user.info.site}
                                </AppText>
                            </TouchableOpacity>
                        </View>
                        :
                        <></>
                }
            </View>
            {
                product.current && productId > 0
                    ?
                    <View style={styles.searchBlock}>
                        <AppTextItalic style={styles.searchText}>
                            Вы ищите товар
                        </AppTextItalic>
                        <AppProductItem
                            width={screeWidth}
                            data={product.current}
                        />
                    </View>
                    :
                    <></>
            }
            <AppTextBold style={{...styles.title, marginTop: 10}}>
                Ассортимент магазина
            </AppTextBold>
            <View style={styles.selectWrapper}>
                <View style={{...styles.selectWrap, zIndex: 9999}}>
                    <AppSelectModified
                        title={"Культура (все)"}
                        //showDefaultTitle={false}
                        initValue={culturesSelected}
                        cancelDefaultAutoNaming={true}
                        onResult={result => {
                            let res = 0
                            if(result) {
                                res = result
                            }
                            pagination.current = 1
                            if(culturesSelected != res)
                                setCulturesSelected(res)
                        }}
                        data={cultures.current}
                    />
                </View>
                <View style={{...styles.selectWrap, zIndex: 9999}}>
                    <AppSelectModified
                        title={"Категории (все)"}
                        //showDefaultTitle={false}
                        cancelDefaultAutoNaming={true}
                        onResult={result => {
                            let res = 0
                            if(result) {
                                res = result
                            }
                            pagination.current = 1
                            setCategoriesSelected(res)
                        }}
                        data={categories.current}
                    />
                </View>
                <View style={{...styles.selectWrap, zIndex: 999}}>
                    <AppSelectModified
                        title={"Тип товара (все)"}
                        //showDefaultTitle={false}
                        cancelDefaultAutoNaming={true}
                        initValue={typeSelected}
                        onResult={result => {
                            let res = ""
                            if(result) {
                                res = result
                            }
                            pagination.current = 1
                            setTypeSelected(res)
                        }}
                        data={[
                            {
                                value: "sort",
                                name: "Сорт"
                            },
                            {
                                value: "chemical",
                                name: "Химикат"
                            }
                        ]}
                    />
                </View>
                <View style={{...styles.selectWrap, zIndex: 999}}>
                    <AppSelectModified
                        title={"Наличие (все)"}
                        //showDefaultTitle={false}
                        cancelDefaultAutoNaming={true}
                        initValue={availableSelected}
                        onResult={result => {
                            let res = ""
                            if(result) {
                                res = result
                            }
                            pagination.current = 1
                            setAvailableSelected(res)
                        }}
                        data={[
                            {
                                value: 'available',
                                name: "В наличии",
                            },
                            {
                                value: 'notavailable',
                                name: "Не в наличии",
                            }
                        ]}
                    />
                </View>
                <View style={{...styles.selectWrap, zIndex: 99}}>
                    <AppSelectModified
                        title={"По названию"}
                        cancelDefaultAutoNaming={true}
                        onResult={result => {
                            let res = "name"
                            if(result) {
                                res = result
                            }

                            setSort(res)
                        }}
                        data={[
                            {
                                value: SHOPBYPRICE,
                                name: "По цене",
                            },
                            {
                                value: "name",
                                name: "По рейтингу",
                            }
                        ]}
                    />
                </View>
                <View style={{...styles.selectWrap, zIndex: 99}}>
                    <AppSelectModified
                        title={"По возрастанию"}
                        cancelDefaultAutoNaming={true}
                        onResult={result => {
                            // let res = "asc"
                            // if(result) {
                            //     res = result
                            // }

                            setOrder(result)
                        }}
                        showDefaultTitle={false}
                        data={[
                            {
                                name: "По возрастанию",
                                value: "asc"
                            },
                            {
                                name: "По убыванию",
                                value: "desc"
                            }
                        ]}
                    />
                </View>
            </View>
            <View style={styles.container}>
                {
                    products.map(item => {
                        return <AppProductItem
                            key={getRandomKey()}
                            width={screeWidth}
                            data={item}
                            navigation={navigation}
                        />
                    })
                }
            </View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    searchBlock: {
        padding: 20
    },
    searchText: {
        textAlign: "right",
        color: THEME.BLUE
    },
    selectWrapper: {
        position: "relative",
        zIndex: 999,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        elevation: 9
    },
    selectWrap: {
        width: "50%",
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    siteBlock: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    siteBlockTextWrap: {
        backgroundColor: "#000",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 8
    },
    siteBlockText: {
        color: "#fff",
        marginTop: 0,
        marginBottom: 0
    },
    topPanelText: {
        marginTop: 0,
        marginBottom: 0,
        fontSize: 11
    },
    topPanelLink: {
        flexDirection: "row",
        alignItems: "center"
    },
    topPanelWrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    topPanelVote: {
        width: 70,
        marginTop: 10,
        paddingTop: 0
    },
    btnWrap: {
        flexDirection: "row",
        alignItems: "center"
    },
    btnMap: {
        width: 180,
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 9,
        paddingBottom: 9,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: THEME.FOOTER_BG
    },
    voteBlocking: {
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 9
    },
    img: {
        position: "relative"
    },
    siteHttp: {
        flexDirection: "row",
        alignItems: "center"
    },
    siteLink: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    siteLinkText: {
        color: THEME.FOOTER_BG
    },
    content: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    text: {
        marginTop: 0,
        marginBottom: 0
    },
    mainTitle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20
    },
    bg: {
        width: "100%",
        height: 160
    },
    voteWrap: {
        //flexDirection: "row",
        //flexWrap: "wrap"
    },
    vote: {
        width: 250,
        marginLeft: "auto",
        marginRight: "auto",
        flexWrap: "wrap",
        paddingLeft: 30,
        paddingRight: 30
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

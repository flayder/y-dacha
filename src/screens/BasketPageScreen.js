import React, {useLayoutEffect, useEffect, useState} from "react"
import {View, StyleSheet, Dimensions} from "react-native"
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {useDispatch, useSelector} from "react-redux";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {globalAlert, titleHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import moment from "moment";
import 'moment/locale/ru'
import {AppWrap} from "../ui/AppWrap";
import AppOrderItem from "../ui/orderListPageScreen/AppOrderItem";
import AppTopOrderPanel from "../ui/basketPageScreen/AppTopOrderPanel";
import {THEME} from "../../theme";
import AppOrderTotalBlock from "../ui/orderUI/AppOrderTotalBlock";
import AppOrderSaveButton from "../ui/orderUI/AppOrderSaveButton";
import {AppFetch} from "../AppFetch";
import {getRandomKey, globalRouteFun, LinkTo} from "../../global";
import {getBasketItems} from "../store/actions/other";
import AppOrderItemProductCount from "../ui/orderUI/AppOrderItemProductCount";

const pageWrapper = ({navigation, route}) => {
    useLayoutEffect(() => {
        navigation.setOptions(
            titleHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "MasterDetailPageScreen",
                    titleName: "Заказы",
                    mainIcon: true
                }),
            [navigation])
    })
    const [reload, setReload] = useState(false)
    const init = true

    const data = useSelector(state => state.others.basket_items)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBasketItems({navigation}))
    }, [init])

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    //console.log('loadMore', loadMore)

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            <View style={styles.container}>
                <AppTopOrderPanel
                    colorActive={THEME.CHEMICAL_COLOR}
                    name={'basket'}
                />

                {
                    data.map(item => {
                        //console.log('item', item)
                        const itemData = {}
                        let total = 0
                        let user_id = 0

                        let type = ""

                        if(item.hasOwnProperty('products') && Array.isArray(item.products)) {
                            item.products.map(item => {
                                type = item.type
                                total += parseInt(item.price)
                            })
                        }

                        //console.log('item', item)

                        if(item.hasOwnProperty('user')) {
                            if(item.user.is_seller) {
                                itemData.photo = item.user.photo
                                itemData.title = item.user.seller.name
                                itemData.subtitle = "Продавец: " + item.user.first_name + " " + item.user.last_name
                                itemData.status = "Заказ не оформлен"
                                itemData.date = moment().format("DD.MM") + " в " + moment().format("h:mm")
                            }
                            user_id = item.user.user_id
                        }

                        //console.log('itemData', itemData)

                        return <View style={{borderTopWidth: 1, borderColor: THEME.ALL_COLOR}} key={getRandomKey()}>
                            <AppOrderItem
                                screenWidth={screeWidth}
                                item={itemData}
                                onDelete={async id => {
                                    //console.log('item.user_id', user_id)
                                    globalAlert({
                                        title: "Вы действительно хотите удалить товар из корзины?",
                                        okButtonText: "Да",
                                        cancelButtonText: "Отмена",
                                        async onOkFun() {
                                            const response = await AppFetch.getWithToken("removeAllBasketItems", {
                                                id: user_id
                                            }, {}, navigation)
                                            //console.log(response)
                                            if(response.result) {
                                                dispatch(getBasketItems({navigation}))
                                            }
                                        }
                                    })
                                }}
                            >
                                {
                                    total > 0
                                        ?
                                        item.products.map((item, key) => {
                                            //console.log('item', item)
                                            //type = item.type
                                            return <AppOrderItemProductCount
                                                screenWidth={screeWidth}
                                                key={getRandomKey()}
                                                item={item}
                                                onResult={async quantity => {
                                                    const response = await AppFetch.getWithToken("updateBasketItemQuantity", {
                                                        id: item.id,
                                                        quantity
                                                    }, {}, navigation)

                                                    // if(response.result) {
                                                    //     dispatch(getBasketItems({navigation}))
                                                    // }
                                                }}
                                                num={key + 1}
                                                onDelete={async id => {
                                                    //console.log(id)
                                                    const response = await AppFetch.getWithToken("removeBasketItem", {
                                                        id
                                                    }, {}, navigation)

                                                    if(response.result) {
                                                        dispatch(getBasketItems({navigation}))
                                                    }
                                                }}
                                            />
                                        })
                                        :
                                        <></>
                                }
                                <AppOrderTotalBlock
                                    text={"Итого:"}
                                    price={total}
                                />
                                <AppOrderSaveButton
                                    text={"Оформить заказ"}
                                    onPress={async () => {
                                        const response = await AppFetch.getWithToken("addOrder", {
                                            id: user_id
                                        }, {}, navigation)

                                        if(response.result) {
                                            //dispatch(getBasketItems({navigation}))
                                            globalAlert({
                                                title: "Заказ успешно офрормлен"
                                            })
                                            if(type == "master")
                                                LinkTo("OrderMasterPageScreen", {}, navigation)
                                            else
                                                LinkTo("OrderBuyerPageScreen", {}, navigation)
                                        }
                                    }}
                                />
                            </AppOrderItem>
                        </View>
                    })
                }
            </View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
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

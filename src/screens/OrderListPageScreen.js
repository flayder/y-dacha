import React, {useLayoutEffect, useEffect, useState, useRef} from "react"
import {View, StyleSheet, Dimensions, TouchableOpacity} from "react-native"
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
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
import {THEME} from "../../theme";
import AppOrderTotalBlock from "../ui/orderUI/AppOrderTotalBlock";
import AppOrderSaveButton from "../ui/orderUI/AppOrderSaveButton";
import {AppFetch} from "../AppFetch";
import {getRandomKey, globalRouteFun, LinkTo, orderItemsStyles} from "../../global";
import {AppTextBold} from "../ui/AppTextBold";
import {Path, Rect, Svg} from "react-native-svg";
import {AppText} from "../ui/AppText";
import AppInput from "../ui/formUI/AppInput";
import AppChangeStatus from "../ui/orderUI/AppChangeStatus";
import AppEmptyText from "../ui/AppEmptyText";
import AppOrderTitle from "../ui/AppOrderTitle";
import AppOrderItemProduct from "../ui/orderListPageScreen/AppOrderItemProduct";

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
    const statuses = useRef([])
    const deliveries = useRef([])
    const init = true

    const [data, setData] = useState([])

    const configurateDeliveries = (data) => {
        if(Array.isArray(data)) {
            data.map(item => {
                deliveries.current.push(item)
            })
        }

        //console.log('del', deliveries.current)
    }

    const configurateStatuseFun = (data) => {
        if(Array.isArray(data)) {
            data.map(item => {
                if(item.hasOwnProperty('id') && item.hasOwnProperty('status_name'))
                    statuses.current.push({
                        name: item.status_name,
                        value: item.id
                    })
            })
        }
    }

    const getStatus = (id) => {
        let name = ""
        statuses.current.map(item => {
            if(item.hasOwnProperty('value') && item.value == id) name = item.name
        })

        return name
    }

    const getStatusColor = (id) => {
        switch (id) {
            case 6:
                return THEME.FOOTER_BG
            case 10:
                return THEME.CHEMICAL_COLOR
            case 8:
                return THEME.CHEMICAL_COLOR
            case 2:
                return THEME.GREEN
            case 7:
                return THEME.GREEN
            default:
                return THEME.ORANGE
        }
    }

    const initiate = async () => {
        const response = await AppFetch.getWithToken("getSellerOrders", {
            type: "owner"
        }, {}, navigation)
        //console.log('res', response)
        if(response.result) {
            if(response.data.hasOwnProperty('statuses')) configurateStatuseFun(response.data.statuses)
            if(response.data.hasOwnProperty('deliveries')) configurateDeliveries(response.data.deliveries)
            if(response.data.hasOwnProperty('orders')) setData(response.data.orders)
        }

        setTimeout(() => {
            setReload(!reload)
        }, 100)
    }

    const opened = useRef(0)

    useEffect(() => {
        initiate()
    }, [init])

    //console.log('data', data)

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    //console.log('loadMore', data)

    const getDeliveryName = (idIs) => {
        let id = false
        //console.log('deliveries.current', deliveries.current, idIs)
        deliveries.current.map(item => {
            if(item.id == idIs) id = item.name
        })
        return id
    }


    const updateOrder = async (orderArr) => {
        const order = orderArr
        let products = []
        if(order.hasOwnProperty('products')) products = JSON.stringify(order.products)
        order.type = "owner"
        const response = await AppFetch.getWithToken("updateOrder", {
            ...order,
            products
        }, {}, navigation)
        if(response.result) {
            await initiate()
            globalAlert({
                title: `Заказ №${order.id} был успешно обновлен`
            })
        }
    }
    const cancelOrder = async ({id, status_id}) => {
        const response = await AppFetch.getWithToken("updateOrderStatus", {
            id,
            status_id,
            type: "owner"
        }, {}, navigation)
        if(response.result) {
            await initiate()
            globalAlert({
                title: `Заказ №${id} был отменен`
            })
        }
    }
    //console.log('data', JSON.stringify(data))
    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            <View style={styles.container}>
                <AppOrderTitle
                    title={"Заказы продавца"}
                />
                {
                    Array.isArray(data) && data.length > 0
                        ?
                        data.map((item, globalKey) => {
                            const itemData = {}
                            let total = 0
                            let user_id = 0
                            if(item.hasOwnProperty('products') && Array.isArray(item.products)) {
                                item.products.map(item => {
                                    total += parseInt(item.price) * item.quantity
                                })
                            }

                            //console.log('item', item)
                            if(item.hasOwnProperty('id'))
                                itemData.title = "Заказ №" + item.id

                            if(item.hasOwnProperty('user')) {
                                if(item.user.hasOwnProperty('infoShop') && item.user.infoShop.photo) {
                                    itemData.photo = item.user.infoShop.photo
                                } else if (item.user.hasOwnProperty('info')) {
                                    itemData.photo = item.user.info.photo
                                }

                                if(item.user.hasOwnProperty('info')) {
                                    itemData.subtitle = "Покупатель: " + item.user.info.first_name + " " + item.user.info.last_name
                                }
                                if(item.hasOwnProperty('status_id'))
                                    itemData.status = getStatus(item.status_id)
                                if(item.hasOwnProperty('created_at'))
                                    itemData.date = moment(item.created_at).format("DD.MM") + " в " + moment(item.created_at).format("h:mm")
                                if(item.hasOwnProperty('owner_id'))
                                    user_id = item.owner_id
                            }

                            //console.log('item.delivery_method_id)', item.delivery_method_id)

                            return <AppOrderItem
                                key={getRandomKey()}
                                screenWidth={screeWidth}
                                item={itemData}
                                activeColor={getStatusColor(item.status_id)}
                                statusColor={getStatusColor(item.status_id)}
                                opened={opened.current == item.id}
                                onOpened={() => {
                                    //console.log('iiiii', item)
                                    opened.current = item.id
                                }}
                                onDelete={async id => {
                                    //console.log('item.user_id', user_id)
                                    globalAlert({
                                        title: "Вы действительно хотите удалить товар из корзины?",
                                        okButtonText: "Удалить",
                                        async onOkFun() {
                                            const response = await AppFetch.getWithToken("removeOrder", {
                                                id: item.id,
                                                type: "owner"
                                            }, {}, navigation)
                                            //console.log('cancel', response)
                                            if(response.result) {
                                                globalAlert({
                                                    title: `Заказ №${item.id} был успешно удален`
                                                })
                                                await initiate()
                                            }
                                        }
                                    })
                                }}
                            >
                                <>
                                    <AppChangeStatus
                                        data={statuses.current}
                                        value={item.status_id}
                                        onResult={status_id => {
                                            const formData = data
                                            formData[globalKey].status_id = status_id
                                            item.status_id = status_id
                                            setData(formData)
                                            setReload(!reload)
                                        }}
                                    />
                                    {/*<AppChangeStatus />*/}
                                    <AppTextBold style={styles.orderTitle}>
                                        Состав заказа:
                                    </AppTextBold>
                                    {
                                        total > 0
                                            ?
                                            item.products.map((item, key) => {
                                                return <AppOrderItemProduct
                                                    screenWidth={screeWidth}
                                                    key={getRandomKey()}
                                                    item={item}
                                                    onResult={quantity => {
                                                        const formData = data
                                                        formData[globalKey].products[key].quantity = quantity
                                                        setData(formData)
                                                        setReload(!reload)
                                                    }}
                                                />
                                            })
                                            :
                                            <></>
                                    }
                                    <View style={styles.grey}>
                                        <AppTextBold style={styles.orderTitle}>
                                            Дата доставки заказа:
                                        </AppTextBold>
                                        <AppText style={styles.textBlock}>
                                            {moment(itemData.date).isValid() ? moment(itemData.date).format("DD MMMM YYYY") : "У этого пользователя не указана дата доставки"}
                                        </AppText>
                                    </View>
                                    <View style={styles.container}>
                                        {/*<View style={styles.blockArr}>*/}
                                        {/*    <AppTextBold style={styles.orderTitle}>*/}
                                        {/*        Места продажи*/}
                                        {/*        <View style={styles.blockArrow}>*/}
                                        {/*            <Svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                        {/*                <Path d="M9 1.85966e-05L10 1.00002L5.00002 6L0 0.999992L0.999997 -4.29153e-06L5.00001 4.00001L9 1.85966e-05Z" fill="black"/>*/}
                                        {/*            </Svg>*/}
                                        {/*        </View>*/}
                                        {/*    </AppTextBold>*/}
                                        {/*    <AppText style={styles.textBlock}>*/}
                                        {/*        {item.address ? item.address : "У этого пользователя пока нет мест продаж"}*/}
                                        {/*    </AppText>*/}
                                        {/*</View>*/}
                                        <View style={styles.blockArr}>
                                            <AppTextBold style={styles.orderTitle}>
                                                Способ доставки
                                                <View style={styles.blockArrow}>
                                                    <Svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <Path d="M9 1.85966e-05L10 1.00002L5.00002 6L0 0.999992L0.999997 -4.29153e-06L5.00001 4.00001L9 1.85966e-05Z" fill="black"/>
                                                    </Svg>
                                                </View>
                                            </AppTextBold>
                                            <AppText style={styles.textBlock}>
                                                {item.delivery_method_id ? getDeliveryName(item.delivery_method_id) :"У этого пользователя пока нет способов доставки"}
                                            </AppText>

                                        </View>
                                        <View style={styles.borderTop}>
                                            <AppTextBold style={styles.orderTitle}>
                                                Адрес доставки покупателя
                                            </AppTextBold>
                                            <AppInput
                                                inputStyle={styles.input}
                                                value={item.address}
                                                onResult={text => {
                                                    const formData = data
                                                    formData[globalKey].address = text
                                                    item.address = text
                                                    //setReload(!reload)
                                                }}
                                            />
                                        </View>
                                        <View style={styles.borderTop}>
                                            <AppTextBold style={styles.orderTitle}>
                                                Комментарий к заказу
                                            </AppTextBold>
                                            <AppInput
                                                inputStyle={styles.input}
                                                checkbox={true}
                                                value={item.comment}
                                                onResult={text => {
                                                    const formData = data
                                                    formData[globalKey].comment = text
                                                    item.comment = text
                                                    //setReload(!reload)
                                                }}
                                            />
                                        </View>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={styles.messageBtn}
                                            onPress={() => {
                                                LinkTo("ChatPageScreen", {
                                                    masterId: item.user_id
                                                }, navigation)
                                            }}
                                        >
                                            <Svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M17.2882 0.0792554C17.1626 0 16.9951 0 16.8277 0H1.13038C0.962939 0 0.795501 0.0396277 0.669922 0.0792554L8.95811 7.92554L17.2463 0.0792554H17.2882Z" fill="#5382D8"/>
                                                <Path d="M8.95794 9.55039L0 1.07007V11.6903C0 12.2847 0.502315 12.7602 1.13021 12.7602H8.41377L14.5671 6.93497L17.9159 10.1052V1.07007L8.95794 9.55039Z" fill="#5382D8"/>
                                                <Path d="M11.2192 11.69H13.4797V15.9302C13.4797 16.5246 13.982 17.0001 14.6099 17.0001C15.2378 17.0001 15.7401 16.5246 15.7401 15.9302V11.69H18.0005L14.6517 8.51978L11.303 11.69H11.2192Z" fill="#5382D8"/>
                                            </Svg>
                                            <AppTextBold style={styles.messageBtnText}>
                                                Ответить в сообщениях
                                            </AppTextBold>
                                        </TouchableOpacity>
                                        <AppOrderTotalBlock
                                            text={"Итого с учетом доставки"}
                                            price={total}
                                        />

                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={styles.status}
                                            onPress={() => {
                                                cancelOrder({
                                                    id: item.id,
                                                    status_id: 10
                                                })
                                            }}
                                        >
                                            <AppTextBold style={styles.statusText}>
                                                Отменить заказ
                                            </AppTextBold>
                                        </TouchableOpacity>
                                        <AppOrderSaveButton
                                            text={"Применить изменения"}
                                            onPress={() => {
                                                updateOrder(data[globalKey])
                                            }}
                                        />
                                    </View>
                                </>
                            </AppOrderItem>
                        })
                        :
                        <AppEmptyText text={"У вас пока нет созданных заказов"} />
                }
            </View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    ...orderItemsStyles
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

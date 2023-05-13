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
import AppTopOrderPanel from "../ui/basketPageScreen/AppTopOrderPanel";
import {THEME} from "../../theme";
import AppOrderTotalBlock from "../ui/orderUI/AppOrderTotalBlock";
import AppOrderSaveButton from "../ui/orderUI/AppOrderSaveButton";
import {AppFetch} from "../AppFetch";
import {getRandomKey, globalRouteFun, LinkTo, orderItemsStyles} from "../../global";
import {AppTextBold} from "../ui/AppTextBold";
import {Path, Rect, Svg} from "react-native-svg";
import AppRadio from "../ui/formUI/AppRadio";
import {AppText} from "../ui/AppText";
import AppInput from "../ui/formUI/AppInput";
import AppChangeStatus from "../ui/orderUI/AppChangeStatus";
import AppEmptyText from "../ui/AppEmptyText";
import AppOrderMasterItemProductCount from "../ui/orderUI/AppOrderMasterItemProductCount";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentRoute, setGlobalOrder} from "../store/actions/other";

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
            isMaster: true
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

    const getDeliveryId = (code) => {
        let id = false
        deliveries.current.map(item => {
            if(item.code == code) id = item.id
        })
        return id
    }

    const parseDelivery = (del, globalKey) => {
        const elements = []
        const formData = data
        for(let code in del) {
            elements.push(
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.radioBlock}
                    key={getRandomKey()}
                    onPress={() => {
                        let id = false
                        //console.log('formData[globalKey]', formData[globalKey])
                        if(formData[globalKey] != undefined) {
                            //console.log('dellll', deliveries.current)
                            deliveries.current.map(item => {
                                if(item.hasOwnProperty('code') && item.code == code) id = item.id
                            })
                            if(id) {
                                formData[globalKey].delivery_method_id = id
                                setReload(!reload)
                            }
                        }
                    }}
                >
                    <AppRadio activeIs={formData[globalKey] != undefined && formData[globalKey].delivery_method_id > 0 && getDeliveryId(code) == formData[globalKey].delivery_method_id} />
                    <AppText style={styles.radioBlockText}>{del[code]}</AppText>
                </TouchableOpacity>
            )
        }

        return elements
    }

    const parseAddress = (address, globalKey) => {
        const elements = []
        const formData = data
        if(Array.isArray(address)) {
            address.map((item, key) => {
                //console.log(formData[globalKey].address, item)
                elements.push(
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.radioBlock}
                        key={getRandomKey()}
                        onPress={() => {
                            if(formData[globalKey] != undefined) {
                                formData[globalKey].address = item
                                setReload(!reload)
                            }
                        }}
                    >
                        <AppRadio activeIs={formData[globalKey] != undefined && formData[globalKey].address == item} />
                        <AppText style={styles.radioBlockText}>{item}</AppText>
                    </TouchableOpacity>
                )
            })
        }

        return elements
    }


    const updateOrder = async (orderArr) => {
        const order = orderArr
        //console.log('order', order)
        let products = []
        if(order.hasOwnProperty('products')) products = JSON.stringify(order.products)
        order.type = "user"
        const response = await AppFetch.getWithToken("updateOrder", {
            ...order,
            products
        }, {}, navigation)
        //console.log(response)
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
            type: "user"
        }, {}, navigation)
        if(response.result) {
            await initiate()
            globalAlert({
                title: `Заказ №${id} был отменен`
            })
        }
    }

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            <View style={styles.container}>
                <AppTopOrderPanel
                    colorActive={THEME.COMFORT_COLOR}
                    name={'master_orders'}
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

                            if(item.hasOwnProperty('owner')) {
                                if(item.owner.hasOwnProperty('infoShop')) {
                                    itemData.photo = item.owner.infoShop.photo
                                }
                                if(item.owner.hasOwnProperty('info')) {
                                    itemData.subtitle = "Продавец: " + item.owner.info.first_name + " " + item.owner.info.last_name
                                }
                                if(item.hasOwnProperty('status_id'))
                                    itemData.status = getStatus(item.status_id)
                                if(item.hasOwnProperty('created_at'))
                                    itemData.date = moment(item.created_at).format("DD.MM") + " в " + moment(item.created_at).format("h:mm")
                                if(item.hasOwnProperty('owner_id'))
                                    user_id = item.owner_id
                            }

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
                                        okButtonText: "Отправить в корзину",
                                        cancelButtonText: "Удалить",
                                        async onOkFun() {
                                            const response = await AppFetch.getWithToken("orderToBasket", {
                                                id: item.id
                                            }, {}, navigation)
                                            //console.log('ok', response)
                                            if(response.result) {
                                                await initiate()
                                                globalAlert({
                                                    title: "Заказ был перемещен в корзину"
                                                })
                                            }
                                        },
                                        async onCancelFun() {
                                            const response = await AppFetch.getWithToken("removeOrder", {
                                                id: item.id,
                                                type: "user"
                                            }, {}, navigation)
                                            //console.log('cancel', response)
                                            if(response.result) {
                                                globalAlert({
                                                    title: `Заказ №${item.id} был успешно удален`
                                                })
                                                initiate()
                                            }
                                        }
                                    })
                                }}
                            >
                                <>
                                    {/*<AppChangeStatus />*/}
                                    <AppTextBold style={styles.orderTitle}>
                                        Состав заказа:
                                    </AppTextBold>
                                    {
                                        total > 0
                                            ?
                                            item.products.map((item, key) => {
                                                return <View key={getRandomKey()}>
                                                    <AppOrderMasterItemProductCount
                                                        screenWidth={screeWidth}
                                                        item={item}
                                                        onResult={itemRes => {
                                                            const formData = data
                                                            formData[globalKey].products[key] = itemRes
                                                            setData(formData)
                                                            setReload(!reload)
                                                        }}
                                                    />
                                                </View>
                                            })
                                            :
                                            <></>
                                    }
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
                                        {/*    {*/}
                                        {/*        item.hasOwnProperty('owner')*/}
                                        {/*        && item.owner.hasOwnProperty('infoShop')*/}
                                        {/*        && item.owner.infoShop.hasOwnProperty('addresses')*/}
                                        {/*        && Array.isArray(item.owner.infoShop.addresses)*/}
                                        {/*            ?*/}
                                        {/*            parseAddress(item.owner.infoShop.addresses, globalKey)*/}
                                        {/*            :*/}
                                        {/*            <AppEmptyText text={"У этого пользователя пока нет мест продаж"} />*/}
                                        {/*    }*/}
                                        {/*</View>*/}
                                        {/*<View style={styles.blockArr}>*/}
                                        {/*    <AppTextBold style={styles.orderTitle}>*/}
                                        {/*        Способ доставки*/}
                                        {/*        <View style={styles.blockArrow}>*/}
                                        {/*            <Svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                        {/*                <Path d="M9 1.85966e-05L10 1.00002L5.00002 6L0 0.999992L0.999997 -4.29153e-06L5.00001 4.00001L9 1.85966e-05Z" fill="black"/>*/}
                                        {/*            </Svg>*/}
                                        {/*        </View>*/}
                                        {/*    </AppTextBold>*/}
                                        {/*    {*/}
                                        {/*        item.hasOwnProperty('owner')*/}
                                        {/*        && item.owner.hasOwnProperty('infoShop')*/}
                                        {/*        && item.owner.infoShop.hasOwnProperty('delivery_methods')*/}
                                        {/*        && typeof item.owner.infoShop.delivery_methods == "object"*/}
                                        {/*            ?*/}
                                        {/*            parseDelivery(item.owner.infoShop.delivery_methods, globalKey)*/}
                                        {/*            :*/}
                                        {/*            <AppEmptyText text={"У этого пользователя пока нет способов доставки"} />*/}
                                        {/*    }*/}
                                        {/*</View>*/}
                                        {/*<View style={styles.borderTop}>*/}
                                        {/*    <AppTextBold style={styles.orderTitle}>*/}
                                        {/*        Способ оплаты*/}
                                        {/*    </AppTextBold>*/}
                                        {/*    <AppPayable />*/}
                                        {/*</View>*/}
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
                                                    masterId: item.owner_id
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
                                        {/*{*/}
                                        {/*    item.hasOwnProperty('owner')*/}
                                        {/*    && item.owner.hasOwnProperty('info')*/}
                                        {/*    && item.owner.info.hasOwnProperty('phone')*/}
                                        {/*    && item.owner.info.phone*/}
                                        {/*        ?*/}
                                        {/*        <View style={styles.contact}>*/}
                                        {/*            <AppTextBold style={styles.orderTitle}>*/}
                                        {/*                Позвонить покупателю*/}
                                        {/*            </AppTextBold>*/}
                                        {/*            <View style={styles.phone}>*/}
                                        {/*                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                        {/*                    <Path d="M12.551 11.4355L12.5511 11.4355L12.5535 11.4279C12.8316 10.5258 14.0399 10.2168 14.7671 10.9424L17.2843 13.4544L17.528 13.2102L17.2843 13.4544C17.7681 13.9371 17.7919 14.8 17.2758 15.3967L15.5762 17.0927L15.8199 17.3369L15.5762 17.0927C15.209 17.4592 14.6723 17.6537 13.9692 17.655C13.2633 17.6563 12.4132 17.4614 11.4668 17.0738C9.57518 16.2991 7.36467 14.7817 5.27539 12.6968C3.18722 10.613 1.68911 8.4078 0.923771 6.5203C0.540874 5.57599 0.347623 4.72654 0.345026 4.02038C0.342442 3.31769 0.527513 2.78179 0.873509 2.41646L2.57835 0.715199C3.0625 0.232065 3.92843 0.208349 4.52682 0.723707L7.03554 3.22715C7.76145 3.95154 7.45376 5.15632 6.54866 5.43423L6.54863 5.43414L6.54104 5.43666C5.58702 5.75396 4.91039 6.81838 5.23899 7.83214C5.48864 8.85896 6.25484 9.96174 7.16071 10.8543C8.0711 11.7512 9.17998 12.4924 10.1625 12.7375L10.1624 12.7376L10.1713 12.7396C11.1359 12.9535 12.22 12.4265 12.551 11.4355Z" stroke="black" stroke-width="0.69"/>*/}
                                        {/*                </Svg>*/}
                                        {/*                <AppText style={styles.phoneText}>*/}
                                        {/*                    {item.owner.info.phone}*/}
                                        {/*                </AppText>*/}
                                        {/*            </View>*/}
                                        {/*            <View style={styles.phoneCallBlock}>*/}
                                        {/*                <View style={styles.phoneCall}>*/}
                                        {/*                    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                        {/*                        <Rect width="30" height="30" rx="15" fill="#419FD9"/>*/}
                                        {/*                        <Path fillRule="evenodd" clipRule="evenodd" d="M18.3342 22.4277C19.3826 22.8864 19.7758 21.9253 19.7758 21.9253L22.5498 7.98972C22.528 7.05049 21.2611 7.61839 21.2611 7.61839L5.73102 13.7125C5.73102 13.7125 4.98837 13.9746 5.0539 14.4333C5.11943 14.892 5.70918 15.1104 5.70918 15.1104L9.619 16.421C9.619 16.421 10.7985 20.2871 11.0388 21.0297C11.2572 21.7505 11.4538 21.7724 11.4538 21.7724C11.6722 21.8598 11.8688 21.7069 11.8688 21.7069L14.4025 19.4134L18.3342 22.4277ZM19.0117 10.4578C19.0117 10.4578 19.5578 10.1302 19.5359 10.4578C19.5359 10.4578 19.6233 10.5015 19.3394 10.8073C19.0773 11.0694 12.8958 16.6174 12.0658 17.3601C12.0003 17.4038 11.9566 17.4693 11.9566 17.5567L11.7163 19.6099C11.6726 19.8283 11.3887 19.8501 11.3231 19.6535L10.2965 16.2898C10.2528 16.1587 10.2965 16.0058 10.4276 15.9185L19.0117 10.4578Z" fill="white"/>*/}
                                        {/*                    </Svg>*/}
                                        {/*                    <AppText style={styles.phoneCallText}>*/}
                                        {/*                        Telegram*/}
                                        {/*                    </AppText>*/}
                                        {/*                </View>*/}
                                        {/*                <View style={styles.phoneCall}>*/}
                                        {/*                    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                        {/*                        <Rect width="30" height="30" rx="15" fill="#675DA9"/>*/}
                                        {/*                        <Path d="M22.3462 7.61534C21.8501 7.15917 19.8413 5.69864 15.3637 5.67863C15.3637 5.67863 10.0858 5.35851 7.51282 7.71938C6.08029 9.1519 5.57611 11.2447 5.52409 13.8456C5.47207 16.4426 5.40405 21.3123 10.0978 22.6328H10.1018L10.0978 24.6456C10.0978 24.6456 10.0698 25.4619 10.6059 25.6259C11.2542 25.826 11.6383 25.2058 12.2586 24.5375C12.5987 24.1694 13.0668 23.6332 13.423 23.221C16.6322 23.4891 19.1011 22.8729 19.3812 22.7809C20.0294 22.5688 23.6987 22.1006 24.295 17.2309C24.9112 12.221 23.9948 9.04786 22.3462 7.61534ZM22.8904 16.8787C22.3863 20.9442 19.4132 21.2003 18.865 21.3764C18.6329 21.4524 16.4641 21.9926 13.7351 21.8125C13.7351 21.8125 11.7024 24.2654 11.0701 24.9017C10.9701 25.0017 10.854 25.0417 10.778 25.0217C10.67 24.9937 10.638 24.8657 10.642 24.6776C10.642 24.4055 10.658 21.3284 10.658 21.3284C10.654 21.3284 10.654 21.3284 10.658 21.3284C6.68451 20.228 6.9166 16.0824 6.96062 13.9136C7.00463 11.7449 7.41278 9.9642 8.62523 8.76776C10.798 6.79904 15.2837 7.09115 15.2837 7.09115C19.069 7.10715 20.8817 8.24757 21.3019 8.62771C22.6984 9.82815 23.4106 12.6892 22.8904 16.8787Z" fill="white"/>*/}
                                        {/*                        <Path d="M17.2084 13.9897C17.0764 13.9897 16.9643 13.8856 16.9563 13.7496C16.9123 12.8893 16.5082 12.4691 15.6839 12.4251C15.5438 12.4171 15.4358 12.2971 15.4438 12.157C15.4518 12.017 15.5718 11.9089 15.7119 11.9169C16.8003 11.9769 17.4085 12.6012 17.4645 13.7216C17.4725 13.8616 17.3645 13.9817 17.2244 13.9857C17.2164 13.9897 17.2124 13.9897 17.2084 13.9897Z" fill="white"/>*/}
                                        {/*                        <Path d="M18.5048 14.4219H18.5008C18.3607 14.4179 18.2487 14.3019 18.2527 14.1618C18.2727 13.2975 18.0246 12.5973 17.4964 12.021C16.9722 11.4448 16.248 11.1327 15.2916 11.0647C15.1516 11.0527 15.0475 10.9326 15.0595 10.7926C15.0715 10.6525 15.1916 10.5485 15.3316 10.5605C16.412 10.6405 17.2643 11.0167 17.8726 11.6809C18.4848 12.3492 18.7809 13.1855 18.7609 14.1738C18.7569 14.3139 18.6408 14.4219 18.5048 14.4219Z" fill="white"/>*/}
                                        {/*                        <Path d="M19.8332 14.9418C19.6932 14.9418 19.5811 14.8298 19.5811 14.6897C19.5691 13.1412 19.125 11.9607 18.2206 11.0764C17.3283 10.2041 16.1959 9.75994 14.8634 9.74793C14.7234 9.74793 14.6113 9.63189 14.6113 9.49184C14.6113 9.35179 14.7274 9.23975 14.8634 9.23975C16.332 9.25175 17.5804 9.74393 18.5688 10.7123C19.5611 11.6806 20.0693 13.0171 20.0853 14.6817C20.0893 14.8258 19.9773 14.9418 19.8332 14.9418C19.8372 14.9418 19.8372 14.9418 19.8332 14.9418Z" fill="white"/>*/}
                                        {/*                        <Path d="M15.7437 17.1224C15.7437 17.1224 16.0998 17.1545 16.2919 16.9184L16.664 16.4502C16.8441 16.2181 17.2802 16.0701 17.7044 16.3061C17.9405 16.4382 18.3686 16.7023 18.6327 16.8984C18.9168 17.1064 19.493 17.5866 19.497 17.5906C19.7731 17.8227 19.8372 18.1628 19.6491 18.527C19.6491 18.527 19.6491 18.531 19.6491 18.535C19.457 18.8751 19.1969 19.1952 18.8728 19.4913C18.8688 19.4913 18.8688 19.4953 18.8648 19.4953C18.5967 19.7194 18.3326 19.8474 18.0765 19.8755C18.0445 19.8835 18.0085 19.8835 17.9605 19.8835C17.8484 19.8835 17.7364 19.8674 17.6244 19.8314L17.6164 19.8194C17.2162 19.7074 16.552 19.4273 15.4476 18.8151C14.7273 18.4189 14.1311 18.0148 13.6229 17.6106C13.3548 17.3985 13.0827 17.1625 12.8026 16.8824C12.7946 16.8744 12.7826 16.8623 12.7746 16.8543C12.7666 16.8463 12.7546 16.8343 12.7466 16.8263C12.7386 16.8183 12.7266 16.8063 12.7186 16.7983C12.7106 16.7903 12.6986 16.7783 12.6906 16.7703C12.4144 16.4902 12.1744 16.2181 11.9623 15.95C11.5581 15.4458 11.154 14.8456 10.7578 14.1253C10.1456 13.0169 9.86552 12.3527 9.75348 11.9566L9.74147 11.9486C9.70546 11.8365 9.68945 11.7245 9.68945 11.6124C9.68945 11.5644 9.68945 11.5284 9.69746 11.4964C9.72947 11.2363 9.85751 10.9762 10.0776 10.7081C10.0776 10.7041 10.0816 10.7041 10.0816 10.7001C10.3777 10.372 10.6978 10.1159 11.0379 9.92381C11.0379 9.92381 11.0419 9.92381 11.0459 9.92381C11.4061 9.73574 11.7462 9.79976 11.9823 10.0759C11.9823 10.0759 12.4665 10.6561 12.6745 10.9402C12.8706 11.2083 13.1347 11.6324 13.2668 11.8685C13.5028 12.2927 13.3548 12.7288 13.1227 12.9089L12.6545 13.281C12.4185 13.4731 12.4505 13.8292 12.4505 13.8292C12.4505 13.8292 13.1427 16.4622 15.7437 17.1224Z" fill="white"/>*/}
                                        {/*                    </Svg>*/}
                                        {/*                    <AppText style={styles.phoneCallText}>*/}
                                        {/*                        Viber*/}
                                        {/*                    </AppText>*/}
                                        {/*                </View>*/}
                                        {/*                <View style={styles.phoneCall}>*/}
                                        {/*                    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                        {/*                        <Rect width="30" height="30" rx="15" fill="#0DC143"/>*/}
                                        {/*                        <Path d="M21.719 8.25718C20.1109 6.60177 17.8879 5.70312 15.6177 5.70312C10.7934 5.70312 6.91497 9.6288 6.96227 14.4058C6.96227 15.9193 7.38795 17.3856 8.09741 18.7099L6.86768 23.2031L11.4555 22.0207C12.7325 22.7302 14.1515 23.0612 15.5704 23.0612C20.3474 23.0612 24.2258 19.1356 24.2258 14.3585C24.2258 12.041 23.3271 9.86529 21.719 8.25718ZM15.6177 21.595C14.3406 21.595 13.0636 21.2639 11.9758 20.6018L11.692 20.4599L8.94876 21.1693L9.65822 18.4734L9.46903 18.1896C7.38795 14.8315 8.38119 10.3856 11.7866 8.30448C15.192 6.2234 19.5906 7.21664 21.6717 10.622C23.7528 14.0274 22.7596 18.4261 19.3542 20.5072C18.2663 21.2166 16.942 21.595 15.6177 21.595ZM19.7798 16.345L19.2596 16.1085C19.2596 16.1085 18.5028 15.7774 18.0298 15.541C17.9825 15.541 17.9352 15.4937 17.8879 15.4937C17.7461 15.4937 17.6515 15.541 17.5569 15.5883C17.5569 15.5883 17.5096 15.6356 16.8474 16.3923C16.8001 16.4869 16.7055 16.5342 16.6109 16.5342H16.5636C16.5163 16.5342 16.4217 16.4869 16.3744 16.4396L16.1379 16.345C15.6177 16.1085 15.1447 15.8247 14.7663 15.4464C14.6717 15.3518 14.5298 15.2572 14.4352 15.1626C14.1042 14.8315 13.7731 14.4531 13.5366 14.0274L13.4893 13.9329C13.442 13.8856 13.442 13.8383 13.3947 13.7437C13.3947 13.6491 13.3947 13.5545 13.442 13.5072C13.442 13.5072 13.6312 13.2707 13.7731 13.1288C13.8677 13.0342 13.915 12.8923 14.0096 12.7977C14.1042 12.6558 14.1515 12.4666 14.1042 12.3247C14.0569 12.0883 13.4893 10.8112 13.3474 10.5274C13.2528 10.3856 13.1582 10.3383 13.0163 10.291H12.8744C12.7798 10.291 12.6379 10.291 12.4961 10.291C12.4015 10.291 12.3069 10.3383 12.2123 10.3383L12.165 10.3856C12.0704 10.4329 11.9758 10.5274 11.8812 10.5747C11.7866 10.6693 11.7393 10.7639 11.6447 10.8585C11.3136 11.2842 11.1244 11.8045 11.1244 12.3247C11.1244 12.7031 11.219 13.0815 11.3609 13.4126L11.4082 13.5545C11.8339 14.4531 12.4015 15.2572 13.1582 15.9666L13.3474 16.1558C13.4893 16.2977 13.6312 16.3923 13.7258 16.5342C14.719 17.3856 15.8542 18.0004 17.1312 18.3315C17.2731 18.3788 17.4623 18.3788 17.6042 18.4261C17.7461 18.4261 17.9352 18.4261 18.0771 18.4261C18.3136 18.4261 18.5974 18.3315 18.7866 18.2369C18.9285 18.1423 19.0231 18.1423 19.1177 18.0477L19.2123 17.9531C19.3069 17.8585 19.4015 17.8112 19.4961 17.7166C19.5906 17.622 19.6852 17.5274 19.7325 17.4329C19.8271 17.2437 19.8744 17.0072 19.9217 16.7707C19.9217 16.6761 19.9217 16.5342 19.9217 16.4396C19.9217 16.4396 19.8744 16.3923 19.7798 16.345Z" fill="white"/>*/}
                                        {/*                    </Svg>*/}

                                        {/*                    <AppText style={styles.phoneCallText}>*/}
                                        {/*                        WhatsApp*/}
                                        {/*                    </AppText>*/}
                                        {/*                </View>*/}
                                        {/*            </View>*/}
                                        {/*        </View>*/}
                                        {/*        :*/}
                                        {/*        <></>*/}
                                        {/*}*/}
                                        <AppOrderTotalBlock
                                            text={"Итого с учетом доставки"}
                                            price={total}
                                        />
                                        <AppChangeStatus
                                            color={THEME.BLUE}
                                            data={statuses.current}
                                            value={item.status_id}
                                            onResult={status_id => {
                                                const formData = data
                                                formData[globalKey].status_id = status_id
                                                item.status_id = status_id
                                                setReload(!reload)
                                            }}
                                        />
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={styles.status}
                                            onPress={() => {
                                                cancelOrder({
                                                    id: item.id,
                                                    status_id: 8
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

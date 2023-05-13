import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity, ImageBackground} from "react-native"
import {Svg, Rect, Path} from "react-native-svg";
import {AppTextBold} from "../AppTextBold";
import {AppText} from "../AppText";
import AppButton from "../AppButton";
import {THEME} from "../../../theme";
import moment from "moment";
import {AppFetch} from "../../AppFetch";
import {globalAlert} from "../../globalHeaders";
import {LinkTo, masterAssortmentStyle} from "../../../global";
import AppBlockMonths from "../masterAssortmentPageScreen/AppBlockMonths";
import AppBlockDays from "../masterAssortmentPageScreen/AppBlockDays";
import AppMasterDesr from "../masterAssortmentPageScreen/AppMasterDesr";
import AppTextBoldTicker from "../AppTextBoldTicker";

export default (
    {
        data,
        screenWidth,
        navigation
    }) => {
    const [date, setDate] = useState(moment())
    const [in_basket, setInBasket] = useState(data.in_basket)

    const addBasket = async () => {
        const response = await AppFetch.getWithToken("addBasketItem", {
            id: data.id,
            date: date.format("YYYY-MM-DD")
        }, {}, navigation)
        if(response.result) {
            globalAlert({
                title: "Товар успешно добавлен"
            })
            setInBasket(true)
        } else
            globalAlert({
                title: "Товара нет в наличии"
            })
    }

    //console.log(data)

    return (
        <>
            <TouchableOpacity
                style={styles.block}
                activeOpacity={1}
                onPress={() => {
                    LinkTo("UpdateMasterProductScreen", {
                        id: data.id
                    }, navigation)
                }}
            >
                <View style={styles.wrap}>
                    <View
                        style={styles.imageBlock}
                        // onPress={() => {
                        //     //setImageViewVisible(true)
                        // }}
                    >
                        <ImageBackground
                            style={styles.img}
                            source={{uri: data.main_photo}}
                            resizeMode={"cover"}
                        />
                        <View
                            style={{...styles.zoom, marginLeft: -10, marginTop: -10}}
                        >
                            <View style={styles.zoomWrap}>
                                {/*<View style={styles.zoomBg}></View>*/}
                                <Svg width="35" height="35" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Rect opacity="0.55" width="41" height="41" rx="3" fill="black"/>
                                    <Path fillRule="evenodd" clipRule="evenodd" d="M28.71 13.6325C29.1 14.0225 29.1 14.6525 28.71 15.0425L26.88 16.8725L23.13 13.1225L24.96 11.2925C25.1468 11.1052 25.4005 11 25.665 11C25.9295 11 26.1832 11.1052 26.37 11.2925L28.71 13.6325ZM11 28.5025V25.4625C11 25.3225 11.05 25.2025 11.15 25.1025L22.06 14.1925L25.81 17.9425L14.89 28.8525C14.8 28.9525 14.67 29.0025 14.54 29.0025H11.5C11.22 29.0025 11 28.7825 11 28.5025Z" fill="white"/>
                                </Svg>
                            </View>
                        </View>
                    </View>
                    <View style={{...styles.infoBlock, width: screenWidth - 160}}>
                        <AppTextBoldTicker style={styles.title}>
                            {data.name}
                        </AppTextBoldTicker>
                        <View style={styles.descrBlock}>
                            <AppText style={styles.descr}>
                                {data.description}
                            </AppText>
                        </View>
                        <View style={styles.orderBlock}>
                            <AppText style={{marginBottom: 0, fontSize: 14}}>
                                В какой дате нужен заказ?
                            </AppText>
                            <View style={styles.counterBlock}>
                                <AppBlockMonths
                                    resultIs={date}
                                    onResult={date => {
                                        //console.log(date)
                                        setDate(date)
                                    }}
                                />
                                <AppBlockDays
                                    resultIs={date}
                                    onResult={date => {
                                        setDate(date)
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.descrBlock}>
                            <AppButton style={{width: 85, minWidth: 0}} color={THEME.COMFORT_COLOR}>
                                <AppTextBold style={styles.textBtn}>
                                    {data.price}
                                </AppTextBold>
                            </AppButton>
                            {
                                !in_basket
                                    ?
                                    <AppButton
                                        style={{width: 90, minWidth: 0}}
                                        color={THEME.COMFORT_COLOR}
                                        onPress={() => {
                                            addBasket()

                                        }}
                                    >
                                        <AppTextBold style={styles.textBtn}>
                                            В корзину
                                        </AppTextBold>
                                    </AppButton>
                                    :
                                    <AppButton
                                        style={{width: 90, minWidth: 0}}
                                        color={THEME.GREEN}
                                        onPress={() => {
                                            LinkTo("BasketPageScreen", {}, navigation)
                                        }}
                                    >
                                        <AppTextBold style={styles.textBtn}>
                                            Добавлено
                                        </AppTextBold>
                                    </AppButton>
                            }
                        </View>
                    </View>
                </View>
                <AppMasterDesr
                    data={data}
                    navigation={navigation}
                />
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create(masterAssortmentStyle)

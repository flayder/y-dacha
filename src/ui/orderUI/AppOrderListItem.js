import React from "react"
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {AppTextBold} from "../AppTextBold";
import AppOrderItemProduct from "../orderListPageScreen/AppOrderItemProduct";
import {AppText} from "../AppText";
import {Path, Svg} from "react-native-svg";
import AppInput from "../formUI/AppInput";
import {AppBlueButton} from "../AppBlueButton";
import {notificationStyles, orderItemsStyles} from "../../../global";

export default ({data, screenWidth}) => {
    return (
        <>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.status}
            >
                <AppTextBold style={styles.statusText}>
                    Изменить статус заказа
                </AppTextBold>
            </TouchableOpacity>
            <AppTextBold style={styles.orderTitle}>
                Состав заказа:
            </AppTextBold>
            <AppOrderItemProduct screenWidth={screenWidth} />
            <AppOrderItemProduct screenWidth={screenWidth} />
            <View style={styles.grey}>
                <AppTextBold style={styles.orderTitle}>
                    Дата доставки заказа:
                </AppTextBold>
                <AppText style={styles.textBlock}>
                    12 jhagd hajs
                </AppText>
            </View>
            <View style={styles.container}>
                <View style={styles.blockArr}>
                    <AppTextBold style={styles.orderTitle}>
                        Места продажи
                        <View style={styles.blockArrow}>
                            <Svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M9 1.85966e-05L10 1.00002L5.00002 6L0 0.999992L0.999997 -4.29153e-06L5.00001 4.00001L9 1.85966e-05Z" fill="black"/>
                            </Svg>
                        </View>
                    </AppTextBold>
                    <AppText style={styles.textBlock}>
                        12 jhagd hajs
                    </AppText>
                </View>
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
                        12 jhagd hajs
                    </AppText>
                </View>
                <View style={styles.borderTop}>
                    <AppTextBold style={styles.orderTitle}>
                        Способ доставки
                    </AppTextBold>
                    <AppInput inputStyle={styles.input} />
                </View>
                <View style={styles.borderTop}>
                    <AppTextBold style={styles.orderTitle}>
                        Комментарий к заказу
                    </AppTextBold>
                    <AppInput inputStyle={styles.input} checkbox={true} />
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.messageBtn}
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
                <View style={{...styles.borderTop, ...styles.total}}>
                    <AppTextBold style={styles.totalText}>
                        Комментарий к заказу
                    </AppTextBold>
                    <AppTextBold style={styles.totalTextPrice}>
                        12312
                    </AppTextBold>
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.status}
                >
                    <AppTextBold style={styles.statusText}>
                        Отменить заказ
                    </AppTextBold>
                </TouchableOpacity>
                <AppBlueButton style={styles.btnBlue}>
                    Отмена
                </AppBlueButton>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    ...orderItemsStyles
})
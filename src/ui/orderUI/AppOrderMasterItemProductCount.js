import React from "react";
import {Image, StyleSheet, View, TouchableOpacity} from "react-native";
import {AppText} from "../AppText";
import {Svg, Path} from "react-native-svg";
import {AppTextBold} from "../AppTextBold";
import {THEME} from "../../../theme";
import {orderItem, SHADOW, SHADOW_SMALL} from "../../../global";
import AppCounter from "../AppCounter";
import AppDeliveryDateBlock from "../orderBuyerPageScreen/AppDeliveryDateBlock";
import moment from "moment";
import AppFastImage from "../AppFastImage";

export default (
    {
        item,
        onResult,
        screenWidth
    }) => {
    //console.log('item', item)
    return (
        <>
            <View style={styles.item}>
                <View style={styles.wrap}>
                    <View style={styles.img}>
                        <AppFastImage
                            style={styles.image}
                            uri={item.photo}
                        />
                    </View>
                    <View style={{...styles.center, width: screenWidth - 220}}>
                        <AppText style={{...styles.centerName, alignItems: "center", marginTop: 0}}>
                            {item.name}
                        </AppText>
                    </View>
                    <View style={styles.amount}>
                        <AppCounter
                            style={styles.counter}
                            btnStyle={{
                                borderColor: THEME.SLIDER_BG
                            }}
                            valueIs={item.quantity}
                            onResult={quantity => {
                                item.quantity = quantity
                                onResult(item)
                            }}
                        />
                    </View>
                </View>

            </View>
            <View style={styles.grey}>
                <AppTextBold style={styles.orderTitle}>
                    Дата доставки заказа:
                </AppTextBold>
                <AppDeliveryDateBlock
                    dateIs={moment(item.date).isValid() ? moment(item.date) : moment()}
                    onResult={date => {
                        item.date = date
                        if(onResult) onResult(item)
                    }} />
            </View>
            <View style={styles.priceBlockWrap}>
                <View style={styles.orderBlock}>
                    <Svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M15.4929 4.97005H14.1998L9.45768 0.211269C9.26386 0.0167612 8.847 -0.0844891 8.65051 0.110019C8.45669 0.304526 8.462 0.629594 8.65582 0.824101L12.7873 4.97005H3.20212L7.34152 0.816108C7.53535 0.6216 7.53004 0.30719 7.33621 0.112683C7.14238 -0.0818251 6.74411 -0.00455458 6.55028 0.192618L1.79223 4.97005H0.49917C0.223033 4.97005 0 5.19386 0 5.47097C0 5.74808 0.223033 5.97189 0.49917 5.97189H0.99834L1.99934 12.9955C1.99934 13.5497 2.4454 14 3.00033 14H12.9997C13.5519 14 14.0007 13.5524 14.0007 12.9955L15.0017 5.97189H15.5008C15.777 5.97189 16 5.74808 16 5.47097C16 5.19386 15.777 4.97005 15.5008 4.97005H15.4929Z" fill="#5382D8"/>
                    </Svg>
                    <AppTextBold style={styles.orderBlockPrice}>
                        {item.price} ₽
                    </AppTextBold>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    ...orderItem,
    priceBlockWrap: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: THEME.GREY
    },
    grey: {
        marginLeft: -20,
        marginRight: -20,
        marginTop: 20,
        backgroundColor: THEME.SLIDER_BG
    },
    orderTitle: {
        textAlign: "center",
        marginBottom: 0
    },
    counter: {
        backgroundColor: THEME.SLIDER_BG,
        padding: 5,
        width: 120,
        borderRadius: 6,
        ...SHADOW_SMALL
    },
    item: {
        paddingRight: 20
    }
})
import React from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {useNavigation} from "@react-navigation/native";
import {AppTextBold} from "../AppTextBold";
import {AppText} from "../AppText";
import {AppTextItalic} from "../AppTextItalic";
import AppButton from "../AppButton";
import {THEME} from "../../../theme";
import {LinkTo, SHADOW} from "../../../global";
import {AppFetch} from "../../AppFetch";
import {globalAlert} from "../../globalHeaders";
import AppFastImage from "../AppFastImage";
import AppTextBoldTicker from "../AppTextBoldTicker";

export default ({data, width, color = "#000"}) => {
    const navigation = useNavigation()
    //console.log('ssss', data)
    const isSection = () => {
        if(data.type == 'sort')
            return "Сорт"
        else
            return "Химикат"
    }

    const isAvailable = () => {
        if(data.quantity > 0)
            return "В наличии " + data.quantity + " " + data.unit
        else
            return "Нет в наличии"
    }

    const addBasket = async () => {
        const response = await AppFetch.getWithToken("addBasketItem", {
            id: data.productId
        }, {}, navigation)
        if(response.result) {
            globalAlert({
                title: "Товар успешно добавлен"
            })
        } else
            globalAlert({
                title: "Товара нет в наличии"
            })
    }

    return (
        <View style={styles.wrap}>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.wrapLink}
                onPress={() => {
                    LinkTo("SortDetailPageScreen", {
                        sortId: data.sortId
                    }, navigation)
                }}
            >
                <AppFastImage
                    style={styles.img}
                    uri={data.photo}
                />
                <View style={{...styles.body, width: width - 200}}>
                    <AppTextBold style={{...styles.title, color: color}}>
                        {data.name} / {isSection()}
                    </AppTextBold>
                    <AppTextItalic style={styles.avail}>
                        {isAvailable()}
                    </AppTextItalic>

                    {
                        data.category
                            ?
                            <AppText style={styles.text}>
                                <AppText style={styles.textBlack}>
                                    Категория
                                </AppText>
                                <View style={{width: 5}}></View>
                                {data.category}
                            </AppText>
                            :
                            <></>
                    }

                    {
                        data.feature
                            ?
                            <AppText style={styles.text}>
                                <AppText style={styles.textBlack}>
                                    Характеристика
                                </AppText>
                                <View style={{width: 5}}></View>
                                {data.feature}
                            </AppText>
                            :
                            <></>
                    }

                </View>
            </TouchableOpacity>
            <View style={styles.rightBlock}>
                <View style={styles.priceBlock}>
                    <AppTextBoldTicker style={{...styles.price, color: color}}>
                        {data.price}/{data.unit}
                    </AppTextBoldTicker>
                </View>
                <AppButton
                    color={THEME.FOOTER_BG}
                    onPress={addBasket}
                >
                    <AppTextBold style={styles.btnText}>В корзину</AppTextBold>
                </AppButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnText: {
        fontSize: 13
    },
    rightBlock: {
        width: 100,
        justifyContent: "space-between"
    },
    priceBlock: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    textBlack: {
        marginTop: 0,
        marginBottom: 0,
        fontSize: 13,
        color: "#000"
    },
    text: {
        marginTop: 0,
        marginBottom: 0,
        fontSize: 13,
        color: THEME.GREY_TEXT
    },
    avail: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 13
    },
    title: {
        marginTop: 5,
        marginBottom: 0,
        fontSize: 14
    },
    wrap: {
        //borderStyle: "solid",
        //borderWidth: 1,
        //borderColor: THEME.GREY,
        flexDirection: "row",
        backgroundColor: "#fff",
        marginTop: 10,
        marginBottom: 10,
        ...SHADOW,
        padding: 0,
    },
    wrapLink: {
        flexDirection: "row"
    },
    body: {
        padding: 10,
        paddingTop: 0
    },
    img: {
        width: 60,
        borderRadius: 6
    }
})
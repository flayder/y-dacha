import React from "react"
import {View, StyleSheet, Image} from "react-native"
import {AppText} from "../AppText";
import {AppTextBold} from "../AppTextBold";
import {THEME} from "../../../theme";
import AppFastImage from "../AppFastImage";

export default ({item, num, screenWidth}) => {
    const color = (Number.isInteger((num + 1) / 2)) ? {
        backgroundColor: THEME.SLIDER_BG
    } : {}

    return (
        <View style={{...styles.wrap, ...color}}>
            <AppText style={styles.num}>{num}</AppText>
            <View style={styles.imgWrap}>
                <AppFastImage
                    style={styles.img}
                    uri={item.main_photo}
                />
            </View>
            <View style={{...styles.charBlock, width: screenWidth - 250}}>
                {
                    item.type == "sort"
                        ?
                        <>
                            {
                                item.culture_name
                                    ?
                                    <AppText style={styles.charBlockText}>
                                        Культура: {item.culture_name}
                                    </AppText>
                                    :
                                    <></>
                            }
                            {
                                item.sort_name
                                    ?
                                    <AppText style={styles.charBlockText}>
                                        Название: {item.sort_name}
                                    </AppText>
                                    :
                                    <></>
                            }
                            <AppText style={styles.charBlockText}>
                                Тип: Растение
                            </AppText>

                        </>
                        :
                        <>
                            {
                                item.chemical_name
                                    ?
                                    <AppText style={styles.charBlockText}>
                                        Название: {item.chemical_name}
                                    </AppText>
                                    :
                                    <></>
                            }
                        </>
                }
                {
                    item.characteristic
                        ?
                        <AppText style={styles.charBlockText}>
                            Характеристика: {item.characteristic}
                        </AppText>
                        :
                        <></>
                }
                {
                    item.quantity
                        ?
                        <AppText style={styles.charBlockText}>
                            Кол-во в наличии: {item.quantity} {item.unit}
                        </AppText>
                        :
                        <></>
                }
            </View>
            <View style={styles.priceBlock}>
                <AppText style={styles.priceBlockText}>
                    Стоимость{"\n"}
                    за 1 ед.
                </AppText>
                <AppTextBold style={styles.priceBlockBoldText}>
                    {item.price}₽
                </AppTextBold>
            </View>
            <View style={styles.qrBlock}>
                <Image
                    style={styles.qrBlockImg}
                    source={{uri: item.qr}}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    charBlock: {
        paddingRight: 10
    },
    priceBlockBoldText: {
        textAlign: "center",
        marginTop: 0,
        fontSize: 20
    },
    priceBlockText: {
        fontSize: 14,
        textAlign: "center"
    },
    qrBlock: {
        alignItems: "flex-end",
        justifyContent: "center",
        width: 60
    },
    priceBlock: {
        width: 90,
        paddingLeft: 10,
        paddingRight: 10,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: THEME.GREY,
        justifyContent: "center"
    },
    num: {
        width: 20,
        paddingTop: 3
    },
    imgWrap: {
        paddingTop: 10,
        paddingRight: 10
    },
    charBlockText: {
        marginTop: 0,
        marginBottom: 0,
        fontSize: 14
    },
    wrap: {
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row"
    },
    qrBlockImg: {
        width: 50,
        height: 50,
        backgroundColor: "red"
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "red"
    }
})
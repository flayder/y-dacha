import React from "react"
import {StyleSheet, TouchableOpacity, View} from "react-native"
import {AppTextBold} from "./AppTextBold";
import {AppText} from "./AppText";
import {LinkTo, PRODUCT_STYLE, SORTS} from "../../global";
import {useNavigation, useRoute} from "@react-navigation/native";
import AppFastImage from "./AppFastImage";
import AppTextBoldTicker from "./AppTextBoldTicker";

export default ({item, middleText, screenWidth, color}) => {
    const route = useRoute()
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.btnWrap} activeOpacity={1} onPress={() => {
            LinkTo("SortPageScreen", {
                ...route.params,
                cultureId: item.id,
                name: SORTS
            }, navigation)
        }}>
            <View style={styles.item}>
                <View style={styles.imgWrap}>
                    <AppFastImage
                        uri={item.photo}
                        resizeMode={'cover'}
                        style={{...styles.photo}}
                    />
                </View>
                <View style={styles.nameWrap}>
                    <View style={styles.rightWrap}>
                        <AppTextBoldTicker style={{...styles.name, color: color}}>
                            {item.name}
                        </AppTextBoldTicker>
                        {middleText.length > 0
                            ?
                            <AppText style={styles.middleText}>
                                {middleText}
                            </AppText>
                            :
                            <></>
                        }
                        <View style={{...styles.price, borderColor: color}}>
                            <AppText style={styles.priceText}>
                                Сортов {item.count}
                            </AppText>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create(
    PRODUCT_STYLE
)
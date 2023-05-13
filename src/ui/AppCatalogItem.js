import React from "react"
import {StyleSheet, TouchableOpacity, View} from "react-native"
import {AppTextBold} from "./AppTextBold";
import {AppText} from "./AppText";
import {getSortType, LinkTo, PRODUCT_STYLE} from "../../global";
import AppFastImage from "./AppFastImage";
import AppTextTicker from "./AppTextTicker";
import AppTextBoldTicker from "./AppTextBoldTicker";

export default ({item, middleText, navigation, screenWidth, color}) => {
    //console.log('item', item)
    return (
        <TouchableOpacity style={styles.btnWrap} activeOpacity={1} onPress={() => {
            LinkTo('SortDetailPageScreen', {
                type: getSortType(item.section_id),
                cultureId: item.culture_id,
                sortId: item.id
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
                            <AppTextTicker style={styles.priceText}>
                                Цена от {item.price}
                            </AppTextTicker>
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
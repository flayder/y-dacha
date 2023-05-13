import React from "react"
import {StyleSheet, View, Image} from "react-native";
import {AppTextBold} from "../AppTextBold";
import {AppText} from "../AppText";
import {Path, Svg} from "react-native-svg";
import AppDrug from "../AppDrug";
import AppFastImage from "../AppFastImage";

export default ({item, num, screenWidth, onDelete}) => {
    //console.log('item', item)
    return (
        <AppDrug
            screenWidth={screenWidth}
            onDelete={() => {
                if(onDelete) onDelete(item.id)
            }}
        >
            <View style={styles.item}>
                <AppText style={styles.itemNum}>{num}</AppText>
                <View style={{...styles.itemBody, width: screenWidth - 160}}>
                    <AppFastImage
                        style={styles.itemImg}
                        uri={item.main_photo}
                    />
                    <AppText style={styles.itemName}>
                        {item.name} {item.product_name}
                    </AppText>
                </View>
                <View style={styles.itemPrice}>
                    <Svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M15.4929 4.97005H14.1998L9.45768 0.211269C9.26386 0.0167612 8.847 -0.0844891 8.65051 0.110019C8.45669 0.304526 8.462 0.629594 8.65582 0.824101L12.7873 4.97005H3.20212L7.34152 0.816108C7.53535 0.6216 7.53004 0.30719 7.33621 0.112683C7.14238 -0.0818251 6.74411 -0.00455458 6.55028 0.192618L1.79223 4.97005H0.49917C0.223033 4.97005 0 5.19386 0 5.47097C0 5.74808 0.223033 5.97189 0.49917 5.97189H0.99834L1.99934 12.9955C1.99934 13.5497 2.4454 14 3.00033 14H12.9997C13.5519 14 14.0007 13.5524 14.0007 12.9955L15.0017 5.97189H15.5008C15.777 5.97189 16 5.74808 16 5.47097C16 5.19386 15.777 4.97005 15.5008 4.97005H15.4929Z" fill="#5382D8"/>
                    </Svg>
                    <AppTextBold style={styles.itemPriceText}>
                        {parseInt(item.price)} ₽
                    </AppTextBold>
                </View>
            </View>
        </AppDrug>
    )
}

const styles = StyleSheet.create({
    itemName: {
        paddingLeft: 10,
        fontSize: 14,
        paddingRight: 20
    },
    itemImg: {
        width: 30,
        height: 30,
        //backgroundColor: "red"
    },
    item: {
        flexDirection: "row",
        alignItems: "center"
    },
    itemNum: {
        width: 20
    },
    itemBody: {
        flexDirection: "row",
        alignItems: "center"
        //backgroundColor: "red"
    },
    itemPrice: {
        width: 110,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingLeft: 50
    },
    itemPriceText: {
        paddingLeft: 10,
        paddingRight: 5,
        width: 80
    }
})
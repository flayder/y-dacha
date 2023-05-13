import React from "react"
import {StyleSheet, TouchableOpacity, View} from "react-native"
import AppDrug from "../AppDrug";
import {AppTextBold} from "../AppTextBold";
import {Svg, Path} from "react-native-svg";
import {AppText} from "../AppText";
import {
    FAVORITE_ITEM_STYLE,
    LinkTo
} from "../../../global";
import AppFastImage from "../AppFastImage";
import AppTextTicker from "../AppTextTicker";

export default (
    {
        style,
        item,
        num,
        navigation,
        onDelete,
        screenWidth = "100%"
    }) => {

    return (
        <AppDrug
            style={styles.drug}
            //press={false}
            onDelete={() => {
                if(onDelete) onDelete(item.id)
            }}
            deleteBtnStyle={{
                marginRight: 20
            }}
            screenWidth={screenWidth}
            onPressFun={() => {

            }}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={{...styles.wrap, paddingTop: 10, paddingBottom: 10, width: screenWidth}}
                onPress={() => {
                    LinkTo("AddNomenclaturaScreen", {
                        assortment_id: item.id,
                        type: "update"
                    }, navigation)
                }}
            >
                <AppTextBold style={styles.num}>
                    {num}
                </AppTextBold>
                <AppFastImage
                    style={{...styles.img}}
                    uri={item.main_photo}
                />
                <View style={{...styles.body, width: screenWidth - 170}}>
                    <AppTextTicker style={styles.name}>
                        {item.name}
                    </AppTextTicker>
                    <AppText style={styles.descr}>
                        {item.characteristic}
                    </AppText>
                </View>
                <View style={styles.right}>
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M14.7726 4.14372L14.5286 3.89977V3.89977L14.7726 4.14372ZM14.7726 3.0472L14.5286 3.29116V3.29116L14.7726 3.0472ZM13.3494 5.56685L13.1055 5.81081L13.3494 6.05476L13.5934 5.81081L13.3494 5.56685ZM10.4332 2.65059L10.1892 2.40664L9.94526 2.65059L10.1892 2.89454L10.4332 2.65059ZM11.8563 1.22746L12.1002 1.47141L12.1005 1.47113L11.8563 1.22746ZM12.9528 1.22746L12.7086 1.47113L12.7089 1.47141L12.9528 1.22746ZM1.11665 11.9671L0.872699 11.7231L0.872698 11.7231L1.11665 11.9671ZM9.60103 3.4827L9.84498 3.23874L9.60103 2.99479L9.35708 3.23874L9.60103 3.4827ZM12.5173 6.39896L12.7611 6.64302L13.0053 6.39907L12.7612 6.15501L12.5173 6.39896ZM4.02514 14.8833L3.7813 14.6393L3.77482 14.6457L3.7687 14.6525L4.02514 14.8833ZM15.0165 4.38767C15.4545 3.94965 15.4545 3.24127 15.0165 2.80325L14.5286 3.29116C14.6972 3.45972 14.6972 3.73121 14.5286 3.89977L15.0165 4.38767ZM13.5934 5.81081L15.0165 4.38767L14.5286 3.89977L13.1055 5.3229L13.5934 5.81081ZM10.1892 2.89454L13.1055 5.81081L13.5934 5.3229L10.6771 2.40664L10.1892 2.89454ZM11.6123 0.983505L10.1892 2.40664L10.6771 2.89454L12.1002 1.47141L11.6123 0.983505ZM12.4046 0.655C12.1072 0.655 11.8221 0.773291 11.6121 0.98378L12.1005 1.47113C12.1811 1.39038 12.2905 1.345 12.4046 1.345V0.655ZM13.197 0.98378C12.987 0.773291 12.7019 0.655 12.4046 0.655V1.345C12.5186 1.345 12.628 1.39038 12.7086 1.47113L13.197 0.98378ZM15.0165 2.80325L13.1968 0.983505L12.7089 1.47141L14.5286 3.29116L15.0165 2.80325ZM0.655 12.247V14.6112H1.345V12.247H0.655ZM0.872698 11.7231C0.73097 11.8649 0.655 12.0456 0.655 12.247H1.345C1.345 12.2346 1.34701 12.2295 1.34762 12.2281C1.34826 12.2265 1.35077 12.2209 1.3606 12.211L0.872698 11.7231ZM9.35708 3.23874L0.872699 11.7231L1.3606 12.211L9.84498 3.72665L9.35708 3.23874ZM12.7612 6.15501L9.84498 3.23874L9.35708 3.72665L12.2733 6.64291L12.7612 6.15501ZM4.26898 15.1274L12.7611 6.64302L12.2734 6.15489L3.7813 14.6393L4.26898 15.1274ZM3.75295 15.345C3.93934 15.345 4.13823 15.2734 4.28157 15.1141L3.7687 14.6525C3.77018 14.6509 3.77063 14.6513 3.76801 14.6524C3.76502 14.6536 3.75974 14.655 3.75295 14.655V15.345ZM1.38883 15.345H3.75295V14.655H1.38883V15.345ZM0.655 14.6112C0.655 15.0194 0.980549 15.345 1.38883 15.345V14.655C1.3725 14.655 1.36274 14.6493 1.35671 14.6433C1.35069 14.6372 1.345 14.6275 1.345 14.6112H0.655Z" fill="#6C6C6C"/>
                    </Svg>
                    <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M16.2 9.99996L18 8.3333L9.00003 -5.00728e-07L4.63636e-07 8.33334L1.79999 10L9.00002 3.33331L16.2 9.99996Z" fill="#6C6C6C"/>
                    </Svg>
                </View>
            </TouchableOpacity>
        </AppDrug>
    )
}

const styles = StyleSheet.create({
    ...FAVORITE_ITEM_STYLE,
    right: {
        width: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})
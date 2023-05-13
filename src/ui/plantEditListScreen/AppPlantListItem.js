import React from "react"
import {StyleSheet, View, TouchableOpacity} from "react-native"
import AppDrug from "../AppDrug";
import {AppTextBold} from "../AppTextBold";
import {AppText} from "../AppText";
import {Svg, Path} from "react-native-svg";
import {THEME} from "../../../theme";
import {LinkTo, SHADOW} from "../../../global";
import moment from "moment";
import {useNavigation} from "@react-navigation/native";
import {AppFetch} from "../../AppFetch";

export default ({item, screenWidth, onDelete}) => {
    const navigation = useNavigation()
    return (
        <AppDrug
            style={styles.drug}
            screenWidth={screenWidth}
            onDelete={() => {
                if(onDelete) onDelete(item.id)
            }}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={styles.item}
                onPress={() => {
                    LinkTo("PlantFormPageScreen", {
                        plantId: item.plant_id,
                        questionary_id: item.id,
                        update: true
                    }, navigation)
                }}
            >
                <AppTextBold style={styles.itemBold}>
                    {moment(item.created_at).format("YYYY")} г.
                </AppTextBold>
                <AppText style={{...styles.itemText, width: screenWidth - 120}}>
                    {item.name}
                </AppText>
                <View style={styles.itemIcon}>
                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M18.71 5.04249L18.466 4.79853V4.79853L18.71 5.04249ZM18.71 3.63249L18.466 3.87644V3.87644L18.71 3.63249ZM16.88 6.87249L16.636 7.11644L16.88 7.36039L17.124 7.11644L16.88 6.87249ZM13.13 3.12249L12.886 2.87853L12.6421 3.12249L12.886 3.36644L13.13 3.12249ZM14.96 1.29249L15.204 1.53644L15.2042 1.53616L14.96 1.29249ZM16.37 1.29249L16.1258 1.53616L16.126 1.53644L16.37 1.29249ZM1.15 15.1025L1.39395 15.3464L1.39395 15.3464L1.15 15.1025ZM12.06 4.19249L12.304 3.94853L12.06 3.70458L11.816 3.94853L12.06 4.19249ZM15.81 7.94249L16.0538 8.18655L16.298 7.9426L16.054 7.69853L15.81 7.94249ZM4.89 18.8525L4.64616 18.6084L4.63969 18.6149L4.63356 18.6217L4.89 18.8525ZM18.954 5.28644C19.4787 4.76171 19.4787 3.91326 18.954 3.38853L18.466 3.87644C18.7213 4.13171 18.7213 4.54326 18.466 4.79853L18.954 5.28644ZM17.124 7.11644L18.954 5.28644L18.466 4.79853L16.636 6.62853L17.124 7.11644ZM12.886 3.36644L16.636 7.11644L17.124 6.62853L13.374 2.87853L12.886 3.36644ZM14.716 1.04853L12.886 2.87853L13.374 3.36644L15.204 1.53644L14.716 1.04853ZM15.665 0.655C15.3088 0.655 14.9673 0.796688 14.7158 1.04881L15.2042 1.53616C15.3263 1.41378 15.4921 1.345 15.665 1.345V0.655ZM16.6142 1.04881C16.3627 0.796688 16.0212 0.655 15.665 0.655V1.345C15.8379 1.345 16.0037 1.41378 16.1258 1.53616L16.6142 1.04881ZM18.954 3.38853L16.614 1.04853L16.126 1.53644L18.466 3.87644L18.954 3.38853ZM0.655 15.4625V18.5025H1.345V15.4625H0.655ZM0.906049 14.8585C0.742086 15.0225 0.655 15.2299 0.655 15.4625H1.345C1.345 15.415 1.35791 15.3825 1.39395 15.3464L0.906049 14.8585ZM11.816 3.94853L0.906048 14.8585L1.39395 15.3464L12.304 4.43644L11.816 3.94853ZM16.054 7.69853L12.304 3.94853L11.816 4.43644L15.566 8.18644L16.054 7.69853ZM5.13384 19.0965L16.0538 8.18655L15.5662 7.69842L4.64616 18.6084L5.13384 19.0965ZM4.54 19.3475C4.75529 19.3475 4.98308 19.2648 5.14644 19.0833L4.63356 18.6217C4.61692 18.6402 4.58471 18.6575 4.54 18.6575V19.3475ZM1.5 19.3475H4.54V18.6575H1.5V19.3475ZM0.655 18.5025C0.655 18.973 1.02946 19.3475 1.5 19.3475V18.6575C1.41054 18.6575 1.345 18.5919 1.345 18.5025H0.655Z" fill="#6C6C6C"/>
                    </Svg>
                </View>
            </TouchableOpacity>
        </AppDrug>
    )
}

const styles = StyleSheet.create({
    itemBold: {
        width: 50,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 14
    },
    itemText: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 14,
        paddingLeft: 5
    },
    itemIcon: {
        width: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    item: {
        marginTop: 8,
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 12,
        backgroundColor: THEME.SLIDER_BG,
        paddingTop: 8,
        paddingBottom: 8
    }
})
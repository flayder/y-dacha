import React from "react";
import {AppTextBold} from "../AppTextBold";
import {StyleSheet, View} from "react-native";
import {THEME} from "../../../theme";

export default ({text, price}) => {
    return (
        <View style={styles.total}>
            <AppTextBold style={styles.totalTextLeft}>
                {text}
            </AppTextBold>
            <AppTextBold style={styles.totalTextRight}>
                {price} ₽
            </AppTextBold>
        </View>
    )
}

const styles = StyleSheet.create({
    total: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 2,
        borderColor: THEME.ALL_COLOR,
        marginTop: 30
    },
    totalTextRight: {
        fontSize: 20
    },
    totalTextLeft: {
        fontSize: 14
    }
})
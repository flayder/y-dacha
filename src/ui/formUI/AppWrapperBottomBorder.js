import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import {AppText} from "../AppText";
import {THEME} from "../../../theme";

export default ({children, placeholder}) => {
    return (
        <>
            <View style={styles.wrap}>
                {children}
            </View>
            {
                placeholder
                    ?
                    <AppText style={styles.placeholder}>{placeholder}</AppText>
                    :
                    <></>
            }
        </>
    )
}

const styles = StyleSheet.create({
    wrap: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        position: "relative",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderColor: THEME.GREY_TEXT
    },
    placeholder: {
        color: THEME.GREY_TEXT,
        marginTop: 5,
        fontSize: 14,
        marginBottom: 0
    }
})
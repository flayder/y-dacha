import React, {useLayoutEffect, useState, useEffect} from "react"
import {View, StyleSheet, ImageBackground} from "react-native"
import {AppText} from "../AppText";
import {AppTextBold} from "../AppTextBold";

export default ({data}) => {
    return (
        <View style={{...styles.item, elevation: data.zIndex, zIndex: data.zIndex}}>
            <AppText style={styles.name}>
                {data.name}
            </AppText>
            <View style={{...styles.scale, backgroundColor: data.color, elevation: data.zIndex, zIndex: data.zIndex}}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        position: "relative",
        width: "33.3333333%"
    },
    name: {
        textAlign: "center"
    },
    scale: {
        position: "relative",
        marginLeft: -10,
        marginRight: -10,
        height: 16,
        borderRadius: 8
    }
})
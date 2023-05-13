import React from "react"
import {StyleSheet, View} from "react-native";
import {AppText} from "../AppText";
import {THEME} from "../../../theme";


export default ({Icon, text}) => {
    return (
        <View style={styles.btnWrap}>
            <View style={styles.item}>
                <View style={styles.imgWrap}>
                    <Icon />
                </View>
                <AppText style={styles.text}>{text}</AppText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 4,
        shadowColor: "#000",
        shadowOpacity: .2,
        shadowOffset: {
            width: 0,
            height: 3
        },
        elevation: 7,
        padding: 5,
        height: 140,
        //padding: 20,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 20,
        backgroundColor: "white"
    },
    img: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    btnWrap: {
        width: "100%",
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    imgWrap: {
        marginBottom: 10
    },
    text: {
        textAlign: "center",
        maxHeight: 50
    }
})
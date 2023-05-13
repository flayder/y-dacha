import React from "react"
import {View, StyleSheet} from "react-native"
import AppVote from "../AppVote";
import {AppText} from "../AppText";

export default ({rating, style}) => {
    return (
        <View style={style}>
            <View style={styles.wrap}>
                <View style={styles.bg}></View>
                <View style={styles.block}>
                    <AppVote
                        starWidth={12}
                        starHeight={12}
                        initiate={rating}
                        style={styles.vote}
                    />
                    <AppText style={styles.text}>
                        Рейтинг мастера
                    </AppText>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    vote: {
        width: 80,
        marginLeft: "auto",
        marginRight: "auto"
    },
    wrap: {
        width: 130,
        position: "relative",
        textAlign: "center"
    },
    block: {
        padding: 10,
        marginLeft: "auto",
        marginRight: "auto"
    },
    bg: {
        backgroundColor: "#000",
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        opacity: .5
    },
    text: {
        color: "#fff",
        textAlign: "center",
        marginTop: 8,
        marginBottom: 0,
        fontSize: 14
    }
})
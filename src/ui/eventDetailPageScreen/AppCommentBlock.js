import React, {useState} from "react";
import {View, StyleSheet, Image, TouchableOpacity} from "react-native"
import {AppTextBold} from "../AppTextBold";;
import {AppText} from "../AppText";
import {THEME} from "../../../theme";
import {AppTextItalic} from "../AppTextItalic";
import moment from "moment"

export default ({data, screenWidth}) => {
    const [showMore, setMore] = useState(false)
    const maxHeight = (!showMore) ? {maxHeight: 110} : {}
    return (
        <View style={styles.comment}>
            <View style={styles.lefr}>
                <Image
                    source={{uri: data.user.photo}}
                    style={styles.ava}
                    resizeMode={"cover"}
                />
            </View>
            <View style={styles.right}>
                <View style={{...styles.nameBlock}}>
                    <View style={styles.nameWrap}>
                        {/*, width: screenWidth / 2.3*/}
                        <AppTextBold style={{...styles.name}}>
                            {data.user.first_name} {data.user.last_name}
                        </AppTextBold>
                        <AppText style={{...styles.text, ...maxHeight}}>
                            {data.text}
                        </AppText>
                        <AppText style={styles.date}>
                            {moment(data.created_at).format("DD.MM.YYYY")} в {moment(data.created_at).format("HH:mm")}
                        </AppText>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    comment: {
        width: "100%",
        padding: 10,
        flexDirection: "row",
        marginBottom: 20
    },
    ava: {
        width: 62,
        height: 62,
        borderRadius: 30
    },
    date: {
        marginTop: 0,
        marginBottom: 0,
        fontSize: 14,
        color: THEME.GREY_TEXT
    },
    header: {
        flexDirection: "row",
        alignItems: "center"
    },
    nameWrap: {

    },
    nameBlock: {
        paddingLeft: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    name: {
        marginTop: 0,
        marginBottom: 0
    },
    vote: {
        width: 110,
        marginTop: 10,
        marginLeft: 0,
        marginBottom: 0
    },
    text: {
        overflow: "hidden",
        marginBottom: 0,
        marginTop: 10
    },
    more: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    moreText: {
        marginTop: 5,
        marginBottom: -5,
        color: THEME.BLUE_1
    }
})
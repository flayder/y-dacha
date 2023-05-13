import React, {useState} from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {AppTextBold} from "./AppTextBold";
import AppVote from "./AppVote";
import {AppText} from "./AppText";
import {THEME} from "../../theme";
import {AppTextItalic} from "./AppTextItalic";
import moment from "moment"
import AppFastImage from "./AppFastImage";

export default ({data, screenWidth}) => {
    const [showMore, setMore] = useState(false)
    const maxHeight = (!showMore) ? {maxHeight: 110} : {}
    return (
        <View style={styles.comment}>
            <View style={styles.header}>
                <AppFastImage
                    uri={data.photo}
                    style={styles.ava}
                    resizeMode={"cover"}
                />
                <View style={{...styles.nameBlock, width: screenWidth - 105}}>
                    <View style={styles.nameWrap}>
                        <AppTextBold style={{...styles.name, width: screenWidth / 2.3}}>
                            {data.name}
                        </AppTextBold>
                        <AppVote
                            style={styles.vote}
                            starWidth={15}
                            starHeight={15}
                            initiate={data.vote}
                        />
                    </View>
                    <View style={styles.dateWrap}>
                        <AppText style={styles.date}>
                            {moment(data.created_at).format("DD.MM.YYYY")} в {moment(data.created_at).format("HH:mm")}
                        </AppText>
                    </View>
                </View>
            </View>
            <View style={styles.textWrap}>
                <AppText style={{...styles.text, ...maxHeight}}>
                    {data.text}
                </AppText>
                {
                    data && data.text && data.text.length > 200
                        ?
                        <TouchableOpacity
                            style={styles.more}
                            activeOpacity={1}
                            onPress={() => {
                                setMore(!showMore)
                            }}
                        >
                            <AppTextItalic style={styles.moreText}>
                                {
                                    !showMore
                                        ?
                                        "Показать полностью"
                                        :
                                        "Свернуть комментарий"
                                }

                            </AppTextItalic>
                        </TouchableOpacity>
                        :
                        <></>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    comment: {
        padding: 20,
        backgroundColor: THEME.SLIDER_BG,
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
        color: THEME.GREY
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
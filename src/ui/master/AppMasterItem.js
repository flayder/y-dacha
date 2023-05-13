import React from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {AppText} from "../AppText";
import AppVote from "../AppVote";
import {AppTextBold} from "../AppTextBold";
import {Svg, Path} from "react-native-svg";
import {THEME} from "../../../theme";
import {LinkTo, SHADOW} from "../../../global";
import {AppTextItalic} from "../AppTextItalic";
import AppFastImage from "../AppFastImage";

export default ({item, screenWidth, navigation}) => {
    return (
        <View style={{...styles.item, width: screenWidth}}>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.wrap}
                onPress={() => {
                    LinkTo("MasterDetailPageScreen", {
                        masterId: item.user_id
                    }, navigation)
                }}
            >
                <View style={styles.left}>
                    <AppFastImage
                        style={styles.image}
                        uri={item.photo}
                    />
                    <View style={styles.price}>
                        {
                            item.price
                                ?
                                <AppTextBold style={styles.priceText}>
                                    От {item.price}
                                </AppTextBold>
                                :
                                <></>
                        }
                    </View>
                    <AppVote
                        starWidth={15}
                        starHeight={15}
                        initiate={item.rating}
                        style={styles.vote}
                        fill={THEME.ORANGE}
                    />
                </View>
                <View style={{...styles.right, width: screenWidth - 100}}>
                    <View style={styles.name}>
                        <AppTextBold style={styles.nameMaster}>
                            {item.name}
                        </AppTextBold>
                    </View>
                    <View style={styles.character}>
                        {
                            item.skill
                                ?
                                <AppTextBold style={styles.text}>
                                    {item.skill}
                                </AppTextBold>
                                :
                                <></>
                        }
                        {
                            item.experience
                                ?
                                <AppTextItalic style={styles.text}>
                                    Опыт работы:
                                    <AppText>
                                        {item.experience}
                                    </AppText>
                                </AppTextItalic>
                                :
                                <></>
                        }
                        <AppText style={styles.text}>
                            {item.descr}
                        </AppText>
                    </View>
                    <View style={styles.moreBtn}>
                        <AppTextBold style={styles.more}>
                            Развернуть описание
                        </AppTextBold>
                        <Svg width="8" height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M1.8704e-05 0.999997L1.00002 -5.96242e-08L6 4.99998L0.999992 10L-4.27961e-06 9L4.00001 4.99999L1.8704e-05 0.999997Z" fill="#53588A"/>
                        </Svg>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        marginLeft: "auto",
        marginRight: "auto",
        padding: 10,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: "#fff",
        ...SHADOW
    },
    character: {
        paddingRight: 5,
        height: 115,
        overflow: "hidden"
    },
    left: {
        width: 100,
        paddingBottom: 20
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 15
    },
    wrap: {
        flexDirection: "row"
    },
    vote: {
        width: "100%",
        marginTop: 20
    },
    price: {
        backgroundColor: THEME.ORANGE,
        textAlign: "center"
    },
    right: {
        //backgroundColor: "red",
        width: "70%",
        paddingLeft: 20
    },
    moreBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderColor: THEME.ALL_COLOR,
        paddingRight: 20
    },
    text: {
        marginTop: 0,
        marginBottom: 0
    },
    more: {
        marginTop: 5,
        marginBottom: 5,
        color: THEME.FOOTER_BG
    },
    priceText: {
        color: "#fff",
        textAlign: "center",
        marginTop: 1,
        marginBottom: 1,
        borderRadius: 5,
        fontSize: 14
    },
    nameMaster: {
        marginTop: 0,
        color: THEME.COMFORT_COLOR,
        textAlign: "center"
    },
    name: {
        height: 35
    }
})
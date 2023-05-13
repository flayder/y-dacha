import React from "react"
import {ImageBackground, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {AppTextBold} from "../AppTextBold";
import {AppText} from "../AppText";
import {AppTextItalic} from "../AppTextItalic";
import {THEME} from "../../../theme";
import {Svg, Path} from "react-native-svg";
import {LinkTo, SHADOW} from "../../../global";
import AppFastImage from "../AppFastImage";
import AppTextBoldTicker from "../AppTextBoldTicker";

export default ({item, navigation}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.btnWrap} onPress={() => {
            LinkTo("EventDetailPageScreen", {
                eventId: item.id
            }, navigation)
        }}>
            <ImageBackground
                style={styles.bg}
                activeOpacity={1}
                resizeMode={"cover"}
                source={require("@images/bgEvents.png")}
            >
                <View style={styles.item}>
                    <View style={styles.imgWrap}>
                        <View style={styles.photoWrap}>
                            <AppFastImage
                                uri={item.main_photo}
                                resizeMode={"stretch"}
                                style={styles.photo}
                            />
                        </View>
                        <View style={styles.nameWrap}>
                            <AppTextBoldTicker style={styles.name}>
                                {item.title}
                            </AppTextBoldTicker>
                            <View style={styles.descr}>
                                <AppText style={styles.descrText}>
                                    {item.description}
                                </AppText>
                            </View>
                            <View style={styles.location}>
                                <AppTextItalic style={styles.locName}>
                                    <Svg style={{marginRight: 5}} width="8" height="10" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M1.98857 0C0.891429 0 0 0.877488 0 1.95747C0 2.96996 0.777143 3.77995 1.78286 3.89245V6.74991C1.78286 6.86241 1.87429 6.97491 2.01143 6.97491C2.12571 6.97491 2.24 6.88491 2.24 6.74991V3.89245C3.24571 3.77995 4.02286 2.96996 4.02286 1.95747C4.02286 0.877488 3.13143 0 2.03429 0H1.98857ZM3.06286 1.75498C3.08571 1.68748 3.10857 1.61998 3.10857 1.52998C3.10857 1.16998 2.81143 0.877488 2.44571 0.877488C2.37714 0.877488 2.28571 0.899988 2.21714 0.922488V0.472494C2.28571 0.449994 2.35429 0.449994 2.44571 0.449994C3.06286 0.449994 3.56571 0.944988 3.56571 1.55248C3.56571 1.61998 3.56571 1.70998 3.54286 1.77748H3.08571L3.06286 1.75498Z" fill="#53588A"/>
                                    </Svg>
                                    {item.location}
                                </AppTextItalic>
                            </View>
                        </View>
                    </View>
                    <View style={styles.right}>
                        <AppText style={styles.textWhen}>Когда?</AppText>
                        {
                            item.hasOwnProperty('date')
                                ?
                                <View>
                                    <AppTextBold style={styles.boldRight}>
                                        {item.date.day}
                                    </AppTextBold>
                                    <AppTextBold style={styles.boldRight}>
                                        {item.date.month}
                                    </AppTextBold>
                                    <AppText style={styles.textRight}>{item.date.year}</AppText>
                                </View>
                                :
                                <></>
                        }
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bg: {
        width: "101%",
        height: "100%"
    },
    nameWrap: {
        padding: 20,
        paddingTop: 10,
        paddingLeft: 15
    },
    name: {
        fontSize: 16,
        height: 25,
        marginTop: 0,
        marginBottom: 0
    },
    descr: {
        width: 180,
        marginTop: -10,
        height: 45
    },
    descrText: {
        width: "100%",
        fontSize: 13,
        lineHeight: 16,
        height: 35,
        color: THEME.GREY_TEXT,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        paddingBottom: 0,
        paddingLeft: 15,
        paddingTop: 0
    },
    imgWrap: {
        flexDirection: "row",
        width: "80%",
        height: "100%",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 6,
        paddingLeft: 10
    },
    photoWrap: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginTop: -10,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center"
    },
    photo: {
        width: 80,
        height: 80,
    },
    btnWrap: {
        paddingBottom: 0,
        paddingTop: 0,
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        overflow: "hidden"
    },
    location: {
        height: 20,
        marginTop: 10
    },
    locName: {
        fontSize: 11,
        color: THEME.FOOTER_BG
    },
    right: {
        paddingLeft: 20,
        paddingRight: 5,
        paddingTop: 0,
        justifyContent: "center"
    },
    boldRight: {
        marginTop: 2,
        marginBottom: 2,
        textAlign: "center",
        fontSize: 14
    },
    textWhen: {
        marginTop: -12,
        marginBottom: 3,
        fontSize: 12,
        textAlign: "center",
        color: THEME.ORANGE
    },
    textRight: {
        marginTop: 3,
        textAlign: "center",
        marginBottom: 0,
        fontSize: 12
    }
})
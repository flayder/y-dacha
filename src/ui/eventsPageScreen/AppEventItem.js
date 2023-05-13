import React, {useState} from "react"
import {ImageBackground, StyleSheet, TouchableOpacity, View, Animated} from "react-native";
import {AppTextBold} from "../AppTextBold";
import {AppText} from "../AppText";
import {AppTextItalic} from "../AppTextItalic";
import {THEME} from "../../../theme";
import {Svg, Path} from "react-native-svg";
import moment from "moment"
import 'moment/locale/ru'
import {useNavigation} from "@react-navigation/native";
import AppDrug from "../AppDrug";
import {LinkTo} from "../../../global";
import AppFastImage from "../AppFastImage";
import AppTextBoldTicker from "../AppTextBoldTicker";

export default ({item, onDelete, screenWidth, editable = false}) => {
    const navigation = useNavigation()
    const [position, setPosition] = useState(0)
    const generateItem = () => {
        return (
            <ImageBackground
                style={styles.bg}
                activeOpacity={1}
                resizeMode={"stretch"}
                source={require("@images/bgEvents.png")}
            >
                <View style={styles.item}>
                    <View style={styles.imgWrap}>
                        <View style={styles.photoWrap}>
                            <AppFastImage
                                uri={item.main_photo}
                                resizeMode={'cover'}
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
                                {
                                    item.location
                                        ?
                                        <AppTextItalic style={styles.locName}>
                                            <Svg style={{marginRight: 5}} width="8" height="10" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M1.98857 0C0.891429 0 0 0.877488 0 1.95747C0 2.96996 0.777143 3.77995 1.78286 3.89245V6.74991C1.78286 6.86241 1.87429 6.97491 2.01143 6.97491C2.12571 6.97491 2.24 6.88491 2.24 6.74991V3.89245C3.24571 3.77995 4.02286 2.96996 4.02286 1.95747C4.02286 0.877488 3.13143 0 2.03429 0H1.98857ZM3.06286 1.75498C3.08571 1.68748 3.10857 1.61998 3.10857 1.52998C3.10857 1.16998 2.81143 0.877488 2.44571 0.877488C2.37714 0.877488 2.28571 0.899988 2.21714 0.922488V0.472494C2.28571 0.449994 2.35429 0.449994 2.44571 0.449994C3.06286 0.449994 3.56571 0.944988 3.56571 1.55248C3.56571 1.61998 3.56571 1.70998 3.54286 1.77748H3.08571L3.06286 1.75498Z" fill="#53588A"/>
                                            </Svg>
                                            {item.location}
                                        </AppTextItalic>
                                        :
                                        <></>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={styles.right}>
                        <AppText style={styles.textWhen}>Когда?</AppText>
                        {
                            item.hasOwnProperty('date')
                                ?
                                <View>
                                    <View style={styles.dateBlock}>
                                        <AppTextBold style={styles.boldRight}>
                                            {moment(item.date).format("DD")}
                                        </AppTextBold>
                                        <AppTextBold style={styles.boldRight}>
                                            {moment(item.date).format("MMMM")}
                                        </AppTextBold>
                                    </View>
                                    <View style={styles.part}>
                                        <View style={styles.icon}>
                                            <Svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M3.73786 3.13098H3.1068H1.26214C0.582524 3.13098 0 3.71351 0 4.39312V6.86885C0 7.20865 0.291262 7.49991 0.631068 7.49991H1.26214V9.39312C1.26214 9.73292 1.5534 10.0242 1.8932 10.0242H3.15534C3.49515 10.0242 3.78641 9.73292 3.78641 9.39312V7.49991H4.41748C4.75728 7.49991 5.04854 7.20865 5.04854 6.86885V4.39312C5.04854 3.71351 4.46602 3.13098 3.78641 3.13098H3.73786Z" fill="#60A04E"/>
                                                <Path d="M2.47551 2.54844C3.17257 2.54844 3.73765 1.98336 3.73765 1.28631C3.73765 0.589247 3.17257 0.0241699 2.47551 0.0241699C1.77846 0.0241699 1.21338 0.589247 1.21338 1.28631C1.21338 1.98336 1.77846 2.54844 2.47551 2.54844Z" fill="#60A04E"/>
                                            </Svg>
                                        </View>
                                        <AppText style={styles.green}>Идут</AppText>
                                        <AppText style={styles.green}>{item.count} чел.</AppText>
                                    </View>
                                </View>
                                :
                                <></>
                        }
                    </View>
                </View>
            </ImageBackground>
        )
    }

    if(!editable) {
        return (
            <TouchableOpacity
                style={styles.btnWrap}
                activeOpacity={1}
                onPress={() => {
                    LinkTo("EventDetailPageScreen", {
                        eventId: item.id
                    }, navigation)
                }}
            >
                {
                    generateItem()
                }
            </TouchableOpacity>
        )
    } else {
        return (
            <View
                style={{...styles.btnWrap}}
            >
                <AppDrug
                    screenWidth={screenWidth - 30}
                    onDelete={del => {
                        if(onDelete) onDelete(del)
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.edit}
                        onPress={() => {
                            LinkTo("EventUpdateFormPageScreen", {
                                eventId: item.id
                            }, navigation)
                        }}
                    >
                        <Svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M12.1267 33.5159L3.022 30.1971C2.90596 30.1541 2.79233 30.1111 2.68112 30.0626C2.62551 30.0384 2.56991 30.0142 2.51672 29.99L2.43694 29.9524C2.38375 29.9282 2.33057 29.9013 2.2798 29.8744L2.20243 29.834L2.12749 29.7937L2.05254 29.7534L1.98001 29.7103L1.90749 29.6673L1.83496 29.6243L1.76485 29.5812L1.69474 29.5355L1.62704 29.4898L1.55935 29.4441L1.49408 29.3984L1.4288 29.3499L1.36594 29.3015L1.30309 29.2531L1.24265 29.2047L1.18462 29.1536L1.1266 29.1025L1.071 29.0514L1.01539 29.0003L0.962205 28.9465L0.909018 28.8927L0.858248 28.8389L0.807478 28.7852L0.759126 28.7314L0.713192 28.6776L0.667258 28.6211L0.623741 28.5646L0.580224 28.5081L0.539125 28.4517L0.500443 28.3952L0.461762 28.336L0.425498 28.2769L0.389234 28.2177L0.355387 28.1585L0.323958 28.0994L0.29253 28.0402L0.263518 27.981L0.234507 27.9192L0.207914 27.8573L0.183738 27.7954L0.159562 27.7336L0.137803 27.6717L0.118462 27.6099L0.0991216 27.548L0.0821984 27.4862L0.0652751 27.4216L0.0507696 27.3571L0.0386816 27.2925L0.0290112 27.228L0.0193408 27.1634L0.012088 27.0989L0.00725274 27.0343L0.00241766 26.9698L0 26.9052V26.8407V19.1677V0H30V0.559406V19.1677V26.8407V26.9052L29.9976 26.9698L29.9927 27.0343L29.9879 27.0989L29.9807 27.1634L29.971 27.228L29.9613 27.2925L29.9492 27.3571L29.9347 27.4216L29.9202 27.4862L29.9033 27.548L29.884 27.6099L29.8646 27.6717L29.8429 27.7336L29.8187 27.7954L29.7945 27.8573L29.7679 27.9192L29.7389 27.981L29.7099 28.0402L29.6785 28.0994L29.647 28.1585L29.6132 28.2177L29.5769 28.2769L29.5407 28.336L29.502 28.3925L29.4609 28.449L29.4198 28.5055L29.3763 28.5619L29.3327 28.6184L29.2868 28.6749L29.2409 28.7287L29.1925 28.7825L29.1418 28.8363L29.091 28.89L29.0378 28.9438L28.9846 28.9976L28.929 29.0487C28.8927 29.0837 28.8541 29.1187 28.8154 29.1509L28.7574 29.202L28.6969 29.2504L28.6365 29.2988L28.5736 29.3473L28.5108 29.3957L28.4455 29.4414L28.3802 29.4871L28.3125 29.5328L28.2424 29.5785L28.1723 29.6216L28.1022 29.6646L28.0297 29.7076C27.9571 29.7507 27.8822 29.791 27.8048 29.8314L27.7275 29.8717C27.6767 29.8986 27.6235 29.9228 27.5703 29.9497L27.4905 29.9873C27.4373 30.0115 27.3817 30.0358 27.3261 30.06C27.2149 30.1057 27.1013 30.1514 26.9853 30.1944L17.8806 33.5132L17.796 33.5428L17.7113 33.5724L17.6267 33.5993L17.5421 33.6262L17.4551 33.6531L17.368 33.6773L17.281 33.7015L17.194 33.7257L17.1069 33.7472L17.0199 33.7687L16.9305 33.7902L16.841 33.809L16.7515 33.8279L16.6621 33.8467L16.5726 33.8628L16.4832 33.879L16.3913 33.8924L16.2995 33.9059L16.2076 33.9193L16.1157 33.9301L16.0239 33.9408L15.932 33.9516L15.8401 33.9597L15.7482 33.9677L15.6564 33.9758L15.5645 33.9812L15.4726 33.9866L15.3808 33.9919L15.2889 33.9946L15.197 33.9973L15.1052 34H15.0133H14.9214L14.8296 33.9973L14.7377 33.9946L14.6458 33.9919L14.554 33.9866L14.4621 33.9812L14.3702 33.9758L14.2783 33.9677L14.1865 33.9597L14.0946 33.9516L14.0027 33.9408L13.9109 33.9301L13.819 33.9193L13.7271 33.9059L13.6353 33.8924L13.5434 33.879L13.4539 33.8628L13.3645 33.8467L13.275 33.8279L13.1856 33.809L13.0961 33.7902L13.0067 33.7687L12.9172 33.7472L12.8302 33.7257L12.7432 33.7015L12.6561 33.6773L12.5691 33.6531L12.4821 33.6262L12.3975 33.5993L12.3128 33.5724L12.2282 33.5428L12.1436 33.5132L12.1267 33.5159Z" fill="#60A04E"/>
                            <Path fillRule="evenodd" clipRule="evenodd" d="M23.71 7.63249C24.1 8.02249 24.1 8.65249 23.71 9.04249L21.88 10.8725L18.13 7.12249L19.96 5.29249C20.1468 5.10523 20.4005 5 20.665 5C20.9295 5 21.1832 5.10523 21.37 5.29249L23.71 7.63249ZM6 22.5025V19.4625C6 19.3225 6.05 19.2025 6.15 19.1025L17.06 8.19249L20.81 11.9425L9.89 22.8525C9.8 22.9525 9.67 23.0025 9.54 23.0025H6.5C6.22 23.0025 6 22.7825 6 22.5025Z" fill="white"/>
                        </Svg>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.btnWrapItem}
                        onPress={() => {
                            LinkTo("EventDetailPageScreen", {
                                eventId: item.id
                            }, navigation)
                        }}
                    >
                        {
                            generateItem()
                        }
                    </TouchableOpacity>
                </AppDrug>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btnWrapItem: {
        width: "100%",
        height: "100%"
    },
    edit: {
        position: "absolute",
        left: 15,
        top: 15,
        zIndex: 99
    },
    bg: {
        width: "103%",
        paddingLeft: 10,
        height: "100%",
        //backgroundColor: "red"
    },
    dateBlock: {
        borderBottomWidth: 1,
        borderColor: "#000",
        paddingBottom: 5,
        marginBottom: 5
    },
    icon: {
        width: 6,
        marginLeft: "auto",
        marginRight: "auto"
    },
    part: {
        justifyContent: "center"
    },
    green: {
        marginTop: 1,
        marginBottom: 1,
        fontSize: 12,
        textAlign: "center",
        color: THEME.SAD_COLOR
    },
    nameWrap: {
        padding: 20,
        paddingTop: 10,
        paddingLeft: 25,
        paddingBottom: 10
    },
    name: {
        fontSize: 16,
        height: 25,
        marginTop: 0,
        marginBottom: 0,
        overflow: "hidden"
    },
    descr: {
        width: 180,
        marginTop: -10,
        height: 65,
        overflow: "hidden"
    },
    descrText: {
        width: "100%",
        fontSize: 13,
        lineHeight: 16,
        height: 45,
        color: THEME.GREY_TEXT,
    },
    item: {
        flexDirection: "row",
        padding: 5,
        paddingBottom: 0,
        paddingTop: 0,
        paddingRight: 0
    },
    imgWrap: {
        flexDirection: "row",
        width: "75%",
        height: "100%",
        overflow: "hidden",
        alignItems: "center",
        borderRadius: 6,
        paddingLeft: 10,
        paddingTop: 5
    },
    photoWrap: {
        width: 80,
        height: 80,
        //height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    photo: {
        width: 90,
        height: 100,
        borderRadius: 8,
        overflow: "hidden"
    },
    btnWrap: {
        position: "relative",
        height: 140,
        paddingBottom: 0,
        paddingTop: 0,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: -10,
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        alignItems: "center",
        justifyContent: "center"
        //overflow: "hidden"
    },
    location: {
        height: 20,
        marginTop: 10
    },
    locName: {
        fontSize: 11,
        color: THEME.FOOTER_BG,
        marginBottom: 0
    },
    right: {
        paddingLeft: 26,
        paddingTop: 15,
        justifyContent: "center"
    },
    boldRight: {
        marginTop: 0,
        marginBottom: 0,
        textAlign: "center",
        fontSize: 13
    },
    textWhen: {
        marginTop: -12,
        marginBottom: 3,
        fontSize: 12,
        textAlign: "center"
    },
    textRight: {
        marginTop: 3,
        textAlign: "center",
        marginBottom: 0,
        fontSize: 12
    }
})
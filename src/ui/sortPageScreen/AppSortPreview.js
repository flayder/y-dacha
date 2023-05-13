import React, {useState} from "react"
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {LinkTo, SHADOW} from "../../../global";
import {AppText} from "../AppText";
import {AppTextBold} from "../AppTextBold";
import {THEME} from "../../../theme";
import {Svg, Path, Rect, Circle} from "react-native-svg";
import AppIconSvgHint from "../AppIconSvgHint";
import AppFastImage from "../AppFastImage";
import {useSelector} from "react-redux";
import AppTextBoldTicker from "../AppTextBoldTicker";

export default ({image, title, text, data}) => {
    const navigation = useNavigation()
    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    const [active, setActive] = useState(false)
    const userInfo = useSelector(state => state.others.userInfo)

    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })
    const im = 130
    const iconColor = (typeof userInfo == "object" && userInfo.is_addition) ? "#F39314" : THEME.GREY
    const PreviewImage = ({image, style}) => {
        return (
            <View
                style={{...styles.previewImg, ...style, width: im}}
            >
                <AppIconSvgHint
                    style={styles.previewLocation}
                    Icon={() => {
                        return (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                    if(typeof userInfo == "object" && userInfo.is_addition)
                                        LinkTo("GoogleMapShopPageScreen", {
                                            cultureId: data.id
                                        }, navigation)
                                }}
                            >
                                <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Rect width="30" height="30" rx="3" fill="black" opacity={.7}/>
                                    <Circle cx="15" cy="15" r="9" fill={iconColor}/>
                                    <Path d="M15.1569 9.70581C13.0133 9.70581 11.2942 11.4923 11.2942 13.671C11.2942 14.3899 11.4852 15.0653 11.8248 15.6535L15.1781 20.294L18.5315 15.6535C18.871 15.0653 19.0621 14.3899 19.0621 13.671C19.0621 11.4705 17.3217 9.70581 15.1993 9.70581L15.1569 9.70581ZM15.1569 15.6535C14.0957 15.6535 13.2255 14.7603 13.2255 13.671C13.2255 12.5816 14.0957 11.6884 15.1569 11.6884C16.2181 11.6884 17.0883 12.5816 17.0883 13.671C17.0883 14.7603 16.2181 15.6535 15.1569 15.6535Z" fill="white"/>
                                </Svg>
                            </TouchableOpacity>
                        )
                    }}
                />
                <AppFastImage
                    resizeMode={"cover"}
                    style={{width: im, height: im, borderRadius: 6}}
                    uri={image}
                />
            </View>
        )
    }

    const findABreak = (text) => {
        let index = 0
        for(let i = text.length; i > 0; i--) {
            if(text[i] === " ") {
                index = i
                break
            }
        }

        return index
    }

    const separateText = (text) => {
        let firstPrev = text.substr(0, 150)
        let textBreakPoint = findABreak(firstPrev)
        firstPrev = text.substr(0, textBreakPoint)

        let otherText = false

        if(textBreakPoint > 0)
            otherText = text.substr(textBreakPoint + 1)

        return [firstPrev, otherText]
    }

    const [firstText, secondText] = separateText(text)

    const TitleHandler = ({title}) => {
        const width = (!active) ? {} : {
            //width: "90%",
            //backgroundColor: "red"
        }

        return (
            <View style={styles.previewTitler}>
                <AppTextBoldTicker style={{...styles.previewTitle}}>
                    {title}
                </AppTextBoldTicker>
                <View style={styles.previewIcon}>
                    {
                        !active
                            ?
                            <Svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                <Path d="M9 5.99998L10 4.99998L5.00002 0L0 5L0.999997 6L5.00001 1.99999L9 5.99998Z"
                                      fill={"#000"}
                                />
                            </Svg>
                            :
                            <Svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                                <Path d="M9 0.48537L10 1.48537L5.00002 6.48535L0 1.48534L0.999997 0.485347L5.00001 4.48536L9 0.48537Z"
                                      fill={THEME.BLUE}
                                />
                            </Svg>
                    }
                </View>
            </View>
        )
    }

    const ShowerText = ({title}) => {
        return (
            <View style={styles.previewShowerWrap}>
                <TouchableOpacity activeOpacity={1} onPress={() => {
                    setActive(!active)
                }}>
                    <View style={styles.previewShowerFirstText}>
                        <PreviewImage style={styles.previewShowerFirstImg} image={image} />
                        <View style={{width: screeWidth - im - 20, paddingLeft: 20}}>
                            <View style={{width: screeWidth - im - 70}} activeOpacity={1}>
                                <TitleHandler title={title} />
                            </View>
                            <AppText style={{...styles.previewShowerFirstArea, paddingLeft: 10, paddingTop: 5}}>
                                {firstText}
                            </AppText>
                        </View>
                    </View>
                    {
                        secondText
                            ?
                            <AppText style={styles.previewShowerSecondText}>
                                {secondText}
                            </AppText>
                            :
                            <></>
                    }
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.area}>
            <View style={{...styles.previewWrap, height: im}}>
                {
                    active && title
                    ?
                        <ShowerText title={title} />
                        :
                        <></>
                }
                {
                    !active
                    ?
                        <View style={{...styles.previewShow}}>
                            <PreviewImage image={image} />
                            <View style={{...styles.previewTexter, width: screeWidth - im - 50}}>
                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                    setActive(!active)
                                }}>
                                    <TitleHandler title={title} />
                                    <View style={styles.previewText}>
                                        <AppText style={{...styles.previewDescription}}>
                                            {firstText}
                                        </AppText>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <></>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    previewShowerFirstArea: {
        marginTop: 0,
        marginBottom: 0,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 14
    },
    previewShowerSecondText: {
        marginTop: 0,
        marginBottom: 0,
        fontSize: 14,
        paddingBottom: 20
    },
    previewShowerFirstText: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 40
    },
    previewShowerWrap: {
        position: "absolute",
        left: 20,
        top: 0,
        width: "100%",
        backgroundColor: "white",
        ...SHADOW,
        padding: 0
    },
    previewShowerText: {
        flex: 1,
        textAlignVertical: "top",
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    previewShow: {
        flexDirection: "row",
        paddingRight: 20
    },
    area: {
        position: "relative",
        zIndex: 9,
        marginTop: 20,
        width: "100%"
    },
    previewWrap: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    previewShower: {
        flexDirection: "row",
        position: "relative",
    },
    previewImg: {
        position: "relative",
        zIndex: 10
    },
    previewLocation: {
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 9
    },
    previewTexter: {
        paddingLeft: 20
    },
    previewTitler: {
        position: "relative",
        zIndex: 99,
        paddingRight: 40,
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3,
        backgroundColor: THEME.SLIDER_BG
    },
    previewIcon: {
        position: "absolute",
        top: "50%",
        marginTop: 0,
        right: 10
    },
    previewTitle: {
        textTransform: "uppercase",
        marginTop: 0,
        marginBottom: 0,
        fontSize: 14,
        height: 18
    },
    previewDescription: {
        marginTop: 0,
        backgroundColor: "white",
        height: 115,
        fontSize: 14
    },
    previewText: {
        paddingTop: 5,
        paddingLeft: 10,
    }
})
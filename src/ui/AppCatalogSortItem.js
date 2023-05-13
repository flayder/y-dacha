import React from "react"
import {StyleSheet, TouchableOpacity, View} from "react-native"
import {AppTextBold} from "./AppTextBold";
import {useRoute} from "@react-navigation/native";
import {LinkTo, PRODUCT_STYLE} from "../../global";
import {THEME} from "../../theme";
import {Svg, Path, Rect} from "react-native-svg";
import AppVote from "./AppVote";
import {AppTextItalic} from "./AppTextItalic";
import AppIconSvgHint from "./AppIconSvgHint";
import AppFastImage from "./AppFastImage";
import AppTextBoldTicker from "./AppTextBoldTicker";

export default
    ({
        item,
        navigation,
        screenWidth,
        color,
        chemical = false
    }) => {
    const route = useRoute()
    let params = {}
    if(route.params !== undefined) params = route.params

    const borderColor = (item.sellers > 0) ? "#fff" : THEME.CHEMICAL_COLOR
    const seller = () => {
        if(item.sellers > 0) {
            return (
                <Svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                >
                    <Rect opacity="0.5" width="20" height="20" rx="3" fill="#60A04E"/>
                    <Path
                        d="M13.8788 11.5656C13.8788 11.248 13.627 10.9806 13.2913 10.9806H12.1329V9.8274C12.1329 9.50984 11.8811 9.24243 11.5454 9.24243C11.2264 9.24243 10.9578 9.49313 10.9578 9.8274V10.9806H9.79947C9.48051 10.9806 9.21191 11.2313 9.21191 11.5656C9.21191 11.8831 9.46373 12.1505 9.79947 12.1505H10.9578V13.3038C10.9578 13.6213 11.2096 13.8887 11.5454 13.8887C11.8643 13.8887 12.1329 13.638 12.1329 13.3038V12.1505H13.2913C13.6102 12.1505 13.8788 11.8998 13.8788 11.5656Z"
                        fill="white"
                    />
                    <Path
                        d="M10.4038 12.7189H9.81623C9.17831 12.7189 8.6579 12.2008 8.6579 11.5657C8.6579 10.9306 9.17831 10.4124 9.81623 10.4124H10.4038V9.82748C10.4038 9.19237 10.9242 8.67426 11.5621 8.67426C11.6629 8.67426 11.7804 8.69097 11.8643 8.7244C12.0322 8.35671 12.1329 7.95559 12.1329 7.52104C12.1329 5.93328 10.8403 4.62964 9.22867 4.62964C7.63386 4.62964 6.32444 5.91656 6.32444 7.52104C6.32444 8.60741 6.94558 9.54335 7.83531 10.0448C6.12299 10.5796 4.84714 12.0503 4.62891 13.8721H5.1661H5.21647H10.5381C10.4374 13.705 10.3702 13.5044 10.3702 13.2871V12.7022L10.4038 12.7189Z"
                        fill="white"
                    />
                    <Path
                        d="M12.7204 12.719V13.304C12.7204 13.5212 12.6532 13.7051 12.5525 13.8889H13.2408H13.2911H13.8283C13.778 13.4878 13.6605 13.1034 13.5262 12.7357H12.7204V12.719Z"
                        fill="white"
                    />
                </Svg>
            )
        } else {
            return (
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Rect opacity="0.8" width="20" height="20" rx="3" fill="#E96C6C"/>
                    <Path d="M13.968 13.1342L14.8271 12.2791C15.0576 12.0497 15.0576 11.6534 14.8271 11.424C14.5966 11.1946 14.1985 11.1946 13.968 11.424L13.1089 12.2791L12.2498 11.424C12.0193 11.1946 11.6211 11.1946 11.3906 11.424C11.1602 11.6534 11.1602 12.0497 11.3906 12.2791L12.2498 13.1342L11.3906 13.9894C11.1602 14.2188 11.1602 14.615 11.3906 14.8445C11.6211 15.0739 12.0193 15.0739 12.2498 14.8445L13.1089 13.9894L13.968 14.8445C14.1985 15.0739 14.5966 15.0739 14.8271 14.8445C15.0576 14.615 15.0576 14.2188 14.8271 13.9894L13.968 13.1342Z" fill="white"/>
                    <Path d="M11.3281 13.134L10.888 12.696C10.4061 12.2163 10.4061 11.4029 10.888 10.9232C11.1604 10.6521 11.5376 10.5269 11.9148 10.5686C12.6482 10.0055 13.1301 9.12956 13.1301 8.12845C13.1301 6.39738 11.7262 5 9.98702 5C8.24785 5 6.84394 6.39738 6.84394 8.12845C6.84394 9.31727 7.51446 10.3392 8.4993 10.8606C6.65536 11.4446 5.25145 13.0506 5 15.0111H5.58671H5.62862H10.6785C10.448 14.5522 10.5318 13.9682 10.909 13.572L11.349 13.134H11.3281Z" fill="white"/>
                </Svg>
            )
        }
    }
    //console.log('item.setificated == 1', item.name, item.setificated, item.setificated == 1)
    const veryf = () => {
        if(!chemical) {
            if(item.sertificated == 1) {
                return (
                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <Rect opacity="0.5" width="20" height="20" rx="3"
                              fill="#60A04E"/>
                        <Path
                            d="M9.88333 4.16675C9.76667 4.16675 9.65 4.22508 9.59167 4.28341L8.775 5.04175L7.84167 4.86675C7.55 4.80841 7.375 4.98341 7.31667 5.21675L7.14167 6.26675L6.15 6.73341C5.91667 6.85008 5.85833 7.08342 5.975 7.31675L6.44167 8.25008L5.975 9.18342C5.85833 9.41675 5.975 9.65008 6.15 9.76675L7.14167 10.2334L7.31667 11.2834C7.375 11.5167 7.60833 11.6917 7.84167 11.6334L8.95 11.4584L9.76667 12.2167C9.94167 12.3917 10.2333 12.3917 10.4083 12.2167L11.225 11.4584L12.3333 11.6334C12.5667 11.6917 12.8 11.5167 12.8583 11.2834L13.0333 10.2334L14.025 9.76675C14.2583 9.65008 14.3167 9.41675 14.2 9.18342L13.5583 8.25008L14.025 7.31675C14.1417 7.08342 14.0833 6.85008 13.85 6.73341L12.8583 6.26675L12.6833 5.21675C12.625 4.98341 12.3917 4.80841 12.1583 4.86675L11.05 5.04175L10.2333 4.28341C10.175 4.16675 10 4.16675 9.88333 4.16675ZM6.55833 10.6417L4.75 14.2584L6.85 13.9667L7.9 15.8334L9.41667 12.7417L9.3 12.6251L8.71667 12.1001L7.9 12.2167C7.375 12.2751 6.85 11.9251 6.73333 11.4001L6.55833 10.6417ZM13.4417 10.6417L13.2667 11.4001C13.15 11.8667 12.7417 12.2167 12.275 12.2167H12.1583L11.3417 12.1001L10.7583 12.6251L10.6417 12.7417L12.1583 15.8334L13.2083 14.0251L15.3083 14.3167L13.4417 10.6417Z"
                            fill="white"/>
                    </Svg>
                )
            } else {
                return (
                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <Rect opacity="0.8" width="20" height="20" rx="3" fill="#E96C6C"/>
                        <Path d="M9.88333 4.16675C9.76667 4.16675 9.65 4.22508 9.59167 4.28341L8.775 5.04175L7.84167 4.86675C7.55 4.80841 7.375 4.98341 7.31667 5.21675L7.14167 6.26675L6.15 6.73341C5.91667 6.85008 5.85833 7.08342 5.975 7.31675L6.44167 8.25008L5.975 9.18342C5.85833 9.41675 5.975 9.65008 6.15 9.76675L7.14167 10.2334L7.31667 11.2834C7.375 11.5167 7.60833 11.6917 7.84167 11.6334L8.95 11.4584L9.76667 12.2167C9.94167 12.3917 10.2333 12.3917 10.4083 12.2167L11.225 11.4584L12.3333 11.6334C12.5667 11.6917 12.8 11.5167 12.8583 11.2834L13.0333 10.2334L14.025 9.76675C14.2583 9.65008 14.3167 9.41675 14.2 9.18342L13.5583 8.25008L14.025 7.31675C14.1417 7.08342 14.0833 6.85008 13.85 6.73341L12.8583 6.26675L12.6833 5.21675C12.625 4.98341 12.3917 4.80841 12.1583 4.86675L11.05 5.04175L10.2333 4.28341C10.175 4.16675 10 4.16675 9.88333 4.16675ZM6.55833 10.6417L4.75 14.2584L6.85 13.9667L7.9 15.8334L9.41667 12.7417L9.3 12.6251L8.71667 12.1001L7.9 12.2167C7.375 12.2751 6.85 11.9251 6.73333 11.4001L6.55833 10.6417ZM13.4417 10.6417L13.2667 11.4001C13.15 11.8667 12.7417 12.2167 12.275 12.2167H12.1583L11.3417 12.1001L10.7583 12.6251L10.6417 12.7417L12.1583 15.8334L13.2083 14.0251L15.3083 14.3167L13.4417 10.6417Z" fill="white"/>
                    </Svg>
                )
            }
        }

        return <></>
    }
    //console.log('item', item)
    return (
        <TouchableOpacity style={styles.btnWrap} activeOpacity={1} onPress={() => {
            if(!chemical)
                LinkTo("SortDetailPageScreen", {
                    ...params,
                    sortId: item.id
                }, navigation)
            else
                LinkTo("ChemicalDetailPageScreen", {
                    ...params,
                    chemicalId: item.id
                }, navigation)
        }}>
            <View style={styles.item}>
                <View style={styles.imgWrap}>
                    <View style={styles.iconWrapper}>
                        {
                            item.sellers > 0
                                ?
                                <AppIconSvgHint
                                    Icon={seller}
                                    text={"У товара есть продавец"}
                                />
                                :
                                <AppIconSvgHint
                                    Icon={seller}
                                    text={"У товара нет продавецов"}
                                />
                        }
                        {
                            item.sertificated == 1
                                ?
                                <AppIconSvgHint
                                    Icon={veryf}
                                    text={"Товар сертифицирован"}
                                />
                                :
                                <AppIconSvgHint
                                    Icon={veryf}
                                    text={"Товар не сертифицирован"}
                                />
                        }
                    </View>
                    <AppFastImage
                        uri={item.photo}
                        resizeMode={'cover'}
                        style={{...styles.photo}}
                    />
                </View>
                <View style={styles.nameWrap}>
                    <View style={{...styles.rightWrap, borderColor}}>
                        <AppTextBoldTicker style={{...styles.name, color: color}}>
                            {item.name}
                        </AppTextBoldTicker>
                        <View style={{...styles.vote, borderColor: color}}>
                            <AppVote
                                style={styles.voteBlock}
                                starWidth={8}
                                starHeight={8}
                                fill={color}
                                initiate={Math.floor(item.rating)}
                            />
                        </View>
                        <AppTextItalic style={styles.comText}>
                            Отзывов {item.comments ? item.comments : 0}
                        </AppTextItalic>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    vote: {
        width: 70,
        minWidth: 50,
        height: 20,
        marginLeft: "auto",
        marginRight: "auto",
        padding: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 3
    },
    voteBlock: {
        width: "100%"
    },
    iconWrapper: {
        flexDirection: "row",
        width: 45,
        height: 20,
        position: "absolute",
        justifyContent: "space-between",
        alignItems: "flex-start",
        left: 0,
        top: 0,
        zIndex: 9
    },
    comText: {
        color: THEME.GREY_SMOKE,
        fontSize: 12
    },
    ...PRODUCT_STYLE
})
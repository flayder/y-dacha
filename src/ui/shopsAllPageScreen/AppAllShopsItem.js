import React from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {AppText} from "../AppText";
import {AppTextBold} from "../AppTextBold";
import {AppTextItalic} from "../AppTextItalic";
import AppVote from "../AppVote";
import {Svg,Path, Rect} from "react-native-svg";
import AppButton from "../AppButton";
import {THEME} from "../../../theme";
import {
    getRandomKey,
    GLOBAL_NOT_ADDING_TARRIF,
    GLOBAL_NOT_ADDING_TARRIF_TITLE,
    LinkTo,
    SHADOW,
    shopsStyles
} from "../../../global";
import {useDispatch, useSelector} from "react-redux";
import {setShopsOpened} from "../../store/actions/shops";
import AppPayable from "../AppPayable";
import AppFastImage from "../AppFastImage";
import {globalAlert} from "../../globalHeaders";

export default ({data, navigation, screeWidth, route, openedIs = false}) => {
    //const [opened, setOpened] = useState(openedIs)
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.others.userInfo)
    const opened = openedIs
    //console.log('shopItemdata', route)
    const parseDelivery = (deliveries) => {
        const arr = []

        for(let id in deliveries) {
            if(deliveries[id])
                arr.push(
                    <AppText key={getRandomKey()} style={styles.viewerCat}>
                        {deliveries[id]}
                    </AppText>
                )
        }

        return arr
    }
    return (
        <View style={{...styles.wrap, backgroundColor: "#fff", ...SHADOW}}>
            <View style={styles.headerWrap}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <AppFastImage
                            style={styles.img}
                            uri={data.emblem}
                        />
                        <View style={styles.price}>
                            <AppTextBold style={styles.priceTxt1}>
                                От {data.price}
                            </AppTextBold>
                        </View>
                    </View>
                    <View style={{...styles.headerRight, width: screeWidth - 160}}>
                        <AppTextBold style={{...styles.name, color: THEME.FOOTER_BG}}>
                            Магазин{"\n"}
                            {data.name}
                        </AppTextBold>
                        <View style={styles.nameIcon}>
                            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M11.25 3.17587V3.17131L14.6183 4.69778L18 3.41491L9 0L0 3.41491L9 6.82982L12.3683 5.55151L9 4.14684V4.14343L11.25 3.17587Z" fill="#F39314"/>
                                <Path d="M0 4.55322V14.798L8.4375 18V7.75527L0 4.55322ZM4.5 14.8355L2.25 13.9818V12.7672L4.5 13.621V14.8355Z" fill="#F39314"/>
                                <Path d="M14.625 5.83381V8.68527L12.375 9.53899V6.68754L9.5625 7.75527V18L18 14.798V4.55322L14.625 5.83381Z" fill="#F39314"/>
                            </Svg>
                        </View>
                        <AppText style={styles.description}>
                            {data.description}
                        </AppText>
                    </View>
                </View>
                <View style={styles.ratingBlock}>
                    <View style={styles.rating}>
                        <AppTextItalic style={styles.textRatingItalic}>
                            Рейтинг
                        </AppTextItalic>
                        <AppVote
                            starWidth={14}
                            starHeight={14}
                            style={styles.vote}
                        />
                    </View>
                    <AppTextItalic style={styles.votesText}>
                        Отзывы {data.count}
                    </AppTextItalic>
                </View>
                <View style={styles.bottomPanel}>
                    <TouchableOpacity
                        style={{...styles.ratingBlockBtn, width: screeWidth - 185}}
                        activeOpacity={1}
                        onPress={() => {
                            //console.log('okokkoas')
                            dispatch(setShopsOpened(data.productId))
                            //setOpened(!opened)
                        }}
                    >
                        <View style={styles.ratingWrapText}>
                            <AppTextItalic style={styles.btnText}>
                                {
                                    opened
                                        ?
                                        "Свернуть описание"
                                        :
                                        "Развернуть описание"
                                }
                            </AppTextItalic>
                            {
                                !opened
                                    ?
                                    <Svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M9 1.85966e-05L10 1.00002L5.00002 6L0 0.999992L0.999997 -4.29153e-06L5.00001 4.00001L9 1.85966e-05Z" fill="black"/>
                                    </Svg>
                                    :
                                    <Svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M9 6.16662L10 5.1718L5.00002 0.197693L0 5.17182L0.999997 6.16664L5.00001 2.18733L9 6.16662Z" fill="black"/>
                                    </Svg>
                            }
                        </View>
                    </TouchableOpacity>
                    <AppButton
                        color={THEME.FOOTER_BG}
                        style={styles.btn}
                        onPress={() => {
                            LinkTo("ShopDetailPageScreen", {
                                masterId: data.id,
                                productId: data.productId,
                                cultureId: data.culture_id
                            }, navigation)
                        }}
                    >
                        <AppTextBold>
                            В магазин
                        </AppTextBold>
                    </AppButton>
                </View>
            </View>
            {
                opened
                    ?
                    <View style={styles.viewer}>
                        <View style={{height: 30}}></View>
                        <View style={styles.sellerInfo}>
                            <View style={styles.sellerBlock}>
                                <AppText style={styles.sellerText}>
                                    Продавец:
                                </AppText>
                                <AppText style={styles.sellerText}>
                                    {data.first_name} {data.last_name}
                                </AppText>
                            </View>
                            <View style={styles.sellerBlock}>
                                <AppText style={styles.sellerText}>
                                    Телефон:
                                </AppText>
                                <AppText style={styles.sellerText}>
                                    {data.phone}
                                </AppText>
                            </View>
                        </View>
                        {
                            data.delivery_method
                                ?
                                <View style={styles.viewerHeader}>
                                    <AppTextBold style={styles.viewerName}>
                                        Доставка
                                    </AppTextBold>
                                    {
                                        parseDelivery(data.delivery_method)
                                    }
                                </View>
                                :
                                <></>
                        }
                        <View style={styles.viewerHeader}>
                            {
                                userInfo.hasOwnProperty('is_addition') && userInfo.is_addition
                                    ?
                                    <TouchableOpacity
                                        style={styles.viewerLink}
                                        activeOpacity={1}
                                        onPress={() => {
                                            LinkTo("GoogleMapShopPageScreen", {
                                                masterId: data.id,
                                                previousRoute: "ShopsPageScreen",
                                                cultureId: data.culture_id
                                            }, navigation)
                                        }}
                                    >
                                        <View style={styles.viewerMap}>
                                            <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M2.25 0.193966C1.51293 0.0775862 0.775862 0 0 0V1.125C0.775862 1.125 1.51293 1.20259 2.25 1.31897V0.155172V0.193966Z" fill="#5382D8"/>
                                                <Path d="M5.70232 1.319C4.96525 0.969861 4.18939 0.620723 3.37473 0.426758L3.33594 1.59055C3.99542 1.78452 4.61611 2.05607 5.2368 2.36641L5.70232 1.319Z" fill="#5382D8"/>
                                                <Path d="M8.41868 5.043C8.76781 5.50852 9.11695 6.01283 9.3885 6.55593L10.5911 6.2068C10.242 5.54731 9.85402 4.92662 9.3885 4.34473L8.37988 5.0818L8.41868 5.043Z" fill="#5382D8"/>
                                                <Path d="M11.2497 12.3749L13.4997 10.1249H11.8704C11.754 9.15509 11.4825 8.22405 11.1334 7.37061L9.93077 7.68095C10.2411 8.45681 10.5127 9.27147 10.7066 10.1249H8.96094L11.2109 12.3749H11.2497Z" fill="#5382D8"/>
                                                <Path d="M8.61221 3.41381C8.03031 2.83191 7.40962 2.3276 6.71134 1.90088L6.20703 2.94829C6.75014 3.29743 7.21565 3.72416 7.68117 4.18967L8.61221 3.37502V3.41381Z" fill="#5382D8"/>
                                                <Path d="M11.2503 4.61638V2.25L9.46582 2.67672C9.46582 2.67672 10.3581 3.41379 11.2503 4.61638Z" fill="#5382D8"/>
                                                <Path d="M6.75 4.65527V9.0001H9C9 9.0001 8.49569 6.55614 6.75 4.65527Z" fill="#5382D8"/>
                                                <Path d="M5.62527 3.68534C5.35372 3.49138 5.08217 3.29741 4.77182 3.14224L1.16406 2.25C0.543373 2.25 0.0390625 2.59914 0.0390625 3.21983V15.75C0.0390625 16.3707 0.543373 16.681 1.16406 16.875L5.66406 18V3.68534H5.62527Z" fill="#5382D8"/>
                                                <Path d="M6.75 9.54321V18.0001L11.25 16.8751V14.0432L6.75 9.54321Z" fill="#5382D8"/>
                                                <Path d="M16.875 3.375L12.375 2.25V6.59483C12.6853 7.3319 12.8793 8.14655 12.8793 9H16.3319L12.4138 12.9181V16.8362L16.9138 17.9612C17.5345 17.9612 18.0388 17.7284 18.0388 16.8362V4.46121C18.0388 3.84052 17.4957 3.49138 16.9138 3.33621L16.875 3.375Z" fill="#5382D8"/>
                                            </Svg>
                                        </View>
                                        <AppTextBold style={styles.viewerBtnText}>
                                            Открыть карту
                                        </AppTextBold>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        style={styles.viewerLink}
                                        activeOpacity={1}
                                        onPress={() => {
                                            globalAlert({
                                                title: GLOBAL_NOT_ADDING_TARRIF_TITLE,
                                                text: GLOBAL_NOT_ADDING_TARRIF
                                            })
                                        }}
                                    >
                                        <View style={styles.viewerMap}>
                                            <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <Path d="M2.25 0.193966C1.51293 0.0775862 0.775862 0 0 0V1.125C0.775862 1.125 1.51293 1.20259 2.25 1.31897V0.155172V0.193966Z" fill="#BDBDBD"/>
                                                <Path d="M5.70183 1.319C4.96476 0.969861 4.1889 0.620723 3.37424 0.426758L3.33545 1.59055C3.99493 1.78452 4.61562 2.05607 5.23631 2.36641L5.70183 1.319Z" fill="#BDBDBD"/>
                                                <Path d="M8.41916 5.043C8.7683 5.50852 9.11744 6.01283 9.38899 6.55593L10.5916 6.2068C10.2424 5.54731 9.85451 4.92662 9.38899 4.34473L8.38037 5.0818L8.41916 5.043Z" fill="#BDBDBD"/>
                                                <Path d="M11.2492 12.3749L13.4992 10.1249H11.8699C11.7536 9.15509 11.482 8.22405 11.1329 7.37061L9.93028 7.68095C10.2406 8.45681 10.5122 9.27147 10.7061 10.1249H8.96045L11.2105 12.3749H11.2492Z" fill="#BDBDBD"/>
                                                <Path d="M8.61221 3.41381C8.03031 2.83191 7.40962 2.3276 6.71134 1.90088L6.20703 2.94829C6.75014 3.29743 7.21565 3.72416 7.68117 4.18967L8.61221 3.37502V3.41381Z" fill="#BDBDBD"/>
                                                <Path d="M11.2503 4.61638V2.25L9.46582 2.67672C9.46582 2.67672 10.3581 3.41379 11.2503 4.61638Z" fill="#BDBDBD"/>
                                                <Path d="M6.75 4.65527V9.0001H9C9 9.0001 8.49569 6.55614 6.75 4.65527Z" fill="#BDBDBD"/>
                                                <Path d="M5.62576 3.68534C5.35421 3.49138 5.08265 3.29741 4.77231 3.14224L1.16455 2.25C0.543861 2.25 0.0395508 2.59914 0.0395508 3.21983V15.75C0.0395508 16.3707 0.543861 16.681 1.16455 16.875L5.66455 18V3.68534H5.62576Z" fill="#BDBDBD"/>
                                                <Path d="M6.75 9.54321V18.0001L11.25 16.8751V14.0432L6.75 9.54321Z" fill="#BDBDBD"/>
                                                <Path d="M16.875 3.375L12.375 2.25V6.59483C12.6853 7.3319 12.8793 8.14655 12.8793 9H16.3319L12.4138 12.9181V16.8362L16.9138 17.9612C17.5345 17.9612 18.0388 17.7284 18.0388 16.8362V4.46121C18.0388 3.84052 17.4957 3.49138 16.9138 3.33621L16.875 3.375Z" fill="#BDBDBD"/>
                                            </Svg>
                                        </View>
                                        <AppTextBold style={{...styles.viewerBtnText, color: THEME.GREY}}>
                                            Открыть карту
                                        </AppTextBold>
                                    </TouchableOpacity>
                            }

                        </View>
                        <AppPayable style={{paddingLeft: 0, paddingRight: 0}} />
                    </View>
                    :
                    <></>
            }

        </View>
    )
}

const styles = StyleSheet.create(shopsStyles)
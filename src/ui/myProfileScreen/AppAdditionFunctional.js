import React, {useState} from "react"
import {View, StyleSheet, Platform, ActivityIndicator} from "react-native"
import {AppTextBold} from "../AppTextBold";
import {AppText} from "../AppText";
import AppButton from "../AppButton";
import {THEME} from "../../../theme";
import {Svg, Path} from "react-native-svg";
import * as WebBrowser from 'expo-web-browser'
import {AppFetch} from "../../AppFetch";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import moment from "moment";
import {getGlobalUserInfo} from "../../store/actions/other";
import {AppBlueButton} from "../AppBlueButton";

export default (
    {
        title,
        description,
        price,
        data,
        activeIs,
        passive = false,
        Icon,
        outside = false,
        onActivate,
        onDeactivate
    }) => {
    //data.active = false
    const navigation = useNavigation()
    const [active, setActive] = useState(!!data.active)
    const [select, setSelect] = useState(1)
    const [clicked, setClicked] = useState(false)
    const dispatch = useDispatch()

    if(data !== null && typeof data == "object" && data.hasOwnProperty('active'))
        if(data.active != active) setActive(data.active)
    const passiveStyle = passive ? {color: "#fff"} : {}

    const toPay = async () => {
        try {
            if(!passive) {
                //setActive(!active)
                if(onActivate) {
                    const response = await onActivate()
                    if(Platform.OS == "android") {
                        if (typeof response == "object" && response.hasOwnProperty('result') && response.result) {
                            if (response.hasOwnProperty('data') && typeof response.data == "object" && response.data.hasOwnProperty('formUrl')) {
                                if (response.data.hasOwnProperty('orderId') && response.data.orderId) {
                                    let count = 0
                                    const timeout = setInterval(async () => {
                                        count++
                                        const checkOrder = await AppFetch.getWithToken("checkOrder", {
                                            orderId: response.data.orderId
                                        }, {}, navigation)

                                        if (typeof checkOrder == "object" && checkOrder.hasOwnProperty('data') && typeof checkOrder.data == "object") {
                                            if (checkOrder.data.hasOwnProperty('orderStatusSber') && checkOrder.data.orderStatusSber === "2") {
                                                clearInterval(timeout)
                                                if (Platform.OS == "ios")
                                                    WebBrowser.dismissBrowser()
                                                setActive(true)
                                                dispatch(getGlobalUserInfo({navigation, forced: true}))
                                            }
                                        }
                                        //console.log('checkOrder', checkOrder)
                                    }, 5000)

                                    if (count >= 100) clearInterval(timeout)
                                }
                                await WebBrowser.openBrowserAsync(response.data.formUrl)
                                //console.log('br', browser)

                            }
                        }
                    }
                    return Promise.resolve(1)
                }
            }
        } catch (e) {console.log("Payment error", e)}
    }

    try {
        return (
            <View style={styles.wrap}>
                <View style={{...styles.line, top: 0}}></View>
                <AppTextBold style={styles.title}>
                    {title}
                </AppTextBold>
                <AppText style={styles.text}>
                    {description}
                </AppText>
                {
                    !active
                        ?
                        <AppButton
                            color={!passive ? THEME.FOOTER_BG : THEME.ALL_COLOR}
                            style={styles.btn}
                            onPress={async () => {
                                if(!clicked) {
                                    console.log('clicked')
                                    await toPay()
                                }
                                //setClicked(false)
                            }}
                        >
                            <View style={styles.btnWrap}>
                                {
                                    Icon
                                        ?
                                        Icon()
                                        :
                                        <></>
                                }
                                <AppText style={{...styles.btnWrapText, ...passiveStyle}}>
                                    {
                                        clicked
                                            ?
                                            <ActivityIndicator size="small" style={{marginRight: 20}} color={"#fff"} />
                                            :
                                            <></>
                                    }
                                    Активировать {price}.
                                </AppText>
                            </View>
                        </AppButton>
                        :
                        <View style={styles.selecter}>
                            <View style={styles.selecterBlock}>
                                <View style={styles.selecterBlockBtns}>
                                    {
                                        select == 1
                                            ?
                                            <AppButton
                                                color={THEME.GREEN}
                                                style={{...styles.btn, width: 200}}
                                                onPress={() => {
                                                    setSelect(2)
                                                }}
                                            >
                                                <View style={styles.btnWrap}>
                                                    {
                                                        Icon
                                                            ?
                                                            Icon()
                                                            :
                                                            <></>
                                                    }
                                                    <AppText style={styles.btnWrapText}>
                                                        Активировано
                                                    </AppText>
                                                </View>
                                            </AppButton>
                                            :
                                            <>
                                                <AppButton
                                                    color={THEME.GREEN}
                                                    style={{...styles.btn, width: 200}}
                                                    onPress={() => {
                                                        setSelect(2)
                                                    }}
                                                >
                                                    <View style={styles.btnWrap}>
                                                        {
                                                            Icon
                                                                ?
                                                                Icon()
                                                                :
                                                                <></>
                                                        }
                                                        <AppText style={styles.btnWrapText}>
                                                            Активировано
                                                        </AppText>
                                                    </View>
                                                </AppButton>
                                                <View style={{height: 10}}></View>
                                                <AppButton
                                                    color={THEME.FOOTER_BG}
                                                    style={{...styles.btn, width: 200}}
                                                    onPress={async () => {
                                                        //setActive(!active)
                                                        if(onDeactivate && Platform.OS == "android") {
                                                            const response = await onDeactivate()
                                                            //console.log('response11', response)
                                                            if(typeof response == "object" && response.hasOwnProperty('result') && response.result) {
                                                                setSelect(1)
                                                                setActive(false)
                                                                dispatch(getGlobalUserInfo({navigation, forced: true}))
                                                            }
                                                        } else
                                                            await WebBrowser.openBrowserAsync('https://apps.apple.com/account/subscriptions')
                                                    }}
                                                >
                                                    <View style={styles.btnWrap}>
                                                        {
                                                            Icon
                                                                ?
                                                                Icon()
                                                                :
                                                                <></>
                                                        }
                                                        <AppText style={styles.btnWrapText}>
                                                            Деактивировать
                                                        </AppText>
                                                    </View>
                                                </AppButton>
                                            </>
                                    }
                                </View>
                                <View style={styles.icon}>
                                    <Svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M9 1.85966e-05L10 1.00002L5.00002 6L0 0.999992L0.999997 -4.29153e-06L5.00001 4.00001L9 1.85966e-05Z" fill="black"/>
                                    </Svg>
                                </View>
                            </View>
                            {
                                data.hasOwnProperty('till')
                                    ?
                                    <AppText style={styles.btnWrapTextLittle}>
                                        Срок действия активации до {moment(data.till).format("DD.MM.YYYY")}г.
                                    </AppText>
                                    :
                                    <></>
                            }
                        </View>
                }
                <View style={{...styles.line, bottom: 0}}></View>
            </View>
        )
    } catch (e) {return <></>}
}

const styles = StyleSheet.create({
    icon: {
        width: 20,
        paddingTop: 15,
        alignItems: "flex-end"
    },
    selecterBlock: {
        width: 220,
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: "row"
    },
    wrap: {
        position: "relative",
        padding: 20,
        paddingTop: 30,
        paddingBottom: 30,
        marginTop: 20,
        marginBottom: 20
    },
    line: {
        position: "absolute",
        left: "50%",
        backgroundColor: THEME.FOOTER_BG,
        height: 1,
        marginLeft: -130,
        width: 300,
    },
    title: {
        textAlign: "center",
        marginTop: 0,
        color: THEME.BLUE_1
    },
    text: {
        textAlign: "center",
        fontSize: 14,
        marginTop: 0
    },
    btn: {
        width: 270,
        height: 40,
        paddingTop: 12,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto"
    },
    btnWrap: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    btnWrapTextLittle: {
        marginTop: 0,
        fontSize: 11,
        textAlign: "center",
        marginBottom: 5
    },
    btnWrapText: {
        color: "#fff",
        paddingLeft: 15,
        marginTop: 0,
        marginBottom: 0
    }
})
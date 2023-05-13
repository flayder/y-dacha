import React from "react"
import {View, StyleSheet, Image} from "react-native"
import {useRoute, useNavigation} from "@react-navigation/native";
import {Svg, Mask, Path, Rect, G} from "react-native-svg";
import {AppText} from "../AppText";
import AppButton from "../AppButton";
import {THEME} from "../../../theme";
import {GLOBAL_NOT_ADDING_TARRIF, GLOBAL_NOT_ADDING_TARRIF_TITLE, LinkTo} from "../../../global";
import {useSelector} from "react-redux";
import {globalAlert} from "../../globalHeaders";

export default ({style, routeName, navigation}) => {
    const userInfo = useSelector(state => state.others.userInfo)
    const route = useRoute()
    let params = {}
    if(route.params !== undefined) params = route.params
    return (
        <View style={{...styles.wrap, ...style}}>
            <View style={styles.descr}>
                {/*<Svg width="26" height="24" viewBox="0 0 18 16" fill="none">*/}
                {/*    <Mask id="mask0" maskType="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="16">*/}
                {/*        <Path d="M4.5 2.27778H4.70529L4.85135 2.13352L6.50529 0.5H11.4947L13.1486 2.13352L13.2947 2.27778H13.5H16.2C16.5468 2.27778 16.8781 2.41389 17.1214 2.65422C17.3646 2.89434 17.5 3.21869 17.5 3.55556V14.2222C17.5 14.5591 17.3646 14.8834 17.1214 15.1236C16.8781 15.3639 16.5468 15.5 16.2 15.5H1.8C1.45323 15.5 1.12189 15.3639 0.878558 15.1236C0.635435 14.8834 0.5 14.5591 0.5 14.2222V3.55556C0.5 3.21869 0.635435 2.89434 0.878558 2.65422C1.12189 2.41389 1.45323 2.27778 1.8 2.27778H4.5ZM9 3.94444C7.67591 3.94444 6.40481 4.46389 5.46667 5.39045C4.52831 6.31722 4 7.57552 4 8.88889C4 10.2023 4.52831 11.4606 5.46667 12.3873C6.40481 13.3139 7.67591 13.8333 9 13.8333C10.3241 13.8333 11.5952 13.3139 12.5333 12.3873C13.4717 11.4606 14 10.2023 14 8.88889C14 7.57552 13.4717 6.31722 12.5333 5.39045C11.5952 4.46389 10.3241 3.94444 9 3.94444ZM9 6.72222C9.58547 6.72222 10.1457 6.95198 10.5578 7.35901C10.9697 7.76583 11.2 8.31627 11.2 8.88889C11.2 9.46151 10.9697 10.0119 10.5578 10.4188C10.1457 10.8258 9.58547 11.0556 9 11.0556C8.41453 11.0556 7.85428 10.8258 7.44216 10.4188C7.03026 10.0119 6.8 9.46151 6.8 8.88889C6.8 8.31627 7.03026 7.76583 7.44216 7.35901C7.85428 6.95198 8.41453 6.72222 9 6.72222Z" fill="white" stroke="black"/>*/}
                {/*    </Mask>*/}
                {/*    <G mask="url(#mask0)">*/}
                {/*        <Rect x="-4.90039" y="-5.72217" width="20.8" height="20.4444" fill="#53588A" stroke="black"/>*/}
                {/*    </G>*/}
                {/*</Svg>*/}
                <Image
                    style={{width: 20, height: 18}}
                    source={require("@images/pestsPageScreen/Default.png")}
                />
                <AppText style={styles.text}>
                    Отправьте фотографию вашего растения
                    и мы поможем разобраться с проблемой
                </AppText>
            </View>
            {
                (userInfo && userInfo.hasOwnProperty('is_addition') && userInfo.is_addition)
                    ?
                    <AppButton style={styles.btn} color={THEME.FOOTER_BG} onPress={() => {
                        //console.log('routeName', routeName)
                        LinkTo(routeName, params, navigation)
                    }}>
                        Отправить фото
                    </AppButton>
                    :
                    <AppButton
                        style={styles.btn}
                        color={THEME.GREY}
                        onPress={() => {
                            globalAlert({
                                title: GLOBAL_NOT_ADDING_TARRIF_TITLE,
                                text: GLOBAL_NOT_ADDING_TARRIF
                            })
                        }}
                    >
                        Отправить фото
                    </AppButton>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        width: 300,
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: 20
    },
    descr: {
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        paddingLeft: 10,
        color: THEME.FOOTER_BG,
        fontSize: 14
    },
    btn: {
        width: 200,
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
        justifyContent: "center"
        // paddingTop: 10,
        // paddingBottom: 10
    }
})
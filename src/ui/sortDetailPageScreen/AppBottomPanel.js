import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {Svg, Path, Mask} from "react-native-svg";
import {AppText} from "../AppText";
import {THEME} from "../../../theme";
import {FAVORITE_SORT, LinkTo, SORTS} from "../../../global";
import AppFavoriteButton from "../AppFavoriteButton";
import AppAddPlantButton from "../AppAddPlantButton";

export default ({data, navigation}) => {
    const Item = ({children, active = false, onPress}) => {
        const back = (active) ? THEME.SLIDER_BG : "transparent"
        //const fill = (active) ? "" : "#60A04E"
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{...styles.block, backgroundColor: back}}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.wrap}>
            <AppFavoriteButton
                id={data.id}
                type={FAVORITE_SORT}
                isActive={data.favorite}
                style={styles.block}
                hintText={"Сорт был успешно добавлен в избранное"}
                activeForm={() => {
                    return <>
                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <Path d="M16.4634 1.6875C14.4146 -0.5625 11.078 -0.5625 9 1.6875C6.95122 -0.5625 3.61463 -0.5625 1.53659 1.6875C-0.512195 3.9375 -0.512195 7.59375 1.53659 9.84375L9 18L16.4634 9.84375C18.5122 7.59375 18.5122 3.9375 16.4634 1.6875ZM15.5268 5.84375L14.5317 5.3125C14.6195 5.15625 14.6488 4.96875 14.6488 4.78125C14.6488 4.125 14.1512 3.59375 13.5366 3.59375C13.3024 3.59375 13.0976 3.6875 12.922 3.8125L12.278 2.78125C12.6293 2.53125 13.0683 2.375 13.5366 2.375C14.7659 2.375 15.7902 3.4375 15.7902 4.78125C15.7902 5.15625 15.7024 5.53125 15.5561 5.84375H15.5268Z" fill="#60A04E"/>
                        </Svg>
                        <View style={styles.blockText}>
                            <AppText style={styles.text}>
                                В избранном
                            </AppText>
                        </View>
                    </>
                }}
                passiveForm={() => {
                    return <>
                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M8.74567 1.91909L8.9982 2.19643L9.25269 1.92088C11.1955 -0.182713 14.2977 -0.180008 16.2091 1.91909C18.1382 4.03771 18.1383 7.49304 16.2094 9.61181C16.2093 9.61192 16.2092 9.61204 16.2091 9.61216L9 17.4905L1.79092 9.61216C-0.138067 7.49372 -0.138339 4.0388 1.7901 1.91998C3.73299 -0.182713 6.83456 -0.17971 8.74567 1.91909ZM15.3648 6.14719L15.4408 6.18773H15.5268H15.5561H15.7748L15.8676 5.98963C16.0351 5.63204 16.1342 5.2073 16.1342 4.78125C16.1342 3.26611 14.9739 2.03102 13.5366 2.03102C12.9917 2.03102 12.4838 2.21258 12.0786 2.50102L11.8148 2.68878L11.9863 2.96343L12.6302 3.99468L12.8237 4.30464L13.1214 4.09273C13.2622 3.99252 13.3981 3.93773 13.5366 3.93773C13.9404 3.93773 14.3048 4.2934 14.3048 4.78125C14.3048 4.9386 14.2793 5.05957 14.2318 5.14399L14.0596 5.45041L14.3697 5.61594L15.3648 6.14719Z" stroke="#60A04E" stroke-width="0.687951"/>
                        </Svg>
                        <View style={styles.blockText}>
                            <AppText style={styles.text}>
                                В избранное
                            </AppText>
                        </View>
                    </>
                }}
            />
            <AppAddPlantButton
                style={styles.block}
                hintText={"Растение было успешно добавлено"}
                hintStyle={{
                    marginLeft: 20
                }}
                id={data.id}
                isActive={data.is_addiction}
            />
            <Item
                onPress={() => {
                    LinkTo("QrDetailPageScreen", {
                        type: "sort",
                        sortId: data.id
                    }, navigation)
                }}
            >
                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M4.52452 3.7261H16.8561C17.3024 3.7261 17.6548 4.10883 17.6548 4.52476V16.8564C17.6548 17.3026 17.2721 17.655 16.8561 17.655H4.52452C4.07828 17.655 3.72586 17.2723 3.72586 16.8564V4.52476C3.72586 4.07852 4.10858 3.7261 4.52452 3.7261Z" stroke="#60A04E" stroke-width="0.69"/>
                    <Path d="M2.28732 1.94232H1.94232V2.28732V14.2739H1.14366C0.697417 14.2739 0.345 13.8912 0.345 13.4753V1.14366C0.345 0.697417 0.727725 0.345 1.14366 0.345H13.4753C13.9215 0.345 14.2739 0.727725 14.2739 1.14366V1.94232H2.28732Z" stroke="#60A04E" stroke-width="0.69"/>
                </Svg>
                <View style={styles.blockText}>
                    <AppText style={styles.text}>
                        Скопировать QR код
                    </AppText>
                </View>
            </Item>
            <Item
                onPress={() => {
                    LinkTo("CommentPageScreen", {
                        type: "sort",
                        sortId: data.id
                    }, navigation)
                }}
            >
                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M4.50732 13.1474H4.36442L4.26337 13.2484L0.345 17.1667V1.11217C0.345 0.688095 0.688092 0.345 1.1122 0.345H16.7156L16.7449 0.374268H16.8878C17.3119 0.374268 17.655 0.717362 17.655 1.14144V12.3802C17.655 12.8043 17.3119 13.1474 16.8878 13.1474H4.50732ZM13.4927 9.35942H13.8377V9.01442V7.90225V7.55725H13.4927H4.47805H4.13305V7.90225V9.01442V9.35942H4.47805H13.4927ZM13.4927 5.99365H13.8377V5.64865V4.53648V4.19148H13.4927H4.47805H4.13305V4.53648V5.64865V5.99365H4.47805H13.4927Z" stroke="#60A04E" stroke-width="0.69"/>
                </Svg>
                <View style={styles.blockText}>
                    <AppText style={styles.text}>
                        Комментарии
                    </AppText>
                </View>
            </Item>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        width: "100%"
    },
    block: {
        width: "25%",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    vote: {
        width: "100%"
    },
    italic: {
        marginBottom: -3,
        marginTop: 10,
        fontSize: 12
    },
    blockText: {
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 0,
        textAlign: "center",
        alignItems: "center",
        lineHeight: 14,
        fontSize: 12
    }
})
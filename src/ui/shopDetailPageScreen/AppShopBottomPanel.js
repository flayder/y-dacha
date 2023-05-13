import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {Svg, Path, Mask} from "react-native-svg";
import {AppText} from "../AppText";
import {THEME} from "../../../theme";
import {FAVORITE_SELLER, FAVORITE_SORT, LinkTo} from "../../../global";
import {useNavigation, useRoute} from "@react-navigation/native";
import AppFavoriteButton from "../AppFavoriteButton";

export default ({data}) => {
    const navigation = useNavigation()
    const route = useRoute()
    const Item = ({children, active = false}) => {
        const back = (active) ? THEME.SLIDER_BG : "transparent"
        //const fill = (active) ? "" : "#60A04E"
        return (
            <View style={{...styles.block, backgroundColor: back}}>
                {children}
            </View>
        )
    }
    return (
        <View style={styles.wrap}>
            <Item>
                <AppFavoriteButton
                    id={data.id}
                    type={FAVORITE_SELLER}
                    isActive={data.favorite}
                    style={styles.link}
                    hintText={"Магазин был успешно добавлен в избранное"}
                    activeForm={() => {
                        return <>
                            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M8.74567 1.91909L8.9982 2.19643L9.25269 1.92088C11.1955 -0.182713 14.2977 -0.180008 16.2091 1.91909C18.1382 4.03765 18.1383 7.49283 16.2096 9.61162C16.2094 9.6118 16.2092 9.61198 16.2091 9.61216L9 17.4905L1.79092 9.61216C1.79082 9.61205 1.79071 9.61194 1.79061 9.61182C-0.138067 7.49335 -0.138237 4.03869 1.7901 1.91998C3.73299 -0.182713 6.83457 -0.17971 8.74567 1.91909ZM15.3648 6.14719L15.4408 6.18773H15.5268H15.5561H15.7748L15.8676 5.98963C16.0351 5.63204 16.1342 5.2073 16.1342 4.78125C16.1342 3.26611 14.9739 2.03102 13.5366 2.03102C12.9917 2.03102 12.4838 2.21258 12.0786 2.50102L11.8148 2.68878L11.9863 2.96343L12.6302 3.99468L12.8237 4.30464L13.1214 4.09273C13.2622 3.99252 13.3981 3.93773 13.5366 3.93773C13.9404 3.93773 14.3048 4.2934 14.3048 4.78125C14.3048 4.9386 14.2793 5.05957 14.2318 5.14399L14.0596 5.45041L14.3697 5.61594L15.3648 6.14719Z" fill="#F39314" stroke="#F39314" stroke-width="0.687951"/>
                            </Svg>
                            <View style={styles.blockText}>
                                <AppText style={styles.text}>
                                    Добавлено
                                </AppText>
                            </View>
                        </>
                    }}
                    passiveForm={() => {
                        return <>
                            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M8.74567 1.91909L8.9982 2.19643L9.25269 1.92088C11.1955 -0.182713 14.2977 -0.180008 16.2091 1.91909C18.1382 4.03765 18.1383 7.49283 16.2096 9.61162C16.2094 9.6118 16.2092 9.61198 16.2091 9.61216L9 17.4905L1.79092 9.61216C1.79082 9.61205 1.79071 9.61194 1.79061 9.61182C-0.138067 7.49335 -0.138237 4.03869 1.7901 1.91998C3.73299 -0.182713 6.83457 -0.17971 8.74567 1.91909ZM15.3648 6.14719L15.4408 6.18773H15.5268H15.5561H15.7748L15.8676 5.98963C16.0351 5.63204 16.1342 5.2073 16.1342 4.78125C16.1342 3.26611 14.9739 2.03102 13.5366 2.03102C12.9917 2.03102 12.4838 2.21258 12.0786 2.50102L11.8148 2.68878L11.9863 2.96343L12.6302 3.99468L12.8237 4.30464L13.1214 4.09273C13.2622 3.99252 13.3981 3.93773 13.5366 3.93773C13.9404 3.93773 14.3048 4.2934 14.3048 4.78125C14.3048 4.9386 14.2793 5.05957 14.2318 5.14399L14.0596 5.45041L14.3697 5.61594L15.3648 6.14719Z" fill="#F39314" stroke="#F39314" stroke-width="0.687951"/>
                            </Svg>
                            <View style={styles.blockText}>
                                <AppText style={styles.text}>
                                    В избранное
                                </AppText>
                            </View>
                        </>
                    }}
                />
            </Item>
            <Item>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.link}
                    onPress={() => {
                        LinkTo("ShopContactPageScreen", {
                            previousRoute: "ShopDetailPageScreen",
                            masterId: data.id,
                            ...route.params
                        }, navigation)
                    }}
                >
                    <Svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1.48387 0.345H22.5161C23.1643 0.345 23.655 0.8357 23.655 1.48387V16.5161C23.655 17.1643 23.1643 17.655 22.5161 17.655H1.48387C0.8357 17.655 0.345 17.1643 0.345 16.5161V1.48387C0.345 0.8357 0.8357 0.345 1.48387 0.345ZM13.4839 13.8289H13.8289V13.4839V12V11.655H13.4839H4.51613H4.17113V12V13.4839V13.8289H4.51613H13.4839ZM13.4839 10.8611H13.8289V10.5161V9.03226V8.68726H13.4839H4.51613H4.17113V9.03226V10.5161V10.8611H4.51613H13.4839ZM20.9677 7.89339H21.3127V7.54839V3.03226V2.68726H20.9677H16.4516H16.1066V3.03226V7.54839V7.89339H16.4516H20.9677Z" stroke="#F39314" stroke-width="0.69"/>
                    </Svg>
                    <View style={styles.blockText}>
                        <AppText style={styles.text}>
                            Контакты
                        </AppText>
                    </View>
                </TouchableOpacity>
            </Item>
            <Item>
                <TouchableOpacity
                    activeOpacity={1} style={styles.link}
                    onPress={() => {
                        let productId = 0

                        if(route.params !== undefined) {
                            if(route.params.hasOwnProperty('productId')) productId = route.params.productId
                        }

                        LinkTo("ShopAssortmentPageScreen", {
                            previousRoute: "ShopDetailPageScreen",
                            masterId: data.id,
                            productId
                        }, navigation)
                    }}
                >
                    <Svg width="22" height="18" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M7.82742 17.8685C7.82742 16.8938 8.65295 16.0821 9.70727 16.0821C10.7616 16.0821 11.5871 16.8938 11.5871 17.8685C11.5871 18.8433 10.7616 19.655 9.70727 19.655C8.65295 19.655 7.82742 18.8433 7.82742 17.8685ZM8.60488 17.8685C8.60488 18.481 9.10479 18.9392 9.70727 18.9392C10.3098 18.9392 10.8097 18.481 10.8097 17.8685C10.8097 17.2561 10.3098 16.7979 9.70727 16.7979C9.10479 16.7979 8.60488 17.2561 8.60488 17.8685Z" stroke="#F39314" stroke-width="0.69"/>
                        <Path d="M15.3059 17.8685C15.3059 16.8938 16.1315 16.0821 17.1858 16.0821C18.2401 16.0821 19.0656 16.8938 19.0656 17.8685C19.0656 18.8433 18.2401 19.655 17.1858 19.655C16.1315 19.655 15.3059 18.8433 15.3059 17.8685ZM16.0834 17.8685C16.0834 18.481 16.5833 18.9392 17.1858 18.9392C17.7883 18.9392 18.2882 18.481 18.2882 17.8685C18.2882 17.2561 17.7883 16.7979 17.1858 16.7979C16.5833 16.7979 16.0834 17.2561 16.0834 17.8685Z" stroke="#F39314" stroke-width="0.69"/>
                        <Path d="M3.68317 1.50676L3.73038 1.79622H4.02367H4.11834H23.655V2.87652L22.1441 12.8734L22.1402 12.899V12.925C22.1402 13.5301 21.6059 14.0312 20.9704 14.0312H6.01183C5.34332 14.0312 4.84204 13.4985 4.84204 12.925V12.8953L4.83698 12.866L2.84881 1.39232L2.79924 1.10622H2.50888H0.757396C0.50781 1.10622 0.345 0.929439 0.345 0.725611C0.345 0.521783 0.50781 0.345 0.757396 0.345H3.49369L3.68317 1.50676Z" stroke="#F39314" stroke-width="0.69"/>
                    </Svg>
                    <View style={styles.blockText}>
                        <AppText style={styles.text}>
                            Ассортимент
                        </AppText>
                    </View>
                </TouchableOpacity>
            </Item>
            <Item>
                <TouchableOpacity activeOpacity={1} style={styles.link} onPress={() => {
                    //console.log('to Comment', data)
                    LinkTo("CommentPageScreen", {
                        previousRoute: "ShopDetailPageScreen",
                        type: "decorator",
                        masterId: data.id
                    }, navigation)
                }}>
                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M4.50732 13.1474H4.36442L4.26337 13.2484L0.345 17.1667V1.11217C0.345 0.688095 0.688092 0.345 1.1122 0.345H16.7156L16.7449 0.374268H16.8878C17.3119 0.374268 17.655 0.717362 17.655 1.14144V12.3802C17.655 12.8043 17.3119 13.1474 16.8878 13.1474H4.50732ZM13.4927 9.35942H13.8377V9.01442V7.90225V7.55725H13.4927H4.47805H4.13305V7.90225V9.01442V9.35942H4.47805H13.4927ZM13.4927 5.99365H13.8377V5.64865V4.53648V4.19148H13.4927H4.47805H4.13305V4.53648V5.64865V5.99365H4.47805H13.4927Z" stroke="#F39314" stroke-width="0.69"/>
                    </Svg>
                    <View style={{...styles.blockText}}>
                        <AppText style={styles.text}>
                            Комментарии
                        </AppText>
                    </View>
                </TouchableOpacity>
            </Item>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#000"
    },
    block: {
        width: "25%",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    link: {
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 14,
        height: 40
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
        height: 20,
        justifyContent: "center"
    },
    text: {
        width: "100%",
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 0,
        textAlign: "center",
        lineHeight: 14,
        fontSize: 12,
        color: "#fff"
    }
})
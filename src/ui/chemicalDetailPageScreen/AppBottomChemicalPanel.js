import React from "react"
import {View, StyleSheet, TouchableOpacity, Platform} from "react-native"
import {Svg, Path, Mask} from "react-native-svg";
import {AppText} from "../AppText";
import {THEME} from "../../../theme";
import {CHEMICAL, FAVORITE_CHEMICAL, LinkTo, ToDownloadFile} from "../../../global";
import AppFavoriteButton from "../AppFavoriteButton";

export default ({data, navigation}) => {
    const Item = ({children, active = false, onPress}) => {
        const back = (active) ? THEME.SLIDER_BG : "transparent"
        //const fill = (active) ? "" : "#60A04E"
        return (
            <TouchableOpacity
                style={{...styles.block, backgroundColor: back}}
                activeOpacity={1}
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
                type={FAVORITE_CHEMICAL}
                isActive={data.favorite}
                style={styles.block}
                hintText={"Химикат был успешно добавлен в избранное"}
                activeForm={() => {
                    return <>
                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M8.74567 1.91909L8.9982 2.19643L9.25269 1.92088C11.1955 -0.182713 14.2977 -0.180008 16.2091 1.91909C18.1382 4.03771 18.1383 7.49304 16.2094 9.61181C16.2093 9.61192 16.2092 9.61204 16.2091 9.61216L9 17.4905L1.79092 9.61216C-0.138067 7.49372 -0.138339 4.0388 1.7901 1.91998C3.73299 -0.182713 6.83456 -0.17971 8.74567 1.91909ZM15.3648 6.14719L15.4408 6.18773H15.5268H15.5561H15.7748L15.8676 5.98963C16.0351 5.63204 16.1342 5.2073 16.1342 4.78125C16.1342 3.26611 14.9739 2.03102 13.5366 2.03102C12.9917 2.03102 12.4838 2.21258 12.0786 2.50102L11.8148 2.68878L11.9863 2.96343L12.6302 3.99468L12.8237 4.30464L13.1214 4.09273C13.2622 3.99252 13.3981 3.93773 13.5366 3.93773C13.9404 3.93773 14.3048 4.2934 14.3048 4.78125C14.3048 4.9386 14.2793 5.05957 14.2318 5.14399L14.0596 5.45041L14.3697 5.61594L15.3648 6.14719Z" stroke="#E96C6C" stroke-width="0.687951"/>
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
                            <Path d="M8.74567 1.91909L8.9982 2.19643L9.25269 1.92088C11.1955 -0.182713 14.2977 -0.180008 16.2091 1.91909C18.1382 4.03771 18.1383 7.49304 16.2094 9.61181C16.2093 9.61192 16.2092 9.61204 16.2091 9.61216L9 17.4905L1.79092 9.61216C-0.138067 7.49372 -0.138339 4.0388 1.7901 1.91998C3.73299 -0.182713 6.83456 -0.17971 8.74567 1.91909ZM15.3648 6.14719L15.4408 6.18773H15.5268H15.5561H15.7748L15.8676 5.98963C16.0351 5.63204 16.1342 5.2073 16.1342 4.78125C16.1342 3.26611 14.9739 2.03102 13.5366 2.03102C12.9917 2.03102 12.4838 2.21258 12.0786 2.50102L11.8148 2.68878L11.9863 2.96343L12.6302 3.99468L12.8237 4.30464L13.1214 4.09273C13.2622 3.99252 13.3981 3.93773 13.5366 3.93773C13.9404 3.93773 14.3048 4.2934 14.3048 4.78125C14.3048 4.9386 14.2793 5.05957 14.2318 5.14399L14.0596 5.45041L14.3697 5.61594L15.3648 6.14719Z" stroke="#E96C6C" stroke-width="0.687951"/>
                        </Svg>
                        <View style={styles.blockText}>
                            <AppText style={styles.text}>
                                В избранное
                            </AppText>
                        </View>
                    </>
                }}
            />
            {
                data.instruction
                    ?
                    <Item onPress={async () => {
                        await ToDownloadFile(data.instruction)
                    }}>
                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M15.7335 14.9444H16.0785H17.0797L14.5569 17.4672L12.0341 14.9444H13.4674H13.8124V14.5994V10.1106C13.8124 9.69104 14.1809 9.32254 14.6004 9.32254C15.02 9.32254 15.3885 9.69104 15.3885 10.1106V14.5994H15.6464V14.9444H15.7335Z" stroke="#E96C6C" stroke-width="0.69"/>
                            <Path d="M12.0312 13.1649H8.49758H7.66467L8.25362 13.7539L12.1535 17.6537H1.17606C0.756472 17.6537 0.387969 17.2852 0.387969 16.8656V5.96688H5.0983C5.5939 5.96688 6.00985 5.55093 6.00985 5.05533V0.345H14.6424C15.062 0.345 15.4305 0.713504 15.4305 1.13309V7.67733C15.1814 7.59589 14.9151 7.54306 14.6424 7.54306C13.1838 7.54306 12.0312 8.74778 12.0312 10.1542V13.1649Z" stroke="#E96C6C" stroke-width="0.69"/>
                            <Path d="M4.14379 4.14379H0.832904L4.14379 0.832903V4.14379Z" stroke="#E96C6C" stroke-width="0.69"/>
                        </Svg>
                        <AppText style={styles.text}>
                            Скачать инструкцию
                        </AppText>
                    </Item>
                    :
                    <Item>
                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M15.7335 14.9444H16.0785H17.0797L14.5569 17.4672L12.0341 14.9444H13.4674H13.8124V14.5994V10.1106C13.8124 9.69104 14.1809 9.32254 14.6004 9.32254C15.02 9.32254 15.3885 9.69104 15.3885 10.1106V14.5994H15.6464V14.9444H15.7335Z" stroke={THEME.GREY} strokeWidth="0.69"/>
                            <Path d="M12.0312 13.1649H8.49758H7.66467L8.25362 13.7539L12.1535 17.6537H1.17606C0.756472 17.6537 0.387969 17.2852 0.387969 16.8656V5.96688H5.0983C5.5939 5.96688 6.00985 5.55093 6.00985 5.05533V0.345H14.6424C15.062 0.345 15.4305 0.713504 15.4305 1.13309V7.67733C15.1814 7.59589 14.9151 7.54306 14.6424 7.54306C13.1838 7.54306 12.0312 8.74778 12.0312 10.1542V13.1649Z" stroke={THEME.GREY} strokeWidth="0.69"/>
                            <Path d="M4.14379 4.14379H0.832904L4.14379 0.832903V4.14379Z" stroke={THEME.GREY} strokeWidth="0.69"/>
                        </Svg>
                        <AppText style={{...styles.text, color: THEME.GREY}}>
                            Скачать инструкцию
                        </AppText>
                    </Item>
            }
            <Item
                onPress={() => {
                    LinkTo("QrDetailPageScreen", {
                        type: "chemical",
                        chemicalId: data.id
                    }, navigation)
                }}
            >
                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M4.52452 3.72598H16.8561C17.3024 3.72598 17.6548 4.10871 17.6548 4.52464V16.8563C17.6548 17.3025 17.2721 17.6549 16.8561 17.6549H4.52452C4.07828 17.6549 3.72586 17.2722 3.72586 16.8563V4.52464C3.72586 4.0784 4.10858 3.72598 4.52452 3.72598Z" stroke="#E96C6C" stroke-width="0.69"/>
                    <Path d="M2.28732 1.94232H1.94232V2.28732V14.2739H1.14366C0.697417 14.2739 0.345 13.8912 0.345 13.4753V1.14366C0.345 0.697417 0.727725 0.345 1.14366 0.345H13.4753C13.9215 0.345 14.2739 0.727725 14.2739 1.14366V1.94232H2.28732Z" stroke="#E96C6C" stroke-width="0.69"/>
                </Svg>
                <View style={styles.blockText}>
                    <AppText style={styles.text}>
                        Скопировать QR код
                    </AppText>
                </View>
            </Item>
            <Item onPress={() => {
                LinkTo("CommentPageScreen", {
                    chemicalId: data.id,
                    type: CHEMICAL,
                    previousRoute: "ChemicalDetailPageScreen"
                }, navigation)
            }}>
                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M4.50732 13.1474H4.36442L4.26337 13.2484L0.345 17.1667V1.11217C0.345 0.688095 0.688092 0.345 1.1122 0.345H16.7156L16.7449 0.374268H16.8878C17.3119 0.374268 17.655 0.717362 17.655 1.14144V12.3802C17.655 12.8043 17.3119 13.1474 16.8878 13.1474H4.50732ZM13.4927 9.35942H13.8377V9.01442V7.90225V7.55725H13.4927H4.47805H4.13305V7.90225V9.01442V9.35942H4.47805H13.4927ZM13.4927 5.99365H13.8377V5.64865V4.53648V4.19148H13.4927H4.47805H4.13305V4.53648V5.64865V5.99365H4.47805H13.4927Z" stroke="#E96C6C" stroke-width="0.69"/>
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
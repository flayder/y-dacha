import React from "react"
import {View, TouchableOpacity, StyleSheet, Text} from "react-native"
import {AppTextBold} from "../AppTextBold";
import {Path, Svg} from "react-native-svg";
import {AppText} from "../AppText";
import {LinkTo} from "../../../global";
import AppVote from "../AppVote";
import {THEME} from "../../../theme";
import * as Linking from 'expo-linking';
import AppFastImage from "../AppFastImage";

export default ({data, route, navigation, onPress}) => {
    return (
        <View style={styles.balloonWrap}>
            <View style={styles.balloonHeader}>
                <Text style={styles.balloonAvaWrap}>
                    <AppFastImage
                        style={styles.balloonAva}
                        uri={data.photo}
                    />
                </Text>
                <View style={styles.balloonInfo}>
                    <AppTextBold style={styles.name}>
                        {data.first_name} {data.last_name}
                    </AppTextBold>
                    <AppVote
                        style={styles.vote}
                        starWidth={12}
                        starHeight={12}
                        initiate={data.rating}
                    />
                </View>
                <TouchableOpacity
                    style={styles.balloonClose}
                >
                    <Svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M16.1871 0L9 7.18714L1.81286 0L0 1.81286L7.18714 9L0 16.1871L1.81286 18L9 10.8129L16.1871 18L18 16.1871L10.8129 9L18 1.81286L16.1871 0Z" fill="black"/>
                    </Svg>
                </TouchableOpacity>
            </View>
            <View style={styles.balloonBody}>
                <TouchableOpacity
                    style={styles.balloonLinkWrap}
                    activeOpacity={1}
                    onPress={() => {
                        LinkTo("MasterDetailPageScreen", {
                            masterId: data.user_id,
                            type: "decorator"
                        }, navigation)
                    }}
                >
                    <AppText style={styles.balloonLink}>
                        Профиль
                    </AppText>
                </TouchableOpacity>
                {
                    data.regtown
                        ?
                        <AppText style={styles.balloonAddress}>
                            {data.regtown}
                        </AppText>
                        :
                        <></>
                }
                <View style={styles.balloonSocial}>
                    {
                        data.phone
                            ?
                            <View style={styles.line}>
                                <View style={styles.icon}>
                                    <Svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M9.15842 0H0.841584C0.39604 0 0 0.385185 0 0.818518V12.1815C0 12.6148 0.39604 13 0.841584 13H9.15842C9.60396 13 10 12.6148 10 12.1815V0.818518C10 0.385185 9.60396 0 9.15842 0V0ZM4.9505 12.5185C4.70297 12.5185 4.50495 12.3259 4.50495 12.0852C4.50495 11.8444 4.70297 11.6519 4.9505 11.6519C5.19802 11.6519 5.39604 11.8444 5.39604 12.0852C5.39604 12.3259 5.19802 12.5185 4.9505 12.5185ZM9.15842 11.3148H0.841584V0.77037H9.15842V11.3148Z" fill="#75AEA4"/>
                                        <Path d="M8.36676 1.63748H1.68359V10.5449H8.36676V1.63748Z" fill="#75AEA4"/>
                                    </Svg>
                                </View>
                                <View style={styles.balloonText}>
                                    <AppText style={{...styles.text, color: THEME.GREY_TEXT}}>
                                        {data.phone}
                                    </AppText>
                                </View>
                            </View>
                            :
                            <></>
                    }
                    {
                        data.email
                            ?
                            <View style={styles.line}>
                                <View style={styles.icon}>
                                    <Svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M12.9908 0.905543C12.9908 0.89111 13.0011 0.877061 13.0004 0.862793L9.0332 4.57695L12.9957 8.17246C12.998 8.14678 12.9908 8.12088 12.9908 8.09465V0.905543Z" fill="#75AEA4"/>
                                        <Path d="M8.42653 5.1485L6.80701 6.66248C6.72505 6.73909 6.61921 6.77751 6.51331 6.77751C6.40961 6.77751 6.30591 6.74074 6.22452 6.66704L4.60941 5.20469L0.621094 8.93993C0.718071 8.97379 0.822164 9.00007 0.931172 9.00007H12.0955C12.2574 9.00007 12.4092 8.95217 12.5412 8.88071L8.42653 5.1485Z" fill="#75AEA4"/>
                                        <Path d="M6.50891 5.79909L12.5634 0.132311C12.4263 0.0531221 12.2668 0 12.0957 0H0.931406C0.708703 0 0.504639 0.0840186 0.345703 0.212159L6.50891 5.79909Z" fill="#75AEA4"/>
                                        <Path d="M0 1.04346V8.09444C0 8.17538 0.0191469 8.25342 0.0399317 8.328L3.97877 4.64259L0 1.04346Z" fill="#75AEA4"/>
                                    </Svg>
                                </View>
                                <View style={styles.balloonText}>
                                    <AppText style={styles.text}>
                                        {data.email}
                                    </AppText>
                                </View>
                            </View>
                            :
                            <></>
                    }
                    {
                        data.social_vkotakte
                            ?
                            <View style={styles.line}>
                                <View style={styles.icon}>
                                    <Svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M13.8379 0.621094C13.9141 0.316406 13.8379 0.0625 13.3809 0.0625H11.8828C11.502 0.0625 11.3242 0.265625 11.2227 0.494141C11.2227 0.494141 10.4609 2.34766 9.39453 3.56641C9.03906 3.89648 8.88672 4.02344 8.68359 4.02344C8.60742 4.02344 8.45508 3.89648 8.45508 3.5918V0.621094C8.45508 0.240234 8.35352 0.0625 8.02344 0.0625H5.6875C5.43359 0.0625 5.30664 0.240234 5.30664 0.417969C5.30664 0.773438 5.83984 0.849609 5.89062 1.86523V4.07422C5.89062 4.55664 5.81445 4.6582 5.61133 4.6582C5.10352 4.6582 3.88477 2.7793 3.14844 0.646484C2.99609 0.240234 2.84375 0.0625 2.46289 0.0625H0.964844C0.558594 0.0625 0.457031 0.265625 0.457031 0.494141C0.457031 0.900391 0.964844 2.85547 2.81836 5.4707C4.0625 7.24805 5.81445 8.1875 7.38867 8.1875C8.32812 8.1875 8.45508 7.98438 8.45508 7.62891C8.45508 5.92773 8.37891 5.75 8.83594 5.75C9.06445 5.75 9.44531 5.87695 10.334 6.74023C11.3496 7.75586 11.5273 8.1875 12.0859 8.1875H13.584C14.0156 8.1875 14.2188 7.98438 14.0918 7.55273C13.8125 6.68945 11.9082 4.86133 11.8066 4.73438C11.5781 4.45508 11.6543 4.32812 11.8066 4.07422C11.8066 4.07422 13.6348 1.48438 13.8379 0.621094Z" fill="#75AEA4"/>
                                    </Svg>
                                </View>
                                <View style={styles.balloonText}>
                                    <AppText style={styles.text}>
                                        {data.social_vkotakte}
                                    </AppText>
                                </View>
                            </View>
                            :
                            <></>
                    }
                    {
                        data.site
                            ?
                            <View style={styles.line}>
                                <View style={styles.icon}>
                                    <Svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M9.46824 9.46949C9.65848 8.51832 9.76416 7.52487 9.76416 6.51028C9.76416 5.4957 9.65848 4.50225 9.46824 3.55108C8.51707 3.36084 7.52362 3.25516 6.50903 3.25516C5.49445 3.25516 4.501 3.36084 3.54983 3.55108C3.35959 4.50225 3.25391 5.4957 3.25391 6.51028C3.25391 7.52487 3.35959 8.51832 3.54983 9.46949C4.501 9.65973 5.49445 9.76541 6.50903 9.76541C7.52362 9.76541 8.51707 9.65973 9.46824 9.46949Z" fill="#75AEA4"/>
                                        <Path d="M2.43078 6.51025C2.43078 5.55908 2.53646 4.65018 2.68442 3.76242C1.86007 3.97379 1.05686 4.24858 0.295921 4.56563C0.105686 5.17861 0 5.83386 0 6.51025C0 7.18664 0.105686 7.8419 0.295921 8.45488C1.05686 8.79307 1.86007 9.06785 2.68442 9.27923C2.53646 8.39146 2.43078 7.46143 2.43078 6.53139V6.51025Z" fill="#75AEA4"/>
                                        <Path d="M6.51151 2.43078C7.46268 2.43078 8.37158 2.53646 9.25934 2.68442C9.04797 1.86007 8.77319 1.05686 8.45613 0.295921C7.84315 0.105686 7.1879 0 6.51151 0C5.83512 0 5.17986 0.105686 4.56689 0.295921C4.22869 1.05686 3.95391 1.86007 3.76367 2.68442C4.65143 2.53646 5.58147 2.43078 6.51151 2.43078Z" fill="#75AEA4"/>
                                        <Path d="M6.51151 10.5686C5.56033 10.5686 4.65143 10.4629 3.76367 10.3149C3.97504 11.1393 4.24983 11.9425 4.56689 12.7034C5.17986 12.8937 5.83512 12.9994 6.51151 12.9994C7.1879 12.9994 7.84315 12.8937 8.45613 12.7034C8.79432 11.9425 9.06911 11.1393 9.25934 10.3149C8.37158 10.4629 7.44154 10.5686 6.51151 10.5686Z" fill="#75AEA4"/>
                                        <Path d="M9.49121 0.739777C9.74486 1.4373 9.97737 2.13483 10.1465 2.87463C10.8863 3.04373 11.5838 3.2551 12.2813 3.52988C11.6683 2.3462 10.696 1.37389 9.51235 0.760914L9.49121 0.739777Z" fill="#75AEA4"/>
                                        <Path d="M3.50983 12.2596C3.25619 11.562 3.02368 10.8645 2.85458 10.1247C2.11478 9.95561 1.41725 9.74424 0.719727 9.46945C1.3327 10.6531 2.30502 11.6254 3.4887 12.2384L3.50983 12.2596Z" fill="#75AEA4"/>
                                        <Path d="M12.7039 8.4337C12.8942 7.82072 12.9999 7.16547 12.9999 6.48908C12.9999 5.81269 12.8942 5.15743 12.7039 4.54445C11.943 4.20626 11.1398 3.93148 10.3154 3.74124C10.4634 4.629 10.5691 5.55904 10.5691 6.48908C10.5691 7.44025 10.4634 8.34915 10.3154 9.23691C11.1398 9.02554 11.943 8.75076 12.7039 8.41256V8.4337Z" fill="#75AEA4"/>
                                        <Path d="M12.2598 9.49063C11.5623 9.74428 10.8648 9.97679 10.125 10.1459C9.95588 10.8857 9.74451 11.5832 9.46973 12.2807C10.6534 11.6678 11.6257 10.6955 12.2387 9.51177L12.2598 9.49063Z" fill="#75AEA4"/>
                                        <Path d="M0.740234 3.50877C1.43776 3.25512 2.13529 3.02261 2.87509 2.85351C3.04419 2.11371 3.25556 1.41619 3.53034 0.718658C2.34666 1.33164 1.37435 2.30395 0.761372 3.48763L0.740234 3.50877Z" fill="#75AEA4"/>
                                    </Svg>
                                </View>
                                <TouchableOpacity
                                    style={styles.balloonText}
                                    activeOpacity={1}
                                    onPress={async () => {
                                        await Linking.openURL(data.site);
                                    }}
                                >
                                    <AppText style={{...styles.text, fontSize: 14, color: THEME.COMFORT_COLOR}}>
                                        {data.site}
                                    </AppText>
                                </TouchableOpacity>
                            </View>
                            :
                            <></>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    balloonAvaWrap: {
        width: 50,
        height: 50,
        overflow: "hidden",
        borderRadius: 25
    },
    text: {
        marginTop: 5,
        marginBottom: 5
    },
    line: {
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        width: 30
    },
    balloonSocial: {
        paddingTop: 20
    },
    balloonAddress: {
        marginTop: 5,
        marginBottom: 5,
        color: THEME.GREY_TEXT,
        fontSize: 14
    },
    balloonLink: {
        textDecorationLine: "underline",
        textDecorationColor: "#000",
        marginTop: 5,
        marginBottom: 5
    },
    balloonInfo: {
        paddingTop: 5
    },
    balloonBody: {
        padding: 15
    },
    balloonClose: {
        marginTop: 10,
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    name: {
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 14,
        height: 18
    },
    vote: {
        width: 80
    },
    balloonWrap: {
        //backgroundColor: "#fff",
        width: 220,
        borderRadius: 40
        //...SHADOW
    },
    balloonAva: {
        position: "relative",
        zIndex: 99999999,
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: "#fff"
    },
    balloonHeader: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})
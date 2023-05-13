import React from "react";
import {Image, StyleSheet, View, TouchableOpacity} from "react-native";
import {AppText} from "../AppText";
import moment from "moment";
import {THEME} from "../../../theme";
import {Svg, Path, Circle} from "react-native-svg";
import {AppTextBold} from "../AppTextBold";
import {LinkTo, notificationStyles, SHADOW} from "../../../global";
import {useNavigation} from "@react-navigation/native";
import AppFastImage from "../AppFastImage";

export default (
    {
        item,
        screenWidth,
        onLongPress,
        checked = false,
        onSelected,
        active = true}) => {
    const navigation = useNavigation()

    const getIcon = (type) => {
        switch (type) {
            case "order":
                return <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Circle cx="14" cy="13" r="10" fill="white"/>
                    <Path d="M13.3973 15.5081C12.9666 15.5081 12.6187 15.8414 12.6187 16.2541C12.6187 16.6668 12.9666 17.0001 13.3973 17.0001C13.8281 17.0001 14.176 16.6668 14.176 16.2541C14.176 15.8414 13.8281 15.5081 13.3973 15.5081ZM13.3973 16.508C13.2482 16.508 13.1323 16.3969 13.1323 16.2541C13.1323 16.1112 13.2482 16.0001 13.3973 16.0001C13.5465 16.0001 13.6624 16.1112 13.6624 16.2541C13.6624 16.3969 13.5465 16.508 13.3973 16.508Z" fill="#5382D8"/>
                    <Path d="M16.015 15.5081C15.5843 15.5081 15.2363 15.8414 15.2363 16.2541C15.2363 16.6668 15.5843 17.0001 16.015 17.0001C16.4458 17.0001 16.7937 16.6668 16.7937 16.2541C16.7937 15.8414 16.4458 15.5081 16.015 15.5081ZM16.015 16.508C15.8659 16.508 15.7499 16.3969 15.7499 16.2541C15.7499 16.1112 15.8659 16.0001 16.015 16.0001C16.1641 16.0001 16.2801 16.1112 16.2801 16.2541C16.2801 16.3969 16.1641 16.508 16.015 16.508Z" fill="#5382D8"/>
                    <Path d="M11.4083 10.5079L11.3254 10H10.2651C10.116 10 10 10.1111 10 10.254C10 10.3968 10.116 10.5079 10.2651 10.5079H10.8781L11.574 14.5237C11.574 14.7936 11.8059 15.0317 12.1041 15.0317H17.3396C17.6213 15.0317 17.8698 14.8094 17.8698 14.5237L18.4 11.0159V10.5079H11.4414H11.4083Z" fill="#5382D8"/>
                </Svg>
            default:
                return <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Circle cx="14" cy="13" r="10" fill="white"/>
                    <Path fillRule="evenodd" clipRule="evenodd" d="M14.201 12.0705C14.3285 12.2608 14.4871 12.4758 14.3725 12.7706C14.284 12.9979 14.0502 13.186 13.8099 13.186C13.6302 13.186 13.4329 13.0588 13.3016 12.9707C13.2631 13.1147 13.0948 13.2534 12.9563 13.3296C12.7401 13.4484 12.4679 13.3595 12.2991 13.1911C12.1253 13.0179 12.1089 12.9296 12.1089 12.6772C12.1089 12.5835 12.1376 12.4853 12.1675 12.4228C11.9255 12.3065 11.581 12.1868 11.581 11.7378C11.581 11.2817 11.9773 11.1813 12.3435 11.1506C12.3435 11.0232 12.3436 10.9311 12.3712 10.8261C12.394 10.739 12.4363 10.6468 12.4857 10.5884C12.6541 10.3895 12.9559 10.3018 13.2241 10.4259C13.3232 10.4717 13.4565 10.6245 13.5107 10.7263C13.5512 10.8024 13.5614 10.8656 13.5949 10.9354C13.8748 10.7871 14.1771 10.7898 14.4018 11.0477C14.7599 11.4588 14.4798 11.9958 14.2011 12.0704L14.201 12.0705ZM11.9236 8.00007H12.0485C12.1873 8.01348 12.3237 8.07097 12.457 8.16058C12.5786 8.24235 12.6868 8.31396 12.8088 8.39544L17.0322 11.2134C17.153 11.2939 17.2687 11.3609 17.3549 11.4775C17.6236 11.8408 17.4997 12.1279 17.2902 12.4424L16.4495 13.7143C15.8961 13.7143 15.6696 13.7404 15.3937 14.2623C15.1699 14.2101 15.3134 14.1449 14.8853 14.1449C14.5733 14.1449 14.3698 14.4264 14.2988 14.7319C14.2047 14.71 14.1763 14.6732 14.0446 14.6732C13.7057 14.6732 13.3016 14.9926 13.3016 15.4168C13.2351 15.399 12.8217 15.1095 12.7307 15.0488L9.36733 12.7987C9.0848 12.6108 9.00261 12.4388 9 12.1246V12.1096C9 11.9162 9.20182 11.6501 9.28937 11.5186L11.0414 8.86892C11.1836 8.65634 11.4067 8.23938 11.6133 8.11063C11.7179 8.04544 11.8214 8.01016 11.9236 8L11.9236 8.00007Z" fill="#E96C6C"/>
                    <Path fillRule="evenodd" clipRule="evenodd" d="M13.0861 12.638C14.1448 12.638 14.0611 11.1704 13.1253 11.1704C12.7475 11.1704 12.4108 11.4689 12.396 11.883C12.3821 12.2662 12.6932 12.6381 13.0861 12.6381V12.638Z" fill="#E96C6C"/>
                    <Path fillRule="evenodd" clipRule="evenodd" d="M18.0722 17.9998H18.3656C18.5911 17.9998 19.0288 17.8747 18.9984 17.6766C18.9336 17.2535 17.4435 17.2902 17.4183 17.6698C17.4044 17.8778 17.8349 17.9999 18.0722 17.9999V17.9998Z" fill="#E96C6C"/>
                    <Path fillRule="evenodd" clipRule="evenodd" d="M15.7065 14.9665C15.7065 15.2675 15.8835 15.466 16.083 15.6662C16.3545 15.9386 16.9189 16.2532 16.9189 15.8668C16.9189 15.515 16.2689 14.8491 15.863 14.8491C15.7916 14.8491 15.7065 14.9031 15.7065 14.9665Z" fill="#E96C6C"/>
                    <Path fillRule="evenodd" clipRule="evenodd" d="M17.5249 16.2388C17.5249 17.0366 17.8583 17.0615 18.0699 16.5103C18.2986 15.9142 18.1093 15.0812 17.7735 15.4506C17.644 15.5931 17.5249 15.9674 17.5249 16.2389V16.2388Z" fill="#E96C6C"/>
                    <Path fillRule="evenodd" clipRule="evenodd" d="M15.6675 16.5715C15.6675 16.8692 16.3446 17.1978 16.6842 17.1978C16.8021 17.1978 16.9596 17.2098 17.0246 17.0866C17.1715 16.8088 16.4928 16.4404 16.1158 16.3965C15.9471 16.3767 15.6675 16.3704 15.6675 16.5715Z" fill="#E96C6C"/>
                </Svg>


        }
    }

    return (
        <TouchableOpacity
            style={{...styles.messageLeft, paddingLeft: 0}}
            activeOpacity={.9}
            // onLongPress={() => {
            //     onLongPress('test')
            //     if(onLongPress) onLongPress(item.id)
            // }}
        >
            <View style={{...styles.avaWrap, paddingLeft: 0}}>
                <AppFastImage
                    style={styles.ava}
                    uri={item.photo}
                />
                <View style={styles.icon}>
                    {getIcon(item.type)}
                </View>
            </View>
            <View style={{...styles.messageBlockLeft, width: screenWidth - 70}}>
                <View style={styles.messagerWrap}>
                    {/*, width: widthText*/}
                    <AppTextBold style={styles.name}>
                        {item.first_name} {item.last_name}
                    </AppTextBold>
                    <View style={{...styles.messageLeftText}}>
                        <AppText style={styles.text}>
                            {item.text}
                        </AppText>
                    </View>
                    <View style={styles.messageDateWrap}>
                        <AppText style={styles.messageDate}>
                            {moment(item.date).format("hh:mm")}
                        </AppText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    ...notificationStyles,
    icon: {
        position: "absolute",
        width: 28,
        right: -12,
        top: -12,
        borderRadius: 14,
        backgroundColor: "#fff",
        ...SHADOW,
        padding: 0
    }
})
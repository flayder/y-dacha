import React, {useState} from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {AppText} from "../AppText";
import {THEME} from "../../../theme";
import {AppTextBold} from "../AppTextBold";
import {notificationStyles} from "../../../global";
import {useNavigation} from "@react-navigation/native";
import AppDrug from "../AppDrug";
import {Svg, Path} from "react-native-svg";
import {AppTextItalic} from "../AppTextItalic";
import AppFastImage from "../AppFastImage";

export default (
    {
        item = {},
        screenWidth,
        children,
        opened = false,
        onLongPress,
        checked = false,
        onSelected,
        active = true,
        activeColor = THEME.GREEN,
        statusColor= "#000",
        onOpened,
        onDelete
    }) => {
    const [open, setOpen] = useState(opened)
    const navigation = useNavigation()
    //console.log('item.photo', item.photo, item)
    return (
        <View style={styles.order}>
            <AppDrug
                screenWidth={screenWidth - 50}
                onDelete={async () => {
                    if(onDelete) onDelete(item.id)
                }}
            >
                <TouchableOpacity
                    style={styles.messageLeft}
                    activeOpacity={.9}
                    onPress={() => {
                        //console.log(item.info.user_id)
                        // LinkTo("ChatPageScreen", {
                        //     masterId: item.info.user_id,
                        //     type: "decorator"
                        // }, navigation)
                        if(onOpened) {
                            onOpened(!open)
                        }
                        setOpen(!open)
                    }}
                    onLongPress={() => {
                        //onLongPress('test')
                        //if(onLongPress) onLongPress(item.id)
                    }}
                >
                    <View style={{...styles.indicate, backgroundColor: activeColor}}></View>
                    <View style={styles.avaWrap}>
                        {
                            item.photo
                                ?
                                <AppFastImage
                                    style={{...styles.ava}}
                                    uri={item.photo}
                                />
                                :
                                <></>
                        }
                    </View>
                    <View style={{...styles.messageBlockLeft, width: screenWidth - 160}}>
                        <View style={styles.messagerWrap}>
                            {
                                item.title
                                    ?
                                    <AppTextBold style={styles.name}>
                                        {item.title}
                                    </AppTextBold>
                                    :
                                    <></>
                            }
                            {
                                item.subtitle
                                    ?
                                    <AppTextItalic style={styles.subtitle}>
                                        {item.subtitle}
                                    </AppTextItalic>
                                    :
                                    <></>
                            }
                            {
                                item.status
                                    ?
                                    <View style={{...styles.messageLeftText}}>
                                        <AppText style={{...styles.text, marginBottom: 0, color: statusColor}}>
                                            {item.status}
                                        </AppText>
                                    </View>
                                    :
                                    <></>
                            }
                            {
                                item.date
                                    ?
                                    <View style={styles.messageDateWrap}>
                                        <AppText style={{...styles.messageDate, marginTop: 0}}>
                                            {item.date}
                                        </AppText>
                                    </View>
                                    :
                                    <></>
                            }
                        </View>
                    </View>
                    <View style={{...styles.checkbox, ...styles.newCheckbox}}>
                        {
                            !open
                                ?
                                <Svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M9 5.99998L10 4.99998L5.00002 0L0 5.00001L0.999997 6L5.00001 1.99999L9 5.99998Z" fill="black"/>
                                </Svg>
                                :
                                <Svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M9 1.85966e-05L10 1.00002L5.00002 6L0 0.999992L0.999997 -4.29153e-06L5.00001 4.00001L9 1.85966e-05Z" fill="black"/>
                                </Svg>
                        }
                    </View>
                </TouchableOpacity>
            </AppDrug>
            {
                open
                    ?
                    <View style={styles.opened}>
                        {children}
                    </View>
                    :
                    <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    ...notificationStyles
})
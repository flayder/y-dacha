import React from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {AppText} from "../AppText";
import moment from "moment";
import {THEME} from "../../../theme";
import {AppTextBold} from "../AppTextBold";
import {LinkTo, notificationStyles} from "../../../global";
import {useNavigation} from "@react-navigation/native";
import Checkbox from "../Checkbox";
import AppDrug from "../AppDrug";
import {AppFetch} from "../../AppFetch";
import AppFastImage from "../AppFastImage";

export default (
    {
        item,
        screenWidth,
        onLongPress,
        checked = false,
        onSelected,
        active = true,
        onDelete
    }) => {
    if(!item.hasOwnProperty('info')) return <></>

    const navigation = useNavigation()
    const activeColor = item.is_read == 1 ? THEME.GREEN : THEME.ORANGE
    return (
        <AppDrug
            screenWidth={screenWidth - 30}
            onDelete={async () => {
               if(onDelete) onDelete(item.id)
            }}
        >
            <TouchableOpacity
                style={styles.messageLeft}
                activeOpacity={.9}
                onPress={() => {
                    //console.log(item.info.user_id)
                    LinkTo("ChatPageScreen", {
                        masterId: item.info.user_id,
                        type: "decorator"
                    }, navigation)
                }}
                onLongPress={() => {
                    //onLongPress('test')
                    if(onLongPress) onLongPress(item.id)
                }}
            >
                <View style={{...styles.indicate, backgroundColor: activeColor}}></View>
                <View style={styles.avaWrap}>
                    {
                        item.hasOwnProperty('info')
                            ?
                            <AppFastImage
                                style={styles.ava}
                                uri={item.info.photo}
                            />
                            :
                            <></>
                    }
                </View>
                <View style={{...styles.messageBlockLeft, width: screenWidth - 160}}>
                    <View style={styles.messagerWrap}>
                        {/*, width: widthText*/}
                        <AppTextBold style={styles.name}>
                            {item.info.first_name} {item.info.last_name}
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
                <View style={styles.checkbox}>
                    {
                        active
                            ?
                            <Checkbox
                                active={checked}
                                onChange={val => {
                                    if(onSelected) onSelected(item.id)
                                }}
                            />
                            :
                            <></>
                    }
                </View>
            </TouchableOpacity>
        </AppDrug>
    )
}

const styles = StyleSheet.create(notificationStyles)
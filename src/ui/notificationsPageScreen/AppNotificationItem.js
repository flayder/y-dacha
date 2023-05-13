import React from "react";
import {Image, StyleSheet, View, TouchableOpacity} from "react-native";
import {AppText} from "../AppText";
import moment from "moment";
import {THEME} from "../../../theme";
import {AppTextBold} from "../AppTextBold";
import {LinkTo, notificationStyles} from "../../../global";
import {useNavigation} from "@react-navigation/native";
import Checkbox from "../Checkbox";
import AppDrug from "../AppDrug";
import {AppFetch} from "../../AppFetch";

export default (
    {
        item,
        screenWidth,
        onLongPress,
        checked = false,
        onSelected,
        active = true,
        onDelete,
        Icon
    }) => {
    //if(!item.hasOwnProperty('info')) return <></>

    const navigation = useNavigation()
    const activeColor = THEME.ORANGE //item.is_read == 1 ? THEME.GREEN : THEME.ORANGE
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
                onLongPress={() => {
                    //onLongPress('test')
                    if(onLongPress) onLongPress(item.id)
                }}
            >
                <View style={{...styles.indicate, backgroundColor: activeColor}}></View>
                <View style={styles.avaWrap}>
                    <Image
                        style={{...styles.ava}}
                        source={{uri: item.photo}}
                    />
                </View>
                <View style={{...styles.messageBlockLeft, width: screenWidth - 160}}>
                    <View style={styles.messagerWrap}>
                        {/*, width: widthText*/}
                        <AppTextBold style={styles.name}>
                            {item.title}
                        </AppTextBold>
                        <View style={{...styles.messageLeftText}}>
                            <AppText style={styles.text}>
                                {item.body}
                            </AppText>
                        </View>
                        <View style={styles.messageDateWrap}>
                            <AppText style={styles.messageDate}>
                                {moment(item.created_at).format("hh:mm")}
                            </AppText>
                        </View>
                    </View>
                </View>
                <View style={styles.checkbox}>
                    {
                        Icon
                            ?
                            Icon()
                            :
                            <></>
                    }
                </View>
            </TouchableOpacity>
        </AppDrug>
    )
}

const styles = StyleSheet.create(notificationStyles)
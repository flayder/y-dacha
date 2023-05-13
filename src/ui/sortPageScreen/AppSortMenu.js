import React from "react"
import {View, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {DISEASES, LinkTo, NOTE, PESTS, SORTS} from "../../../global";
import {AppText} from "../AppText";
import {THEME} from "../../../theme";


export default () => {
    const navigation = useNavigation()
    const route = useRoute()
    let params = {}
    if(route.params !== undefined) {
        params = route.params
    }
    const active = THEME.BLUE
    const normal = "#000"
    return (
        <ScrollView style={styles.scroller}>
            <View style={styles.wrap}>
                <TouchableOpacity style={styles.link} onPress={() => {
                    LinkTo("SortPageScreen", {
                        ...params,
                        name: SORTS
                    }, navigation)
                }}>
                    {
                        params.name === SORTS
                            ?
                            <AppText style={{...styles.text, color: active}}>Сорта</AppText>
                            :
                            <AppText style={{...styles.text, color: normal}}>Сорта</AppText>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={() => {
                    LinkTo("PestsPageScreen", {
                        ...params,
                        name: PESTS
                    }, navigation)
                }}>
                    {
                        params.name === PESTS
                            ?
                            <AppText style={{...styles.text, color: active}}>Вредители</AppText>
                            :
                            <AppText style={{...styles.text, color: normal}}>Вредители</AppText>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={() => {
                    LinkTo("DiseasesPageScreen", {
                        ...params,
                        name: DISEASES
                    }, navigation)
                }}>
                    {
                        params.name === DISEASES
                            ?
                            <AppText style={{...styles.text, color: active}}>Заболевания</AppText>
                            :
                            <AppText style={{...styles.text, color: normal}}>Заболевания</AppText>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={() => {
                    LinkTo("NotesPageScreen", {
                        ...params,
                        name: NOTE
                    }, navigation)
                }}>
                    {
                        params.name === NOTE
                            ?
                            <AppText style={{...styles.text, color: active}}>Справка</AppText>
                            :
                            <AppText style={{...styles.text, color: normal}}>Справка</AppText>
                    }
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrap: {
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    link: {
        paddingLeft: 5,
        paddingRight: 5
    }
})
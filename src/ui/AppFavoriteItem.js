import React from "react"
import {StyleSheet, TouchableOpacity, View, Image} from "react-native"
import AppDrug from "./AppDrug";
import {AppTextBold} from "./AppTextBold";
import {AppText} from "./AppText";
import {THEME} from "../../theme";
import moment from "moment";
import 'moment/locale/ru'
import {
    FAVORITE_CHEMICAL, FAVORITE_DECORATOR,
    FAVORITE_DISEASE, FAVORITE_EVENT, FAVORITE_ITEM_STYLE,
    FAVORITE_PEST,
    FAVORITE_QUESTION, FAVORITE_SELLER,
    FAVORITE_SORT,
    LinkTo
} from "../../global";
import AppFastImage from "./AppFastImage";

export default (
    {
        style,
        item,
        num,
        navigation,
        onDelete,
        screenWidth = "100%"
    }) => {

    const linkHandler = () => {
        //console.log('item.type', item.type, FAVORITE_DECORATOR)
        switch (item.type) {
            case FAVORITE_SORT:
                LinkTo("SortDetailPageScreen", {sortId: item.id}, navigation)
                break
            case FAVORITE_CHEMICAL:
                LinkTo("ChemicalDetailPageScreen", {chemicalId: item.id}, navigation)
                break
            case FAVORITE_PEST:
                LinkTo("PestDetailPageScreen", {pestId: item.id}, navigation)
                break
            case FAVORITE_DISEASE:
                LinkTo("DiseaseDetailPageScreen", {diseaseId: item.id}, navigation)
                break
            case FAVORITE_QUESTION:
                LinkTo("NoteDetailPageScreen", {noteId: item.id}, navigation)
                break
            case FAVORITE_DECORATOR:
                LinkTo("MasterDetailPageScreen", {masterId: item.id}, navigation)
                break
            case FAVORITE_EVENT:
                LinkTo("EventDetailPageScreen", {eventId: item.id}, navigation)
                break
            case FAVORITE_SELLER:
                LinkTo("ShopDetailPageScreen", {masterId: item.id}, navigation)
                break
        }
    }
    const bodyWidth = (item.type != 'event') ? screenWidth - 120 : screenWidth - 160
    return (
        <AppDrug
            style={styles.drug}
            //press={false}
            onDelete={() => {
                if(onDelete) onDelete(true)
            }}
            deleteBtnStyle={{
                marginRight: 20
            }}
            screenWidth={screenWidth}
            onPressFun={linkHandler}
        >
            <View
                style={{...styles.wrap, width: screenWidth}}
            >
                <AppTextBold style={styles.num}>
                    {num}
                </AppTextBold>
                <AppFastImage
                    style={styles.img}
                    uri={item.photo}
                />
                <View style={{...styles.body, width: bodyWidth}}>
                    <AppText style={styles.name}>
                        {item.name}
                    </AppText>
                    <AppText style={styles.descr}>
                        {item.title}
                    </AppText>
                </View>
                {
                    item.type == "event"
                        ?
                        <View style={styles.dateEvent}>
                            <AppText style={styles.dateEventThin}>
                                Когда?
                            </AppText>
                            <AppTextBold style={styles.dateEventBold}>
                                {moment(item.date).format('DD')}{"\n"}
                                {moment(item.date).format('MMMM')}
                            </AppTextBold>
                        </View>
                        :
                        <></>
                }
            </View>
        </AppDrug>
    )
}

const styles = StyleSheet.create({
    ...FAVORITE_ITEM_STYLE,
    dateEventThin: {
        marginTop: 5,
        marginBottom: 0,
        fontSize: 14,
        textAlign: "center"
    },
    dateEventBold: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 14,
        textAlign: "center"
    }
})
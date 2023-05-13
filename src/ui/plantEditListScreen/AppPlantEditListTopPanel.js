import React from "react"
import {AppText} from "../AppText";
import {ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {LinkTo, SHADOW} from "../../../global";
import {THEME} from "../../../theme";
import {Path, Rect, Svg} from "react-native-svg";
import {AppTextBold} from "../AppTextBold";
import {useNavigation} from "@react-navigation/native";

export default ({data}) => {
    const navigation = useNavigation()
    return (
        <>
            <AppTextBold style={styles.title}>
                Анкета растения
            </AppTextBold>
            <AppText style={styles.nameTitle}>
                {data.name} {data.mark}
            </AppText>
            <ImageBackground
                style={styles.bg}
                source={{uri: data.photo}}
                resizeMode={"cover"}
            />
            <TouchableOpacity
                activeOpacity={1}
                style={styles.addBtn}
                onPress={() => {
                    LinkTo("PlantFormPageScreen", {plantId: data.plant_id}, navigation)
                }}
            >
                <Svg width="93" height="93" style={{position: "relative", left: 5, zIndex: 1, elevation: 1000000}} viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Rect x="15" y="15" width="48" height="48" rx="24" fill="#F5F5F9"/>
                    <Path d="M34.1999 33.375C34.5332 33.375 34.7999 33.125 34.7999 32.8125V30.5626C34.7999 30.2501 34.5332 30.0001 34.1999 30.0001C33.8665 30.0001 33.5999 30.2501 33.5999 30.5626V32.8125C33.5999 33.125 33.8665 33.375 34.1999 33.375Z" fill="#5382D8"/>
                    <Path d="M41.4003 33.375C41.7336 33.375 42.0003 33.125 42.0003 32.8125V30.5626C42.0003 30.2501 41.7336 30.0001 41.4003 30.0001C41.067 30.0001 40.8003 30.2501 40.8003 30.5626V32.8125C40.8003 33.125 41.067 33.375 41.4003 33.375Z" fill="#5382D8"/>
                    <Path d="M36.6002 33.375C36.9336 33.375 37.2002 33.125 37.2002 32.8125V30.5626C37.2002 30.2501 36.9336 30.0001 36.6002 30.0001C36.2669 30.0001 36.0002 30.2501 36.0002 30.5626V32.8125C36.0002 33.125 36.2669 33.375 36.6002 33.375Z" fill="#5382D8"/>
                    <Path d="M38.9999 33.375C39.3332 33.375 39.5999 33.125 39.5999 32.8125V30.5626C39.5999 30.2501 39.3332 30.0001 38.9999 30.0001C38.6666 30.0001 38.3999 30.2501 38.3999 30.5626V32.8125C38.3999 33.125 38.6666 33.375 38.9999 33.375Z" fill="#5382D8"/>
                    <Path d="M43.7997 33.375C44.133 33.375 44.3997 33.125 44.3997 32.8125V30.5626C44.3997 30.2501 44.133 30.0001 43.7997 30.0001C43.4664 30.0001 43.1997 30.2501 43.1997 30.5626V32.8125C43.1997 33.125 43.4664 33.375 43.7997 33.375Z" fill="#5382D8"/>
                    <Path d="M46.8 31.1253H45.6V32.8128C45.6 33.7503 44.8 34.5003 43.8 34.5003C43.3333 34.5003 42.9333 34.344 42.6 34.0628C42.2667 34.344 41.8667 34.5003 41.4 34.5003C40.9333 34.5003 40.5333 34.344 40.2 34.0628C39.8667 34.344 39.4667 34.5003 39 34.5003C38.5333 34.5003 38.1333 34.344 37.8 34.0628C37.4667 34.344 37.0667 34.5003 36.6 34.5003C36.1333 34.5003 35.7333 34.344 35.4 34.0628C35.0667 34.344 34.6667 34.5003 34.2 34.5003C33.2 34.5003 32.4 33.7503 32.4 32.8128V31.1253H31.2C30.5333 31.1253 30 31.6253 30 32.2503V46.8751C30 47.5001 30.5333 48.0001 31.2 48.0001H46.8C47.4667 48.0001 48 47.5001 48 46.8751V32.2503C48 31.6253 47.4667 31.1253 46.8 31.1253ZM44.4 44.6251H33.6V43.5002H44.4V44.6251ZM44.4 42.3752H33.6V41.2502H44.4V42.3752ZM44.4 40.1252H33.6V39.0002H44.4V40.1252ZM44.4 37.8752H33.6V36.7502H44.4V37.8752Z" fill="#5382D8"/>
                </Svg>
                <View style={styles.addBtnIcon}></View>
                <AppTextBold style={styles.addBtnText}>
                    Новая анкета
                </AppTextBold>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    addBtn: {
       width: 120,
       marginTop: -45,
       marginLeft: "auto",
       marginRight: "auto",
       justifyContent: "center",
       alignItems: "center",
       position: "relative"
   },
    addBtnIcon: {
       position: "absolute",
       left: "50%",
       top: 15,
       width: 48,
       height: 48,
       borderRadius: 24,
       marginLeft: -26,
       backgroundColor: "#fff",
       ...SHADOW
   },
    addBtnText: {
       marginTop: -25,
       marginBottom: 0,
       color: THEME.BLUE
    },
    nameTitle: {
       textAlign: "center",
       fontSize: 14
   },
       title: {
       textAlign: "center",
       marginTop: 20,
       marginBottom: 20
   },
       bg: {
       width: "100%",
       height: 160,
       marginBottom: 5
   }
})
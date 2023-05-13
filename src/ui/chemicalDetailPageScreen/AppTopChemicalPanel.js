import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {Svg, Path} from "react-native-svg";
import {AppText} from "../AppText";
import {THEME} from "../../../theme";
import AppVote from "../AppVote";
import {AppTextItalic} from "../AppTextItalic";
import {LinkTo} from "../../../global";

export default ({data, navigation}) => {
    const Item = ({children, active = false, onPress}) => {
        const back = (active) ? THEME.SLIDER_BG : "transparent"
        //const fill = (active) ? "" : "#60A04E"
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{...styles.block, backgroundColor: back}}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
    return (
        <View
            style={styles.wrap}
        >
            <Item
                active={true}
                onPress={() => {
                    LinkTo("ShopsPageScreen", {
                        type: "chemical",
                        chemicalId: data.id
                    }, navigation)
                }}
            >
                <Svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M9.33735 15.8005C8.15347 15.8005 7.19727 16.7567 7.19727 17.9406C7.19727 19.1245 8.15347 20.0807 9.33735 20.0807C10.5212 20.0807 11.4774 19.1245 11.4774 17.9406C11.4774 16.7567 10.5212 15.8005 9.33735 15.8005ZM9.33735 18.6692C8.92754 18.6692 8.60881 18.3504 8.60881 17.9406C8.60881 17.5308 8.92754 17.2121 9.33735 17.2121C9.74715 17.2121 10.0659 17.5308 10.0659 17.9406C10.0659 18.3504 9.74715 18.6692 9.33735 18.6692Z" fill="#E96C6C"/>
                    <Path d="M16.5317 15.8005C15.3478 15.8005 14.3916 16.7567 14.3916 17.9406C14.3916 19.1245 15.3478 20.0807 16.5317 20.0807C17.7156 20.0807 18.6718 19.1245 18.6718 17.9406C18.6718 16.7567 17.7156 15.8005 16.5317 15.8005ZM16.5317 18.6692C16.1219 18.6692 15.8031 18.3504 15.8031 17.9406C15.8031 17.5308 16.1219 17.2121 16.5317 17.2121C16.9415 17.2121 17.2602 17.5308 17.2602 17.9406C17.2602 18.3504 16.9415 18.6692 16.5317 18.6692Z" fill="#E96C6C"/>
                    <Path d="M3.87036 1.45708L3.64269 0H0.728539C0.318736 0 0 0.318736 0 0.728539C0 1.13834 0.318736 1.45708 0.728539 1.45708H2.41328L4.3257 12.9771C4.3257 13.7512 4.96317 14.4342 5.78278 14.4342H20.1714C20.9455 14.4342 21.6285 13.7967 21.6285 12.9771L23.0856 2.91416V1.45708H3.96143H3.87036Z" fill="#E96C6C"/>
                </Svg>
                <View style={styles.blockText}>
                    <AppText style={styles.text}>
                        Где купить?
                    </AppText>
                </View>
            </Item>

            <Item>
                <AppVote starWidth={12} starHeight={12} style={styles.vote} initiate={data.rating} />
                <View style={styles.blockText}>
                    <AppTextItalic style={{...styles.italic, fontSize: 10}}>
                        Рейтинг химиката
                    </AppTextItalic>
                    <AppText style={{...styles.text, fontSize: 10, marginTop: 0}}>
                        Артикул {data.articul}
                    </AppText>
                </View>
            </Item>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    block: {
        width: "30%",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        height: 85
    },
    vote: {
        width: 80
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
import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {AppText} from "../AppText";
import AppVote from "../AppVote";
import {THEME} from "../../../theme";
import {LinkTo} from "../../../global";
import {useNavigation} from "@react-navigation/native";

export default
    ({
        style,
        text,
        initiate,
        onResult,
        outside = false,
        active = true,
        starWidth = 16,
        starHeight= 16,
        typeLink = false,
        typeParams = {}
    }) => {

    const navigation = useNavigation()

    const linkerHandler = () => {
        switch (typeLink) {
            case "chemical":
                LinkTo("ChemicalDetailPageScreen", typeParams, navigation)
                break
            case "pest":
                LinkTo("PestDetailPageScreen", typeParams, navigation)
                break
        }
    }

    return (
        <View style={{...styles.wrap, ...style}}>
            {
                text
                    ?
                    <View style={styles.textWrap}>
                        {
                            !typeLink
                                ?
                                <AppText style={styles.text}>
                                    {text}
                                </AppText>
                                :
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        linkerHandler()
                                    }}
                                >
                                    <AppText style={styles.link}>
                                        {text}
                                    </AppText>
                                </TouchableOpacity>
                        }
                    </View>
                    :
                    <></>
            }
            <AppVote
                starHeight={starWidth}
                starWidth={starHeight}
                outside={outside}
                initiate={initiate}
                style={styles.vote}
                active={active}
                onResult={result => {
                    if(onResult) onResult(result)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        justifyContent: "space-between",
        textAlign: "center",
        alignItems: "center",
        marginTop: 8,
        marginBottom: 8
    },
    vote: {
        width: "100%"
    },
    textWrap: {
        flexDirection: "row",
        paddingBottom: 10
    },
    text: {
        textAlign: "center",
        marginBottom: 5,
        fontSize: 14
    },
    link: {
        textAlign: "center",
        marginBottom: 5,
        fontSize: 16,
        color: THEME.BLUE,
        textDecorationColor: THEME.BLUE,
        textDecorationLine: "underline"
    }
})
import React from "react"
import {View, StyleSheet} from "react-native"
import {Svg, Path, Circle} from "react-native-svg"
import {AppText} from "../AppText";
import {AppTextBold} from "../AppTextBold";

export default ({Icon, title, text}) => {
    return (
        <View style={styles.block}>
            {
                title != ""
                    ?
                    <AppTextBold style={styles.title}>
                        {title}
                    </AppTextBold>
                    :
                    <></>
            }
            <View style={styles.value}>
                {
                    Icon
                        ?
                        <View style={styles.icon}>
                            <Icon/>
                        </View>
                        :
                        <></>
                }
                <View style={styles.textWrap}>
                    <AppText style={styles.text}>
                        {text}
                    </AppText>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        marginBottom: 0
    },
    value: {
        flexDirection: "row",
        //alignItems: "center",
        justifyContent: "center",
        marginTop: 0
    },
    icon: {
        paddingRight: 20,
        paddingTop: 13
    },
    text: {
        marginTop: 10,
        marginBottom: 10
    }
})
import React from "react"
import {View, StyleSheet} from "react-native"
import {THEME} from "../../../theme";
import {AppTextBold} from "../AppTextBold";

export default ({title}) => {
    return (
        <>
            {
                title
                    ?
                    <View style={styles.sort}>
                        <View style={styles.sortWrap}>
                            <AppTextBold style={styles.title}>
                                {title}
                            </AppTextBold>
                        </View>
                    </View>
                    :
                    <></>
            }
        </>
    )
}

const styles = StyleSheet.create({
    sort: {
        padding: 20
    },
    sortWrap: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: THEME.FOOTER_BG,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        marginTop: 0,
        marginBottom: 0,
        color: "white"
    }
})
import React, {useLayoutEffect, useEffect} from "react"
import {View, StyleSheet, ImageBackground} from "react-native"
import {SHADOW} from "../../../global";
import {AppTextBold} from "../AppTextBold";

export default ({children, title, style}) => {
    return (
        <View style={{...styles.wrap, ...style}}>
            <View style={styles.elemWrapper}>
                {children}
            </View>
            {
                title
                    ?
                <View style={styles.titleWrapper}>
                    <AppTextBold style={styles.text}>
                        {title}
                    </AppTextBold>
                </View>
                    :
                    <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: "#fff",
        borderRadius: 8,
        ...SHADOW
    },
    text: {
        paddingLeft: 10,
        paddingRight: 10
    }
})
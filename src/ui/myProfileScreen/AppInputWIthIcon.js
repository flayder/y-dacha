import React, {useState} from "react"
import {View, StyleSheet, ImageBackground, TouchableOpacity} from "react-native"
import AppInput from "../formUI/AppInput";
import {THEME} from "../../../theme";

export default (
    {
        screenWidth,
        Icon,
        placeholder,
        editable = true,
        value,
        onResult,
        activable = false,
        defaultIconColor = THEME.GREY,
        activeIconColor = THEME.BLUE
    }) => {
    let color = defaultIconColor
    if(value)
        color = activeIconColor
    return (
        <View style={styles.wrap}>
            {
                Icon
                    ?
                    <View style={styles.icon}>
                        {Icon()}
                    </View>
                    :
                    <></>
            }
            <View style={{width: screenWidth - 90}}>
                <AppInput
                    placeholder={placeholder}
                    value={value}
                    editable={editable}
                    outline={true}
                    inputStyle={{borderColor: color}}
                    onResult={text => {
                        if(onResult) onResult(text)
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: -10,
        marginBottom: -10
    },
    icon: {
        width: 50
    }
})
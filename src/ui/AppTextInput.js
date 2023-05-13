import React from "react"
import {TextInput, StyleSheet} from "react-native"
import {THEME} from "../../theme";


export default (
    {
        style,
        onPressText,
        placeholder,
        onFocus,
        onBlur,
        value = "",
        multiline = false
    }) => {
    return <TextInput
        style={{...styles.input, ...style}}
        multiline={multiline}
        placeholderTextColor={THEME.GREY}
        onFocus={() => {
            if(onFocus) onFocus(true)
        }}
        onBlur={() => {
            if(onBlur) onBlur(true)
        }}
        onChangeText={text => {
            if(onPressText)
                    onPressText(text)
            }
        }
        value={value}
        placeholder={placeholder}
    />
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#000",
        borderStyle: "solid",
        padding: 8,
        borderRadius: 8,
        width: "100%",
        fontFamily: "ptsans-regular",
        fontSize: 16
    },
})
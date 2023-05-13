import React, {useState} from "react"
import {StyleSheet, View} from "react-native"
import AppInput from "./AppInput";
import {THEME} from "../../../theme";
import {AppText} from "../AppText";

export default (
    {
        style,
        checkbox = false,
        PlaceholderWithIcon,
        placeholderWithIconText,
        inputStyle,
        placeholder,
        placeholderStyle,
        outline = false,
        value = "",
        bottomPlaceholder = false,
        editable = true,
        onResult
    }) => {

    const [text, setText] = useState(value)
    if(outline && value != text) setText(value)
    return (
        <View style={styles.wrap}>
            <AppInput
                style={{...styles.input, ...style}}
                checkbox={checkbox}
                inputStyle={{...styles.inputStyle, ...inputStyle}}
                placeholder={(!bottomPlaceholder) ? placeholder : ""}
                editable={editable}
                value={text}
                outline={true}
                onResult={val => {
                    if(onResult) onResult(val)
                    setText(val)
                }}
            />
            {
                text || bottomPlaceholder
                    ?
                    <AppText style={{...styles.placeholder, ...placeholderStyle}}>{placeholder}</AppText>
                    :
                    <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    placeholder: {
        color: THEME.GREY_TEXT,
        marginTop: -10,
        fontSize: 14
    },
    inputStyle: {
        borderColor: "transparent",
        borderBottomWidth: 1,
        borderRadius: 0,
        paddingLeft: 0,
        paddingRight: 0,
        borderBottomColor: THEME.GREY_TEXT
    }
})
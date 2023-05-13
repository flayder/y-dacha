import React, {useState, useRef} from "react"
import {View, TextInput, StyleSheet, TouchableOpacity} from "react-native"
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
        outline = false,
        value = "",
        onResult,
        editable = true
    }) => {
    const checkboxClass = checkbox ? {textAlignVertical: "top", height: 80} : {}
    const [focused, setFocused] = useState(false)
    const [text, setText] = useState(value)
    const ref = useRef()
    if(outline && value != text) setText(value)
    return (
        <View style={{...styles.wrap, ...style}}>
            {
                PlaceholderWithIcon && !focused && text == ""
                    ?
                    <TouchableOpacity
                        style={styles.icon}
                        activeOpacity={1}
                        onPress={() => {
                            //setFocused(true)
                            //console.log('ref.current', focused, ref.current)
                            if(ref.current !== undefined)
                                ref.current.focus()
                        }}
                    >
                        <PlaceholderWithIcon />
                        <View style={{width: 10}}></View>
                        <AppText style={styles.placeholderText}>
                            {placeholderWithIconText}
                        </AppText>
                    </TouchableOpacity>
                    :
                    <></>
            }
            <TextInput
                style={{...styles.input, ...checkboxClass, ...inputStyle}}
                placeholder={placeholder}
                multiline={checkbox}
                ref={ref}
                editable={editable}
                placeholderTextColor={THEME.GREY_TEXT}
                onBlur={() => {
                    if(PlaceholderWithIcon) setFocused(false)
                }}
                onChangeText={value => {
                    setText(value)
                    if(onResult) onResult(value)
                }}
                value={(text && text != null && text != 'null') ? text : ""}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        width: "100%",
        position: "relative"
    },
    placeholderText: {
        color: THEME.GREY_TEXT,
        marginTop: 0,
        marginBottom: 0
    },
    icon: {
        position: "absolute",
        left: 0,
        top: "50%",
        marginTop: -30,
        zIndex: 9,
        width: "100%",
        height: 60,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: THEME.GREY_TEXT,
        borderRadius: 8,
        width: "100%",
        padding: 10,
        paddingTop: 7,
        paddingBottom: 7,
        marginTop: 15,
        marginBottom: 15
    }
})
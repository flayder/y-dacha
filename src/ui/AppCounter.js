import React, {useState, useRef} from "react"
import {View, StyleSheet, TextInput} from "react-native"
import {TouchableOpacity} from "react-native-gesture-handler"
import {AppText} from "./AppText";
import {Svg, Path} from "react-native-svg";
import {THEME} from "../../theme";

export default (
    {
        style,
        valueIs = 0,
        editable = true,
        outline = false,
        initColor = THEME.BLUE,
        inputStyle,
        btnStyle,
        textAfter = "",
        onResult,
        maxCount = 0
    }
    ) => {
    let clearInterval
    const clearInt = (num) => {
        let str = num + ""
        //console.log('strstr', str)
        if(str.length > 1 && parseInt(str[0]) == 0) str = str.substr(1)
        //console.log('numnumnum', str.replace(/\D/, ""))
        return parseInt(str.replace(/\D/, ""))
    }
    const changed = useRef(true)
    const [value, setValue] = useState(valueIs ?? 0)
    //console.log('valueIsvalue', outline, value)
    if(changed.current && outline && valueIs != value) setValue(valueIs)
    //console.log('sss', value, valueIs)
    try {
        return (
            <View style={{...style}}>
                <View style={styles.wrap}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{...styles.btn, ...btnStyle, left: 0}}
                        onPressIn={() => {
                            //console.log('value', onResult, editable)
                            if(editable) {
                                changed.current = false
                                const val = clearInt(value) - 1
                                if(maxCount > 0 && maxCount <= val) {
                                    setValue(val)
                                    if(onResult) onResult(val)
                                } else if(maxCount == 0) {
                                    setValue(val)
                                    if(onResult) onResult(val)
                                }

                            }
                        }}
                    >
                        <Svg width="11" height="3" viewBox="0 0 11 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path fillRule="evenodd" clipRule="evenodd" d="M0.5 1.5C0.5 1.15482 0.779822 0.875 1.125 0.875H9.875C10.2202 0.875 10.5 1.15482 10.5 1.5C10.5 1.84518 10.2202 2.125 9.875 2.125H1.125C0.779822 2.125 0.5 1.84518 0.5 1.5Z" fill={initColor}/>
                        </Svg>
                    </TouchableOpacity>
                    <TextInput
                        style={{...styles.input, ...inputStyle}}
                        placeholder={value + textAfter}
                        placeholderTextColor={THEME.GREY_TEXT}
                        value={value}
                        editable={editable}
                        keyboardType={"numeric"}
                        onChangeText={num => {
                            //console.log('num', clearInt(num))
                            changed.current = true
                            try {
                                const val =  clearInt(num)
                                if(0 <= val) {
                                    setValue(val)
                                } else
                                    setValue(0)

                                if(onResult) onResult(val)
                            } catch (e) { console.log('okokko', e)}
                        }}
                    />
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{...styles.btn, ...btnStyle, right: 0}}
                        onPressIn={() => {

                            if(editable) {
                                changed.current = false
                                const val = clearInt(value) + 1
                                //console.log('value', val)
                                setValue(val)
                                if(onResult) onResult(val)

                            }
                        }}
                    >
                        <Svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path fillRule="evenodd" clipRule="evenodd" d="M5.5 0.5C5.84518 0.5 6.125 0.779822 6.125 1.125V9.875C6.125 10.2202 5.84518 10.5 5.5 10.5C5.15482 10.5 4.875 10.2202 4.875 9.875V1.125C4.875 0.779822 5.15482 0.5 5.5 0.5Z" fill={initColor}/>
                            <Path fillRule="evenodd" clipRule="evenodd" d="M0.5 5.5C0.5 5.15482 0.779822 4.875 1.125 4.875H9.875C10.2202 4.875 10.5 5.15482 10.5 5.5C10.5 5.84518 10.2202 6.125 9.875 6.125H1.125C0.779822 6.125 0.5 5.84518 0.5 5.5Z" fill={initColor}/>
                        </Svg>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } catch (e) {return <></>}
}
const styles = StyleSheet.create({
    wrap: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        minWidth: 60,
        textAlign: "center",
        paddingLeft: 5,
        paddingRight: 5
    },
    btn: {
        // position: "absolute",
        // top: "50%",
        // marginTop: -25,
        width: 30,
        height: 50,
        borderRadius: 6,
        //backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        borderColor: THEME.BLUE,
        borderStyle: "solid",
        borderWidth: 1,
        zIndex: 999,
        elevation: 999
    }
})
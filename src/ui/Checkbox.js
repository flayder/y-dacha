import React, {useState, useEffect} from "react";
import {StyleSheet, TouchableOpacity} from "react-native"
import {THEME} from "../../theme";
import {Svg, Rect, Path} from "react-native-svg";

export default ({onChange, active = null, disabled = false, style, opacity= .6, color = THEME.BLUE, size = 30}) => {
    const [activity, isActive] = useState()

    const changeHandler = () => {
        isActive(!activity)
        if(onChange)
            onChange(!activity)
    }

    useEffect(() => {
        isActive(active)
    }, [active])

    return (
        <TouchableOpacity style={{...styles.checkbox, ...style}} disabled={disabled} activeOpacity={opacity} onPress={changeHandler}>
            {!activity
                ?
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke="#5382D8"/>
                </Svg>
                :
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Rect x="0.5" y="0.5" width="19" height="19" rx="1.5" fill="#5382D8" stroke="#5382D8"/>
                    <Path fillRrule="evenodd" clipRule="evenodd" d="M8 15L3 10.1923L4.4 8.84615L8 12.3077L15.6 5L17 6.34615L8 15Z" fill="#EAEAEA"/>
                </Svg>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    checkbox: {
        width: 20,
        height: 20
    }
})

import React, {useState, useEffect} from "react"
import {StyleSheet, View, Platform} from "react-native"
import SWGImage from "expo-svg-uri";
import {AppText} from "./AppText";
import Checkbox from "./Checkbox";
import {THEME} from "../../theme";

export default ({label, style, svg, onChange, id, color = THEME.BLUE, defaultColor= "#000", conditionInit = false}) => {
    const [condition, setCondition] = useState()

    const clickHandle = (result) => {
        if(onChange)
            onChange({
                result: !condition,
                id
            })
        setCondition(result)
    }

    useEffect(() => {
        if(conditionInit && onChange) onChange({
            result: true,
            id
        })
        setCondition(conditionInit)
    }, [conditionInit])

    return (
        <View style={{...styles.line, ...style}}>
            <Checkbox onChange={clickHandle} active={condition} />
            <View style={styles.lineWrap}>
                {condition
                    ?
                    <>
                        <AppText style={{...styles.text, color: color}}>
                            {label}
                        </AppText>
                    </>
                    :
                    <>
                        <AppText style={{...styles.text, color: defaultColor}}>
                            {label}
                        </AppText>
                    </>
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    line: {
        width: "100%",
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        marginTop: 0,
        marginBottom: 0,
        paddingRight: 10,
        paddingLeft: 15
    },
    lineWrap: {
        alignItems: "center",
        flexDirection: "row"
    },
})
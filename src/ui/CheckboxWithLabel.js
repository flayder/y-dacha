import React, {useState, useEffect} from "react"
import {StyleSheet, View, Platform} from "react-native"
import SWGImage from "expo-svg-uri";
import {AppText} from "./AppText";
import Checkbox from "./Checkbox";
import {THEME} from "../../theme";

export default (
    {
        label,
        svg,
        style,
        onChange,
        color = THEME.BLUE,
        defaultColor= "#000",
        conditionInit = null,
        reversed = false,
        textStyle,
        disabled = false,
        iconFunc
    }) => {
    const [condition, setCondition] = useState()

    const clickHandle = (result) => {
        if(onChange)
            onChange(result)
        setCondition(result)
    }

    useEffect(() => {
        setCondition(conditionInit)
    }, [conditionInit])

    return (
        <View style={{...styles.line, ...style}}>
            {
                reversed
                    ?
                    <Checkbox
                        onChange={clickHandle}
                        disabled={disabled}
                        active={condition}
                    />
                    :
                    <></>
            }
            {
                !iconFunc
                    ?
                    <View style={styles.lineWrap}>
                        {condition
                            ?
                            <>
                                <SWGImage fill={color} source={svg} />
                                <AppText style={{...styles.text, ...textStyle, color: color}}>
                                    {label}
                                </AppText>
                            </>
                            :
                            <>
                                <SWGImage source={svg}/>
                                <AppText style={{...styles.text, ...textStyle,  color: defaultColor}}>
                                    {label}
                                </AppText>
                            </>
                        }

                    </View>
                    :
                    <View style={styles.lineWrap}>
                        {condition
                            ?
                            <>
                                {iconFunc(color)}
                                <AppText style={{...styles.text, ...textStyle, color: color}}>
                                    {label}
                                </AppText>
                            </>
                            :
                            <>
                                {iconFunc()}
                                <AppText style={{...styles.text, ...textStyle,  color: defaultColor}}>
                                    {label}
                                </AppText>
                            </>
                        }

                    </View>
            }
            {
                !reversed
                    ?
                    <Checkbox
                        disabled={disabled}
                        onChange={clickHandle}
                        active={condition}
                    />
                    :
                    <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    line: {
        paddingTop: 10,
        paddingBottom: 10,
        //borderBottomWidth: 1,
        borderStyle: "solid",
        borderBottomColor: THEME.GREY,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    text: {
        paddingLeft: 40,
        fontSize: 14
    },
    lineWrap: {
        alignItems: "center",
        flexDirection: "row"
    },
})
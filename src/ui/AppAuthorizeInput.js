import React, {useState, useEffect, useRef} from "react"
import {StyleSheet, TextInput, View, TouchableOpacity} from "react-native"
import SWGImage from "expo-svg-uri"
import {THEME} from "../../theme";
import {AppText} from "./AppText";
import {Svg, Path} from "react-native-svg";

export const AppAuthorizeInput = (
    {
        onChangeText,
        onResult,
        preCorrect,
        onCorrect,
        rule,
        value,
        type,
        ruleType="exp",
        placeholder="",
        error= "",
        autoCorrect = true
    }) => {
    const [textInput, setText] = useState("")
    const [correct, setCorrect] = useState(null)
    const [pass, setPass] = useState(type === "password")
    const [errorMessage, setErrorMessage] = useState(error ?? "")

    //useEffect(() => {
    //
    //}, [rule, error, correct])

    const effectInit = text => {
        if(text.length > 0) {
            const cor = rule && ruleType === "exp" && new RegExp(rule).test(text) || rule && ruleType === "str" && rule === text || !rule
            if (cor) {
                if(preCorrect) {
                    preCorrect(text).then(param => {
                        if(param.hasOwnProperty('error')) {
                            setErrorMessage(param.error)
                            setCorrect(false)
                        }
                    })
                }
                setCorrect(true)
            }
            else {
                setCorrect(false)
            }
        } else {
            setCorrect(null)
        }
        if(onChangeText) onChangeText(text)
    }

    let color = {}
    let errorText = THEME.GREY

    if(correct) {
        color = {borderBottomColor: "green"}
        errorText = THEME.GREY
    } else if(correct !== null && !correct) {
        color = {borderBottomColor: "red"}
        errorText = "red"
    } else {
        color = {borderBottomColor: THEME.GREY}
        errorText = THEME.GREY
    }

    //console.log('type', type)

    useEffect(() => {
        if(onCorrect) onCorrect(correct)
    },[correct])

    const Icon = ({style, width= 25, height = 25}) => {
        if(correct !== null && !correct) {
            return <View style={style}>
                <Svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path fillRule="evenodd" clipRule="evenodd" d="M13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893Z" fill="#E96C6C"/>
                    <Path fillRule="evenodd" clipRule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="#E96C6C"/>
                </Svg>
            </View>
        } else if((correct || correct === null ) && type === "password") {
            return (
                <TouchableOpacity style={{...style, bottom: styles.icon.bottom - 8, height: styles.icon.height + 10}} activeOpacity={.8} onPress={() => {
                    setPass(!pass)
                }}>
                    <View style={style}>
                        <Svg width={width} height={height} viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 2C5.72727 2 1.65136 4.59167 0 8.25C1.65136 11.9083 5.72727 14.5 10.5 14.5C15.2727 14.5 19.3486 11.9083 21 8.25C19.3486 4.59167 15.2727 2 10.5 2ZM10.5 12.4167C7.86543 12.4167 5.72725 10.55 5.72725 8.24999C5.72725 5.94999 7.86543 4.08333 10.5 4.08333C13.1345 4.08333 15.2727 5.94999 15.2727 8.24999C15.2727 10.55 13.1345 12.4167 10.5 12.4167ZM7.63634 8.25C7.63634 6.86667 8.91543 5.75 10.5 5.75C12.0845 5.75 13.3636 6.86667 13.3636 8.25C13.3636 9.63333 12.0845 10.75 10.5 10.75C8.91543 10.75 7.63634 9.63333 7.63634 8.25Z" fill="#BDBDBD"/>
                            <Path d="M1.74797 2.15958C1.33488 1.79301 1.29716 1.16097 1.66373 0.747878C2.0303 0.334785 2.66234 0.29707 3.07543 0.663638L18.6937 14.5229C19.1068 14.8895 19.1445 15.5215 18.7779 15.9346C18.4114 16.3477 17.7793 16.3854 17.3662 16.0188L1.74797 2.15958Z" fill="#BDBDBD"/>
                        </Svg>
                    </View>
                </TouchableOpacity>
            )
        } else if(correct) {
            return <View style={style}>
                <Svg width={width} height={height} viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M5.36667 10.6L1.34167 6.4L0 7.8L5.36667 13.4L16.8667 1.4L15.525 0L5.36667 10.6Z" fill="#60A04E"/>
                </Svg>
            </View>
        } else {
            return <></>
        }
    }

    const Placeholder = () => {
        if(correct || correct === null) return <>{placeholder}</>
        else return <>{errorMessage}</>
    }
    let interval
    return (
        <View style={styles.wrap}>
            <TextInput
                secureTextEntry={pass}
                autoCorrect={autoCorrect}
                //keyboardType={"ascii-capable"}
                style={{...styles.input, ...color}}
                onFocus={() => {
                    setCorrect(correct)
                }}
                onChangeText={text => {
                    if(onResult) onResult(text)
                    setText(text)
                    effectInit(text)
                // clearInterval(interval)
                // interval = setTimeout(() => {
                //     effectInit(text)
                //
                // }, 500)
                }}
                value={value}
            />
            <Icon style={styles.icon} />
            <AppText style={{...styles.placeholder, color: errorText}}>
                <Placeholder />
            </AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        width: "100%",
        position: "relative",
        marginBottom: 30
    },
    input: {
        width: "100%",
        borderBottomWidth: 2,
        padding: 5,
        fontSize: 17,
        borderStyle: "solid",
        paddingRight: 32
    },
    icon: {
        width: 25,
        height: 20,
        position: "absolute",
        right: 0,
        bottom: 10,
        zIndex: 3
    },
    placeholder: {
        position: "absolute",
        fontSize: 16,
        top: "70%",
        left: 0
    }
})
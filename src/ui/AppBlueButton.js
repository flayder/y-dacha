import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import {AppShadow} from "@root/ui/AppShadow"
import {AppTextBold} from "./AppTextBold";
import InsetShadow from "react-native-inset-shadow";

export const AppBlueButton = (
    {
        children,
        onPress,
        disabled = false,
        style
    }) => {

    const [click, setClick] = useState(false)

    const shadow = {
        width:"101%",
        left: "-.5%",
        bottom: -5,
        height: 11,
        color:"#000",
        opacity: .2,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            activeOpacity={1}
            onPressIn={() => {
                setClick(true)
            }}
            onPressOut={() => {
                setClick(false)
            }}
        >
            {/*<AppShadow setting={shadow}>*/}
            {
                !click
                    ?
                    <View style={{...styles.wrap, ...style}}>
                        <LinearGradient
                            start={{x: 1, y: 0}} end={{x: 1, y: 1}}
                            colors={['#6C92F4', '#456BAE']}
                            style={styles.main}
                        >
                            <View style={{...styles.btn}}>
                                <AppTextBold style={styles.text}>
                                    {children}
                                </AppTextBold>
                            </View>
                        </LinearGradient>
                    </View>
                    :
                    <View style={{...styles.inset, ...style}}>
                        <InsetShadow>
                            <View>
                                <View style={{...styles.btn}}>
                                    <AppTextBold style={styles.text}>
                                        {children}
                                    </AppTextBold>
                                </View>
                            </View>
                        </InsetShadow>
                    </View>
            }
            {/*</AppShadow>*/}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowRadius: 4,
        shadowOpacity: .2,
        elevation: 5
    },
    main: {
        borderRadius: 8
    },
    btn: {
        height: 53,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 17
    },
    inset: {
        height: 53,
        backgroundColor: '#668FF3',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOpacity: 1,
    }
})
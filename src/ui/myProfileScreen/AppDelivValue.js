import React, {useState} from "react"
import {View, StyleSheet, TextInput, TouchableOpacity} from "react-native"
import {AppText} from "../AppText";
import {Svg, Path} from "react-native-svg";

export default ({value, onResult}) => {
    const [active, setActive] = useState(false)
    return (
        <View style={styles.wrap}>
            <View style={styles.inputName}>
                {
                    !active
                        ?
                        <AppText style={{marginTop: 0, marginBottom: 0}}>{value}₽</AppText>
                        :
                        <TextInput
                            value={value}
                            style={styles.input}
                            onBlur={() => {
                                setActive(false)
                            }}
                            onChangeText={val => {
                                if(onResult) onResult(val)
                            }}
                        />
                }
            </View>
            <TouchableOpacity
                style={styles.inputValue}
                activeOpacity={1}
                onPress={() => {
                    setActive(!active)
                }}
            >
                <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path fillRule="evenodd" clipRule="evenodd" d="M14.7563 2.19343C15.0813 2.51839 15.0813 3.04332 14.7563 3.36827L13.2315 4.89306L10.107 1.76849L11.6317 0.243704C11.7874 0.087682 11.9988 0 12.2192 0C12.4396 0 12.6509 0.087682 12.8066 0.243704L14.7563 2.19343ZM0 14.5834V12.0504C0 11.9338 0.0416609 11.8338 0.124983 11.7505L9.21539 2.66004L12.34 5.78461L3.24122 14.875C3.16623 14.9583 3.05791 15 2.94959 15H0.416609C0.183308 15 0 14.8167 0 14.5834Z" fill="#6C6C6C"/>
                </Svg>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        alignItems: "center",
        //backgroundColor: "red",
        width: "50%"
    },
    input: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 8,
        padding: 3,
        height: 22
    },
    inputName: {
        width: "100%",
        paddingRight: 10
    },
    inputValue: {
        padding: 20
    }
})
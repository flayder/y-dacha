import React, {useState} from "react"
import {View, StyleSheet, ImageBackground} from "react-native"
import AppInput from "../formUI/AppInput";
import {AppTextBold} from "../AppTextBold";
import CheckboxWithLabel from "../CheckboxWithLabel";

export default ({value, activeIs, onResult}) => {
    const [active, setActive] = useState(false)
    if(activeIs != active) setActive(activeIs)
    return (
        <View style={styles.wrap}>
            {/*{*/}
            {/*    active*/}
            {/*        ?*/}
            {/*        <>*/}
            {/*            */}
            {/*        </>*/}
            {/*        :*/}
            {/*        <></>*/}
            {/*}*/}
            <AppTextBold style={styles.title}>
                Адрес интернет-магазина
            </AppTextBold>
            <AppInput
                placeholder={"Введите адрес сайта"}
                value={value}
                onResult={text => {
                    if(onResult) onResult(text)
                }}
            />
            <View style={styles.checkbox}>
                <CheckboxWithLabel
                    label={"Наличие интернет-магазина"}
                    style={styles.checkboxInput}
                    conditionInit={active}
                    onChange={val => {
                        setActive(val)
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        marginBottom: 0
    },
    checkboxInput: {
        borderBottomColor: "transparent"
    },
    checkbox: {
        position: "relative",
        left: -20,
        width: 280,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: -20,
        marginBottom: -20
    }
})
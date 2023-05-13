import React, {useState} from "react"
import {StyleSheet, View} from "react-native";
import CheckboxWithLabel from "../CheckboxWithLabel";
import AppDelivValue from "./AppDelivValue";

export default ({item, result, onResult}) => {
    const [active, setActive] = useState(result.res)
    const [price, setPrice] = useState(result.price)
    return (
        <View style={styles.deliveryBlock}>
            <View style={styles.nameBlock}>
                <CheckboxWithLabel
                    label={item.name}
                    style={styles.checkbox}
                    reversed={true}
                    conditionInit={active}
                    textStyle={{width: "100%", paddingLeft: 20}}
                    onChange={val => {
                        if(onResult) onResult({
                            result: val,
                            price
                        })
                        setActive(val)
                    }}
                />
            </View>
            <View style={styles.valueBlock}>
                <AppDelivValue
                    value={price + ""}
                    onResult={price => {
                        if(onResult) onResult({
                            result: active,
                            price
                        })
                        setPrice(price)
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    checkbox: {
        borderBottomColor: "transparent",
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0
    },
    deliveryBlock: {
        flexDirection: "row",
        alignItems: "center",
        //backgroundColor: "red"
    },
    nameBlock: {
        width: "75%"
    },
    valueBlock: {
        width: "35%",
        justifyContent: "flex-end"
    }
})
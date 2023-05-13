import React, {useState, useEffect} from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import AppTextInput from "../AppTextInput";
import {AppBlueButton} from "../AppBlueButton";
import {AppFetch} from "../../AppFetch";
import {useNavigation} from "@react-navigation/native";
import {globalAlert} from "../../globalHeaders";

export default () => {
    const navigation = useNavigation()
    const [text, setText] = useState("")
    //console.log('text', text)
    return (
        <View>
            <AppTextInput
                style={styles.input}
                placeholder="Введите промокод"
                onPressText={text => {
                    setText(text)
                }}
                value={text}
            />
            <View style={{height: 20}}></View>
            <AppBlueButton
                onPress={async () => {
                    const response = await AppFetch.getWithToken("setCoupon", {
                        coupon: text
                    }, {}, navigation)
                    //console.log('setCoupon', response)
                    if(response.result) {
                        globalAlert({
                            title: response.data
                        })
                    } else {
                        globalAlert({
                            title: "Купон не был применен"
                        })
                    }
                }}
            >
                Применить промокод
            </AppBlueButton>
        </View>
    )
}

const styles = StyleSheet.create({

})

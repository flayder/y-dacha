import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {Months} from "../../../global";
import {Svg, Path} from "react-native-svg";
import {AppText} from "../AppText";
import moment from "moment";
import 'moment/locale/ru'

export default ({onResult, resultIs = moment()}) => {
    //const [month, setMonth] = useState(resultIs)
    const month = moment(resultIs)
    const [load, setLoad] = useState(false)

    const add = () => {
        const monthIs = month.add(1, 'months')
        //setMonth(monthIs)
        if(onResult) onResult(monthIs)
        setLoad(!load)
    }

    const sub = () => {
        const monthIs = month.subtract(1, 'months')
        //setMonth(monthIs)
        if(onResult) onResult(monthIs)
        setLoad(!load)
    }

    return (
        <View style={styles.wrap}>
            <TouchableOpacity activeOpacity={1} onPress={() => {
                sub()
            }}>
                <Svg width="12" height="18" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M8.48528 1.41412L7.07107 -8.97297e-05L-8.43222e-08 7.07098L7.0711 14.1421L8.48531 12.7279L2.82842 7.07098L8.48528 1.41412Z" fill="black"/>
                </Svg>
            </TouchableOpacity>
            <AppText style={styles.title}>
                {month.format("MMMM")}
            </AppText>
            <TouchableOpacity activeOpacity={1} onPress={() => {
                add()
            }}>
                <Svg width="12" height="18" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M7.07237e-05 1.41412L1.41428 -8.97297e-05L8.48535 7.07098L1.41425 14.1421L3.81638e-05 12.7279L5.65693 7.07098L7.07237e-05 1.41412Z" fill="black"/>
                </Svg>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 100
    }
})
import React, {useState} from "react"
import {StyleSheet, TouchableOpacity, View} from "react-native";
import moment from "moment";
import 'moment/locale/ru'
import {Path, Svg} from "react-native-svg";
import {AppTextBold} from "../AppTextBold";


export default (
    {
        dateIs = moment(),
        arrowColor = "#000",
        titleColor = "#000",
        onResult
    }) => {
    const [currentDate, setCurrentDate] = useState(dateIs)
    return (
        <View style={styles.wrap}>
            <View style={{...styles.counter, width: 100}}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={async () => {
                        const time = (currentDate) ? moment(currentDate) : moment()
                        const res = time.subtract(1, 'days')
                        if(onResult) onResult(res.format('YYYY-MM-DD'))
                        setCurrentDate(res.format('YYYY-MM-DD'))
                    }}
                >
                    <Svg width="11" height="18" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M14.4 21.6L12 24L-5.24538e-07 12L12 5.24537e-07L14.4 2.39999L4.79997 12L14.4 21.6Z" fill={arrowColor}/>
                    </Svg>
                </TouchableOpacity>
                <AppTextBold style={{...styles.dateText, color: titleColor}}>
                    {(currentDate) ? moment(currentDate).format('DD') : moment().format('MMMM YYYY')}
                </AppTextBold>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={async () => {
                        const time = (currentDate) ? moment(currentDate) : moment()
                        const res = time.add(1, 'days')
                        if(onResult) onResult(res.format('YYYY-MM-DD'))
                        setCurrentDate(res.format('YYYY-MM-DD'))
                    }}
                >
                    <Svg width="11" height="18" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M-5.15079e-05 21.6L2.39994 24L14.3999 12L2.39988 5.24537e-07L-0.00010766 2.39999L9.59993 12L-5.15079e-05 21.6Z" fill={arrowColor}/>
                    </Svg>
                </TouchableOpacity>
            </View>
            <View style={{...styles.counter, width: 150}}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={async () => {
                        const time = (currentDate) ? moment(currentDate) : moment()
                        const res = time.subtract(1, 'months')
                        if(onResult) onResult(res.format('YYYY-MM-DD'))
                        setCurrentDate(res.format('YYYY-MM-DD'))
                    }}
                >
                    <Svg width="11" height="18" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M14.4 21.6L12 24L-5.24538e-07 12L12 5.24537e-07L14.4 2.39999L4.79997 12L14.4 21.6Z" fill={arrowColor}/>
                    </Svg>
                </TouchableOpacity>
                <AppTextBold style={{...styles.dateText, color: titleColor}}>
                    {(currentDate) ? moment(currentDate).format('MMMM') : moment().format('MMMM YYYY')}
                </AppTextBold>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={async () => {
                        const time = (currentDate) ? moment(currentDate) : moment()
                        const res = time.add(1, 'months')
                        if(onResult) onResult(res.format('YYYY-MM-DD'))
                        setCurrentDate(res.format('YYYY-MM-DD'))
                    }}
                >
                    <Svg width="11" height="18" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M-5.15079e-05 21.6L2.39994 24L14.3999 12L2.39988 5.24537e-07L-0.00010766 2.39999L9.59993 12L-5.15079e-05 21.6Z" fill={arrowColor}/>
                    </Svg>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 5,
        paddingBottom: 5
    },
    counter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})
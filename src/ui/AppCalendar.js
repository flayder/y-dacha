import {StyleSheet, TouchableOpacity, View} from "react-native";
import moment from "moment";
import {Path, Svg} from "react-native-svg";
import {AppTextBold} from "./AppTextBold";
import {AppText} from "./AppText";
import React, {useState} from "react";
import {getRandomKey} from "../../global";

export default () => {
    const [currentDate, setDate] = useState(activeDate)
    const generateDays = () => {
        const time = (currentDate) ? currentDate : new Date()

        const start = moment(time).startOf('month').startOf('isoWeek')
        const finish = isSunday(moment(time).startOf('month').add(1, 'months'))

        const elements = []
        while (Date.parse(start) < Date.parse(finish)) {
            //console.log(start.current, finish.current, Date.parse(start.current), Date.parse(finish.current))

            elements.push(
                <TouchableOpacity
                    activeOpacity={1}
                    key={getRandomKey()}
                    style={styles.dayText}
                >
                    <AppText style={styles.dayDate}>
                        {
                            start.month() == moment(time).month()
                                ?
                                start.format("DD")
                                :
                                <></>
                        }
                    </AppText>
                </TouchableOpacity>
            )

            start.add(1, 'days')
        }

        return elements
    }
    return (
        <View style={styles.wrap}>
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        const time = (currentDate) ? moment(currentDate) : moment()
                        setDate(time.subtract(1, 'months'))
                    }}
                >
                    <Svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M14.4 21.6L12 24L-5.24538e-07 12L12 5.24537e-07L14.4 2.39999L4.79997 12L14.4 21.6Z" fill="#BDBDBD"/>
                    </Svg>
                </TouchableOpacity>
                <AppTextBold style={styles.dateText}>
                    {(currentDate) ? moment(currentDate).format('MMMM YYYY') : moment().format('MMMM YYYY')}
                </AppTextBold>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        const time = (currentDate) ? moment(currentDate) : moment()
                        setDate(time.add(1, 'months'))
                    }}
                >
                    <Svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M-5.15079e-05 21.6L2.39994 24L14.3999 12L2.39988 5.24537e-07L-0.00010766 2.39999L9.59993 12L-5.15079e-05 21.6Z" fill="#BDBDBD"/>
                    </Svg>
                </TouchableOpacity>
            </View>
            <View style={styles.dayWrap}>
                <AppText style={styles.dayText}>
                    Пн
                </AppText>
                <AppText style={styles.dayText}>
                    Вт
                </AppText>
                <AppText style={styles.dayText}>
                    Ср
                </AppText>
                <AppText style={styles.dayText}>
                    Чт
                </AppText>
                <AppText style={styles.dayText}>
                    Пн
                </AppText>
                <AppText style={styles.dayText}>
                    Сб
                </AppText>
                <AppText style={styles.dayText}>
                    Вс
                </AppText>
                {
                    generateDays()
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({

})
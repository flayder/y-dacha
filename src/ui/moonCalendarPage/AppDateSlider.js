import React, {useState, useRef} from "react"
import {StyleSheet, TouchableOpacity, ScrollView} from "react-native"
import {AppText} from "../AppText";
import {THEME} from "../../../theme";
import moment from "moment";
import {getRandomKey} from "../../../global";

export default ({month = moment(), dateIs, onResult}) => {
    const [active, setActive] = useState(month.format("YYYY-MM-DD"))
    const ref = useRef()

    const generateDays = () => {
        const elements = []
        const momentClone = moment(month)
        const momentClone1 = moment(month)
        const monthBegin = momentClone.startOf('month')
        const monthEnd = momentClone1.endOf('month')
        //console.log(month, monthBegin, monthEnd)
        let day = 0
        let activeDay = 1
        while (monthBegin.valueOf() < monthEnd.valueOf()) {
            day++
            const activation = (active == monthBegin.format("YYYY-MM-DD")) ? styles.activeDay : {}

            if(active == monthBegin.format("YYYY-MM-DD")) {
                if(day - 5 > 1) {
                    setTimeout(() => {
                        ref.current.scrollTo({x: 45 * (day - 5)})
                    }, 500)
                }
            }
            elements.push(
                <TouchableOpacity
                    key={getRandomKey()}
                    activeOpacity={1}
                    style={{...styles.daySlider, ...activation}}
                    onPress={() => {
                        if(onResult) onResult(monthBegin)
                        setActive(monthBegin.format("YYYY-MM-DD"))
                    }}
                >
                    <AppText style={styles.daySliderText}>
                        {monthBegin.format("DD")}
                    </AppText>
                </TouchableOpacity>
            )
            monthBegin.add(1, 'days')
        }

        return elements
    }
    return (
        <ScrollView
            style={styles.dateSlider}
            contentContainerStyle={{paddingTop: 30, paddingBottom: 20}}
            horizontal={true}
            ref={ref}
        >
            {generateDays()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    dateSlider: {
        marginLeft: -10,
        marginRight: -10
    },
    daySlider: {
        width: 40,
        height: 40,
        backgroundColor: THEME.FOOTER_BG,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        marginLeft: 10,
        marginRight: 10
    },
    activeDay: {
        backgroundColor: THEME.BLUE,
        marginTop: -10
    },
    daySliderText: {
        color: "#fff",
        marginTop: 0,
        marginBottom: 0
    }
})
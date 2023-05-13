import React, {useState, useRef} from "react"
import {View, StyleSheet, TouchableOpacity, Platform} from "react-native"
import {Svg, Path} from "react-native-svg";
import moment from "moment"
import 'moment/locale/ru'
import {AppTextBold} from "./AppTextBold";
import {AppText} from "./AppText";
import {THEME} from "./../../theme";
import {getRandomKey, SHADOW} from "./../../global";

export default (
    {
        style,
        onResult,
        color = "#000",
        arrowColor = "#BDBDBD",
        titleColor = THEME.BLUE,
        activeDate = false,
        activeDateArr = false,
        activeDataArr = [],
        activeColor = THEME.FOOTER_BG,
        activeColorText = "#fff",
        outside = false
    }) => {
    const isSunday = (date) => {
        const day = date.day()

        if(day < 7 && day != 0) {
            date = date.add(8 - day, 'days')
        } else if (day == 0) {
            date = date.add(1, 'days')
        }

        return date
    }

    const [currentDate, setCurrentDate] = useState(activeDate)

    const equals = (array, array1) => {
        // if the other array is a falsy value, return
        if (!array)
            return false;

        // compare lengths - can save a lot of time
        if (array1.length != array.length)
            return false;

        for (var i = 0, l=array1.length; i < l; i++) {
            // Check if we have nested arrays
            if (array1[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!array1[i].equals(array[i]))
                    return false;
            }
            else if (array1[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    }
    //console.log('activeDate', activeDate)
    if(outside && Array.isArray(activeDate) && !equals(activeDate, currentDate)) {
        setCurrentDate(activeDate)
    }

    const generateDays = () => {
        const time = (activeDate) ? activeDate : new Date()

        const start = moment(time).startOf('month').startOf('isoWeek')
        const finish = isSunday(moment(time).startOf('month').add(1, 'months'))

        const elements = []
        while (Date.parse(start) < Date.parse(finish)) {
            const dateOf = start.format("YYYY-MM-DD")
            const activeClass = {
                backgroundColor: activeColor,
                borderRadius: 30
            }
            const colorClass = {
                color: activeColorText
            }

            const activeColorClass = {
                color: color
            }
            let activeIs,
                colorIs
            //console.log(start.current, finish.current, Date.parse(start.current), Date.parse(finish.current))
            if(!activeDateArr || activeDataArr.length == 0) {
                //console.log('heere', currentDate, dateOf)
                activeIs = (currentDate == dateOf) ? activeClass : {}
                colorIs = (currentDate == dateOf) ? colorClass : activeColorClass
            } else {
                //console.log('h111', activeDataArr.length, dateOf)
                //console.log('currentDate', currentDate)
                activeIs = (activeDataArr.includes(dateOf)) ? activeClass : {}
                colorIs = (activeDataArr.includes(dateOf)) ? colorClass : activeColorClass
            }

            if(start.month() == moment(time).month())
                elements.push(
                    <TouchableOpacity
                        activeOpacity={1}
                        key={getRandomKey()}
                        style={{...styles.dayText, ...styles.calendarItem}}
                        onPress={() => {
                            if(onResult) onResult(dateOf)
                            setCurrentDate(dateOf)
                        }}
                    >
                        <View style={styles.dayText}>
                            <View style={{...styles.dateWrap, ...activeIs}}>
                                <AppText style={{...styles.textDate, ...colorIs}}>
                                    {start.format("DD")}
                                </AppText>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            else
                elements.push(
                    <View
                        activeOpacity={1}
                        key={getRandomKey()}
                        style={{...styles.dayText, ...styles.calendarItem}}
                    >
                        <AppText style={styles.dayDate} />
                    </View>
                )

            start.add(1, 'days')
        }

        return elements
    }

    return (
        <View style={styles.container}>
            <View style={{...styles.wrap, ...style}}>
                <View style={styles.header}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={async () => {
                            const time = (currentDate) ? moment(currentDate) : moment()
                            const res = time.subtract(1, 'months')
                            setCurrentDate(res.format('YYYY-MM-DD'))
                        }}
                    >
                        <Svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M14.4 21.6L12 24L-5.24538e-07 12L12 5.24537e-07L14.4 2.39999L4.79997 12L14.4 21.6Z" fill={arrowColor}/>
                        </Svg>
                    </TouchableOpacity>
                    <AppTextBold style={{...styles.dateText, color: titleColor}}>
                        {(currentDate) ? moment(currentDate).format('MMMM YYYY') : moment().format('MMMM YYYY')}
                    </AppTextBold>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={async () => {
                            const time = (currentDate) ? moment(currentDate) : moment()
                            const res = time.add(1, 'months')
                            setCurrentDate(res.format('YYYY-MM-DD'))
                        }}
                    >
                        <Svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M-5.15079e-05 21.6L2.39994 24L14.3999 12L2.39988 5.24537e-07L-0.00010766 2.39999L9.59993 12L-5.15079e-05 21.6Z" fill={arrowColor}/>
                        </Svg>
                    </TouchableOpacity>
                </View>
                <View style={styles.dayWrap}>
                    <AppTextBold style={{...styles.dayText, color, ...styles.calendarTitleItem}}>
                        Пн
                    </AppTextBold>
                    <AppTextBold style={{...styles.dayText, color, ...styles.calendarTitleItem}}>
                        Вт
                    </AppTextBold>
                    <AppTextBold style={{...styles.dayText, color, ...styles.calendarTitleItem}}>
                        Ср
                    </AppTextBold>
                    <AppTextBold style={{...styles.dayText, color, ...styles.calendarTitleItem}}>
                        Чт
                    </AppTextBold>
                    <AppTextBold style={{...styles.dayText, color, ...styles.calendarTitleItem}}>
                        Пн
                    </AppTextBold>
                    <AppTextBold style={{...styles.dayText, color, ...styles.calendarTitleItem}}>
                        Сб
                    </AppTextBold>
                    <AppTextBold style={{...styles.dayText, color, ...styles.calendarTitleItem}}>
                        Вс
                    </AppTextBold>
                    {
                        generateDays()
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textDate: {
        marginTop: 0,
        marginBottom: 0
    },
    dateWrap: {
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center"
    },
    btn: {
        width: 220,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 14
    },
    calendarTitleItem: {
        height: 20
    },
    calendarItem: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 0,
        paddingBottom: 0
    },
    event: {
        height: 4,
        marginBottom: 2,
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto"
    },
    container: {
        paddingBottom: 20
    },
    wrap: {
        backgroundColor: "#fff"
    },
    dateText: {
        display: "flex",
        marginTop: 0,
        marginBottom: 0
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20
    },
    dayWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around"
    },
    dayText: {
        width: "14%",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 40
    },
    dayDate: {
        textAlign: "center",
        //height: 20
    },
    dayEvent: {
        textAlign: "center",
        fontSize: 10
    }
})
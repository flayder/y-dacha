import React, {useState, useRef} from "react"
import {View, StyleSheet, TouchableOpacity, Platform} from "react-native"
import {Svg, Path} from "react-native-svg";
import moment from "moment"
import 'moment/locale/ru'
import {AppTextBold} from "../AppTextBold";
import {AppText} from "../AppText";
import AppButton from "../AppButton";
import {THEME} from "../../../theme";
import {getRandomKey, SHADOW} from "../../../global";
import {useDispatch} from "react-redux";
import {setEventDate, setEventSelected, setEventType} from "../../store/actions/events";

export default ({selected, item = [], activeDate = false}) => {
    //console.log('item', item)
    const dispatch = useDispatch()

    const isSunday = (date) => {
        const day = date.day()

        if(day < 7 && day != 0) {
            date = date.add(8 - day, 'days')
        } else if (day == 0) {
            date = date.add(1, 'days')
        }

        return date
    }
    const exhib = THEME.BLUE_1
    const festiv = THEME.SAD_COLOR
    const fair = THEME.PURPLE
    const news = THEME.YELLOW
    const other = THEME.GREY_TEXT

    //console.log('selected'+Platform.OS, selected)

    const exhibition = () => {
        return <View key={getRandomKey()} style={{...styles.event, backgroundColor: exhib}}></View>
    }

    const festival = () => {
        return <View key={getRandomKey()} style={{...styles.event, backgroundColor: festiv}}></View>
    }

    const carnival = () => {
        return <View key={getRandomKey()} style={{...styles.event, backgroundColor: fair}}></View>
    }

    const newsIs = () => {
        return <View key={getRandomKey()} style={{...styles.event, backgroundColor: news}}></View>
    }

    const otherIs = () => {
        return <View key={getRandomKey()} style={{...styles.event, backgroundColor: other}}></View>
    }

    const getTypeEvent = (start) => {
        const elements = []
        for(let date in item) {
            if(date == start.format("YYYY-MM-DD") && Array.isArray(item[date])) {
                item[date].map(type => {
                    switch (type) {
                        case "fairs":
                            elements.push(carnival())
                            break
                        case "tours":
                            elements.push(newsIs())
                            break
                        case "fastivals":
                            elements.push(festival())
                            break
                        case "exhibitations":
                            elements.push(exhibition())
                            break
                        case "others":
                            elements.push(otherIs())
                            break
                    }
                })
            }
        }

        return elements
    }
    const currentDate = activeDate

    const generateDays = () => {
        const time = (activeDate) ? activeDate : new Date()

        const start = moment(time).startOf('month').startOf('isoWeek')
        const finish = isSunday(moment(time).startOf('month').add(1, 'months'))

        const elements = []
        while (Date.parse(start) < Date.parse(finish)) {
            const dateOf = start.format("YYYY-MM-DD")
            //console.log(start.current, finish.current, Date.parse(start.current), Date.parse(finish.current))
            const activeIs = (dateOf == selected) ? SHADOW : {}
            const activeBg = (dateOf == selected) ? THEME.ALL_COLOR : "#fff"
            const selectDate = async () => {
                //console.log('start.format(\'YYYY-MM-DD\')', dateOf)
                await dispatch(setEventSelected(dateOf))
            }
            if(start.month() == moment(time).month())
                elements.push(
                    <TouchableOpacity
                        activeOpacity={1}
                        key={getRandomKey()}
                        style={{...styles.dayText, ...activeIs, ...styles.calendarItem}}
                        onPress={selectDate}
                    >
                        <>
                            <AppText style={{...styles.dayDate, backgroundColor: activeBg}}>
                                {start.format("DD")}
                            </AppText>
                            {getTypeEvent(start)}
                        </>
                    </TouchableOpacity>
                )
            else
                elements.push(
                    <View
                        key={getRandomKey()}
                        style={{...styles.dayText, ...activeIs, ...styles.calendarItem}}
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
            <View style={styles.wrap}>
                <View style={styles.header}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={async () => {
                            const time = (currentDate) ? moment(currentDate) : moment()
                            const res = time.subtract(1, 'months')
                            await dispatch(setEventDate(res.format('YYYY-MM-DD')))
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
                        onPress={async () => {
                            const time = (currentDate) ? moment(currentDate) : moment()
                            const res = time.add(1, 'months')
                            await dispatch(setEventDate(res.format('YYYY-MM-DD')))
                        }}
                    >
                        <Svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M-5.15079e-05 21.6L2.39994 24L14.3999 12L2.39988 5.24537e-07L-0.00010766 2.39999L9.59993 12L-5.15079e-05 21.6Z" fill="#BDBDBD"/>
                        </Svg>
                    </TouchableOpacity>
                </View>
                <View style={styles.dayWrap}>
                    <AppTextBold style={{...styles.dayText, ...styles.calendarTitleItem}}>
                        Пн
                    </AppTextBold>
                    <AppTextBold style={{...styles.dayText, ...styles.calendarTitleItem}}>
                        Вт
                    </AppTextBold>
                    <AppTextBold style={{...styles.dayText, ...styles.calendarTitleItem}}>
                        Ср
                    </AppTextBold>
                    <AppTextBold style={{...styles.dayText, ...styles.calendarTitleItem}}>
                        Чт
                    </AppTextBold>
                    <AppTextBold style={{...styles.dayText, ...styles.calendarTitleItem}}>
                        Пн
                    </AppTextBold>
                    <AppTextBold style={{...styles.dayText, ...styles.calendarTitleItem}}>
                        Сб
                    </AppTextBold>
                    <AppTextBold style={{...styles.dayText, ...styles.calendarTitleItem}}>
                        Вс
                    </AppTextBold>
                    {
                        generateDays()
                    }
                    <View style={styles.fullCont}>
                        <AppButton
                            style={styles.btn}
                            color={THEME.FOOTER_BG}
                            onPress={async () => {
                                await dispatch(setEventSelected(""))
                                await dispatch(setEventType(""))
                            }}
                        >
                            <AppTextBold style={styles.btnText}>
                                Показать все события
                            </AppTextBold>
                        </AppButton>
                    </View>
                    <TouchableOpacity
                        style={styles.dayText}
                        activeOpacity={1}
                        onPress={() => {
                            dispatch(setEventType('exhibitations'))
                        }}
                    >
                        <AppText style={{...styles.dayEvent}}>
                            Выставки
                        </AppText>
                        {exhibition()}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.dayText}
                        activeOpacity={1}
                        onPress={() => {
                            dispatch(setEventType('fastivals'))
                        }}
                    >
                        <AppText style={{...styles.dayEvent}}>
                            Фестивали
                        </AppText>
                        {festival()}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.dayText}
                        activeOpacity={1}
                        onPress={() => {
                            dispatch(setEventType('fairs'))
                        }}
                    >
                        <AppText style={{...styles.dayEvent}}>
                            Ярмарки
                        </AppText>
                        {carnival()}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.dayText}
                        activeOpacity={1}
                        onPress={() => {
                            dispatch(setEventType('tours'))
                        }}
                    >
                        <AppText style={{...styles.dayEvent}}>
                            Туры
                        </AppText>
                        {newsIs()}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.dayText}
                        activeOpacity={1}
                        onPress={() => {
                            dispatch(setEventType('others'))
                        }}
                    >
                        <AppText style={{...styles.dayEvent}}>
                            Другое
                        </AppText>
                        {otherIs()}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 220,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 14
    },
    calendarTitleItem: {
        height: 30
    },
    calendarItem: {
        height: 75,
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
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    wrap: {
        backgroundColor: "#fff"
    },
    dateText: {
        display: "flex",
        color: THEME.BLUE
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
        width: "14.2857143%",
        textAlign: "center"
    },
    dayDate: {
        textAlign: "center",
        backgroundColor: "#fff",
        paddingTop: 10,
        height: 40
    },
    fullCont: {
        width: "100%"
    },
    dayEvent: {
        textAlign: "center",
        fontSize: 10
    }
})
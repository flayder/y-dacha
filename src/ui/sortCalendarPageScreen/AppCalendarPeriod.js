import React, {useLayoutEffect, useState, useEffect} from "react"
import {View, StyleSheet, ImageBackground} from "react-native"
import {AppText} from "../AppText";
import {AppTextBold} from "../AppTextBold";
import AppMonthItem from "./AppMonthItem";
import {getCalendarColor, getRandomKey} from "../../../global";
import {THEME} from "../../../theme";

export default ({data, activeIs = false}) => {
    //const [active, setActive] = useState(activeIs)
    const zIndex = 0
    const zIactive = 2
    const months = [
        {
            id: "1",
            name: "Январь",
            color: "#fff",
            zIndex: zIndex
        },
        {
            id: "2",
            name: "Февраль",
            color: "#fff",
            zIndex: zIndex
        },
        {
            id: "3",
            name: "Март",
            color: "#fff",
            zIndex: zIndex
        },
        {
            id: "4",
            name: "Апрель",
            color: "#fff",
            zIndex: zIndex
        },
        {
            id: "5",
            name: "Май",
            color: "#fff",
            zIndex: zIndex
        },
        {
            id: "6",
            name: "Июнь",
            color: "#fff",
            zIndex: zIndex
        },
        {
            id: "7",
            name: "Июль",
            color: "#fff",
            zIndex: zIndex
        },
        {
            id: "8",
            name: "Август",
            color: "#fff",
            zIndex: zIndex
        },
        {
            id: "9",
            name: "Сентябрь",
            color: "#fff",
            zIndex: zIndex
        },
        {
            id: "10",
            name: "Октябрь",
            color: "#fff",
            zIndex: zIndex
        },
        {
            id: "11",
            name: "Ноябрь",
            color: "#fff",
            zIndex: zIndex
        },
        {
            id: "12",
            name: "Декабрь",
            color: "#fff",
            zIndex: zIndex
        }
    ]
    if(data) {
        for(let i in data) {
            if(data[i] > 0) {
                for(let s = 0; s < months.length; s++) {
                    if(months[s].id == i) {
                        months[s].zIndex = 2
                        months[s].color = getCalendarColor(data[i])
                    }
                }
            }
        }
    }
    //console.log('months', months)
    return (
        <ImageBackground
            style={styles.wrap}
            source={require("@images/sortCalendarPageScreen/bgAnnualPeriod.png")}
            resizeMode={"stretch"}
        >
            <AppTextBold style={styles.title}>
                Годовой период
            </AppTextBold>
            <View style={styles.monthWrapper}>
                {
                    months.map(item => {
                        return <AppMonthItem
                            key={getRandomKey()}
                            data={item}
                        />
                    })
                }
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    wrap: {
        width: "100%",
        paddingTop: 60,
        paddingBottom: 50,
    },
    title: {
        textAlign: "center"
    },
    monthWrapper: {
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    }
})
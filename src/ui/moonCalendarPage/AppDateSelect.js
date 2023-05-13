import React, {useState, useRef} from "react"
import {StyleSheet} from "react-native"
import {THEME} from "../../../theme";
import AppSelectModified from "../AppSelectModified";
import moment from 'moment'
import 'moment/locale/ru'
import {SHADOW} from "../../../global";

export default ({dateIs = moment(), onResult}) => {
    const data = []
    const startOfYear = moment(dateIs).startOf('year')
    const endOfYear = moment(dateIs).endOf('year')
    while (startOfYear.valueOf() < endOfYear.valueOf()) {
        data.push({
            name: startOfYear.format("MMMM"),
            value: startOfYear
        })
        startOfYear.add(1, 'months')
    }
    return (
        <AppSelectModified
            title={moment(dateIs).format("MMMM")}
            color={THEME.FOOTER_BG}
            style={{...styles.selector, width: 140}}
            selectStyle={{
                backgroundColor: THEME.FOOTER_BG
            }}
            colorOpened={THEME.EVENT_COLOR}
            data={data}
            showDefaultTitle={false}
            onResult={date => {
                if(onResult) onResult(date)
            }}
        />
    )
}

const styles = StyleSheet.create({
    selector: {
        backgroundColor: "#fff",
        borderRadius: 8,
        ...SHADOW,
        padding: 0
    }
})
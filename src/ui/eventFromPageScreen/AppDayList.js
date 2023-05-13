import React, {useState, useRef} from "react"
import {View, StyleSheet, TouchableOpacity, Platform} from "react-native"
import {Path, Svg} from "react-native-svg";
import AppInput from "../formUI/AppInput";
import {THEME} from "../../../theme";
import {AppTextBold} from "../AppTextBold";

export default (
    {
        number,
        time = "",
        date = "",
        description = "",
        onResult,
        onDelete,
        calendarWidth
    }) => {

    const data = useRef({
        time,
        date,
        description
    })

    const [reload, setReload] = useState(false)

    const [modal, setModal] = useState(false)

    if(onResult) onResult(data.current)

    return (
        <View style={styles.dayIs}>
            <View style={{...styles.dayIsTime}}>
                <View style={styles.dayIsNum}>
                    <AppTextBold style={styles.dayIsText}>
                        {number}.
                    </AppTextBold>
                    <Svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M9.01782 0C4.06337 0 0 4.02772 0 9.01782C0 13.9723 4.02772 18.0356 9.01782 18.0356C13.9723 18.0356 18.0356 14.0079 18.0356 9.01782C18.0356 4.06337 14.0079 0 9.01782 0ZM9.01782 16.8594C4.66931 16.8594 1.14059 13.3307 1.14059 8.98218C1.14059 4.63366 4.66931 1.10495 9.01782 1.10495C13.3663 1.10495 16.895 4.63366 16.895 8.98218C16.895 13.3307 13.3663 16.8594 9.01782 16.8594Z" fill="#5382D8"/>
                        <Path d="M9.01813 2.24536C5.27555 2.24536 2.28149 5.27506 2.28149 8.982C2.28149 12.7246 5.3112 15.7186 9.01813 15.7186C12.7607 15.7186 15.7548 12.6889 15.7548 8.982C15.7548 5.23942 12.7251 2.24536 9.01813 2.24536ZM12.9389 10.1226H8.44783C8.12704 10.1226 7.87753 9.87309 7.87753 9.55229V3.92061C7.87753 3.59982 8.12704 3.35031 8.44783 3.35031C8.76862 3.35031 9.01813 3.59982 9.01813 3.92061V8.982H12.9389C13.2597 8.982 13.5092 9.2315 13.5092 9.55229C13.5092 9.87309 13.2597 10.1226 12.9389 10.1226Z" fill="#5382D8"/>
                    </Svg>
                </View>
                <View style={styles.dayIsInput}>
                    <AppInput
                        style={styles.timeInput}
                        placeholder={"00:00-00:00"}
                        value={data.current.time}
                        onResult={time => {
                            data.current.time = time
                            setReload(!reload)
                        }}
                    />
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.deleteBtn}
                        onPress={() => {
                            if(onDelete) onDelete(number)
                        }}
                    >
                        <Svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M2.26514 6.79785V16.9097C2.26514 17.5164 2.75051 18.0423 3.39767 18.0423H14.6421C15.2488 18.0423 15.7746 17.5569 15.7746 16.9097V6.79785H2.26514ZM7.88734 15.2514C7.88734 15.575 7.64466 15.8176 7.32108 15.8176C6.9975 15.8176 6.75481 15.575 6.75481 15.2514V8.49665C6.75481 8.17307 6.9975 7.93038 7.32108 7.93038C7.64466 7.93038 7.88734 8.17307 7.88734 8.49665V15.2514ZM11.2445 15.2514C11.2445 15.575 11.0018 15.8176 10.6782 15.8176C10.3546 15.8176 10.112 15.575 10.112 15.2514V8.49665C10.112 8.17307 10.3546 7.93038 10.6782 7.93038C11.0018 7.93038 11.2445 8.17307 11.2445 8.49665V15.2514Z" fill="#E96C6C"/>
                            <Path d="M1.13253 5.66265H2.26506H15.7745H16.9071C17.5138 5.66265 18.0396 5.17728 18.0396 4.53012V3.39759C18.0396 2.79088 17.5542 2.26506 16.9071 2.26506H11.2849C11.2849 1.01119 10.2737 0 9.0198 0C7.76593 0 6.75474 1.01119 6.75474 2.26506H1.13253C0.525818 2.26506 0 2.75043 0 3.39759V4.53012C0 5.13684 0.48537 5.66265 1.13253 5.66265ZM9.0198 1.17298C9.62651 1.17298 10.1523 1.65835 10.1523 2.30551H7.88727C7.88727 1.6988 8.37264 1.17298 9.0198 1.17298Z" fill="#E96C6C"/>
                        </Svg>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginTop: -20}}></View>
            <AppInput
                placeholder={"Описание мероприятия"}
                checkbox={true}
                value={data.current.description}
                onResult={descr => {
                    data.current.description = descr
                    setReload(!reload)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    dayIs: {
        width: "100%"
    },
    dateBlock: {
        width: 150,
        alignItems: "center",
        justifyContent: "center"
    },

    timeInput: {
        width: 110
    },
    deleteBtn: {
        paddingLeft: 10,
        paddingRight: 10
    },
    dateBlockBtn: {
        flexDirection: "row",
        paddingLeft: 0,
        paddingRight: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    dayIsInput: {
        width: 150,
        paddingLeft: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    dayIsText: {
        color: THEME.BLUE,
        paddingRight: 5
    },
    dayIsNum: {
        width: 50,
        flexDirection: "row",
        alignItems: "center",
    },
    dayIsTime: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    calendar: {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: 20,
        marginBottom: -20,
        backgroundColor: "transparent"
    }
})
import React, {useState} from "react";
import {View, StyleSheet, Platform} from "react-native";
import {THEME} from "../../../theme";
import {Path, Svg} from "react-native-svg";
import moment from "moment";
import AppButton from "../AppButton";
import {AppTextBold} from "../AppTextBold";
import AppDialog from "../formUI/AppDialog";
import AppCalendarUsual from "../AppCalendarUsual";

export default (
    {
        onResult,
        calendarWidth,
        screenWidth,
        style,
        dateIs = "",
        background = THEME.FOOTER_BG,
        textBtnColor = "#fff",
        iconColor = "#fff",
        titleCalendar = "Введите дату проведения"
    }) => {
    const [dateModal, setDateModal] = useState(false)
    const [date, setDate] = useState(dateIs)

    return (
        <View>
            <AppButton
                color={background}
                style={{...styles.btnDate, ...style}}
                onPress={() => {
                    setDateModal(true)
                }}
            >
                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M4.05224 1.60968C4.05224 1.78944 3.89456 1.93782 3.72297 1.93782C3.5415 1.93782 3.39371 1.77957 3.39371 1.60968V0.673139C3.39371 0.493379 3.55139 0.345 3.72297 0.345C3.90444 0.345 4.05224 0.503246 4.05224 0.673139V1.60968Z" stroke={iconColor} strokeWidth="0.69"/>
                    <Path d="M14.196 1.60968C14.196 1.78944 14.0384 1.93782 13.8668 1.93782C13.6853 1.93782 13.5375 1.77957 13.5375 1.60968V0.673139C13.5375 0.493379 13.6952 0.345 13.8668 0.345C14.0482 0.345 14.196 0.503246 14.196 0.673139V1.60968Z" stroke={iconColor} strokeWidth="0.69"/>
                    <Path d="M6.65472 16.1201H6.99972V15.7751V13.5215V13.1765H6.65472H4.39739H4.05239V13.5215V15.7751V16.1201H4.39739H6.65472ZM6.65472 12.7544H6.99972V12.4094V10.1558V9.81081H6.65472H4.39739H4.05239V10.1558V12.4094V12.7544H4.39739H6.65472ZM6.65472 9.38867H6.99972V9.04367V6.79012V6.44512H6.65472H4.39739H4.05239V6.79012V9.04367V9.38867H4.39739H6.65472ZM10.0261 16.1493H10.3711V15.8043V13.5508V13.2058H10.0261H7.76873H7.42373V13.5508V15.8043V16.1493H7.76873H10.0261ZM10.0261 12.7836H10.3711V12.4386V10.1851V9.84008H10.0261H7.76873H7.42373V10.1851V12.4386V12.7836H7.76873H10.0261ZM10.0261 9.41793H10.3711V9.07293V6.81938V6.47438H10.0261H7.76873H7.42373V6.81938V9.07293V9.41793H7.76873H10.0261ZM13.3974 16.1786H13.7424V15.8336V13.58V13.235H13.3974H11.1401H10.7951V13.58V15.8336V16.1786H11.1401H13.3974ZM13.3974 12.8129H13.7424V12.4679V10.2143V9.86934H13.3974H11.1401H10.7951V10.2143V12.4679V12.8129H11.1401H13.3974ZM13.3974 9.4472H13.7424V9.1022V6.84865V6.50365H13.3974H11.1401H10.7951V6.84865V9.1022V9.4472H11.1401H13.3974ZM16.029 2.25374V1.4866H16.798H16.886C17.3116 1.4866 17.655 1.83022 17.655 2.25374V16.8872C17.655 17.3107 17.3116 17.6543 16.886 17.6543H1.11401C0.688365 17.6543 0.345 17.3107 0.345 16.8872V2.25374C0.345 1.83022 0.688365 1.4866 1.11401 1.4866H1.88301V2.25374C1.88301 3.05943 2.53639 3.71089 3.34202 3.71089H4.45603C5.26165 3.71089 5.91503 3.05943 5.91503 2.25374V1.4866H11.997V2.25374C11.997 3.05943 12.6504 3.71089 13.456 3.71089H14.57C15.3757 3.71089 16.029 3.05943 16.029 2.25374Z" stroke={iconColor} strokeWidth="0.69"/>
                </Svg>
                <View style={{width: 10}}></View>
                <AppTextBold style={{color: textBtnColor}}>
                    {
                        date
                            ?
                            moment(date).format("DD/MM/YYYY")
                            :
                            "00/00/0000"
                    }
                </AppTextBold>
            </AppButton>
            {
                dateModal
                    ?
                    <AppDialog
                        title={titleCalendar}
                        input={false}
                        onOk={() => {
                            setDateModal(false)
                            setDate(date)
                        }}
                    >
                        <AppCalendarUsual
                            style={{...styles.calendar, width: calendarWidth}}
                            screenWidth={screenWidth}
                            color={Platform.OS == "android" ? "#fff" : "#000"}
                            onResult={d => {
                                if(onResult) onResult(d)
                                setDate(d)
                            }}
                        />
                    </AppDialog>
                    :
                    <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    calendar: {
        width: 230,
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: 20,
        marginBottom: -20,
        backgroundColor: "transparent"
    },
    btnDate: {
        width: 180,
        marginLeft: "auto",
        marginRight: "auto"
    }
})
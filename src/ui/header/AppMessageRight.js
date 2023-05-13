import React, {useEffect} from "react"
import {StyleSheet, View, ImageBackground} from "react-native"
import {TouchableOpacity} from "react-native-gesture-handler"
import {useDispatch, useSelector} from "react-redux";
import {Svg, Path} from "react-native-svg";
import {LinkTo} from "../../../global";
import {loadNotifications} from "../../store/actions/notifications";
import {AppTextBold} from "../AppTextBold";
import {THEME} from "../../../theme";
export default ({style, onPress, onChange, navigation}) => {
    const init = true
    const dispatch = useDispatch()
    const counts = useSelector(state => state.notifications.fullCountItems)
    useEffect(() => {
        dispatch(loadNotifications({navigation})).then(res => {
            //setData(res)
            //console.log('here')
        })
    }, [init])
    const iconColor = counts > 0 ? THEME.ORANGE : THEME.GREY
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.btn}
            onPress={() => {
                LinkTo("NotificationsPageScreen", {}, navigation)
            }}
        >
            <ImageBackground
                style={{...styles.wrap}}
                source={require("@images/header/Rectangle.png")}
                resizeMode={"stretch"}
            >
                <View style={{...styles.wrapIcon}}>
                    <AppTextBold style={{...styles.text, color: iconColor}}>
                        {counts}
                    </AppTextBold>
                    <Svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M10.016 18C11.251 18 12.2698 16.9811 12.2698 15.7461H7.76221C7.76221 16.9811 8.78105 18 10.016 18Z" fill={iconColor}/>
                        <Path d="M18.4441 12.3808C17.8266 11.7633 16.3755 10.3431 16.1903 10.1269C16.005 9.91081 15.9742 9.57118 15.9742 9.57118L15.6037 5.61921C15.6037 5.61921 15.0479 0 9.9846 0C4.92126 0 4.36552 5.61921 4.36552 5.61921L4.02591 9.57118C4.02591 9.57118 3.99503 9.94168 3.80979 10.1269C3.62455 10.3431 2.17346 11.7633 1.55598 12.3808C0.938502 12.9983 1.00025 14.0789 1.00025 14.0789C1.00025 14.0789 1.00025 14.6346 1.55598 14.6346H18.4441C18.9998 14.6346 18.9998 14.0789 18.9998 14.0789C18.9998 14.0789 19.0616 12.9983 18.4441 12.3808Z" fill={iconColor}/>
                    </Svg>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapIcon: {
        flexDirection: "row",
        alignItems: "center"
    },
    btn: {
        width: 80,
        height: 60,
        position: "relative",
        marginLeft: -10,
        marginTop: -5,
        zIndex: 99,
    },
    text: {
        paddingRight: 10
    },
    wrap: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
})
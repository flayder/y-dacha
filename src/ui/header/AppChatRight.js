import React, {useState} from "react"
import {StyleSheet, ImageBackground} from "react-native"
import {TouchableOpacity} from "react-native-gesture-handler"
import {useSelector, useDispatch} from "react-redux";
import {Svg, Path} from "react-native-svg";
import {setGlobalMuted} from "../../store/actions/other";
import {THEME} from "../../../theme";

export default ({style, onPress, onChange, navigation}) => {
    const dispatch = useDispatch()
    const muted = useSelector(state => state.others.muted)
    const user = useSelector(state => state.chat.user_to)
    const [load, setLoad] = useState(false)
    //console.log('okokok')
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.btn}
            onPress={() => {
                if(typeof user == "object" && user.hasOwnProperty('info') && user.info.hasOwnProperty('user_id') && user.info.user_id > 0) {
                    dispatch(setGlobalMuted(user.info.user_id))
                    setLoad(!load)
                }
            }}
        >
            <ImageBackground
                resizeMode={"stretch"}
                style={{...styles.wrap}}
                source={require("@images/header/Rectangle.png")}
            >
                {
                    (
                        typeof user == "object"
                        && user.hasOwnProperty('info')
                        && user.info.hasOwnProperty('user_id')
                        && user.info.user_id > 0
                        && muted.includes(user.info.user_id)
                    )
                    ?
                        <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M9.01748 18.0001C10.2524 18.0001 11.2713 16.9812 11.2713 15.7462H6.76367C6.76367 16.9812 7.78252 18.0001 9.01748 18.0001Z" fill="#BDBDBD"/>
                            <Path d="M17.4456 12.3808C16.8281 11.7633 15.377 10.3431 15.1918 10.1269C15.0065 9.91081 14.9756 9.57118 14.9756 9.57118L14.6051 5.61921C14.6051 5.61921 14.0494 0 8.98607 0C3.92272 0 3.36699 5.61921 3.36699 5.61921L3.02737 9.57118C3.02737 9.57118 2.9965 9.94168 2.81125 10.1269C2.62601 10.3431 1.17493 11.7633 0.557448 12.3808C-0.0600329 12.9983 0.00171522 14.0789 0.00171522 14.0789C0.00171522 14.0789 0.00171524 14.6346 0.557448 14.6346H17.4456C18.0013 14.6346 18.0013 14.0789 18.0013 14.0789C18.0013 14.0789 18.063 12.9983 17.4456 12.3808Z" fill="#BDBDBD"/>
                        </Svg>
                        :
                        <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M9.01748 18.0001C10.2524 18.0001 11.2713 16.9812 11.2713 15.7462H6.76367C6.76367 16.9812 7.78252 18.0001 9.01748 18.0001Z" fill={THEME.YELLOW} />
                            <Path d="M17.4456 12.3808C16.8281 11.7633 15.377 10.3431 15.1918 10.1269C15.0065 9.91081 14.9756 9.57118 14.9756 9.57118L14.6051 5.61921C14.6051 5.61921 14.0494 0 8.98607 0C3.92272 0 3.36699 5.61921 3.36699 5.61921L3.02737 9.57118C3.02737 9.57118 2.9965 9.94168 2.81125 10.1269C2.62601 10.3431 1.17493 11.7633 0.557448 12.3808C-0.0600329 12.9983 0.00171522 14.0789 0.00171522 14.0789C0.00171522 14.0789 0.00171524 14.6346 0.557448 14.6346H17.4456C18.0013 14.6346 18.0013 14.0789 18.0013 14.0789C18.0013 14.0789 18.063 12.9983 17.4456 12.3808Z" fill={THEME.YELLOW} />
                        </Svg>

                }

            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 80,
        height: 60,
        position: "relative",
        marginLeft: -10,
        marginTop: -5,
        zIndex: 99,
    },
    wrap: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
})
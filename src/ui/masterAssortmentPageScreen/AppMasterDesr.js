import React, {useState, useRef} from "react"
import {Animated, View, StyleSheet, TouchableOpacity, ImageBackground} from "react-native"
import {Svg, Path} from "react-native-svg";
import {AppText} from "../AppText";
import AppButton from "../AppButton";
import {THEME} from "../../../theme";
import {LinkTo} from "../../../global";

export default ({data, navigation}) => {
    const [active, setActive] = useState(false)
    const fadeAnim = useRef(new Animated.Value(0)).current;
    //console.log('data', data)

    const fadeIn = () => {
        setActive(true)
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    const fadeOut = () => {

        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start(() => {
            setActive(false)
        });
    };

    return (
        <View style={styles.descrWrap}>
            <TouchableOpacity activeOpacity={1} onPress={() => {
                if(!active) fadeIn()
                else fadeOut()
            }}>
                <View style={styles.titler}>
                    <AppText style={{color: "#fff", marginTop: 10, marginBottom: 10, fontSize: 14}}>
                        {
                            !active
                                ?
                                "Подробное описание"
                                :
                                "Свернуть описание"
                        }
                    </AppText>
                    {
                        !active
                            ?
                            <Svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M12.728 8.48528L14.1422 7.07107L7.07111 0L0 7.0711L1.41421 8.48531L7.07111 2.82842L12.728 8.48528Z" fill="white"/>
                            </Svg>
                            :
                            <Svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M12.728 4.00543e-05L14.1422 1.41425L7.07111 8.48532L0 1.41422L1.41421 7.62939e-06L7.07111 5.6569L12.728 4.00543e-05Z" fill="white"/>
                            </Svg>
                    }
                </View>
                <Animated.View style={[
                    styles.wrapper,
                    {
                        opacity: fadeAnim
                    },
                ]}>
                    {
                        active
                            ?
                            <>
                                <AppText style={{fontSize: 14}}>
                                    {data.add_information}
                                </AppText>
                                <AppButton
                                    style={{width: 180, marginLeft: "auto", marginRight: "auto"}}
                                    color={THEME.FOOTER_BG}
                                    onPress={() => {
                                        LinkTo("ChatPageScreen", {
                                            masterId: data.user_id
                                        }, navigation)
                                    }}
                                >
                                    Написать мастеру
                                </AppButton>
                            </>
                            :
                            <></>
                    }
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingLeft: 20,
        paddingRight: 20
    },
    descrWrap: {
        marginTop: 10,
        backgroundColor: "#fff",
        paddingBottom: 20
    },
    titler: {
        backgroundColor: THEME.COMFORT_COLOR,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20
    }
})
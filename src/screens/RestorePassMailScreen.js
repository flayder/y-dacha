import React, {useLayoutEffect, useState} from "react"
//import SWGImage from "expo-svg-uri"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {createStackNavigator, useHeaderHeight} from '@react-navigation/stack'
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppText} from "@root/ui/AppText";
import {emptyNavigation} from "../../global"
import {THEME} from "../../theme";
import {AppFetch} from "../AppFetch";
import {AppErrorMessage} from "../ui/AppErrorMessage";
import {AppWrap} from "../ui/AppWrap";
import {AppLogoFirstScreens} from "../ui/AppLogoFirstScreens";
import {Svg, Path} from "react-native-svg";

const RestorePassMailWrapper = ({route, navigation}) => {
    const [errorMessage, setErrorMessage] = useState("")
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTintColor: 'white',
            headerStyle: {
                height: 50,
                ...emptyNavigation
            }
        }, [navigation])

        navigation.getParent().setOptions({
            gestureEnabled: false
        })
    })
    const restoreHandler = async () => {
        if(route.params !== undefined) {
            const response = await AppFetch.get("checkRessPass", {
                email:      route.params.email,
                password:   route.params.password
            })

            if(response.result)
                navigation.navigate("RestorePassSuccessScreen")
            else
                setErrorMessage("Ошибка при изменении пароля, возможно не письмо с инструкцией для восстановления пароля не было применено")
        }
    }
    return (
        <AppWrap wrap={{...styles.wrap}} scroll={{marginBottom: 0}} height={-50} measure={true}>
            <View style={styles.form}>
                <AppLogoFirstScreens />
                <View style={styles.form}>
                    <AppTextBold style={styles.bold}>
                        Восстановление пароля
                    </AppTextBold>
                    <AppErrorMessage toShow={errorMessage.length > 0} errorMessage={errorMessage} />
                    <AppText style={styles.text}>
                        <Svg style={{flexBasis: 15, marginRight: 5}} width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M16.2 14.4H1.8C0.805887 14.4 0 13.5941 0 12.6V1.7217C0.0419475 0.758294 0.83568 -0.000911138 1.8 8.2072e-07H16.2C17.1941 8.2072e-07 18 0.805889 18 1.8V12.6C18 13.5941 17.1941 14.4 16.2 14.4ZM1.8 3.4812V12.6H16.2V3.4812L9 8.28L1.8 3.4812ZM2.52 1.8L9 6.12L15.48 1.8H2.52Z" fill="#5382D8"/>
                        </Svg>
                        &nbsp;На ваш адрес отправлено письмо,
                        содержащее ссылку для инструкцию для востановления пароля.
                    </AppText>
                    <AppText style={styles.text}>
                        Если Вы не получили письмо в течение 5 минут, повторите попытку еще раз.
                    </AppText>
                </View>
            </View>
            <TouchableOpacity style={styles.blueBtn} onPress={restoreHandler}>
                <AppTextBold style={styles.blueBtnText}>
                    Далее
                </AppTextBold>
                <Svg style={{marginLeft: 5, marginTop: 5}} width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M15.3751 12.1219C15.6072 12.1218 15.8297 12.0305 15.9938 11.868L21.2438 6.66826C21.5854 6.32986 21.5854 5.78126 21.2438 5.44286L15.9938 0.243258C15.6504 -0.0851423 15.1047 -0.0804423 14.7672 0.253758C14.4297 0.588058 14.4249 1.12856 14.7565 1.46866L19.3879 6.05556L14.7565 10.6426C14.5063 10.8904 14.4315 11.2631 14.5669 11.5869C14.7023 11.9107 15.0213 12.1218 15.3751 12.1219Z" fill="#5382D8"/>
                    <Path d="M1.375 6.92226H20.625C21.1082 6.92226 21.5 6.53426 21.5 6.05556C21.5 5.57696 21.1082 5.18896 20.625 5.18896H1.375C0.8918 5.18896 0.5 5.57696 0.5 6.05556C0.5 6.53426 0.8918 6.92226 1.375 6.92226Z" fill="#5382D8"/>
                </Svg>
            </TouchableOpacity>
            <View style={{marginTop: 10}}></View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    btnShort: {
        width: 180,
        marginLeft: "auto",
        marginRight: "auto"
    },
    blueBtn: {
        width: 150,
        marginTop: 25,
        marginBottom: 25,
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    blueBtnText: {
        fontSize: 18,
        color: THEME.BLUE
    },
    form: {
        width: "100%"
    },
    wrap: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around"
    },
    bold: {
        textAlign: "center"
    },
    text: {
        width: "100%",
    },
    bottomText: {
        color: "#000"
    }
})

const Stack = createStackNavigator()

export const RestorePassMailScreen = () => {
    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false
        })}>
            <Stack.Screen name="RestorePassMailWrapper" component={RestorePassMailWrapper} />
        </Stack.Navigator>
    )
}
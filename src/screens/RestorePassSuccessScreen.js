import React, {useLayoutEffect, useEffect, useState} from "react"
import { View, StyleSheet, TouchableOpacity, Image} from "react-native"
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppText} from "@root/ui/AppText";
import {emptyNavigation} from "../../global"
import {THEME} from "../../theme";
import {AppWrap} from "../ui/AppWrap";
import {AppLogoFirstScreens} from "../ui/AppLogoFirstScreens";
import {createStackNavigator} from "@react-navigation/stack";
import {DB} from "../db";

const RestorePassSuccessWrapper = ({navigation}) => {
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

    const init = true

    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        DB.getUser().then(user => {
            if(user.token) setAuthorized(true)
        })
    }, [init])

    return (
        <AppWrap wrap={{...styles.wrap}} scroll={{marginBottom: 0}} height={-50} measure={true}>
            <AppLogoFirstScreens />
            <View style={styles.form}>
                <Image
                    style={{width: 150, height: 150}}
                    source={require('@images/restorePassSuccessScreen/successRessMail.gif')}
                />
                <AppText style={{...styles.text, marginTop: 20}}>
                    Ваш пароль был изменен
                </AppText>
            </View>
            <View style={styles.bottom}>
                {
                    authorized
                        ?
                        <TouchableOpacity style={styles.blueBtn} onPress={() => {
                            navigation.navigate("SettingScreen")
                        }}>
                            <AppTextBold style={styles.blueBtnText}>
                                Вернуться в личный кабинет
                            </AppTextBold>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.blueBtn} onPress={() => {
                            navigation.navigate("SignInScreen")
                        }}>
                            <AppTextBold style={styles.blueBtnText}>
                                Войти
                            </AppTextBold>
                        </TouchableOpacity>
                }

            </View>
            <View style={{marginTop: 20}}></View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
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
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
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
        fontSize: 20,
        textAlign: "center"
    },
    bottomText: {
        fontSize: 20,
        color: "#000"
    },
    btn: {
        width: "100%",
        marginBottom: 30,
    }
})

const Stack = createStackNavigator()

export const RestorePassSuccessScreen = () => {
    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false
        })}>
            <Stack.Screen name="RestorePassSuccessWrapper" component={RestorePassSuccessWrapper} />
        </Stack.Navigator>
    )
}
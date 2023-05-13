import React, {useLayoutEffect, useState} from "react"
import { useHeaderHeight } from '@react-navigation/elements'
import { View, ScrollView, StyleSheet, Alert, Platform} from "react-native"
import {createStackNavigator} from '@react-navigation/stack'
import Checkbox from "@root/ui/Checkbox";
import {AppGreyButton} from "../ui/AppGreyButton";
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppText} from "@root/ui/AppText";
import {emptyNavigation} from "../../global"
import { Anchor } from "../ui/Anchor";
import {AppWrap} from "../ui/AppWrap";
import {AppLogoFirstScreens} from "../ui/AppLogoFirstScreens";
import {AppBlueButton} from "../ui/AppBlueButton";
import * as WebBrowser from "expo-web-browser"

const PolicyWrapper = ({navigation}) => {
    const headerHeight = useHeaderHeight()
    const [policyChecked, isCheckedPolicy] = useState(false)
    const [navHeight, _] = useState(headerHeight)
    //console.log('navHeight', navHeight)
    useLayoutEffect(() => {

        navigation.setOptions({
            title: "",
            headerTintColor: 'white',
            headerStyle: {
                //height: 50,
                ...emptyNavigation
            }
        }, [navigation])

        navigation.getParent().setOptions({
            gestureEnabled: false
        })
    })

    const checkingHandler = () => {
        if(!policyChecked) {
            Alert.alert(
                "Пользовательское соглашение не принято",
                "",
                [
                    {text: "OK"}
                ],
                {cancelable: false}
            )
        } else {
            navigation.navigate("MainPageScreen")
        }
    }

    let mT = 0

    if(Platform.OS == "ios") mT = 50
    //navigation.back()
    return (
        <AppWrap
            wrap={{...styles.wrap}}
            scroll={{marginTop: mT, marginBottom: 0}}
            height={-50}
            measure={true}
        >
            <View>
                <AppLogoFirstScreens />
                <AppTextBold style={styles.bold}>
                    Пользовательское соглашение
                </AppTextBold>
                <AppText style={styles.text}>
                    ДОГОВОР ОФЕРТЫ НА ПРЕДОСТАВЛЕНИЕ
                    ФУНКЦИОНАЛЬНЫХ ВОЗМОЖНОСТЕЙ МОБИЛЬНОГО ПРИЛОЖЕНИЯ «УМНАЯ ДАЧА». 1. ОБЩИЕ УСЛОВИЯ
                </AppText>
                <AppText style={styles.text}>
                    1.1. Настоящее Пользовательское Соглашение (далее –Оферта) относится к мобильному приложению «Умная дача» (далее Приложение). Все термины и определения, используемые в настоящей Оферте, соответствуют терминам и определениям, указанным в Пользовательском соглашении, расположенном
                    по адресу
                    {"\n"}
                    <Anchor style={{...styles.bottomText}} onPress={async () => {
                    await WebBrowser.openBrowserAsync("https://y-dacha.com/policy-page")
                        //navigation.navigate("PolicyScreenText")
                    }}>
                        https://y-dacha.com/policy-page
                    </Anchor>.
                </AppText>
                <View style={styles.bottom}>
                    <Checkbox style={styles.checkbox} onChange={prop => {
                        isCheckedPolicy(prop)
                    }}></Checkbox>
                    <View>
                        <AppText style={styles.bottomText}>
                            Я прочитал и согласен с условиями
                        </AppText>
                        <Anchor style={styles.bottomText} onPress={async () => {
                            await WebBrowser.openBrowserAsync("https://y-dacha.com/policy-page")
                            //navigation.navigate("PolicyScreenText")
                        }}>
                            Пользовательского соглашения
                        </Anchor>
                    </View>
                </View>
                <View style={{height: 20}}></View>
            </View>
            {
                policyChecked
                ?
                <AppBlueButton onPress={checkingHandler}>
                    Далее
                </AppBlueButton>
                :
                <AppGreyButton onPress={checkingHandler}>
                Далее
                </AppGreyButton>
            }
            <View style={{marginTop: 15}}></View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    checkbox: {
        marginRight: 15
    },
    wrap: {
        paddingTop: 20,
        justifyContent: "space-between",
        marginBottom: 0
    },
    bold: {
        textAlign: "center"
    },
    text: {
        width: "100%",
    },
    bottomText: {
        marginTop: 0,
        marginBottom: 0
    },
    btn: {
        width: "100%",
        marginBottom: 15,
    },
    bottom: {
        width: "100%",
        paddingTop: 15,
        flexDirection: "row",
        alignItems: "center"
    }
})

const Stack = createStackNavigator()

export const PolicyScreen = () => {
    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false
        })}>
            <Stack.Screen name="PolicyWrapper" component={PolicyWrapper} />
        </Stack.Navigator>
    )
}
import React, {useLayoutEffect, useEffect} from "react"
import { View, StyleSheet, Platform } from "react-native"
import { emptyNavigation } from "../../global"
import { AppBlueButton } from "@root/ui/AppBlueButton";
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppText} from "@root/ui/AppText";
import {useDispatch, useSelector} from "react-redux";
import {AppWrap} from "../ui/AppWrap";
import {init, getPushing, enablePushing, disablePushing} from "../store/actions/system";
import {AppLogoFirstScreens} from "../ui/AppLogoFirstScreens";
import {createStackNavigator} from "@react-navigation/stack";
import {setCurrentRoute} from "../store/actions/other";
const NotificationSwitchWrapper = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTintColor: 'white',
            headerShown: false,
            headerStyle: emptyNavigation
        }, [navigation])

        navigation.getParent().setOptions({
            gestureEnabled: false
        })
    })

    const dispatch = useDispatch()
    const inits = true

    useEffect(() => {
        dispatch(init())
        dispatch(getPushing())
    }, [inits])

    let mT = 50

    if(Platform.OS == "ios") mT = 150
    // const SCHEME = Constants.manifest.scheme
    //console.log('aa1123', )

    return (
        <AppWrap
            wrap={{...styles.wrap, paddingTop: mT, paddingBottom: 20}}
            scroll={{marginBottom: 0}}
            height={-50}
            measure={true}
        >
            <View style={{width: "100%"}}>
                <AppLogoFirstScreens />
                <AppTextBold style={styles.bold}>
                    Хотите включить уведомление?
                </AppTextBold>
                <AppText style={styles.text}>
                    В них мы рассказываем о специальных
                    предложениях, вознаграждениях
                    и изменениях ваших заказов.
                </AppText>
            </View>
            <View style={{...styles.bottom}}>
                <AppBlueButton onPress={() => {
                    dispatch(enablePushing())
                    navigation.navigate("PolicyScreen")
                }} style={styles.btn}>
                    Включить уведомление
                </AppBlueButton>
                <View style={{height: 10}}></View>
                <AppBlueButton style={styles.btn} onPress={() => {
                    dispatch(disablePushing())
                    navigation.navigate("PolicyScreen")
                }}>
                    Не сейчас
                </AppBlueButton>
            </View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    wrap: {
        // flex: 1,
        // width: "100%",
        // height: "100%",
        //backgroundColor: "red",
        //paddingBottom: 20,
        minHeight: 500,
        marginBottom: 0,
        alignItems: "center",
        justifyContent: "space-between"
    },
    bold: {
        textAlign: "center"
    },
    text: {
        textAlign: "center",
    },
    btn: {
        width: "100%",
        marginTop: 20,
        marginBottom: 20,
    },
    bottom: {
        position: "absolute",
        width: "100%",
        marginTop: 30,
        left: 0,
        bottom: 20,
        //left: 20,
    }
})

const Stack = createStackNavigator()

export const NotificationSwitchScreen = ({route}) => {
    const dispatch = useDispatch()
    const routeName = (typeof route === "object" && route.name) ? route.name : false
    const globalRoute = useSelector(state => state.others.currentRoute)
    useEffect(() => {
        if(routeName && routeName != globalRoute) {
            dispatch(setCurrentRoute(route.name))
        }
    })
    return (
        <Stack.Navigator>
            <Stack.Screen name="NotificationSwitchWrapper" component={NotificationSwitchWrapper} />
        </Stack.Navigator>
    )
}
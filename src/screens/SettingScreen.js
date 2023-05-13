import React, {useLayoutEffect, useState, useEffect} from "react"
import {View,StyleSheet, TouchableOpacity, Platform} from "react-native"
import {AppText} from "../ui/AppText";
import {AppWrap} from "../ui/AppWrap";
import {createDrawerNavigator} from "@react-navigation/drawer"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {useDispatch} from "react-redux";
import {THEME} from "../../theme";
import {AppBlueButton} from "../ui/AppBlueButton";
import AppVote from "../ui/AppVote";
import CheckboxWithLabel from "../ui/CheckboxWithLabel";
import {DB} from "../db";
import {commonHeader} from "@root/globalHeaders"
import AppIndicator from "../ui/AppIndicator";
import {globalRouteFun} from "../../global";
import {AppFetch} from "../AppFetch";
import {globalLogout} from "../store/actions/other";
import {Svg, Path} from "react-native-svg";
import AppPromoCode from "../ui/settingScreen/AppPromoCode";

const pageWrapper = ({navigation, route}) => {
    const dispatch = useDispatch()
    const [statePushing, setPushing] = useState(null)
    //console.log("statePushing " + Platform.OS, statePushing)
    useLayoutEffect(() => {
        DB.getUser().then(user => {
            if(!user.token) navigation.navigate("AuthorizationScreen")
        })
        navigation.getParent().getParent().setOptions({
            gestureEnabled: false
        })
        navigation.getParent().getParent().getParent().setOptions({
            gestureEnabled: false
        })
        navigation.setOptions(
            commonHeader({
                title: "Настройки",
                navigation: navigation,
                jumpTo: "MainPageScreen",
            }),

            [navigation]
        )
    })

    useEffect(() => {
        if(statePushing === null) {
            DB.getPushing().then(res => {
                //console.log('res', res)
                if (res) {
                    setPushing(res)
                }
                else {
                    setPushing(res)
                }
            })
        }
    }, [statePushing])

    //console.log('pushing', statePushing)

    const checkBoxHandle = result => {
        if(result) {
            DB.setPushing(true).then(result => {
                setPushing(true)
            })
        } else {
            DB.setPushing(false).then(result => {
                setPushing(false)
            })
        }
        //setPushing(result)
    }

    return (
        <AppWrap scroll={{paddingTop: 40}}>
            <CheckboxWithLabel
                label={"Включить уведомление"}
                conditionInit={statePushing}
                textStyle={{fontSize: 16}}
                onChange={checkBoxHandle}
                iconFunc={(color = "#000") => {
                    return <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M9.01748 17.9997C10.2524 17.9997 11.2713 16.9808 11.2713 15.7458H6.76367C6.76367 16.9808 7.78252 17.9997 9.01748 17.9997Z" fill={color}/>
                        <Path d="M17.4451 12.3805C16.8277 11.763 15.3766 10.3428 15.1914 10.1267C15.0061 9.91056 14.9753 9.57094 14.9753 9.57094L14.6048 5.61907C14.6048 5.61907 14.0491 0 8.98584 0C3.92262 0 3.3669 5.61907 3.3669 5.61907L3.0273 9.57094C3.0273 9.57094 2.99642 9.94143 2.81118 10.1267C2.62594 10.3428 1.1749 11.763 0.557434 12.3805C-0.0600314 12.998 0.00171518 14.0785 0.00171518 14.0785C0.00171518 14.0785 0.0017152 14.6343 0.557434 14.6343H17.4451C18.0008 14.6343 18.0008 14.0785 18.0008 14.0785C18.0008 14.0785 18.0626 12.998 17.4451 12.3805V12.3805Z" fill={color}/>
                    </Svg>
                }}
            />
            {/*<View style={styles.line}>*/}
            {/*    <TouchableOpacity style={styles.link}>*/}
            {/*        <View style={styles.lineWrap}>*/}
            {/*            <SWGImage source={require("@images/settings/case.svg")} />*/}
            {/*            <AppText style={styles.text}>*/}
            {/*                Восстановить покупки*/}
            {/*            </AppText>*/}
            {/*        </View>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
            <View style={styles.line}>
                <TouchableOpacity style={styles.link} onPress={async () => {
                    await AppFetch.logOut(navigation)
                    setTimeout(() => {
                        dispatch(globalLogout())
                    }, 200)
                }}>
                    <View style={styles.lineWrap}>
                        <Svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M11.1292 8.70966C11.9034 8.04753 12.4356 7.0798 12.4356 5.90834C12.4356 3.92195 10.9356 2.34302 9.04853 2.34302C7.16145 2.34302 5.66145 3.92195 5.66145 5.90834C5.66145 7.02887 6.19371 8.04753 6.9679 8.70966C4.88726 9.57553 3.38727 11.7147 3.38727 14.2104H14.613C14.613 11.7147 13.113 9.57553 11.0324 8.70966H11.1292Z" fill="black"/>
                            <Path d="M14.4676 6.36664C15.2418 5.70451 15.7741 4.73678 15.7741 3.56532C15.7741 1.57893 14.2741 0 12.387 0C11.3709 0 10.4515 0.509332 9.82251 1.27333C11.9031 1.68079 13.4999 3.61625 13.4999 5.90825C13.4999 6.82504 13.258 7.63997 12.8225 8.35304C13.9838 9.2189 14.8547 10.3904 15.3386 11.8165H17.9999C17.9999 9.32077 16.4999 7.18158 14.4193 6.31571L14.4676 6.36664Z" fill="black"/>
                            <Path d="M5.22578 8.35304C4.83869 7.63997 4.54837 6.82504 4.54837 5.90825C4.54837 3.56532 6.14513 1.68079 8.22577 1.27333C7.59674 0.509332 6.67739 0 5.66126 0C3.77418 0 2.27418 1.57893 2.27418 3.56532C2.27418 4.68585 2.80644 5.70451 3.58063 6.36664C1.49999 7.23251 0 9.3717 0 11.8674H2.61289C3.09676 10.4413 4.01611 9.2189 5.1774 8.40397L5.22578 8.35304Z" fill="black"/>
                        </Svg>
                        <AppText style={styles.text}>
                            Сменить пользователя
                        </AppText>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.line}>
                <TouchableOpacity style={styles.link} onPress={() => {
                    navigation.navigate("RestorePassScreen")
                }}>
                    <View style={styles.lineWrap}>
                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M17.6516 14.4509L10.8903 7.74157C10.9419 7.68996 10.8903 7.68996 10.8387 7.68996C11.0968 7.07063 11.2516 6.34809 11.2516 5.62554C11.2516 2.52891 8.72258 0 5.62581 0C2.52903 0 0 2.52891 0 5.62554C0 8.72217 2.52903 11.2511 5.62581 11.2511C6.29677 11.2511 6.96774 11.0962 7.5871 10.8898C7.5871 10.8898 7.5871 10.9414 7.63871 10.8898L8.56774 11.8188H10.1677V13.4187L10.8387 14.038H12.4387V15.638L14.4516 17.6508C14.9161 18.1153 15.5871 18.1153 16.0516 17.6508L17.6516 16.0509C18.1161 15.5864 18.1161 14.9154 17.6516 14.4509ZM5.62581 7.84479C4.3871 7.84479 3.35484 6.81258 3.35484 5.57393C3.35484 4.33528 4.3871 3.30307 5.62581 3.30307C6.86452 3.30307 7.89677 4.33528 7.89677 5.57393C7.89677 6.81258 6.86452 7.84479 5.62581 7.84479Z" fill="black"/>
                        </Svg>
                        <AppText style={styles.text}>
                            Сменить пароль
                        </AppText>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{...styles.line, borderBottomWidth: 0}}>
                <View style={styles.lineWrap}>
                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M17.7505 11.4137C17.5509 11.2141 6.6736 0.336798 6.6736 0.336798C6.22453 -0.112266 5.52599 -0.112266 5.07692 0.336798L0.336798 5.12682C-0.112266 5.57588 -0.112266 6.27443 0.336798 6.72349C0.336798 6.72349 11.2141 17.6008 11.4137 17.8004C11.6133 18 11.763 18 11.763 18H18V11.8129C18 11.8129 18 11.6632 17.8004 11.4636L17.7505 11.4137ZM11.2141 13.4595C11.2141 12.2121 12.2121 11.2141 13.4595 11.2141C14.7069 11.2141 15.7048 12.2121 15.7048 13.4595C15.7048 14.7069 14.7069 15.7048 13.4595 15.7048C12.2121 15.7048 11.2141 14.7069 11.2141 13.4595Z" fill="black"/>
                    </Svg>
                    <AppText style={styles.text}>
                        У меня есть промокод:
                    </AppText>
                </View>
            </View>
            <AppPromoCode />
            <AppBlueButton style={styles.cancel} onPress={() => {
                navigation.jumpTo("MainPageScreen")
            }}>
                Отмена
            </AppBlueButton>
            <TouchableOpacity style={styles.exit} onPress={async () => {
                await AppFetch.logOut(navigation)
                setTimeout(() => {
                    dispatch(globalLogout())
                }, 200)
            }}>
                <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M14.6961 7.86958H15.8268V3.34696C15.8268 2.7138 15.3293 2.21631 14.6961 2.21631H12.4348V3.34696H14.6961V7.86958Z" fill="black"/>
                    <Path d="M12.4348 18H14.6961C15.3293 18 15.8268 17.5026 15.8268 16.8694H12.4348V18Z" fill="black"/>
                    <Path d="M18.0452 12.392L14.6533 9V11.2613H11.2613V1.13065C11.2613 0.497487 10.7638 0 10.1307 0L1.13065 1.13065C0.497487 1.13065 0 1.62814 0 2.26131V16.8693C0 17.5025 0.497487 18 1.13065 18H10.1307H11.2613V16.8693V13.4774H14.6533V15.7387L18.0452 12.3467V12.392ZM9.04523 10.1307C8.41206 10.1307 7.91457 9.63317 7.91457 9C7.91457 8.36683 8.41206 7.86935 9.04523 7.86935C9.67839 7.86935 10.1759 8.36683 10.1759 9C10.1759 9.63317 9.67839 10.1307 9.04523 10.1307Z" fill="black"/>
                </Svg>
                <AppText style={styles.exitText}>
                    Выйти
                </AppText>
            </TouchableOpacity>
            {/*<View style={styles.voteBlock}>*/}
            {/*    <AppText style={styles.voteText}>*/}
            {/*        Поставьте оценку и помогите другим пользователям натйи приложение.*/}
            {/*    </AppText>*/}
            {/*    <AppVote onResult={result => {*/}
            {/*        console.log('result', result)*/}
            {/*    }} />*/}
            {/*</View>*/}
            <View style={{paddingBottom: 80}}></View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    voteBlock: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto"
    },
    voteText: {
        textAlign: "center"
    },
    exit: {
        width: 120,
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center"
    },
    exitText: {
        marginLeft: 10
    },
    line: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderBottomColor: THEME.GREY,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    text: {
        paddingLeft: 40
    },
    lineWrap: {
        alignItems: "center",
        flexDirection: "row"
    },
    cancel: {
        width: 150,
        marginTop: 40,
        marginLeft: "auto",
        marginRight: "auto"
    }
})

const Stack = createStackNavigator()

const pageScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"StackSettingScreen"} component={pageWrapper} />
        </Stack.Navigator>
    )
}

//Tabs
const Tab = createBottomTabNavigator();

const pageTab = () => {
    return (
        <Tab.Navigator tabBar={() => {
            return <BottomMenu />
        }}
        >
            <Tab.Screen name={"MainTabs"} component={pageScreen} />
        </Tab.Navigator>
    )
}

//Drawers
const Drawer = createDrawerNavigator()

export default ({route}) => {
    globalRouteFun(route)
    return (
        <>
            <Drawer.Navigator
                screenOptions={() => ({
                    headerShown: false
                })}
                drawerPosition="left">
                <Drawer.Screen name="DrawerSettingScreen" component={pageTab} />
            </Drawer.Navigator>
            <AppIndicator timer={1} />
        </>
    )
}

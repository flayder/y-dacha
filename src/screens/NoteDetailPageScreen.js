import React, {useLayoutEffect, useEffect} from "react"
import {View, StyleSheet, ImageBackground} from "react-native"
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppWrap} from "../ui/AppWrap";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {useDispatch, useSelector} from "react-redux";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import {loadNote} from "../store/actions/notes";
import {AppText} from "../ui/AppText";
import AppVideo from "../ui/AppVideo";
import {AppTextItalic} from "../ui/AppTextItalic";
import {FAVORITE_QUESTION, globalRouteFun} from "../../global";
import {THEME} from "../../theme";
import {Path, Svg} from "react-native-svg";
import AppFavoriteButton from "../ui/AppFavoriteButton";

const pageWrapper = ({navigation, route}) => {
    let id = 0
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('noteId')) {
            id = route.params.noteId
        }
    }
    if(id === 0) {
       return (
           <AppTextBold>
               Неверные данные!
           </AppTextBold>
       )
    }
    useLayoutEffect(() => {
        navigation.setOptions(
            mainHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "NotesPageScreen"
                }),
            [navigation])
    })

    const init = true
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadNote({id, navigation}))
    }, [init])

    const data = useSelector(state => state.notes.currentNote)

    //console.log('data', data)

    return (
        <AppWrap>
            <View style={styles.containerList}>
                {
                    data.culture
                    ?
                        <View style={styles.list}>
                            <AppTextBold style={styles.boldList}>
                                Культура:
                            </AppTextBold>
                            <AppText style={styles.textList}>
                                {data.culture}
                            </AppText>
                        </View>
                        :
                        <></>
                }

                <View style={{...styles.list, flexDirection: "column"}}>
                    <AppTextBold style={styles.boldList}>
                        {data.name}
                    </AppTextBold>
                    {
                        data.author
                            ?
                            <AppTextItalic style={styles.textList}>
                                {data.author}
                            </AppTextItalic>
                            :
                            <></>
                    }

                </View>

            </View>
            <AppText>
                {data.description}
            </AppText>
            {
                data.video
                    ?
                    <AppVideo source={data.video} />
                    :
                    <></>
            }
            {
                typeof data == "object" && data.hasOwnProperty('favorite')
                    ?
                    <AppFavoriteButton
                        id={data.id}
                        type={FAVORITE_QUESTION}
                        style={styles.btn}
                        isActive={data.favorite}
                        hintText={"Справка успешно добавлена в избранное"}
                        activeForm={() => {
                            return <View
                                color={THEME.FOOTER_BG}
                                style={styles.btnWrap}
                            >
                                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.74491 1.91978L8.9982 2.19794L9.25344 1.92157C11.1959 -0.181583 14.2974 -0.178869 16.2083 1.91978C18.1371 4.03802 18.1372 7.49277 16.2086 9.61115C16.2085 9.61126 16.2084 9.61136 16.2083 9.61147L9 17.4889L1.79168 9.61147C-0.136952 7.49342 -0.137226 4.03911 1.79086 1.92068C3.73334 -0.181582 6.83422 -0.178571 8.74491 1.91978ZM15.3644 6.1481L15.4405 6.18875H15.5268H15.5561H15.7755L15.8685 5.99006C16.0361 5.63234 16.1352 5.20745 16.1352 4.78125C16.1352 3.2656 14.9745 2.03 13.5366 2.03C12.9915 2.03 12.4834 2.21163 12.078 2.50018L11.8134 2.68851L11.9854 2.96397L12.6293 3.99522L12.8234 4.30611L13.122 4.09357C13.2627 3.99343 13.3984 3.93875 13.5366 3.93875C13.9397 3.93875 14.3038 4.2939 14.3038 4.78125C14.3038 4.93851 14.2783 5.05928 14.2309 5.14349L14.0582 5.45082L14.3692 5.61685L15.3644 6.1481Z" stroke="white" stroke-width="0.69"/>
                                </Svg>
                                <View style={{width: 10}}></View>
                                <AppTextBold style={styles.btnWrapText}>
                                    Уже в избранном
                                </AppTextBold>
                            </View>
                        }}
                        passiveForm={() => {
                            return <View
                                style={styles.btnWrap}
                                color={THEME.FOOTER_BG}
                            >
                                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.74491 1.91978L8.9982 2.19794L9.25344 1.92157C11.1959 -0.181583 14.2974 -0.178869 16.2083 1.91978C18.1371 4.03802 18.1372 7.49277 16.2086 9.61115C16.2085 9.61126 16.2084 9.61136 16.2083 9.61147L9 17.4889L1.79168 9.61147C-0.136952 7.49342 -0.137226 4.03911 1.79086 1.92068C3.73334 -0.181582 6.83422 -0.178571 8.74491 1.91978ZM15.3644 6.1481L15.4405 6.18875H15.5268H15.5561H15.7755L15.8685 5.99006C16.0361 5.63234 16.1352 5.20745 16.1352 4.78125C16.1352 3.2656 14.9745 2.03 13.5366 2.03C12.9915 2.03 12.4834 2.21163 12.078 2.50018L11.8134 2.68851L11.9854 2.96397L12.6293 3.99522L12.8234 4.30611L13.122 4.09357C13.2627 3.99343 13.3984 3.93875 13.5366 3.93875C13.9397 3.93875 14.3038 4.2939 14.3038 4.78125C14.3038 4.93851 14.2783 5.05928 14.2309 5.14349L14.0582 5.45082L14.3692 5.61685L15.3644 6.1481Z" stroke="white" stroke-width="0.69"/>
                                </Svg>
                                <View style={{width: 10}}></View>
                                <AppTextBold style={styles.btnWrapText}>
                                    Добавить в избранное
                                </AppTextBold>
                            </View>
                        }}
                    />
                    :
                    <></>
            }
            <View style={{height: 40}}></View>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    btnWrapText: {
        marginTop: 0,
        marginBottom: 0,
        color: "#fff"
    },
    list: {
        flexDirection: "row"
    },
    boldList: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10
    },
    textList: {
        marginTop: 10,
        marginBottom: 10
    },
    btnWrap: {
        width: 260,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: THEME.FOOTER_BG,
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        borderRadius: 6
    },
})

const Stack = createStackNavigator()

const pageScreen = ({navigation, route}) => {
    //console.log('StackPageScreen', route.params)
    return (
        <Stack.Navigator>
            <Stack.Screen name={"StackPageScreen"} component={pageWrapper} />
        </Stack.Navigator>
    )
}

//Tabs
const Tab = createBottomTabNavigator();

const PageTab = ({navigation, route}) => {
    //console.log('InsideTabs', route.params)
    return (
        <Tab.Navigator tabBar={() => {
            return <BottomMenu />
        }}
        >
            <Tab.Screen name={"InsideTabs"} component={pageScreen} />
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
                drawerContent={AppDrawerContentHandler} drawerPosition="left"
            >
                <Drawer.Screen name="InsidePageScreen" component={PageTab} />
            </Drawer.Navigator>
            <AppIndicator timer={2} />
        </>
    )
}

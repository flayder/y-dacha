import React, {useLayoutEffect, useEffect, useState, useRef} from "react"
import {StyleSheet, View, ImageBackground, TextInput, TouchableOpacity, Dimensions, Image} from "react-native"
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppWrap} from "../ui/AppWrap";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {useDispatch, useSelector} from "react-redux";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {globalAlert, mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import {loadEvent, loadEventComments} from "../store/actions/events";
import AppEventSlider from "../ui/eventDetailPageScreen/AppEventSlider";
import {Svg, Path, Rect} from "react-native-svg";
import {AppText} from "../ui/AppText";
import AppCommentBlock from "../ui/eventDetailPageScreen/AppCommentBlock";
import {THEME} from "../../theme";
import {AppBlueButton} from "../ui/AppBlueButton";
import {EXHIB, FAIRS, FAVORITE_EVENT, FEST, getRandomKey, globalRouteFun, LinkTo, NEWS} from "../../global";
import moment from "moment";
import 'moment/locale/ru'
import {AppFetch} from "../AppFetch";
import {AppTextItalic} from "../ui/AppTextItalic";
import AppEmptyText from "../ui/AppEmptyText";
import AppJoinBlock from "../ui/eventDetailPageScreen/AppJoinBlock";
import AppFavoriteButton from "../ui/AppFavoriteButton";
import {setCurrentRoute} from "../store/actions/other";

const pageWrapper = ({navigation, route}) => {
    let id = 74
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('eventId')) {
            id = route.params.eventId
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
                    routeName: "EventsPageScreen"
                }),
            [navigation])
    })

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    const init = true
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadEvent({id, navigation}))
        dispatch(loadEventComments({id, navigation}))
    }, [init])

    const text = useRef("")

    const dataEvent = useSelector(state => state.events)
    const data = dataEvent.currentEvent
    const comments = dataEvent.comments
    //console.log('comments', comments)
    const photo = []
    if(data.hasOwnProperty('event') && data.event.hasOwnProperty('main_photo') && data.event.main_photo != "") {
        photo.push(data.event.main_photo)
    }

    if(data.hasOwnProperty('photos') && Array.isArray(data.photos) && data.photos.length > 0) {
        data.photos.map(ph => {
            if(ph != "") photo.push(ph)
        })
    }

    const messageInput = useRef()
    const [showAllCommentMessage, setShowingCommMess] = useState(false)

    const nameOfTitle = () => {
        if(data.hasOwnProperty('event') && data.event.hasOwnProperty('type') && data.event.type != "") {
            switch (data.event.type) {
                case EXHIB:
                    return "ВЫСТАВКИ"
                case FAIRS:
                    return "ЯРМАРКИ"
                case FEST:
                    return "ФЕСТИВАЛЯ"
                case NEWS:
                    return "НОВОСТЕЙ"
                default:
                    return ""
            }
        }
        return ""
    }

    const generateDays = () => {
        const elements = []
        for(let date in data.days) {
            elements.push(
                <View key={getRandomKey()}>
                    <AppTextBold style={styles.descrDate}>
                        {moment(date).format("DD MMMM YYYY")} года
                    </AppTextBold>
                    {
                        Array.isArray(data.days[date])
                            ?
                            data.days[date].map(d => {
                               return <AppText key={getRandomKey()} style={styles.descrBold}>
                                    <AppTextBold style={styles.descrText}>
                                        {d.time}
                                        <View style={styles.tab}></View></AppTextBold>
                                   {d.description}
                                </AppText>
                            })
                            :
                            <></>
                    }
                </View>
            )
        }
        return elements
    }

    const sendMessage = async () => {
        if(text.current == "") globalAlert({text: "Вы не ввели ссобщение"})
        else {
            const response = await AppFetch.getWithToken('addEventComment', {
                id,
                text: text.current
            }, {}, navigation)
            try {
                messageInput.current.clear()
            } catch (e) {}
            dispatch(loadEventComments({id, navigation}))
        }

    }

    const generateComments = () => {
        const elements = []
        if( comments.length > 3) {
            if(!showAllCommentMessage) {
                for (let i = 0; i < 3; i++) {
                    elements.push(
                        <AppCommentBlock
                            key={getRandomKey()}
                            data={comments[i]}
                        />
                    )
                }
                return <View>
                    {elements}

                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.showMoreComments}
                        onPress={() => {
                            setShowingCommMess(!showAllCommentMessage)
                        }}
                    >
                        <AppTextItalic style={styles.showMoreCommentsText}>
                            Показать все комментарии ({comments.length - 3})
                        </AppTextItalic>
                    </TouchableOpacity>
                </View>
            }
        }

        for (let i = 0; i < comments.length; i++) {
            elements.push(
                <AppCommentBlock
                    key={getRandomKey()}
                    data={comments[i]}
                />
            )
        }

        return (elements.length > 0) ? elements : <AppEmptyText text={"Список комментариев пуст"} />
    }

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            <AppEventSlider
                photos={photo}
                screenWidth={screeWidth}
            />
            {
                data.hasOwnProperty('event')
                    ?
                    <View style={styles.content}>
                        <AppTextBold style={styles.title}>
                            {data.event.title}
                        </AppTextBold>
                        <AppFavoriteButton
                            id={data.event.id}
                            type={FAVORITE_EVENT}
                            style={styles.btn}
                            isActive={data.event.favorite}
                            hintText={"Событие успешно добавлено в избранное"}
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
                        {
                            data.event.description
                                ?
                                <AppText style={styles.descr}>
                                    {data.event.description}
                                </AppText>
                                :
                                <></>
                        }
                    </View>
                    :
                    <></>
            }
            <View style={{...styles.descrWrap, backgroundColor: THEME.EVENT_COLOR, marginTop: 20}}></View>
            <View style={{...styles.descrWrap, borderRadius: 45, backgroundColor: "white", marginTop: - 60}}>
                <AppTextBold style={styles.descrTitle}>
                    ПРОГРАММА {nameOfTitle()}:
                </AppTextBold>
                {
                    generateDays()
                }
            </View>
            <View style={styles.commentWrap}>
                <AppTextBold style={styles.commentWrapText}>
                    Комментарии:
                </AppTextBold>
                {
                    generateComments()
                }

            </View>
            <View style={styles.messagePanel}>
                <TextInput
                    //multiline={true}
                    //textAlignVertical={"top"}
                    style={{...styles.inputMessage, width: screeWidth - 100}}
                    onChangeText={someText => {
                        //console.log('someText', someText)
                        text.current = someText
                    }}
                    ref={messageInput}
                    placeholder={"Ваше сообщение"}
                />
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={async () => {
                        await sendMessage()
                    }}
                >
                    <Svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Rect width="42" height="42" rx="21" fill="#000"/>
                        <Path d="M29 27L31 25L21 15L11 25L13 27L21 19L29 27Z" fill="white"/>
                    </Svg>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomPanel}>
                <AppJoinBlock
                    data={data}
                    id={id}
                    navigation={navigation}
                    onResult={() => {
                        setTimeout(() => {
                            dispatch(loadEvent({id, navigation}))
                        }, 5000)
                    }}
                />
                <View style={styles.bottomText}>
                    <Svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M7.40385 6.21362H6.15385H2.5C1.15385 6.21362 0 7.37867 0 8.73789V13.6893C0 14.3689 0.576923 14.9515 1.25 14.9515H2.5V18.7379C2.5 19.4175 3.07692 20 3.75 20H6.25C6.92308 20 7.5 19.4175 7.5 18.7379V14.9515H8.75C9.42308 14.9515 10 14.3689 10 13.6893V8.73789C10 7.37867 8.84615 6.21362 7.5 6.21362H7.40385Z" fill="#53588A"/>
                        <Path d="M4.9043 5.04853C6.28501 5.04853 7.4043 3.91838 7.4043 2.52426C7.4043 1.13015 6.28501 0 4.9043 0C3.52358 0 2.4043 1.13015 2.4043 2.52426C2.4043 3.91838 3.52358 5.04853 4.9043 5.04853Z" fill="#53588A"/>
                    </Svg>
                    <AppText style={styles.botText}>
                        На мероприятие собираются пойти {data.countOfPeople} чел.
                    </AppText>
                </View>
            </View>
            <ImageBackground
                style={styles.bottomBg}
                source={require("@images/eventDetailPageScreen/bg.png")}
                resizeMode={"stretch"}
            >
                <View style={styles.bottomBgTitler}>
                    <AppTextBold style={styles.bottomBgTitlerText}>
                        Остались вопросы?
                    </AppTextBold>
                    <AppTextBold style={styles.bottomBgTitlerText}>
                        Задайте их организатору!
                    </AppTextBold>
                </View>
                {
                    data.hasOwnProperty('user')
                        ?
                        <>
                            <Image
                                style={styles.bottomBgAva}
                                source={{uri: data.user.info.photo}}
                            />
                            <AppText style={styles.bottomBgName}>
                                {data.user.info.first_name} {data.user.info.last_name}
                            </AppText>
                            <AppBlueButton
                                style={styles.bottomBgBtn}
                                onPress={() => {
                                    LinkTo("ChatPageScreen", {
                                        masterId: data.user.info.user_id,
                                        type: "decorator"
                                    }, navigation)
                                }}
                            >
                                Написать
                            </AppBlueButton>
                            <View style={styles.bottomBgLine}>
                                <Svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M16.2 15H1.8C0.805887 15 0 14.1605 0 13.125V1.79344C0.0419475 0.789889 0.83568 -0.000949102 1.8 8.54917e-07H16.2C17.1941 8.54917e-07 18 0.839468 18 1.875V13.125C18 14.1605 17.1941 15 16.2 15ZM1.8 3.62625V13.125H16.2V3.62625L9 8.625L1.8 3.62625ZM2.52 1.875L9 6.375L15.48 1.875H2.52Z" fill="#5382D8"/>
                                </Svg>
                                <AppText style={styles.bottomBgLineValue}>
                                    {data.event.contact_email}
                                </AppText>
                            </View>
                            <View style={styles.bottomBgLine}>
                                <Svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M12.8218 0H1.17822C0.554455 0 0 0.533333 0 1.13333V16.8667C0 17.4667 0.554455 18 1.17822 18H12.8218C13.4455 18 14 17.4667 14 16.8667V1.13333C14 0.533333 13.4455 0 12.8218 0V0ZM6.93069 17.3333C6.58416 17.3333 6.30693 17.0667 6.30693 16.7333C6.30693 16.4 6.58416 16.1333 6.93069 16.1333C7.27723 16.1333 7.55446 16.4 7.55446 16.7333C7.55446 17.0667 7.27723 17.3333 6.93069 17.3333ZM12.8218 15.6667H1.17822V1.06667H12.8218V15.6667Z" fill="#5382D8"/>
                                    <Path d="M11.7129 2.26733H2.35645V14.6007H11.7129V2.26733Z" fill="#5382D8"/>
                                </Svg>
                                <AppText style={styles.bottomBgLineValue}>
                                    {data.event.contacts}
                                </AppText>
                            </View>
                        </>
                        :
                        <></>
                }
            </ImageBackground>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    btnWrapText: {
        marginTop: 0,
        marginBottom: 0,
        color: "#fff"
    },
    btnWrap: {
        backgroundColor: THEME.FOOTER_BG,
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        borderRadius: 6
    },
    showMoreComments: {
        width: "100%"
    },
    showMoreCommentsText: {
        color: THEME.BLUE,
        width: "100%",
        textAlign: "center"
    },
    commentWrap: {
        backgroundColor: THEME.EVENT_COLOR,
        paddingTop: 20,
        paddingBottom: 20
    },
    commentWrapText: {
        textAlign: "center",
        color: THEME.FOOTER_BG
    },
    bottomBgTitler: {
        paddingBottom: 10
    },
    bottomBgLineValue: {
        paddingLeft: 10
    },
    bottomBgLine: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    bottomBgBtn: {
        width: 150,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: "auto",
        marginRight: "auto"
    },
    bottomBgName: {
        textAlign: "center"
    },
    bottomBgAva: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: "auto",
        marginRight: "auto"
    },
    bottomBgTitlerText: {
        textAlign: "center",
        marginTop: 0,
        marginBottom: 0
    },
    botText: {
        color: THEME.FOOTER_BG,
        paddingLeft: 10
    },
    bottomText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    bottomPanel: {
        paddingLeft: 20,
        paddingRight: 20
    },
    tab: {
        width: 5
    },
    descrText: {
        paddingRight: 10
    },
    descrBold: {
        marginTop: 0,
        marginBottom: 0
    },
    descrDate: {
        color: THEME.FOOTER_BG
    },
    descrTitle: {
        textAlign: "center",
        color: THEME.FOOTER_BG,
        marginTop: 0
    },
    descrWrap: {
        width: "100%",
        padding: 30,
        minHeight: 100,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 70,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    },
    btn: {
        width: 230,
        marginLeft: "auto",
        marginRight: "auto"
    },
    content: {
        paddingLeft: 20,
        paddingRight: 20
    },
    bottomBg: {
        marginTop: 30,
        paddingTop: 40,
        paddingBottom: 30,
        width: "100%"
    },
    inputMessage: {
        backgroundColor: THEME.SLIDER_BG,
        padding: 15,
        height: 60,
        borderRadius: 30
    },
    messagePanel: {
        padding: 20,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    messageBlockRight: {
        //flexDirection: "row"
        paddingRight: 20
    },
    messageRight: {
        flexDirection: "row"
    },
    messageRightText: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: THEME.ALL_COLOR,
        padding: 20,
        borderRadius: 30,
        borderTopRightRadius: 0
    },
    title: {
        marginTop: 20,
        marginBottom: 20,
        color: THEME.FOOTER_BG
    },
    bg: {
        width: "100%",
        height: 160,
        marginBottom: 5,
        backgroundColor: "red"
    },
    voteWrap: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    vote: {
        width: "50%",
        flexWrap: "wrap",
        paddingLeft: 30,
        paddingRight: 30
    }
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

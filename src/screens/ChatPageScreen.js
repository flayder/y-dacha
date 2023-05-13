import React, {useLayoutEffect, useEffect, useState, useRef} from "react"
import {
    View,
    Alert,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    KeyboardAvoidingView
} from "react-native"
import ScrollView from 'react-native-invertible-scroll-view';
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {useDispatch, useSelector} from "react-redux";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {chatHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import {getChat} from "../store/actions/chat";
import {Svg, Path, Rect} from "react-native-svg";
import {AppText} from "../ui/AppText";
import {THEME} from "../../theme";
import {getRandomKey, globalRouteFun} from "../../global";
import moment from "moment";
import 'moment/locale/ru'
import {AppFetch} from "../AppFetch";
import {setCurrentRoute} from "../store/actions/other";
import AppFastImage from "../ui/AppFastImage";

const pageWrapper = ({navigation, route}) => {
    let id = 0
    let type = ""
    //console.log('chat route.params', route.params)
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('sortId')) {
            id = route.params.sortId
        } else if(route.params.hasOwnProperty('masterId')) {
            id = route.params.masterId
        } else if(route.params.hasOwnProperty('chemicalId')) {
            id = route.params.chemicalId
        } else if(route.params.hasOwnProperty('eventId')) {
            id = route.params.eventId
        }

        if(route.params.hasOwnProperty('type')) {
            type = route.params.type
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
            chatHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "MasterDetailPageScreen"
                }),
            [navigation])
    })
    let scrollRef = useRef()
    const [loadMore, setLoadMore] = useState(false)
    const [load, setLoad] = useState(false)
    const dataCurrent = useSelector(state => state.chat)
    //console.log('dataCurrent', dataCurrent)
    const pagination = useRef(1)
    const scrollTo = useRef(0)
    const messages = dataCurrent.messages
    const from = dataCurrent.user_from
    const to = dataCurrent.user_to
    const blocked = dataCurrent.blocked
    const counts = dataCurrent.counts
    const init = true
    const dispatch = useDispatch()
    const data = {}
    const text = useRef("")

    //console.log('counts', counts)

    useEffect(() => {
        if(pagination.current > 1) {
            if (scrollRef.current !== undefined)
                setTimeout(() => {
                    scrollRef.current.scrollTo({y: scrollTo.current})
                }, 300)
            //console.log('scrollTo.current', scrollTo.current)

        }

        if (!loadMore)
            setLoadMore(true)
    }, [messages.length])

    for(let i in messages) {
        const date = moment(messages[i].date).format('YYYY-MM-DD')
        if(!data.hasOwnProperty(date)) {
            let arr = []
            arr.push(messages[i])

            data[date] = arr
        } else {
            let arr = data[date]
            arr.unshift(messages[i])
            data[date] = arr
        }
    }

    //console.log('data', JSON.stringify(data))
    const initiate = (loadMore = false) => {
        dispatch(getChat({id, type, pagination: pagination.current, navigation, loadMore})).then(res => {
        }).then(item => {
            //console.log('item', item)

        }).catch(error => {})
        //console.log('scrollRef.current', scrollRef.current)
        if(scrollRef.current !== undefined) {
            // setTimeout(() => {
            //     //console.log('here')
            //     setTimeout(() => {
            //
            //     }, 200)
            // }, 100)
        }
    }
    useEffect(() => {
        //console.log('okokoo')
        pagination.current = 1
       initiate()
    }, [init])

    useEffect(() => {
       if(pagination.current > 1 && counts > 0) {
           initiate(true)
       }
       //setData(true)
    }, [pagination.current])

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    //console.log('loadMore', loadMore)

    const scrollerHandler = ({nativeEvent}) => {
        const scroll = nativeEvent.contentSize.height - nativeEvent.contentOffset.y
        //console.log('scroll', scroll)
        if(scroll < 500 && 0 < scroll && loadMore && counts > 0 && scrollTo.current != nativeEvent.contentSize.height) {
           scrollTo.current = nativeEvent.contentSize.height
           pagination.current = pagination.current += 1
           setLoadMore(false)
            //scrollRef.current.scrollTo({y: scrollTo.current / 2})
        }
    }

    const widthText = screeWidth - 180

    const isUserFrom = (id) => {
        if(
            from && from.hasOwnProperty('info') &&
            from.info.hasOwnProperty('user_id') &&
            from.info.user_id == id
        )
            return true

        return false
    }

    const forUserMessage = (data) => {
        const users = []
        let checking = 0
        for(let id in data) {
            users.push(
                <View key={getRandomKey()}>
                    {
                        isUserFrom(data[id].from)
                            ?
                            <View style={styles.messageLeft}>
                                <View style={styles.avaWrap}>
                                    {
                                        (from.hasOwnProperty('info') && data[id].from != checking)
                                            ?
                                            <AppFastImage
                                                style={styles.ava}
                                                uri={from.info.photo}
                                            />
                                            :
                                            <View style={styles.ava}></View>
                                    }
                                </View>
                                <View style={styles.messageBlockLeft}>
                                    <View style={styles.messagerWrap}>
                                        <View style={{...styles.messageLeftText, width: widthText}}>
                                            <AppText style={styles.text}>
                                                {data[id].text}
                                            </AppText>
                                        </View>
                                        <View style={styles.messageDateWrap}>
                                            <AppText style={styles.messageDate}>
                                                {moment(data[id].date).format("HH:mm")}
                                            </AppText>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            :
                            <View style={styles.messageRight}>
                                <View style={styles.messageBlockRight}>
                                    {
                                        <View style={styles.messagerWrap}>
                                            <View style={styles.messageDateWrap}>
                                                <AppText style={styles.messageDate}>
                                                    {moment(data[id].date).format('HH:mm')}
                                                </AppText>
                                            </View>
                                            <View style={{...styles.messageRightText, width: widthText}}>
                                                <AppText style={styles.text}>
                                                    {data[id].text}
                                                </AppText>
                                            </View>
                                        </View>
                                    }
                                </View>
                                <View style={styles.avaWrap}>
                                    {
                                        (to.hasOwnProperty('info') && data[id].from != checking)
                                            ?
                                            <AppFastImage
                                                style={styles.ava}
                                                uri={to.info.photo}
                                            />
                                            :
                                            <View style={styles.ava}></View>
                                    }
                                </View>
                            </View>
                    }
                </View>
            )

            checking = data[id].from
        }

        return users
    }

    const forDate = (messages) => {
        const dates = []
        for(let date in messages) {
            dates.push(
                <View key={getRandomKey()}>
                    <AppText style={styles.date}>
                        {moment(date).locale("ru").calendar(null,{
                            lastDay : '[Вчера]',
                            sameDay : '[Сегодня]',
                            nextDay : '[Завтра]',
                            lastWeek : 'dddd',
                            nextWeek : 'dddd',
                            sameElse : 'L'
                        })}
                    </AppText>
                    {
                        forUserMessage(messages[date])
                    }
                </View>
            )
        }

        return dates
    }

    const sendMessage = async () => {
        if(text == "") {
            Alert.alert(
                'Вы не ввели текст сообщение',
                '',
                [
                    { text: 'Ясно', onPress: () => console.log('OK Pressed') }
                ],
                {}
            );
        } else {
            const response = await AppFetch.getWithToken("sendChatMessage", {
                user_to: id,
                text: encodeURIComponent(text.current)
            }, {}, navigation)

            //console.log('response', response)

            if(response.result) {
                text.current = ""
                setLoad(!load)
                initiate()
            }
        }

        return Promise.resolve(true)
    }

    const ViewWrapper = ({children}) => {
        //console.log('Platform.OS', Platform.OS)
        if(Platform.OS != "ios") {
            //console.log('here123')
            return (
                <View style={{flex: 1}}>
                    {children}
                </View>
            )
        } else  {
            return (
                <KeyboardAvoidingView
                    style={{flex: 1}}
                    behavior={"padding"}
                    keyboardVerticalOffset={40}
                >
                    {children}
                </KeyboardAvoidingView>
            )
        }
    }

    if(!blocked) {
        return (
            <ViewWrapper>
                {
                    messages.length > 0
                        ?

                            <ScrollView
                                style={styles.scroll}
                                onScroll={scrollerHandler}
                                ref={scrollRef}
                                scrollEventThrottle={1}
                                inverted={true}
                            >
                                {
                                    forDate(data)
                                }

                            </ScrollView>


                        :
                        <View style={styles.empty}>
                            <AppTextBold style={styles.emptyElements}>
                                Нет сообщений с этим пользователем
                            </AppTextBold>
                        </View>
                }
                <View style={styles.messagePanel}>
                    <TextInput
                        //multiline={true}
                        //textAlignVertical={"top"}
                        style={{...styles.inputMessage, width: screeWidth - 100}}
                        onChangeText={someText => {
                            //console.log('someText', someText)
                            text.current = someText
                        }}
                        defaultValue={text.current}
                        placeholder={"Ваше сообщение"}
                    />
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={async () => {
                            await sendMessage()
                        }}
                    >
                        <Svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Rect width="42" height="42" rx="21" fill="#53588A"/>
                            <Path d="M29 27L31 25L21 15L11 25L13 27L21 19L29 27Z" fill="white"/>
                        </Svg>
                    </TouchableOpacity>
                </View>
                <View style={{height: 70}}></View>
            </ViewWrapper>
        )
    }
    else {
        return (
            <View style={styles.empty}>
                <AppTextBold style={styles.blockedUser}>
                    Вы заблокировали этого пользователя
                </AppTextBold>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    emptyElements: {
        color: "green",
        fontSize: 20
    },
    empty: {
        backgroundColor: "#fff",
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    blockedUser: {
        color: "red",
        fontSize: 20
    },
    scroll: {
        backgroundColor: "#fff",
        paddingLeft: 20,
        paddingRight: 20,
        position: "relative"
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
    avaWrap: {
        paddingTop: 20
    },
    messageBlockLeft: {
        paddingLeft: 20
    },
    date: {
        textAlign: "center",
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#000"
    },
    messageLeft: {
        flexDirection: "row"
    },
    text: {
        marginTop: 0,
        marginBottom: 0
    },
    messageLeftText: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: THEME.SLIDER_BG,
        padding: 20,
        borderRadius: 30,
        borderTopLeftRadius: 0
    },
    ava: {
        width: 50,
        height: 50,
        //backgroundColor: "red",
        borderRadius: 25
    },
    messagerWrap: {
        flexDirection: "row"
    },
    messageDateWrap: {
        width: 60,
        alignItems: "center",
        justifyContent: "center"
    },
    messageDate: {
        width: 60,
        fontSize: 13,
        textAlign: "center",
        color: THEME.GREY_TEXT,
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
            <AppIndicator timer={1} />
        </>
    )
}

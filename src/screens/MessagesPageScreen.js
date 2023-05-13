import React, {useLayoutEffect, useEffect, useState, useRef} from "react"
import {View, StyleSheet, TouchableOpacity, ScrollView, Dimensions} from "react-native"
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {useDispatch, useSelector} from "react-redux";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {globalAlert, messageHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import {getChats} from "../store/actions/chat";
import {Svg, Path} from "react-native-svg";
import {AppText} from "../ui/AppText";
import {THEME} from "../../theme";
import {addToArrayOrRemove, getRandomKey, globalRouteFun, SCROLL_INITIATION_TO_PAGINATE} from "../../global";
import 'moment/locale/ru'
import {AppFetch} from "../AppFetch";
import AppChatItem from "../ui/messagesPageScreen/AppChatItem";
import Checkbox from "../ui/Checkbox";
import AppMessageTabs from "../ui/messagesPageScreen/AppMessageTabs";
import {getAllComments, setCommentTab} from "../store/actions/comments";
import AppCommentItem from "../ui/messagesPageScreen/AppCommentItem";
import {setCurrentRoute, setGlobalMessage} from "../store/actions/other";

const pageWrapper = ({navigation, route}) => {
    useLayoutEffect(() => {
        navigation.setOptions(
            messageHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "MainPageScreen",
                    titleName: "Сообщения"
                }),
            [navigation])
    })
    let scrollRef = useRef()
    const [loadMore, setLoadMore] = useState(false)
    const dataCurrent = useSelector(state => state.chat)
    //console.log('dataCurrent', dataCurrent)
    const pagination = useRef(1)
    const scrollTo = useRef(0)
    const messages = dataCurrent.messages
    const init = true
    const [selected, setSelected] = useState([])
    const dispatch = useDispatch()
    const data = {}
    const [text, setText] = useState("")
    const [activated, setActivated] = useState(false)
    const [tab, setTab] = useState("message")
    const dataCurrent1 = useSelector(state => state.comments)
    const comments = dataCurrent1.comments
    const counts = dataCurrent1.counts

    const isSelected = (id) => {
        return selected.includes(id)
    }

    //console.log('data', data)

    useEffect(() => {
        dispatch(getChats({navigation}))
        dispatch(getAllComments({navigation})).then(res => {
            setLoadMore(true)
        })
    }, [init])

    useEffect(() => {
        if(pagination.current > 1 && counts > 0)
            dispatch(getAllComments({pagination: pagination.current, loadMore: true, navigation})).then(res => {
                setLoadMore(true)
            })
        //setData(true)
    }, [pagination.current])

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    //console.log('loadMore', loadMore)

    const scrollerHandler = ({nativeEvent}) => {
        const scroll = nativeEvent.contentOffset.y
        //console.log('scroll', scroll)
        if(scroll < SCROLL_INITIATION_TO_PAGINATE && 0 < scroll && loadMore && counts > 0 && scrollTo.current != nativeEvent.contentSize.height) {
           scrollTo.current = nativeEvent.contentSize.height
           pagination.current = pagination.current += 1
           setLoadMore(false)
            //scrollRef.current.scrollTo({y: scrollTo.current / 2})
        }
    }

    const selectAllFun = val => {
        if(val) {
            const arr = []
            for(let id in messages) {
                arr.push(messages[id].id)
            }
            setSelected(arr)
        }
        else
            setSelected([])
    }

    const readChats = async () => {
        if(selected.length > 0) {
            const response = await AppFetch.getWithToken("readChats", {
                chats: JSON.stringify(selected)
            }, {}, navigation)
            //console.log('response', response)
            dispatch(getChats({navigation}))
            setActivated(false)
        } else
            globalAlert({title: "Вы не выбрали не одно сообщение!"})
    }

    if(tab == "message") {
        return (
            <ScrollView
                style={styles.scroll}
                ref={scrollRef}
            >
                <View style={styles.wrapBlock}>
                    <AppMessageTabs
                        data={[
                            {
                                name: "Сообщение",
                                value: "message"
                            },
                            {
                                name: "Комментарий",
                                value: "comment"
                            }
                        ]}
                        active={tab}
                        onResult={async val => {
                            setTab(val)
                            await dispatch(setCommentTab({tabName: "Комментарии"}))
                        }}
                    />
                </View>
                <View style={styles.commentBlock}>
                    {
                        activated
                            ?
                            <View style={styles.selectedBlock}>
                                <View style={styles.selected}>
                                    <View style={styles.selectedIconWrap}>
                                        <Checkbox
                                            onChange={selectAllFun}
                                        />
                                    </View>
                                    <View style={styles.selectedTextWrap}>
                                        <AppTextBold style={styles.selectedText}>Выбрать все</AppTextBold>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.selected}
                                    onPress={readChats}
                                >
                                    <View style={styles.selectedIconWrap}>
                                        <Svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M13.9172 0.37844H14.0651L14.0846 0.357964C14.4218 0.423287 14.6868 0.72936 14.6868 1.13696V16.8872C14.6868 17.3481 14.3479 17.6792 13.949 17.6792H1.0828C0.68392 17.6792 0.345 17.3481 0.345 16.8872V5.99637H4.80892C5.30175 5.99637 5.69532 5.55833 5.69532 5.08289V0.37844H13.9172ZM11.7834 14.9917H12.1284V14.6467V13.5098V13.1648H11.7834H3.21656H2.87156V13.5098V14.6467V14.9917H3.21656H11.7834ZM11.7834 12.7513H12.1284V12.4063V11.2693V10.9243H11.7834H3.21656H2.87156V11.2693V12.4063V12.7513H3.21656H11.7834ZM11.7834 10.5108H12.1284V10.1658V9.02881V8.68381H11.7834H3.21656H2.87156V9.02881V10.1658V10.5108H3.21656H11.7834ZM11.7834 8.27029H12.1284V7.92529V6.78833V6.44333H11.7834H5.35032H5.00532V6.78833V7.92529V8.27029H5.35032H11.7834ZM11.7834 6.02981H12.1284V5.68481V4.54785V4.20285H11.7834H7.48408H7.13908V4.54785V5.68481V6.02981H7.48408H11.7834Z" stroke="#5382D8" stroke-width="0.69"/>
                                        </Svg>
                                    </View>
                                    <View style={styles.selectedTextWrap}>
                                        <AppText style={styles.selectedText}>Сделать прочитанным</AppText>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            <></>
                    }
                    {
                        (Array.isArray(messages))
                            ?
                            messages.map(item => {
                                return <AppChatItem
                                    key={getRandomKey()}
                                    screenWidth={screeWidth}
                                    checked={isSelected(item.id)}
                                    active={activated}
                                    item={item}
                                    onLongPress={id => {
                                        const arr = addToArrayOrRemove(id, selected)
                                        //console.log('arr', arr, item)
                                        setTimeout(() => {
                                            setSelected(arr)
                                        }, 200)
                                        setActivated(true)
                                    }}
                                    onDelete={async id => {
                                        const response = await AppFetch.getWithToken("deleteChats", {
                                            chats: JSON.stringify([id])
                                        }, {}, navigation)

                                        dispatch(getChats({navigation}))
                                    }}
                                    onSelected={id => {
                                        const arr = addToArrayOrRemove(id, selected)
                                        setSelected(arr)
                                    }}
                                />
                            })
                            :
                            <></>
                    }
                </View>
            </ScrollView>
        )
    } else {
        return (
            <ScrollView
                style={styles.scroll}
                onScroll={scrollerHandler}
                ref={scrollRef}
                scrollEventThrottle={1}
            >
                <View style={styles.wrapBlock}>
                    <AppMessageTabs
                        data={[
                            {
                                name: "Сообщение",
                                value: "message"
                            },
                            {
                                name: "Комментарий",
                                value: "comment"
                            }
                        ]}
                        active={tab}
                        onResult={val => {
                            setTab(val)
                            dispatch(setCommentTab({tabName: "Сообщения"}))
                        }}
                    />
                </View>
                <View style={styles.commentBlock}>
                    {
                        (Array.isArray(comments))
                            ?
                            comments.map(item => {
                                return <AppCommentItem
                                    key={getRandomKey()}
                                    item={item}
                                    screenWidth={screeWidth}
                                />
                            })
                            :
                            <></>
                    }
                </View>
            </ScrollView>
            //    {forUserMessage()}
        )
    }
}

const styles = StyleSheet.create({
    selectedText: {
        color: THEME.BLUE
    },
    selectedTextWrap: {
        paddingLeft: 10
    },
    selected: {
        flexDirection: "row",
        alignItems: "center"
    },
    selectedBlock: {
        flexDirection: "row",
        justifyContent: "space-between"
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

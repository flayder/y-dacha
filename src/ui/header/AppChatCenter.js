import React, {useState, useEffect} from "react"
import {StyleSheet, View, Dimensions, Image} from "react-native"
import {TouchableOpacity} from "react-native-gesture-handler"
import {useDispatch, useSelector} from "react-redux";
import {Svg, Path} from "react-native-svg";
import {THEME} from "../../../theme";
import {SHADOW} from "../../../global";
import {AppText} from "../AppText";
import {AppTextBold} from "../AppTextBold";
import {useRoute} from "@react-navigation/native";
import {DB} from "../../db";
import {AppFetch} from "../../AppFetch";
import {getChat} from "../../store/actions/chat";

export default ({style, onPress, onChange, navigation}) => {
    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
      let width = Dimensions.get('screen').width
      setScreenWidth(width)
    })

    const [showed, setShowed] = useState(false)
    const [pushing, setPushing] = useState(true)
    const dispatch = useDispatch()
    const dataCurrent = useSelector(state => state.chat)
    const user = dataCurrent.user_to
    const blocked = dataCurrent.blocked
    const route = useRoute()

    //console.log('dataCurrent', dataCurrent)

    let id = 0
    let type = ""

    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('sortId'))
            id = route.params.sortId
        else if(route.params.hasOwnProperty('masterId'))
            id = route.params.masterId
        else if(route.params.hasOwnProperty('chemicalId')) {
            id = route.params.chemicalId
        }

        if(route.params.hasOwnProperty("type"))
            type = route.params.type
    }

    useEffect(() => {
        DB.getPushing().then(response => {
            setPushing(response)
        })
    }, [pushing])

    //const screenPosition = isOrientation()
    let minus = 220

    const blockedHandler = async () => {
       //console.log('user', user)
        const response = await AppFetch.getWithToken("setBlockChatUser", {
            user_to: user.info.user_id
        }, {}, navigation)

        if(response.result) {
            await dispatch(getChat({id, type, navigation}))
            setShowed(false)
        } else
            setShowed(false)
    }

    const cleanedHandler = async () => {
        const response = await AppFetch.getWithToken("cleanChatHistory", {
            user_to: id
        }, {}, navigation)
        if(response.result) {
            dispatch(getChat({id, type, navigation})).then(item => {
                setShowed(false)
            })
        } else
            setShowed(false)
    }

    return (
        <View style={{...styles.wrap}}>
            {
                user.hasOwnProperty('info') && user.info.hasOwnProperty('photo')
                    ?
                    <>
                        <Image
                            style={styles.ava}
                            source={{uri: user.info.photo}}
                        />
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{...styles.select, width: screeWidth - minus}}
                            onPress={() => {
                                setShowed(!showed)
                            }}
                        >
                            <AppTextBold style={styles.selectName}>
                                {user.info.first_name} {user.info.last_name}
                            </AppTextBold>
                            {
                                showed
                                    ?
                                    <Svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M9 2.3634e-05L10 1.00002L5.00002 6L2.78182e-07 0.999996L0.999997 2.61094e-07L5.00001 4.00001L9 2.3634e-05Z" fill="#5382D8"/>
                                    </Svg>
                                    :
                                    <Svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M9 5.99998L10 4.99998L5.00002 -2.78182e-07L2.78182e-07 5L0.999997 6L5.00001 1.99999L9 5.99998Z" fill="#6C6C6C"/>
                                    </Svg>
                            }
                        </TouchableOpacity>
                    </>
                :
                <></>
            }
            {
                showed
                    ?
                    <View style={styles.selectOpened}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.line}
                            onPress={async () => {
                                await blockedHandler()
                            }}
                        >
                            <View style={styles.icon}>
                                <Svg width="20" height="21" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M8.01948 0C5.24513 0 2.96484 2.24228 2.96484 5.05463C2.96484 7.82898 6.49929 12.1235 8.01948 12.1235C9.53967 12.1235 13.0741 7.86698 13.0741 5.05463C13.0741 2.28029 10.8318 0 8.01948 0V0ZM7.63943 7.67696C7.63943 7.67696 5.8532 8.019 4.78907 6.95487C3.72494 5.89074 4.06698 4.10451 4.06698 4.10451C4.06698 4.10451 5.8532 3.76247 6.91734 4.8266C7.98147 5.89074 7.63943 7.67696 7.63943 7.67696ZM8.39952 7.67696C8.39952 7.67696 8.05748 5.89074 9.12161 4.8266C10.1857 3.76247 11.972 4.10451 11.972 4.10451C11.972 4.10451 12.314 5.89074 11.2499 6.95487C10.1857 8.019 8.39952 7.67696 8.39952 7.67696Z" fill="#6C6C6C"/>
                                    <Path d="M12.3135 10.3371C11.2114 11.9333 9.69121 13.3394 8.019 13.3394C6.34679 13.3394 4.8266 11.9333 3.72447 10.3371C1.71021 11.5912 0.304038 13.6815 0 16.1518H0.950119H1.02613H14.9739H15.0499H16C15.696 13.6815 14.2898 11.5912 12.2755 10.3371H12.3135Z" fill="#6C6C6C"/>
                                </Svg>
                            </View>
                            <AppText style={styles.text}>
                                {
                                    !blocked
                                        ?
                                        "Заблокировать"
                                        :
                                        "Разблокировать"
                                }
                            </AppText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.line}
                            onPress={async () => {
                                await DB.setPushing(!pushing)
                                setPushing(!pushing)
                                setShowed(false)
                            }}
                        >
                            <View style={styles.icon}>
                                <Svg width="20" height="19" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M15.8586 7.96677L14.4305 6.5387L15.8586 5.11063C16.0465 4.92273 16.0465 4.62208 15.8586 4.3966L15.6707 4.20869C15.4827 4.02079 15.1821 4.02079 14.9566 4.20869L13.5285 5.63676L12.1005 4.20869C11.9126 4.02079 11.6119 4.02079 11.3864 4.20869L11.1985 4.3966C11.0106 4.5845 11.0106 4.88515 11.1985 5.07305L12.6266 6.50112L11.1985 7.92918C11.0106 8.11709 11.0106 8.41773 11.1985 8.64322L11.3864 8.83112C11.5744 9.01903 11.875 9.01903 12.1005 8.83112L13.5285 7.40305L14.9566 8.83112C15.1445 9.01903 15.4452 9.01903 15.6707 8.83112L15.8586 8.64322C16.0465 8.45532 16.0465 8.15467 15.8586 7.96677Z" fill="#6C6C6C"/>
                                    <Path d="M8.30534 0L4.2842 4.02114H0.977099C0.413388 4.02114 0 4.43453 0 4.96066V9.01938C0 9.58309 0.450969 10.0341 1.01468 10.0341H4.2842L8.30534 14.0552H9.01938V0H8.26776H8.30534Z" fill="#6C6C6C"/>
                                </Svg>
                            </View>
                            <AppText style={styles.text}>
                                {
                                    pushing
                                        ?
                                        "Отключить звук"
                                        :
                                        "Включить звук"
                                }
                            </AppText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.line}
                            onPress={async () => {
                                await cleanedHandler()
                            }}
                        >
                            <View style={styles.icon}>
                                <Svg width="20" height="19" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M15 2V3.5V6.5C15 6.79167 14.7917 7 14.5 7H7C6.45833 7 6 7.45833 6 8H7.5H15C15.5417 8 16 7.54167 16 7V3C16 2.45833 15.5417 2 15 2ZM7 9H6C5.45833 9 5 9.45833 5 10V14C5 14.5417 5.45833 15 6 15H7C7.54167 15 8 14.5417 8 14V10C8 9.45833 7.54167 9 7 9ZM14 5V1C14 0.458333 13.5417 0 13 0H1C0.458333 0 0 0.458333 0 1V5C0 5.54167 0.458333 6 1 6H13C13.5417 6 14 5.54167 14 5Z" fill="#6C6C6C"/>
                                </Svg>
                            </View>
                            <AppText style={styles.text}>
                                Очистить историю
                            </AppText>
                        </TouchableOpacity>
                    </View>
                    :
                    <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    line: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 15,
        paddingBottom: 15
    },
    icon: {
        width: 50,
        paddingLeft: 10
    },
    text: {
        marginTop: 0,
        marginBottom: 0
    },
    selectOpened: {
        position: "absolute",
        left: 0,
        width: "100%",
        top: "100%",
        backgroundColor: THEME.SLIDER_BG,
        padding: 20,
        ...SHADOW
    },
    wrap: {
        width: "100%",
        height: 60,
        position: "relative",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: -10,
        zIndex: 999999999,
        paddingRight: 10
    },
    ava: {
        width: 50,
        height: 50,
        borderRadius: 25,
        //backgroundColor: "red"
    },
    select: {
        position: "relative",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    selectName: {
        marginTop: 0,
        marginBottom: 0,
        paddingRight: 20
    }
})
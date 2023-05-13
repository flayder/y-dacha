import React, {useLayoutEffect, useState, useRef, useEffect} from "react"
import {View, StyleSheet, ImageBackground, Dimensions, Alert, ActivityIndicator} from "react-native"
import {AppText} from "../ui/AppText";
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
import AppTextInput from "../ui/AppTextInput";
import AppButton from "../ui/AppButton";
import AppFile from "../ui/pestsAddPhotoPageScreen/AppFile";
import {FileHandler, getRandomKey, globalRouteFun} from "../../global";
import {THEME} from "../../theme";
import {AppBlueButton} from "../ui/AppBlueButton";
import {DB} from "../db";
import {AppTextItalic} from "../ui/AppTextItalic";
import {AppFetch} from "../AppFetch";
import AppHint from "../ui/AppHint";

const pageWrapper = ({navigation, route}) => {
    let params = {}

    if(route.params !== undefined) {
        params = route.params
    }

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    const [data, setData] = useState([{}, {}, {}])
    const [update, setUpdate] = useState(true)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [sending, setSending] = useState(false)
    const culture = useRef("")

    useLayoutEffect(() => {
        navigation.setOptions(
            mainHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "PestsPageScreen"
                }),
            [navigation])
    })

    //console.log('data', data)
    const addPhoto = () => {
        const datas = data
        datas.push({})
        datas.push({})
        datas.push({})
        setData(datas)
        setUpdate(!update)
    }
    // const length = (data.length <= 3) ? data.length : 3
    // const sub = (length === 3) ? 30 : 40
    const widthHeight = screeWidth / 3 - 25

    const sendHandler = async () => {
        setSending(true)
        let error = false
        setLoading(true)
        const user = await DB.getUser()

        if(!culture.current) {
            error = true
            Alert.alert("Не заполнено поле культуры")
        }

        if(!data[0].hasOwnProperty('uri')) {
            error = true
            Alert.alert("Не загружен не один файл")
        }

        if(!error) {
            const datas = new FormData
            datas.append('email', user.login)
            datas.append('culture', culture.current)
            datas.append('countFiles', data.length)

            const arr = []
            data.map((file, index) => {
                const fileIs = FileHandler(file)
                if (fileIs)
                    datas.append('files' + index, fileIs)

                arr.push({})
            })
            //console.log(JSON.stringify(datas))

            const response = await AppFetch.postWithToken('sendPestPhotos', datas, {}, {
                "Accept": "application/json",
                "Content-Type": "multipart/form-data"
            }, navigation)
            setSending(false)
            //console.log('response', response)
            if (response.result) {
                culture.current = ""
                setData(arr)
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 3000)
            }
            else Alert.alert("Произошла неизвестная ошибка")
        }

        setTimeout(() => {
            setLoading(false)
        }, 500)
    }

    return (
        <>
            <AppWrap measure={true}>
                <AppText style={styles.textTop}>
                    Мы поможем вам разобраться с вредителем или заболеванием, но пожалуйста,  пришлите ваше фото болеющего растения и дайте нам время подумать...
                </AppText>
                <AppText style={styles.label}>
                    Культура
                </AppText>
                <AppTextInput
                    placeholder={"Введите культуру"}
                    value={culture.current}
                    onPressText={text => {
                        culture.current = text
                        setUpdate(!update)
                    }}
                />
                <AppButton
                    style={styles.btn}
                    onPress={addPhoto}
                    color={THEME.FOOTER_BG}
                >
                    <AppTextBold style={{fontSize: 26}}>
                        +
                    </AppTextBold>
                </AppButton>
                <View style={styles.fileWrapper}>
                    {
                        data.map((item, index) => {
                            const fileHandler = file => {
                                const datas = data
                                datas[index] = file
                                setData(datas)
                            }
                            return <AppFile
                                initiate={item}
                                onChange={fileHandler}
                                key={getRandomKey()}
                                style={{width: widthHeight, height: widthHeight, marginBottom: 15}}
                            />
                        })
                    }
                </View>
                <AppTextItalic style={{textAlign: "center", color: THEME.BLUE, marginTop: 20, marginBottom: 20}}>
                    Загрузите фотографии весом не более 8 мб
                </AppTextItalic>

                <View style={styles.btnWrapper}>
                    {
                        success
                        ?
                            <AppHint
                                style={styles.hint}
                                text="Ваши фото успешно отправлены"
                            />
                            :
                            <></>
                    }
                    {
                        sending
                            ?
                            <AppBlueButton>
                                <ActivityIndicator size="small" style={{marginRight: 20}} color={"#fff"} />
                                Отправить
                            </AppBlueButton>
                            :
                            <AppBlueButton onPress={sendHandler}>
                                Отправить
                            </AppBlueButton>
                    }
                </View>
            </AppWrap>
            {
                loading
                    ?
                    <AppIndicator justShow={true} />
                    :
                    <></>
            }
        </>
    )
}

const styles = StyleSheet.create({
    hint: {
        position: "absolute",
        top: -40,
        left: 20,
        width: 250
    },
    btnWrapper: {
        position: "relative",
        width: 200,
        marginLeft: "auto",
        marginRight: "auto"
    },
    fileWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 20
    },
    btn: {
        minWidth: 0,
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 20,
        marginBottom: 20,
        fontSize: 28
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

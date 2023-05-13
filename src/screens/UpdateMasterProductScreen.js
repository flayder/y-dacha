import React, {useLayoutEffect, useState, useEffect, useRef} from "react"
import {StyleSheet, View, TouchableOpacity, Dimensions, Platform} from "react-native"
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppWrap} from "../ui/AppWrap";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {globalAlert, mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import {Svg, Path, Mask} from "react-native-svg";
import {AppText} from "../ui/AppText";
import AppCenterLabel from "../ui/formUI/AppCenterLabel";
import {FileHandler, GetFileName, globalRouteFun, LinkTo, makeFileObject} from "../../global";
import {THEME} from "../../theme";
import AppFiles from "../ui/AppFiles";
import {AppFetch} from "../AppFetch";
import AppInputBorderBottom from "../ui/formUI/AppInputBorderBottom";
import AppCounter from "../ui/AppCounter";
import AppOrderSaveButton from "../ui/orderUI/AppOrderSaveButton";

const pageWrapper = ({navigation, route}) => {
    let id = 0
    let type = "update"

    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('id')) {
            id = route.params.id
        }
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
    //console.log('navigation', navigation)

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    const [reload, setReload] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [sending, setSending] = useState(false)

    const formData = useRef({
        photos: [],
        project_title: "",
        description: "",
        additional_text: "",
        price: 0,
        weight: "",
        height: "",
        width: "",
        amount: 1,
        term: 1,
        deletedPhoto: [],
        id: "",
        productId: 0
    })

    const initiate = async () => {
        const response = await AppFetch.getWithToken("getProduct", {
            id
        }, {}, navigation)
        //console.log('response.data', response.data)
        if(response.result) {
            //for(let name in response.data) {
                // if(formData.current.hasOwnProperty(name) && name != 'photo')
                //     formData.current[name] = response.data[name]
                if(response.data.hasOwnProperty('id'))
                    formData.current.productId = response.data.id
                if(response.data.hasOwnProperty('project_id'))
                    formData.current.id = response.data.project_id
                if(response.data.hasOwnProperty('name'))
                    formData.current.project_title = response.data.name
                if(response.data.hasOwnProperty('description'))
                    formData.current.description = response.data.description
                if(response.data.hasOwnProperty('add_information'))
                    formData.current.additional_text = response.data.add_information
                if(response.data.hasOwnProperty('price'))
                    formData.current.price = response.data.price
                if(response.data.hasOwnProperty('quantity'))
                    formData.current.amount = response.data.quantity
                if(response.data.hasOwnProperty('width'))
                    formData.current.width = response.data.width
                if(response.data.hasOwnProperty('height'))
                    formData.current.height = response.data.height
                if(response.data.hasOwnProperty('weight'))
                    formData.current.weight = response.data.weight
                if(response.data.hasOwnProperty('term'))
                    formData.current.term = response.data.term

                if(response.data.hasOwnProperty('main_photo'))
                   formData.current.photos.push(makeFileObject(response.data.main_photo))
                if(response.data.hasOwnProperty('photo') && Array.isArray(response.data.photo)) {
                   response.data.photo.map(item => {
                       formData.current.photos.push(makeFileObject(item))
                   })
                }

                //console.log('response.data', formData.current.photos)
            //}
            //console.log('formData.current', formData.current)
            setLoaded(true)
        }
    }

    //console.log('formData.current', formData.current)

    const addToData = (name, value) => {
        if(formData.current.hasOwnProperty(name)) formData.current[name] = value
    }

    //console.log('formData.current', formData.current)

    const init = true
    //const dispatch = useDispatch()
    useEffect(() => {
        if(type == "update") {
            initiate()
            //console.log('here')
        }
    }, [init])

    //const data = useSelector(state => state.events.currentEvent)

    const calendarWidth = Platform.OS == "android" ? screeWidth - 100 : "100%"

    const sendToModeration = async () => {
        let error = false
        if(formData.current.project_title == "") {
            error = true
            globalAlert({text: "Не введено название товара"})
        } else if (formData.current.amount < 1) {
            error = true
            globalAlert({
                text: "Количество товара не может быть меньше 1"
            })
        } else if (formData.current.price < 1) {
            error = true
            globalAlert({
                text: "Не указана цена за товар"
            })
        } else if (formData.current.term < 1) {
            error = true
            globalAlert({
                text: "Не указан срок выполнения"
            })
        }

        if(!error) {
            setSending(true)
            let countFiles = 0
            const data = new FormData()
            for(let name in formData.current) {
                if(name != "photos" && name != "deletedPhoto") {
                    data.append(name, formData.current[name])
                }
            }
            if(formData.current.photos.length > 0) {
                const photos = []

                //console.log('formData.current.photosformData.current.photos', formData.current.photos)
                formData.current.photos.map(photo => {
                    if(photo.native === undefined) {
                        const fileArr = FileHandler(photo)
                        if(fileArr) {
                            photos.push(fileArr)
                            countFiles++
                        }
                    }
                })
                if(photos.length > 0) {
                    for (let i = 0; i < photos.length; i++) {
                        data.append('files' + i, photos[i])
                    }
                }
                //formData.current.photos = photos
            }

            if(formData.current.deletedPhoto.length > 0) {
                const delPhotos = []
                formData.current.deletedPhoto.map(delPhoto => {
                    if(delPhoto.hasOwnProperty('name') && !delPhoto.name)
                        delPhotos.push(GetFileName(delPhoto.uri, true))
                })

                data.append('deletedPhoto', JSON.stringify(delPhotos))
            } else {
                data.append('deletedPhoto', JSON.stringify([]))
            }

            data.append('countFiles', countFiles)

            //console.log('formData.currentResult', JSON.stringify(data))
            //return
            const response = await AppFetch.postWithToken('updateMasterProduct', data, {}, {
                "Accept": "application/json",
                "Content-Type": "multipart/form-data"
            }, navigation)

            //console.log(JSON.stringify(response))
            setSending(false)
            if(response.result) {
                globalAlert({
                    title: "Товар был успешно обновлен"
                })
                LinkTo('MyMasterAssortmentScreen', {}, navigation)
            }
        }
    }

    if(loaded)
        return (
            <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => {
                            LinkTo("AddMasterProductScreen", {}, navigation)
                        }}
                    >
                        <Svg width="24" height="24" style={styles.addBtnIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Mask id="path-1-inside-1" fill="white">
                                <Path fillRule="evenodd" clipRule="evenodd" d="M12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24ZM10.8736 10.9224C10.9289 10.9224 10.9736 10.8777 10.9736 10.8224V5.74697C10.9736 5.69174 11.0184 5.64697 11.0736 5.64697H12.3285C12.3838 5.64697 12.4285 5.69174 12.4285 5.74697V10.8224C12.4285 10.8777 12.4733 10.9224 12.5285 10.9224H17.547C17.6022 10.9224 17.647 10.9672 17.647 11.0224V12.0904C17.647 12.1456 17.6022 12.1904 17.547 12.1904H12.5285C12.4733 12.1904 12.4285 12.2351 12.4285 12.2904V17.547C12.4285 17.6022 12.3838 17.647 12.3285 17.647H11.0736C11.0184 17.647 10.9736 17.6022 10.9736 17.547V12.2904C10.9736 12.2351 10.9289 12.1904 10.8736 12.1904H5.74697C5.69174 12.1904 5.64697 12.1456 5.64697 12.0904V11.0224C5.64697 10.9672 5.69174 10.9224 5.74697 10.9224H10.8736Z"/>
                            </Mask>
                            <Path d="M0.690001 12C0.690001 18.2463 5.75366 23.31 12 23.31V24.69C4.99151 24.69 -0.690001 19.0085 -0.690001 12H0.690001ZM12 0.69C5.75366 0.69 0.690001 5.75366 0.690001 12H-0.690001C-0.690001 4.99151 4.99151 -0.69 12 -0.69V0.69ZM23.31 12C23.31 5.75366 18.2463 0.69 12 0.69V-0.69C19.0085 -0.69 24.69 4.99151 24.69 12H23.31ZM12 23.31C18.2463 23.31 23.31 18.2463 23.31 12H24.69C24.69 19.0085 19.0085 24.69 12 24.69V23.31ZM11.6636 10.8224C11.6636 11.2587 11.3099 11.6124 10.8736 11.6124V10.2324C10.5478 10.2324 10.2836 10.4966 10.2836 10.8224H11.6636ZM11.6636 5.74697V10.8224H10.2836V5.74697H11.6636ZM11.0736 6.33697C11.3995 6.33697 11.6636 6.07282 11.6636 5.74697H10.2836C10.2836 5.31066 10.6373 4.95697 11.0736 4.95697V6.33697ZM12.3285 6.33697H11.0736V4.95697H12.3285V6.33697ZM11.7385 5.74697C11.7385 6.07282 12.0027 6.33697 12.3285 6.33697V4.95697C12.7648 4.95697 13.1185 5.31067 13.1185 5.74697H11.7385ZM11.7385 10.8224V5.74697H13.1185V10.8224H11.7385ZM12.5285 11.6124C12.0922 11.6124 11.7385 11.2588 11.7385 10.8224H13.1185C13.1185 10.4966 12.8544 10.2324 12.5285 10.2324V11.6124ZM17.547 11.6124H12.5285V10.2324H17.547V11.6124ZM16.957 11.0224C16.957 11.3483 17.2211 11.6124 17.547 11.6124V10.2324C17.9833 10.2324 18.337 10.5861 18.337 11.0224H16.957ZM16.957 12.0904V11.0224H18.337V12.0904H16.957ZM17.547 11.5004C17.2211 11.5004 16.957 11.7645 16.957 12.0904H18.337C18.337 12.5267 17.9833 12.8804 17.547 12.8804V11.5004ZM12.5285 11.5004H17.547V12.8804H12.5285V11.5004ZM11.7385 12.2904C11.7385 11.8541 12.0922 11.5004 12.5285 11.5004V12.8804C12.8544 12.8804 13.1185 12.6162 13.1185 12.2904H11.7385ZM11.7385 17.547V12.2904H13.1185V17.547H11.7385ZM12.3285 16.957C12.0027 16.957 11.7385 17.2211 11.7385 17.547H13.1185C13.1185 17.9833 12.7648 18.337 12.3285 18.337V16.957ZM11.0736 16.957H12.3285V18.337H11.0736V16.957ZM11.6636 17.547C11.6636 17.2211 11.3995 16.957 11.0736 16.957V18.337C10.6373 18.337 10.2836 17.9833 10.2836 17.547H11.6636ZM11.6636 12.2904V17.547H10.2836V12.2904H11.6636ZM10.8736 11.5004C11.3099 11.5004 11.6636 11.8541 11.6636 12.2904H10.2836C10.2836 12.6162 10.5478 12.8804 10.8736 12.8804V11.5004ZM5.74697 11.5004H10.8736V12.8804H5.74697V11.5004ZM6.33697 12.0904C6.33697 11.7645 6.07282 11.5004 5.74697 11.5004V12.8804C5.31067 12.8804 4.95697 12.5267 4.95697 12.0904H6.33697ZM6.33697 11.0224V12.0904H4.95697V11.0224H6.33697ZM5.74697 11.6124C6.07282 11.6124 6.33697 11.3483 6.33697 11.0224H4.95697C4.95697 10.5861 5.31066 10.2324 5.74697 10.2324V11.6124ZM10.8736 11.6124H5.74697V10.2324H10.8736V11.6124Z" fill="white" mask="url(#path-1-inside-1)"/>
                        </Svg>
                        <View style={{width: 10}}></View>
                        <AppTextBold style={styles.addBtnText}>
                            Добавление новый товар
                        </AppTextBold>
                    </TouchableOpacity>
                    <View style={styles.buttonsLine}>
                        <AppFiles
                            outline={true}
                            countFiles={formData.current.photos.length > 3 ? formData.current.photos.length : 3}
                            fileData={formData.current.photos}
                            onDelete={files => {
                                formData.current.deletedPhoto = files
                            }}
                            onResult={files => {
                                //console.log('files.current', files.current)
                                formData.current.photos = files.current
                            }}
                        />
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.delete}
                            onPress={async () => {
                                if(formData.current.productId > 0) {
                                    globalAlert({
                                        title: "Вы точно хотите удалить этот товар?",
                                        okButtonText: "Да",
                                        cancelButtonText: "Нет",
                                        async onOkFun() {
                                            const response = await AppFetch.getWithToken("removeMyMaterAssortment", {
                                                id: formData.current.productId
                                            }, {}, navigation)

                                            //console.log('response', response)
                                            if(response.result) {
                                                LinkTo("MyMasterAssortmentScreen", {}, navigation)
                                            }
                                        }
                                    })
                                }
                            }}
                        >
                            <Svg width="24" height="24" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M2.26514 6.79785V16.9097C2.26514 17.5164 2.75051 18.0423 3.39767 18.0423H14.6421C15.2488 18.0423 15.7746 17.5569 15.7746 16.9097V6.79785H2.26514ZM7.88734 15.2514C7.88734 15.575 7.64466 15.8176 7.32108 15.8176C6.9975 15.8176 6.75481 15.575 6.75481 15.2514V8.49665C6.75481 8.17307 6.9975 7.93038 7.32108 7.93038C7.64466 7.93038 7.88734 8.17307 7.88734 8.49665V15.2514ZM11.2445 15.2514C11.2445 15.575 11.0018 15.8176 10.6782 15.8176C10.3546 15.8176 10.112 15.575 10.112 15.2514V8.49665C10.112 8.17307 10.3546 7.93038 10.6782 7.93038C11.0018 7.93038 11.2445 8.17307 11.2445 8.49665V15.2514Z" fill="#E96C6C"/>
                                <Path d="M1.13253 5.66265H2.26506H15.7745H16.9071C17.5138 5.66265 18.0396 5.17728 18.0396 4.53012V3.39759C18.0396 2.79088 17.5542 2.26506 16.9071 2.26506H11.2849C11.2849 1.01119 10.2737 0 9.0198 0C7.76593 0 6.75474 1.01119 6.75474 2.26506H1.13253C0.525818 2.26506 0 2.75043 0 3.39759V4.53012C0 5.13684 0.48537 5.66265 1.13253 5.66265ZM9.0198 1.17298C9.62651 1.17298 10.1523 1.65835 10.1523 2.30551H7.88727C7.88727 1.6988 8.37264 1.17298 9.0198 1.17298Z" fill="#E96C6C"/>
                            </Svg>

                        </TouchableOpacity>
                    </View>
                    <AppInputBorderBottom
                        outline={true}
                        placeholder={"Название товара"}
                        value={formData.current.project_title}
                        onResult={value => {
                            addToData('project_title', value)
                            setReload(!reload)
                        }}
                    />
                    <AppInputBorderBottom
                        outline={true}
                        checkbox={true}
                        value={formData.current.description}
                        placeholder={"Описание"}
                        onResult={value => {
                            addToData('description', value)
                            setReload(!reload)
                        }}
                    />
                    <View style={{...styles.counterBlock, marginBottom: 0}}>
                        <AppCounter
                            outline={true}
                            style={styles.counter}
                            btnStyle={{borderColor: THEME.GREY}}
                            initColor={THEME.GREY}
                            valueIs={formData.current.price}
                            onResult={value => {
                                addToData('price', value)
                                //setReload(!reload)
                            }}
                        />
                        <AppText style={styles.counterBlockText}>
                            Стоимость за 1 ед.измерения в руб
                        </AppText>
                    </View>
                    <AppInputBorderBottom
                        outline={true}
                        checkbox={true}
                        value={formData.current.additional_text}
                        placeholder={"Дополнение к товару"}
                        onResult={value => {
                            addToData('additional_text', value)
                            setReload(!reload)
                        }}
                    />
                    <AppCenterLabel text={"Параметры товара"} />
                    <AppInputBorderBottom
                        outline={true}
                        value={formData.current.weight}
                        placeholder={"Вес товара"}
                        onResult={value => {
                            addToData('weight', value)
                            setReload(!reload)
                        }}
                    />
                    <AppInputBorderBottom
                        outline={true}
                        value={formData.current.width}
                        placeholder={"Ширина товара"}
                        onResult={value => {
                            addToData('width', value)
                            setReload(!reload)
                        }}
                    />
                    <AppInputBorderBottom
                        outline={true}
                        value={formData.current.height}
                        placeholder={"Высота товара"}
                        onResult={value => {
                            addToData('height', value)
                            setReload(!reload)
                        }}
                    />
                    <View style={styles.counterBlock}>
                        <AppCounter
                            outline={true}
                            style={styles.counter}
                            btnStyle={{borderColor: THEME.GREY}}
                            initColor={THEME.GREY}
                            valueIs={formData.current.amount}
                            onResult={value => {
                                addToData('amount', value)
                                //setReload(!reload)
                            }}
                        />
                        <AppText style={styles.counterBlockText}>
                            Количество штук
                        </AppText>
                    </View>
                    <View style={styles.counterBlock}>
                        <AppCounter
                            outline={true}
                            style={styles.counter}
                            btnStyle={{borderColor: THEME.GREY}}
                            initColor={THEME.GREY}
                            valueIs={formData.current.term}
                            onResult={value => {
                                addToData('term', value)
                                //setReload(!reload)
                            }}
                        />
                        <AppText style={styles.counterBlockText}>
                            Сроки исполнения (дни)
                        </AppText>
                    </View>
                </View>
                {
                    !sending
                        ?
                        <AppOrderSaveButton
                            text={"Обновить товар"}
                            style={styles.moderateBtn}
                            onPress={async () => {
                                await sendToModeration()
                            }}
                        />
                        :
                        <AppOrderSaveButton
                            text={"Обновить товар"}
                            style={styles.moderateBtn}
                            indicator={true}
                        />
                }
            </AppWrap>
        )
    else
        return <></>
}

const styles = StyleSheet.create({
    buttonsLine: {
        position: "relative"
    },
    delete: {
        position: "absolute",
        right: 0,
        top: 7
    },
    counterBlockText: {
        color: THEME.GREY_TEXT,
        paddingLeft: 10,
        fontSize: 14,
    },
    counterBlock: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },
    addBtn: {
        width: 280,
        marginTop: 20,
        marginBottom: 20,
        alignItems: "center",
        backgroundColor: THEME.BLUE,
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 8,
        padding: 8,
        marginLeft: "auto",
        marginRight: "auto"
    },
    addBtnText: {
        marginTop: 0,
        marginBottom: 0,
        color: "#fff"
    },
    addBtnIcon: {
        alignItems: "center"
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20
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
            <AppIndicator timer={.2} />
        </>
    )
}

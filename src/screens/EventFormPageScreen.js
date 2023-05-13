import React, {useLayoutEffect, useState, useEffect, useRef} from "react"
import {StyleSheet, View, ScrollView, Dimensions, Image, Platform, ActivityIndicator} from "react-native"
import {TouchableOpacity} from "react-native-gesture-handler";
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
import {Svg, Path, Rect, Circle, Mask} from "react-native-svg";
import {AppText} from "../ui/AppText";
import AppInput from "../ui/formUI/AppInput";
import AppCenterLabel from "../ui/formUI/AppCenterLabel";
import AppRadio from "../ui/formUI/AppRadio";
import {
    EXHIB,
    FAIRS,
    FEST, FileHandler,
    GetFileName,
    getRandomKey,
    globalRouteFun,
    LinkTo,
    NEWS,
    OTHERS,
    SHADOW
} from "../../global";
import {THEME} from "../../theme";
import AppDayList from "../ui/eventFromPageScreen/AppDayList";
import {AppBlueButton} from "../ui/AppBlueButton";
import AppFiles from "../ui/AppFiles";
import AppPriceBlock from "../ui/eventFormPageScreen/AppPriceBlock";
import AppDateBlock from "../ui/eventFormPageScreen/AppDateBlock";
import {AppFetch} from "../AppFetch";
import AppSelectRegions from "../ui/AppSelectRegions";

const pageWrapper = ({navigation, route}) => {
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
    const countOfList = useRef([3])
    const [currentDay, setCurrentDay] = useState(1)
    const [defaultList, setDefaultList] = useState(countOfList.current[currentDay - 1])
    const [sending, setSending] = useState(false)

    const formData = useRef({
        photos: [],
        title: "",
        type: EXHIB,
        place: "",
        date: "",
        price: 0,
        days: [],
        dates: [],
        email: "",
        phone: "",
        region: 0
    })

    const setDates = ($date) => {
        if(formData.current.dates[currentDay - 1] != undefined) formData.current.dates[currentDay - 1] = $date
        else {
            formData.current.dates.push($date)
        }
    }

    const addToData = (name, value) => {
        if(formData.current.hasOwnProperty(name)) formData.current[name] = value
    }

    const typingDay = (day, num) => {
        //console.log('formData.current.days.length < currentDay', formData.current.days.length < currentDay, formData.current.days.length, currentDay)
        if(formData.current.days.length < currentDay) formData.current.days.push([])
        //if(formData.current.days[currentDay - 1].length < num) formData.current.days[currentDay - 1].push({})

        formData.current.days[currentDay - 1][num] = day
        //console.log('formData.current.days', formData.current.days)
    }

    const getDayAttribute = (num, attr) => {
        //console.log('formData.current.days[currentDay - 1][num]', num, attr, formData.current.days)
        if(formData.current.days.length > 0 &&
            formData.current.days[currentDay - 1] != undefined &&
            formData.current.days[currentDay - 1].length >= num &&
            typeof formData.current.days[currentDay - 1][num] == "object" &&
            formData.current.days[currentDay - 1][num].hasOwnProperty(attr)
        ) {
            return formData.current.days[currentDay - 1][num][attr]
        }

        return ""
    }

    //console.log('formData.current', formData.current)

    const init = true
    const dispatch = useDispatch()
    // useEffect(() => {
    //     // dispatch(loadEvent(id))
    // }, [init])

    //const data = useSelector(state => state.events.currentEvent)

    //console.log('formData.current', formData.current, currentDay)

    const generateDays = () => {
        const days = formData.current.days.length > 0 ? formData.current.days.length : 1
        const elements = []

        //console.log('formData.current.days.length', formData.current.days.length)

        for(let i = 1; i <= days; i++) {
            elements.push(
                <View
                    style={{zIndex: 999 - i, elevation: 999 - i}}
                    key={getRandomKey()}
                >
                    <View
                        style={{...styles.dayBlock, position: "relative"}}
                    >
                        {
                            days > 1 && days != i
                                ?
                                <View style={{position: "absolute", top: 10, right: -70}}>
                                    <TouchableOpacity
                                        activeOpacity={1}

                                        onPress={() => {
                                            formData.current.days.splice(i, 1)
                                            setReload(!reload)
                                            setCurrentDay(i > 1 ? i - 1 : 1)
                                            //console.log('okokok')
                                        }}
                                    >
                                        <Svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <Path d="M2.26514 6.79785V16.9097C2.26514 17.5164 2.75051 18.0423 3.39767 18.0423H14.6421C15.2488 18.0423 15.7746 17.5569 15.7746 16.9097V6.79785H2.26514ZM7.88734 15.2514C7.88734 15.575 7.64466 15.8176 7.32108 15.8176C6.9975 15.8176 6.75481 15.575 6.75481 15.2514V8.49665C6.75481 8.17307 6.9975 7.93038 7.32108 7.93038C7.64466 7.93038 7.88734 8.17307 7.88734 8.49665V15.2514ZM11.2445 15.2514C11.2445 15.575 11.0018 15.8176 10.6782 15.8176C10.3546 15.8176 10.112 15.575 10.112 15.2514V8.49665C10.112 8.17307 10.3546 7.93038 10.6782 7.93038C11.0018 7.93038 11.2445 8.17307 11.2445 8.49665V15.2514Z" fill="#E96C6C"/>
                                            <Path d="M1.13253 5.66265H2.26506H15.7745H16.9071C17.5138 5.66265 18.0396 5.17728 18.0396 4.53012V3.39759C18.0396 2.79088 17.5542 2.26506 16.9071 2.26506H11.2849C11.2849 1.01119 10.2737 0 9.0198 0C7.76593 0 6.75474 1.01119 6.75474 2.26506H1.13253C0.525818 2.26506 0 2.75043 0 3.39759V4.53012C0 5.13684 0.48537 5.66265 1.13253 5.66265ZM9.0198 1.17298C9.62651 1.17298 10.1523 1.65835 10.1523 2.30551H7.88727C7.88727 1.6988 8.37264 1.17298 9.0198 1.17298Z" fill="#E96C6C"/>
                                        </Svg>
                                    </TouchableOpacity>
                                </View>
                                :
                                <></>
                        }
                        <TouchableOpacity
                            onPress={() => {
                                setDefaultList(countOfList.current[i])
                                setCurrentDay(i)
                            }}
                        >
                            <AppTextBold style={styles.dayBlockText}>
                                День {i}
                            </AppTextBold>
                        </TouchableOpacity>

                    </View>
                    <AppDateBlock
                        screenWidth={screeWidth}
                        calendarWidth={calendarWidth}
                        style={styles.dayDateBlock}
                        onResult={date => {
                            setDates(date)
                        }}
                    />
                </View>
            )
        }

        return elements
    }

    const generateList = () => {
        const elements = []
        for(let i = 1; i <= defaultList; i++) {
            const iterate = i
            const time = getDayAttribute(iterate - 1, 'time')
            //const date = getDayAttribute(iterate  - 1, 'date')
            const description = getDayAttribute(iterate  - 1, 'description')

            elements.push(
                <AppDayList
                    number={iterate}
                    key={getRandomKey()}
                    time={time}
                    //date={date}
                    description={description}
                    onResult={day => {
                        typingDay(day, iterate - 1)
                        //console.log('day', day, iterate)
                    }}
                    onDelete={() => {
                        formData.current.days[currentDay - 1].splice(iterate - 1, 1)
                        if(defaultList > 1) setDefaultList(countOfList.current[currentDay - 1] - 1)
                        else
                            setReload(!reload)
                    }}
                    calendarWidth={calendarWidth}
                />
            )
        }

        return elements
    }

    const saveDay = () => {
        if(formData.current.days.length > 0) {
            formData.current.days.push([])
            countOfList.current.push(3)
            setDefaultList(3)
            setCurrentDay(formData.current.days.length)
        }

        //console.log('formData.current.days', formData.current.days)
    }

    const calendarWidth = Platform.OS == "android" ? screeWidth - 100 : "100%"

    const sendToModeration = async () => {
        let error = false
        let count = 0

        if(formData.current.title == "") {
            error = true
            globalAlert({text: "Не введено название события"})
        } else if (formData.current.region <= 0) {
            error = true
            globalAlert({text: "Не указан регион проведения"})
        } else if (formData.current.place == "") {
            error = true
            globalAlert({text: "Не указано место проведения события"})
        } else if (formData.current.date == "") {
            error = true
            globalAlert({text: "Не указана дата проведения мероприятия"})
        } else if (formData.current.email == "") {
            error = true
            globalAlert({text: "Не указан email"})
        } else if (formData.current.phone == "") {
            error = true
            globalAlert({text: "Не указан телефон"})
        }
        // else if (formData.current.days.length > 0) {
        //     formData.current.days.map((item, key) => {
        //         item.map(day => {
        //             if(
        //                 day.hasOwnProperty('time') && day.time != "" ||
        //                 //day.hasOwnProperty('date') && day.date != "" ||
        //                 day.hasOwnProperty('description') && day.description != ""
        //             ) {
        //                 if(day.time != "") {
        //                     if(day.description == "") error = true
        //                 }
        //
        //                 if(day.description != "") {
        //                     if(day.time == "") error = true
        //                 }
        //             }
        //         })
        //     })
        //     if(error) globalAlert({text: "Нужно заполнить все данные события дня! Если события дня не нужно, то его лучше удалить из списка, или оставить все поля события не заполненными!"})
        // }

        if(!error) {
            setSending(true)
            const data = new FormData
            if(formData.current.photos.length > 0) {
                for(let i = 0; i < formData.current.photos.length; i++) {
                    if(typeof formData.current.photos[i] == "object" && formData.current.photos[i].hasOwnProperty('uri') && formData.current.photos[i].uri) {
                        const fileArr = FileHandler(formData.current.photos[i])
                        if(fileArr) {
                            data.append('file' + i, fileArr)
                            count += 1
                        }
                    }
                }
            }

            //console.log('formData', formData.current)

            data.append('title', formData.current.title)
            data.append('date', formData.current.date)
            data.append('place', formData.current.place)
            data.append('days', JSON.stringify(formData.current.days))
            data.append('type', formData.current.type)
            data.append('price', formData.current.price)
            data.append('email', formData.current.email)
            data.append('phone', formData.current.phone)
            data.append('region', formData.current.region)
            data.append('dates', JSON.stringify(formData.current.dates))
            data.append('countFiles', count)
            //console.log('formData.currentResult', formData.current)

            //console.log('data', )

            const response = await AppFetch.postWithToken('addEvent', data, {}, {
                "Accept": "application/json",
                "Content-Type": "multipart/form-data"
            }, navigation)
            setSending(false)
            if(response.result) {
                globalAlert({title: "Событие было успешно отправлено на модерацию!"})
                LinkTo('EventsPersonalPageScreen', {}, navigation)
            }
        }
    }

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            <View style={styles.container}>
                {/*<TouchableOpacity*/}
                {/*    style={styles.addBtn}*/}
                {/*    onPress={() => {*/}
                {/*        LinkTo("EventFormPageScreen", {}, navigation)*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Svg width="24" height="24" style={styles.addBtnIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                {/*        <Mask id="path-1-inside-1" fill="white">*/}
                {/*            <Path fillRule="evenodd" clipRule="evenodd" d="M12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24ZM10.8736 10.9224C10.9289 10.9224 10.9736 10.8777 10.9736 10.8224V5.74697C10.9736 5.69174 11.0184 5.64697 11.0736 5.64697H12.3285C12.3838 5.64697 12.4285 5.69174 12.4285 5.74697V10.8224C12.4285 10.8777 12.4733 10.9224 12.5285 10.9224H17.547C17.6022 10.9224 17.647 10.9672 17.647 11.0224V12.0904C17.647 12.1456 17.6022 12.1904 17.547 12.1904H12.5285C12.4733 12.1904 12.4285 12.2351 12.4285 12.2904V17.547C12.4285 17.6022 12.3838 17.647 12.3285 17.647H11.0736C11.0184 17.647 10.9736 17.6022 10.9736 17.547V12.2904C10.9736 12.2351 10.9289 12.1904 10.8736 12.1904H5.74697C5.69174 12.1904 5.64697 12.1456 5.64697 12.0904V11.0224C5.64697 10.9672 5.69174 10.9224 5.74697 10.9224H10.8736Z"/>*/}
                {/*        </Mask>*/}
                {/*        <Path d="M0.690001 12C0.690001 18.2463 5.75366 23.31 12 23.31V24.69C4.99151 24.69 -0.690001 19.0085 -0.690001 12H0.690001ZM12 0.69C5.75366 0.69 0.690001 5.75366 0.690001 12H-0.690001C-0.690001 4.99151 4.99151 -0.69 12 -0.69V0.69ZM23.31 12C23.31 5.75366 18.2463 0.69 12 0.69V-0.69C19.0085 -0.69 24.69 4.99151 24.69 12H23.31ZM12 23.31C18.2463 23.31 23.31 18.2463 23.31 12H24.69C24.69 19.0085 19.0085 24.69 12 24.69V23.31ZM11.6636 10.8224C11.6636 11.2587 11.3099 11.6124 10.8736 11.6124V10.2324C10.5478 10.2324 10.2836 10.4966 10.2836 10.8224H11.6636ZM11.6636 5.74697V10.8224H10.2836V5.74697H11.6636ZM11.0736 6.33697C11.3995 6.33697 11.6636 6.07282 11.6636 5.74697H10.2836C10.2836 5.31066 10.6373 4.95697 11.0736 4.95697V6.33697ZM12.3285 6.33697H11.0736V4.95697H12.3285V6.33697ZM11.7385 5.74697C11.7385 6.07282 12.0027 6.33697 12.3285 6.33697V4.95697C12.7648 4.95697 13.1185 5.31067 13.1185 5.74697H11.7385ZM11.7385 10.8224V5.74697H13.1185V10.8224H11.7385ZM12.5285 11.6124C12.0922 11.6124 11.7385 11.2588 11.7385 10.8224H13.1185C13.1185 10.4966 12.8544 10.2324 12.5285 10.2324V11.6124ZM17.547 11.6124H12.5285V10.2324H17.547V11.6124ZM16.957 11.0224C16.957 11.3483 17.2211 11.6124 17.547 11.6124V10.2324C17.9833 10.2324 18.337 10.5861 18.337 11.0224H16.957ZM16.957 12.0904V11.0224H18.337V12.0904H16.957ZM17.547 11.5004C17.2211 11.5004 16.957 11.7645 16.957 12.0904H18.337C18.337 12.5267 17.9833 12.8804 17.547 12.8804V11.5004ZM12.5285 11.5004H17.547V12.8804H12.5285V11.5004ZM11.7385 12.2904C11.7385 11.8541 12.0922 11.5004 12.5285 11.5004V12.8804C12.8544 12.8804 13.1185 12.6162 13.1185 12.2904H11.7385ZM11.7385 17.547V12.2904H13.1185V17.547H11.7385ZM12.3285 16.957C12.0027 16.957 11.7385 17.2211 11.7385 17.547H13.1185C13.1185 17.9833 12.7648 18.337 12.3285 18.337V16.957ZM11.0736 16.957H12.3285V18.337H11.0736V16.957ZM11.6636 17.547C11.6636 17.2211 11.3995 16.957 11.0736 16.957V18.337C10.6373 18.337 10.2836 17.9833 10.2836 17.547H11.6636ZM11.6636 12.2904V17.547H10.2836V12.2904H11.6636ZM10.8736 11.5004C11.3099 11.5004 11.6636 11.8541 11.6636 12.2904H10.2836C10.2836 12.6162 10.5478 12.8804 10.8736 12.8804V11.5004ZM5.74697 11.5004H10.8736V12.8804H5.74697V11.5004ZM6.33697 12.0904C6.33697 11.7645 6.07282 11.5004 5.74697 11.5004V12.8804C5.31067 12.8804 4.95697 12.5267 4.95697 12.0904H6.33697ZM6.33697 11.0224V12.0904H4.95697V11.0224H6.33697ZM5.74697 11.6124C6.07282 11.6124 6.33697 11.3483 6.33697 11.0224H4.95697C4.95697 10.5861 5.31066 10.2324 5.74697 10.2324V11.6124ZM10.8736 11.6124H5.74697V10.2324H10.8736V11.6124Z" fill="white" mask="url(#path-1-inside-1)"/>*/}
                {/*    </Svg>*/}
                {/*    <View style={{width: 10}}></View>*/}
                {/*    <AppTextBold style={styles.addBtnText}>*/}
                {/*        Добавление нового события*/}
                {/*    </AppTextBold>*/}
                {/*</TouchableOpacity>*/}
                <AppFiles
                    countFiles={formData.current.photos.length > 3 ? formData.current.photos.length : 3}
                    fileData={formData.current.photos}
                    onResult={files => {
                        formData.current.photos = files.current
                    }}
                />
                <AppInput
                    placeholder={"Введите название мероприятия"}
                    onResult={value => {
                        addToData('title', value)
                    }}
                />
                <AppCenterLabel text={"Определите тип мероприятия"} />
                <View style={styles.selectBlock}>
                    <AppRadio
                        label={"Выставка"}
                        style={styles.radio}
                        activeIs={formData.current.type == EXHIB}
                        outside={true}
                        onResult={res => {
                            if(res)
                                addToData('type', EXHIB)
                            else
                                addToData('type', '')

                            setReload(!reload)
                        }}
                    />
                    <AppRadio
                        label={"Фестиваль"}
                        style={{...styles.radio, justifyContent: "center"}}
                        activeIs={formData.current.type == FEST}
                        outside={true}
                        onResult={res => {
                            if(res)
                                addToData('type', FEST)
                            else
                                addToData('type', '')

                            setReload(!reload)
                        }}
                    />
                    <AppRadio
                        label={"Ярмарка"}
                        style={{...styles.radio, justifyContent: "flex-end"}}
                        activeIs={formData.current.type == FAIRS}
                        outside={true}
                        onResult={res => {
                            if(res)
                                addToData('type', FAIRS)
                            else
                                addToData('type', '')

                            setReload(!reload)
                        }}
                    />
                    <AppRadio
                        label={"Туры"}
                        style={styles.radio}
                        activeIs={formData.current.type == NEWS}
                        outside={true}
                        onResult={res => {
                            if(res)
                                addToData('type', NEWS)
                            else
                                addToData('type', '')

                            setReload(!reload)
                        }}
                    />
                    <AppRadio
                        label={"Другое"}
                        style={{...styles.radio, justifyContent: "center", width: 105}}
                        activeIs={formData.current.type == OTHERS}
                        outside={true}
                        onResult={res => {
                            if(res)
                                addToData('type', OTHERS)
                            else
                                addToData('type', '')

                            setReload(!reload)
                        }}
                    />
                </View>
                <AppCenterLabel text={"Укажите регион проведения"} />
                <AppSelectRegions
                    onResult={region => {
                        formData.current.region = region
                    }}
                />
                <AppCenterLabel text={"Укажите место проведения"} />
                <AppInput
                    placeholder={"с.Малобыково"}
                    //value={formData.current.place}
                    onResult={value => {
                        addToData('place', value)
                    }}
                />
                <AppCenterLabel text={"Стоимость участия (₽)"} />
                <AppPriceBlock
                    priceIs={formData.current.price}
                    onResult={price => {
                        addToData('price', price)
                    }}
                />
                <AppCenterLabel text={"Укажите дату, месяц и год проведения"} />
                <AppDateBlock
                    screenWidth={screeWidth}
                    calendarWidth={calendarWidth}
                    onResult={date => {
                        addToData('date', date)
                    }}
                />
            </View>
            <AppCenterLabel
                text={"Составьте афишу мероприятия"}
                style={{marginTop: 20, paddingTop: 10, paddingBottom: 10, backgroundColor: THEME.SLIDER_BG}}
            />
            <ScrollView
                style={styles.days}
                horizontal={true}
            >
                {
                    generateDays()
                }
            </ScrollView>
            <View style={styles.container}>
                {
                    generateList()
                }
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.addDayBtn}
                    onPress={() => {
                        let count = countOfList.current[currentDay - 1]
                        count > 0 ? countOfList.current[currentDay - 1] = count + 1 : countOfList.current[currentDay - 1] = 1
                        setDefaultList(countOfList.current[currentDay - 1])
                    }}
                >
                    <Svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Circle cx="17" cy="17" r="17" fill="#5382D8"/>
                        <Path d="M18.4539 15.3736C18.4539 15.4288 18.4987 15.4736 18.5539 15.4736H25.9C25.9552 15.4736 26 15.5184 26 15.5736V17.1698C26 17.225 25.9552 17.2698 25.9 17.2698H18.5539C18.4987 17.2698 18.4539 17.3146 18.4539 17.3698V24.9C18.4539 24.9552 18.4091 25 18.3539 25H16.4928C16.4376 25 16.3928 24.9552 16.3928 24.9V17.3698C16.3928 17.3146 16.348 17.2698 16.2928 17.2698H9.1C9.04477 17.2698 9 17.225 9 17.1698V15.5736C9 15.5184 9.04477 15.4736 9.1 15.4736H16.2928C16.348 15.4736 16.3928 15.4288 16.3928 15.3736V8.1C16.3928 8.04477 16.4376 8 16.4928 8H18.3539C18.4091 8 18.4539 8.04477 18.4539 8.1V15.3736Z" fill="white"/>
                    </Svg>
                    <AppText style={styles.addDayBtnText}>
                        Добавить пункт {"\n"}мероприятия
                    </AppText>
                </TouchableOpacity>
            </View>
            <AppBlueButton
                onPress={() => {
                    saveDay()
                }}
                style={styles.saveBtn}
            >
                Сохранить день
            </AppBlueButton>
            <AppCenterLabel text={"Укажите свои контакты для связи"} />
            <AppInput
                style={styles.phone}
                //value={formData.current.phone}
                PlaceholderWithIcon={() => {
                    return <Svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M12.8218 0H1.17822C0.554455 0 0 0.533333 0 1.13333V16.8667C0 17.4667 0.554455 18 1.17822 18H12.8218C13.4455 18 14 17.4667 14 16.8667V1.13333C14 0.533333 13.4455 0 12.8218 0V0ZM6.93069 17.3333C6.58416 17.3333 6.30693 17.0667 6.30693 16.7333C6.30693 16.4 6.58416 16.1333 6.93069 16.1333C7.27723 16.1333 7.55446 16.4 7.55446 16.7333C7.55446 17.0667 7.27723 17.3333 6.93069 17.3333ZM12.8218 15.6667H1.17822V1.06667H12.8218V15.6667Z" fill="#6C6C6C"/>
                        <Path d="M11.7129 2.26709H2.35645V14.6004H11.7129V2.26709Z" fill="#6C6C6C"/>
                    </Svg>
                }}
                placeholderWithIconText={"+7-000-000-00-00"}
                onResult={value => {
                    addToData('phone', value)
                }}
            />
            <AppInput
                style={styles.email}
                //value={formData.current.email}
                PlaceholderWithIcon={() => {
                    return <Svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M19.9853 1.50924C19.9853 1.48518 20.001 1.46177 20 1.43799L13.8966 7.62816L19.9927 13.6206C19.9963 13.5778 19.9853 13.5346 19.9853 13.4909V1.50924Z" fill="#6C6C6C"/>
                        <Path d="M12.965 8.58105L10.4734 11.1043C10.3473 11.232 10.1845 11.296 10.0215 11.296C9.86199 11.296 9.70246 11.2347 9.57724 11.1119L7.09244 8.67471L0.956543 14.9C1.10574 14.9564 1.26588 15.0003 1.43359 15.0003H18.6096C18.8586 15.0003 19.0922 14.9204 19.2952 14.8013L12.965 8.58105Z" fill="#6C6C6C"/>
                        <Path d="M10.0146 9.66501L19.3293 0.220516C19.1184 0.0885355 18.8729 0 18.6098 0H1.4338C1.09118 0 0.777233 0.140029 0.532715 0.353593L10.0146 9.66501Z" fill="#6C6C6C"/>
                        <Path d="M0 1.73926V13.4907C0 13.6256 0.0294569 13.7557 0.0614337 13.88L6.12121 7.73773L0 1.73926Z" fill="#6C6C6C"/>
                    </Svg>
                }}
                placeholderWithIconText={"festival_visit@mail.ru"}
                onResult={value => {
                    addToData('email', value)
                }}
            />
            {
                !sending
                    ?
                    <AppBlueButton
                        style={styles.moderateBtn}
                        onPress={async () => {
                            try {
                                await sendToModeration()
                            } catch (e) {console.log(e)}
                        }}
                    >
                        Отправить на модерацию
                    </AppBlueButton>
                    :
                    <AppBlueButton
                        style={styles.moderateBtn}
                    >
                        <ActivityIndicator size="small" style={{marginRight: 20}} color={"#fff"} />
                        Отправить на модерацию
                    </AppBlueButton>
            }
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    dayBlockText: {
        color: THEME.BLUE
    },
    dayDateBlock: {
        width: 200,
        marginLeft: 20
    },
    dayBlock: {
        width: 200,
        height: 100,
        padding: 20,
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: THEME.SLIDER_BG,
        ...SHADOW
    },
    days: {

    },
    moderateBtn: {
        width: 240,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
        marginBottom: 40
    },
    phone: {
        width: 200,
        marginLeft: "auto",
        marginRight: "auto"
    },
    email: {
        width: 230,
        marginLeft: "auto",
        marginRight: "auto"
    },
    saveBtn: {
        width: 160,
        marginLeft: "auto",
        marginRight: "auto"
    },
    addDayBtnText: {
        color: THEME.BLUE,
        paddingLeft: 10
    },
    addDayBtn: {
        width: 150,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    radio: {
        width: "33.333%"
    },
    selectBlock: {
        flexDirection: "row",
        flexWrap: "wrap"
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
    calendar: {
        width: 230,
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: 20,
        marginBottom: -20,
        backgroundColor: "transparent"
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

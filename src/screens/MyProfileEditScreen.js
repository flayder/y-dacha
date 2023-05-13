import React, {useLayoutEffect, useEffect, useState, useRef} from "react"
import {View, StyleSheet, Dimensions, ImageBackground, Image} from "react-native"
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from "@react-navigation/stack";
import {globalAlert, titleHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import 'moment/locale/ru'
import {AppWrap} from "../ui/AppWrap";
import {AppFetch} from "../AppFetch";
import {Svg, Path, G, Defs, ClipPath, Rect} from "react-native-svg";
import AppAddProfilePhotoBlock from "../ui/myProfileEditScreen/AppAddProfilePhotoBlock";
import AppInputWIthIcon from "../ui/myProfileScreen/AppInputWIthIcon";
import {AppBlueButton} from "../ui/AppBlueButton";
import {THEME} from "../../theme";
import AppSocActive from "../ui/myProfileScreen/AppSocActive";
import CheckboxWithLabel from "../ui/CheckboxWithLabel";
import {AppTextBold} from "../ui/AppTextBold";
import {useDispatch, useSelector} from "react-redux";
import {FileHandler, globalRouteFun} from "../../global";
import {getGlobalUserInfo, setCurrentRoute} from "../store/actions/other";

const pageWrapper = ({navigation, route}) => {
    useLayoutEffect(() => {
        navigation.setOptions(
            titleHeader(
                {
                    route,
                    navigation,
                    titleName: "Редактор профиля",
                    headerLeftBack: true,
                    routeName: "MyProfileScreen"
                }),
            [navigation])
    })

    const dispatch = useDispatch()

    const [reload, setReload] = useState(false)
    const data = useSelector(state => state.others.userInfo)
    const init = true

    //console.log('data', data)

    const formData = useRef({
        first_name: "",
        last_name: "",
        photo: {},
        index_delivery: "",
        region_delivery: "",
        city_delivery: "",
        street_delivery: "",
        house_delivery: "",
        appartment_delivery: "",
        birthday: "",
        phone: "",
        email: "",
        gender: "",
        social_vkotakte: "",
        social_facebook: "",
        social_odnoklasniki: "",
        social_twitter: "",
        social_instagram: "",
        social_youtube: "",
        whatsup: "",
        telegram: ""
    })

    useEffect(() => {
        for(let name in data) {
            if(
                formData.current.hasOwnProperty(name) &&
                name != "photo" &&
                data[name] != null
            ) formData.current[name] = data[name]
        }

        if (data.hasOwnProperty('photo') && data.photo)
            formData.current.photo = {uri: data.photo}

        //console.log('form', formData.current)
        setReload(!reload)
    }, [data])

    const initiate = () => {
        dispatch(getGlobalUserInfo({navigation, forced: true}))
    }

    // useEffect(() => {
    //     initiate()
    // }, [init])

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    const saveFun = async () => {
        const form = new FormData

        for(let name in formData.current) {
            if(name != 'photo')
                form.append(name, formData.current[name])
        }

        //console.log('formData.current', formData.current)

        if(formData.current.photo.hasOwnProperty('new') && formData.current.photo.new) {
            const fileArr = FileHandler(formData.current.photo)
            //console.log('fileArr', fileArr)
            if(fileArr)
               form.append('photo', fileArr)
        }

        //console.log('ok', form)

        const response = await AppFetch.postWithToken("updateUserData", form, {}, {
            "Accept": "application/json",
            "Content-Type": "multipart/form-data"
        }, navigation)

        //console.log(response)

        if(response.result) {
            globalAlert({
                title: "Данные успешно обновлены"
            })
            initiate()
        }
    }

    //console.log('loadMore', loadMore)
    const defaultIconColor = THEME.GREY
    const activeIconColor = THEME.BLUE
    return (
        <AppWrap
            scroll={{paddingLeft: 0, paddingRight: 0, marginBottom: 0}}
        >
            <AppAddProfilePhotoBlock
                initiate={formData.current.photo}
                onChange={file => {
                    formData.current.photo = file
                    setReload(!reload)
                }}
            />
            <View style={styles.container}>
                <AppInputWIthIcon
                    screenWidth={screeWidth}
                    Icon={() => {
                        let color = defaultIconColor
                        if(formData.current.first_name != "") color = activeIconColor
                        return <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M11.6901 10.5373C13.4366 9.58696 14.6479 7.74224 14.6479 5.61801C14.6479 2.51553 12.1127 0 8.98592 0C5.85916 0 3.32394 2.51553 3.32394 5.61801C3.32394 7.74224 4.53521 9.58696 6.28169 10.5373C2.92958 11.5714 0.422535 14.4783 0 18H1.04225H1.12676H16.8451H16.9296H18C17.5493 14.4503 15.0423 11.5714 11.7183 10.5373H11.6901Z" fill={color}/>
                        </Svg>
                    }}
                    placeholder={"Введите имя"}
                    value={formData.current.first_name}
                    onResult={text => {
                        formData.current.first_name = text
                        setReload(!reload)
                    }}
                />
                <AppInputWIthIcon
                    screenWidth={screeWidth}
                    Icon={() => {
                        let color = defaultIconColor
                        if(formData.current.last_name != "") color = activeIconColor
                        return <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M11.7508 10.5344C13.5149 9.59016 14.7409 7.76066 14.7409 5.63607C14.7409 2.5377 12.1993 0 9.0299 0C5.89037 0 3.31894 2.5082 3.31894 5.63607C3.31894 7.76066 4.54485 9.59016 6.30897 10.5344C2.96013 11.5672 0.448505 14.459 0 18H1.04651H1.13621H6.72757L7.86379 12.3639H10.1362L11.2724 18H16.8638H16.9535H18C17.5515 14.459 15.0399 11.5672 11.691 10.5344H11.7508Z" fill={color}/>
                        </Svg>
                    }}
                    placeholder={"Введите фамилию"}
                    value={formData.current.last_name}
                    onResult={text => {
                        formData.current.last_name = text
                        setReload(!reload)
                    }}
                />
                <AppInputWIthIcon
                    screenWidth={screeWidth}
                    Icon={() => {
                        let color = defaultIconColor
                        if(formData.current.birthday != "") color = activeIconColor
                        return <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M3.7231 2.28282C4.07489 2.28282 4.39736 1.99015 4.39736 1.60968V0.673139C4.39736 0.321936 4.1042 0 3.7231 0C3.3713 0 3.04883 0.292669 3.04883 0.673139V1.60968C3.04883 1.96088 3.34199 2.28282 3.7231 2.28282Z" fill={color} />
                            <Path d="M13.8667 2.28282C14.2184 2.28282 14.5409 1.99015 14.5409 1.60968V0.673139C14.5409 0.321936 14.2478 0 13.8667 0C13.5149 0 13.1924 0.292669 13.1924 0.673139V1.60968C13.1924 1.96088 13.4855 2.28282 13.8667 2.28282Z" fill={color}/>
                            <Path d="M16.798 1.1416H15.684V2.25374C15.684 2.86835 15.1857 3.36589 14.57 3.36589H13.456C12.8404 3.36589 12.342 2.86835 12.342 2.25374V1.1416H5.57003V2.25374C5.57003 2.86835 5.07166 3.36589 4.45603 3.36589H3.34202C2.72638 3.36589 2.22801 2.86835 2.22801 2.25374V1.1416H1.11401C0.498371 1.1416 0 1.63914 0 2.25374V16.8872C0 17.5018 0.498371 17.9993 1.11401 17.9993H16.886C17.5016 17.9993 18 17.5018 18 16.8872V2.25374C18 1.63914 17.5016 1.1416 16.886 1.1416H16.798ZM6.65472 15.7751H4.39739V13.5215H6.65472V15.7751ZM6.65472 12.4094H4.39739V10.1558H6.65472V12.4094ZM6.65472 9.04367H4.39739V6.79012H6.65472V9.04367ZM10.0261 15.8043H7.76873V13.5508H10.0261V15.8043ZM10.0261 12.4386H7.76873V10.1851H10.0261V12.4386ZM10.0261 9.07293H7.76873V6.81938H10.0261V9.07293ZM13.3974 15.8336H11.1401V13.58H13.3974V15.8336ZM13.3974 12.4679H11.1401V10.2143H13.3974V12.4679ZM13.3974 9.1022H11.1401V6.84865H13.3974V9.1022Z" fill={color} />
                        </Svg>
                    }}
                    placeholder={"Введите дату рождения"}
                    value={formData.current.birthday}
                    onResult={text => {
                        formData.current.birthday = text
                        setReload(!reload)
                    }}
                />
                <AppInputWIthIcon
                    screenWidth={screeWidth}
                    Icon={() => {
                        let color = defaultIconColor
                        if(formData.current.phone != "") color = activeIconColor
                        return <Svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M12.8218 0H1.17822C0.554455 0 0 0.533333 0 1.13333V16.8667C0 17.4667 0.554455 18 1.17822 18H12.8218C13.4455 18 14 17.4667 14 16.8667V1.13333C14 0.533333 13.4455 0 12.8218 0V0ZM6.93069 17.3333C6.58416 17.3333 6.30693 17.0667 6.30693 16.7333C6.30693 16.4 6.58416 16.1333 6.93069 16.1333C7.27723 16.1333 7.55446 16.4 7.55446 16.7333C7.55446 17.0667 7.27723 17.3333 6.93069 17.3333ZM12.8218 15.6667H1.17822V1.06667H12.8218V15.6667Z" fill={color} />
                            <Path d="M11.7129 2.26709H2.35645V14.6004H11.7129V2.26709Z" fill={color}/>
                        </Svg>
                    }}
                    placeholder={"Введите телефон"}
                    value={formData.current.phone}
                    onResult={text => {
                        formData.current.phone = text
                        setReload(!reload)
                    }}
                />
                <AppInputWIthIcon
                    screenWidth={screeWidth}
                    Icon={() => {
                        let color = defaultIconColor
                        if(formData.current.email != "") color = activeIconColor
                        return <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M13.1107 13.1122C13.3742 11.7951 13.5205 10.4195 13.5205 9.01464C13.5205 7.60976 13.3742 6.23415 13.1107 4.91708C11.7937 4.65367 10.4181 4.50732 9.01318 4.50732C7.6083 4.50732 6.23269 4.65367 4.91562 4.91708C4.6522 6.23415 4.50586 7.60976 4.50586 9.01464C4.50586 10.4195 4.6522 11.7951 4.91562 13.1122C6.23269 13.3756 7.6083 13.522 9.01318 13.522C10.4181 13.522 11.7937 13.3756 13.1107 13.1122Z" fill={color} />
                            <Path d="M3.36585 9.01484C3.36585 7.69777 3.51219 6.43923 3.71707 5.20996C2.57561 5.50264 1.46341 5.88313 0.409756 6.32216C0.146341 7.17094 0 8.07825 0 9.01484C0 9.95142 0.146341 10.8587 0.409756 11.7075C1.46341 12.1758 2.57561 12.5563 3.71707 12.849C3.51219 11.6197 3.36585 10.3319 3.36585 9.04411V9.01484Z" fill={color} />
                            <Path d="M9.01582 3.36585C10.3329 3.36585 11.5914 3.51219 12.8207 3.71707C12.528 2.57561 12.1475 1.46341 11.7085 0.409756C10.8597 0.146341 9.9524 0 9.01582 0C8.07923 0 7.17191 0.146341 6.32313 0.409756C5.85484 1.46341 5.47435 2.57561 5.21094 3.71707C6.44021 3.51219 7.72801 3.36585 9.01582 3.36585Z" fill={color} />
                            <Path d="M9.01582 14.6339C7.69874 14.6339 6.44021 14.4876 5.21094 14.2827C5.50362 15.4242 5.88411 16.5364 6.32313 17.59C7.17191 17.8534 8.07923 17.9998 9.01582 17.9998C9.9524 17.9998 10.8597 17.8534 11.7085 17.59C12.1768 16.5364 12.5573 15.4242 12.8207 14.2827C11.5914 14.4876 10.3036 14.6339 9.01582 14.6339Z" fill={color} />
                            <Path d="M13.1421 1.02441C13.4933 1.99027 13.8153 2.95612 14.0494 3.98051C15.0738 4.21466 16.0397 4.50734 17.0055 4.88783C16.1567 3.2488 14.8104 1.90246 13.1714 1.05368L13.1421 1.02441Z" fill={color}/>
                            <Path d="M4.85951 16.9757C4.50829 16.0099 4.18634 15.044 3.95219 14.0196C2.9278 13.7855 1.96195 13.4928 0.996094 13.1123C1.84487 14.7513 3.19122 16.0977 4.83024 16.9465L4.85951 16.9757Z" fill={color}/>
                            <Path d="M17.591 11.6782C17.8544 10.8294 18.0008 9.92213 18.0008 8.98554C18.0008 8.04896 17.8544 7.14164 17.591 6.29286C16.5373 5.82457 15.4252 5.44408 14.2837 5.18066C14.4886 6.40993 14.6349 7.69774 14.6349 8.98554C14.6349 10.3026 14.4886 11.5612 14.2837 12.7904C15.4252 12.4977 16.5373 12.1172 17.591 11.649V11.6782Z" fill={color}/>
                            <Path d="M16.9762 13.1416C16.0104 13.4928 15.0445 13.8148 14.0201 14.0489C13.786 15.0733 13.4933 16.0392 13.1128 17.005C14.7518 16.1562 16.0982 14.8099 16.9469 13.1709L16.9762 13.1416Z" fill={color}/>
                            <Path d="M1.02539 4.85853C1.99124 4.50731 2.9571 4.18536 3.98149 3.95121C4.21563 2.92682 4.50832 1.96097 4.8888 0.995117C3.24978 1.8439 1.90344 3.19024 1.05466 4.82926L1.02539 4.85853Z" fill={color}/>
                        </Svg>
                    }}
                    placeholder={"Введите email"}
                    value={formData.current.email}
                    editable={false}
                    // onResult={text => {
                    //     formData.current.phone = text
                    //     setReload(!reload)
                    // }}
                />
                <View style={styles.selectBlock}>
                    <View style={styles.select}>
                        <CheckboxWithLabel
                            label={"Пол женский"}
                            conditionInit={formData.current.gender == "женский"}
                            style={{borderBottomColor: "transparent"}}
                            textStyle={{paddingLeft: 0}}
                            onChange={val => {
                                if(val) {
                                    formData.current.gender = "женский"
                                } else
                                    formData.current.gender = ""
                            }}
                        />
                    </View>
                    <View style={styles.select}>
                        <CheckboxWithLabel
                            label={"Пол мужской"}
                            conditionInit={formData.current.gender == "мужской"}
                            style={{borderBottomColor: "transparent"}}
                            textStyle={{paddingLeft: 0}}
                            onChange={val => {
                                if(val) {
                                    formData.current.gender = "мужской"
                                } else
                                    formData.current.gender = ""
                            }}
                        />
                    </View>
                </View>
            </View>
            <ImageBackground
                style={styles.deliveryBlock}
                source={require("@images/myProfileEditScreen/bg.png")}
                resizeMode={"stretch"}
            >
                <View style={styles.container}>
                    <AppTextBold style={styles.title}>
                        Введите адрес для доставки
                    </AppTextBold>
                    <AppInputWIthIcon
                        screenWidth={screeWidth}
                        Icon={() => {
                            let color = defaultIconColor
                            if(formData.current.index_delivery != "") color = activeIconColor
                            return <Svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M14 12.375V2.25C14 1.63125 13.475 1.125 12.8333 1.125H10.5V0.5625C10.5 0.225 10.2667 0 9.91666 0C9.56666 0 9.33332 0.225 9.33332 0.5625V1.125H4.66666V0.5625C4.66666 0.225 4.43333 0 4.08333 0C3.73333 0 3.5 0.225 3.5 0.5625V1.125H1.16667C0.524999 1.125 0 1.63125 0 2.25V12.375H14ZM10.5 3.375H11.6667V4.5H10.5V3.375ZM10.5 5.625H11.6667V6.75H10.5V5.625ZM10.5 7.875H11.6667V9H10.5V7.875ZM10.5 10.125H11.6667V11.25H10.5V10.125ZM8.16666 3.375H9.33332V4.5H8.16666V3.375ZM8.16666 5.625H9.33332V6.75H8.16666V5.625ZM8.16666 7.875H9.33332V9H8.16666V7.875ZM8.16666 10.125H9.33332V11.25H8.16666V10.125ZM4.66666 3.375H5.83333V4.5H4.66666V3.375ZM4.66666 5.625H5.83333V6.75H4.66666V5.625ZM4.66666 7.875H5.83333V9H4.66666V7.875ZM4.66666 10.125H5.83333V11.25H4.66666V10.125ZM2.33333 3.375H3.5V4.5H2.33333V3.375ZM2.33333 5.625H3.5V6.75H2.33333V5.625ZM2.33333 7.875H3.5V9H2.33333V7.875ZM2.33333 10.125H3.5V11.25H2.33333V10.125Z" fill={color}/>
                                <Path d="M0 13.5V16.875C0 17.4938 0.524999 18 1.16667 18H3.5V14.625H5.83333V18H8.16666V14.625H10.5V18H12.8333C13.475 18 14 17.4938 14 16.875V13.5H0Z" fill={color}/>
                            </Svg>
                        }}
                        placeholder={"Индекс"}
                        value={formData.current.index_delivery}
                        onResult={text => {
                            formData.current.index_delivery = text
                            setReload(!reload)
                        }}
                    />
                    <AppInputWIthIcon
                        screenWidth={screeWidth}
                        Icon={() => {
                            let color = defaultIconColor
                            if(formData.current.region_delivery != "") color = activeIconColor
                            return <Svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M1.14274 0.03125C0.535662 0.03125 0 0.251975 0 1.04028V11.9819C0 12.518 0.535662 12.8333 1.14274 12.9909L5.6423 14V1.07181L1.14274 0.0627821V0.03125Z" fill={color}/>
                                <Path d="M11.2867 12.9594V0.03125L6.75146 1.04028V13.9684L11.2867 12.9594Z" fill={color}/>
                                <Path d="M16.8932 13.9687C17.5003 13.9687 18.0002 13.6534 18.0002 13.1174V2.01806C18.0002 1.48201 17.4646 1.16669 16.8575 1.00903L12.3579 0V12.9282L16.8575 13.9372L16.8932 13.9687Z" fill={color}/>
                            </Svg>
                        }}
                        placeholder={"Регион"}
                        value={formData.current.region_delivery}
                        onResult={text => {
                            formData.current.region_delivery = text
                            setReload(!reload)
                        }}
                    />
                    <AppInputWIthIcon
                        screenWidth={screeWidth}
                        Icon={() => {
                            let color = defaultIconColor
                            if(formData.current.city_delivery != "") color = activeIconColor
                            return <Svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M16.8817 0H1.11834C0.47929 0 0 0.496063 0 1.15748V12.8425C0 13.5039 0.47929 14 1.11834 14H16.8817C17.5207 14 18 13.5039 18 12.8425V1.15748C18 0.496063 17.5207 0 16.8817 0V0ZM3.35503 11.685H2.23669V2.37008H3.35503V11.685ZM5.59172 11.685H4.47337V10.5276H5.59172V11.685ZM5.59172 9.37008H4.47337V2.37008H5.59172V9.37008ZM8.94674 11.685H6.71006V10.5276H8.94674V11.685ZM8.94674 9.37008H6.71006V2.37008H8.94674V9.37008ZM11.1834 11.685H10.0651V10.5276H11.1834V11.685ZM11.1834 9.37008H10.0651V2.37008H11.1834V9.37008ZM13.4201 11.685H12.3018V10.5276H13.4201V11.685ZM13.4201 9.37008H12.3018V2.37008H13.4201V9.37008ZM15.6568 11.685H14.5385V2.37008H15.6568V11.685Z" fill={color}/>
                            </Svg>
                        }}
                        placeholder={"Город"}
                        value={formData.current.city_delivery}
                        onResult={text => {
                            formData.current.city_delivery = text
                            setReload(!reload)
                        }}
                    />
                    <AppInputWIthIcon
                        screenWidth={screeWidth}
                        Icon={() => {
                            let color = defaultIconColor
                            if(formData.current.street_delivery != "") color = activeIconColor
                            return <Svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M6.96175 0C3.09836 0 0 3.03704 0 6.74074C0 7.96296 0.344262 9.11111 0.956284 10.1111L7 18L13.0437 10.1111C13.6557 9.11111 14 7.96296 14 6.74074C14 3 10.8634 0 7.03825 0L6.96175 0ZM6.96175 10.1111C5.04918 10.1111 3.48087 8.59259 3.48087 6.74074C3.48087 4.88889 5.04918 3.37037 6.96175 3.37037C8.87432 3.37037 10.4426 4.88889 10.4426 6.74074C10.4426 8.59259 8.87432 10.1111 6.96175 10.1111Z" fill={color}/>
                            </Svg>
                        }}
                        placeholder={"Улица"}
                        value={formData.current.street_delivery}
                        onResult={text => {
                            formData.current.street_delivery = text
                            setReload(!reload)
                        }}
                    />
                    <AppInputWIthIcon
                        screenWidth={screeWidth}
                        Icon={() => {
                            let color = defaultIconColor
                            if(formData.current.house_delivery != "") color = activeIconColor
                            return <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M18 3.3907L15.7343 1.13023H10.1119C10.1119 0.502325 9.60839 0 8.97902 0C8.34965 0 7.84615 0.502325 7.84615 1.13023H0L2.26573 3.3907L0 5.65116H7.84615V16.8698C7.84615 17.4977 8.34965 18 8.97902 18C9.60839 18 10.1119 17.4977 10.1119 16.8698V5.65116H15.7343L18 3.3907Z" fill={color}/>
                            </Svg>
                        }}
                        placeholder={"Дом/корпус"}
                        value={formData.current.house_delivery}
                        onResult={text => {
                            formData.current.house_delivery = text
                            setReload(!reload)
                        }}
                    />
                    <AppInputWIthIcon
                        screenWidth={screeWidth}
                        Icon={() => {
                            let color = defaultIconColor
                            if(formData.current.appartment_delivery != "") color = activeIconColor
                            return <Svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M12.9839 2.28125H10.9966V3.42173H12.9839V16.8595H10.9966V18H12.9839C13.5139 18 13.9997 17.5042 13.9997 16.8595V3.42173C13.9997 2.8267 13.5581 2.28125 12.9839 2.28125Z" fill={color} />
                                <Path d="M9.00936 0.049586L1.01576 1.19007C0.485799 1.19007 0 1.68593 0 2.33054V16.8593C0 17.4543 0.441635 17.9997 1.01576 17.9997H9.00936H10.0251V16.8593V3.42144V2.28096V1.14048C10.0251 0.545447 9.58348 0 9.00936 0V0.049586ZM7.9936 10.1156C7.46363 10.1156 6.97784 9.61969 6.97784 8.97507C6.97784 8.38004 7.41947 7.8346 7.9936 7.8346C8.52356 7.8346 9.00936 8.33046 9.00936 8.97507C9.00936 9.57011 8.56772 10.1156 7.9936 10.1156Z" fill={color} />
                            </Svg>
                        }}
                        placeholder={"Квартира"}
                        value={formData.current.appartment_delivery}
                        onResult={text => {
                            formData.current.appartment_delivery = text
                            setReload(!reload)
                        }}
                    />
                </View>
            </ImageBackground>
            <View style={styles.container}>
                <AppSocActive
                    data={formData.current}
                    screenWidth={screeWidth}
                    onResult={result => {
                        formData.current = result
                        setReload(!reload)
                    }}
                />
            </View>
            <AppBlueButton
                style={styles.btnSave}
                onPress={saveFun}
            >
                Сохранить
            </AppBlueButton>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    deliveryBlock: {
        width: "100%",
        paddingTop: 10,
        paddingBottom: 30
    },
    selectBlock: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    select: {
        width: 140
    },
    btnSave: {
        width: 120,
        marginTop: 30,
        marginBottom: 30,
        marginLeft: "auto",
        marginRight: "auto"
    },
    title: {
        textAlign: "center"
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
            return <></>
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
            <AppIndicator timer={.5} />
        </>
    )
}

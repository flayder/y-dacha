import React, {useState, useRef, useEffect} from "react"
import {View, StyleSheet, Platform} from "react-native"
import {Path, Svg} from "react-native-svg";
import AppInput from "../formUI/AppInput";
import AppAddPhotoBlock from "./AppAddPhotoBlock";
import AppAdditionFunctional from "./AppAdditionFunctional";
import {AppTextBold} from "../AppTextBold";
import {AppAuthorizeInput} from "../AppAuthorizeInput";
import {AppBlueButton} from "../AppBlueButton";
import {AppFetch} from "../../AppFetch";
import {
    FileHandler,
    getSelectTitle,
    ifProductIdExist,
    parseSpecialistFilter,
    validateDataOfPayment
} from "../../../global";
import {globalAlert} from "../../globalHeaders";
import {useDispatch} from "react-redux";
import {getGlobalUserInfo} from "../../store/actions/other";
import AppSelectRegions from "../AppSelectRegions";
import AppSelectModified from "../AppSelectModified";
import * as InAppPurchases from "expo-in-app-purchases";

export default ({data, products, screenWidth, navigation, onChange}) => {
    const [price, setPrice] = useState(0)
    const [load, setLoad] = useState(false)
    const tarrif = useRef(false)
    const specialization = useRef([])
    const specializationData = useRef([])
    const formData = useRef({
        emblem: {},
        description: "",
        region: "",
        city: "",
        spec_id: 0,
        spec_val: 0
    })
    //console.log('data', data.is_decorator)
    //console.log('formData', formData.current)
    const dispatch = useDispatch()
    const init = async () => {
        const response = await AppFetch.getWithToken("getMastersFilter", {}, {}, navigation)
        if(response.result && Array.isArray(response.data)) {
            specialization.current = response.data[0]
            specializationData.current = parseSpecialistFilter(response.data[0])
            if(specialization.current && specialization.current.hasOwnProperty('id'))
                formData.current.spec_id = specialization.current.id
        }
        let priced = false
        if(data.hasOwnProperty('decorator') && data.decorator !== null && typeof data.decorator == "object") {
            //console.log(data.decorator)
            if (data.decorator.hasOwnProperty('emblem') && data.decorator.emblem)
                formData.current.emblem = {uri: data.decorator.emblem}
            if (data.decorator.hasOwnProperty('description')) formData.current.description = data.decorator.description
            if (data.decorator.hasOwnProperty('region')) formData.current.region = data.decorator.region
            if (data.decorator.hasOwnProperty('city')) formData.current.city = data.decorator.city
            if (data.decorator.hasOwnProperty('specialization') && typeof data.decorator.specialization == "object" && data.decorator.specialization) {
                formData.current.spec_id = data.decorator.specialization.id
                formData.current.spec_val = data.decorator.specialization.value
            }

        }
        if(data.hasOwnProperty('tariffs') && Array.isArray(data.tariffs)) {
            data.tariffs.map(item => {
                if(item.id == 7) {
                    priced = true
                    setPrice(parseInt(item.price))
                }
            })
        }
        if(!priced)
            setLoad(!load)
    }

    useEffect(() => {
        init()
    }, [data.hasOwnProperty('decorator')])

    const saveFun = async () => {
        const form = new FormData
        form.append('description', formData.current.description)
        form.append('region', formData.current.region)
        form.append('city', formData.current.city)
        form.append('spec_id', formData.current.spec_id)
        form.append('spec_val', formData.current.spec_val)

        const fileArr = FileHandler(formData.current.emblem)

        if(fileArr)
            form.append('emblem', fileArr)

        const response = await AppFetch.postWithToken("updateMasterInfo", form, {}, {
            "Accept": "application/json",
            "Content-Type": "multipart/form-data"
        }, navigation)
        //console.log('response', response)
        if(response.result) {
            globalAlert({
                title: "Данные успешно обновлены"
            })
            dispatch(getGlobalUserInfo({navigation, forced: true}))
        }
    }

    return (
        <View>
            <AppAdditionFunctional
                title={"Функционал мастера"}
                description={"После активации данной роли Вы сможете выкладывать свои работы и принимать заказы по ним."}
                outside={true}
                passive={price == 0}
                data={validateDataOfPayment(data, 'master')}
                price={price + "₽ в мес"}
                onActivate={async () => {
                    if(Platform.OS == "android") {
                        let response
                        try {
                            response = await AppFetch.getWithToken("payDecorator", {}, {}, navigation)
                            return Promise.resolve(response)
                        } catch (e) {
                            console.log(e)
                            return Promise.reject(e)
                        }
                    } else {
                        if(ifProductIdExist(products, '7')) {
                            await InAppPurchases.purchaseItemAsync('7')
                        }
                    }
                }}
                onDeactivate={async () => {
                    if(Platform.OS == "android") {
                        let response
                        try {
                            response = await AppFetch.getWithToken("payDecorator", {
                                cancel: 1
                            }, {}, navigation)
                            //console.log('response', response)
                            return Promise.resolve(response)
                        } catch (e) {
                            console.log(e)
                            return Promise.reject(e)
                        }
                    }
                }}
                Icon={() => {
                    return <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M16.8212 0H1.17884C0.498741 0 0 0.544081 0 1.17884V11.199C0 11.8791 0.544081 12.3778 1.17884 12.3778H4.48867L3.35516 18H4.48867L5.62217 12.3778H12.3778L13.5113 18H14.6448L13.5113 12.3778H16.8212C17.5013 12.3778 18 11.8338 18 11.199V1.17884C18 0.49874 17.4559 0 16.8212 0V0ZM6.75567 10.1562H4.48867V6.75567H6.75567V10.1562ZM10.1562 10.1562H7.88917V5.62217H10.1562V10.1562ZM13.5567 10.1562H11.2897V4.53401H13.5567V10.1562Z" fill="white"/>
                    </Svg>
                }}
            />
            {
                data.is_decorator
                    ?
                    <>
                        <AppAddPhotoBlock
                            style={{marginTop: 30}}
                            title={"Загрузите логотип мастера"}
                            initiate={formData.current.emblem}
                            onChange={file => {
                                formData.current.emblem = file
                                setLoad(!load)
                            }}
                        />
                        <View style={styles.container}>
                            <AppTextBold style={styles.title}>
                                Укажите свою специализацию
                            </AppTextBold>
                            <AppSelectModified
                                title={getSelectTitle(specializationData.current, formData.current.spec_val) != "" ? getSelectTitle(specializationData.current, formData.current.spec_val) : "Выбирите специализацию"}
                                data={specializationData.current}
                                borderRadius={0}
                                initValue={formData.current.spec_val}
                                showDefaultTitle={getSelectTitle(specializationData.current, formData.current.spec_val) == ""}
                                force={true}
                                cancelDefaultAutoNaming={true}
                                onResult={res => {
                                    formData.current.spec_val = res
                                }}
                            />
                            {/*<AppInput*/}
                            {/*    placeholder={"Укажите ваш Email"}*/}
                            {/*/>*/}
                            {/*<AppSocActive*/}
                            {/*    screenWidth={screenWidth}*/}
                            {/*/>*/}
                            <AppInput
                                checkbox={true}
                                placeholder={"Расскажите о себе и своей деятельности"}
                                inputStyle={{height: 200}}
                                value={formData.current.description}
                                outline={true}
                                onResult={text => {
                                    formData.current.description = text
                                    setLoad(!load)
                                }}
                            />
                            <AppTextBold style={styles.title}>
                                Регион и адрес работы
                            </AppTextBold>
                            {/*<AppAuthorizeInput*/}
                            {/*    placeholder={"Укажите регион"}*/}
                            {/*    value={formData.current.region}*/}
                            {/*    onResult={text => {*/}
                            {/*        formData.current.region = text*/}
                            {/*        setLoad(!load)*/}
                            {/*    }}*/}
                            {/*/>*/}
                            <AppSelectRegions
                                preText={"Ваш регион: "}
                                showDefaultTitle={false}
                                defaultIs={formData.current.region}
                                style={{marginBottom: 10}}
                                onResult={text => {
                                    formData.current.region = text
                                    setLoad(!load)
                                }}
                            />
                            <AppAuthorizeInput
                                placeholder={"Укажите адрес"}
                                value={formData.current.city}
                                onResult={text => {
                                    formData.current.city = text
                                    setLoad(!load)
                                }}
                            />
                            <AppBlueButton
                                style={styles.btnSave}
                                onPress={saveFun}
                            >
                                Сохранить
                            </AppBlueButton>
                        </View>
                    </>
                    :
                    <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    btnSave: {
        width: 120,
        marginTop: 30,
        marginBottom: 30,
        marginLeft: "auto",
        marginRight: "auto"
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        textAlign: "center"
    }
})
import React, {useState, useRef, useEffect} from "react"
import {View, StyleSheet, Platform} from "react-native"
import AppTarrifBlock from "./AppTarrifBlock";
import {ClipPath, Defs, G, Path, Rect, Svg} from "react-native-svg";
import AppAdditionFunctional from "./AppAdditionFunctional";
import AppInput from "../formUI/AppInput";
import AppSiteBlock from "./AppSiteBlock";
import AppDeliveryBlock from "./AppDeliveryBlock";
import AppAddPhotoBlock from "./AppAddPhotoBlock";
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
import AppPayable from "../AppPayable";
import {useDispatch} from "react-redux";
import {getGlobalUserInfo} from "../../store/actions/other";
import {AppTextBold} from "../AppTextBold";
import AppSelectModified from "../AppSelectModified";
import * as InAppPurchases from "expo-in-app-purchases";

export default ({data, products, navigation, onChange}) => {
    const activeData = validateDataOfPayment(data, 'seller')
    const [price, setPrice] = useState(activeData.hasOwnProperty('price') ? activeData.price : 0)
    const [load, setLoad] = useState(false)
    const tarrif = useRef(false)
    const specialization = useRef([])
    const specializationData = useRef([])
    const formData = useRef({
        name: "",
        site: "",
        emblem: {},
        description: "",
        delivery_method: [],
        spec_id: 0,
        spec_val: 0
    })
    const dispatch = useDispatch()

    //console.log('tariff', tarrif.current)

    const init = async () => {
        //console.log('data.seller', data.seller)
        try {
            const response = await AppFetch.getWithToken("getShopsFilter", {}, {}, navigation)
            if(response.result && Array.isArray(response.data)) {
                specialization.current = response.data[0]
                specializationData.current = parseSpecialistFilter(response.data[0])
            }
            if (data.hasOwnProperty('site')) formData.current.site = data.site
            if(data.hasOwnProperty('seller') && data.seller != null && typeof data.seller == "object" ) {
                if (data.seller.hasOwnProperty('name')) formData.current.name = data.seller.name
                if (data.seller.hasOwnProperty('emblem') && data.seller.emblem)
                    formData.current.emblem = {uri: data.seller.emblem}
                if (data.seller.hasOwnProperty('description')) formData.current.description = data.seller.description
                if (data.seller.hasOwnProperty('delivery_method')) formData.current.delivery_method = data.seller.delivery_method
                if (data.seller.hasOwnProperty('specialization') && typeof data.seller.specialization == "object" && data.seller.specialization) {
                    if(data.seller.specialization.hasOwnProperty('id') && data.seller.specialization.id)
                        formData.current.spec_id = data.seller.specialization.id
                    if(data.seller.specialization.hasOwnProperty('value') && data.seller.specialization.value)
                        formData.current.spec_val = data.seller.specialization.value
                }
                setLoad(!load)
            }
        } catch (e) {
            console.log('errorSellerTab', e)
        }
    }

    useEffect(() => {
        init()
        //console.log('formData', formData.current, data)
    }, [price])




    const configurateDeliveryData = (data) => {
        const arr = {}

        if(Array.isArray(data)) {
            data.map(item => {
                const code = item.code
                arr[code] = item.name

                arr[code + "_price"] = item.price
            })
        }

        return arr
    }

    const saveFun = async () => {
        const form = new FormData
        form.append('name', formData.current.name)
        form.append('description', formData.current.description)
        form.append('site', formData.current.site)
        form.append('delivery_method', JSON.stringify(configurateDeliveryData(formData.current.delivery_method)))
        form.append('spec_id', formData.current.spec_id)
        form.append('spec_val', formData.current.spec_val)

        const fileArr = FileHandler(formData.current.emblem)

        if(fileArr)
            form.append('emblem', fileArr)

        //console.log(configurateDeliveryData(formData.current.delivery_method))

        const response = await AppFetch.postWithToken("updateSellerInfo", form, {}, {
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


    // if(activeData.hasOwnProperty('price') && price != activeData.price) {
    //     setPrice(activeData.price)
    // }
    return (
        <View>
            {
                data.hasOwnProperty('tariffs')
                    ?
                    <>
                        <AppTarrifBlock
                            data={data.tariffs}
                            activeData={activeData}
                            onResult={item => {
                                if(item.hasOwnProperty('price')) {
                                    tarrif.current = item
                                    setPrice(parseInt(item.price))
                                }
                            }}
                        />
                        {
                            data
                                ?
                                <AppAdditionFunctional
                                    title={"Возможность продавать"}
                                    description={"После активации любого из четырех тарифов (мастер," +
                                    "эксперт, гуру, безлимит) Вы сможете вести продажи" +
                                    "и сформировать каталог своего ассортимента."}
                                    passive={price == 0}
                                    data={validateDataOfPayment(data, 'seller')}
                                    outside={true}
                                    price={price + "₽ в мес"}
                                    onActivate={async () => {
                                        if(Platform.OS == "android") {
                                            let response
                                            try {
                                                response = await AppFetch.getWithToken("paySeller", {
                                                    id: tarrif.current.id
                                                }, {}, navigation)
                                                //console.log('ee', response)
                                                return Promise.resolve(response)
                                            } catch (e) {
                                                console.log(e)
                                                return Promise.reject(e)
                                            }
                                        } else {
                                            if(ifProductIdExist(products, tarrif.current.ios_code)) {
                                                await InAppPurchases.purchaseItemAsync(tarrif.current.ios_code)
                                            }
                                        }

                                    }}
                                    onDeactivate={async () => {
                                        if(Platform.OS == "android") {
                                            let response
                                            try {
                                                response = await AppFetch.getWithToken("paySeller", {
                                                    id: tarrif.current.id,
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
                                            <G clipPath="url(#clip0)">
                                                <Path d="M9.01463 0C4.03902 0 0 4.03902 0 9.01463C0 13.9902 4.03902 18.0293 9.01463 18.0293C13.9902 18.0293 18.0293 13.9902 18.0293 9.01463C18.0293 4.03902 13.9902 0 9.01463 0ZM10.1268 13.4634V14.6341H7.87317V13.5805C7.87317 13.522 6.26341 13.2293 5.50244 12.8195L6.11707 10.9756C6.96585 11.2976 8.22439 11.7073 9.13171 11.5317C9.92195 11.3561 10.1561 10.6537 9.21951 10.2439C8.42927 9.89268 5.56098 9.5122 5.56098 7.22927C5.56098 6.29268 6.76098 5.00488 7.87317 4.59512V3.36585H10.1268V4.50732C10.1268 4.56585 11.3268 4.68293 12.1463 4.94634C12.0585 5.29756 11.6195 6.81951 11.6195 6.81951C11.0634 6.6439 10.1268 6.29268 9.24878 6.35122C8.16585 6.40976 8.07805 7.2 8.80976 7.55122C10.3024 8.22439 12.6146 8.80976 12.6146 10.8C12.6146 12.3512 11.2683 13.2293 10.1268 13.4341V13.4634Z" fill="white"/>
                                            </G>
                                            <Defs>
                                                <ClipPath id="clip0">
                                                    <Rect width="18" height="18" fill="white"/>
                                                </ClipPath>
                                            </Defs>
                                        </Svg>
                                    }}
                                />
                                :
                                <></>
                        }
                    </>
                    :
                    <></>
            }
            {
                data.is_seller
                    ?
                    <>
                        <AppAddPhotoBlock
                            style={{marginTop: 30}}
                            title={"Загрузите торговый логотип"}
                            initiate={formData.current.emblem}
                            onChange={file => {
                                formData.current.emblem = file
                                setLoad(!load)
                            }}
                        />
                        <View style={styles.container}>
                            <AppTextBold style={styles.title}>
                                Укажите тип поставщика
                            </AppTextBold>
                            <AppSelectModified
                                title={getSelectTitle(specializationData.current, formData.current.spec_val) != "" ? getSelectTitle(specializationData.current, formData.current.spec_val) : "Выбирите специализацию"}
                                data={specializationData.current}
                                showDefaultTitle={getSelectTitle(specializationData.current, formData.current.spec_val) == ""}
                                initValue={formData.current.spec_val}
                                force={true}
                                cancelDefaultAutoNaming={true}
                                onResult={res => {
                                    formData.current.spec_val = res
                                }}
                            />
                            <AppTextBold style={styles.title}>
                                Укажите данные магазина
                            </AppTextBold>
                            <AppInput
                                placeholder={"Введите название магазина"}
                                value={formData.current.name}
                                outline={true}
                                onResult={text => {
                                    formData.current.name = text
                                    setLoad(!load)
                                }}
                            />
                            <AppInput
                                checkbox={true}
                                placeholder={"Расскажите о вашем магазине"}
                                inputStyle={{height: 200}}
                                value={formData.current.description}
                                outline={true}
                                onResult={text => {
                                    formData.current.description = text
                                    setLoad(!load)
                                }}
                            />
                            <AppSiteBlock
                                activeIs={formData.current.site != ""}
                                value={formData.current.site}
                                onResult={text => {
                                    formData.current.site = text
                                    setLoad(!load)
                                }}
                            />
                            <AppDeliveryBlock
                                data={data}
                                delivery_methods={formData.current.delivery_method}
                                onResult={delivery => {
                                    formData.current.delivery_method = delivery
                                }}
                            />
                        </View>
                        <AppPayable />
                        <AppBlueButton
                            style={styles.btnSave}
                            onPress={() => {
                                saveFun()
                            }}
                        >
                            Сохранить
                        </AppBlueButton>
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
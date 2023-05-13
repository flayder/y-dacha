import React, {useState, useEffect} from "react"
import {View, StyleSheet, Platform} from "react-native"
import {Path, Svg} from "react-native-svg";
import AppAdditionFunctional from "./AppAdditionFunctional";
import {AppFetch} from "../../AppFetch";
import {ifItExist, ifProductIdExist, validateDataOfPayment} from "../../../global";
import * as InAppPurchases from 'expo-in-app-purchases';
import {AppBlueButton} from "../AppBlueButton";


export default ({data, products, navigation}) => {
    //console.log('ddddd', data)
    const [price, setPrice] = useState(0)
    const [load, setLoad] = useState(false)
    const init = () => {
        let priced = false
        if(data.hasOwnProperty('tariffs') && Array.isArray(data.tariffs)) {
            data.tariffs.map(item => {
                if(item.id == 9) {
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
    }, [price])

    return (
        <View>
            {
                data
                    ?
                    <AppAdditionFunctional
                        title={"Дополнительный функционал пользователя"}
                        description={"После активации предоставляется возможность составлять список своих растений, дополнительный функционал с ними, просмотр меток магазинов продавцов, а так же отправка с целью консультации фотографий своих растений"}
                        passive={price == 0}
                        price={price + "₽ в мес"}
                        data={validateDataOfPayment(data, 'addition')}
                        outside={true}
                        Icon={() => {
                            return <Svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M12.0758 6.7659L9.98399 16.3683L7.92206 6.7659H12.0758Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M18.2855 6.7659L10.9144 16.2401L13.9808 6.7659H18.2855ZM9.04637 16.2294L1.71308 6.7659H5.98347L9.04637 16.2294Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M19.1839 4.81375H13.9463L11.7924 0.345H14.845L19.1839 4.81375Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M0.815852 4.81375L5.15482 0.345H8.2039L6.0188 4.81375H0.815852Z" stroke="white" stroke-width="0.69"/>
                                <Path d="M8.04439 4.81375L9.9838 0.789959L11.9513 4.81375H8.04439Z" stroke="white" stroke-width="0.69"/>
                            </Svg>
                        }}
                        onActivate={async () => {
                            if(Platform.OS == "android") {
                                let response
                                try {
                                    response = await AppFetch.getWithToken("payAddition", {}, {}, navigation)
                                    return Promise.resolve(response)
                                } catch (e) {
                                    console.log(e)
                                    return Promise.reject(e)
                                }
                            } else {
                                if(ifProductIdExist(products, '9')) {
                                    await InAppPurchases.purchaseItemAsync('9')
                                }
                            }
                        }}
                        onDeactivate={async () => {
                            if(Platform.OS == "android") {
                                let response
                                try {
                                    response = await AppFetch.getWithToken("payAddition", {
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
                    />
                    :
                    <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        textAlign: "center"
    }
})
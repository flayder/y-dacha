import React, {useState, useEffect} from "react"
import {View, StyleSheet, Platform} from "react-native"
import {Path, Svg} from "react-native-svg";
import AppAdditionFunctional from "./AppAdditionFunctional";
import {AppFetch} from "../../AppFetch";
import {ifProductIdExist, validateDataOfPayment} from "../../../global";
import * as InAppPurchases from "expo-in-app-purchases";

export default ({data, products, navigation, onChange}) => {
    const [price, setPrice] = useState(0)
    const [load, setLoad] = useState(false)
    //console.log('data', data)

    const init = () => {
        try {
            let priced = false
            if(data.hasOwnProperty('tariffs') && Array.isArray(data.tariffs)) {
                data.tariffs.map(item => {
                    if(item.id == 8) {
                        priced = true
                        setPrice(parseInt(item.price))
                    }
                })
            }
            if(!priced)
                setLoad(!load)
        } catch (e) {
            console.log('errorEvent', e)
        }
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
                        title={"Возможность размещать события"}
                        description={"После активации Вы сможете создавать события, которые будут видны всем пользователям, и поделиться своим творчеством."}
                        passive={price == 0}
                        outside={true}
                        price={price + "₽ в мес"}
                        data={validateDataOfPayment(data, 'partymaker')}
                        onActivate={async () => {
                            if(Platform.OS == "android") {
                                let response
                                try {
                                    response = await AppFetch.getWithToken("payPartymaker", {}, {}, navigation)
                                    return Promise.resolve(response)
                                } catch (e) {
                                    console.log(e)
                                    return Promise.reject(e)
                                }
                            } else {
                                if(ifProductIdExist(products, '8')) {
                                    await InAppPurchases.purchaseItemAsync('8')
                                }
                            }
                        }}
                        onDeactivate={async () => {
                            if(Platform.OS == "android") {
                                let response
                                try {
                                    response = await AppFetch.getWithToken("payPartymaker", {
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
                    :
                    <></>
            }
        </View>
    )
}
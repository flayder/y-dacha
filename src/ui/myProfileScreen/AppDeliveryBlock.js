import React, {useRef} from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import CheckboxWithLabel from "../CheckboxWithLabel";
import AppDelivValue from "./AppDelivValue";
import {getRandomKey} from "../../../global";
import AppDeliveryItem from "./AppDeliveryItem";

export default ({data, delivery_methods, onResult}) => {

    const isActive = (id) => {
        let result = {
            res: false,
            price: 0
        }
        if(
            Array.isArray(delivery_methods)
        ) {
            delivery_methods.map(item => {
                if(item.hasOwnProperty('id') && item.id == id) {
                    result.res = true
                    result.price = item.price
                }
            })
        }

        return result
    }

    const add = (data) => {
        let result = false

        if(Array.isArray(delivery_methods)) {
            delivery_methods.map((item, key) => {
                if(item.id == data.id) {
                    delivery_methods[key] = data
                    result = true
                }
            })
        } else {
            delivery_methods = []
        }

        if(!result)
            delivery_methods.push(data)

        if(onResult) onResult(delivery_methods)
    }

    const remove = (data) => {
        delivery_methods.map((item, key) => {
            if(item.id == data.id) {
                delivery_methods.splice(key, 1)
            }
        })

        if(onResult) onResult(delivery_methods)
    }

    if(data.hasOwnProperty('deliveries')) {
        return (
            <View style={styles.wrap}>
                {
                    data.deliveries.map(item => {
                        return <AppDeliveryItem
                            key={getRandomKey()}
                            item={item}
                            result={isActive(item.id)}
                            onResult={result => {
                                if(result.result) {
                                    item.price = result.price
                                    add(item)
                                } else {
                                    //console.log('res-false', result)
                                    remove(item)
                                }
                            }}
                        />
                    })
                }
            </View>
        )
    } else {
        return <></>
    }
}

const styles = StyleSheet.create({

})
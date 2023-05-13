import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import Dialog from "react-native-dialog";


export default (
    {
        title,
        description,
        onResult,
        onOk,
        onCancel,
        elements,
        children,
        //activeIs = false,
        input = true,
        cancel = false,
        okText = "Ok",
        cancelText = "Отмена",
        inputStyle
    }) => {

    //const [active, setActive] = useState(activeIs)

    return (
        <View>
            <Dialog.Container
                visible={true}
            >
                {
                    title
                        ?
                        <Dialog.Title>{title}</Dialog.Title>
                        :
                        <></>
                }
                {
                    description
                        ?
                        <Dialog.Description>
                            {description}
                        </Dialog.Description>
                        :
                        <></>
                }
                {
                    children
                        ?
                        <Dialog.Description
                            children={children}
                        />
                        :
                        <></>
                }
                {
                    input
                        ?
                        <Dialog.Input
                            dialogStyle={inputStyle}
                            onChangeText={value => {
                                if(onResult) onResult(value)
                            }}
                        />
                        :
                        <></>
                }
                {
                    cancel
                        ?
                        <Dialog.Button
                            label={cancelText}
                            onPress={() => {
                                if(onCancel) onCancel(true)
                            }}
                        />
                        :
                        <></>
                }

                <Dialog.Button
                    label={okText}
                    onPress={() => {
                        if(onOk) onOk(true)
                    }}
                />
            </Dialog.Container>
        </View>
    )
}
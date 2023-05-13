import React, {useLayoutEffect, useRef} from "react"
import { LoadingBar } from "@root/ui/LoadingBar";
import {createStackNavigator} from "@react-navigation/stack";
import {DB} from "../db";
import {emptyNavigation} from "../../global";

const LoadingWrapper = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTintColor: 'white',
            headerStyle: {
                height: 50,
                ...emptyNavigation
            }
        }, [navigation])

        navigation.getParent().setOptions({
            gestureEnabled: false
        })
    })

    const state = useRef(false)

    DB.getUser().then(user => {
        if(user.hasOwnProperty('token') && user.token)
            state.current = true
    })

    return <LoadingBar delay={500} onFinish={() => {
        setTimeout(() => {
            if(state.current)
               navigation.navigate("MainPageScreen")
            else
               navigation.navigate("NotificationSwitchScreen")
        }, 100)
    }} />
}


const Stack = createStackNavigator()

export const LoadingScreen = () => {
    return (
        <Stack.Navigator screenOptions={() => ({
            headerShown: false
        })}>
            <Stack.Screen name="LoadingWrapper" component={LoadingWrapper} />
        </Stack.Navigator>
    )
}
//let {width, height} = Dimensions.get('screen')
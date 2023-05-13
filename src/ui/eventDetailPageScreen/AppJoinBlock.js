import React, {useState, useRef} from "react";
import {View, Animated, StyleSheet} from "react-native";
import AppHint from "../AppHint";
import {AppBlueButton} from "../AppBlueButton";
import {AppFetch} from "../../AppFetch";
import {AppTextBold} from "../AppTextBold";

export default ({data = {}, onResult, id, navigation}) => {
    const [showHint, setHint] = useState(false)
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 5000,
            useNativeDriver: false
        }).start(() => {
            setHint(false)
        });
    };

    if(data.hasOwnProperty('isJoined') && !data.isJoined)
        return (
            <View style={{position: 'relative'}}>
                <Animated.View style={{...styles.hint, opacity: fadeAnim}}>
                    {
                        showHint
                            ?
                            <AppHint text={"Вы стали участником мероприятия"} />
                            :
                            <></>
                    }
                </Animated.View>
                <AppBlueButton
                    onPress={async () => {
                        const response = await AppFetch.getWithToken('joinEvent', {id}, {}, navigation)
                        //console.log(response)
                        setHint(!showHint)
                        fadeIn()
                        if(onResult) onResult(true)
                    }}
                >
                    <AppTextBold>
                        Участвовать в мероприятии
                    </AppTextBold>
                </AppBlueButton>
            </View>
        )
    else if(data.hasOwnProperty('isJoined') && data.isJoined)
        return (
            <View>
                <Animated.View style={{...styles.hint, opacity: fadeAnim}}>
                    {
                        showHint
                            ?
                            <AppHint text={"Теперь вы не являетесь участником этого мероприятия"} />
                            :
                            <></>
                    }
                </Animated.View>
                <AppBlueButton
                    onPress={async () => {
                        const response = await AppFetch.getWithToken('leaveEvent', {id}, {}, navigation)
                        //console.log(response)
                        setHint(!showHint)
                        fadeIn()
                        if(onResult) onResult(true)
                    }}
                >
                    <AppTextBold>
                        Прекратить участие в мероприятии
                    </AppTextBold>
                </AppBlueButton>
            </View>
        )
    else
        return <></>
}

const styles = StyleSheet.create({
    hint: {
        position: 'absolute',
        left: 40,
        top: -20,
        zIndex: 99
    }
})
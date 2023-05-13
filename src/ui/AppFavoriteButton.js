import React, {useState, useRef} from "react"
import {View, StyleSheet, TouchableOpacity, Animated} from "react-native"
import AppHint from "./AppHint";
import {FAVORITE_SORT, LinkTo} from "../../global";
import {useNavigation} from "@react-navigation/native";
import {AppFetch} from "../AppFetch";

export default (
    {
        id,
        type,
        hintText = "",
        isActive = false,
        toFavorite = {},
        passiveForm,
        activeForm,
        style,
        hintStyle,
        hintSrc = false,
        hintReserved = false
    }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const changeHere = useRef(false)
    const [active, setActive] = useState(isActive)

    //console.log(id, type)

    if(!changeHere.current && active != isActive) setActive(isActive)

    const navigation = useNavigation()

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            changeHere.current = true
            setActive(true)
        })
    }

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            setTimeout(() => {
                fadeOut()
            }, 2000)
        })
    }

    if(active) {
        return (
            <TouchableOpacity
                style={{...styles.button, ...style}}
                activeOpacity={1}
                onPress={() => {
                    LinkTo("FavoritesPageScreen", toFavorite, navigation)
                }}
            >
                {activeForm()}
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity
                style={{...styles.button, ...style}}
                activeOpacity={1}
                onPress={async () => {
                    const response = await AppFetch.getWithToken("addFavorite", {
                        id,
                        type,
                    }, {}, navigation)
                    //console.log('response', response, {id, type})
                    if(response.result) {
                        fadeIn()
                    }
                    //fadeIn()
                }}
            >
                {
                    hintText != ""
                        ?
                        <Animated.View style={{...styles.hint, ...hintStyle, opacity: fadeAnim}}>
                            <AppHint
                                text={hintText}
                                reversed={hintReserved}
                            />
                        </Animated.View>
                        :
                        <></>
                }
                {passiveForm()}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        position: "relative"
    },
    hint: {
        position: "absolute",
        zIndex: 9,
        left: 45,
        top: -30,
        width: 280
    }
})
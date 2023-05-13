import React, {useState} from "react"
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Svg, Path} from "react-native-svg";
import {AppText} from "../AppText";
import AppFastImage from "../AppFastImage";

export default ({item, style, navigation, isActive = false, onResultActive}) => {
    const [active, setActive] = useState(isActive)
    //console.log('item', item)
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{...styles.wrap, ...style}}
            onLongPress={() => {
                if(onResultActive) onResultActive(item.id)
                setActive(!active)
            }}
            onPress={() => {
                //LinkTo("PlantEditListScreen", {plantId: item.plant_id}, navigation)
            }}
        >
            <View style={styles.image}>
                {
                    active
                        ?
                        <View style={styles.activeBlock}>
                            <View style={styles.activeBg}></View>
                            <Svg width="32" height="23" viewBox="0 0 32 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path fill-rule="evenodd" clip-rule="evenodd" d="M11.4286 23L0 11.9423L3.2 8.84615L11.4286 16.8077L28.8 0L32 3.09615L11.4286 23Z" fill="white"/>
                            </Svg>
                        </View>
                        :
                        <></>
                }
                <AppFastImage
                    style={styles.img}
                    uri={item.photo}
                />
            </View>
            <View style={styles.body}>
                <AppText style={styles.name}>
                    {item.name}, {item.mark}
                </AppText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    name: {
        marginTop: 0,
        marginBottom: 5,
        fontSize: 14
    },
    body: {
        padding: 10
    },
    wrap: {
        width: 220,
        margin: 10,
        backgroundColor: "#fff",
        padding: 0,
        borderRadius: 8
    },
    image: {
        position: "relative",
        borderRadius: 8,
        overflow: "hidden"
    },
    activeBg: {
        backgroundColor: "#000",
        opacity: .5,
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0
    },
    activeBlock: {
        position: "absolute",
        zIndex: 9,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    img: {
        width: "100%",
        height: 110
    }
})
import React from "react"
import {Dimensions, StyleSheet, TouchableOpacity, View} from "react-native"
//import AutoHeightImage from "react-native-auto-height-image";
import AppFastImage from "./AppFastImage";
import {getRandomKey} from "../../global";

export default ({item, navigation, imgWidth}) => {
    if(item) {
        return (
            <TouchableOpacity activeOpacity={1} key={getRandomKey()} style={styles.btnWrap}>
                <View style={styles.item}>
                    <View style={styles.imgWrap}>
                        <AppFastImage
                            style={{ width: imgWidth, height: imgWidth }}
                            uri={item.main_photo}
                            resizeMode={"cover"}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    } else return <></>
}

const styles = StyleSheet.create({
    item: {
        marginRight: 15
    },
    img: {
        borderRadius: 6
    },
    btnWrap: {
        //paddingTop: 10,
        paddingBottom: 10
    },
    imgWrap: {
        marginBottom: 10
    },
})
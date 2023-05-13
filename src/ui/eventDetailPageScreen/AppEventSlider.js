import React from "react"
import {View, StyleSheet, ScrollView, ImageBackground} from "react-native"
import {getRandomKey} from "../../../global";

export default ({photos = [], screenWidth}) => {
    if(!Array.isArray(photos)) photos = []
    return (
        <ScrollView contentContainerStyle={styles.scroll} horizontal={true}>
            <View style={styles.wrap}>
                {
                    photos.map(item => {
                        return <ImageBackground
                            key={getRandomKey()}
                            style={{...styles.bg, width: screenWidth / 1.5}}
                            source={{uri: item}}
                            resizeMode={"cover"}
                        />
                    })
                }

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        minWidth: "100%"
    },
    wrap: {
        flexDirection: "row"
    },
    bg: {
        width: "80%",
        height: 150,
        //backgroundColor: "red",
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5
    }
})
import React from "react"
import {View, ImageBackground, StyleSheet} from "react-native";
import SWGImage from "expo-svg-uri";
import {AppText} from "./AppText";

export default ({icon, text, style}) => {
    return (
        <View style={{...styles.wrapper, ...style}}>
            <SWGImage
                source={icon}
                style={styles.icon}
            />
            {
                text
                    ?
                    <View style={styles.wrapHint}>
                        <ImageBackground style={styles.back}>
                            <View style={styles.wrap}>
                                <AppText style={styles.text}>
                                    {text}
                                </AppText>
                            </View>
                        </ImageBackground>
                    </View>
                    :
                    <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({

})
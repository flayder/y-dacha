import React from "react"
import {AppLogoFirstScreens} from "./AppLogoFirstScreens";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {AppWrap} from "./AppWrap";
import {THEME} from "../../theme";
import {AppText} from "./AppText";
import {AppTextBold} from "./AppTextBold";
import {Path, Svg} from "react-native-svg";

export default ({title, text, navigation, routeName = "MainPageScreen", label}) => {
    return (
        <>
            <AppLogoFirstScreens />
            <View style={styles.form}>
                <View style={styles.successWrap}>
                    <View style={styles.imageWrap}>
                        <Image
                            style={{width: 160, height: 160, marginTop: -2, marginLeft: -2}}
                            source={require('@images/signUpSuccess/successSignUp.gif')}
                            resizeMode={"cover"}
                        />
                    </View>
                    <View style={styles.circle}>
                        <Svg width="54" height="45" viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path fillRule="evenodd" clipRule="evenodd" d="M27.7878 0.45975C28.4008 1.07275 28.4008 2.06675 27.7878 2.67875L10.5258 19.9417C9.91275 20.5548 8.91975 20.5548 8.30675 19.9417L0.45975 12.0948C-0.15325 11.4818 -0.15325 10.4887 0.45975 9.87575C1.07275 9.26275 2.06675 9.26275 2.67875 9.87575L9.41575 16.6127L25.5688 0.45975C26.1818 -0.15325 27.1758 -0.15325 27.7878 0.45975Z" fill="white"/>
                        </Svg>
                    </View>
                </View>
                <AppText style={{...styles.text, marginTop: 20}}>
                    {title}
                </AppText>
                <AppText style={styles.text}>
                    {text}
                </AppText>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.blueBtn} onPress={() => {
                    navigation.jumpTo(routeName)
                }}>
                    <AppTextBold style={styles.blueBtnText}>
                        {label}
                    </AppTextBold>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}></View>
        </>
    )
}

const styles = StyleSheet.create({
    successWrap: {
        position: "relative"
    },
    imageWrap: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: "hidden"
    },
    circle: {
        backgroundColor: "#60A04E",
        width: 110,
        height: 110,
        borderRadius: 55,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 20,
        top: 20
    },
    blueBtn: {
        width: "100%",
        marginTop: 25,
        marginBottom: 25,
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    blueBtnText: {
        fontSize: 18,
        color: THEME.BLUE
    },
    form: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    wrap: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around"
    },
    bold: {
        marginTop: 30,
        textAlign: "center"
    },
    text: {
        marginTop: 0,
        marginBottom: 0,
        width: "100%",
        textAlign: "center"
    },
    bottomText: {
        fontSize: 20,
        color: "#000"
    },
    btn: {
        width: "100%",
        marginBottom: 30,
    },
    logo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
    },
    bottom: {
        width: "100%",
        marginTop: 30,
    }
})
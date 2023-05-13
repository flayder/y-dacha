import React from "react"
import {StyleSheet, TouchableOpacity, View} from "react-native"
import {Svg, Path} from "react-native-svg";
import {LinkTo} from "../../../global";

export const AppQrHeaderButton = ({navigation, route, showSearchPanel = true}) => {
    //console.log('nav', route)
    const searchStyle = (!showSearchPanel) ? {justifyContent: "flex-end"} : {}
    return (
        <View style={{...styles.wrap, ...searchStyle}}>
            {/*<TouchableOpacity style={styles.btn}>*/}
            {/*    <SWGImage*/}
            {/*        width="25"*/}
            {/*        height="25"*/}
            {/*        source={require("@images/header/qrcode.svg")}*/}
            {/*    />*/}
            {/*</TouchableOpacity>*/}
            {
                showSearchPanel
                    ?
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        navigation.getParent().getParent().getParent().toggleDrawer()
                    }}>
                        <Svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M8.3125 19L2.375 14.25L8.3125 9.5V13.0625H23.75V15.4375H8.3125V19ZM15.4375 9.5V5.9375H0V3.5625H15.4375V0L21.375 4.75L15.4375 9.5Z" fill="black"/>
                        </Svg>
                    </TouchableOpacity>
                    :
                    <></>
            }
            <TouchableOpacity style={{...styles.btn, paddingRight: 15}} onPress={() => {
                //console.log('ok', navigation)
                LinkTo("MainPageScreen", {}, navigation)
            }}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M13.4748 17.9998H10.4805V23.9998H13.4748V17.9998Z" fill="black"/>
                    <Path d="M11.9773 0L0 12H2.26843L11.9773 2.27273L21.7316 12H24L11.9773 0Z" fill="black"/>
                    <Path d="M2.9939 13.5V22.5C2.9939 23.3182 3.67443 24 4.49106 24H8.98255V16.5H10.4797H13.474H14.9712V24H19.4627C20.2793 24 20.9599 23.3182 20.9599 22.5V13.5L11.9769 4.5L2.9939 13.5Z" fill="black"/>
                </Svg>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        //backgroundColor: "red"
    },
    wrap: {
        width: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 10
    }
})
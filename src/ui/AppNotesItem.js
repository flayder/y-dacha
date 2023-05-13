import React, {useState} from "react"
import {View, StyleSheet, Dimensions, TouchableOpacity} from "react-native"
import {useRoute} from "@react-navigation/native";
import {AppTextBold} from "./AppTextBold";
import {AppText} from "./AppText";
import {THEME} from "../../theme";
import {LinkTo} from "../../global";
import {Svg, Path} from "react-native-svg";
import AppFastImage from "./AppFastImage";

export default ({item, color, navigation, routeName, id}) => {
    const route = useRoute()
    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })
    return (
        <TouchableOpacity activeOpacity={1} onPress={() => {
            let paramInside = {
                ...route.params
            }
            paramInside[id] = item.id
            //console.log(routeName, paramInside, navigation)
            LinkTo(routeName, paramInside, navigation)
        }}>
            <View style={styles.pestWrap}>
                <View style={styles.pestImg}>
                    <AppFastImage
                        uri={item.photo}
                        style={{width: "100%", height: "100%"}}
                        resizeMode={"cover"}
                    />
                </View>
                <View style={{...styles.pestContent, width: screeWidth - 120}}>
                    <View style={styles.pestTitle}>
                        <AppTextBold style={{...styles.pestTitleText, color: color}}>
                            {item.name}
                        </AppTextBold>
                        <View style={styles.pestBtn}>
                            <Svg width="11" height="15" viewBox="0 0 6 10" fill="none" >
                                <Path
                                    d="M2.5046e-05 0.999996L1.00002 -9.33849e-07L6 4.99998L0.999996 10L1.8677e-07 9L4.00001 4.99999L2.5046e-05 0.999996Z"
                                    fill={color}
                                />
                            </Svg>

                        </View>
                    </View>
                    <View style={styles.pestText}>
                        <AppText style={styles.pestDescr}>
                            {item.description}
                        </AppText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    pestWrap: {
        flexDirection: "row",
        borderRadius: 8,
        height: 120,
        backgroundColor: THEME.SLIDER_BG,
        marginBottom: 20
    },
    pestImg: {
        width: 60,
        height: "100%"
    },
    pestContent: {
        paddingLeft: 10
    },
    pestTitle: {
        position: "relative",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 0,
        marginBottom: 0,
        height: 35,
        paddingRight: 40
    },
    pestTitleText: {
        marginTop: 0,
        marginBottom: 0,
        height: 27
    },
    pestText: {
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 5
    },
    pestDescr: {
        marginTop: 0,
        marginBottom: 0,
        height: 70
    },
    pestBtn: {
        position: "absolute",
        right: 0,
        top: 0,
        width: 30,
        height: 35,
        justifyContent: "center"
    }
})
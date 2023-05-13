import React, {useState} from "react"
import {View, StyleSheet, Dimensions} from "react-native"
import {useRoute} from "@react-navigation/native";
import {AppTextBold} from "./AppTextBold";
import AppButton from "./AppButton";
import {AppText} from "./AppText";
import {LinkTo, PESTS_STYLE} from "../../global";
import AppFastImage from "./AppFastImage";

export default ({item, color, navigation, routeName, id}) => {
    const route = useRoute()
    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })
    return (
        <View>
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
                        <AppButton style={styles.pestBtn}
                            color={color}
                            onPress={() => {
                                let paramInside = {
                                    ...route.params
                                }
                                paramInside[id] = item.id
                                //console.log(routeName, paramInside, navigation)
                                LinkTo(routeName, paramInside, navigation)
                            }}
                        >
                            <AppTextBold
                                style={{fontSize: 14, marginTop: 0, marginBottom: 0}}
                            >
                                Подробнее
                            </AppTextBold>
                        </AppButton>
                    </View>
                    <View style={styles.pestText}>
                        <AppText style={styles.pestDescr}>
                            {item.description}
                        </AppText>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    PESTS_STYLE
)
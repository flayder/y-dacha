import React, {useState} from "react"
import {StyleSheet, View, Image, TouchableOpacity} from "react-native"
import {AppText} from "../AppText";
import {AppTextBold} from "../AppTextBold";
import {getRandomKey} from "../../../global";
import AutoHeightImage from "react-native-auto-height-image";
import {THEME} from "../../../theme";

export default ({data, activeIs = false, onResult}) => {
    const [active, setActive] = useState(activeIs)
    return (
        <View style={styles.wrap}>
            {
                data.map(item => {
                    const activeStyle = active == item.id ? {backgroundColor: THEME.SLIDER_BG} : {}
                    return <TouchableOpacity
                        activeOpacity={1}
                        style={{...styles.item, ...activeStyle}}
                        key={getRandomKey()}
                        onPress={() => {
                            if(onResult) onResult(item.id)
                            setActive(item.id)
                        }}
                    >
                        <View style={styles.icon}>
                            <AutoHeightImage
                                width={20}
                                style={styles.img}
                                source={{uri: item.icon_path}}
                                //methodSize={"contain"}
                            />
                        </View>
                        {
                            active == item.id
                                ?
                                <AppTextBold style={styles.name}>
                                    {item.operation_name}
                                </AppTextBold>
                                :
                                <AppText style={styles.name}>
                                    {item.operation_name}
                                </AppText>
                        }
                    </TouchableOpacity>
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
        marginBottom: 2,
        paddingTop: 10,
        paddingBottom: 10
    },
    icon: {
        width: 50,
        paddingRight: 10,
        paddingLeft: 10
    },
    // img: {
    //     width: 30,
    //     height: 50
    // },
    name: {
        marginTop: 0,
        marginBottom: 0
    }
})
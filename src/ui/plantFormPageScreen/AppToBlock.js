import React, {useState} from "react"
import {StyleSheet, TouchableOpacity, View} from "react-native"
import {Svg, Path, Rect, Circle, Mask} from "react-native-svg";
import {AppTextBold} from "../AppTextBold";


export default ({editable = true, onResult}) => {
    const [locked, setLocked] = useState(editable)

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.wrap}
            onPress={() => {
                if(onResult) onResult(!locked)
                setLocked(!locked)
            }}
        >
            {
                (!locked)
                    ?
                    <View style={styles.locked}>
                        <Svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M16.6154 9.08654H13.5865V6.05769C13.5865 2.76923 10.9038 0 7.52885 0C5.88462 0 4.32692 0.692308 3.28846 1.73077L4.32692 2.76923C5.10577 1.99038 6.23077 1.47115 7.52885 1.47115C10.0385 1.47115 12.0288 3.46154 12.0288 5.97115V9H1.47115C0.605769 9 0 9.69231 0 10.4712V22.5C0 23.3654 0.692308 23.9712 1.47115 23.9712H16.5288C17.3942 23.9712 18 23.2788 18 22.5V10.4712C18 9.60577 17.3077 9 16.5288 9L16.6154 9.08654ZM10.5577 18.0865C10.5577 18.9519 9.86539 19.5577 9.08654 19.5577C8.22115 19.5577 7.61539 18.8654 7.61539 18.0865V15.0577C7.61539 14.1923 8.30769 13.5865 9.08654 13.5865C9.95192 13.5865 10.5577 14.2788 10.5577 15.0577V18.0865Z" fill="black"/>
                        </Svg>
                        <AppTextBold style={styles.lockedText}>
                            Разблокировать{"\n"}редактирование
                        </AppTextBold>
                    </View>
                    :
                    <View style={styles.locked}>
                        <Svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M16.5 9H15V6C15 2.66667 12.3333 0 9 0C5.66667 0 3 2.66667 3 6V9H1.5C0.666667 9 0 9.66667 0 10.5V22.5C0 23.3333 0.666667 24 1.5 24H16.5C17.3333 24 18 23.3333 18 22.5V10.5C18 9.66667 17.3333 9 16.5 9ZM10.5 18C10.5 18.8333 9.83333 19.5 9 19.5C8.16667 19.5 7.5 18.8333 7.5 18V15C7.5 14.1667 8.16667 13.5 9 13.5C9.83333 13.5 10.5 14.1667 10.5 15V18ZM13.5 9H4.5V6C4.5 3.5 6.5 1.5 9 1.5C11.5 1.5 13.5 3.5 13.5 6V9Z" fill="black"/>
                        </Svg>
                        <AppTextBold style={styles.lockedText}>
                            Заблокировать{"\n"}редактирование
                        </AppTextBold>
                    </View>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrap: {
        paddingTop: 20,
        paddingBottom: 20
    },
    locked: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    lockedText: {
        paddingLeft: 20,
        fontSize: 14
    }
})
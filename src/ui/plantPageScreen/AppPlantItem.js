import React, {useState} from "react"
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {AppTextBold} from "../AppTextBold";
import {AppTextItalic} from "../AppTextItalic";
import AppRatingVote from "../sortDetailPageScreen/AppRatingVote";
import {Svg, Path} from "react-native-svg";
import {AppText} from "../AppText";
import {LinkTo, SHADOW} from "../../../global";
import {THEME} from "../../../theme";
import AppFastImage from "../AppFastImage";

export default ({item, style, navigation, isActive = false, onResultActive}) => {
    const [active, setActive] = useState(isActive)
    //console.log('item', item)
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{...styles.wrap, ...style}}
            onLongPress={() => {
                if(onResultActive) onResultActive(!active)
                setActive(!active)
            }}
            onPress={() => {
                LinkTo("PlantEditListScreen", {plantId: item.plant_id}, navigation)
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
                <AppTextBold style={styles.name}>
                    {item.name}
                </AppTextBold>
                <AppTextItalic style={styles.mark}>
                    {item.mark}
                </AppTextItalic>
                <AppRatingVote
                    style={styles.vote}
                    starWidth={11}
                    starHeight={11}
                    initiate={item.rating}
                />
                <AppTextItalic style={styles.count}>
                   отзывов {item.comments}
                </AppTextItalic>
                <View
                    activeOpacity={1}
                    style={styles.btn}
                >
                    <Svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M16.8 0.125244H15.6V1.81272C15.6 2.75021 14.8 3.5002 13.8 3.5002C13.3333 3.5002 12.9333 3.34395 12.6 3.06271C12.2667 3.34395 11.8667 3.5002 11.4 3.5002C10.9333 3.5002 10.5333 3.34395 10.2 3.06271C9.86667 3.34395 9.46667 3.5002 9 3.5002C8.53333 3.5002 8.13333 3.34395 7.8 3.06271C7.46667 3.34395 7.06667 3.5002 6.6 3.5002C6.13333 3.5002 5.73333 3.34395 5.4 3.06271C5.06667 3.34395 4.66667 3.5002 4.2 3.5002C3.2 3.5002 2.4 2.75021 2.4 1.81272V0.125244H1.2C0.533333 0.125244 0 0.625238 0 1.25023V15.8751C0 16.5 0.533333 17 1.2 17H16.8C17.4667 17 18 16.5 18 15.8751V1.25023C18 0.625238 17.4667 0.125244 16.8 0.125244ZM14.4 13.6251H3.6V12.5001H14.4V13.6251ZM14.4 11.3751H3.6V10.2501H14.4V11.3751ZM14.4 9.12514H3.6V8.00015H14.4V9.12514ZM14.4 6.87516H3.6V5.75018H14.4V6.87516Z" fill="white"/>
                    </Svg>
                    <AppText style={styles.btnText}>
                        Анкета{"\n"}
                        растений
                    </AppText>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: THEME.FOOTER_BG,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 8
    },
    count: {
        textAlign: "center",
        marginBottom: 5,
        marginTop: 5,
        color: THEME.GREY_SMOKE
    },
    vote: {
        borderWidth: 1,
        borderColor: THEME.GREEN,
        padding: 7,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 0,
        borderRadius: 6,
    },
    btnText: {
        color: "#fff",
        paddingLeft: 10,
        fontSize: 11,
        marginTop: 0,
        marginBottom: 0
    },
    mark: {
        textAlign: "center",
        color: THEME.FOOTER_BG,
        fontSize: 14,
        marginTop: 0
    },
    name: {
        marginTop: 0,
        marginBottom: 5,
        height: 35,
        fontSize: 14,
        textAlign: "center",
        color: THEME.GREEN
    },
    body: {
        padding: 10
    },
    wrap: {
        width: "30%",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
        ...SHADOW,
        padding: 0,
        borderRadius: 8
    },
    image: {
        position: "relative",
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
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
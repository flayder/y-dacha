import React, {useState, useEffect} from "react"
import {View, StyleSheet, ImageBackground, TouchableOpacity, Platform} from "react-native"
import {Svg, Path, Mask, G, Rect, Circle} from "react-native-svg";
import * as DocumentPicker from "expo-document-picker";
import {AppText} from "../AppText";
import {THEME} from "../../../theme";
import * as ImagePicker from "expo-image-picker";
import {globalAlert} from "../../globalHeaders";

export default (
    {
        style,
        title,
        onChange,
        onDelete,
        outline = true,
        initiate = {}
    }) => {
    const [file, setFile] = useState(initiate)

    if(outline) {
        //console.log(file)
        if(file.hasOwnProperty('uri') && initiate.hasOwnProperty('uri')) {
            if(file.uri != initiate.uri) setFile(initiate)
        } else if(!file.hasOwnProperty('uri') && initiate.hasOwnProperty('uri'))
            setFile(initiate)
    }

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                // const { status: camera } = await Permissions.askAsync(Permissions.CAMERA);
                // const { status: cameraRoll } = await Permissions.askAsync(
                //     Permissions.CAMERA_ROLL
                // );
                // if (camera && cameraRoll !== "granted") {
                //     alert("camera roll not  granted");
                // }
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                //console.log('status', status)

                if (status !== 'granted') {
                    globalAlert({
                        title: "Вы не дали разрешение на загрузку фото"
                    })
                }
            }
        })();
    })

    const fileHandler = async () => {
        // const file = await DocumentPicker.getDocumentAsync({})
        // if(onChange) {
        //     file.new = true
        //     onChange(file)
        // }
        try {
            const file = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            //console.log('file', file)
            if(onChange) {
                file.new = true
                onChange(file)
            }
            setFile(file)
        } catch (e) {console.log('errorImg', e)}
    }

    const uri = (file.hasOwnProperty('uri')) ? {uri: file.uri} : {}

    const color = (file.hasOwnProperty('uri')) ? THEME.GREEN : THEME.GREY_TEXT

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{...styles.container, ...style}}
            onPress={fileHandler}
        >
            <ImageBackground
                style={styles.bg}
                resizeMode={"cover"}
                source={uri}
            >
                <View style={{...styles.edit}}>
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M14.7726 4.14372L14.5286 3.89977V3.89977L14.7726 4.14372ZM14.7726 3.0472L14.5286 3.29116V3.29116L14.7726 3.0472ZM13.3494 5.56685L13.1055 5.81081L13.3494 6.05476L13.5934 5.81081L13.3494 5.56685ZM10.4332 2.65059L10.1892 2.40664L9.94526 2.65059L10.1892 2.89454L10.4332 2.65059ZM11.8563 1.22746L12.1002 1.47141L12.1005 1.47113L11.8563 1.22746ZM12.9528 1.22746L12.7086 1.47113L12.7089 1.47141L12.9528 1.22746ZM1.11665 11.9671L0.872699 11.7231L0.872698 11.7231L1.11665 11.9671ZM9.60103 3.4827L9.84498 3.23874L9.60103 2.99479L9.35708 3.23874L9.60103 3.4827ZM12.5173 6.39896L12.7611 6.64302L13.0053 6.39907L12.7612 6.15501L12.5173 6.39896ZM4.02514 14.8833L3.7813 14.6393L3.77482 14.6457L3.7687 14.6525L4.02514 14.8833ZM15.0165 4.38767C15.4545 3.94965 15.4545 3.24127 15.0165 2.80325L14.5286 3.29116C14.6972 3.45972 14.6972 3.73121 14.5286 3.89977L15.0165 4.38767ZM13.5934 5.81081L15.0165 4.38767L14.5286 3.89977L13.1055 5.3229L13.5934 5.81081ZM10.1892 2.89454L13.1055 5.81081L13.5934 5.3229L10.6771 2.40664L10.1892 2.89454ZM11.6123 0.983505L10.1892 2.40664L10.6771 2.89454L12.1002 1.47141L11.6123 0.983505ZM12.4046 0.655C12.1072 0.655 11.8221 0.773291 11.6121 0.98378L12.1005 1.47113C12.1811 1.39038 12.2905 1.345 12.4046 1.345V0.655ZM13.197 0.98378C12.987 0.773291 12.7019 0.655 12.4046 0.655V1.345C12.5186 1.345 12.628 1.39038 12.7086 1.47113L13.197 0.98378ZM15.0165 2.80325L13.1968 0.983505L12.7089 1.47141L14.5286 3.29116L15.0165 2.80325ZM0.655 12.247V14.6112H1.345V12.247H0.655ZM0.872698 11.7231C0.73097 11.8649 0.655 12.0456 0.655 12.247H1.345C1.345 12.2346 1.34701 12.2295 1.34762 12.2281C1.34826 12.2265 1.35077 12.2209 1.3606 12.211L0.872698 11.7231ZM9.35708 3.23874L0.872699 11.7231L1.3606 12.211L9.84498 3.72665L9.35708 3.23874ZM12.7612 6.15501L9.84498 3.23874L9.35708 3.72665L12.2733 6.64291L12.7612 6.15501ZM4.26898 15.1274L12.7611 6.64302L12.2734 6.15489L3.7813 14.6393L4.26898 15.1274ZM3.75295 15.345C3.93934 15.345 4.13823 15.2734 4.28157 15.1141L3.7687 14.6525C3.77018 14.6509 3.77063 14.6513 3.76801 14.6524C3.76502 14.6536 3.75974 14.655 3.75295 14.655V15.345ZM1.38883 15.345H3.75295V14.655H1.38883V15.345ZM0.655 14.6112C0.655 15.0194 0.980549 15.345 1.38883 15.345V14.655C1.3725 14.655 1.36274 14.6493 1.35671 14.6433C1.35069 14.6372 1.345 14.6275 1.345 14.6112H0.655Z" fill="#6C6C6C"/>
                    </Svg>
                </View>
                <View style={styles.middleBlock}>
                    <View style={{...styles.camera, backgroundColor: color}}>
                        <Svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M9.77778 10.7778H12.4444L14.2222 9H19.5556L21.3333 10.7778H24C24.4715 10.7778 24.9237 10.9651 25.2571 11.2985C25.5905 11.6319 25.7778 12.0841 25.7778 12.5556V23.2222C25.7778 23.6937 25.5905 24.1459 25.2571 24.4793C24.9237 24.8127 24.4715 25 24 25H9.77778C9.30628 25 8.8541 24.8127 8.5207 24.4793C8.1873 24.1459 8 23.6937 8 23.2222V12.5556C8 12.0841 8.1873 11.6319 8.5207 11.2985C8.8541 10.9651 9.30628 10.7778 9.77778 10.7778ZM16.8889 13.4444C15.7101 13.4444 14.5797 13.9127 13.7462 14.7462C12.9127 15.5797 12.4444 16.7101 12.4444 17.8889C12.4444 19.0676 12.9127 20.1981 13.7462 21.0316C14.5797 21.8651 15.7101 22.3333 16.8889 22.3333C18.0676 22.3333 19.1981 21.8651 20.0316 21.0316C20.8651 20.1981 21.3333 19.0676 21.3333 17.8889C21.3333 16.7101 20.8651 15.5797 20.0316 14.7462C19.1981 13.9127 18.0676 13.4444 16.8889 13.4444ZM16.8889 15.2222C17.5961 15.2222 18.2744 15.5032 18.7745 16.0033C19.2746 16.5034 19.5556 17.1816 19.5556 17.8889C19.5556 18.5961 19.2746 19.2744 18.7745 19.7745C18.2744 20.2746 17.5961 20.5556 16.8889 20.5556C16.1816 20.5556 15.5034 20.2746 15.0033 19.7745C14.5032 19.2744 14.2222 18.5961 14.2222 17.8889C14.2222 17.1816 14.5032 16.5034 15.0033 16.0033C15.5034 15.5032 16.1816 15.2222 16.8889 15.2222Z" fill="white"/>
                        </Svg>
                    </View>
                    {
                        !file.hasOwnProperty('uri')
                            ?
                            <AppText style={{...styles.middleBlockText, color: color}}>
                                {title}
                            </AppText>
                            :
                            <></>
                    }
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    middleBlockText: {
        color: THEME.GREY_TEXT,
        marginBottom: 0
    },
    camera: {
        width: 40,
        height: 40,
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: THEME.GREY_TEXT,
        borderRadius: 20
    },
    container: {
    },
    edit: {
        position: "absolute",
        right: 30,
        top: 15
    },
    bg: {
        width: "100%",
        height: 170,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: 30,
        backgroundColor: THEME.SLIDER_BG
    }
})
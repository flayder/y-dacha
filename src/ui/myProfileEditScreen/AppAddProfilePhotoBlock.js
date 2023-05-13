import React, {useState, useEffect} from "react"
import {View, StyleSheet, ImageBackground, TouchableOpacity, Platform, Image} from "react-native"
import {Svg, Path, Mask, G, Rect, Circle} from "react-native-svg";
//import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';
import {AppText} from "../AppText";
import {THEME} from "../../../theme";
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

    useEffect(() => {
        (async () => {
            try {
                if (Platform.OS !== 'web') {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (status !== 'granted') {
                        globalAlert({
                            title: 'Sorry, we need camera roll permissions to make this work!'
                        })
                    }
                }
            } catch(e) {console.log(e)}
        })();
    }, []);

    if(outline) {
        //console.log(file)
        if(file.hasOwnProperty('uri') && initiate.hasOwnProperty('uri')) {
            if(file.uri != initiate.uri) setFile(initiate)
        } else if(!file.hasOwnProperty('uri') && initiate.hasOwnProperty('uri'))
            setFile(initiate)
    }

    const fileHandler = async () => {
        const file = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        //const file = await DocumentPicker.getDocumentAsync({})
        if(onChange) {
            file.new = true
            onChange(file)
        }
        setFile(file)
    }

    let uri = require("@images/myProfileEditScreen/upload.png")
    let size = 'stretch'
    if(file.hasOwnProperty('uri')) {
        uri = {
            uri: file.uri
        }
        size = "cover"
    }

    const color = (file.hasOwnProperty('uri')) ? THEME.GREEN : THEME.GREY_TEXT

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{...styles.container, ...style}}
            onPress={fileHandler}
        >
            <View
                style={styles.bg}
            >
                <View
                    style={styles.leftBlock}
                >
                    <Image
                        style={styles.leftBg}
                        source={uri}
                        resizeMode={size}
                    />
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
                </View>
                <View style={styles.rightBlock}>
                    <AppText style={styles.rightBlockText}>
                        Загрузите{"\n"}
                        фотографию{"\n"}
                        профиля
                    </AppText>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    middleBlock: {
        paddingTop: 15,
        paddingRight: 15
    },
    leftBg: {
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0
    },
    rightBlockText: {
        color: THEME.GREY_TEXT,
        textAlign: "center"
    },
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
    leftBlock: {
        position: "relative",
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        height: 250
    },
    rightBlock: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center"
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
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingTop: 30,
        paddingBottom: 30
    }
})
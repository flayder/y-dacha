import React, {useState, useEffect} from "react"
import {View, StyleSheet, Dimensions, Platform, ImageBackground, TouchableOpacity} from "react-native"
import {Svg, Path} from "react-native-svg";
import {THEME} from "../../../theme";
//import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';
//import * as Permissions from 'expo-permissions';
import {globalAlert} from "../../globalHeaders";

export default ({style, onChange, onDelete, initiate = {}}) => {
    const [file, setFile] = useState(initiate)
    //console.log('file', [file, initiate])

    const deleteHandler = () => {
        if(onDelete) onDelete(file)
        if(onChange) onChange({})
        setFile({})
    }

    if(
        onDelete &&
        typeof file == "object" && file.hasOwnProperty('uri') && file.uri &&
        typeof initiate == "object" && initiate.hasOwnProperty('uri') && initiate.uri &&
        file.uri != initiate.uri
    )
        onDelete(initiate)

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
    }, []);

    const fileHandler = async () => {
        try {
            const file = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            //console.log('file', file)
            if(onChange) {
                onChange(file)
            }
            setFile(file)
        } catch (e) {console.log('errorImg', e)}
    }

    let color = (!file.hasOwnProperty('uri')) ? THEME.GREY : THEME.ORANGE

    return (
        <TouchableOpacity activeOpacity={1} onPress={fileHandler}>
            <View style={{...styles.wrap, ...style}}>
                {
                    file.hasOwnProperty('uri')
                    ?
                        <ImageBackground
                            source={{uri: file.uri}}
                            style={styles.img}
                            resizeMode="cover"
                        />
                        :
                        <></>
                }
                <TouchableOpacity activeOpacity={1} style={{...styles.delWrap, backgroundColor: color}} onPress={deleteHandler}>
                    <View>
                        <Svg width="16" height="21" viewBox="0 0 16 21" fill="none" >
                            <Path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.49987 18.0911C1.49987 19.3161 2.50214 20.3184 3.72714 20.3184H12.6362C13.8612 20.3184 14.8635 19.3161 14.8635 18.0911V4.7275H1.49987V18.0911ZM15.9771 1.38659H12.0794L10.9658 0.272949H5.3976L4.28396 1.38659H0.38623V3.61386H15.9771V1.38659Z"
                                fill="white"
                            />
                        </Svg>
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    img: {
        width: "100%",
        height: "100%",
        borderRadius: 6
    },
    wrap: {
        position: "relative",
        backgroundColor: THEME.SLIDER_BG,
        width: 100,
        height: 100,
        borderRadius: 6,
        overflow: "hidden"
    },
    delWrap: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 30,
        height: 35,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        borderBottomRightRadius: 6
    }
})
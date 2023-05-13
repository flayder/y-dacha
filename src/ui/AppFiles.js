import React, {useState, useRef} from "react";
import {View, StyleSheet} from "react-native";
import AppButton from "./AppButton";
import {THEME} from "../../theme";
import AppFile from "./pestsAddPhotoPageScreen/AppFile";
import {AppTextBold} from "./AppTextBold";
import {getRandomKey} from "../../global";
import {AppText} from "./AppText";

export default (
    {
        onResult,
        onDelete,
        outline = false,
        fileData = [],
        countFiles = 3
    }) => {
    //console.log('countFiles', countFiles)
    //console.log('fileData', fileData)
    const [count, setCount] = useState(countFiles)
    const files = useRef([])
    const deleteFiles = useRef([])
    if(countFiles > count) setCount(countFiles)
    const generateFile = () => {
        const elements = []
        const filesArray = []
        for(let i = 0; i < count; i++) {
            const iter = i
            //console.log('fileData[iter]', fileData[iter], iter, count)
            if(fileData.length <= count) {
                if (fileData[iter] != undefined) {

                    filesArray.push(fileData[iter])
                } else {
                    //console.log('here', iter)
                    filesArray.push({})
                }
            }
        }

        files.current = filesArray

        try {
            for(let i = 0; i < count; i++) {
                const iter = i
                //console.log('fileData[iter]', files.current, iter)
                elements.push(
                    <AppFile
                        key={getRandomKey()}
                        initiate={files.current[iter]}
                        style={styles.file}
                        onDelete={file => {
                            if(!file.name)
                                deleteFiles.current.push(file)

                            if(onDelete) onDelete(deleteFiles.current)
                        }}
                        onChange={file => {
                            if(files.current[iter] != undefined)
                                files.current[iter] = file

                            if(files.current.length > count) files.current.splice(count, count * 2)

                            if(onResult) {
                                onResult(files)
                            }
                        }}
                    />
                )
            }
        } catch (e) {}

        return elements
    }

    return (
        <>
            <AppButton
                style={styles.photoBtn}
                color={THEME.FOOTER_BG}
                onPress={() => {
                    files.current.push({})
                    setCount(count + 3)
                    //console.log('akskdaoskd')
                }}
            >
                <View style={{alignItems: "center", justifyContent: "center", flexDirection: "row", }}>
                    <AppTextBold style={styles.photoBtnText}>
                        +
                    </AppTextBold>
                    <AppText style={styles.photoBtnTextAnother}>место под фото</AppText>
                </View>
            </AppButton>
            <View style={styles.fileBlock}>
                {generateFile()}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    photoBtnTextAnother: {
        fontSize: 14,
        marginTop: 0,
        marginBottom: 0,
        color: "#fff",
        paddingLeft: 10
    },
    file: {
        marginBottom: 20
    },
    fileBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        paddingBottom: 10
    },
    photoBtn: {
        //width: 60,
        borderRadius: 30,
        minWidth: 0,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    photoBtnText: {
        fontSize: 30,
        marginTop: -10,
        marginBottom: -10,
        color: "#fff"
    }
})
import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {AppTextItalic} from "../AppTextItalic";
import {AppText} from "../AppText";
import {THEME} from "../../../theme";
import {findABreak} from "../../../global";

export default ({description, style}) => {
    const [opened, setOpened] = useState(false)
    if(!description) description = ""
    const index = findABreak(description.substr(0, 350))
    return (
        <View style={{...styles.wrap, ...style}}>
            {
                opened || description.length <= 350
                    ?
                    <AppText style={styles.descr}>
                        {description}
                    </AppText>
                    :
                    <AppText style={{...styles.descr, paddingBottom: 20}}>
                        {description.substr(0, index) + ' ...'}
                    </AppText>
            }

            {
                description.length > 350
                    ?
                <TouchableOpacity activeOpacity={1} onPress={() => {
                    setOpened(!opened)
                }}>
                    {
                        opened
                            ?
                            <AppTextItalic style={styles.adding}>
                                Свернуть описание
                            </AppTextItalic>
                            :
                            <AppTextItalic style={styles.adding}>
                                Развернутое описание
                            </AppTextItalic>
                    }
                </TouchableOpacity>
                    :
                    <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        paddingLeft: 20,
        paddingRight: 20
    },
    adding: {
        width: "100%",
        color: THEME.BLUE,
        textAlign: "center"
    }
})
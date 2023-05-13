import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import SWGImage from "expo-svg-uri";
import {AppTextItalic} from "../../ui/AppTextItalic";
import {THEME} from "../../../theme";
import CheckboxWithLabelFilter from "../../ui/CheckboxWithLabelFilter";
import * as Random from "expo-random";
import {getRandomKey} from "../../../global";

export default ({label, id, elements = [], checked, onChange, condition = true}) => {
    const [data, setData] = useState([])
    const [opened, setOpened] = useState(condition)

    const checkBoxHandler = res => {
        //console.log('checkBoxHandler', res)
        if(res.result)
            addHandler(res.id)
        else
            remHandler(res.id)
    }

    const addHandler = currentId => {
        const arr = data
        arr.push(currentId)

        if(onChange) {
            onChange({
                id,
                data: arr
            })
        }

        setData(arr)
    }

    const remHandler = currentId => {
        const arr = data
        const index = arr.indexOf(currentId)

        if (index > -1) {
            arr.splice(index, 1)
        }

        if(onChange) {
            onChange({
                id,
                data: arr
            })
        }

        setData(arr)
    }

    const getCheckedItem = (id) => {
        let $id = false
        if(checked !== undefined && checked.length > 0) {
            checked.map(item => {
                if(item.hasOwnProperty('data')) {
                    $id = item.data.filter(it => it == id)
                }
            })
        }
        if($id && $id.length > 0) return true

        return false
    }

    return (
        <View style={styles.filterWrapper}>
            <TouchableOpacity activeOpacity={1} onPress={() => {
                setOpened(!opened)
            }}>
                <View style={styles.filterHeader}>
                    <AppTextItalic style={styles.filterTitle}>
                        {label}
                    </AppTextItalic>
                    <View style={styles.iconWrapper}>
                    {
                        opened
                            ?
                            <SWGImage style={styles.filterIcon} source={require("@images/filter/arrowDown.svg")} />
                            :
                            <SWGImage style={styles.filterIcon} source={require("@images/filter/arrowUp.svg")} />
                    }
                    </View>
                </View>
            </TouchableOpacity>
            {
                opened && elements.length > 0
                    ?
                    <View style={styles.filterBody}>
                        {
                            elements.map(item => {
                                return <CheckboxWithLabelFilter
                                    key={getRandomKey()}
                                    id={item.id}
                                    onChange={checkBoxHandler}
                                    label={item.name}
                                    conditionInit={getCheckedItem(item.id)}
                                />
                            })
                        }
                    </View>
                    :
                    <></>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    filterWrapper: {
        width: "100%",
        paddingBottom: 20
    },
    filterHeader: {
        width: "100%",
        backgroundColor: THEME.BLUE,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        paddingRight: 30,
    },
    iconWrapper: {
        position: "absolute",
        top: 10,
        right: 10,
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    filterIcon: {

    },
    filterTitle: {
        color: "#fff",
        fontSize: 17
    },
    filterBody: {
        padding: 5
    },
    filterLine: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 5,
        paddingBottom: 5
    }
})
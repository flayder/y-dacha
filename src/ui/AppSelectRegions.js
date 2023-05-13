import React, {useState, useEffect} from "react"
import {StyleSheet} from "react-native"
import {SHADOW} from "../../global";
import AppSelectModified from "./AppSelectModified";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {AppFetch} from "../AppFetch";

export default (
    {
        style,
        title = "",
        fullRegions = true,
        dataRegions = [],
        borderColor,
        color,
        onResult,
        defaultIs,
        preText = "",
        showDefaultTitle = false,
        backgroundColor = "#fff"
    }) => {
    const [regions, setRegions] = useState([])
    const init = true
    const navigation = useNavigation()
    const location = useSelector(state => state.others.location)

    const parseRegions = (reg) => {
        const data = []

        if(Array.isArray(reg)) {
            reg.map(item => {
                if(item.hasOwnProperty('name_with_type') && item.hasOwnProperty('id'))
                    data.push({
                        name: item.name_with_type,
                        value: item.id
                    })
            })
        }

        //console.log('data', data)

        return data
    }

    const setDefaultValue = () => {
        let title = title

        if(!defaultIs && location.hasOwnProperty('id')) defaultIs = location.id

        if(defaultIs) {
            regions.map(item => {
                if(item.hasOwnProperty('name') && item.hasOwnProperty('value')) {
                    if(item.value == defaultIs) {
                        title = item.name
                    }
                }
            })
        }


        return title
    }

    useEffect(() => {
        if(fullRegions) {
            AppFetch.getWithToken("getFullRegions", {}, {}, navigation).then(response => {
                if(response.result) setRegions(parseRegions(response.data))
            })
        }
        //console.log('ssssss', dataRegions)
    }, [init])

    //console.log('regions', regions)

    useEffect(() => {
        if(!fullRegions) {
            setRegions(parseRegions(dataRegions))
        }
        //console.log('dataRegions', dataRegions)
    }, [dataRegions.length])

    return (
        <AppSelectModified
            data={regions}
            title={setDefaultValue() !== undefined ? setDefaultValue() : title}
            preText={preText}
            showDefaultTitle={showDefaultTitle}
            style={{
                position: "relative",
                zIndex: 99,
                ...style
            }}
            force={true}
            borderColor={borderColor}
            headerBg={backgroundColor}
            color={color}
            borderRadius={0}
            cancelDefaultAutoNaming={true}
            initValue={defaultIs}
            onResult={res => {
                if (onResult) onResult(res)
            }}
        />
    )
}

const styles = StyleSheet.create({
    wrap: {
        width: "100%",
        position: "relative",
        zIndex: 9,
    },
    textSelectWrap: {
        paddingBottom: 10,
        ...SHADOW
    },
    selectLineText: {
        paddingLeft: 20,
        paddingRight: 20,
        color: "#fff",
        marginTop: 10,
        marginBottom: 10
    },
    selectTextWrap: {
        flexDirection: "row"
    },
    textSelect: {
        paddingLeft: 5,
        paddingRight: 5,
        color: "#fff",
        marginTop: 10,
        marginBottom: 10
    },
    header: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})
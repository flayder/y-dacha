import React, {useState, useEffect} from "react"
import {StyleSheet, View} from "react-native"
import {TouchableOpacity} from "react-native-gesture-handler"
import {useSelector} from "react-redux";
import SWGImage from "expo-svg-uri"
import {THEME} from "../../../theme";
import {getRandomKey, getSortType, isOrientation, KLUMBA, LinkTo, OGOROD, SAD} from "../../../global";
import {AppText} from "../AppText";
import AppTextInput from "../AppTextInput";
import {AppFetch} from "../../AppFetch";

export default ({style, onPress, onChange, navigation}) => {
    //const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    //Dimensions.addEventListener('change', () => {
    //    let width = Dimensions.get('screen').width
    //    setScreenWidth(width)
    //})

    const [borderColor, setBorderColor] = useState("transparent")
    const [text, setText] = useState("")
    const [data, setData] = useState([])
    const type = useSelector(state => state.search.parameter)
    let styleWrite = {}
    useEffect(() => {
        if(text.length > 2)
            AppFetch.getWithToken("search", {
                type,
                q: text
            }).then(result => {
                setData(result.data)
            })
        else
            setData([])
    }, [text])


    if(data.length > 0) {
        styleWrite = {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderWidth: 2,
            borderColor: THEME.GREY,
            backgroundColor: "white",
            borderBottomColor: "transparent"
        }
    }

    const onFocus = () => {
        if(data.length === 0)
            setBorderColor(THEME.HEADER_BORDER)
    }
    const onBlur = () => {
        if(data.length === 0)
            setBorderColor("transparent")
    }

    const screenPosition = isOrientation()
    let minus = 150
    //if(screenPosition !== "portrait") minus = screeWidth * .28

    const FormatLabel = ({label, value}) => {
        if (!value) {
            return label;
        }
        return (<>
            { label.split(new RegExp(value, "gi"))
                .reduce((prev, current, i) => {
                    if (!i) {
                        return [current];
                    }
                    return prev.concat(<AppText key={value + current} style={{...styles.text, ...styles.textFound}}>{ value }</AppText>, current);
                }, [])
            }
        </>)
    }

    const searchHandler = (item) => {
        switch(item.cat) {
           case SAD || OGOROD || KLUMBA:
               LinkTo("SortDetailPageScreen", {
                  type: getSortType(item.section_id),
                  sortId: item.id,
                   cultureId: item.culture_id
               }, navigation)
        }
    }

    const ResultList = () => {
        if(data.length > 0) {
            return (
                <View style={styles.wrapList}>
                    {data.map(item => {
                        return (
                            <View
                                style={styles.item}
                                key={getRandomKey()}
                                activeOpacity={1}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        searchHandler(item)
                                    }}
                                >
                                    <AppText style={styles.text}>
                                        <FormatLabel label={item.name} value={text} />
                                    </AppText>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            )
        } else return <></>
    }

    return (
        <View style={{...styles.wrap}}>
            <AppTextInput
                style={{...styles.input, borderColor: borderColor, ...styleWrite}}
                onFocus={onFocus}
                onBlur={onBlur}
                onPressText={text => {
                    setText(text)
            }} placeholder="Поиск" />
            <View style={styles.btn}>
                <SWGImage
                    width="22"
                    height="22"
                    source={require('@images/header/loop.svg')}
                />
            </View>
            <ResultList />
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        width: "100%",
        position: "relative",
        marginLeft: -10,
        zIndex: 999999999,
        paddingRight: 10
    },
    input: {
        borderStyle: "solid",
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#F2F2F2",
        borderRadius: 18,
        paddingRight: 50,
        height: 56,
        fontSize: 16
    },
    btn: {
        position: "absolute",
        right: 25,
        top: 17
    },
    wrapList: {
        position: "absolute",
        left: 0,
        top: "100%",
        width: "100%",
        backgroundColor: "white",
        padding: 10,
        borderWidth: 2,
        zIndex: 9999999999,
        borderColor: THEME.GREY,
        borderTopWidth: 1,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14
    },
    text: {
        marginTop: 5,
        marginBottom: 5,
        width: "auto",
        color: THEME.GREY
    },
    textFound: {
        color: THEME.GREY_TEXT
    }
})
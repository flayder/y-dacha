import React, {useState, useEffect, useLayoutEffect} from "react"
import {StyleSheet, View} from "react-native"
import {TouchableOpacity} from "react-native-gesture-handler"
import {useSelector} from "react-redux";
import {Svg, Path} from "react-native-svg";
import {THEME} from "../../../theme";
import {getColorType, getRandomKey, getSortType, isOrientation, KLUMBA, LinkTo, OGOROD, SAD} from "../../../global";
import {AppText} from "../AppText";
import AppTextInput from "../AppTextInput";
import {AppFetch} from "../../AppFetch";
import {AppTextBold} from "../AppTextBold";

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

    const initiate = () => {
        if(text.length > 2)
            AppFetch.getWithToken("search", {
                type,
                q: text
            }, {}, navigation).then(result => {
                setData(result.data)
            })
        else
            setData([])
    }

    let styleWrite = {}
    useEffect(() => {
        initiate()
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
        setData([])
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
        //console.log('item', item)
        switch(item.cat) {
            // case SAD || OGOROD || KLUMBA:
            //
            // break
            case "comfort":
                LinkTo("MasterContactPageScreen", {
                    masterId: item.id,
                }, navigation)
            break
            case "chemical":
                LinkTo("ChemicalDetailPageScreen", {
                    chemicalId: item.id,
                }, navigation)
            break
            case "event":
                LinkTo("EventDetailPageScreen", {
                    eventId: item.id,
                }, navigation)
            break
            case "disease":
                LinkTo("DiseaseDetailPageScreen", {
                    diseaseId: item.id,
                }, navigation)
            break
            case "pest":
                LinkTo("PestDetailPageScreen", {
                    pestId: item.id,
                }, navigation)
            break
            case "culture":
                LinkTo("SortPageScreen", {
                    cultureId: item.id,
                }, navigation)
                break
            default:
                LinkTo("SortDetailPageScreen", {
                    type: getSortType(item.section_id),
                    sortId: item.id,
                    cultureId: item.culture_id
                }, navigation)
        }
    }

    const setTitle = (item) => {

        switch(item.cat) {
            case "comfort":
                return <AppTextBold style={{...styles.predict, color: THEME.COMFORT_COLOR}}>Мастер: </AppTextBold>
            case "chemical":
                return <AppTextBold style={{...styles.predict, color: THEME.CHEMICAL_COLOR}}>Химикат: </AppTextBold>
            case "event":
                return <AppTextBold style={{...styles.predict, color: THEME.EVENT_COLOR}}>Событие: </AppTextBold>
            case "disease":
                return <AppTextBold style={{...styles.predict, color: getColorType(getSortType(item.section_id))}}>Болезнь: </AppTextBold>
            case "pest":
                return <AppTextBold style={{...styles.predict, color: getColorType(getSortType(item.section_id))}}>Вредитель: </AppTextBold>
            case "culture":
                return <AppTextBold style={{...styles.predict, color: getColorType(getSortType(item.section_id))}}>Культура: </AppTextBold>
            default:
                return <AppTextBold style={{...styles.predict, color: getColorType(getSortType(item.section_id))}}>Сорт: </AppTextBold>
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
                                    onPressIn={() => {
                                        searchHandler(item)
                                    }}
                                >
                                    <AppText style={{...styles.text, ...styles.textFormat}}>
                                        {setTitle(item)}
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
                }}
                placeholder="Поиск"
                value={text}
            />
            <View style={styles.btn}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        initiate()
                    }}
                >
                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M16.4663 18.0011L10.2718 11.8055C7.51612 13.7646 3.71895 13.2854 1.53644 10.7031C-0.646075 8.12076 -0.485819 4.29683 1.9051 1.90619C4.29539 -0.485506 8.1197 -0.646455 10.7025 1.53594C13.2853 3.71834 13.7648 7.51588 11.8055 10.2718L18 16.4674L16.4674 18L16.4663 18.0011ZM6.50302 2.16848C4.44762 2.16802 2.67434 3.61082 2.2568 5.62337C1.83926 7.63592 2.89223 9.66507 4.77818 10.4823C6.66414 11.2995 8.86474 10.6802 10.0477 8.99931C11.2306 7.31842 11.0707 5.03793 9.66477 3.53855L10.3205 4.18889L9.58131 3.45183L9.56831 3.43883C8.75732 2.62284 7.65347 2.16538 6.50302 2.16848Z" fill="#BDBDBD"/>
                    </Svg>
                </TouchableOpacity>
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
        zIndex: 9
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
        right: 15,
        top: 19
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
import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity, ScrollView} from "react-native"
import {useSelector, useDispatch} from "react-redux";
import {AppText} from "../AppText";
import {Svg, Path} from "react-native-svg"
import {SORTBYNAME, SORTBYPOPULAR, SORTBYREYT, getRandomKey, SORTBYAVAILABLE} from "../../../global";
import {THEME} from "../../../theme";
import {setSortsSorting} from "../../store/actions/sorts";
import {AppTextBold} from "../AppTextBold";

export default () => {
    const color = THEME.YELLOW
    const sort = useSelector(state => state.sorts.sort)
    const order = useSelector(state => state.sorts.order)
    const dispatch = useDispatch()
    //console.log('sort', sort)
    //console.log('order', order)
    //console.log('im', useSelector(state => state.sorts.itemsList))
    const data = [
        {
            label: "По алфавиту",
            sort: SORTBYNAME,
            order: true
        },
        {
            label: "По рейтингу",
            sort: SORTBYREYT,
            order: true
        },
        {
            label: "По наличию",
            sort: SORTBYAVAILABLE,
            order: true
        }
    ]

    return (
        <ScrollView
            horizontal={true}
            style={styles.sort}
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.sortWrap}>
                {
                    data.map(item => {
                        const isSortActive = sort === item.sort
                        //console.log(item.sort, isSortActive && !order)
                        return <View
                            style={styles.sortBlock}
                            key={getRandomKey()}
                        >
                            <TouchableOpacity style={styles.sortBtn} activeOpacity={1} onPress={() => {
                                dispatch(setSortsSorting(item.sort, !order))
                            }}>
                                {
                                    !isSortActive
                                    ?
                                        <AppText style={styles.text}>
                                            {item.label}
                                        </AppText>
                                        :
                                        <AppTextBold style={styles.text}>
                                            {item.label}
                                        </AppTextBold>
                                }

                                <Svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    style={styles.icon}
                                    fill="none"
                                >
                                    <Path
                                        fill={(isSortActive && order) ? color : "#fff"}
                                        d="M9 5.99998L10 4.99998L5.00002 0L0 5L0.999997 6L5.00001 1.99999L9 5.99998Z"
                                    />
                                </Svg>
                                <Svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 7"
                                    style={styles.icon}
                                    fill="none"
                                >
                                    <Path
                                        fill={(isSortActive && !order) ? color : "#fff"}
                                        d="M9 0.48537L10 1.48537L5.00002 6.48535L0 1.48534L0.999997 0.485347L5.00001 4.48536L9 0.48537Z"
                                    />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    })
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    sort: {
        padding: 20,
        paddingTop: 30,
        paddingBottom: 30,
        marginTop: -15,
        marginBottom: -15,
        position: "relative",
        zIndex: 99
    },
    sortWrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: THEME.FOOTER_BG,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20
    },
    sortBlock: {
       paddingLeft: 10,
       paddingRight: 10
    },
    sortBtn: {
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        marginLeft: 5,
        marginRight: 5
    },
    text: {
        marginTop: 0,
        marginBottom: 0,
        color: "#fff"
    }
})
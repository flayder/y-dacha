import React, {useRef, useEffect, useMemo} from "react"
import {StyleSheet, TouchableOpacity, View, Image} from "react-native"
import {AppWrap} from "../../ui/AppWrap";
import AppFilterBlock from "../../ui/filter/AppFilterBlock";
import {useDispatch, useSelector} from "react-redux";
import * as Random from "expo-random";
import SWGImage from "expo-svg-uri";
import {AppTextBold} from "../../ui/AppTextBold";
import {AppBlueButton} from "../../ui/AppBlueButton";
import {setFilterData} from "../../store/actions/filter";
import {setChemicalsPagination} from "../../store/actions/chemicals";
import {setPestsPagination} from "../../store/actions/pests";
import {setSortsPagination} from "../../store/actions/sorts";
import {setCulturesPagination} from "../../store/actions/cultures";
import {setDiseasesPagination} from "../../store/actions/diseases";
import {setMastersPagination} from "../../store/actions/masters";
import {setNotesPagination} from "../../store/actions/notes";
import {setShopsPagination} from "../../store/actions/shops";

export default ({navigation}) => {
    const data = useRef([])
    const filter = useSelector(state => state.filter)
    const items = filter.items
    const checked = filter.filter
    const onFilterHandler = result => {
        addRemoveHandler(result)
    }
    //console.log('cach')
    //console.log('items', items)
    const addRemoveHandler = result => {
        const arr = data.current

        let found = false
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].id == result.id) {
                //console.log('here')
                arr[i] = result
                found = true
            }
        }

        if(!found)
            arr.push(result)

        const res = []

        for(let i = 0; i < arr.length; i++) {
            if(arr[i].data.length > 0) {
                res.push(arr[i])
            }
        }
        //console.log('res', res)
        data.current = res
    }
    const dispatch = useDispatch()

    const applyFilter = () => {
        //console.log('data', data.current)
        //reset all pagination before applying a filter
        dispatch(setShopsPagination(1))
        dispatch(setChemicalsPagination(1))
        dispatch(setPestsPagination(1))
        dispatch(setSortsPagination(1))
        dispatch(setCulturesPagination(1))
        dispatch(setDiseasesPagination(1))
        dispatch(setMastersPagination(1))
        dispatch(setNotesPagination(1))


        dispatch(setFilterData(data.current))
        navigation.toggleDrawer()
    }

    const getCheckedItem = (id) => {
        let here = []
        if(checked !== undefined && checked.length > 0) {
            here = checked.filter(it => it.id == id)
            if(!here) here = []
        }

        return here
    }

    if(items.length > 0) {
        return (
            <View style={styles.fillWrap}>
                <AppWrap scroll={styles.mainWrap}>
                    <TouchableOpacity style={styles.close} onPress={() => {
                        navigation.toggleDrawer()
                    }}>
                        <SWGImage source={require("@images/leftMenu/close.svg")} />
                    </TouchableOpacity>
                    <AppTextBold style={styles.title}>
                        Выбор по параметрам:
                    </AppTextBold>
                    {
                        items.map(item => {
                            return <AppFilterBlock
                                key={Random.getRandomBytes(item.id)}
                                id={item.id}
                                label={item.name}
                                elements={item.attributes}
                                checked={getCheckedItem(item.id)}
                                onChange={onFilterHandler}
                            />
                        })
                    }

                    <AppBlueButton style={styles.btn} onPress={applyFilter}>
                        Применить
                    </AppBlueButton>
                    <View style={{marginTop: 70}}></View>
                </AppWrap>
            </View>
        )
    } else return <></>
}

const styles = StyleSheet.create({
    fillWrap: {
        position: "relative",
        width: "100%",
        height: "100%"
    },
    mainWrap: {
        paddingTop: 40,
        paddingBottom: 20,
        marginBottom: 0
    },
    close: {
        position: "absolute",
        right: 0,
        top: 17,
        zIndex: 9999
    },
    title: {
        width: "100%",
        paddingRight: 30
    },
})
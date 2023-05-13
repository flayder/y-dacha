import React, {useEffect} from "react"
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {loadMainSorts} from "../../store/actions/sorts";
import AppSortsSliderWrapper from "./AppSortsSliderWrapper";
import {THEME} from "../../../theme";
import {KLUMBA, LinkTo, OGOROD, SAD} from "../../../global";

export default () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const globalRoute = useSelector(state => state.others.currentRoute)
    const data = useSelector(state => state.sorts)
    const init = true

    useEffect(() => {
        //if(
        //    data.mainOgorod.length == 0 ||
        //    data.mainKlumba.length == 0 ||
        //    data.mainKlumba.length == 0
        //)
            dispatch(loadMainSorts({navigation}))
    }, [globalRoute])

    return (
        <>
            <AppSortsSliderWrapper
                data={data.mainSad}
                title='Популярные сорта раздела "Сад"'
                middleText={"Сорт"}
                color={THEME.GREEN}
                onPress={() => {
                    LinkTo('CulturesPageScreen', {
                        type: SAD
                    }, navigation)
                }}

            />
            <AppSortsSliderWrapper
                data={data.mainOgorod}
                title='Популярные сорта раздела "Огород"'
                middleText={"Сорт"} color={THEME.ORANGE}
                onPress={() => {
                    LinkTo('CulturesPageScreen', {
                        type: OGOROD
                    }, navigation)
                }}
            />
            <AppSortsSliderWrapper
                data={data.mainKlumba}
                title='Популярные сорта раздела "Клумба"'
                middleText={"Сорт"}
                color={THEME.PURPLE}
                onPress={() => {
                    LinkTo('CulturesPageScreen', {
                        type: KLUMBA
                    }, navigation)
                }}
            />
        </>
    )
}
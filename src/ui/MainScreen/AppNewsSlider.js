import React, {useEffect, useState} from "react"
import {View, StyleSheet, SafeAreaView, Dimensions} from "react-native"
import Carousel from 'react-native-snap-carousel';
import {useDispatch, useSelector} from "react-redux";
import {loadMainNews} from "../../store/actions/news";
import AppNew from "../AppNew";

export default ({navigation}) => {
    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    const globalRoute = useSelector(state => state.others.currentRoute)
    const data = useSelector(state => state.news.mainNews)
    const minus = screeWidth * .3
    const init = true
    const dispatch = useDispatch()

    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    useEffect(() => {
        //if(data.length == 0)
            dispatch(loadMainNews({navigation}))
    }, [globalRoute])

    const _renderItem = ({item}) => {
        //console.log('item', item)
        return <AppNew item={item} imgWidth={screeWidth - minus} navigation={navigation} />
    }
    if(data.length > 0) {
        return (
            <SafeAreaView style={{...styles.area}}>
                <View style={{...styles.wrap}}>
                    <Carousel
                        data={data}
                        layout={"default"}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={1}
                        sliderWidth={screeWidth}
                        itemWidth={screeWidth - minus}
                        loop={true}
                        renderItem={_renderItem}
                    />
                </View>
            </SafeAreaView>
        )
    } else
        return <></>
}

const styles = StyleSheet.create({
    wrap: {
        //paddingTop: 30,
        //paddingBottom: 30,
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center'
    },
    area: {
        width: "100%",
        minHeight: 300
    }
})
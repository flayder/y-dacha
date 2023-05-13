import React, {useState, useEffect, useRef} from "react"
import {View, StyleSheet, Dimensions, SafeAreaView} from "react-native"
import Carousel from 'react-native-snap-carousel';
import {useDispatch, useSelector} from "react-redux";
import {THEME} from "../../../theme";
import {loadMainEvents} from "../../store/actions/events";
import AppEventSliderElement from "../sliderElements/AppEventSliderElement";
export default ({navigation}) => {
    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    const data = useSelector(state => state.events.mainEvents)
    const globalRoute = useSelector(state => state.others.currentRoute)
    const init = true
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })
    const dispatch = useDispatch()

    useEffect(() => {
        //if(data.length == 0)
            dispatch(loadMainEvents({navigation}))
    }, [globalRoute])

    const minus = screeWidth * .1

    const _renderItem = ({item}) => {
        const item1 = item[0]
        const item2 = item.length > 1 ? item[1] : false
        //console.log('item2', item2)
        return (
            <>
                <View style={styles.slide}>
                    <AppEventSliderElement item={item1} navigation={navigation} />
                </View>
                {
                    item2
                        ?
                        <View style={styles.slide}>
                            <AppEventSliderElement item={item2} navigation={navigation} />
                        </View>
                        :
                    <></>
                }
            </>
        )
    }

    if(data.length > 0) {
        return (
            <SafeAreaView style={{...styles.area}}>
                <View style={{...styles.wrap}}>
                    <Carousel
                        data={data}
                        //layout={"default"}
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
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: THEME.SLIDER_BG,
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center'
    },
    slide: {
        position: "relative",
        height: 110,
        marginBottom: 20
    }
})
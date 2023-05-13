import React, {useState, useEffect} from "react"
import {View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, ImageBackground} from "react-native"
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import Carousel from 'react-native-snap-carousel';
import {loadMainShops} from "../../store/actions/shops";
import {AppTextBold} from "../AppTextBold";
import {LinkTo} from "../../../global";
import AppFastImage from "../AppFastImage";
import AppTextBoldTicker from "../AppTextBoldTicker";

export default () => {
    const navigation = useNavigation()

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    const globalRoute = useSelector(state => state.others.currentRoute)
    const data = useSelector(state => state.shops.mainShops)
    const dispatch = useDispatch()
    const init = true

    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    useEffect(() => {
        //if(data.length == 0)
            dispatch(loadMainShops({navigation}))
    }, [globalRoute])

    const _renderItem = ({item}) => {
        //console.log('shops', item)
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.btnWrap}
                onPress={() => {
                    LinkTo("ShopDetailPageScreen", {
                        masterId: item.id
                    }, navigation)
                }}
            >
                <View style={styles.item}>
                    <View style={styles.imgWrap}>
                        <AppFastImage
                            style={styles.img}
                            uri={item.emblem}
                        />
                    </View>
                    <AppTextBoldTicker style={styles.text}>{item.name}</AppTextBoldTicker>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{...styles.area, width: screeWidth}}>
            <View style={{...styles.wrap, width: screeWidth}}>
                <Carousel
                    data={data}
                    layout={"default"}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                    sliderWidth={screeWidth}
                    itemWidth={screeWidth / 3.5}
                    loop={true}
                    renderItem={_renderItem}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center',
    },
    slider: {
        width: "100%",
        height: 50
    },
    item: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 4,
        shadowColor: "#000",
        shadowOpacity: .2,
        shadowOffset: {
            width: 5,
            height: 3
        },
        elevation: 3,
        padding: 5,
        height: 120,
        //padding: 20,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: "white",
        overflow: "hidden"
    },
    img: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        overflow: "hidden"
    },
    btnWrap: {
        width: "100%",
        paddingBottom: 10
    },
    imgWrap: {
        width: "100%",
        height: 100,
        marginBottom: 10,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        overflow: "hidden"
    },
    text: {
        textAlign: "center",
        height: 30,
        fontSize: 13,
        marginTop: 0,
        marginBottom: 0,
        paddingBottom: 15
    }
})
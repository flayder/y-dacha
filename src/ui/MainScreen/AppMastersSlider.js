import React, {useState, useEffect} from "react"
import {View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity} from "react-native"
import {useNavigation} from "@react-navigation/native";
import {AppText} from "../AppText";
import Carousel from 'react-native-snap-carousel';
import {useDispatch, useSelector} from "react-redux";
import {AppTextBold} from "../AppTextBold";
import {loadMainMasters} from "../../store/actions/masters";
import {THEME} from "../../../theme";
import {LinkTo} from "../../../global";
//import FastImage from "react-native-fast-image";
import AppFastImage from "../AppFastImage";
//import AutoHeightImage from 'react-native-auto-height-image'
//<AutoHeightImage animated={true} style={styles.img} width={screeWidth - minus} source={{uri: item.main_photo}} />

export default () => {
    const navigation = useNavigation()

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    const globalRoute = useSelector(state => state.others.currentRoute)
    const data = useSelector(state => state.masters.mainMasters)
    const dispatch = useDispatch()
    const minus = screeWidth * .3

    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    useEffect(() => {
        //if(data.length == 0)
            dispatch(loadMainMasters({navigation}))
    }, [globalRoute])

    const _renderItem = ({item}) => {
        //console.log('item', item)
        return (
            <TouchableOpacity
                style={styles.btnWrap}
                activeOpacity={1}
                onPress={() => {
                    LinkTo("MasterDetailPageScreen", {
                        masterId: item.user_id
                    }, navigation)
                }}
            >
                <View style={styles.item}>
                    <View style={styles.imgWrap}>
                        <AppFastImage
                            uri={item.photo}
                            style={styles.photo}
                        />
                        <View style={styles.nameWrap}>
                            <AppTextBold style={styles.name}>
                                {item.name}
                            </AppTextBold>
                            <AppText style={styles.descr}>
                                {item.descr}
                            </AppText>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    if(data.length > 0) {
        return (
            <SafeAreaView style={{...styles.area}}>
                <View style={{...styles.wrap}}>
                    <Carousel
                        data={data}
                        //layout={"default"}
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
    nameWrap: {
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    name: {
        fontSize: 16,
        height: 25,
        marginTop: 0,
        marginBottom: 0
    },
    descr: {
        marginTop: 0,
        marginBottom: 0,
        fontSize: 12,
        color: THEME.GREY_TEXT,
        height: 30
    },
    slider: {
        width: "100%",
        height: 400
    },
    item: {
        marginRight: 15,
        borderWidth: 1,
        borderColor: THEME.GREY,
        borderRadius: 6,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 10,
        shadowOpacity: .1,
        elevation: 5,
        backgroundColor: "white",
    },
    imgWrap: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        overflow: "hidden",
        borderRadius: 6
    },
    photo: {
        width: "100%",
        height: 110
    },
    btnWrap: {
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: "white",
        borderRadius: 6
    }
})
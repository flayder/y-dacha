import React, {useState} from "react"
import {Dimensions, SafeAreaView, StyleSheet, View} from "react-native";
import {AppTextBold} from "../AppTextBold";
import {AppText} from "../AppText";
import {AppMoreLink} from "../AppMoreLink";
import Carousel from "react-native-snap-carousel";
import {THEME} from "../../../theme";
import { useNavigation } from '@react-navigation/native';
import AppCatalogItem from "../AppCatalogItem";

export default ({data, title, link, middleText = "", color, onPress}) => {
    const navigation = useNavigation()
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    //const minus = screenWidth * .3

    const _renderItem = ({item}) => {
        //console.log('item', item)
        return (
            <AppCatalogItem
                item={item}
                navigation={navigation}
                middleText={middleText}
                color={color}
                screenWidth={screenWidth / 2}
            />
        )
    }
    if(data.length > 0) {
        return (
            <View style={styles.shops}>
                <AppMoreLink style={styles.mores} text={'См.все'} onPress={onPress} />
                <AppTextBold style={styles.newText}>
                    {title}
                </AppTextBold>
                <SafeAreaView style={{...styles.area}}>
                    <View style={{...styles.wrap}}>
                        <Carousel
                            data={data}
                            //layout={"default"}
                            inactiveSlideOpacity={1}
                            inactiveSlideScale={1}
                            sliderWidth={screenWidth}
                            itemWidth={screenWidth / 2}
                            loop={true}
                            renderItem={_renderItem}
                        />
                    </View>
                </SafeAreaView>
            </View>
        )
    } else
        return <></>
}

const styles = StyleSheet.create({
    newText: {
        paddingLeft: 20,
        paddingRight: 80
    },
    shops: {
        width: "100%",
        position: "relative"
    },
    mores: {
        position: "absolute",
        top: 0,
        right: 20,
        zIndex: 999
    },
    wrap: {
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: THEME.SLIDER_BG,
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center'
    }
})
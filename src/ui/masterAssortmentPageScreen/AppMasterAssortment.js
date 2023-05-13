import React, {useState} from "react"
import {View, StyleSheet, TouchableOpacity} from "react-native"
import {Svg, Path} from "react-native-svg";
import {AppTextBold} from "../AppTextBold";
import {AppText} from "../AppText";
import AppBlockMonths from "./AppBlockMonths";
import AppButton from "../AppButton";
import {THEME} from "../../../theme";
import AppMasterDesr from "./AppMasterDesr";
import AppBlockDays from "./AppBlockDays";
import ImageView from 'react-native-image-view'
import moment from "moment";
import {AppFetch} from "../../AppFetch";
import {globalAlert} from "../../globalHeaders";
import {LinkTo, masterAssortmentStyle} from "../../../global";
import AppFastImage from "../AppFastImage";

export default (
    {
        data,
        screenWidth,
        navigation
    }) => {
    const [isImageViewVisible, setImageViewVisible] = useState(false)
    const images = []
    const [date, setDate] = useState(moment())
    const [in_basket, setInBasket] = useState(data.in_basket)

    //console.log(data)
    data.photos.map(photo => {
        images.push({
            source: {
                uri: photo.url
            },
            width: photo.width,
            height: photo.height
        })
    })

    const addBasket = async () => {
        const response = await AppFetch.getWithToken("addBasketItem", {
            id: data.id,
            date: date.format("YYYY-MM-DD")
        }, {}, navigation)
        if(response.result) {
            globalAlert({
                title: "Товар успешно добавлен"
            })
            setInBasket(true)
        } else
            globalAlert({
                title: "Товара нет в наличии"
            })
    }

    //console.log('images', images)
    return (
        <>
            <View style={styles.block}>
                <View style={styles.wrap}>
                    <TouchableOpacity
                        style={styles.imageBlock}
                        activeOpacity={1}
                        onPress={() => {
                            setImageViewVisible(true)
                        }}
                    >
                        <AppFastImage
                            style={styles.img}
                            uri={data.main_photo}
                            resizeMode={"cover"}
                        />
                        <View
                            style={styles.zoom}
                        >
                            <View style={styles.zoomWrap}>
                                <View style={styles.zoomBg}></View>
                                <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M23.633 21.4984L16.4183 14.2671C17.4713 12.7818 18.0953 10.9837 18.0953 9.02931C18.0953 4.06515 14.0784 0 9.08663 0C9.08663 0 9.08663 0 9.04763 0C9.04763 0 9.04763 0 9.00863 0C4.05583 0 0 4.02606 0 9.02931C0 13.9935 4.01683 18.0586 9.00863 18.0586C9.00863 18.0586 9.00863 18.0586 9.04763 18.0586C9.04763 18.0586 9.04763 18.0586 9.08663 18.0586C9.12562 18.0586 9.16462 18.0586 9.16462 18.0586C9.55461 18.0586 9.90559 18.0195 10.2566 17.9805C10.4126 17.9414 10.5686 17.9414 10.6856 17.9023C11.0365 17.8241 11.3485 17.7459 11.6995 17.6678C11.8945 17.5896 12.0895 17.5505 12.2845 17.4723C12.4405 17.3941 12.5965 17.355 12.7525 17.2769C13.2985 17.0423 13.8444 16.7296 14.3514 16.3778L21.5661 23.6091C22.1511 24.1954 23.048 24.1954 23.633 23.6091C24.218 23.0228 24.218 22.1238 23.633 21.5375V21.4984ZM13.5714 10.5147H10.5686V13.5244H7.56569V10.5147H4.56281V7.50489H7.56569V4.49511H10.5686V7.50489H13.5714V10.5147Z" fill="white"/>
                                </Svg>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{...styles.infoBlock, width: screenWidth - 160}}>
                        <AppTextBold style={styles.title}>
                            {data.name}
                        </AppTextBold>
                        <View style={styles.descrBlock}>
                            <AppText style={styles.descr}>
                                {data.description}
                            </AppText>
                        </View>
                        <View style={styles.orderBlock}>
                            <AppText style={{marginBottom: 0, fontSize: 14}}>
                                В какой дате нужен заказ?
                            </AppText>
                            <View style={styles.counterBlock}>
                                <AppBlockMonths
                                    resultIs={date}
                                    onResult={date => {
                                        //console.log(date)
                                        setDate(date)
                                    }}
                                />
                                <AppBlockDays
                                    resultIs={date}
                                    onResult={date => {
                                        setDate(date)
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.descrBlock}>
                            <AppButton style={{width: 80, minWidth: 0}} color={THEME.COMFORT_COLOR}>
                                <AppTextBold style={styles.textBtn}>
                                    {data.price}
                                </AppTextBold>
                            </AppButton>
                            {
                                !in_basket
                                    ?
                                    <AppButton
                                        style={{width: 90, minWidth: 0}}
                                        color={THEME.COMFORT_COLOR}
                                        onPress={() => {
                                            addBasket()

                                        }}
                                    >
                                        <AppTextBold style={styles.textBtn}>
                                            В корзину
                                        </AppTextBold>
                                    </AppButton>
                                    :
                                    <AppButton
                                        style={{width: 90, minWidth: 0}}
                                        color={THEME.GREEN}
                                        onPress={() => {
                                            LinkTo("BasketPageScreen", {}, navigation)
                                        }}
                                    >
                                        <AppTextBold style={styles.textBtn}>
                                            Добавлено
                                        </AppTextBold>
                                    </AppButton>
                            }
                        </View>
                    </View>
                </View>
                <AppMasterDesr
                    data={data}
                    navigation={navigation}
                />
            </View>
            <ImageView
                images={images}
                imageIndex={0}
                isVisible={isImageViewVisible}
                useNativeDriver={false}
                onClose={() => setImageViewVisible(false)}
            />
        </>
    )
}

const styles = StyleSheet.create(masterAssortmentStyle)

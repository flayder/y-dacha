import React, {useState, useEffect} from "react"
import {StyleSheet, View, TouchableOpacity} from "react-native"
import {AppTextBold} from "../AppTextBold";
import {getRandomKey, LinkTo} from "../../../global";
import {Svg, Rect, Circle, Path, Stop, LinearGradient, Defs} from "react-native-svg";
import {THEME} from "../../../theme";
import {useNavigation} from "@react-navigation/native";
import {AppFetch} from "../../AppFetch";

export default ({name, colorActive}) => {
    const navigation = useNavigation()
    const [count, setCount] = useState(0)

    const init = async () => {
        const response = await AppFetch.getWithToken("getCountBasketProduct", {}, {}, navigation)
        if(response.result) {
            setCount(response.data)
        }
    }

    useEffect(() => {
        init()
    }, [count])

    const data = [
        {
            name: "Корзина",
            link: "BasketPageScreen",
            value: "basket"
        },
        {
            name: "Заказы\nпокупателя",
            link: "OrderBuyerPageScreen",
            value: "buyer_orders"
        },
        {
            name: "Заказы\nу мастера",
            link: "OrderMasterPageScreen",
            value: "master_orders"
        },
    ]
    return (
        <View style={styles.lists}>
            {
                data.map(item => {
                    const active = item.value == name
                    let color = THEME.ALL_COLOR
                    let text = THEME.GREY_TEXT
                    if(active) {
                        color = colorActive
                        text = "#fff"
                    }
                    return <TouchableOpacity
                        activeOpacity={1}
                        style={{...styles.list, backgroundColor: color}}
                        key={getRandomKey()}
                        onPress={() => {
                            LinkTo(item.link, {}, navigation)
                        }}
                    >
                        {
                            active
                                ?
                                <View style={styles.basket}>
                                    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Circle cx="12.5" cy="12.5" r="12.5" fill="url(#paint0_linear)"/>
                                        <Path d="M16.1545 18.285H9.09141L8.94184 17.7367H16.9464L18.243 12.6722L7.66755 11.5358L7.1832 9H4.72949V9.95797H6.28224L6.56072 11.4167L6.53833 11.4142L7.81513 17.7367H7.84195L7.99746 18.3064C7.67254 18.3543 7.37195 18.4907 7.13654 18.6971C6.90113 18.9036 6.74232 19.17 6.68171 19.4602C6.6211 19.7504 6.66162 20.0503 6.79776 20.3191C6.93391 20.5879 7.15907 20.8127 7.44265 20.9627C7.72622 21.1128 8.05446 21.1809 8.38272 21.1578C8.71099 21.1347 9.02337 21.0216 9.27739 20.8337C9.53142 20.6459 9.71477 20.3924 9.80251 20.1078C9.89026 19.8233 9.87815 19.5214 9.76783 19.2432H14.6477C14.5353 19.5301 14.5277 19.8416 14.6258 20.1327C14.724 20.4238 14.9229 20.6793 15.1937 20.8624C15.4646 21.0454 15.7933 21.1464 16.1324 21.1508C16.4715 21.1552 16.8034 21.0627 17.08 20.8868C17.3567 20.7109 17.5637 20.4606 17.6712 20.1722C17.7787 19.8838 17.7811 19.5722 17.6781 19.2825C17.575 18.9928 17.3718 18.74 17.0979 18.5607C16.824 18.3813 16.4936 18.2848 16.1545 18.285V18.285ZM16.9357 13.4967L16.0954 16.7787H8.70739L8.00143 13.2816L7.85588 12.5205L16.9357 13.4967ZM8.79235 19.719C8.79234 19.8131 8.7612 19.9051 8.70287 19.9834C8.64454 20.0617 8.56164 20.1227 8.46465 20.1587C8.36765 20.1947 8.26092 20.2041 8.15796 20.1858C8.05499 20.1674 7.96041 20.1221 7.88617 20.0555C7.81194 19.989 7.76138 19.9041 7.7409 19.8118C7.72042 19.7195 7.73093 19.6238 7.7711 19.5368C7.81127 19.4499 7.87931 19.3755 7.96659 19.3232C8.05388 19.2709 8.15651 19.243 8.26149 19.243C8.40222 19.2432 8.53713 19.2934 8.63665 19.3826C8.73616 19.4718 8.79215 19.5928 8.79235 19.719ZM16.1545 20.1952C16.0495 20.1951 15.9469 20.1672 15.8597 20.1149C15.7724 20.0625 15.7044 19.9882 15.6643 19.9013C15.6241 19.8143 15.6136 19.7186 15.6341 19.6263C15.6546 19.534 15.7051 19.4492 15.7794 19.3826C15.8536 19.3161 15.9482 19.2708 16.0511 19.2524C16.154 19.234 16.2608 19.2434 16.3577 19.2794C16.4547 19.3154 16.5376 19.3764 16.596 19.4546C16.6543 19.5329 16.6855 19.6249 16.6855 19.719C16.6853 19.8452 16.6293 19.9662 16.5298 20.0555C16.4302 20.1447 16.2953 20.195 16.1545 20.1952H16.1545Z" fill="white"/>
                                        <Defs>
                                            <LinearGradient id="paint0_linear" x1="12.5" y1="25" x2="12.5" y2="-7.55208" gradientUnits="userSpaceOnUse">
                                                <Stop stopColor="#456BAE"/>
                                                <Stop offset="0.731914" stopColor="#6C92F4"/>
                                            </LinearGradient>
                                        </Defs>
                                    </Svg>
                                </View>
                                :
                                <View style={styles.basket}>
                                    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Circle cx="12.5" cy="12.5" r="12.5" fill="#BDBDBD"/>
                                        <Path d="M16.1545 18.285H9.09141L8.94184 17.7367H16.9464L18.243 12.6722L7.66755 11.5358L7.1832 9H4.72949V9.95797H6.28224L6.56072 11.4167L6.53833 11.4142L7.81513 17.7367H7.84195L7.99746 18.3064C7.67254 18.3543 7.37195 18.4907 7.13654 18.6971C6.90113 18.9036 6.74232 19.17 6.68171 19.4602C6.6211 19.7504 6.66162 20.0503 6.79776 20.3191C6.93391 20.5879 7.15907 20.8127 7.44265 20.9627C7.72622 21.1128 8.05446 21.1809 8.38272 21.1578C8.71099 21.1347 9.02337 21.0216 9.27739 20.8337C9.53142 20.6459 9.71477 20.3924 9.80251 20.1078C9.89026 19.8233 9.87815 19.5214 9.76783 19.2432H14.6477C14.5353 19.5301 14.5277 19.8416 14.6258 20.1327C14.724 20.4238 14.9229 20.6793 15.1937 20.8624C15.4646 21.0454 15.7933 21.1464 16.1324 21.1508C16.4715 21.1552 16.8034 21.0627 17.08 20.8868C17.3567 20.7109 17.5637 20.4606 17.6712 20.1722C17.7787 19.8838 17.7811 19.5722 17.6781 19.2825C17.575 18.9928 17.3718 18.74 17.0979 18.5607C16.824 18.3813 16.4936 18.2848 16.1545 18.285V18.285ZM16.9357 13.4967L16.0954 16.7787H8.70739L8.00143 13.2816L7.85588 12.5205L16.9357 13.4967ZM8.79235 19.719C8.79234 19.8131 8.7612 19.9051 8.70287 19.9834C8.64454 20.0617 8.56164 20.1227 8.46465 20.1587C8.36765 20.1947 8.26092 20.2041 8.15796 20.1858C8.05499 20.1674 7.96041 20.1221 7.88617 20.0555C7.81194 19.989 7.76138 19.9041 7.7409 19.8118C7.72042 19.7195 7.73093 19.6238 7.7711 19.5368C7.81127 19.4499 7.87931 19.3755 7.96659 19.3232C8.05388 19.2709 8.15651 19.243 8.26149 19.243C8.40222 19.2432 8.53713 19.2934 8.63665 19.3826C8.73616 19.4718 8.79215 19.5928 8.79235 19.719ZM16.1545 20.1952C16.0495 20.1951 15.9469 20.1672 15.8597 20.1149C15.7724 20.0625 15.7044 19.9882 15.6643 19.9013C15.6241 19.8143 15.6136 19.7186 15.6341 19.6263C15.6546 19.534 15.7051 19.4492 15.7794 19.3826C15.8536 19.3161 15.9482 19.2708 16.0511 19.2524C16.154 19.234 16.2608 19.2434 16.3577 19.2794C16.4547 19.3154 16.5376 19.3764 16.596 19.4546C16.6543 19.5329 16.6855 19.6249 16.6855 19.719C16.6853 19.8452 16.6293 19.9662 16.5298 20.0555C16.4302 20.1447 16.2953 20.195 16.1545 20.1952H16.1545Z" fill="white"/>
                                    </Svg>
                                </View>
                        }
                        <AppTextBold style={{...styles.text, color: text}}>
                            {item.name}
                        </AppTextBold>
                        {
                            active
                                ?
                                <View style={styles.rect}>
                                    <Svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Rect width="12.7828" height="12.7828" rx="1" transform="matrix(0.582157 0.813076 -0.582157 0.813076 8 0)" fill={color}/>
                                    </Svg>
                                </View>
                                :
                                <></>
                        }
                    </TouchableOpacity>
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    rect: {
        position: "absolute",
        bottom: -10,
        left: "50%",
        marginLeft: -8
    },
    lists: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 40,
        backgroundColor: THEME.ALL_COLOR
    },
    basket: {
        position: "absolute",
        right: 5,
        top: -10
    },
    list: {
        width: "33.333333%",
        borderRadius: 40,
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        height: 50
    },
    text: {
        textAlign: "center",
        marginTop: 0,
        marginBottom: 0,
        fontSize: 14
    }
})
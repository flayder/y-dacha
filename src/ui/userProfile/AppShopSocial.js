import React from "react"
import {View, StyleSheet, ImageBackground, TouchableOpacity} from "react-native"
import {Svg, Path, Circle} from "react-native-svg"
import {AppText} from "../AppText";
import {AppTextBold} from "../AppTextBold";
import {THEME} from "../../../theme";
import * as WebBrowser from 'expo-web-browser';
import AppTextTicker from "../AppTextTicker";

export default ({data, Button, title, color = THEME.COMFORT_COLOR}) => {
    return (
        <ImageBackground
            source={require("@images/profile/bg.png")}
            resizeMode={"stretch"}
            style={styles.block}
        >
            <AppTextBold style={styles.title}>
                {title ? title : "Социальные сети"}
            </AppTextBold>
            <View style={styles.valueWrap}>
                {
                    data.hasOwnProperty('vk') && data.vk
                        ?
                        <View style={styles.value}>
                            <View style={styles.icon}>
                                <Svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M20.2246 1.75391C20.3359 1.30859 20.2246 0.9375 19.5566 0.9375H17.3672C16.8105 0.9375 16.5508 1.23438 16.4023 1.56836C16.4023 1.56836 15.2891 4.27734 13.7305 6.05859C13.2109 6.54102 12.9883 6.72656 12.6914 6.72656C12.5801 6.72656 12.3574 6.54102 12.3574 6.0957V1.75391C12.3574 1.19727 12.209 0.9375 11.7266 0.9375H8.3125C7.94141 0.9375 7.75586 1.19727 7.75586 1.45703C7.75586 1.97656 8.53516 2.08789 8.60938 3.57227V6.80078C8.60938 7.50586 8.49805 7.6543 8.20117 7.6543C7.45898 7.6543 5.67773 4.9082 4.60156 1.79102C4.37891 1.19727 4.15625 0.9375 3.59961 0.9375H1.41016C0.816406 0.9375 0.667969 1.23438 0.667969 1.56836C0.667969 2.16211 1.41016 5.01953 4.11914 8.8418C5.9375 11.4395 8.49805 12.8125 10.7988 12.8125C12.1719 12.8125 12.3574 12.5156 12.3574 11.9961C12.3574 9.50977 12.2461 9.25 12.9141 9.25C13.248 9.25 13.8047 9.43555 15.1035 10.6973C16.5879 12.1816 16.8477 12.8125 17.6641 12.8125H19.8535C20.4844 12.8125 20.7812 12.5156 20.5957 11.8848C20.1875 10.623 17.4043 7.95117 17.2559 7.76562C16.9219 7.35742 17.0332 7.17188 17.2559 6.80078C17.2559 6.80078 19.9277 3.01562 20.2246 1.75391Z"
                                          fill={color}/>
                                </Svg>
                            </View>
                            <View style={styles.textWrap}>
                                <TouchableOpacity
                                    style={styles.text}
                                    activeOpacity={1}
                                    onPress={async () => {
                                        await WebBrowser.openBrowserAsync(data.vk)
                                    }}
                                >
                                    <AppTextTicker style={styles.textWrap}>
                                        Открыть страницу VK
                                    </AppTextTicker>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <></>
                }
                {/*Youtube*/}
                {
                    data.hasOwnProperty('youtube') && data.youtube
                        ?
                        <View style={styles.value}>
                            <View style={styles.icon}>
                                <Svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M20.373 3.01367C20.1504 2.12305 19.4453 1.41797 18.5918 1.19531C16.9961 0.75 10.6875 0.75 10.6875 0.75C10.6875 0.75 4.3418 0.75 2.74609 1.19531C1.89258 1.41797 1.1875 2.12305 0.964844 3.01367C0.519531 4.57227 0.519531 7.91211 0.519531 7.91211C0.519531 7.91211 0.519531 11.2148 0.964844 12.8105C1.1875 13.7012 1.89258 14.3691 2.74609 14.5918C4.3418 15 10.6875 15 10.6875 15C10.6875 15 16.9961 15 18.5918 14.5918C19.4453 14.3691 20.1504 13.7012 20.373 12.8105C20.8184 11.2148 20.8184 7.91211 20.8184 7.91211C20.8184 7.91211 20.8184 4.57227 20.373 3.01367ZM8.60938 10.918V4.90625L13.8789 7.91211L8.60938 10.918Z"
                                          fill={color}/>
                                </Svg>
                            </View>
                            <View style={styles.textWrap}>
                                <TouchableOpacity
                                    style={styles.text}
                                    activeOpacity={1}
                                    onPress={async () => {
                                        await WebBrowser.openBrowserAsync(data.youtube)
                                    }}
                                >
                                    <AppTextTicker style={styles.textWrap}>
                                        Открыть страницу youtube
                                    </AppTextTicker>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <></>
                }
                {/*Insta*/}
                {
                    data.hasOwnProperty('insta') && data.insta
                        ?
                        <View style={styles.value}>
                            <View style={styles.icon}>
                                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <Path
                                        d="M10.582 9C10.582 9.87369 9.87369 10.582 9 10.582C8.12631 10.582 7.41797 9.87369 7.41797 9C7.41797 8.12631 8.12631 7.41797 9 7.41797C9.87369 7.41797 10.582 8.12631 10.582 9Z"
                                        fill={color}/>
                                    <Path
                                        d="M11.6719 4.21875H6.32812C5.16495 4.21875 4.21875 5.16495 4.21875 6.32812V11.6719C4.21875 12.8351 5.16495 13.7812 6.32812 13.7812H11.6719C12.8351 13.7812 13.7812 12.8351 13.7812 11.6719V6.32812C13.7812 5.16495 12.8351 4.21875 11.6719 4.21875ZM9 11.6367C7.5461 11.6367 6.36328 10.4539 6.36328 9C6.36328 7.5461 7.5461 6.36328 9 6.36328C10.4539 6.36328 11.6367 7.5461 11.6367 9C11.6367 10.4539 10.4539 11.6367 9 11.6367ZM12.0234 6.50391C11.7322 6.50391 11.4961 6.26784 11.4961 5.97656C11.4961 5.68529 11.7322 5.44922 12.0234 5.44922C12.3147 5.44922 12.5508 5.68529 12.5508 5.97656C12.5508 6.26784 12.3147 6.50391 12.0234 6.50391Z"
                                        fill={color}/>
                                    <Path
                                        d="M13.2539 0H4.74609C2.12915 0 0 2.12915 0 4.74609V13.2539C0 15.8708 2.12915 18 4.74609 18H13.2539C15.8708 18 18 15.8708 18 13.2539V4.74609C18 2.12915 15.8708 0 13.2539 0ZM14.8359 11.6719C14.8359 13.4165 13.4165 14.8359 11.6719 14.8359H6.32812C4.5835 14.8359 3.16406 13.4165 3.16406 11.6719V6.32812C3.16406 4.5835 4.5835 3.16406 6.32812 3.16406H11.6719C13.4165 3.16406 14.8359 4.5835 14.8359 6.32812V11.6719Z"
                                        fill={color}/>
                                </Svg>
                            </View>
                            <View style={styles.textWrap}>
                                <View style={styles.textWrap}>
                                    <AppText style={styles.text}>
                                        {data.insta}
                                    </AppText>
                                </View>
                            </View>
                        </View>
                        :
                        <></>
                }
                {/*Twit*/}
                {
                    data.hasOwnProperty('twitter') && data.twitter
                        ?
                        <View style={styles.value}>
                            <View style={styles.icon}>
                                <Svg width="17" height="18" viewBox="0 0 17 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <Path
                                        d="M14.8438 0.5625H1.78125C0.779297 0.5625 0 1.37891 0 2.34375V15.4062C0 16.4082 0.779297 17.1875 1.78125 17.1875H14.8438C15.8086 17.1875 16.625 16.4082 16.625 15.4062V2.34375C16.625 1.37891 15.8086 0.5625 14.8438 0.5625ZM13.0254 6.46289C13.0254 6.57422 13.0254 6.68555 13.0254 6.79688C13.0254 9.98828 10.5762 13.6992 6.08594 13.6992C4.71289 13.6992 3.45117 13.3281 2.375 12.623C2.56055 12.6602 2.74609 12.6602 2.93164 12.6602C4.08203 12.6602 5.12109 12.252 5.97461 11.6211C4.89844 11.584 4.00781 10.8789 3.67383 9.91406C4.08203 9.98828 4.41602 9.98828 4.78711 9.87695C3.67383 9.6543 2.85742 8.68945 2.85742 7.50195V7.46484C3.1543 7.65039 3.52539 7.76172 3.93359 7.76172C3.26562 7.31641 2.85742 6.57422 2.85742 5.75781C2.85742 5.27539 2.96875 4.86719 3.19141 4.49609C4.37891 5.98047 6.19727 6.94531 8.20117 7.05664C7.86719 5.42383 9.0918 4.05078 10.5762 4.05078C11.2812 4.05078 11.9121 4.34766 12.3574 4.83008C12.9141 4.71875 13.4336 4.5332 13.916 4.23633C13.7305 4.83008 13.3223 5.27539 12.8398 5.57227C13.3223 5.53516 13.8047 5.38672 14.25 5.20117C13.916 5.68359 13.4707 6.12891 13.0254 6.46289Z"
                                        fill={color}/>
                                </Svg>
                            </View>
                            <View style={styles.textWrap}>
                                <View style={styles.textWrap}>
                                    <AppText style={styles.text}>
                                        {data.twitter}
                                    </AppText>
                                </View>
                            </View>
                        </View>
                        :
                        <></>
                }
                {/*fb*/}
                {
                    data.hasOwnProperty('fb') && data.fb
                        ?
                        <View style={styles.value}>
                            <View style={styles.icon}>
                                <Svg width="17" height="18" viewBox="0 0 17 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <Path
                                        d="M14.8438 0.5625H1.78125C0.779297 0.5625 0 1.37891 0 2.34375V15.4062C0 16.4082 0.779297 17.1875 1.78125 17.1875H6.86523V11.5469H4.52734V8.875H6.86523V6.87109C6.86523 4.57031 8.23828 3.27148 10.3164 3.27148C11.3555 3.27148 12.3945 3.45703 12.3945 3.45703V5.7207H11.2441C10.0938 5.7207 9.72266 6.42578 9.72266 7.16797V8.875H12.2832L11.875 11.5469H9.72266V17.1875H14.8438C15.8086 17.1875 16.625 16.4082 16.625 15.4062V2.34375C16.625 1.37891 15.8086 0.5625 14.8438 0.5625Z"
                                        fill={color}/>
                                </Svg>
                            </View>
                            <View style={styles.textWrap}>
                                <TouchableOpacity
                                    style={styles.text}
                                    activeOpacity={1}
                                    onPress={async () => {
                                        await WebBrowser.openBrowserAsync(data.fb)
                                    }}
                                >
                                    <AppTextTicker style={styles.textWrap}>
                                        Открыть страницу facebook
                                    </AppTextTicker>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <></>
                }
                {/*ok*/}
                {
                    data.hasOwnProperty('ok') && data.ok
                        ?
                        <View style={styles.value}>
                            <View style={styles.icon}>
                                <Svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M6.82812 5.98047C6.82812 6.75977 7.49609 7.42773 8.3125 7.42773C9.0918 7.42773 9.75977 6.79688 9.75977 5.98047C9.75977 5.12695 9.0918 4.49609 8.3125 4.49609C7.49609 4.49609 6.82812 5.12695 6.82812 5.98047ZM16.625 2.34375C16.625 1.37891 15.8086 0.5625 14.8438 0.5625H1.78125C0.779297 0.5625 0 1.37891 0 2.34375V15.4062C0 16.4082 0.779297 17.1875 1.78125 17.1875H14.8438C15.8086 17.1875 16.625 16.4082 16.625 15.4062V2.34375ZM5.26953 5.98047C5.26953 4.31055 6.64258 2.9375 8.3125 2.9375C9.94531 2.9375 11.3184 4.31055 11.3184 5.98047C11.3184 7.61328 9.94531 8.94922 8.3125 8.94922C6.64258 8.94922 5.26953 7.61328 5.26953 5.98047ZM11.7637 9.32031C12.0605 9.91406 11.7266 10.2109 10.9473 10.6934C10.3164 11.1016 9.46289 11.25 8.86914 11.3242L9.35156 11.8066L11.1328 13.5879C11.7637 14.2559 10.7246 15.2578 10.0566 14.627C9.61133 14.1816 8.98047 13.5508 8.3125 12.8457L6.53125 14.627C5.86328 15.2578 4.82422 14.2188 5.49219 13.5879C5.9375 13.1055 6.56836 12.4746 7.23633 11.8066L7.71875 11.3242C7.16211 11.25 6.27148 11.1016 5.64062 10.6934C4.86133 10.2109 4.52734 9.91406 4.82422 9.32031C5.00977 8.98633 5.45508 8.68945 6.08594 9.20898C6.08594 9.20898 6.93945 9.87695 8.3125 9.87695C9.64844 9.87695 10.502 9.20898 10.502 9.20898C11.1328 8.68945 11.5781 8.98633 11.7637 9.32031Z"
                                          fill={color}/>
                                </Svg>
                            </View>
                            <View style={styles.textWrap}>
                                <TouchableOpacity
                                    style={styles.text}
                                    activeOpacity={1}
                                    onPress={async () => {
                                        await WebBrowser.openBrowserAsync(data.ok)
                                    }}
                                >
                                    <AppTextTicker style={styles.textWrap}>
                                        Открыть страницу ОК
                                    </AppTextTicker>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <></>
                }
                {/*telega*/}
                {
                    data.hasOwnProperty('telegram') && data.telegram
                        ?
                        <View style={styles.value}>
                            <View style={styles.icon}>
                                <Svg width="19" height="20" viewBox="0 0 19 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <Path
                                        d="M9.20312 0.671875C4.11914 0.671875 0 4.79102 0 9.875C0 14.959 4.11914 19.0781 9.20312 19.0781C14.2871 19.0781 18.4062 14.959 18.4062 9.875C18.4062 4.79102 14.2871 0.671875 9.20312 0.671875ZM13.6934 6.98047L12.209 14.1055C12.0977 14.625 11.8008 14.7363 11.3555 14.5137L9.05469 12.8066L7.94141 13.8828C7.83008 13.9941 7.71875 14.1055 7.49609 14.1055L7.64453 11.7676L11.9121 7.9082C12.0977 7.75977 11.875 7.64844 11.6152 7.79688L6.3457 11.1367L4.08203 10.4316C3.59961 10.2832 3.59961 9.91211 4.19336 9.68945L13.0625 6.27539C13.4707 6.12695 13.8418 6.38672 13.6934 6.98047Z"
                                        fill={color}/>
                                </Svg>
                            </View>
                            <View style={styles.textWrap}>
                                <AppText style={styles.text}>
                                    {data.telegram}
                                </AppText>
                            </View>
                        </View>
                        :
                        <></>
                }
                {/*whatsup*/}
                {
                    data.hasOwnProperty('whatsup') && data.whatsup
                        ?
                        <View style={styles.value}>
                            <View style={styles.icon}>
                                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <Path
                                        d="M9.00225 0H8.99775C4.03538 0 0 4.0365 0 9C0 10.9688 0.6345 12.7935 1.71337 14.2751L0.59175 17.6186L4.05113 16.5128C5.47425 17.4555 7.17188 18 9.00225 18C13.9646 18 18 13.9624 18 9C18 4.03763 13.9646 0 9.00225 0ZM14.2391 12.7091C14.022 13.3223 13.1602 13.8307 12.4729 13.9792C12.0026 14.0794 11.3884 14.1593 9.32063 13.302C6.67575 12.2063 4.9725 9.51862 4.83975 9.34425C4.71263 9.16988 3.771 7.92112 3.771 6.62963C3.771 5.33813 4.42688 4.70925 4.69125 4.43925C4.90838 4.21763 5.26725 4.11637 5.6115 4.11637C5.72288 4.11637 5.823 4.122 5.913 4.1265C6.17737 4.13775 6.31012 4.1535 6.4845 4.57088C6.70162 5.094 7.23037 6.3855 7.29338 6.51825C7.3575 6.651 7.42163 6.831 7.33162 7.00538C7.24725 7.18538 7.173 7.26525 7.04025 7.41825C6.9075 7.57125 6.7815 7.68825 6.64875 7.8525C6.52725 7.99538 6.39 8.14838 6.543 8.41275C6.696 8.6715 7.22475 9.53437 8.00325 10.2274C9.00787 11.1217 9.82237 11.4075 10.1137 11.529C10.3309 11.619 10.5896 11.5976 10.7483 11.4289C10.9496 11.2118 11.1982 10.8518 11.4514 10.4974C11.6314 10.2431 11.8586 10.2116 12.0971 10.3016C12.3401 10.386 13.626 11.0216 13.8904 11.1532C14.1547 11.286 14.3291 11.349 14.3932 11.4604C14.4562 11.5718 14.4562 12.0949 14.2391 12.7091Z"
                                        fill={color}/>
                                </Svg>
                            </View>
                            <View style={styles.textWrap}>
                                <AppText style={styles.text}>
                                    {data.whatsup}
                                </AppText>
                            </View>
                        </View>
                        :
                        <></>
                }
            </View>
            <View style={styles.btnWrapper}>
                <Button />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    btnWrapper: {
        position: "relative",
        zIndex: 99
    },
    block: {
        width: "100%",
        paddingTop: 20,
        paddingBottom: 30,
        marginTop: 30
    },
    valueWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        paddingBottom: 20
    },
    title: {
        textAlign: "center"
    },
    value: {
        width: "50%",
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        alignItems: "center",
        //justifyContent: "space-between"
    },
    icon: {
        paddingRight: 20
    },
    textWrap: {
        marginTop: 0,
        marginBottom: 0,
        color: THEME.BLUE,
        textAlign: "center",
        fontSize: 14
    },
    text: {
        marginTop: 10,
        marginBottom: 10,
        paddingRight: 20,
        fontSize: 14
    }
})
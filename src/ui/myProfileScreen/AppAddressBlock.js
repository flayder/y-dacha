import React from "react"
import {View, StyleSheet, ImageBackground} from "react-native"
import {AppTextBold} from "../AppTextBold";
import {Svg, Path} from "react-native-svg";
import {AppText} from "../AppText";

export default ({data}) => {
    return (
        <ImageBackground
            style={styles.bg}
            source={require("@images/myProfileScreen/bg.png")}
            resizeMode={"cover"}
        >
            <AppTextBold style={styles.title}>
                Адрес для доставки
            </AppTextBold>
            <View style={styles.iconBlock}>
                {
                    data.hasOwnProperty('index_delivery')
                        ?
                        <View style={styles.line}>
                            <View style={styles.icon}>
                                <Svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M14 12.375V2.25C14 1.63125 13.475 1.125 12.8333 1.125H10.5V0.5625C10.5 0.225 10.2667 0 9.91666 0C9.56666 0 9.33332 0.225 9.33332 0.5625V1.125H4.66666V0.5625C4.66666 0.225 4.43333 0 4.08333 0C3.73333 0 3.5 0.225 3.5 0.5625V1.125H1.16667C0.524999 1.125 0 1.63125 0 2.25V12.375H14ZM10.5 3.375H11.6667V4.5H10.5V3.375ZM10.5 5.625H11.6667V6.75H10.5V5.625ZM10.5 7.875H11.6667V9H10.5V7.875ZM10.5 10.125H11.6667V11.25H10.5V10.125ZM8.16666 3.375H9.33332V4.5H8.16666V3.375ZM8.16666 5.625H9.33332V6.75H8.16666V5.625ZM8.16666 7.875H9.33332V9H8.16666V7.875ZM8.16666 10.125H9.33332V11.25H8.16666V10.125ZM4.66666 3.375H5.83333V4.5H4.66666V3.375ZM4.66666 5.625H5.83333V6.75H4.66666V5.625ZM4.66666 7.875H5.83333V9H4.66666V7.875ZM4.66666 10.125H5.83333V11.25H4.66666V10.125ZM2.33333 3.375H3.5V4.5H2.33333V3.375ZM2.33333 5.625H3.5V6.75H2.33333V5.625ZM2.33333 7.875H3.5V9H2.33333V7.875ZM2.33333 10.125H3.5V11.25H2.33333V10.125Z" fill="#BDBDBD"/>
                                    <Path d="M0 13.5V16.875C0 17.4938 0.524999 18 1.16667 18H3.5V14.625H5.83333V18H8.16666V14.625H10.5V18H12.8333C13.475 18 14 17.4938 14 16.875V13.5H0Z" fill="#BDBDBD"/>
                                </Svg>
                            </View>
                            <AppText style={styles.lineText}>
                                {data.index_delivery}
                            </AppText>
                        </View>
                        :
                        <></>
                }
                {
                    data.hasOwnProperty('region_delivery')
                        ?
                        <View style={styles.line}>
                            <View style={styles.icon}>
                                <Svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M1.14274 0.03125C0.535662 0.03125 0 0.251975 0 1.04028V11.9819C0 12.518 0.535662 12.8333 1.14274 12.9909L5.6423 14V1.07181L1.14274 0.0627821V0.03125Z" fill="#BDBDBD"/>
                                    <Path d="M11.2867 12.9594V0.03125L6.75146 1.04028V13.9684L11.2867 12.9594Z" fill="#BDBDBD"/>
                                    <Path d="M16.8932 13.9687C17.5003 13.9687 18.0002 13.6534 18.0002 13.1174V2.01806C18.0002 1.48201 17.4646 1.16669 16.8575 1.00903L12.3579 0V12.9282L16.8575 13.9372L16.8932 13.9687Z" fill="#BDBDBD"/>
                                </Svg>
                            </View>
                            <AppText style={styles.lineText}>
                                {data.region_delivery}
                            </AppText>
                        </View>
                        :
                        <></>
                }
                {
                    data.hasOwnProperty('city_delivery')
                        ?
                        <View style={styles.line}>
                            <View style={styles.icon}>
                                <Svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M16.8817 0H1.11834C0.47929 0 0 0.496063 0 1.15748V12.8425C0 13.5039 0.47929 14 1.11834 14H16.8817C17.5207 14 18 13.5039 18 12.8425V1.15748C18 0.496063 17.5207 0 16.8817 0V0ZM3.35503 11.685H2.23669V2.37008H3.35503V11.685ZM5.59172 11.685H4.47337V10.5276H5.59172V11.685ZM5.59172 9.37008H4.47337V2.37008H5.59172V9.37008ZM8.94674 11.685H6.71006V10.5276H8.94674V11.685ZM8.94674 9.37008H6.71006V2.37008H8.94674V9.37008ZM11.1834 11.685H10.0651V10.5276H11.1834V11.685ZM11.1834 9.37008H10.0651V2.37008H11.1834V9.37008ZM13.4201 11.685H12.3018V10.5276H13.4201V11.685ZM13.4201 9.37008H12.3018V2.37008H13.4201V9.37008ZM15.6568 11.685H14.5385V2.37008H15.6568V11.685Z" fill="#BDBDBD"/>
                                </Svg>
                            </View>
                            <AppText style={styles.lineText}>
                                {data.city_delivery}
                            </AppText>
                        </View>
                        :
                        <></>
                }
                {
                    data.hasOwnProperty('street_delivery')
                        ?
                        <View style={styles.line}>
                            <View style={styles.icon}>
                                <Svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M6.96175 0C3.09836 0 0 3.03704 0 6.74074C0 7.96296 0.344262 9.11111 0.956284 10.1111L7 18L13.0437 10.1111C13.6557 9.11111 14 7.96296 14 6.74074C14 3 10.8634 0 7.03825 0L6.96175 0ZM6.96175 10.1111C5.04918 10.1111 3.48087 8.59259 3.48087 6.74074C3.48087 4.88889 5.04918 3.37037 6.96175 3.37037C8.87432 3.37037 10.4426 4.88889 10.4426 6.74074C10.4426 8.59259 8.87432 10.1111 6.96175 10.1111Z" fill="#BDBDBD"/>
                                </Svg>
                            </View>
                            <AppText style={styles.lineText}>
                                {data.street_delivery}
                            </AppText>
                        </View>
                        :
                        <></>
                }
                {
                    data.hasOwnProperty('house_delivery')
                        ?
                        <View style={styles.line}>
                            <View style={styles.icon}>
                                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M18 3.3907L15.7343 1.13023H10.1119C10.1119 0.502325 9.60839 0 8.97902 0C8.34965 0 7.84615 0.502325 7.84615 1.13023H0L2.26573 3.3907L0 5.65116H7.84615V16.8698C7.84615 17.4977 8.34965 18 8.97902 18C9.60839 18 10.1119 17.4977 10.1119 16.8698V5.65116H15.7343L18 3.3907Z" fill="#BDBDBD"/>
                                </Svg>
                            </View>
                            <AppText style={styles.lineText}>
                                {data.house_delivery}
                            </AppText>
                        </View>
                        :
                        <></>
                }
                {
                    data.hasOwnProperty('appartment_delivery')
                        ?
                        <View style={styles.line}>
                            <View style={styles.icon}>
                                <Svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M12.9839 2.28125H10.9966V3.42173H12.9839V16.8595H10.9966V18H12.9839C13.5139 18 13.9997 17.5042 13.9997 16.8595V3.42173C13.9997 2.8267 13.5581 2.28125 12.9839 2.28125Z" fill="#BDBDBD"/>
                                    <Path d="M9.00936 0.049586L1.01576 1.19007C0.485799 1.19007 0 1.68593 0 2.33054V16.8593C0 17.4543 0.441635 17.9997 1.01576 17.9997H9.00936H10.0251V16.8593V3.42144V2.28096V1.14048C10.0251 0.545447 9.58348 0 9.00936 0V0.049586ZM7.9936 10.1156C7.46363 10.1156 6.97784 9.61969 6.97784 8.97507C6.97784 8.38004 7.41947 7.8346 7.9936 7.8346C8.52356 7.8346 9.00936 8.33046 9.00936 8.97507C9.00936 9.57011 8.56772 10.1156 7.9936 10.1156Z" fill="#BDBDBD"/>
                                </Svg>
                            </View>
                            <AppText style={styles.lineText}>
                                {data.appartment_delivery}
                            </AppText>
                        </View>
                        :
                        <></>
                }
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center"
    },
    bg: {
        marginTop: 20,
        marginBottom: 20,
        padding: 20,
        paddingLeft: 0,
        paddingRight: 0,
        width: "100%"
    },
    iconBlock: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    icon: {
        width: 30
    },
    line: {
        width: "50%",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20
    }
})
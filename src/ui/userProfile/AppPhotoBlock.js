import React from "react"
import {View, StyleSheet, ImageBackground} from "react-native"
import {Svg, Path} from "react-native-svg"
import {AppText} from "../AppText";
import {THEME} from "../../../theme";
import {PROFILE_STYLE} from "../../../global";

export default ({data, color = THEME.COMFORT_COLOR}) => {
    return (
        <View style={styles.wrap}>
            <View style={styles.left}>
                <ImageBackground
                    style={styles.photo}
                    source={{uri: data.photo}}
                    resizeMode={"contain"}
                />
            </View>
            <View style={styles.right}>
                {
                    data.hasOwnProperty('first_name') && data.first_name
                        ?
                        <View style={styles.line}>
                            <View style={styles.icon}>
                                <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M11.7233 10.5373C13.4698 9.58696 14.6811 7.74224 14.6811 5.61801C14.6811 2.51553 12.1459 0 9.01912 0C5.89236 0 3.35715 2.51553 3.35715 5.61801C3.35715 7.74224 4.56841 9.58696 6.31489 10.5373C2.96278 11.5714 0.455738 14.4783 0.0332031 18H1.07546H1.15996H16.8783H16.9628H18.0332C17.5825 14.4503 15.0755 11.5714 11.7515 10.5373H11.7233Z" fill={color}/>
                                </Svg>
                            </View>
                            <View style={styles.name}>
                                <AppText style={styles.text}>
                                    {data.first_name}
                                </AppText>
                            </View>
                        </View>
                        :
                        <></>
                }
                {
                    data.hasOwnProperty('last_name') && data.last_name
                        ?
                        <View style={styles.line}>
                            <View style={styles.icon}>
                                <Svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <Path
                                        d="M11.7606 10.5344C13.5247 9.59016 14.7506 7.76066 14.7506 5.63607C14.7506 2.5377 12.2091 0 9.03967 0C5.90013 0 3.3287 2.5082 3.3287 5.63607C3.3287 7.76066 4.55462 9.59016 6.31874 10.5344C2.9699 11.5672 0.458271 14.459 0.00976562 18H1.05628H1.14598H6.73734L7.87355 12.3639H10.146L11.2822 18H16.8736H16.9633H18.0098C17.5613 14.459 15.0496 11.5672 11.7008 10.5344H11.7606Z"
                                        fill={color}/>
                                </Svg>
                            </View>
                            <View style={styles.name}>
                                <AppText style={styles.text}>
                                    {data.last_name}
                                </AppText>
                            </View>
                        </View>
                        :
                        <></>
                }
                {
                    data.hasOwnProperty('birthday') && data.birthday
                        ?
                        <View style={styles.line}>
                            <View style={styles.icon}>
                                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <Path
                                        d="M3.7231 2.28282C4.07489 2.28282 4.39736 1.99015 4.39736 1.60968V0.673139C4.39736 0.321936 4.1042 0 3.7231 0C3.3713 0 3.04883 0.292669 3.04883 0.673139V1.60968C3.04883 1.96088 3.34199 2.28282 3.7231 2.28282Z"
                                        fill={color}/>
                                    <Path
                                        d="M13.8667 2.28282C14.2184 2.28282 14.5409 1.99015 14.5409 1.60968V0.673139C14.5409 0.321936 14.2478 0 13.8667 0C13.5149 0 13.1924 0.292669 13.1924 0.673139V1.60968C13.1924 1.96088 13.4855 2.28282 13.8667 2.28282Z"
                                        fill={color}/>
                                    <Path
                                        d="M16.798 1.14172H15.684V2.25387C15.684 2.86847 15.1857 3.36601 14.57 3.36601H13.456C12.8404 3.36601 12.342 2.86847 12.342 2.25387V1.14172H5.57003V2.25387C5.57003 2.86847 5.07166 3.36601 4.45603 3.36601H3.34202C2.72638 3.36601 2.22801 2.86847 2.22801 2.25387V1.14172H1.11401C0.498371 1.14172 0 1.63926 0 2.25387V16.8873C0 17.5019 0.498371 17.9995 1.11401 17.9995H16.886C17.5016 17.9995 18 17.5019 18 16.8873V2.25387C18 1.63926 17.5016 1.14172 16.886 1.14172H16.798ZM6.65472 15.7752H4.39739V13.5216H6.65472V15.7752ZM6.65472 12.4095H4.39739V10.1559H6.65472V12.4095ZM6.65472 9.04379H4.39739V6.79024H6.65472V9.04379ZM10.0261 15.8044H7.76873V13.5509H10.0261V15.8044ZM10.0261 12.4388H7.76873V10.1852H10.0261V12.4388ZM10.0261 9.07306H7.76873V6.8195H10.0261V9.07306ZM13.3974 15.8337H11.1401V13.5802H13.3974V15.8337ZM13.3974 12.468H11.1401V10.2145H13.3974V12.468ZM13.3974 9.10232H11.1401V6.84877H13.3974V9.10232Z"
                                        fill={color}/>
                                </Svg>
                            </View>
                            <View style={styles.name}>
                                <AppText style={styles.text}>
                                    {data.birthday}
                                </AppText>
                            </View>
                        </View>
                        :
                        <></>
                }
                {
                    data.hasOwnProperty('phone') && data.phone
                        ?
                        <View style={styles.line}>
                            <View style={styles.icon}>
                                <Svg width="14" height="18" viewBox="0 0 14 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <Path
                                        d="M12.8218 0H1.17822C0.554455 0 0 0.533333 0 1.13333V16.8667C0 17.4667 0.554455 18 1.17822 18H12.8218C13.4455 18 14 17.4667 14 16.8667V1.13333C14 0.533333 13.4455 0 12.8218 0V0ZM6.93069 17.3333C6.58416 17.3333 6.30693 17.0667 6.30693 16.7333C6.30693 16.4 6.58416 16.1333 6.93069 16.1333C7.27723 16.1333 7.55446 16.4 7.55446 16.7333C7.55446 17.0667 7.27723 17.3333 6.93069 17.3333ZM12.8218 15.6667H1.17822V1.06667H12.8218V15.6667Z"
                                        fill={color}/>
                                    <Path d="M11.7129 2.2673H2.35645V14.6006H11.7129V2.2673Z" fill={color}/>
                                </Svg>
                            </View>
                            <View style={styles.name}>
                                <AppText style={styles.text}>
                                    {data.phone}
                                </AppText>
                            </View>
                        </View>
                        :
                        <></>
                }
                {
                    data.hasOwnProperty('gender') && data.gender
                        ?
                        <View style={styles.line}>
                            <View style={styles.icon}>
                                <Svg width="18" height="14" viewBox="0 0 18 14" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <Path
                                        d="M7.66753 8.57442C8.46234 7.94467 8.97662 6.92738 8.97662 5.8132C8.97662 3.8755 7.48052 2.32535 5.61039 2.32535C3.74026 2.32535 2.24416 3.8755 2.24416 5.8132C2.24416 6.92738 2.75844 7.89622 3.55325 8.57442C1.44935 9.44638 0 11.5294 0 14H11.2208C11.2208 11.5294 9.72468 9.44638 7.66753 8.57442Z"
                                        fill={color}/>
                                    <Path
                                        d="M14.4001 6.24907C15.1949 5.61932 15.7092 4.60203 15.7092 3.48785C15.7092 1.55016 14.213 0 12.3429 0C10.7066 0 9.30396 1.21106 9.02344 2.8581C9.67798 3.68162 10.0988 4.69891 10.0988 5.81309C10.0988 5.86153 10.0988 6.97571 9.35071 8.42898C10.3793 9.2525 11.1741 10.3667 11.6416 11.6746H18.0001C18.0001 9.20406 16.504 7.12103 14.4468 6.24907H14.4001Z"
                                        fill={color}/>
                                </Svg>
                            </View>
                            <View style={styles.name}>
                                <AppText style={styles.text}>
                                    {data.gender}
                                </AppText>
                            </View>
                        </View>
                        :
                        <></>
                }
                {
                    data.hasOwnProperty('email') && data.email
                        ?
                        <View style={styles.line}>
                            <View style={styles.icon}>
                                <Svg width="18" height="13" viewBox="0 0 18 13" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <Path
                                        d="M17.9867 1.29041C17.9867 1.26985 18.0008 1.24983 17.9999 1.22949L12.5068 6.52232L17.9933 11.6461C17.9965 11.6095 17.9867 11.5726 17.9867 11.5352V1.29041Z"
                                        fill={color}/>
                                    <Path
                                        d="M11.6689 7.33676L9.42644 9.49425C9.31297 9.60342 9.16641 9.65816 9.01978 9.65816C8.8762 9.65816 8.73262 9.60577 8.61992 9.50074L6.38361 7.41684L0.861328 12.7397C0.995604 12.788 1.13973 12.8254 1.29067 12.8254H16.749C16.9731 12.8254 17.1833 12.7571 17.3661 12.6553L11.6689 7.33676Z"
                                        fill={color}/>
                                    <Path
                                        d="M9.01317 8.26395L17.3963 0.188549C17.2065 0.0757012 16.9856 0 16.7488 0H1.29047C0.982108 0 0.699558 0.11973 0.479492 0.302336L9.01317 8.26395Z"
                                        fill={color}/>
                                    <Path
                                        d="M0 1.48706V11.535C0 11.6503 0.0265111 11.7616 0.0552901 11.8678L5.50906 6.61598L0 1.48706Z"
                                        fill={color}/>
                                </Svg>
                            </View>
                            <View style={styles.name}>
                                <AppText style={styles.text}>
                                    {data.email}
                                </AppText>
                            </View>
                        </View>
                        :
                        <></>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    ...PROFILE_STYLE
})
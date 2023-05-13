import React, {useLayoutEffect, useEffect} from "react"
import {View, StyleSheet, ImageBackground} from "react-native"
import {AppTextBold} from "@root/ui/AppTextBold";
import {AppWrap} from "../ui/AppWrap";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {useDispatch, useSelector} from "react-redux";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import AppDescription from "../ui/sortDetailPageScreen/AppDescription";
import AppRating from "../ui/sortDetailPageScreen/AppRating";
import AppRatingVote from "../ui/sortDetailPageScreen/AppRatingVote";
import {loadPest} from "../store/actions/pests";
import {Svg, Path} from "react-native-svg";
import AppImageWrapper from "../ui/pestDetailPageScreen/AppImageWrapper";
import AppAddPhotoButton from "../ui/pestsPageScreen/AppAddPhotoButton";
import AppFavorite from "../ui/pestDetailPageScreen/AppFavorite";
import {FAVORITE_PEST, getRandomKey, globalRouteFun} from "../../global";
import AppFavoriteButton from "../ui/AppFavoriteButton";
import AppFavoriteActive from "../ui/pestDetailPageScreen/AppFavoriteActive";

const pageWrapper = ({navigation, route}) => {
    let id = 0
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('pestId')) {
            id = route.params.pestId
        }
    }
    if(id === 0) {
       return (
           <AppTextBold>
               Неверные данные!
           </AppTextBold>
       )
    }
    useLayoutEffect(() => {
        navigation.setOptions(
            mainHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "PestsPageScreen"
                }),
            [navigation])
    })

    const init = true
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadPest({id, navigation}))
    }, [init])

    const data = useSelector(state => state.pests.currentPest)

    //console.log('data', data)

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
                <AppImageWrapper title={data.name} style={styles.img}>
                    <ImageBackground
                        style={styles.bg}
                        source={{uri: data.photo}}
                        resizeMode={"cover"}
                    />
                    <AppFavoriteButton
                        id={data.id}
                        type={FAVORITE_PEST}
                        isActive={data.favorite}
                        hintStyle={{
                            left: "auto",
                            right: 0
                        }}
                        style={styles.favorite}
                        hintText={"Вредитель был успешно добавлен в избранное"}
                        hintReserved={true}
                        activeForm={() => {
                            return <AppFavoriteActive
                                text={"В избранном"}
                            />
                        }}
                        passiveForm={() => {
                            return <AppFavorite />
                        }}
                    />
                </AppImageWrapper>
            </View>
            <AppAddPhotoButton routeName="PestsAddPhotoPageScreen" navigation={navigation} />
            <AppDescription description={data.description} />
            <AppRating style={styles.voteWrap}>
                <View style={styles.titleRait}>
                    <Svg width="13" height="18" viewBox="0 0 13 18" fill="none">
                        <Path d="M8.54836 6.69567V5.18087C8.54836 4.85391 8.28329 4.58884 7.95633 4.58884H7.60775V3.32218C8.01542 3.78203 8.61017 4.0722 9.27308 4.0722C9.41848 4.0722 9.56061 4.05823 9.6982 4.03159C9.83073 4.00593 9.92909 3.89384 9.93734 3.7591C9.94559 3.62435 9.86156 3.50117 9.73317 3.45945C9.03513 3.23255 8.5289 2.70766 8.31341 2.07731L10.6038 1.13997C10.8656 1.03277 11.0151 0.755348 10.9604 0.477766C10.9058 0.200145 10.6625 0 10.3795 0H6.80891C6.65451 0 6.50626 0.0603079 6.39571 0.168057L5.17929 1.35357C5.06491 1.46499 5.00046 1.61789 5.00046 1.77754V4.58884H4.65187C4.32492 4.58884 4.05985 4.85391 4.05985 5.18087V6.69567C1.68862 7.6021 0 9.90067 0 12.5865V13.0654C0 14.5786 0.544349 16.0417 1.53276 17.1853C1.98025 17.703 2.62963 18 3.31433 18H9.29384C9.97862 18 10.628 17.7031 11.0754 17.1853C12.0639 16.0417 12.6082 14.5786 12.6082 13.0654V12.5865C12.6082 9.90067 10.9195 7.6021 8.54836 6.69567Z" fill="black"/>
                    </Svg>
                    <AppTextBold style={{paddingLeft: 15}}>
                        Какие препараты использовать:
                    </AppTextBold>
                </View>
                <View style={styles.vottingWrap}>
                    {
                        data.hasOwnProperty('votes')
                            ?
                            data.votes.map(item => {
                                return <AppRatingVote
                                    style={styles.vote}
                                    key={getRandomKey()}
                                    active={false}
                                    text={item.name}
                                    starWidth={20}
                                    starHeight={20}
                                    initiate={item.rating}
                                    typeLink={item.type}
                                    typeParams={{
                                        chemicalId: item.id
                                    }}
                                />
                            })
                            :
                            <></>
                    }
                </View>
            </AppRating>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    favorite: {
        position: "absolute",
        right: 0,
        bottom: 0
    },
    titleRait: {
        width: "100%",
        marginBottom: 10,
        textAlign: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20
    },
    bg: {
        width: "100%",
        height: 200
    },
    voteWrap: {
        // flexDirection: "row",
        // flexWrap: "wrap"
    },
    vottingWrap: {
        justifyContent: "center",
        alignItems: "center"
    },
    vote: {
        width: "50%",
        flexWrap: "wrap",
        paddingLeft: 30,
        paddingRight: 30
    },
    img: {
        marginBottom: 30
    }
})

const Stack = createStackNavigator()

const pageScreen = ({navigation, route}) => {
    //console.log('StackPageScreen', route.params)
    return (
        <Stack.Navigator>
            <Stack.Screen name={"StackPageScreen"} component={pageWrapper} />
        </Stack.Navigator>
    )
}

//Tabs
const Tab = createBottomTabNavigator();

const PageTab = ({navigation, route}) => {
    //console.log('InsideTabs', route.params)
    return (
        <Tab.Navigator tabBar={() => {
            return <BottomMenu />
        }}
        >
            <Tab.Screen name={"InsideTabs"} component={pageScreen} />
        </Tab.Navigator>
    )
}

//Drawers
const Drawer = createDrawerNavigator()

export default ({route}) => {
    globalRouteFun(route)
    return (
        <>
            <Drawer.Navigator
                screenOptions={() => ({
                    headerShown: false
                })}
                drawerContent={AppDrawerContentHandler} drawerPosition="left"
            >
                <Drawer.Screen name="InsidePageScreen" component={PageTab} />
            </Drawer.Navigator>
            <AppIndicator timer={2} />
        </>
    )
}

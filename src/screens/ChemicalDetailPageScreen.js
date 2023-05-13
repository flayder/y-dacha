import React, {useLayoutEffect, useEffect, useState} from "react"
import {StyleSheet, ImageBackground, TouchableOpacity} from "react-native"
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
import AppTopChemicalPanel from "../ui/chemicalDetailPageScreen/AppTopChemicalPanel";
import AppBottomChemicalPanel from "../ui/chemicalDetailPageScreen/AppBottomChemicalPanel";
import AppDescription from "../ui/sortDetailPageScreen/AppDescription";
import AppRating from "../ui/sortDetailPageScreen/AppRating";
import AppRatingVote from "../ui/sortDetailPageScreen/AppRatingVote";
import {loadChemical} from "../store/actions/chemicals";
import {getRandomKey, globalRouteFun} from "../../global";
import ImageView from "react-native-image-view";

const pageWrapper = ({navigation, route}) => {
    let id = 0
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('chemicalId')) {
            id = route.params.chemicalId
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
                    routeName: "ChemicalPageScreen"
                }),
            [navigation])
    })

    const init = true
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadChemical({id, navigation}))
    }, [init])

    const images = []
    const data = useSelector(state => state.chemicals.currentChemical)

    const [isImageViewVisible, setImageViewVisible] = useState(false)

    if(data.hasOwnProperty('photo') && data.photo) {
        images.push({
            source: {
                uri: data.photo
            },
            width: data.img_width,
            height: data.img_height
        })
    }

    //console.log('data', data)
    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            <AppTextBold style={styles.title}>
                {data.name}
            </AppTextBold>
            <AppTopChemicalPanel data={data} navigation={navigation} />
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    if(data.photo)
                        setImageViewVisible(true)
                }}
            >
                <ImageBackground
                    style={styles.bg}
                    source={{uri: data.photo}}
                    resizeMode={"cover"}
                />
            </TouchableOpacity>
            <ImageView
                images={images}
                imageIndex={0}
                isVisible={isImageViewVisible}
                useNativeDriver={false}
                onClose={() => setImageViewVisible(false)}
            />
            {
                data.hasOwnProperty('id')
                    ?
                    <AppBottomChemicalPanel data={data} navigation={navigation} />
                    :
                    <></>
            }
            <AppDescription description={data.content} />
            <AppRating style={styles.voteWrap}>
                <AppTextBold style={{width: "100%", marginBottom: 10, textAlign: "center"}}>
                    Рейтинг
                </AppTextBold>
                {
                    data.hasOwnProperty('votes')
                        ?
                        data.votes.map(item => {
                            return <AppRatingVote
                                style={styles.vote}
                                key={getRandomKey()}
                                text={item.name}
                                starWidth={20}
                                starHeight={20}
                                initiate={item.rating}
                            />
                        })
                        :
                        <></>
                }
            </AppRating>
        </AppWrap>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20
    },
    bg: {
        width: "100%",
        height: 160,
        marginBottom: 10
    },
    voteWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center"
    },
    vote: {
        width: "50%",
        paddingLeft: "5%",
        paddingRight: "5%",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
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

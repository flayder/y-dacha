import React, {useLayoutEffect, useEffect, useState, useRef} from "react"
import {StyleSheet, Dimensions, View} from "react-native"
import {AppWrap} from "../ui/AppWrap";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import AppRadio from "../ui/formUI/AppRadio";
import {AppTextBold} from "../ui/AppTextBold";
import {THEME} from "../../theme";
import AppFavoriteItem from "../ui/AppFavoriteItem";
import {AppFetch} from "../AppFetch";
import {
    FAVORITE_CHEMICAL,
    FAVORITE_DECORATOR,
    FAVORITE_DISEASE, FAVORITE_EVENT,
    FAVORITE_PEST, FAVORITE_QUESTION,
    FAVORITE_SELLER,
    FAVORITE_SORT,
    getRandomKey, globalRouteFun
} from "../../global";
import AppEmptyText from "../ui/AppEmptyText";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentRoute} from "../store/actions/other";

const pageWrapper = ({navigation, route}) => {
    let id = 74
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('eventId')) {
            id = route.params.eventId
        }
    }
    useLayoutEffect(() => {
        navigation.setOptions(
            mainHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "EventsPageScreen"
                }),
            [navigation])
    })

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    const init = true
    const items = useRef([])
    const [data, setData] = useState([])
    const type = useRef(FAVORITE_SORT)
    const setFilter = () => {
        const arr = []
        items.current.map(item => {
            if(item.type == type.current) arr.push(item)
        })

        setData(arr)
    }
    const initiate = () => {
        AppFetch.getWithToken('getFavorite', {}, {}, navigation).then(response => {
            //console.log('response', response)
            if(response.result) {
                items.current = response.data
                setFilter()
            }
        })
    }
    useEffect(() => {
        initiate()
    }, [init])

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            <AppTextBold style={styles.title}>
                Избранное
            </AppTextBold>
            <View style={styles.radioBlock}>
                <AppRadio
                    label={"Сорта"}
                    iconColor={THEME.PURPLE}
                    style={styles.radio}
                    activeIs={type.current == FAVORITE_SORT}
                    outside={true}
                    onResult={() => {
                        type.current = FAVORITE_SORT
                        setFilter()
                    }}
                />
                <AppRadio
                    label={"Вредители"}
                    iconColor={THEME.PURPLE}
                    style={styles.radio}
                    activeIs={type.current == FAVORITE_PEST}
                    outside={true}
                    onResult={() => {
                        type.current = FAVORITE_PEST
                        setFilter()
                    }}
                />
                <AppRadio
                    label={"Заболевания"}
                    iconColor={THEME.PURPLE}
                    style={styles.radio}
                    activeIs={type.current == FAVORITE_DISEASE}
                    outside={true}
                    onResult={() => {
                        type.current = FAVORITE_DISEASE
                        setFilter()
                    }}
                />
                <AppRadio
                    label={"Мастера"}
                    iconColor={THEME.PURPLE}
                    style={styles.radio}
                    activeIs={type.current == FAVORITE_DECORATOR}
                    outside={true}
                    onResult={() => {
                        type.current = FAVORITE_DECORATOR
                        setFilter()
                    }}
                />
                <AppRadio
                    label={"Продавцы"}
                    iconColor={THEME.PURPLE}
                    style={styles.radio}
                    activeIs={type.current == FAVORITE_SELLER}
                    outside={true}
                    onResult={() => {
                        type.current = FAVORITE_SELLER
                        setFilter()
                    }}
                />
                <AppRadio
                    label={"Химикаты"}
                    iconColor={THEME.PURPLE}
                    style={styles.radio}
                    activeIs={type.current == FAVORITE_CHEMICAL}
                    outside={true}
                    onResult={() => {
                        type.current = FAVORITE_CHEMICAL
                        setFilter()
                    }}
                />
                <AppRadio
                    label={"Справка"}
                    iconColor={THEME.PURPLE}
                    style={styles.radio}
                    activeIs={type.current == FAVORITE_QUESTION}
                    outside={true}
                    onResult={() => {
                        type.current = FAVORITE_QUESTION
                        setFilter()
                    }}
                />
                <AppRadio
                    label={"События"}
                    iconColor={THEME.PURPLE}
                    style={styles.radio}
                    activeIs={type.current == FAVORITE_EVENT}
                    outside={true}
                    onResult={() => {
                        type.current = FAVORITE_EVENT
                        setFilter()
                    }}
                />
                <AppRadio
                    label={"События"}
                    iconColor={THEME.PURPLE}
                    style={{...styles.radio, opacity: 0}}
                />
            </View>
            {
                data.length
                    ?
                    data.map((item, key) => {
                        return <AppFavoriteItem
                            screenWidth={screeWidth}
                            onDelete={async () => {
                                const response = await AppFetch.getWithToken('removeFavorite', {id: item.id}, {}, navigation)
                                //console.log('res', response)
                                if(response.result)
                                    initiate()
                            }}
                            key={getRandomKey()}
                            navigation={navigation}
                            item={item}
                            num={key + 1}
                        />
                    })
                    :
                    <AppEmptyText text={"Избранного этого типа нет в вашем списке"} />
            }

        </AppWrap>
    )
}

const styles = StyleSheet.create({
    title: {
        color: THEME.PURPLE,
        textAlign: "center"
    },
    radioBlock: {
        padding: 20,
        paddingTop: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    radio: {
        width: "33.3332%"
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

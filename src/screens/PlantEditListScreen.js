import React, {useLayoutEffect, useEffect, useState, useRef} from "react"
import {StyleSheet, View, Dimensions} from "react-native"
import {AppWrap} from "../ui/AppWrap";
import {AppDrawerContentHandler} from "../drawers/paramsFunctions/AppDrawerContentHandler";
import {useDispatch, useSelector} from "react-redux";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomMenu from "@root/ui/bottomMenu"
import {createStackNavigator} from "@react-navigation/stack";
import {mainHeader} from "../globalHeaders";
import AppIndicator from "../ui/AppIndicator";
import AppPlantListItem from "../ui/plantEditListScreen/AppPlantListItem";
import {getRandomKey, globalRouteFun} from "../../global";
import AppPlantEditListTopPanel from "../ui/plantEditListScreen/AppPlantEditListTopPanel";
import {AppFetch} from "../AppFetch";
import AppEmptyText from "../ui/AppEmptyText";
import {setCurrentRoute} from "../store/actions/other";

const pageWrapper = ({navigation, route}) => {
    let id = 0
    if(route.params !== undefined) {
        if(route.params.hasOwnProperty('plantId')) {
            id = route.params.plantId
        }
    }
    // if(id === 0) {
    //    return (
    //        <AppTextBold>
    //            Неверные данные!
    //        </AppTextBold>
    //    )
    // }
    useLayoutEffect(() => {
        navigation.setOptions(
            mainHeader(
                {
                    route,
                    navigation,
                    headerLeftBack: true,
                    routeName: "SortPageScreen"
                }),
            [navigation])
    })

    //console.log('id', id)

    const init = true
    const [data, setData] = useState([])
    const preview = useRef(false)
    const initiate = () => {
        AppFetch.getWithToken("getMyPlantsList", {id}, {}, navigation).then(result => {
            //console.log(id, result.data.items)
            if(result.result) {
                setData(result.data)
            }
        })
    }
    useEffect(() => {
        initiate()
    }, [init])

    const [screeWidth, setScreenWidth] = useState(Dimensions.get('screen').width)
    Dimensions.addEventListener('change', () => {
        let width = Dimensions.get('screen').width
        setScreenWidth(width)
    })

    //console.log('data', data)

    return (
        <AppWrap scroll={{paddingLeft: 0, paddingRight: 0}}>
            {
                data.hasOwnProperty('preview')
                    ?
                    <AppPlantEditListTopPanel data={data.preview} />
                    :
                    <></>
            }
            {
                Array.isArray(data.items) && data.items.length
                    ?
                    <View style={styles.listItems}>
                        {
                            data.items.map(item => {
                                return <AppPlantListItem
                                    key={getRandomKey()}
                                    screenWidth={screeWidth - 40}
                                    item={item}
                                    onDelete={async (id) => {
                                        const response = await AppFetch.getWithToken("removeQuestionery", {id}, {}, navigation)
                                        if(response.result) initiate()
                                    }}
                                />
                            })
                        }
                    </View>
                    :
                    <AppEmptyText text={"Здесь пока нет не одной анкеты"} />
            }

        </AppWrap>
    )

}

const styles = StyleSheet.create({
    listItems: {
        padding: 20
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

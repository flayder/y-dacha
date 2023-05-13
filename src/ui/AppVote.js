import React, {useState} from "react"
import {StyleSheet, View, TouchableOpacity} from "react-native"
//import SWGImage from "expo-svg-uri";
import {THEME} from "../../theme";
import {getRandomKey} from "../../global";
import {Svg, Path} from "react-native-svg"

export default (
    {
        onResult,
        active = true,
        outside = false,
        initiate = null,
        fill= THEME.YELLOW,
        style,
        starWidth = 20,
        starHeight = 19
    }) => {

    const [index, setIndex] = useState((initiate > 0) ? initiate - 1 : initiate)
    const votes = []
    if(!outside) {
        if(onResult && index !== initiate) {
            onResult(index + 1)
        }
    } else {
        if(initiate != index) setIndex(initiate)
    }
    let i = 1
    while (i <= 5) {
        votes.push(i)
        i++
    }
    return (
        <View style={{...styles.vote, ...style}}>
            {votes.map((item, indexNum) => {
                return (
                    <TouchableOpacity key={getRandomKey() + "link"} style={styles.voteStar} activeOpacity={1} onPress={() => {
                        if(active) {
                            setIndex(indexNum)
                        }
                    }}>
                        {(index >= indexNum && index !== null && index !== 0)
                            ?
                            <Svg
                                width={starWidth}
                                height={starHeight}
                                fill="none"
                                viewBox="0 0 20 19"
                            >
                                <Path
                                    fill={fill}
                                    d="M9.96249 15.9119l4.83161 2.9158c.8849.5344 1.9676-.2556 1.7348-1.2546L15.2482 12.09l4.2728-3.69406c.7801-.67376.3609-1.9516-.6636-2.03291l-5.6234-.47629L11.0336.705712c-.3958-.940949-1.74638-.940949-2.14223 0L6.69093 5.87513l-5.62336.47628C.0430278 6.43273-.376104 7.71056.403947 8.38433L4.67677 12.0784l-1.28069 5.4831c-.23285.999.84991 1.789 1.73475 1.2546l4.83166-2.9042z"
                                />
                            </Svg>

                            :
                            <Svg
                                width={starWidth}
                                height={starHeight}
                                fill={"none"}
                                viewBox="0 0 20 19"
                            >
                                <Path
                                    fill="#BDBDBD"
                                    d={"M9.96249 15.9119l4.83161 2.9158c.8849.5344 1.9676-.2556 1.7348-1.2546L15.2482 12.09l4.2728-3.69406c.7801-.67376.3609-1.9516-.6636-2.03291l-5.6234-.47629L11.0336.705712c-.3958-.940949-1.74638-.940949-2.14223 0L6.69093 5.87513l-5.62336.47628C.0430278 6.43273-.376104 7.71056.403947 8.38433L4.67677 12.0784l-1.28069 5.4831c-.23285.999.84991 1.789 1.73475 1.2546l4.83166-2.9042z"}
                                />
                            </Svg>
                        }
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    vote: {
        width: 200,
        flexDirection: "row",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "space-between"
    },
    voteStar: {
        //backgroundColor: "red"
    }
})
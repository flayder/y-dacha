import React, {useEffect} from "react"
import * as Font from "expo-font"
import { DB } from "./db"

export async function bootstrap() {
    try {
        await Font.loadAsync({
            "ptsans-regular": require("../assets/fonts/PTSans-Regular.ttf"),
            "ptsans-bold": require("../assets/fonts/PTSans-Bold.ttf"),
            "ptsans-italic": require("../assets/fonts/PTSans-Italic.ttf"),
            "comfortaa-regular": require("../assets/fonts/Comfortaa-Regular.ttf")
        })

        await DB.init()

        console.log('Database is loaded...')
    } catch(e) {
        console.log("Database error ", e)
    }
}
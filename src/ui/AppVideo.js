import React, {useRef, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default ({source, style}) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    return (
        <View style={{...styles.container}}>
            <WebView
                style={{...styles.video, ...style}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{uri: source }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    video: {
        marginTop: 20,
        marginBottom: 40,
        width: "100%",
        height: 250
    }
})
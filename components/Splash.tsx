// src/components/Splash.tsx
import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

export default function Splash() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo/avtotoza_blue_logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 220,
        height: 220,
    },
})

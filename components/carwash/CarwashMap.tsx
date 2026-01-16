import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { YStack, Text } from 'tamagui'

type Props = {
    latitude: number
    longitude: number
    name: string
    address: string
}

export function CarwashMap({
                               latitude,
                               longitude,
                               name,
                               address,
                           }: Props) {
    return (
        <YStack
            marginTop="$5"
            borderRadius="$6"
            overflow="hidden"
            height={220}
        >
            <MapView
                style={StyleSheet.absoluteFill}
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
            >
                <Marker
                    coordinate={{ latitude, longitude }}
                    title={name}
                    description={address}
                />
            </MapView>
        </YStack>
    )
}

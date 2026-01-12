import * as Location from 'expo-location'
import { useEffect, useState } from 'react'

export function useUserLocation() {
    const [coords, setCoords] = useState<{
        lat: number
        lon: number
    } | null>(null)

    useEffect(() => {
        let sub: Location.LocationSubscription | null = null

        ;(async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync()

            if (status !== 'granted') return

            sub = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000,
                    distanceInterval: 50,
                },
                (pos) => {
                    setCoords({
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude,
                    })
                }
            )
        })()

        return () => {
            sub?.remove()
        }
    }, [])

    return coords
}

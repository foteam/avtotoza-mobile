import { useMemo, useState } from 'react'
import { useRouter } from 'expo-router'
import {Alert, Image, Pressable} from 'react-native'

import { YStack, Text } from 'tamagui'

import { SearchBar } from '@/components/home/SearchBar'
import { ServiceButtons } from '@/components/home/ServicesButton'
import { CarwashList } from '@/components/home/CarwashList'

import { useCarwashes } from '@/hooks/useCarwashes'
import { useUserLocation } from '@/hooks/useUserLocation'
import { getDistance } from '@/utils/distance'
import {CarwashSkeleton} from '@/components/home/CarwashSkeleton'
import { useAuthStore } from '@/store/useAuthStore'
import { useTranslation } from "react-i18next";

import { sendTestPush } from '@/utils/sendTestPush'

export default function HomePage() {
    const [search, setSearch] = useState('')
    const router = useRouter()
    const {t} = useTranslation();
    const token = useAuthStore((s) => s.user?.token)

    const { data: carwashes = [], isLoading, refetch, isFetching} = useCarwashes()
    const userCoords = useUserLocation()
    const skeletonData = Array.from({ length: 4 }).map((_, i) => ({
        id: `skeleton-${i}`,
        _skeleton: true,
    }))
    if (isFetching) {
        console.log('Fetching carwashes')
    }

    const filtered = useMemo(() => {
        let list = carwashes

        if (search) {
            list = list.filter((w: any) =>
                w.name.toLowerCase().includes(search.toLowerCase())
            )
        }

        if (userCoords) {
            list = list
                .map((w: any) => {
                    if (!w.location || w.location.length < 2) return w

                    const km = getDistance(userCoords, {
                        lat: w.location[0],
                        lon: w.location[1],
                    })

                    return {
                        ...w,
                        distance: `${km.toFixed(1)} ${t('common.distance')}`,
                        _distanceValue: km,
                    }
                })
                .sort(
                    (a: any, b: any) =>
                        (a._distanceValue ?? 0) - (b._distanceValue ?? 0)
                )
        }

        return list
    }, [carwashes, search, userCoords])
    const listData = isLoading ? skeletonData : filtered

    return (
        <YStack flex={1} bg="#006cff">
            {/* 🔵 HEADER */}
            <YStack
                height={120}
                alignItems="center"
                justifyContent="flex-end"
                pb={36}
                borderBottomLeftRadius={80}
                borderBottomRightRadius={80}
                bg="$primary"
            >
                <Image
                    source={require("@/assets/logo/avtotoza_white_logo.png")}
                    style={{
                        width: 120,
                        height: 25,
                        resizeMode: 'contain',
                    }}
                />
            </YStack>
            {/* ⚪ CONTENT */}
            <YStack
                flex={1}
                bg="white"
                borderTopLeftRadius={24}
                borderTopRightRadius={24}
                mt={-20}
                px={16}
            >
                <CarwashList
                    data={filtered}
                    refreshing={isFetching}
                    onRefresh={() => refetch()}
                    header={
                        <>
                            <SearchBar
                                value={search}
                                onChange={setSearch}
                            />

                            {search === '' && (
                                <ServiceButtons onPress={() => (
                                    Alert.alert("Services unavailable", "The selected service is temporarily unavailable.\n\navtotoza.uz",)
                                )}/>

                            )}
                        </>
                    }
                    onSelect={(item) => {
                        router.push(`/carwash/${item.carwash_id}`)
                    }}
                />
            </YStack>
        </YStack>
    )
}

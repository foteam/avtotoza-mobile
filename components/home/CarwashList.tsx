import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { YStack } from 'tamagui'

import { CarwashCard } from './CarwashCard'
import { Carwash } from '@/types/carwash'

type Props = {
    data: Carwash[]
    header?: React.ReactElement
    onSelect?: (item: Carwash) => void
    refreshing?: boolean
    onRefresh?: () => void
}

export function CarwashList({ data, onSelect, header, refreshing = false, onRefresh }: Props) {
    return (
        <YStack flex={1}>
            <FlatList
                data={data}
                keyExtractor={(item) => String(item.carwash_id)}
                ListHeaderComponent={header}
                showsVerticalScrollIndicator={false}
                // ✅ PULL TO REFRESH
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#4D77FF"          // iOS spinner
                        colors={['#4D77FF']}         // Android spinner
                    />
                }
                contentContainerStyle={{
                    paddingBottom: 85,
                    paddingTop: 15,
                    paddingHorizontal: 1, // 🔥 единый отступ как в iOS
                }}
                renderItem={({ item }) =>  (
                    <CarwashCard
                        washId={item._id}
                        name={item.name}
                        address={item.address}
                        distance={item.distance}
                        rating={item.rating}
                        banner={String(item.banner)}
                        isPremium={Boolean(item.isPremium)}
                        onPress={() => onSelect?.(item)}
                    />
                )}
            />
        </YStack>
    )
}

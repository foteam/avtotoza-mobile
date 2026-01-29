import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { YStack } from 'tamagui'

import { CarwashCard } from './CarwashCard'
import { Carwash } from '@/types/carwash'
import {localizeText} from "@/utils/localizeText";
import { CarwashSkeletonItem } from './CarwashSkeletonItem'

type Props = {
    data: Carwash[]
    header?: React.ReactElement
    onSelect?: (item: Carwash) => void
    refreshing?: boolean
    onRefresh?: () => void
    isLoading?: boolean   // 👈 добавили

}

export function CarwashList({
                                data,
                                onSelect,
                                header,
                                refreshing = false,
                                onRefresh,
                            }: Props) {
    return (
        <YStack flex={1}>
            <FlatList
                data={data}
                keyExtractor={(item, index) =>
                    item._skeleton
                        ? `skeleton-${index}`
                        : String(item.carwash_id)
                }
                ListHeaderComponent={header}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#4D77FF"
                        colors={['#4D77FF']}
                    />
                }
                contentContainerStyle={{
                    paddingBottom: 85,
                    paddingTop: 15,
                    paddingHorizontal: 1,
                }}
                renderItem={({ item }) => {
                    // 🦴 SKELETON
                    if (item._skeleton) {
                        return <CarwashSkeletonItem />
                    }

                    // 🚗 REAL CARD
                    return (
                        <CarwashCard
                            washId={item._id}
                            name={item.name}
                            address={localizeText(item.address)}
                            distance={item.distance}
                            rating={item.rating}
                            banner={String(item.banner)}
                            isPremium={Boolean(item.isPremium)}
                            onPress={() => onSelect?.(item)}
                        />
                    )
                }}
            />
        </YStack>
    )
}

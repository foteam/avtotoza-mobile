import { ScrollView, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'

import { useCarwash } from '@/hooks/useCarwashes'
import { BannerHeader } from '@/components/carwash/BannerHeader'
import { CarNumberInput } from '@/components/carwash/CarNumberInput'
import { PriceList } from '@/components/carwash/PriceList'
import { Slots } from '@/components/carwash/Slots'
import { Gallery } from '@/components/carwash/Gallery'
import { CarwashSkeleton } from '@/components/carwash/CarwashSkeleton'
import { LeaveReviewButton } from '@/components/carwash/LeaveReviewButton'


export default function CarwashPage() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { data: wash, isLoading } = useCarwash(id)

    const [carNumber, setCarNumber] = useState('')
    const [selectedPrice, setSelectedPrice] = useState<any>(null)
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

    if (isLoading) {
        return <CarwashSkeleton />
    }

    if (!wash) return null

    return (
        <ScrollView>
            <BannerHeader
                banner={wash.banner}
                name={wash.name}
                address={wash.address}
                rating={wash.rating}
            />

            <View style={{ padding: 16 }}>
                <Text style={{paddingBottom: 15}}>Номер автомобиля:</Text>
                <CarNumberInput value={carNumber} onChange={setCarNumber} />

                <Text style={{ marginTop: 20, paddingBottom: 10 }}>Выберите тариф:</Text>
                <PriceList
                    prices={wash.prices}
                    selected={selectedPrice}
                    onSelect={setSelectedPrice}
                />

                <Text style={{ marginTop: 20, marginBottom: 10 }}>Выберите время:</Text>
                <Slots
                    slots={wash.slots}
                    selected={selectedSlot}
                    onSelect={setSelectedSlot}
                />
                <Gallery images={wash.images} />
                <LeaveReviewButton washId={wash._id} />
            </View>
        </ScrollView>
    )
}

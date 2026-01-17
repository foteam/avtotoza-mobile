import { ScrollView, Text, View, Platform } from 'react-native'
import {router, useLocalSearchParams} from 'expo-router'
import {useEffect, useState} from 'react'

import { useCarwash } from '@/hooks/useCarwashes'
import { BannerHeader } from '@/components/carwash/BannerHeader'
import { CarNumberInput } from '@/components/carwash/CarNumberInput'
import { PriceList } from '@/components/carwash/PriceList'
import { TimeSlotPicker } from '@/components/carwash/TimeSlotPicker'
import { Gallery } from '@/components/carwash/Gallery'
import { CarwashSkeleton } from '@/components/carwash/CarwashSkeleton'
import { LeaveReviewButton } from '@/components/carwash/LeaveReviewButton'
import { BookButton } from '@/components/carwash/BookButton'
import { PaymentSheet } from '@/components/carwash/PaymentSheet'
import { ReviewsList } from '@/components/carwash/ReviewsList'
import { CarwashMap } from '@/components/carwash/CarwashMap'
import { useReviews } from '@/hooks/useReviews'
import { getRatingFromReviews } from '@/utils/getRatingFromReviews'

import { useGarageCars } from '@/hooks/useGarageCars'
import { SelectCarSheet } from '@/components/carwash/SelectCarSheet'
import { Button } from 'tamagui'
import {useAuthStore} from "@/store/useAuthStore";
import axios from 'axios'
import * as WebBrowser from 'expo-web-browser';

export default function CarwashPage() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { data: wash, isLoading } = useCarwash(id)

    const [carNumber, setCarNumber] = useState('')
    const [selectedPrice, setSelectedPrice] = useState<any>(null)
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

    const [paymentOpen, setPaymentOpen] = useState(false)
    const { reviews } = useReviews(wash?._id)

    const { cars } = useGarageCars()
    const [carSheetOpen, setCarSheetOpen] = useState(false)

    const canBook =
        !!carNumber &&
        !!selectedPrice &&
        !!selectedSlot

    const user = useAuthStore(state => state.user)
    useEffect(() => {
        if (!user) {
            router.replace('/(auth)/login')
        }
    }, [user])

    /// PAYME
    const payWithPayme = async () => {
        const API_URL = 'https://114-29-236-86.cloud-xip.com/api'
        const res = await axios.post(
            `${API_URL}/payme/create-receipt`,
            {
                amount: 19999,
                orderId: 9943,
            }
        )
        console.log("Sended")
        if (res.data?.checkoutUrl) {
            await WebBrowser.openBrowserAsync(
                res.data.checkoutUrl
            )
        }
    }

    // ⛔ Пока редиректим — ничего не рендерим
    if (!user) return null
    if (isLoading) {
        return <CarwashSkeleton />
    }
    if (!wash) return null

    const { rating, count } = getRatingFromReviews(reviews)

    return (
        <>
            {/* ================= CONTENT ================= */}
            <ScrollView showsVerticalScrollIndicator={false}    contentContainerStyle={{
                paddingBottom: canBook ? 100 : 24,
            }} bounces={false}>
                <BannerHeader
                    banner={wash.banner}
                    name={wash.name}
                    isPremium={wash.isPremium}
                    address={wash.address}
                    rating={rating}
                    reviewsCount={count}
                />

                <View style={{ padding: 16, backgroundColor: '' }}>
                    <Text style={{ paddingBottom: 15 }}>
                        Номер автомобиля:
                    </Text>

                    {cars.length > 0 && (
                        <Button
                            backgroundColor="#006cff"
                            borderRadius={"$6"}
                            size={"$4.5"}
                            fontSize={14}
                            fontWeight={600}
                            marginBottom="$2"
                            onPress={() => setCarSheetOpen(true)}
                        >
                            Выбрать машину
                        </Button>
                    )}

                    <CarNumberInput
                        value={carNumber}
                        onChange={setCarNumber}
                    />

                    <SelectCarSheet
                        open={carSheetOpen}
                        onOpenChange={setCarSheetOpen}
                        cars={cars}
                        onSelect={(number) => setCarNumber(number)}
                    />


                    <Text style={{ marginTop: 20, paddingBottom: 10 }}>
                        Выберите тариф:
                    </Text>

                    <PriceList
                        prices={wash.prices}
                        selected={selectedPrice}
                        onSelect={setSelectedPrice}
                    />

                    <Text style={{ marginTop: 20, marginBottom: 10 }}>
                        Выберите время:
                    </Text>

                    <TimeSlotPicker
                        slots={wash.slots}
                        value={String(selectedSlot)}
                        onChange={setSelectedSlot}
                    />

                    <Gallery images={wash.images} />
                    <CarwashMap
                        latitude={Number(wash.location[0])}
                        longitude={Number(wash.location[1])}
                        name={wash.name}
                        address={wash.address}
                    />

                    <ReviewsList washId={wash._id} />

                </View>
            </ScrollView>

            {/* ================= OVERLAYS (OUTSIDE SCROLL) ================= */}

            <BookButton
                visible={canBook}
                onPress={() => setPaymentOpen(true)}
            />
            <PaymentSheet
                open={paymentOpen}
                onOpenChange={setPaymentOpen}
                onCard={() => {
                    // createBooking({ method: 'card' })
                    payWithPayme()
                }}
                onCashConfirm={() => {
                    // createBooking({ method: 'cash' })
                }}
            />
        </>
    )
}

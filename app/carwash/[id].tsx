import { ScrollView, Text, View, Platform } from 'react-native'
import {router, useLocalSearchParams} from 'expo-router'
import {useEffect, useState} from 'react'

import { useCarwash } from '@/hooks/useCarwashes'
import { BannerHeader } from '@/components/carwash/BannerHeader'
import { CarNumberInput } from '@/components/carwash/CarNumberInput'
import { PriceList } from '@/components/carwash/PriceList'
import type { SelectedTimeSlot } from '@/components/carwash/TimeSlotPicker'
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
import { BookingInfoModal } from "@/components/carwash/BookingInfoModal";
import { useGarageCars } from '@/hooks/useGarageCars'
import { SelectCarSheet } from '@/components/carwash/SelectCarSheet'
import { BookingLoadingOverlay} from "@/components/carwash/BookingLoadingOverlay";
import { Button } from 'tamagui'
import {useAuthStore} from "@/store/useAuthStore";
import axios from 'axios'
import * as WebBrowser from 'expo-web-browser';
import i18n from "@/i18n";
import {logScreen, logEvent} from "@/lib/analytics";

export default function CarwashPage() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { data: wash, isLoading } = useCarwash(id)

    const [carNumber, setCarNumber] = useState('')
    const [selectedPrice, setSelectedPrice] = useState<any>(null)
    const [selectedSlot, setSelectedSlot] =
        useState<SelectedTimeSlot | null>(null)

    const [paymentOpen, setPaymentOpen] = useState(false)
    const { reviews } = useReviews(wash?._id)

    const { cars } = useGarageCars()
    const [carSheetOpen, setCarSheetOpen] = useState(false)
    const [bookingLoading, setBookingLoading] = useState(false)

    const [bookingModalOpen, setBookingModalOpen] =
        useState(false)
    const [booking, setBooking] =
        useState<any>(null)
    const [paymentLink, setPaymentLink] = useState<string | null>(null)
    const [paymentMode, setPaymentMode] =
        useState<'cash' | 'card'>('cash')


    const canBook =
        !!carNumber &&
        !!selectedPrice &&
        !!selectedSlot
    const user = useAuthStore(state => state.user)
    useEffect(() => {
        if (wash?.name) {
            logScreen(`Car wash screen: ${wash.name}`)
        }
    }, [wash?.name])
    const handleBookingModalClose = () => {
        // 🔴 СЧИТАЕМ, ЧТО МОДАЛКА ЗАКРЫТА
        setBookingModalOpen(false)

        // ♻️ СБРОС ВСЕХ ДАННЫХ
        setBooking(null)
        setPaymentMode('cash')
    }
    const createBooking = async (method: 'cash' | 'card') => {
        const API_URL = 'https://114-29-236-86.cloud-xip.com/api'
        const order_id = Math.floor(100000 + Math.random() * 900000);
        const res = await axios.post(`${API_URL}/booking/from-app/create`, {
            wash: wash?._id,
            fromUser: user?.user_id,
            priceType: `${selectedPrice?.type} – ${selectedPrice?.price}`,
            slot: `${selectedSlot?.day} - ${selectedSlot?.time}`,
            order_id: order_id,
            paymentMethod: method,
            carNumber: carNumber,
            lang: i18n.language,
        })
        logEvent('booking_created', {
            wash: wash?.name,
            price: selectedPrice?.price,
        });
        return res.data
    }

    // ⛔ Пока редиректим — ничего не рендерим

    //if (!user) return null
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
                        {i18n.t('booking.inputCarNumber')}
                    </Text>

                    {user && cars.length > 0 && (
                        <Button
                            backgroundColor="#006cff"
                            borderRadius={"$6"}
                            size={"$4.5"}
                            fontSize={14}
                            fontWeight={600}
                            marginBottom="$2"
                            onPress={() => setCarSheetOpen(true)}
                        >
                            {i18n.t('booking.selectCar')}
                        </Button>
                    )}

                    <CarNumberInput
                        value={carNumber}
                        onChange={setCarNumber}
                    />

                    {user && cars.length > 0 && (
                        <SelectCarSheet
                            open={carSheetOpen}
                            onOpenChange={setCarSheetOpen}
                            cars={cars}
                            onSelect={(number) => setCarNumber(number)}
                        />
                    )}


                    <Text style={{ marginTop: 20, paddingBottom: 10 }}>
                        {i18n.t('booking.selectTariff')}
                    </Text>

                    <PriceList
                        prices={wash.prices}
                        selected={selectedPrice}
                        onSelect={setSelectedPrice}
                    />

                    <Text style={{ marginTop: 20, marginBottom: 10 }}>
                        {i18n.t('booking.selectTime')}
                    </Text>

                    <TimeSlotPicker
                        slots={wash.slots}
                        value={selectedSlot ?? undefined}
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
                onPress={() => {
                    if (!user) {
                        router.replace('/(auth)/login')
                        return
                    }
                    setPaymentOpen(true)
                }}
            />
            <BookingInfoModal
                open={bookingModalOpen}
                onClose={handleBookingModalClose}
                onSuccessComplete={() => {
                    setBooking(null)
                    setPaymentMode('cash')
                }}
                booking={booking}
                mode={paymentMode}
                paymentLink={paymentLink as string}
            />
            <BookingLoadingOverlay open={bookingLoading} />
            <PaymentSheet
                open={paymentOpen}
                onOpenChange={setPaymentOpen}
                onCard={async () => {
                    try {
                        setBookingLoading(true)
                        setPaymentOpen(false)

                        const { booking, paymentLink } =
                            await createBooking('card')

                        setBooking(booking)
                        setPaymentLink(paymentLink)
                        setPaymentMode('card')
                        setBookingModalOpen(true)

                        if (paymentLink) {
                            await WebBrowser.openBrowserAsync(paymentLink)
                        }
                    } finally {
                        setCarNumber('')
                        setSelectedSlot(null)
                        setSelectedPrice(null)
                        setBookingLoading(false)
                    }
                }}

                onCashConfirm={async () => {
                    try {
                        setBookingLoading(true)       // 🔹 показать лоадер
                        setPaymentOpen(false)

                        const { booking } = await createBooking('cash')

                        setBooking(booking)
                        setPaymentMode('cash')
                        setBookingModalOpen(true)
                    } finally {
                        setCarNumber('')
                        setSelectedSlot(null)
                        setSelectedPrice(null)
                        setBookingLoading(false)      // 🔹 скрыть лоадер
                    }
                }}
                user={user}
            />
        </>
    )
}

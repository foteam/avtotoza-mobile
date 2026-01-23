import {useCallback, useEffect, useState, useRef} from 'react'
import { Linking, Platform } from 'react-native'
import { Sheet, YStack, XStack, Text, Button, Spinner, Separator } from 'tamagui'
import axios from 'axios'
import { Animated, Easing } from 'react-native'
import i18n from "@/i18n";
import {formatTariffName} from "@/utils/formatTariff";
import {useBookingStatus} from "@/hooks/useBookingStatus";
import * as WebBrowser from "expo-web-browser";
import {useTranslation} from "react-i18next";

const API_URL = 'https://114-29-236-86.cloud-xip.com/api'
type Booking = {
    _id: string
    order_id: string
    status: 'created' | 'pending' | 'paid' | 'completed' | 'cancelled'
    wash: {
        name: string
        address?: string
        location: [number, number] // [lat, lng]
    }
    priceType: string
    slot: string
    fromUser: string
    carNumber: string
    paymentLink: string
}

type Props = {
    open: boolean
    onClose: () => void
    onSuccessComplete: () => void   // 👈 НОВОЕ
    booking: Booking | null
    mode: 'cash' | 'card'
    paymentLink: string
}

type DayKey = 'today' | 'tomorrow' | 'after_tomorrow'

type StatusKey = 'created' | 'pending' | 'paid' | 'completed' | 'cancelled'

export function BookingInfoModal({
                                     open,
                                     onClose,
    onSuccessComplete,
                                     booking,
                                     mode,
                                     paymentLink,
                                 }: Props) {
    const [status, setStatus] = useState<
        Booking['status']
    >(booking?.status ?? 'created')

    const {t} = useTranslation()
    const LABELS_DATE : Record<DayKey, string> = {
        "today":  t('booking.today') as string,
        "tomorrow": t('booking.tomorrow') as string,
        "after_tomorrow": t('booking.afterTomorrow') as string,
    }
    const LABELS_STATUS : Record<StatusKey, string> = {
        created: t('booking.bookingModal.status.created'),
        pending: t('booking.bookingModal.status.pending'),
        paid: t('booking.bookingModal.status.paid'),
        completed: t('booking.bookingModal.status.completed'),
        cancelled: t('booking.bookingModal.status.cancelled')
    }
    const scale = useRef(new Animated.Value(0.9)).current
    const opacity = useRef(new Animated.Value(0)).current
    const ringScale = useRef(new Animated.Value(0.6)).current
    const ringOpacity = useRef(new Animated.Value(0)).current
    const closeOpacity = useRef(new Animated.Value(1)).current
    const closeTranslate = useRef(new Animated.Value(0)).current
    const [snapP, setSnapP] = useState(Platform.OS === 'ios' ? 61 : 64);

    if (paymentLink === "" && booking?.paymentLink){
        paymentLink = booking.paymentLink
        console.log(paymentLink)
    }

    useBookingStatus({
        bookingId: booking?.order_id,
        enabled: open && mode === 'card' && status !== 'paid',
        onPaid: () => {
            setStatus('paid')
        },
    })

    useEffect(() => {
        if (status !== 'paid') return
        setSnapP(Platform.OS === 'ios' ? 80 : 83)

        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 250,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 300,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.sequence([
                Animated.delay(120),
                Animated.parallel([
                    Animated.timing(ringOpacity, {
                        toValue: 0.15,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(ringScale, {
                        toValue: 1.6,
                        duration: 600,
                        easing: Easing.out(Easing.cubic),
                        useNativeDriver: true,
                    }),
                ]),
            ]),
        ]).start()
    }, [status])
    useEffect(() => {
        if (open) {
            scale.setValue(0.9)
            opacity.setValue(0)
            ringScale.setValue(0.6)
            ringOpacity.setValue(0)
            setStatus(booking?.status ?? 'created')
            setSnapP(Platform.OS === 'ios' ? 61 : 64)
        }
    }, [open])

    if (!booking) return null

    const openInMaps = () => {
        const [lat, lng] = [booking.wash.location[0], booking.wash.location[1]]

        const url = Platform.select({
            ios: `maps://?q=${lat},${lng}`,
            android: `geo:${lat},${lng}?q=${lat},${lng}`,
        })

        if (url) Linking.openURL(url)
    }

    const openPayment = async () => {
        await WebBrowser.openBrowserAsync(paymentLink)
    }

    const animateClose = () => {
        Animated.parallel([
            Animated.timing(closeOpacity, {
                toValue: 0,
                duration: 180,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(closeTranslate, {
                toValue: 20,
                duration: 180,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start(() => {
            // ⬇️ после анимации реально закрываем
            onClose()
        })
    }

    // @ts-ignore
    return (
        <Sheet
            open={open}
            onOpenChange={(v:any) => !v && onClose()}
            snapPoints={[snapP]}
        >
            <Sheet.Overlay />
            <Sheet.Frame padding="$5" gap="$4" borderRadius={"$10"} backgroundColor={"white"}>

                {/* HEADER */}
                <Text fontSize="$6" fontWeight="700" color="black">
                    {i18n.t('booking.bookingModal.title')}
                </Text>

                {/* INFO */}
                <YStack gap="$2">
                    <InfoRow label={i18n.t('booking.bookingModal.orderId')} value={`#${booking.order_id}`} />
                    <Separator borderWidth={"$0.6"} borderStyle={"dashed"} width={"100%"} alignSelf={"center"} borderColor={"$gray10"}/>
                    <InfoRow label={i18n.t('booking.bookingModal.washName')} value={booking.wash?.name} />
                    <Separator borderWidth={"$0.6"} borderStyle={"dashed"} width={"100%"} alignSelf={"center"} borderColor={"$gray10"}/>
                    <InfoRow label={i18n.t('booking.bookingModal.carNumber')} value={booking.carNumber} />
                    <Separator borderWidth={"$0.6"} borderStyle={"dashed"} width={"100%"} alignSelf={"center"} borderColor={"$gray10"}/>
                    <InfoRow
                        label={i18n.t('booking.bookingModal.date')}
                        value={`${booking.status === "completed" ? LABELS_STATUS.completed : LABELS_DATE[booking.slot.split(' - ')[0] as DayKey] || t('booking.today') } · ${booking.slot.split(' - ')[1] || booking.slot}`}
                    />
                    <Separator borderWidth={"$0.6"} borderStyle={"dashed"} width={"100%"} alignSelf={"center"} borderColor={"$gray10"}/>
                    <InfoRow label={i18n.t('booking.bookingModal.tariff')} value={formatTariffName(booking.priceType.split(' – ')[0])} />
                    <Separator borderWidth={"$0.6"} borderStyle={"dashed"} width={"100%"} alignSelf={"center"} borderColor={"$gray10"}/>
                    <InfoRow
                        label={i18n.t('booking.bookingModal.price')}
                        value={`${Number(booking.priceType.split(' – ')[1]).toLocaleString()} ${i18n.t('common.uzs')}`}
                    />
                    <Separator borderWidth={"$0.6"} borderStyle={"dashed"} width={"100%"} alignSelf={"center"} borderColor={"$gray10"}/>
                    <InfoRow
                        label={i18n.t('booking.bookingModal.status.status')}
                        value={`${LABELS_STATUS[status]}`}
                    />
                </YStack>

                {/* STATUS */}
                {mode === 'card' && status !== 'paid' && (
                    <XStack
                        alignItems="center"
                        gap="$2"
                        marginTop="$3"
                    >
                        <Spinner />
                        <Text color="$gray10">
                            {i18n.t('booking.bookingModal.pendingPayment')}
                        </Text>
                    </XStack>
                )}

                {status === 'paid' && (
                    <YStack alignItems="center" marginTop="$5">
                        {/* PULSE RING */}


                        {/* CHECK CIRCLE */}
                        <Animated.View
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                backgroundColor: '#22c55e',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity,
                                transform: [{ scale }],
                            }}
                        >
                            <Text
                                fontSize={38}
                                fontWeight="700"
                                color="white"
                            >
                                ✓
                            </Text>
                        </Animated.View>

                        <Text
                            marginTop="$4"
                            fontSize="$6"
                            fontWeight="700"
                            color={"#006cff"}
                        >
                            {i18n.t('booking.bookingModal.successPayment')}
                        </Text>

                        <Text
                            marginTop="$1"
                            color="$gray10"
                            fontSize="$3"
                        >
                            {i18n.t('booking.bookingModal.bookingAccepted')}
                        </Text>
                    </YStack>
                )}
                {/* ACTIONS */}
                <YStack gap="$3" marginTop="$4">
                    {status === 'pending' && (
                        <Button
                            onPress={openInMaps}
                            theme="blue"
                            backgroundColor={"#006cff"}
                        >
                            <Text fontWeight={600} color={"white"}>{i18n.t('booking.bookingModal.openNavigator')}</Text>
                        </Button>
                    )}
                    {status === 'paid' && (
                        <Button
                            onPress={openInMaps}
                            theme="blue"
                            backgroundColor={"#006cff"}
                        >
                            <Text fontWeight={600} color={"white"}>{i18n.t('booking.bookingModal.openNavigator')}</Text>
                        </Button>
                    )}
                    {status === "created" && mode === "card" && (
                        <Button
                            onPress={openPayment}
                            theme="blue"
                            backgroundColor={"#006cff"}
                        >
                            <Text fontWeight={600} color={"white"}>{i18n.t('booking.bookingModal.openPayment')}</Text>
                        </Button>
                    )}

                    <Button
                        onPress={onClose}
                        theme="gray"
                    >
                        {i18n.t('booking.bookingModal.close')}
                    </Button>
                </YStack>
            </Sheet.Frame>
        </Sheet>
    )
}

function InfoRow({
                     label,
                     value,
                 }: {
    label: string
    value: string
}) {
    return (
        <XStack justifyContent="space-between">
            <Text color="$gray10">{label}</Text>
            <Text fontWeight="600" color={"black"}>{value}</Text>
        </XStack>
    )
}

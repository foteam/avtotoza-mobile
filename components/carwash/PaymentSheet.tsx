import { Sheet, YStack, Text, Button, XStack, Card } from 'tamagui'
import { useState } from 'react'
import { CreditCard, Banknote } from '@tamagui/lucide-icons'
import {Platform} from "react-native";
import i18n from "@/i18n";

type Step = 'method' | 'cash-confirm'

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onCard: () => void
    onCashConfirm: () => void
    user: any
}

export function PaymentSheet({
                                 open,
                                 onOpenChange,
                                 onCard,
                                 onCashConfirm,
                                user
                             }: Props) {
    const [step, setStep] = useState<Step>('method')

    const close = () => {
        setStep('method')
        onOpenChange(false)
    }
    console.log(Platform.OS)

    return (
        <Sheet
            modal
            open={open}
            onOpenChange={(v: boolean) => {
                if (!v) setStep('method')
                onOpenChange(v)
            }}
            snapPoints={[Platform.OS === 'ios' ? 43 : 40]}
            dismissOnSnapToBottom
            zIndex={100_000}

            // 🔥 ВАЖНО: ускоряем lifecycle
            animation="quick"
        >
            {/* ================= OVERLAY ================= */}
            <Sheet.Overlay
                // ⬇️ КЛЮЧЕВОЙ ФИКС
                animation="quick"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
                opacity={0.45}
            />

            {/* ================= FRAME ================= */}
            <Sheet.Frame
                padding="$5"
                gap="$5"
                backgroundColor="white"
                borderTopLeftRadius="$10"
                borderTopRightRadius="$10"
                animation="quick"
                enterStyle={{ y: 20, opacity: 0 }}
                exitStyle={{ y: 20, opacity: 0 }}
            >
                <Sheet.Handle backgroundColor="$white5" height={"$0.5"} width={"$2"} alignSelf={"center"} bottom={"$2"} />

                {/* ================= STEP: METHOD ================= */}
                {step === 'method' && (
                    <YStack gap="$5" bottom={"$5"}>
                        <YStack gap="$2">
                            <Text fontSize="$6" fontWeight="700" color={"black"}>
                                {i18n.t('booking.paymentMethod.payTitle')}
                            </Text>
                            <Text color="$gray10">
                                {i18n.t('booking.paymentMethod.payDescription')}
                            </Text>
                        </YStack>

                        {/* CARD */}
                        <Card
                            bordered
                            pressStyle={{ scale: 0.985 }}
                            backgroundColor="#006cff"
                            borderColor="transparent"
                            animation="quick"
                            onPress={() => {
                                close()
                                onCard()
                            }}
                        >
                            <XStack
                                padding="$4"
                                gap="$4"
                                alignItems="center"
                            >
                                <XStack
                                    width={48}
                                    height={48}
                                    borderRadius="$5"
                                    backgroundColor="#0751ac"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <CreditCard size={24} color="white" />
                                </XStack>

                                <YStack flex={1} gap="$1">
                                    <Text fontSize="$3" fontWeight="600">
                                        {i18n.t('booking.paymentMethod.card')}
                                    </Text>
                                    <Text fontSize="$2" color="$white">
                                        {user.promoCodeDiscount > 1 ? (
                                            i18n.t('booking.paymentMethod.cardDescription') + user.promoCodeDiscount + "%"
                                        ) : (
                                            i18n.t('booking.paymentMethod.cashDescription')
                                        )}
                                    </Text>
                                </YStack>

                                <Text color="white" fontSize="$6" >
                                    ›
                                </Text>
                            </XStack>
                        </Card>

                        {/* CASH */}
                        <Card
                            bordered
                            backgroundColor="$white5"
                            borderColor="transparent"
                            animation="quick"
                            pressStyle={{ scale: 0.985 }}
                            onPress={() => setStep('cash-confirm')}
                        >
                            <XStack
                                padding="$4"
                                gap="$4"
                                alignItems="center"
                            >
                                <XStack
                                    width={48}
                                    height={48}
                                    borderRadius="$5"
                                    backgroundColor="$gray4"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Banknote size={24} color="white" />
                                </XStack>

                                <YStack flex={1} gap="$1">
                                    <Text fontSize="$3" fontWeight="600" color={"black"}>
                                        {i18n.t('booking.paymentMethod.cash')}
                                    </Text>
                                    <Text fontSize="$2" color="$gray10">
                                        {i18n.t('booking.paymentMethod.cashDescription')}
                                    </Text>
                                </YStack>

                                <Text color="$gray9" fontSize="$6">
                                    ›
                                </Text>
                            </XStack>
                        </Card>
                    </YStack>
                )}

                {/* ================= STEP: CASH CONFIRM ================= */}
                {step === 'cash-confirm' && (
                    <YStack gap="$5" bottom={"$5"}>
                        <YStack gap="$2">
                            <Text fontSize="$6" fontWeight="700" color={"black"}>
                                {i18n.t('booking.paymentMethod.cashTitle')}
                            </Text>
                            <Text color="$gray10" lineHeight={20}>
                                {i18n.t('booking.paymentMethod.cashAttention')}
                            </Text>
                        </YStack>

                        <XStack gap="$3" marginTop="$2">
                            <Button
                                flex={1}
                                size="$5"
                                fontSize={"$3"}
                                theme="gray"
                                animation="quick"
                                onPress={() => setStep('method')}
                            >
                                {i18n.t('booking.paymentMethod.cashBack')}
                            </Button>

                            <Button
                                flex={1}
                                size="$5"
                                fontSize={"$3"}
                                backgroundColor={"#006cff"}
                                animation="quick"
                                onPress={() => {
                                    close()
                                    onCashConfirm()
                                }}
                            >
                                {i18n.t('booking.paymentMethod.cashButton')}
                            </Button>
                        </XStack>
                    </YStack>
                )}
            </Sheet.Frame>
        </Sheet>
    )
}

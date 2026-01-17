import { Sheet, YStack, Text, Button, XStack, Card } from 'tamagui'
import { useState } from 'react'
import { CreditCard, Banknote } from '@tamagui/lucide-icons'
import {Platform} from "react-native";

type Step = 'method' | 'cash-confirm'

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onCard: () => void
    onCashConfirm: () => void
}

export function PaymentSheet({
                                 open,
                                 onOpenChange,
                                 onCard,
                                 onCashConfirm,
                             }: Props) {
    const [step, setStep] = useState<Step>('method')

    const close = () => {
        setStep('method')
        onOpenChange(false)
    }

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
                                Оплата
                            </Text>
                            <Text color="$gray10">
                                Выберите способ оплаты
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
                                        Карта
                                    </Text>
                                    <Text fontSize="$2" color="$white">
                                        Скидка 10%
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
                                        Наличные
                                    </Text>
                                    <Text fontSize="$2" color="$gray10">
                                        Без скидки
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
                                Подтверждение
                            </Text>
                            <Text color="$gray10" lineHeight={20}>
                                Мы временно проверим карту через Payme, чтобы
                                защитить бронирование. Средства списаны не будут.
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
                                Назад
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
                                Подтвердить
                            </Button>
                        </XStack>
                    </YStack>
                )}
            </Sheet.Frame>
        </Sheet>
    )
}

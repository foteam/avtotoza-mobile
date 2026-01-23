import { Sheet, YStack, Text, XStack, Card } from 'tamagui'
import { Image, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { formatCarNumber } from '@/utils/carNumber'
import i18n from "@/i18n";

type Props = {
    open: boolean
    onOpenChange: (v: boolean) => void
    cars: any[]
    onSelect: (carNumber: string) => void
}

export function SelectCarSheet({
                                   open,
                                   onOpenChange,
                                   cars,
                                   onSelect,
                               }: Props) {
    return (
        <Sheet
            modal
            open={open}
            onOpenChange={onOpenChange}
            snapPoints={[65]}
            dismissOnSnapToBottom
        >
            <Sheet.Overlay opacity={0.5} />

            <Sheet.Frame
                padding="$4"
                gap="$4"
                backgroundColor="white"
                borderTopLeftRadius="$10"
                borderTopRightRadius="$10"
            >
                <Sheet.Handle
                    backgroundColor="#E5E5E5"
                    height={4}
                    width={40}
                    alignSelf="center"
                    borderRadius={10}
                />

                <Text fontSize="$6" fontWeight="800" color="black">
                    {i18n.t('booking.selectCar')}
                </Text>

                <ScrollView
                    style={{ flex: 1, backgroundColor: 'white', overflowY: 'hidden' }}
                    contentContainerStyle={{
                        gap: 16,
                        paddingBottom: 26,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {cars.map((car) => (
                        <Card
                            key={car._id}
                            borderRadius={20}
                            overflow={"hidden"}
                            pressStyle={{ scale: 0.97 }}
                            animation="quick"
                            elevation="$3"
                            onPress={() => {
                                onSelect(formatCarNumber(car.plateNumber))
                                onOpenChange(false)
                            }}
                        >
                            {/* BACKGROUND IMAGE */}
                            <Image
                                source={{
                                    uri:
                                        car.image ||
                                        'https://i.3dmodels.org/uploads/Lexus/141_Lexus_RX_hybrid_F_Sport_2022/Lexus_RX_hybrid_F_Sport_2022_1000_0005.jpg',
                                }}
                                style={{
                                    width: '100%',
                                    height: 150,
                                }}
                                resizeMode="cover"
                            />

                            {/* DARK GRADIENT */}
                            <LinearGradient
                                colors={['rgba(0,0,0,0.85)', 'rgba(0,0,0,0.05)']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 0, y: 0 }}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    height: '100%',
                                }}
                            />

                            {/* CONTENT */}
                            <XStack
                                position="absolute"
                                bottom={12}
                                left={14}
                                right={14}
                                alignItems="center"
                                gap={10}
                            >

                                {/* TEXT */}
                                <YStack flex={1}>
                                    <Text
                                        fontSize="$5"
                                        fontWeight="800"
                                        color="white"
                                    >
                                        {formatCarNumber(car.plateNumber)}
                                    </Text>

                                    {(car.brand || car.model) && (
                                        <Text
                                            fontSize="$3"
                                            color="rgba(255,255,255,0.85)"
                                        >
                                            {car.brand.replace("_", " ")} {car.model}
                                        </Text>
                                    )}
                                </YStack>
                            </XStack>
                        </Card>
                    ))}
                </ScrollView>
            </Sheet.Frame>
        </Sheet>
    )
}

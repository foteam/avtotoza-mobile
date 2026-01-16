import { Sheet, YStack, Text, XStack, Card } from 'tamagui'
import { Image } from 'react-native'

import { formatCarNumber } from '@/utils/carNumber'

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
            <Sheet.Overlay opacity={0.4} />

            <Sheet.Frame padding="$4" gap="$4" backgroundColor="white"
                         borderTopLeftRadius="$10"
                         borderTopRightRadius="$10"
            >
                <Sheet.Handle backgroundColor="$white5" height={"$0.5"} width={"$2"} alignSelf={"center"} bottom={"$2"} />

                <Text fontSize="$6" fontWeight="700" color="black">
                    Выберите автомобиль
                </Text>

                <YStack gap="$3">
                    {cars.map((car) => (
                        <Card
                            key={car._id}
                            bordered
                            pressStyle={{ scale: 0.97 }}
                            animation="quick"
                            onPress={() => {
                                onSelect(formatCarNumber(car.plateNumber))
                                onOpenChange(false)
                            }}
                        >
                            <XStack
                                padding="$3"
                                gap="$3"
                                alignItems="center"
                            >
                                {/* IMAGE */}
                                <Image
                                    source={{
                                        uri:
                                            car.image ||
                                            'https://cdn-icons-png.flaticon.com/512/741/741407.png',
                                    }}
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 12,
                                        backgroundColor: '#f2f2f2',
                                    }}
                                    resizeMode="contain"
                                />

                                {/* INFO */}
                                <YStack flex={1} gap="$1">
                                    <Text fontSize="$5" fontWeight="700">
                                        {formatCarNumber(car.plateNumber)}
                                    </Text>

                                    {(car.brand || car.model) && (
                                        <Text
                                            fontSize="$3"
                                            color="$gray10"
                                        >
                                            {car.brand} {car.model}
                                        </Text>
                                    )}
                                </YStack>
                            </XStack>
                        </Card>
                    ))}
                </YStack>
            </Sheet.Frame>
        </Sheet>
    )
}

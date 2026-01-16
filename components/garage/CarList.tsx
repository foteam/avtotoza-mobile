import { FlatList } from 'react-native'
import { CarCard } from './CarCard'

export type GarageCar = {
    _id: string
    brand: string
    model: string
    plateNumber?: string
    image?: string | null
    isPrimary: boolean
    cleanliness: number
}

type Props = {
    data: GarageCar[]
    onSelect?: (car: GarageCar) => void
}

export function CarList({ data, onSelect }: Props) {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                gap: 16,
                paddingBottom: 160, // под FAB
            }}
            renderItem={({ item }) => (
                <CarCard
                    brand={item.brand}
                    model={item.model}
                    plate={formatPlate(item.plateNumber)}
                    image={item.image}
                    isPrimary={item.isPrimary}
                    cleanliness={item.cleanliness}
                    onPress={() => onSelect?.(item)}
                />
            )}
        />
    )
}

/**
 * Форматируем номер красиво: 01A123BC → 01 A 123 BC
 */
function formatPlate(plate?: string) {
    if (!plate) return ''
    return plate.replace(
        /^(\d{2})([A-Z])(\d{3})([A-Z]{2})$/,
        '$1 $2 $3 $4'
    )
}

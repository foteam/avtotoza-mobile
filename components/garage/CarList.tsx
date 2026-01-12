import { FlatList } from 'react-native'
import { CarCard } from './CarCard'

type Car = {
    id: string
    brand: string
    model: string
    plate: string
    image?: string
}

type Props = {
    data: Car[]
    onSelect?: (car: Car) => void
}

export function CarList({ data, onSelect }: Props) {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                gap: 16,
                paddingBottom: 160, // под кнопку
            }}
            renderItem={({ item }) => (
                <CarCard
                    brand={item.brand}
                    model={item.model}
                    plate={item.plate}
                    image={item.image}
                    onPress={() => onSelect?.(item)}
                />
            )}
        />
    )
}

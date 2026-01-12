import { View, Image, ScrollView, StyleSheet, Pressable } from 'react-native'

type Props = {
    images: string[]
    onPressImage?: (index: number) => void
}

export function Gallery({ images, onPressImage }: Props) {
    if (!images || images.length === 0) return null

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {images.map((uri, index) => (
                <Pressable
                    key={uri + index}
                    onPress={() => onPressImage?.(index)}
                >
                    <Image
                        source={{ uri }}
                        style={styles.image}
                    />
                </Pressable>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        gap: 12,
        paddingTop: 30
    },

    image: {
        width: 220,
        height: 140,
        borderRadius: 16,
        backgroundColor: '#EEE',
    },
})

import { View, StyleSheet } from 'react-native'

export function GarageSkeleton() {
    return (
        <View style={styles.container}>
            {[1, 2].map((i) => (
                <View key={i} style={styles.card} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        gap: 16,
    },
    card: {
        height: 190,
        borderRadius: 24,
        backgroundColor: '#E5E5EA',
    },
})

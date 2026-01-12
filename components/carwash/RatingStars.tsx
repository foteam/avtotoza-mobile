import { XStack } from 'tamagui'
import { Pressable, View, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

export function RatingStars({
                                value,
                                onChange,
                            }: {
    value: number
    onChange: (v: number) => void
}) {
    return (
        <XStack gap="$2">
            {[1, 2, 3, 4, 5].map((i) => {
                const active = i <= value

                return (
                    <Pressable
                        key={i}
                        onPress={() => onChange(i)}
                        style={{ padding: 2 }}
                    >
                        {active ? (
                            <View style={styles.glowWrap}>
                                <LinearGradient
                                    colors={['#FFE7A3', '#FFD24C', '#E6B800']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.starWrap}
                                >
                                    <MaterialCommunityIcons
                                        name="star"
                                        size={30}
                                        color="#4A3A00"
                                    />
                                </LinearGradient>
                            </View>
                        ) : (
                            <MaterialCommunityIcons
                                name="star-outline"
                                size={30}
                                color="#D1D1D6"
                            />
                        )}
                    </Pressable>
                )
            })}
        </XStack>
    )
}

const styles = StyleSheet.create({
    glowWrap: {
        shadowColor: '#FFD24C',
        shadowOpacity: 0.9,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 0 },
        elevation: 6, // Android glow
    },
    starWrap: {
        borderRadius: 6,
        padding: 2,
    },
})

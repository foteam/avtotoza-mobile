import { View, Text, StyleSheet, Image } from 'react-native'
import { useTheme } from 'react-native-paper'

export function ProfileHeader() {
    const { colors } = useTheme()

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: 'https://i.pravatar.cc/200',
                }}
                style={styles.avatar}
            />

            <View>
                <Text style={[styles.name, { color: colors.onSurface }]}>
                    Sarvar
                </Text>
                <Text style={[styles.phone, { color: colors.secondary }]}>
                    +998 90 123 45 67
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 16,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#E5E5EA',
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
    },
    phone: {
        marginTop: 4,
        fontSize: 14,
    },
})

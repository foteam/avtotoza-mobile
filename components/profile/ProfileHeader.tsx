import { View, Text, StyleSheet, Image } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useAuthStore } from '@/store/useAuthStore'

export function ProfileHeader() {
    const { colors } = useTheme()
    const user = useAuthStore((s) => s.user)

    if (!user) return null

    const avatarUri =

        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name || 'User'
        )}&background=4D77FF&color=fff`

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: avatarUri }}
                style={styles.avatar}
            />

            <View>
                <Text style={[styles.name, { color: colors.onSurface }]}>
                    {user.name || 'Пользователь'}
                </Text>

                <Text style={[styles.phone, { color: colors.secondary }]}>
                    {user.phone}
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

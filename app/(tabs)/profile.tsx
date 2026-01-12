import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useTheme } from 'react-native-paper'
import { ProfileHeader } from '../../components/profile/ProfileHeader'
import { ProfileRow } from '../../components/profile/ProfileRow'
import {useAuthStore} from "@/store/useAuthStore";
import { router } from 'expo-router'
export default function ProfilePage() {
    const { colors } = useTheme()
    const isLoggedIn = !!useAuthStore.getState().user
    if (!isLoggedIn) {
        return router.push('/login')
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* 🍎 Large Title */}
                <Text style={[styles.title, { color: colors.onSurface }]}>
                    Профиль
                </Text>

                {/* 👤 Header */}
                <ProfileHeader />

                {/* 📋 Section */}
                <View style={[styles.section, { backgroundColor: colors.surface }]}>
                    <ProfileRow label="Мои автомобили" icon="car" />
                    <ProfileRow label="Мои заказы" icon="clipboard-text" />
                    <ProfileRow label="Способы оплаты" icon="credit-card-outline" />
                </View>

                {/* ⚙️ Section */}
                <View style={[styles.section, { backgroundColor: colors.surface }]}>
                    <ProfileRow label="Уведомления" icon="bell-outline" />
                    <ProfileRow label="Поддержка" icon="lifebuoy" />
                    <ProfileRow label="О приложении" icon="information-outline" />
                </View>

                {/* 🚪 Logout */}
                <View style={[styles.section, { backgroundColor: colors.surface }]}>
                    <ProfileRow label="Выйти" icon="logout" />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },

    content: {
        paddingBottom: 40,
    },

    title: {
        fontSize: 34,
        fontWeight: '700',
        marginTop: 50,
        marginBottom: 12,
    },

    section: {
        borderRadius: 14,
        overflow: 'hidden',
        marginTop: 16,
    },
})

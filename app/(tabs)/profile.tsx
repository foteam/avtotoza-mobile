import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { ProfileHeader } from '../../components/profile/ProfileHeader'
import { ProfileRow } from '../../components/profile/ProfileRow'
import {useAuthStore} from "@/store/useAuthStore";
import { router } from 'expo-router'
import {useTranslation} from "react-i18next";

export default function ProfilePage() {
    const { colors } = useTheme()
    const {t } = useTranslation()
    const user = useAuthStore(state => state.user)
    useEffect(() => {
        if (!user) {
            router.replace('/(auth)/login')
        }
    }, [user])

    console.log(useAuthStore.getState().lang)
    // ⛔ Пока редиректим — ничего не рендерим
    if (!user) return null

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* 🍎 Large Title */}
            <Text style={[styles.title, { color: colors.onSurface }]}>
                {t('profile.title')}
            </Text>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >

                {/* 👤 Header */}
                <ProfileHeader />

                {/* 📋 Section */}
                <View style={[styles.section, { backgroundColor: colors.surface }]}>
                    <ProfileRow label={t('profile.myCars')} icon="car" onPress={() => router.push('/garage')} />
                    <ProfileRow label={t('profile.myOrders')} icon="clipboard-text" onPress={() => router.push('/bookings/bookings')}/>
                    <ProfileRow label={t('profile.paymentMethod')} icon="credit-card-outline" />
                </View>

                {/* ⚙️ Section */}
                <View style={[styles.section, { backgroundColor: colors.surface }]}>
                    <ProfileRow label={t('profile.notifications')} icon="bell-outline" />
                    <ProfileRow label={t('profile.support')} icon="lifebuoy" />
                    <ProfileRow label={t('profile.info')} icon="information-outline" />
                </View>

                {/* 🚪 Logout */}
                <View style={[styles.section, { backgroundColor: colors.surface }]}>
                    <ProfileRow label={t('profile.logout')} icon="logout"  onPress={() =>
                    useAuthStore.getState().logout()} />
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

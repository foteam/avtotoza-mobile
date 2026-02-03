import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native'
import { useTheme } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { ProfileHeader } from '../../components/profile/ProfileHeader'
import { ProfileRow } from '../../components/profile/ProfileRow'
import {useAuthStore} from "@/store/useAuthStore";
import { router } from 'expo-router'
import {useTranslation} from "react-i18next";
import * as WebBrowser from "expo-web-browser";
import {logScreen} from "@/lib/analytics";
import {
    Dialog,
    Button,
    XStack,
    YStack,
} from 'tamagui'
const API_URL = 'https://114-29-236-86.cloud-xip.com/api/user'

export default function ProfilePage() {
    const { colors } = useTheme()
    const {t } = useTranslation()
    const user = useAuthStore(state => state.user)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        logScreen('Profile Screen');
    }, []);
    useEffect(() => {
        if (!user) {
            router.replace('/(auth)/login')
        }
    }, [user])

    console.log(useAuthStore.getState().lang)

    const deleteUserRequest = async (userId: string) => {
        const response = await fetch(
            `${API_URL}/delete/${userId}`,
            {
                method: 'GET', // ⚠️ если у тебя GET — поменяй на 'GET'
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        const data = await response.json()
        console.log(data)

        if (!response.ok) {
            throw new Error(data.message || 'Ошибка удаления аккаунта')
        }

        return data
    }
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
                    <ProfileRow label={t('profile.paymentMethod')} icon="credit-card-outline" onPress={() => router.push('/infoApp/paymentsMethods')}/>
                </View>

                {/* ⚙️ Section */}
                <View style={[styles.section, { backgroundColor: colors.surface }]}>
                    <ProfileRow label={t('profile.notifications')} icon="bell-outline" onPress={() => router.push('/notifications/notifications')}/>
                    <ProfileRow label={t('profile.support')} icon="lifebuoy"  onPress={async () =>await WebBrowser.openBrowserAsync("https://t.me/avtotoza_support")}/>
                    <ProfileRow label={t('profile.info.title')} icon="information-outline" onPress={() => router.push('/infoApp/aboutApp')}/>
                </View>
                {/* Delete and Logout */}
                <View style={[styles.section, { backgroundColor: colors.surface }]}>
                    <ProfileRow
                        label={t('profile.deleteAccount', 'Удалить профиль')}
                        icon="delete-outline"
                        onPress={() => setDeleteOpen(true)}
                    />
                    <ProfileRow label={t('profile.logout')} icon="logout"  onPress={() =>
                        useAuthStore.getState().logout()} />
                </View>
            </ScrollView>
            <Dialog modal open={deleteOpen} onOpenChange={setDeleteOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay
                        key="overlay"
                        animation={"75ms"}
                        exitStyle={{ opacity: 0 }}
                        enterStyle={{ opacity: 0 }}
                    />

                    <Dialog.Content
                        elevate
                        backgroundColor={"#FFF"}
                        key="content"
                        width="90%"
                        maxWidth={420}
                    >
                        <YStack gap="$3">
                            <Dialog.Title color={"black"} fontWeight={700}>
                                {t('profile.delete.title', 'Удалить профиль?')}
                            </Dialog.Title>

                            <Dialog.Description color={"black"}>
                                {t(
                                    'profile.delete.description',
                                    'Это действие нельзя отменить'
                                )}
                            </Dialog.Description>

                            <XStack justifyContent="flex-end" gap="$2" mt="$4">
                                <Button
                                    onPress={() => setDeleteOpen(false)}
                                    theme={"light_gray_surface2"}
                                >
                                    {t('common.cancel', 'Отмена')}
                                </Button>

                                <Button
                                    theme="light_red"
                                    onPress={async () => {
                                        try {
                                            setIsDeleting(true)

                                            deleteUserRequest(useAuthStore.getState().user?.user_id as string)

                                            useAuthStore.getState().logout()
                                            router.replace('/(auth)/login')
                                        } catch {
                                            // можно показать Toast
                                        } finally {
                                            setIsDeleting(false)
                                            setDeleteOpen(false)
                                        }
                                    }}
                                    disabled={isDeleting}
                                >
                                    <Text style={{fontWeight: 700}}>
                                        {isDeleting
                                            ? t('profile.delete.loading', 'Удаление...')
                                            : t('profile.delete.confirm', 'Удалить')}
                                    </Text>
                                </Button>
                            </XStack>
                        </YStack>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
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

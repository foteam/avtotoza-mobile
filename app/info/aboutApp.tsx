import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native'
import { useTheme } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Application from 'expo-application'
import i18n from '@/i18n'

const appVersion = Application.nativeApplicationVersion
const buildVersion = Application.nativeBuildVersion

export default function AboutAppPage() {
    const { colors } = useTheme()

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* 🍎 Large Title */}
            <Text style={[styles.title, { color: colors.onSurface }]}>
                {i18n.t('profile.info.title', 'О приложении')}
            </Text>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* ABOUT */}
                <View style={styles.card}>
                    <View style={styles.header}>
                        <MaterialCommunityIcons
                            name="information-outline"
                            size={20}
                            color="#2563EB"
                        />
                        <Text style={styles.cardTitle}>AvtoToza</Text>
                    </View>

                    <Text style={styles.desc}>
                        {i18n.t('profile.info.description', 'О приложении')}
                    </Text>
                </View>

                {/* VERSION */}
                <View style={styles.card}>
                    <View style={styles.header}>
                        <MaterialCommunityIcons
                            name="cellphone-check"
                            size={20}
                            color="#16A34A"
                        />
                        <Text style={styles.cardTitle}>{i18n.t('profile.info.version')}</Text>
                    </View>

                    <Text style={styles.desc}>
                        v{Application.nativeApplicationVersion}
                        {Application.nativeBuildVersion
                            ? ` (${Application.nativeBuildVersion})`
                            : ''}
                    </Text>
                </View>

                {/* SOCIALS */}
                <View style={styles.card}>
                    <View style={styles.header}>
                        <MaterialCommunityIcons
                            name="share-variant-outline"
                            size={20}
                            color="#9333EA"
                        />
                        <Text style={styles.cardTitle}>{i18n.t('profile.info.socials')}</Text>
                    </View>

                    <SocialButton
                        icon="instagram"
                        label="Instagram"
                        color="#E1306C"
                        url="https://instagram.com/avtotoza"
                    />

                    <SocialButton
                        icon="telegram"
                        label="Telegram"
                        color="#229ED9"
                        url="https://t.me/avtotoza"
                    />

                    <SocialButton
                        icon="web"
                        label="Сайт"
                        color="#111827"
                        url="https://avtotoza.uz"
                    />
                </View>

                {/* FOOTER */}
                <Text style={styles.footerText}>
                    © {new Date().getFullYear()} {i18n.t('profile.info.copyright')}
                </Text>
            </ScrollView>
        </View>
    )
}

function SocialButton({
                          icon,
                          label,
                          color,
                          url,
                      }: {
    icon: any
    label: string
    color: string
    url: string
}) {
    return (
        <Pressable
            onPress={() => Linking.openURL(url)}
            style={({ pressed }) => [
                styles.socialBtn,
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
            ]}
        >
            <MaterialCommunityIcons name={icon} size={20} color={color} />
            <Text style={styles.socialText}>{label}</Text>
            <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#9CA3AF"
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },

    title: {
        fontSize: 34,
        fontWeight: '700',
        marginTop: 40,
        marginBottom: 20,
        letterSpacing: -0.5,
    },

    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 20,
        padding: 16,
        marginBottom: 14,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },

    desc: {
        fontSize: 14,
        color: '#374151',
        marginTop: 4,
        lineHeight: 20,
    },

    socialBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
    },

    socialText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: '#111827',
    },

    footerText: {
        textAlign: 'center',
        marginTop: 24,
        fontSize: 13,
        color: '#9CA3AF',
    },
})

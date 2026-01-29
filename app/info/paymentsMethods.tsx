import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useTheme } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import i18n from '@/i18n'

export default function PaymentsInfoPage() {
    const { colors } = useTheme()
    const cardList = i18n.t(
        'profile.paymentMethods.payme.list',
        { returnObjects: true }
    ) as string[];
    const cashList = i18n.t(
        'profile.paymentMethods.cash.list',
        { returnObjects: true }
    ) as string[];
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* 🍎 Large Title */}
            <Text style={[styles.title, { color: colors.onSurface }]}>
                {i18n.t('profile.paymentMethods.title', 'Платежи')}
            </Text>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* PAYME */}
                <View style={styles.card}>
                    <View style={styles.header}>
                        <MaterialCommunityIcons
                            name="credit-card-outline"
                            size={20}
                            color="#16A34A"
                        />
                        <Text style={styles.cardTitle}>{i18n.t('profile.paymentMethods.payme.title')}</Text>
                    </View>

                    <Text style={styles.desc}>
                        {i18n.t('profile.paymentMethods.payme.description')}
                    </Text>

                    <View style={styles.list}>
                        {cardList.map((item, index) => (
                            <Text key={index} style={styles.listItem}>
                                {item}
                            </Text>
                        ))}
                    </View>

                </View>

                {/* CASH */}
                <View style={styles.card}>
                    <View style={styles.header}>
                        <MaterialCommunityIcons
                            name="cash-multiple"
                            size={20}
                            color="#2563EB"
                        />
                        <Text style={styles.cardTitle}>{i18n.t('profile.paymentMethods.cash.title')}</Text>
                    </View>

                    <Text style={styles.desc}>
                        {i18n.t('profile.paymentMethods.cash.description')}
                    </Text>

                    <View style={styles.list}>
                        {cashList.map((item, index) => (
                            <Text key={index} style={styles.listItem}>
                                {item}
                            </Text>
                        ))}
                    </View>
                </View>

                {/* FOOT NOTE */}
                <Text style={styles.footerText}>
                    {i18n.t('profile.paymentMethods.note')}
                </Text>
            </ScrollView>
        </View>
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

    list: {
        marginTop: 10,
        gap: 4,
    },

    listItem: {
        fontSize: 14,
        color: '#374151',
    },

    footerText: {
        textAlign: 'center',
        marginTop: 24,
        fontSize: 13,
        color: '#9CA3AF',
    },
})

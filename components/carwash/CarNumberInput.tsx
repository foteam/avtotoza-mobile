import { TextInput, Text, StyleSheet } from 'react-native'
import { formatCarNumber, uzFormat1, uzFormat2 } from '@/utils/carNumber'
import {useTranslation} from "react-i18next";

export function CarNumberInput({ value, onChange }: any) {
    const error =
        value &&
        !uzFormat1.test(value) &&
        !uzFormat2.test(value)

    const {t } = useTranslation()

    return (
        <>
            <TextInput
                value={value}
                onChangeText={(v) => onChange(formatCarNumber(v))}
                placeholder="01 A 234 BC"
                style={[styles.input, error && styles.error]}
            />
            {error && (
                <Text style={styles.errorText}>
                    {t('common.errors.carFormat')}
                </Text>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#FFF',
        padding: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    error: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginTop: 4,
    },
})

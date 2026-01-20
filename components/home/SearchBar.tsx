import { XStack, Input, Text } from 'tamagui'
import { Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

type Props = {
    value: string
    onChange: (text: string) => void
}

export function SearchBar({ value, onChange }: Props) {
    const { t } = useTranslation()
    return (
        <XStack
            alignItems="center"
            bg="#f7f7f7"
            borderRadius="$6"
            px="$3"
            height={48}
            mb="$3"
        >
            {/* 🔍 ICON */}
            <MaterialCommunityIcons
                name="magnify"
                size={20}
                color="#8E8E93"
            />

            {/* INPUT */}
            <Input
                unstyled
                flex={1}
                ml="$2"
                value={value}
                onChangeText={onChange}
                placeholder={t('common.search')}
                fontSize={16}
                color="$text"
                placeholderTextColor="#8E8E93"
                backgroundColor="transparent"
                borderWidth={0}
                focusStyle={{
                    outlineWidth: 0,
                }}
            />

            {/* ❌ CLEAR (опционально) */}
            {value.length > 0 && (
                <Pressable onPress={() => onChange('')}>
                    <MaterialCommunityIcons
                        name="close-circle"
                        size={18}
                        color="#8E8E93"
                    />
                </Pressable>
            )}
        </XStack>
    )
}

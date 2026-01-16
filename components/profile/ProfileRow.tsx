import { Pressable, View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from 'react-native-paper'
import {inspect} from "node:util";
import { colors as myColors } from '@/app/theme/colors'
import {useState} from "react";

type Props = {
    icon: string
    label: string
    onPress?: () => void
}

export function ProfileRow({ icon, label, onPress }: Props) {
    const { colors } = useTheme()
    const [isPressed, setIsPressed] = useState(false)

    const styles = StyleSheet.create({
        row: {
            height: 52,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: isPressed ? "#e8e8e8" : myColors.tgSecondaryBg,
        },
        left: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        label: {
            fontSize: 16,
        },
    })


    return (
        <Pressable onPress={onPress} style={styles.row} onPressIn={() => {setIsPressed(true)}} onPressOut={() => {setIsPressed(false)}}>
            <View style={styles.left}>
                <MaterialCommunityIcons
                    name={icon as any}
                    size={20}
                    color={colors.primary}
                />
                <Text style={[styles.label, { color: colors.onSurface }]}>
                    {label}
                </Text>
            </View>

            <MaterialCommunityIcons
                name="chevron-right"
                size={22}
                color={colors.secondary}
            />
        </Pressable>
    )
}

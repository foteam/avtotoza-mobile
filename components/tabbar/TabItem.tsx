import { Pressable } from 'react-native'
import { XStack, YStack, Text, styled } from 'tamagui'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Item = styled(YStack, {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
})

const IconWrap = styled(XStack, {
    width: 44,
    height: 44,
    borderRadius: '$round',
    alignItems: 'center',
    justifyContent: 'center',

    variants: {
        active: {
            true: {
                bg: '$primary',
            },
            false: {
                bg: 'transparent',
            },
        },
    } as const,
})

const Label = styled(Text, {
    fontSize: 11,
    mt: 4,
    fontWeight: '600',

    variants: {
        active: {
            true: {
                color: '$primary',
                fontWeight: '700',
            },
            false: {
                color: '$textMuted',
            },
        },
    } as const,
})

type Props = {
    icon: string
    label: string
    active: boolean
    onPress: () => void
}

export function TabItem({
                            icon,
                            label,
                            active,
                            onPress,
                        }: Props) {
    return (
        <Pressable onPress={onPress}>
            <Item>
                <IconWrap active={active}>
                    <MaterialCommunityIcons
                        name={icon as any}
                        size={22}
                        color={active ? 'white' : '#4D77FF'}
                    />
                </IconWrap>

                <Label active={active}>{label}</Label>
            </Item>
        </Pressable>
    )
}

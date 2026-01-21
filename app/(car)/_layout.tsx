import { Stack } from 'expo-router'

export default function CarLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'fade'
            }}
        >
            <Stack.Screen
                name="add"
                options={{
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                }}
            />
        </Stack>
    )
}
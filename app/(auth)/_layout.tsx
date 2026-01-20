import { Stack } from 'expo-router'
import {Platform} from "react-native";

export default function AuthLayout() {
    return (
        <Stack>
            {/* login — свайп НУЖЕН */}
            <Stack.Screen
                name="login"
                options={{
                    headerShown: false,
                    gestureEnabled: true,
                    animation: Platform.OS === 'ios' ? 'simple_push' : 'default',
                }}
            />

            {/* otp — свайп ЗАПРЕЩЁН */}
            <Stack.Screen
                name="otp"
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                    animation: Platform.OS === 'ios' ? 'simple_push' : 'default',
                }}
            />

            {/* register — свайп МОЖНО */}
            <Stack.Screen
                name="register"
                options={{
                    headerShown: false,
                    gestureEnabled: true,
                    animation: Platform.OS === 'ios' ? 'simple_push' : 'default',
                }}
            />
        </Stack>
    )
}
